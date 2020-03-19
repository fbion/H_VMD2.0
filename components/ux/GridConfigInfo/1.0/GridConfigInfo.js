Ext.define('vmd.ux.gridConfigInfo.Controller', {
    xtype: 'vmd.ux.gridConfigInfo.Controller',
    constructor: function(options) {
        this.scope = options;
    },
    setValue: function() {
        if (!xds.active.component.userConfig.gridConfig) {
            xds.active.component.userConfig.gridConfig = {
                storeName: "",
                columns: 0,
                displayMode: "0",
                fieldsInfo: []
            }
        }
        var saveInfo = typeof xds.active.component.userConfig.gridConfig == 'object' ?
            xds.active.component.userConfig.gridConfig : JSON.parse(xds.active.component.userConfig.gridConfig);
        this.setInfo(saveInfo);
    },
    setInfo: function(info) {
        if (info) {
            this.scope.dataSet.setValue(info.storeName);
            this.scope.displayMode.setValue(info.displayMode);
            this.scope.fixedCol.setValue(info.columns);
            var temp = [];
            for (var i = 0; i < info.fieldsInfo.length; i++) {
                var mixName = info.fieldsInfo[i].title + "(" + info.fieldsInfo[i].colId + ")";
                if (info.fieldsInfo[i].isVirtual)
                    mixName = info.fieldsInfo[i].title + "(虚拟列)";
                temp.push({
                    mixName: mixName,
                    name: info.fieldsInfo[i].colId,
                    id: info.fieldsInfo[i].colId
                })
            }
            this.scope.selectedField.loadData(temp)
            this.scope.gridConfigInfo = info
        }
    },
    serialize: function() {
        var json = {}
        return json;
    }
})
Ext.define("vmd.ux.GridConfigInfo", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.GridConfigInfo",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 510,
    layout: "anchor",
    beforerender: "GridConfigInfo_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.GridConfigInfo_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.GridConfigInfo'
                }, ex, 50);
            }
        }
    },
    uxCss: ".icon-ficdown {    background-image: url(/img/public/fic_down.png) !important;    background-repeat: no-repeat !important;    background-position: left center !important;}.icon-ficup {    background-image: url(/img/public/fic_up.png) !important;    background-repeat: no-repeat !important;    background-position: left center !important;}.icon-ficadd {    background-image: url(/img/public/fic_add.png) !important;    background-repeat: no-repeat !important;    background-position: left center !important;}.icon-ficsel {    background-image: url(/img/public/fic_sel.png) !important;    background-repeat: no-repeat !important;    background-position: left center !important;}.icon-ficdel {    background-image: url(/img/public/fic_del.png) !important;    background-repeat: no-repeat !important;    background-position: left center !important;}",
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
            var gridConfigInfo = {}
            page.selectedField = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['mixName', 'name', 'id']
            });
            var dsStore = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'value']
            });
            var dsStoreDats = [];
            dsStore.loadData(dsStoreDats);

            function dataSet_beforerender(sender) {
                dataSet.store = dsStore;
                dataSet.displayField = 'name';
                dataSet.valueField = 'value'
            }

            function dataSet_afterrender(sender) {
                dataSet.positionEl.on('click', function(e) {
                    var dsStoreDats = [];
                    var i = 0;
                    var storeRoot = xds.vmd.getRootNode("dataset");
                    if (typeof storeRoot != 'undefined') {
                        for (var i = 0; i < storeRoot.childNodes.length; i++) {
                            var cmp = storeRoot.childNodes[i].component
                            if (cmp.cid == "vmdDataSet") {
                                for (var j = 0; j < cmp.node.childNodes.length; j++) {
                                    var obj = {
                                        name: cmp.node.childNodes[j].id,
                                        value: cmp.node.childNodes[j].id
                                    }
                                    dsStoreDats.push(obj);
                                }
                            } else {
                                var obj = {
                                    name: cmp.id,
                                    value: cmp.id
                                }
                                dsStoreDats.push(obj);
                            }
                        }
                    }
                    dsStore.loadData(dsStoreDats)
                })
            }

            function button_click(sender, e) {
                var sValue = dataSet.getValue()
                //首先判断是否选择了数据集
                if (sValue == '') {
                    vmd.tip('请首先选择数据集', 'error')
                } else {
                    openSettingWin(page.gridConfigInfo);
                }
            }
            /*
             *desc 打开字段选择窗口
             */
            function openSettingWin(controller, flag) {
                var dbconfigs = JSON.parse(xds.vmd.getStoreByDsName(dataSet.getValue(), true).component.getConfig("storeConfig").storeConfig)
                if (dbconfigs) {
                    // 创建一个新窗口（有url指向） 
                    window.gridFildSelWin = new vmd.window({
                        url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwsEfvFUp9/hwC2OJYBU2.html',
                        title: '字段选择',
                        enableLoading: true, //启用进度加载
                        width: 630,
                        height: 500,
                        auto: false, //auto为true 自动适应窗口，配合offset使用
                        cache: false,
                        params: {
                            inst: controller
                        } //url中追加的编码的参数，json格式 
                    })
                    gridFildSelWin.inputdbconfig = dbconfigs
                    gridFildSelWin.show(); //窗口显示
                    gridFildSelWin.getSelectedFields = function(selected) {
                        var newSelectFields = [];
                        var oldfields = page.gridConfigInfo.fieldsInfo;
                        var ischeckfields = function(name) {
                            var flag = false;
                            Ext.each(oldfields, function(info) {
                                if (info.colId == name) {
                                    flag = info;
                                    return false;
                                }
                            })
                            return flag;
                        }
                        var cmpStore = [];
                        for (var i = 0; i < selected.length; i++) {
                            var name = selected[i].name;
                            var matchFieldInfo = ischeckfields(name);
                            if (matchFieldInfo) {
                                newSelectFields.push(Ext.copyTo(matchFieldInfo))
                                continue;
                            }
                            selected[i].mixName = selected[i].cname + '(' + selected[i].name + ')'
                            var cmp = {};
                            //var cmp = new vmd.ux.gridType.settings.fieldSettings();
                            //cmp.dictionary = selected[i];
                            var type = selected[i].type.toLowerCase();
                            //根据数据字典类型设置默认值
                            if (type == 'varchar' || type == 'string') {
                                cmp = {
                                    colId: name,
                                    title: selected[i].cname || name,
                                    unit: selected[i].unit,
                                    length: selected[i].length,
                                    width: selected[i].length * 8 || 100,
                                    allowSort: true,
                                    fileInfo: {
                                        type: "txt"
                                    }
                                }
                            } else if (type == 'number' || type == 'int32' || type == 'int16' || type == 'double' || type == 'float' || type == 'single' || type == 'decimal') {
                                cmp = {
                                    colId: name,
                                    title: selected[i].cname || name,
                                    unit: selected[i].unit,
                                    length: selected[i].length,
                                    width: _getDefaultWidth(selected[i].length, selected[i].cname || name),
                                    allowSort: true,
                                    fileInfo: {
                                        type: "num"
                                    }
                                }
                            } else {
                                cmp = {
                                    colId: name,
                                    title: selected[i].cname || name,
                                    unit: selected[i].unit,
                                    length: selected[i].length,
                                    width: selected[i].length * 8 || 100,
                                    allowSort: true,
                                    fileInfo: {
                                        type: "txt"
                                    }
                                }
                            }
                            newSelectFields.push(cmp);
                        }
                        page.gridConfigInfo.fieldsInfo = page.gridConfigInfo.fieldsInfo || []
                        for (var i = 0; i < newSelectFields.length; i++) {
                            page.gridConfigInfo.fieldsInfo.push(newSelectFields[i]);
                        }
                        page.selected = [];
                        for (var i = 0; i < page.gridConfigInfo.fieldsInfo.length; i++) {
                            page.selected.push({
                                mixName: page.gridConfigInfo.fieldsInfo[i].title + "(" + page.gridConfigInfo.fieldsInfo[i].colId + ")",
                                name: page.gridConfigInfo.fieldsInfo[i].colId
                            })
                        }
                        page.selectedField.loadData(page.selected)
                        gridFildSelWin.close()
                    }
                }
            }

            function _getDefaultWidth(length, name) {
                if (length)
                    return 100
                return (length * 8 + 10) <= (name.length * 8) ? (name.length * 8) : (length * 8 + 10)
            }

            function moveUp() {
                //上移
                var selecModel = page.MyGrid.getSelectionModel()
                var group = page.MyGrid.getSelectionModel().selections.items;
                if (group.length == 0) return;
                page.selected = Ext.pluck(page.MyGrid.store.data.items, 'json')
                var name = group[0].data.mixName;
                var list = page.gridConfigInfo.fieldsInfo;
                for (var i = 0; i < page.selected.length; i++) {
                    if (page.selected[i].mixName == name && i != 0) {
                        var temp = page.selected[i - 1];
                        page.selected[i - 1] = page.selected[i];
                        page.selected[i] = temp;
                        page.selectedField.loadData(page.selected)
                        selecModel.selectRow(i - 1)
                        var temp = list[i - 1]
                        list[i - 1] = list[i]
                        list[i] = temp;
                        break;
                    }
                }
                page.fireEvent('settingChangeEvents')
            }

            function moveDown() {
                //下移
                var selecModel = page.MyGrid.getSelectionModel()
                var group = page.MyGrid.getSelectionModel().selections.items;
                if (group.length == 0) return;
                page.selected = Ext.pluck(page.MyGrid.store.data.items, 'json')
                var name = group[0].data.mixName;
                var list = page.gridConfigInfo.fieldsInfo;
                for (var i = 0; i < page.selected.length; i++) {
                    if (page.selected[i].mixName == name && i < (list.length - 1)) {
                        var temp = page.selected[i + 1];
                        page.selected[i + 1] = page.selected[i];
                        page.selected[i] = temp;
                        page.selectedField.loadData(page.selected)
                        selecModel.selectRow(i + 1)
                        var temp = list[i + 1]
                        list[i + 1] = list[i]
                        list[i] = temp;
                        break;
                    }
                }
                page.fireEvent('settingChangeEvents')
            }

            function deleteCol() {
                var f = page.gridConfigInfo.fieldsInfo;
                var group = page.MyGrid.getSelectionModel().selections.items;
                if (group) {
                    for (var i = 0; i < group.length; i++) {
                        for (var n = f.length - 1; n > -1; n--) {
                            if (group[i].data.name == f[n].colId) {
                                f.splice(n, 1);
                                break;
                            }
                        }
                    }
                    page.selected = [];
                    for (var i = 0; i < f.length; i++) {
                        page.selected.push({
                            mixName: f[i].title + "(" + f[i].colId + ")",
                            name: f[i].colId
                        })
                    }
                    page.selectedField.loadData(page.selected)
                    page.fireEvent('settingChangeEvents')
                }
            }

            function dataSet_selectChanged(sender, combo, record, index) {
                page.gridConfigInfo.storeName = dataSet.getValue();
            }

            function displayMode_change(sender, checked) {
                page.gridConfigInfo.displayMode = displayMode.getValue();
            }

            function fixedCol_afterrender(sender) {
                sender.el.on('change', function() {
                    //var max = page.rootScope.controller.comp.grid.settings.fields.length;
                    //if (max < fixedCol.getValue()) {
                    //    vmd.tip('锁定列数超过已选择字段数', 'error')
                    //    fixedCol.setValue(page.controller.settings.fc)
                    //    return;
                    //}
                    page.gridConfigInfo.columns = sender.getValue();
                    //page.fireEvent('settingChangeEvents')
                })
            }

            function btn_up_click(sender, e) {
                moveUp()
            }

            function btn_down_click(sender, e) {
                moveDown()
            }

            function btn_del_click(sender, e) {
                deleteCol()
                //vmd.webBase.syslog(loginfo,logtype,operationtype,function(res){}) 
            }

            function MyGrid_beforerender(sender) {
                this.ddGroup = 'griddd';
                this.enableDragDrop = true;
                sender.store = page.selectedField;
                MyGrid.on('cellclick', function(sender, rowindex, cellindex) {
                    page.selNo = rowindex;
                    var gv = MyGrid.getView();
                    var row = gv.getRow(rowindex);
                    Ext.get(row).removeClass('x-grid3-row-selected')
                    currow = gv.getRow(rowindex);
                    Ext.get(currow).addClass('x-grid3-row-selected')
                })
                this.colModel.config[0].renderer = function(value, cellmeta, record) { //可以根据行字段的某个类型进行转换设置显示值
                    if (record.json.type == "fic") {
                        return '<div class="filename">' +
                            '<span style="color: green;font-weight: bold;" >' + value + '</span>' +
                            '</div>'
                    } else {
                        return value
                    }
                }
            }

            function MyGrid_afterrender(sender) {
                var store = this.store
                var ddrow = new Ext.dd.DropTarget(MyGrid.container, {
                    ddGroup: 'griddd',
                    copy: false,
                    notifyEnter: function(ddSource, e, data) {},
                    notifyDrop: function(ddSource, e, data) {
                        var list = page.gridConfigInfo.fieldsInfo;
                        // 选中了多少行
                        var rows = data.selections;
                        // 拖动到第几行
                        var index = ddSource.getDragData(e).rowIndex;
                        if (typeof(index) == "undefined") {
                            return;
                        }
                        // 修改store
                        for (i = 0; i < rows.length; i++) {
                            var rowData = rows[i];
                            lindex = store.indexOf(rowData)
                            temp = list[lindex]
                            list.remove(list[lindex])
                            list.splice(index, 0, temp);
                            if (!this.copy) store.remove(rowData);
                            store.insert(index, rowData);
                        }
                        page.selected = Ext.pluck(store.data.items, 'json')
                        page.selectedField.loadData(page.selected)
                        page.fireEvent('settingChangeEvents')
                    }
                });
            }

            function GridConfigInfo_beforerender(sender) {
                //增加属性面板的指向
                xds.active.component.propPanel = page;
            }

            function setInfo() {
                //增加属性面板的指向
                xds.active.component.propPanel = page;
                page.controller = new vmd.ux.gridConfigInfo.Controller(page);
                page.controller.setValue()
            }
            //弹窗事件编辑器
            function openCodeEditor(sender, eventname, eventValue, param, callback) {
                var curActiveCmp = curActiveCmp || xds.active.component
                var eventName = eventValue || (curActiveCmp.id + "_" + eventname.toLowerCase());
                var editor = new vmd.comp.Ace({
                    id: "ace_code"
                });
                init_def_platformControlData();
                var aceWin = new vmd.window({
                    title: "事件编辑",
                    id: "aceWin",
                    url: vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()),
                    offset: [100, 100],
                    modal: true,
                    maximizable: true,
                    maskStyle: 'opacity:0.7',
                    layout: 'border',
                    draggable: false
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
                            xds.vmd.events = val;
                            sender.setValue(eventName)
                            sender.fireEvent('change', sender, eventName);
                            if (callback) callback()
                            saveEvents(eventName)
                            // 返回给对象
                        } else {
                            click_label = undefined;
                            delete xds.vmd.events
                        }
                    })
                }
                // init_def_platformControlData();
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
                    var getdefaulteventname = function() {
                        if (!param) {
                            return "function(sender" + "){\n" + "\n} \n";
                        } else {
                            return "function(sender," + param + "){\n" + "\n} \n";
                        }
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
            }
            window.simpleGrid_openCodeEditor = openCodeEditor;

            function saveEvents(eventName) {
                var curActiveCmp
                curActiveCmp = curActiveCmp || xds.active.component
                eventName && xds.vmd.addEventForDesignerCmp(curActiveCmp, eventName, eventName)
            }

            function MyGrid_celldblclick(sender, rowIndex, columnIndex, e) {
                var _fieldInfo = page.gridConfigInfo.fieldsInfo[rowIndex]
                if (_fieldInfo.isVirtual) {
                    var editFieldsInfo = JSON.parse(JSON.stringify(_fieldInfo));
                    virtualColSet(editFieldsInfo, rowIndex, false)
                } else {
                    var editFieldsInfo = JSON.parse(JSON.stringify(page.gridConfigInfo.fieldsInfo));
                    for (var k = editFieldsInfo.length - 1; k >= 0; k--) {
                        if (editFieldsInfo[k].isVirtual)
                            editFieldsInfo.splice(k, 1);
                    }
                    // 创建一个新窗口（有url指向） 
                    window.settingWin = new vmd.window({
                        url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwsEfvFUp9/hw0yCvoYcm.html',
                        title: '字段类型设置',
                        enableLoading: true, //启用进度加载
                        width: 500,
                        height: 500,
                        cache: false,
                        auto: false, //auto为true 自动适应窗口，配合offset使用
                        params: {
                            inst: editFieldsInfo,
                            selNum: page.MyGrid.getSelectionModel().selections.items[0].json.name
                        } //url中追加的编码的参数，json格式 
                    })
                    settingWin.show(); //窗口显示
                    settingWin.setBack = function(controller, flag) {
                        if (flag) {
                            for (var j = 0; j < page.gridConfigInfo.fieldsInfo.length; j++) {
                                for (var k = 0; k < controller.length; k++) {
                                    if (page.gridConfigInfo.fieldsInfo[j].colId == controller[k].colId) {
                                        page.gridConfigInfo.fieldsInfo[j] = controller[k]
                                        break;
                                    }
                                }
                            }
                        }
                        page.fireEvent('settingChangeEvents')
                        settingWin.close()
                    }
                }
            }

            function button1_click(sender, e) {
                virtualColSet(null, null, true)
            }

            function virtualColSet(fileInfo, index, add) {
                var params = {}
                var selIndex = index;
                if (fileInfo)
                    params = {
                        inst: fileInfo
                    }
                window.addVirtualColWin = new vmd.window({
                    url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwsEfvFUp9/hwpeaBofN3.html',
                    title: '添加虚拟列',
                    enableLoading: true, //启用进度加载
                    width: 350,
                    height: 400,
                    cache: false,
                    auto: false, //auto为true 自动适应窗口，配合offset使用
                    params: params
                })
                addVirtualColWin.show(); //窗口显示
                addVirtualColWin.setBack = function(controller, flag) {
                    if (!add && flag)
                        if (flag && selIndex >= 0)
                            page.gridConfigInfo.fieldsInfo[selIndex] = controller
                    if (flag && add) {
                        page.gridConfigInfo.fieldsInfo.push(controller)
                        //重新设置当前界面的选择字段
                        _refreshFields()
                    }
                    addVirtualColWin.close()
                }
            }

            function _refreshFields() {
                var info = page.gridConfigInfo
                var temp = [];
                for (var i = 0; i < info.fieldsInfo.length; i++) {
                    var mixName = info.fieldsInfo[i].title + "(" + info.fieldsInfo[i].colId + ")";
                    if (info.fieldsInfo[i].isVirtual)
                        mixName = info.fieldsInfo[i].title + "(虚拟列)";
                    temp.push({
                        mixName: mixName,
                        name: info.fieldsInfo[i].colId,
                        id: info.fieldsInfo[i].colId
                    })
                }
                page.selectedField.loadData(temp)
            }

            function _codeEditWin(info, callback) {
                var editFieldsInfo = info;
                // 创建一个新窗口（有url指向） 
                simpleGridCodeEdit = new vmd.window({
                    url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwsEfvFUp9/hwa21e57c4.html',
                    title: '字段类型设置',
                    enableLoading: true, //启用进度加载
                    width: 700,
                    height: 580,
                    cache: false,
                    auto: false, //auto为true 自动适应窗口，配合offset使用
                    params: {
                        editCode: editFieldsInfo
                    } //url中追加的编码的参数，json格式 
                }); //窗口显示
                simpleGridCodeEdit.setBack = callback;
                simpleGridCodeEdit.show()
                return simpleGridCodeEdit;
            }
            window.openSimpleGridCodeEdit = _codeEditWin
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.GridConfigInfo',
                p2: ex.message
            }, ex, 100);
        }
        this.GridConfigInfo_beforerender = GridConfigInfo_beforerender;
        this.items = [{
                xtype: "vmd.div",
                id: "hwDiv",
                layoutConfig: {
                    align: "middle"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 35,
                layout: "hbox",
                anchor: "100% ",
                items: [{
                        xtype: "label",
                        id: "hwLabel",
                        text: "数据集:",
                        margins: "0 0 0 10"
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "dataSet",
                        width: 230,
                        height: 270,
                        x: 0,
                        y: 0,
                        margins: "8 0 0 0",
                        beforerender: "dataSet_beforerender",
                        afterrender: "dataSet_afterrender",
                        selectChanged: "dataSet_selectChanged",
                        listeners: {
                            beforerender: dataSet_beforerender,
                            vmdafterrender: dataSet_afterrender,
                            selectChanged: dataSet_selectChanged
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv1",
                layoutConfig: {
                    align: "middle"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 35,
                x: 60,
                y: 150,
                anchor: "100%",
                layout: "hbox",
                items: [{
                        xtype: "label",
                        id: "hwLabel1",
                        text: "展示类型：",
                        margins: "0 0 0 10"
                    },
                    {
                        xtype: "radiostoregroup",
                        id: "displayMode",
                        width: 200,
                        height: 29,
                        labelField: "label",
                        valueField: "value",
                        checkedField: "checked",
                        boxFieldName: "myRadio",
                        change: "displayMode_change",
                        listeners: {
                            change: displayMode_change
                        },
                        items: [{
                                xtype: "radio",
                                id: "hwRadio",
                                boxLabel: "实际宽度",
                                checked: true,
                                inputValue: "0"
                            },
                            {
                                xtype: "radio",
                                id: "hwRadio1",
                                boxLabel: "比例平铺",
                                inputValue: "1"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv2",
                layoutConfig: {
                    align: "middle"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 35,
                x: 100,
                y: 230,
                anchor: "100%",
                layout: "hbox",
                items: [{
                        xtype: "label",
                        id: "hwLabel2",
                        text: "锁定列数：",
                        margins: "0 0 0 10"
                    },
                    {
                        xtype: "textfield",
                        id: "fixedCol",
                        allowBlank: true,
                        enableKeyEvents: true,
                        width: 194,
                        afterrender: "fixedCol_afterrender",
                        listeners: {
                            vmdafterrender: fixedCol_afterrender
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv3",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 50,
                anchor: "100% -110",
                layout: "border",
                items: [{
                        xtype: "vmd.div",
                        id: "hwDiv4",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 274,
                        height: 33,
                        region: "north",
                        layout: "border",
                        style: "background-color: rgb(244, 246, 253);",
                        items: [{
                                xtype: "label",
                                id: "hwLabel3",
                                text: "字段配置",
                                anchor: "100 100%",
                                region: "west",
                                height: 22,
                                margins: "7 0 7 15",
                                style: "color: #20a0ff;    font-weight: bold;"
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv6",
                                layoutConfig: {
                                    align: "middle",
                                    pack: "end"
                                },
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 400,
                                height: 50,
                                anchor: "-60 100%",
                                x: 50,
                                region: "center",
                                layout: "hbox",
                                items: [{
                                        xtype: "vmd.button",
                                        id: "button",
                                        type: "text",
                                        size: "small",
                                        width: 30,
                                        cls: "icon-ficsel",
                                        click: "button_click",
                                        listeners: {
                                            click: button_click
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "button1",
                                        type: "text",
                                        size: "small",
                                        width: 30,
                                        cls: "icon-ficadd",
                                        click: "button1_click",
                                        listeners: {
                                            click: button1_click
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "btn_up",
                                        type: "text",
                                        size: "small",
                                        width: 30,
                                        cls: "icon-ficup",
                                        click: "btn_up_click",
                                        listeners: {
                                            click: btn_up_click
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "btn_down",
                                        type: "text",
                                        size: "small",
                                        width: 30,
                                        cls: "icon-ficdown",
                                        click: "btn_down_click",
                                        listeners: {
                                            click: btn_down_click
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "btn_del",
                                        type: "text",
                                        size: "small",
                                        width: 30,
                                        cls: "icon-ficdel",
                                        click: "btn_del_click",
                                        listeners: {
                                            click: btn_del_click
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
                        layout: "fit",
                        items: [{
                            xtype: "grid",
                            id: "MyGrid",
                            title: "Grid Panel",
                            loadMask: true,
                            border: false,
                            header: false,
                            hideHeaders: true,
                            beforerender: "MyGrid_beforerender",
                            afterrender: "MyGrid_afterrender",
                            celldblclick: "MyGrid_celldblclick",
                            listeners: {
                                beforerender: MyGrid_beforerender,
                                vmdafterrender: MyGrid_afterrender,
                                celldblclick: MyGrid_celldblclick
                            },
                            columns: [{
                                xtype: "gridcolumn",
                                header: "Column 1",
                                sortable: true,
                                resizable: true,
                                dataIndex: "mixName",
                                width: 280
                            }]
                        }]
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setValue = function() {
            setInfo()
        }
        this.serialize = function() {
            var json = page.controller.serialize();
            return json;
        }
        this.save = function(activeCmp) {
            debugger
            save(activeCmp)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.GridConfigInfo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.GridConfigInfo");
    }
})