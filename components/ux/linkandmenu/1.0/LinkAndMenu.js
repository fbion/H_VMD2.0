Ext.define('vmd.ux.linkAndMenu.Controller', {
    xtype: 'vmd.ux.linkAndMenu.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.LinkAndMenu", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.LinkAndMenu",
    title: "Panel",
    header: false,
    border: false,
    width: 276,
    height: 485,
    layout: "absolute",
    autoScroll: true,
    afterrender: "LinkAndMenu_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.LinkAndMenu_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.LinkAndMenu'
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
            var page = this;
            var selectNode;
            var menuid;
            var isset = false;
            //数据集数据
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'value']
            });
            //数据集字段数据
            var store1 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'value']
            });
            var ori = parent.xds.vmd.events;
            // 设置属性信息
            function setInfo(info) {
                clearMenuPanel();
                if (info && info.cellAttributeInfo && info.cellAttributeInfo.menu && info.cellAttributeInfo.leftLink) {
                    var menu = info.cellAttributeInfo.menu;
                    var link = info.cellAttributeInfo.leftLink;
                    isset = true;
                    linkParam.setValue(link.linkParam.value);
                    linkEvent.setValue(link.linkEvent.value);
                    menuParam.setValue(menu.menuParam.value);
                    menuEvent.setValue(menu.menuEvent.value);
                    menuText.setValue(menu.menuText.value);
                    menuDataset.setValue(menu.menuDataset.value);
                    menuID.setValue(menu.menuID.value)
                    menuPID.setValue(menu.menuPID.value)
                    menuSource.setValue(parseInt(menu.menuSource.value));
                    if (menu.menuSource.value == "0") {
                        if (menuDataset.getValue()) {
                            data = Ext.decode(menuDataset.getValue());
                        } else {
                            data = Ext.decode(menu.menuDataset.value);
                        }
                        serverPanel.hide();
                        customPanel.show();
                        var rootNode = tree.getRootNode();
                        rootNode.removeAll()
                        rootNode.ownerTree.nodeIdList = [];
                        rootNode.setText("右键菜单");
                        if (isset && data) {
                            if (data && data.length > 0) {
                                addNodeToTreeParse(rootNode.childNodes, rootNode.id, data);
                                parent.sheetHot.handleMenus('sets', Ext.encode(data))
                            }
                        } else {
                            if (rootNode && rootNode.childNodes.length > 0) {
                                var num = rootNode.childNodes.length;
                                for (var i = 0; i < num; i++) {
                                    tree.removeNodeById(rootNode.childNodes[0].id)
                                    parent.sheetHot.handleMenus('sets', "")
                                }
                            }
                        }
                        panel3.el.on('contextmenu', function(e) {
                            e.stopEvent();
                            hwMenuTree.showAt(e.getXY());
                        })
                        tree.expandAll();
                    } else {
                        serverPanel.show();
                        customPanel.hide();
                    }
                    // parent.sheetHot.handleMenus('source', menuSource.getValue())
                    // parent.sheetHot.handleMenus('params', menuParam.getValue());
                    // parent.sheetHot.handleMenus('text', menuText.getValue());
                    // parent.sheetHot.handleMenus('event', menuEvent.getValue())
                }
            }

            function addNodeToTreeParse(rootnode, pid, node) {
                for (var i = 0; i < node.length; i++) {
                    if (!checkSameName(rootnode, node[i].text)) {
                        tree.addNode(pid, node[i].id, node[i].text, true);
                        if (node[i].items && node[i].items.length > 0) {
                            addNodeToTreeParse(tree.getNodeById(node[i].id).childNodes, node[i].id, node[i].items);
                        }
                    }
                }
            }
            //事件编辑器
            function menuEvent_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var canWrite = false;
                    var cell = sheetHot.dealInvert()[0];
                    var mArr = sheetHot.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
                    var sel = sheetHot.dealInvert()[0];
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
                        var editor = new vmd.comp.Ace({
                            id: "ace_code"
                        });
                        parent.init_def_platformControlData();
                        var aceWin = new vmd.window({
                            title: "事件编辑",
                            id: "aceWin",
                            url: vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()),
                            offset: [100, 100],
                            modal: true,
                            maximizable: true,
                            maskStyle: 'opacity:0.7',
                            layout: 'border',
                            draggable: false,
                            listeners: {
                                move: function(me, x, y) {
                                    this.moveZone(me, x, y);
                                }
                            }
                        });
                        aceWin.closeFn = function() {
                            //修复ace tooltip还存在的问题
                            Ext.select('.Ace-Tern-tooltip').remove();
                            var val = aceWin.val;
                            if (aceWin.script == val) {
                                return;
                            }
                            Ext.Msg.confirm("提示", "脚本已改变是否保存?", function(btn) {
                                if (btn == 'no') return;
                                var click_label = sender;
                                if (val.trim()) {
                                    parent.xds.vmd.events = val;
                                    var name = ('' + sheetHot.rootScope.viewerNode.id + '_' + sheetHot.numToEng(cell.sc) + (cell.sr + 1) + '_itemClick').toLowerCase();
                                    sender.setValue(name)
                                    debugger
                                    sheetHot.changeAttributeInfo(cell.sr, cell.sc, 'menuEvent', name)
                                    if (ori.indexOf(name) == -1) {
                                        parent.xds.vmd.addEventForDesignerCmp(parent.xds.active.component, name, name)
                                    }
                                } else {
                                    click_label = undefined;
                                    delete parent.xds.vmd.events
                                }
                            })
                        }
                        //mafei 在ide-automachjs中
                        parent.init_def_platformControlData();
                        aceWin.on('close', aceWin.closeFn, this)
                        //当前拖拽组件
                        window.setTimeout(function() {
                            window.setTimeout(function() {
                                //代码编辑器初始化
                                if (typeof rowIndex == "number") {
                                    aceWin.aceline = rowIndex;
                                }
                            }, 150)
                            var code = parent.xds.vmd.events;
                            var eventName = ('' + sheetHot.rootScope.viewerNode.id + '_' + sheetHot.numToEng(cell.sc) + (cell.sr + 1) + '_itemClick').toLowerCase();
                            // var me = 
                            var getdefaulteventname = function() {
                                return "function(sender,grid,cell,rId,cInd,item,params" + "){\n" + "\n} \n";
                            }
                            var m = getdefaulteventname(),
                                code = code ? code : "",
                                replaceStr = "function {0}{1}",
                                regex = new RegExp("function\\s+" + eventName + "\\s*?\\(");
                            if (eventName && code.search(regex) == -1) {
                                var e = m.trim().replace("function", ""),
                                    i = String.format(replaceStr, eventName, e);
                                code += (code ? "\n\n" : "") + i
                            }
                            aceWin.script = code;
                            aceWin.val = code;
                            aceWin.show();
                            //进度提示
                            var myMask = new Ext.LoadMask(aceWin.el, {
                                msg: "数据加载中,请稍后...",
                                msgCls: 'z-index:10000;'
                            });
                            myMask.show();
                            aceWin.loading = myMask;
                            var scriptArr = code.split("\n"),
                                rowIndex = null;
                            Ext.each(scriptArr,
                                function(o, p) {
                                    if (o.search(regex) != -1) {
                                        rowIndex = p + 2;
                                        return false
                                    }
                                });
                        }, 50)
                    } else {
                        alert('请选择单个单元格设置事件')
                    }
                })
            }

            function linkEvent_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var canWrite = false;
                    var cell = sheetHot.dealInvert()[0];
                    var mArr = sheetHot.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
                    var sel = sheetHot.dealInvert()[0];
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
                        var editor = new vmd.comp.Ace({
                            id: "ace_code"
                        });
                        parent.init_def_platformControlData();
                        var aceWin = new vmd.window({
                            title: "事件编辑",
                            id: "aceWin",
                            url: vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()),
                            offset: [100, 100],
                            modal: true,
                            maximizable: true,
                            maskStyle: 'opacity:0.7',
                            layout: 'border',
                            draggable: false,
                            listeners: {
                                move: function(me, x, y) {
                                    this.moveZone(me, x, y);
                                }
                            }
                        });
                        aceWin.closeFn = function() {
                            //修复ace tooltip还存在的问题
                            Ext.select('.Ace-Tern-tooltip').remove();
                            var val = aceWin.val;
                            if (aceWin.script == val) {
                                return;
                            }
                            Ext.Msg.confirm("提示", "脚本已改变是否保存?", function(btn) {
                                if (btn == 'no') return;
                                var click_label = sender;
                                if (val.trim()) {
                                    parent.xds.vmd.events = val;
                                    var name = ('' + sheetHot.rootScope.viewerNode.id + '_' + sheetHot.numToEng(cell.sc) + (cell.sr + 1) + '_click').toLowerCase();
                                    sender.setValue(name)
                                    sheetHot.changeAttributeInfo(cell.sr, cell.sc, 'linkEvent', name)
                                    if (ori.indexOf(name) == -1) {
                                        parent.xds.vmd.addEventForDesignerCmp(parent.xds.active.component, name, name)
                                    }
                                } else {
                                    click_label = undefined;
                                    delete parent.xds.vmd.events
                                }
                            })
                        }
                        //mafei 在ide-automachjs中
                        parent.init_def_platformControlData();
                        aceWin.on('close', aceWin.closeFn, this)
                        //当前拖拽组件
                        window.setTimeout(function() {
                            window.setTimeout(function() {
                                //代码编辑器初始化
                                if (typeof rowIndex == "number") {
                                    aceWin.aceline = rowIndex;
                                }
                            }, 150)
                            var code = parent.xds.vmd.events;
                            var eventName = ('' + sheetHot.rootScope.viewerNode.id + '_' + sheetHot.numToEng(cell.sc) + (cell.sr + 1) + '_click').toLowerCase();
                            // var me = 
                            var getdefaulteventname = function() {
                                return "function(sender,grid,cell,params" + "){\n" + "\n} \n";
                            }
                            var m = getdefaulteventname(),
                                code = code ? code : "",
                                replaceStr = "function {0}{1}",
                                regex = new RegExp("function\\s+" + eventName + "\\s*?\\(");
                            if (eventName && code.search(regex) == -1) {
                                var e = m.trim().replace("function", ""),
                                    i = String.format(replaceStr, eventName, e);
                                code += (code ? "\n\n" : "") + i
                            }
                            aceWin.script = code;
                            aceWin.val = code;
                            aceWin.show();
                            //进度提示
                            var myMask = new Ext.LoadMask(aceWin.el, {
                                msg: "数据加载中,请稍后...",
                                msgCls: 'z-index:10000;'
                            });
                            myMask.show();
                            aceWin.loading = myMask;
                            //  aceWin.update("<iframe  id='iframe_page' src='" + vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()) + "' width=600 height=900 frameborder=0  ></iframe>")
                            var scriptArr = code.split("\n"),
                                rowIndex = null;
                            Ext.each(scriptArr,
                                function(o, p) {
                                    if (o.search(regex) != -1) {
                                        rowIndex = p + 2;
                                        return false
                                    }
                                });
                        }, 50)
                    } else {
                        alert('请选择单个单元格设置事件')
                    }
                })
            }
            //打开？？？编辑器
            function menuIDExpEdit_click(sender, e) {
                parent.openVisualEditor('menuID', menuID.getValue());
            }

            function LinkParamExpEdit_click(sender, e) {
                parent.openVisualEditor('linkParam', linkParam.getValue());
            }

            function menuParamExpEdit_click(sender, e) {
                parent.openVisualEditor('menuParam', menuParam.getValue());
            }
            //清空面板
            function clearMenuPanel() {
                menuID.setValue('');
                menuParam.setValue('');
                menuEvent.setValue('');
                menuDataset.setValue('');
            }
            //数据集选择改变
            function menuDataset_selectChanged(sender, combo, record, index) {
                sender.setValue(record.data.name)
                var temp = [];
                var dataSets = sheetHot.getDatasets();
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
                menuPID.setValue("");
                menuText.setValue("");
                menuID.setValue("")
                sheetHot.handleMenus('sets', record.data.name);
                sheetHot.handleMenus('text', '');
                sheetHot.handleMenus('id', '');
                sheetHot.handleMenus('pid', '');
            }
            // 服务或者自定义选择
            function menuSource_change(sender, checked) {
                var sheetHot = parent.sheetHot;
                if (checked.boxLabel == "自定义") {
                    serverPanel.hide();
                    customPanel.show();
                    tree.expandAll();
                    var rootNode = tree.getRootNode();
                    rootNode.setText("右键菜单");
                    if (isset) {
                        if (typeof data != 'undefined') {
                            if (data && data.length > 0) {
                                addNodeToTreeParse(rootNode.childNodes, rootNode.id, data);
                                sheetHot.handleMenus('sets', Ext.encode(data))
                            }
                        }
                    } else {
                        if (rootNode && rootNode.childNodes.length > 0) {
                            var num = rootNode.childNodes.length;
                            for (var i = 0; i < num; i++) {
                                tree.removeNodeById(rootNode.childNodes[0].id)
                            }
                            sheetHot.handleMenus('sets', "")
                        }
                    }
                    panel3.el.on('contextmenu', function(e) {
                        e.stopEvent();
                        hwMenuTree.showAt(e.getXY());
                    })
                } else {
                    serverPanel.show();
                    customPanel.hide();
                }
                sheetHot.handleMenus('source', menuSource.getValue())
                isset = false;
            }

            function menuDataset_beforerender(sender) {
                menuDataset.store = store;
                menuDataset.displayField = 'name';
                menuDataset.valueField = 'value'
            }
            /*
            function comlist_beforerender(sender) {
                sender.store = store1;
                sender.valueField = 'value'
                sender.displayField = 'name'
            }
            */
            function menuPID_selectChanged(sender, combo, record, index) {
                sheetHot.handleMenus('pid', record.data.name);
            }
            //点击组件刷新下拉选项内容
            function refreshStore(sender) {
                sender.el.dom.parentNode.onclick = function() {
                    var temp = [];
                    var dataSets = sheetHot.getDatasets();
                    for (var i = 0; i < dataSets.length; i++) {
                        if (dataSets[i].name == menuDataset.getValue()) {
                            for (var n = 0; n < dataSets[i].fields.length; n++) {
                                temp.push({
                                    name: dataSets[i].fields[n],
                                    value: dataSets[i].fields[n]
                                })
                            }
                        }
                    }
                    store1.loadData(temp)
                }
            }

            function menuPID_afterrender(sender) {
                // refreshStore(sender)
            }
            // 保存到平台
            function chkSavePt_check(sender, checked) {
                if (checked) {
                    btnSave.show();
                } else {
                    btnSave.hide();
                }
            }

            function tree_nodeclick(sender, node, e) {
                selectNode = node;
            }

            function newGuid(len) {
                var length = 32;
                if (len)
                    length = len
                var guid = "";
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                for (var i = 0; i < length; i++) {
                    pos = Math.round(Math.random() * (arr.length - 1));
                    guid += arr[pos];
                }
                return guid;
            }
            // 添加节点
            function hwMenuItemNode_click(sender, e) {
                var ppid = tree.getSelNode();
                var pid = tree.getSelNodeId();
                var cid;
                var c;
                if (pid.indexOf("root") == -1) {
                    pid = ppid.parentNode.id;
                    cid = newGuid(6);
                    c = ppid.parentNode.childNodes;
                } else {
                    c = ppid.childNodes;
                }
                var win = new vmd.window({
                    url: '/system//modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwcd09f39c.html',
                    auto: false,
                    width: 270,
                    height: 140,
                    maximizable: false,
                    title: '节点名称设置'
                })
                window.closeMenuNodeNameWindow = function() {
                    win.hide();
                }
                window.okMenuNodeNameWindow = function(text) {
                    if (checkSameName(c, text)) {
                        vmd.alert("提示", "该节点名称已存在，请重新设置！");
                    } else {
                        var cnameisleaf = text;
                        var changeStore = true;
                        cid = newGuid(6);
                        tree.addNode(pid, cid, cnameisleaf, changeStore);
                        win.hide();
                        var menuobj = treeNodesToString(tree);
                        if (menuobj && menuobj.length > 0) {
                            data = menuobj;
                            sheetHot.handleMenus('sets', Ext.encode(menuobj))
                        }
                    }
                }
                win.show()
            }
            // 树形结构获取
            function treeNodesToString(treenode) {
                var menuObj;
                if (treenode.nodeHash) {
                    var rootnode = treenode.nodeHash.root;
                    menuObj = treeChildNodes(rootnode);
                }
                return menuObj;
            }
            // 递归获取树形数据
            function treeChildNodes(node) {
                var items = [];
                if (node.childNodes && node.childNodes.length > 0) {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        var cnode = node.childNodes[i];
                        var item = {};
                        item.id = cnode.id;
                        item.text = cnode.text;
                        if (treeChildNodes(cnode) && treeChildNodes(cnode).length > 0) {
                            item.items = treeChildNodes(cnode);
                        }
                        items.push(item);
                    }
                }
                return items;
            }
            // 检查名称是否存在重复
            function checkSameName(node, name) {
                if (node.length > 0) {
                    for (var i = 0; i < node.length; i++) {
                        if (node[i].text == name) {
                            return true;
                        }
                    }
                }
                return false;
            }
            //重命名
            function hwMenuItemRename_click(sender, e) {
                var pid = tree.getSelNode();
                if (pid.id.indexOf("root") == -1) {
                    var win = new vmd.window({
                        url: '/system//modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwcd09f39c.html?nodename=' + pid.text,
                        auto: false,
                        width: 270,
                        height: 140,
                        maximizable: false,
                        title: '节点名称设置'
                    })
                    window.closeMenuNodeNameWindow = function() {
                        win.hide();
                    }
                    window.okMenuNodeNameWindow = function(text) {
                        var c;
                        if (pid.id.indexOf("root") == -1) {
                            c = pid.parentNode.childNodes;
                        } else {
                            c = pid.childNodes;
                        }
                        if (checkSameName(c, text)) {
                            vmd.alert("提示", "该节点名称已存在，请重新设置！");
                        } else {
                            pid.setText(text);
                            win.hide();
                            var menuobj = treeNodesToString(tree);
                            if (menuobj && menuobj.length > 0) {
                                // menuDataset.setValue(Ext.encode(menuobj));
                                data = menuobj;
                                sheetHot.handleMenus('sets', Ext.encode(menuobj));
                            }
                        }
                    }
                    win.show()
                }
            }
            //删除节点
            function hwMenuItemdelete_click(sender, e) {
                var nodeId = tree.getSelNodeId();
                if (nodeId.indexOf("root") != -1) {
                    vmd.alert("提示", "请选择需要删除的节点!")
                    return;
                }
                tree.removeNodeById(nodeId)
                var menuobj = treeNodesToString(tree);
                if (menuobj && menuobj.length > 0) {
                    // menuDataset.setValue(Ext.encode(menuobj));
                    data = menuobj;
                    sheetHot.handleMenus('sets', Ext.encode(menuobj));
                }
            }
            // 添加子节点
            function hwMenuItemCNode_click(sender, e) {
                var ppid = tree.getSelNode();
                var pid = tree.getSelNodeId();
                var cid = newGuid(6);
                var win = new vmd.window({
                    url: '/system//modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwcd09f39c.html',
                    auto: false,
                    width: 270,
                    height: 140,
                    maximizable: false,
                    title: '节点名称设置'
                })
                window.closeMenuNodeNameWindow = function() {
                    win.hide();
                }
                window.okMenuNodeNameWindow = function(text) {
                    var c;
                    if (pid.indexOf("root") == -1) {
                        c = ppid.childNodes;
                    } else {
                        c = ppid.childNodes;
                    }
                    if (checkSameName(c, text)) {
                        vmd.alert("提示", "该节点名称已存在，请重新设置！");
                    } else {
                        var cnameisleaf = text;
                        var changeStore = true;
                        tree.addNode(pid, cid, cnameisleaf, changeStore);
                        win.hide();
                        var menuobj = treeNodesToString(tree);
                        if (menuobj && menuobj.length > 0) {
                            // menuID.setValue(Ext.encode(menuobj));
                            data = menuobj;
                            sheetHot.handleMenus('sets', Ext.encode(menuobj));
                        }
                    }
                }
                win.show()
            }
            //数据集点击刷新值
            function menuDataset_afterrender(sender) {
                sender.el.dom.parentElement.onclick = function() {
                    var names = sheetHot.getDatasets();
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

            function menuID_beforerender(sender) {
                sender.store = store1;
                sender.displayField = 'name'
                sender.valueField = 'value'
            }

            function nodeName_beforerender(sender) {
                sender.store = store1;
                sender.displayField = 'name'
                sender.valueField = 'value'
            }

            function menuPID_beforerender(sender) {
                sender.store = store1;
                sender.displayField = 'name'
                sender.valueField = 'value'
            }

            function menuID_selectChanged(sender, combo, record, index) {
                sheetHot.handleMenus('id', record.data.name)
            }

            function nodeName_selectChanged(sender, combo, record, index) {
                sheetHot.handleMenus('text', record.data.name)
            }

            function button1_click(sender, e) {
                var sheetHot = parent.sheetHot;
                var cell = sheetHot.dealInvert()[0];
                if (cell.sr == cell.er && cell.sc == cell.ec) {
                    linkEvent.setValue("")
                    sheetHot.changeAttributeInfo(cell.sr, cell.sc, 'linkEvent', '')
                } else {
                    alert('请选择单一单元格设置')
                }
            }

            function button2_click(sender, e) {
                var sheetHot = parent.sheetHot;
                var cell = sheetHot.dealInvert()[0];
                if (cell.sr == cell.er && cell.sc == cell.ec) {
                    menuEvent.setValue("")
                    sheetHot.changeAttributeInfo(cell.sr, cell.sc, 'menuEvent', '')
                } else {
                    alert('请选择单一单元格设置')
                }
            }

            function menuName_keyup(sender, e) {
                sheetHot.handleMenus('name', sender.getValue());
            }

            function menuParam_keyup(sender, e) {
                sheetHot.handleMenus('params', sender.getValue())
            }

            function LinkAndMenu_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.LinkAndMenu',
                p2: ex.message
            }, ex, 100);
        }
        this.LinkAndMenu_afterrender = LinkAndMenu_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "超链接",
                x: 10,
                y: 10
            },
            {
                xtype: "label",
                id: "label1",
                text: "参数：",
                x: 25,
                y: 35,
                height: 20
            },
            {
                xtype: "textfield",
                id: "linkParam",
                allowBlank: true,
                enableKeyEvents: true,
                x: 70,
                y: 30,
                width: 145
            },
            {
                xtype: "vmd.button",
                id: "LinkParamExpEdit",
                text: "...",
                type: "(none)",
                size: "small",
                x: 225,
                y: 30,
                width: 30,
                click: "LinkParamExpEdit_click",
                hidden: true,
                listeners: {
                    click: LinkParamExpEdit_click
                }
            },
            {
                xtype: "label",
                id: "label2",
                text: "事件：",
                x: 25,
                y: 60
            },
            {
                xtype: "textfield",
                id: "linkEvent",
                allowBlank: true,
                enableKeyEvents: true,
                x: 70,
                y: 60,
                width: 145,
                readOnly: true,
                afterrender: "linkEvent_afterrender",
                listeners: {
                    vmdafterrender: linkEvent_afterrender
                }
            },
            {
                xtype: "label",
                id: "label3",
                text: "菜单",
                x: 10,
                y: 90
            },
            {
                xtype: "panel",
                id: "panel",
                title: "Panel",
                header: false,
                border: false,
                height: 370,
                x: 9,
                y: 110,
                layout: "absolute",
                width: 260,
                items: [{
                        xtype: "label",
                        id: "label5",
                        text: "参数：",
                        x: 16,
                        y: 10
                    },
                    {
                        xtype: "textfield",
                        id: "menuParam",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 60,
                        y: -1,
                        width: 140,
                        readOnly: false,
                        keyup: "menuParam_keyup",
                        listeners: {
                            keyup: menuParam_keyup
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "menuParamExpEdit",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 216,
                        y: 0,
                        width: 30,
                        click: "menuParamExpEdit_click",
                        hidden: true,
                        listeners: {
                            click: menuParamExpEdit_click
                        }
                    },
                    {
                        xtype: "label",
                        id: "label6",
                        text: "数据来源：",
                        x: -1,
                        y: 100,
                        hidden: false
                    },
                    {
                        xtype: "label",
                        id: "label8",
                        text: "事件：",
                        x: 16,
                        y: 40
                    },
                    {
                        xtype: "textfield",
                        id: "menuEvent",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 60,
                        y: 30,
                        width: 140,
                        readOnly: true,
                        afterrender: "menuEvent_afterrender",
                        listeners: {
                            vmdafterrender: menuEvent_afterrender
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button2",
                        type: "(none)",
                        size: "small",
                        x: 216,
                        y: 30,
                        width: 30,
                        icon: "delete",
                        click: "button2_click",
                        listeners: {
                            click: button2_click
                        }
                    },
                    {
                        xtype: "radiostoregroup",
                        id: "menuSource",
                        width: 200,
                        height: 30,
                        labelField: "label",
                        valueField: "value",
                        checkedField: "1",
                        boxFieldName: "myRadio",
                        x: 70,
                        y: 90,
                        change: "menuSource_change",
                        hidden: false,
                        listeners: {
                            change: menuSource_change
                        },
                        items: [{
                                xtype: "radio",
                                id: "menuDataSource",
                                boxLabel: "服务",
                                checked: true,
                                inputValue: "1"
                            },
                            {
                                xtype: "radio",
                                id: "menuCustom",
                                boxLabel: "自定义",
                                disabled: false,
                                inputValue: "0"
                            }
                        ]
                    },
                    {
                        xtype: "panel",
                        id: "panel1",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 260,
                        x: -10,
                        y: 120,
                        layout: "auto",
                        items: [{
                                xtype: "panel",
                                id: "serverPanel",
                                title: "Panel",
                                header: false,
                                border: false,
                                height: 236,
                                x: 10,
                                y: 0,
                                layout: "absolute",
                                width: 297,
                                items: [{
                                        xtype: "label",
                                        id: "label4",
                                        text: "数据集：",
                                        x: 20,
                                        y: 10
                                    },
                                    {
                                        xtype: "vmd.comlist",
                                        id: "menuDataset",
                                        width: 180,
                                        height: 270,
                                        x: 70,
                                        y: 5,
                                        selectChanged: "menuDataset_selectChanged",
                                        beforerender: "menuDataset_beforerender",
                                        afterrender: "menuDataset_afterrender",
                                        listeners: {
                                            selectChanged: menuDataset_selectChanged,
                                            beforerender: menuDataset_beforerender,
                                            vmdafterrender: menuDataset_afterrender
                                        }
                                    },
                                    {
                                        xtype: "label",
                                        id: "hwLabel",
                                        text: "节点字段：",
                                        x: 10,
                                        y: 45
                                    },
                                    {
                                        xtype: "label",
                                        id: "hwLabel1",
                                        text: "节点文本：",
                                        x: 10,
                                        y: 80
                                    },
                                    {
                                        xtype: "label",
                                        id: "hwLabel2",
                                        text: "父列字段：",
                                        x: 10,
                                        y: 115,
                                        height: 20
                                    },
                                    {
                                        xtype: "vmd.comlist",
                                        id: "menuID",
                                        width: 180,
                                        height: 270,
                                        x: 70,
                                        y: 40,
                                        beforerender: "menuID_beforerender",
                                        selectChanged: "menuID_selectChanged",
                                        listeners: {
                                            beforerender: menuID_beforerender,
                                            selectChanged: menuID_selectChanged
                                        }
                                    },
                                    {
                                        xtype: "vmd.comlist",
                                        id: "menuText",
                                        width: 180,
                                        height: 270,
                                        x: 70,
                                        y: 75,
                                        beforerender: "nodeName_beforerender",
                                        selectChanged: "nodeName_selectChanged",
                                        listeners: {
                                            beforerender: nodeName_beforerender,
                                            selectChanged: nodeName_selectChanged
                                        }
                                    },
                                    {
                                        xtype: "vmd.comlist",
                                        id: "menuPID",
                                        width: 180,
                                        height: 270,
                                        x: 70,
                                        y: 110,
                                        beforerender: "menuPID_beforerender",
                                        selectChanged: "menuPID_selectChanged",
                                        listeners: {
                                            beforerender: menuPID_beforerender,
                                            selectChanged: menuPID_selectChanged
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: "panel",
                                id: "customPanel",
                                title: "Panel",
                                header: false,
                                border: false,
                                height: 240,
                                layout: "border",
                                autoHeight: false,
                                autoWidth: false,
                                hidden: true,
                                items: [{
                                        xtype: "panel",
                                        id: "panel2",
                                        title: "Panel",
                                        header: false,
                                        border: false,
                                        height: 30,
                                        region: "north",
                                        autoWidth: false,
                                        layout: "absolute",
                                        items: [{
                                                xtype: "checkbox",
                                                id: "chkSavePt",
                                                fieldLabel: "Checkbox",
                                                boxLabel: "保存到平台",
                                                x: 20,
                                                y: 0,
                                                check: "chkSavePt_check",
                                                disabled: true,
                                                listeners: {
                                                    check: chkSavePt_check
                                                }
                                            },
                                            {
                                                xtype: "vmd.button",
                                                id: "btnSave",
                                                text: "保存",
                                                type: "(none)",
                                                size: "small",
                                                x: 130,
                                                y: 0,
                                                height: 24,
                                                hidden: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: "panel",
                                        id: "panel3",
                                        title: "Panel",
                                        header: false,
                                        border: false,
                                        height: 100,
                                        region: "center",
                                        layout: "fit",
                                        items: [{
                                            xtype: "vmd.treeex",
                                            id: "tree",
                                            width: 260,
                                            height: 400,
                                            hideRoot: false,
                                            loadType: "全部加载",
                                            region: "center",
                                            nodeclick: "tree_nodeclick",
                                            listeners: {
                                                nodeclick: tree_nodeclick
                                            }
                                        }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: "label",
                        id: "label7",
                        text: "名称：",
                        x: 14,
                        y: 68
                    },
                    {
                        xtype: "textfield",
                        id: "menuName",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 60,
                        y: 60,
                        width: 186,
                        keyup: "menuName_keyup",
                        listeners: {
                            keyup: menuName_keyup
                        }
                    }
                ]
            },
            {
                xtype: "vmd.button",
                id: "button1",
                type: "(none)",
                size: "small",
                x: 225,
                y: 60,
                width: 30,
                icon: "delete",
                click: "button1_click",
                listeners: {
                    click: button1_click
                }
            },
            {
                xtype: "vmd.menu",
                id: "hwMenuTree",
                width: 120,
                hidden: true,
                floating: true,
                items: [{
                        xtype: "menuitem",
                        id: "hwMenuItemNode",
                        width: 120,
                        text: "添加节点",
                        hidden: false,
                        click: "hwMenuItemNode_click",
                        listeners: {
                            click: hwMenuItemNode_click
                        }
                    },
                    {
                        xtype: "menuitem",
                        id: "hwMenuItemCNode",
                        width: 120,
                        text: "添加子节点",
                        click: "hwMenuItemCNode_click",
                        listeners: {
                            click: hwMenuItemCNode_click
                        }
                    },
                    {
                        xtype: "menuitem",
                        id: "hwMenuItemRename",
                        width: 120,
                        text: "重命名",
                        hidden: false,
                        click: "hwMenuItemRename_click",
                        listeners: {
                            click: hwMenuItemRename_click
                        }
                    },
                    {
                        xtype: "menuitem",
                        id: "hwMenuItemdelete",
                        width: 120,
                        text: "删除",
                        hidden: false,
                        click: "hwMenuItemdelete_click",
                        listeners: {
                            click: hwMenuItemdelete_click
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
        this.setInfo = function(info) {
            //直接填写方法内容
            setInfo(info);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.LinkAndMenu");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.LinkAndMenu");
    }
})