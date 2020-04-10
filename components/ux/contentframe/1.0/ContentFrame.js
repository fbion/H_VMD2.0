//page.getOne = true;
Ext.define('vmd.ux.contentFrame.Controller', {
    xtype: 'vmd.ux.contentFrame.Controller',
    constructor: function(options) {
        this.scope = options;
        this.comp = {
            layout: this.scope.hwLayoutPanel.controller,
            navigation: this.scope.hwNavigationPanel.controller,
            operation: this.scope.hwOperationPanel.controller,
            statistics: this.scope.statisticspanel.controller,
            form: this.scope.formtype.controller,
            grid: this.scope.hwGridType.controller
        }
    },
    setValue: function() {
        if (!xds.active.component.userConfig.inputConfig) {
            xds.active.component.userConfig.inputConfig = {
                form: {
                    events: {
                        rowChange: "",
                        rowClick: ""
                    },
                    settings: {
                        displayMode: "0",
                        fields: [],
                        formColumn: "3",
                        issave: true
                    }
                },
                grid: {
                    events: {
                        rowChange: "",
                        rowClick: ""
                    },
                    settings: {
                        displayMode: "0",
                        fields: [],
                        issave: true,
                        storeName: undefined
                    }
                },
                layout: {
                    dataSet: "",
                    displayMode: "style1",
                    isShowForm: true,
                    isShowGrid: true,
                    isShowNavigation: true,
                    isShowOperation: true,
                    isShowStatistics: true
                },
                navigation: {
                    click: "",
                    first: true,
                    firstCls: "",
                    firstName: "首行",
                    last: true,
                    lastCls: "",
                    lastName: "尾行",
                    next: true,
                    nextCls: "",
                    nextName: "下一行",
                    pageNum: true,
                    prev: true,
                    prevCls: "",
                    prevName: "上一行"
                },
                operation: {
                    addCls: "",
                    addName: "",
                    addbar: true,
                    click: "",
                    deleteCls: "",
                    deleteName: "",
                    deletebar: true,
                    exData: true,
                    exDataCls: "",
                    exDataName: "",
                    printCls: "",
                    printName: "",
                    printbar: true,
                    saveCls: "",
                    saveName: "",
                    savebar: true
                },
                statistics: {
                    expression: ""
                }
            }
        }
        var saveInfo = typeof xds.active.component.userConfig.inputConfig == 'object' ?
            xds.active.component.userConfig.inputConfig : JSON.parse(xds.active.component.userConfig.inputConfig);
        this.setInfo(saveInfo);
    },
    setInfo: function(info) {
        if (info) {
            this.comp.layout.setValue(info.layout);
            this.comp.grid.setValue(info.grid);
            this.comp.form.setValue(info.form);
            this.comp.navigation.setValue(info.navigation);
            this.comp.operation.setValue(info.operation);
            this.comp.statistics.setValue(info.statistics)
            var layout = this.comp.layout.serialize();
            layout.isShowGrid ? this.scope.MyTabs.unhideTabStripItem(this.scope.panel1) : this.scope.MyTabs.hideTabStripItem(this.scope.panel1);
            layout.isShowForm ? this.scope.MyTabs.unhideTabStripItem(this.scope.panel2) : this.scope.MyTabs.hideTabStripItem(this.scope.panel2);
            layout.isShowNavigation ? this.scope.MyTabs.unhideTabStripItem(this.scope.panel3) : this.scope.MyTabs.hideTabStripItem(this.scope.panel3);
            layout.isShowOperation ? this.scope.MyTabs.unhideTabStripItem(this.scope.panel4) : this.scope.MyTabs.hideTabStripItem(this.scope.panel4);
            layout.isShowStatistics ? this.scope.MyTabs.unhideTabStripItem(this.scope.panel5) : this.scope.MyTabs.hideTabStripItem(this.scope.panel5);
        }
    },
    serialize: function() {
        var json = {
            layout: this.comp.layout.serialize(),
            navigation: this.comp.navigation.serialize(),
            operation: this.comp.operation.serialize(),
            statistics: this.comp.statistics.serialize(),
            form: this.comp.form.serialize(),
            grid: this.comp.grid.serialize()
        }
        return json;
    },
    //扩展其他公共方法
    getDatasets: function() {
        var names = [];
        var storeRoot;
        if (typeof xds != 'undefined') storeRoot = xds.vmd.getRootNode("dataset");
        else if (parent.xds) storeRoot = parent.xds.vmd.getRootNode("dataset");
        if (typeof storeRoot != 'undefined') {
            var setstore = function(n) {
                var name = {};
                name.name = n.component.config.id;
                if (n.component.config.dsName) {
                    name.dsname = n.component.config.dsName;
                }
                name.fields = [];
                for (var key in n.childNodes) {
                    var field = n.childNodes[key];
                    if (field && field.attributes) {
                        name.fields.push(field.attributes.text);
                    }
                }
                var temp = JSON.parse(n.component.config.storeConfig);
                name.dictionary = temp.fields;
                if (name) {
                    names.push(name);
                }
            }
            storeRoot.eachChild(function(n) {
                if (n.component.cid == 'vmdDataSet') {
                    n.eachChild(function(m) {
                        if (m.component.config.storeConfig) {
                            setstore(m)
                        }
                    })
                } else if (n.component.config.storeConfig) {
                    setstore(n)
                }
            });
        }
        return names;
    },
    // //取得数据集及数据字典
    // getDatasetsWithDictionary: function() {
    //     var names = [];
    //     var storeRoot;
    //     if (typeof xds != 'undefined') storeRoot = xds.vmd.getRootNode("dataset");
    //     else if (parent.xds) storeRoot = parent.xds.vmd.getRootNode("dataset");
    //     if (typeof storeRoot != 'undefined') {
    //         storeRoot.eachChild(function(n) {
    //             
    //         });
    //     }
    //     return names;
    // },
    //字段选择，下拉窗使用
    openVisualSelector: function(data, data1, urlCode, inst, p) {
        
        var myurl;
        if (typeof filter == 'undefined') {
            myurl = '/system/modules/eQ9ULgcVb1/hwYa3IA0Y1/hwHCHpNfHv/hw1c3f0610.html'
        } else {
            myurl = '/system/modules/eQ9ULgcVb1/hwYa3IA0Y1/hwHCHpNfHv/hwfSA4EDtH.html'
        }
        if (urlCode == 'xlwg') myurl = '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwk9PgTMpg/hwpfrhVj8e.html'
        if (data) {
            // 创建一个新窗口（有url指向） 
            window.selectorWin = new vmd.window({
                url: myurl,
                title: '下拉显示列显示字段选择',
                enableLoading: true, //启用进度加载
                width: 780,
                height: 480,
                auto: false //auto为true 自动适应窗口，配合offset使用
                // params: {
                //     data: data,
                //     data1: data1,
                //     type: urlCode
                // } //url中追加的编码的参数，json格式 
            })
            var temp = this.comp[this.operateType].settings.fields;
            window.selectorWin.data = data;
            window.selectorWin.data1 = data1;
            window.selectorWin.type = urlCode;
            window.selectorWin.selected = temp;
            window.selectorWin.fname = p.dictionary.name;
            window.selectorWin.show(); //窗口显示
            window.selectorWin.close = function(result, urlCode, filter) {
                var no = 0;
                if (result) {
                    var t = '';
                    for (var i = 0; i < result.length; i++) {
                        if (i == 0) {
                            t = result[i].name;
                        } else {
                            t += ',' + result[i].name
                        }
                    }
                    // p.fieldsConfig.comlist = t;
                    // p.fieldsConfig.selected = [];
                    // window.settingWin.iframe.setGridSettings(t)
                    // for (var i = 0; i < result.length; i++) {
                    //     p.fieldsConfig.selected.push(result[i])
                    // }
                    //   window.selectorWin.selected
                    for (var i = 0; i < this.selected.length; i++) {
                        if (this.fname == this.selected[i].dictionary.name) {
                            no = i;
                            break;
                        }
                    }
                    this.selected[no].fieldsConfig.comlist = t;
                    this.selected[no].fieldsConfig.selected = [];
                    window.settingWin.iframe.setGridSettings(t)
                    for (var i = 0; i < result.length; i++) {
                        this.selected[no].fieldsConfig.selected.push(result[i])
                    }
                }
                selectorWin.hide();
            }
        }
    },
    //弹窗事件编辑器
    openCodeEditor: function(sender, eventname, eventValue, param) {
        var operateType = this.operateType || 'grid';
        var operateCmpId = this.scope.activeId;
        var operateField;
        if (this.comp[operateType].settings) {
            operateField = '_' + this.comp[operateType].settings.fields[this.comp[operateType].activeNo].dictionary.name;
        } else {
            if (this.comp[operateType][eventname]) {
                operateField = '_' + this.comp[operateType][eventname];
            } else {
                operateField = ''
            }
        }
        var eventName = eventValue || ('' + operateCmpId + '_' + operateType + operateField + '_' + eventname).toLowerCase();
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
                    // 返回给对象
                } else {
                    click_label = undefined;
                    delete xds.vmd.events
                }
            })
        }
        //mafei 在ide-automachjs中
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
})
// layout
// grid
// form
// navigation
// operation
// statistics
/**
 * Created by Administrator on 2018/6/6.
 * 整个报表信息
 */
function reportInfos() {
    var that = this;
    //字体信息
    this.fontsInfo = {};
    this.fontLength = 0;
    // 边框信息
    this.bordersInfo = {};
    this.borderLength = 0;
    //数字类型
    this.numberInfos = {};
    this.numberLength = 0;
    //
    this.treeFieldInfos = {};
    this.treeLength = 0;
    //
    this.alignInfos = {};
    this.alignLength = 0;
    this.cellTypeInfos = {};
    this.cellTypeLength = 0;
    //行信息
    this.rowsInfo = {};
    this.dataSetsInfo = {};
    this.datasets = [];
    this.rownum = 1;
    this.colnum = 1;
    this.eventInfo = {};
    this.eventInfoLength = 0;
    this.menuInfo = {};
    this.menuInfoLength = 0;
    this.linkInfo = {};
    this.linkInfoLength = 0;
    this.approvalInfo = {};
    this.approvalInfoLength = 0;
    // 获取事件对应的id
    this.getEventsID = function(info) {
        // 
        var id = this.eventInfoLength;
        var isIn = false;
        if (this.eventInfoLength == 0) {
            id = id + 1;
            this.eventInfo[id] = info;
            this.eventInfoLength += 1;
        } else {
            for (var key in this.eventInfo) {
                var f = this.eventInfo[key];
                if (
                    info.click == f.click &&
                    info.dbclick == f.dbclick &&
                    info.change == f.change &&
                    info.approval == f.approval &&
                    info.rightClick == f.rightClick &&
                    info.beforeClick == f.beforeClick
                ) {
                    id = key;
                    isIn = true;
                    break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.eventInfo[id] = info;
                this.eventInfoLength += 1;
            }
        }
        return id;
    }; // 获取事件对应的id
    this.getHeadEventsID = function(info) {
        // 
        var id = this.eventInfoLength;
        var isIn = false;
        if (this.eventInfoLength == 0) {
            id = id + 1;
            this.eventInfo[id] = info;
            this.eventInfoLength += 1;
        } else {
            for (var key in this.eventInfo) {
                var f = this.eventInfo[key];
                if (
                    info.change == f.allChange
                ) {
                    id = key;
                    isIn = true;
                    break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.eventInfo[id] = info;
                this.eventInfoLength += 1;
            }
        }
        return id;
    };
    this.getMenusID = function(info) {
        var id = this.menuInfoLength;
        var isIn = false;
        if (this.menuInfoLength == 0) {
            id = id + 1;
            this.menuInfo[id] = info;
            this.menuInfoLength += 1;
        } else {
            for (var key in this.menuInfo) {
                var f = this.menuInfo[key];
                if (info.id == f.id && info.param == f.param &&
                    info.source == f.source && info.sets == f.sets &&
                    info.choose == f.choose && info.cmbMenuID == f.cmbMenuID &&
                    info.pid == f.pid && info.text == f.text) {
                    id = key;
                    isIn = true;
                    break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.menuInfo[id] = info;
                this.menuInfoLength += 1;
            }
        }
        return id;
    };
    this.getLinksID = function(info) {
        // 
        var id = this.linkInfoLength;
        var isIn = false;
        if (this.linkInfoLength == 0) {
            id = id + 1;
            this.linkInfo[id] = info;
            this.linkInfoLength += 1;
        } else {
            for (var key in this.linkInfo) {
                var f = this.linkInfo[key];
                if (info.param == f.param) {
                    id = key;
                    isIn = true;
                    break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.linkInfo[id] = info;
                this.linkInfoLength += 1;
            }
        }
        return id;
    };
    // 判断数据集是否已经添加
    this.inDsArray = function(item) {
        var index = -1;
        if (this.datasets.length > 0) {
            for (var i = 0; i < this.datasets.length; i++) {
                if (this.datasets[i] == item) {
                    return i;
                }
            }
        }
        return index;
    };
    // 获取字体信息对应的id
    this.getFontInfoID = function(info) {
        // 
        var id = this.fontLength;
        var isIn = false;
        if (this.fontLength == 0) {
            id = id + 1;
            this.fontsInfo[id] = info;
            this.fontLength += 1;
        } else {
            for (var key in this.fontsInfo) {
                var f = this.fontsInfo[key];
                if (f.name == info.name && f.size == info.size && f.fontSize == info.fontSize && f.weight == info.weight && f.italic == info.italic && f.unline == info.unline && f.color == info.color) {
                    id = key;
                    isIn = true;
                    break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.fontsInfo[id] = info;
                this.fontLength += 1;
            }
        }
        return id;
    };
    // 获取边框信息对应的id
    this.getBorderInfoID = function(info) {
        var id = this.borderLength;
        var isIn = false;
        if (this.borderLength == 0) {
            id = id + 1;
            this.bordersInfo[id] = info;
            this.borderLength += 1;
        } else {
            for (var key in this.bordersInfo) {
                var f = this.bordersInfo[key];
                if (f.top == info.top && f.bottom == info.bottom && f.left == info.left && f.right == info.right) {
                    id = key;
                    isIn = true;
                    break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.bordersInfo[id] = info;
                this.borderLength += 1;
            }
        }
        return id;
    }
    // 获取数字信息对应的id
    this.getNumberInfoID = function(info) {
        var id = this.numberLength;
        var isIn = false;
        if (this.numberLength == 0) {
            id = id + 1;
            this.numberInfos[id] = info;
            this.numberLength += 1;
        } else {
            for (var key in this.numberInfos) {
                var f = this.numberInfos[key];
                if (f.dateformat == info.dateformat &&
                    f.type == info.type &&
                    f.separator == info.separator &&
                    f.zerovisible == info.zerovisible &&
                    f.decimal == info.decimal &&
                    f.numbering == info.numbering) {
                    id = key;
                    isIn = true;
                    break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.numberInfos[id] = info;
                this.numberLength += 1;
            }
        }
        return id;
    }
    // treeInfos
    // 获取树信息对应的id
    this.getTreeInfoID = function(info) {
        var id = this.treeLength;
        var isIn = false;
        if (this.treeFieldInfos == 0) {
            id = id + 1;
            this.treeFieldInfos[id] = info;
            this.treeLength += 1;
        } else {
            for (var key in this.treeFieldInfos) {
                var f = this.treeFieldInfos[key];
                if (f.dsname == info.dsname && f.id == info.id && f.parentid == info.parentid && f.showfield == info.showfield && f.cell == info.cell && f.treetype == info.treetype) {
                    id = key;
                    isIn = true;
                    break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.treeFieldInfos[id] = info;
                this.treeLength += 1;
            }
        }
        return id;
    }
    // 获取树信息对应的id
    this.getAlignInfoID = function(info) {
        var id = this.alignLength;
        var isIn = false;
        if (this.alignInfos == 0) {
            id = id + 1;
            this.alignInfos[id] = info;
            this.alignLength += 1;
        } else {
            for (var key in this.alignInfos) {
                var f = this.alignInfos[key];
                if (f.halign == info.halign && f.valign == info.valign && f.textcontrol == info.textcontrol &&
                    f.escapelabel == info.escapelabel && f.txtdirection == info.txtdirection && f.rotation == info.rotation &&
                    f.singlerotation == info.singlerotation && f.padding == info.padding && f.autoenter == info.autoenter) {
                    id = key;
                    isIn = true;
                    break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.alignInfos[id] = info;
                this.alignLength += 1;
            }
        }
        return id;
    }
    // 获取树信息对应的id    celltypes
    this.getCellTypeID = function(info) {
        var id = this.cellTypeLength;
        var isIn = false;
        if (this.cellTypeInfos == 0) {
            id = id + 1;
            this.cellTypeInfos[id] = info;
            this.cellTypeLength += 1;
        } else {
            for (var key in this.cellTypeInfos) {
                var f = this.cellTypeInfos[key];
                switch (info.type) {
                    case "Text": // 文本控件
                        if (this.cellTypeText(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "id":
                        if (this.cellTypeID(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "qtb":
                        if (this.cellTypeNested(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "Approval": //审批组件
                        if (this.cellTypeApproval(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "Combox": //下拉框组件
                        if (this.cellTypeCombo(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "RadioGroup": // 单选按钮
                        if (this.cellTypeRadioGroup(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "Date": //日期控件
                        if (this.cellTypeDate(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                        // case "DateTime": //时间组件
                        //     if (this.cellTypeTime(f, info)) {
                        //         id = key;
                        //         isIn = true;
                        //     }
                        break;
                    case "Number": //数字
                        if (this.cellTypeNumber(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                        // case "CheckBoxGroup": //复选框组
                        //     if (this.xxxxxxxxxxxxxx(f, info)) {
                        //         id = key;
                        //         isIn = true;
                        //     }
                        //     break;
                    case "CheckBox": //复选框
                        if (this.cellTypeCheckBox(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "RichEdit": //富文本
                        if (this.cellTypeRichEdit(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                        // case "List": //下拉列表
                        // case "vmdgrid":
                        //     if (this.cellTypeList(f, info)) {
                        //         id = key;
                        //         isIn = true;
                        //     }
                        //     break;
                    case "Button": //按钮
                        if (this.cellTypeButton(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                        // case "ButtonGroup": //
                        //     if (this.cellTypeApproval(f, info)) {
                        //         id = key;
                        //         isIn = true;
                        //     }
                        // break;
                    case "HyperLink": //超链接
                        if (this.cellTypeHyperLink(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "menu": //右键菜单
                        if (this.cellTypeMenu(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "UpLoad": //上传组件
                        if (that.cellTypeUpload(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                        // case "Tree": //树形组件
                        //     if (this.cellTypeTree(f, info)) {
                        //         id = key;
                        //         isIn = true;
                        //     }
                        //     break;
                    case "order": //序号
                        if (this.cellTypeNo(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "img": //图片组件
                        if (this.cellTypeImg(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "guid": //GUID
                        if (this.cellTypeGuid(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "dropdowntree": //下拉树
                        if (this.cellTypeDropDownTree(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                    case "PassWord": //密码
                        if (this.cellTypePassword(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                        // case "progressbar": //进度条
                        //     if (this.cellTypeProgressBar(f, info)) {
                        //         id = key;
                        //         isIn = true;
                        //     }
                        //     break;
                    case 'vmdgrid':
                        if (this.cellTypeGrid(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
                }
            }
            if (!isIn) {
                id = id + 1;
                this.cellTypeInfos[id] = info;
                this.cellTypeLength += 1;
            }
        }
        return id;
    }
    // this.cellTypeDefault = function(f, info) {
    //     return true;
    // }
    this.cellTypeDropDownTree = function(f, info) {
        if (f.type == info.type &&
            f.width == info.width &&
            f.selectableType == info.selectableType &&
            f.bindsource.tablename == info.bindsource.tablename &&
            f.bindsource.valuecolumn == info.bindsource.valuecolumn &&
            f.bindsource.showcolumn == info.bindsource.showcolumn &&
            f.bindsource.parentcolumn == info.bindsource.parentcolumn &&
            f.bindsource.nodecolumn == info.bindsource.nodecolumn &&
            f.bindsource.rootvalue == info.bindsource.rootvalue &&
            f.bindsource.roottext == info.bindsource.roottext) {
            return true;
        }
        return false;
    }
    this.cellTypeNo = function(f, info) {
        if (f.type == info.type &&
            f.isprint == info.isprint &&
            f.isallownull == info.isallownull &&
            f.emptydisplay == info.emptydisplay) {
            return true;
        }
        return false;
    }
    this.cellTypeText = function(f, info) {
        if (f.regexptip == info.regexptip &&
            f.charexp == info.charexp &&
            f.fillrule == info.fillrule &&
            f.ismultiline == info.ismultiline &&
            f.ischar == info.ischar &&
            f.isenableedit == info.isenableedit &&
            f.isallownull == info.isallownull &&
            f.isprint == info.isprint &&
            f.emptydisplay == info.emptydisplay &&
            f.minlen == info.minlen &&
            f.maxlen == info.maxlen &&
            f.tellformart == info.tellformart) {
            return true;
        }
        return false;
    }
    this.cellTypeHyperLink = function(f, info) {
        if (f.isEnableEdit == info.isEnableEdit && f.url == info.url &&
            f.isprint == info.isprint && f.isAllowNull == info.isAllowNull && f.EmptyDisplay == info.EmptyDisplay) {
            return true;
        }
        return false;
    }
    this.cellTypeApproval = function(f, info) {
        if (f && f.Items) {
            var f0 = f.Items[0];
            var f1 = f.Items[1];
            var f2 = f.Items[2];
            var f3 = f.Items[3];
            var f4 = f.Items[4];
            var f5 = f.Items[5];
            var f6 = f.Items[6];
            var f7 = f.Items[7];
            if (info && info.Items) {
                var i0 = info.Items[0];
                var i1 = info.Items[1];
                var i2 = info.Items[2];
                var i3 = info.Items[3];
                var i4 = info.Items[4];
                var i5 = info.Items[5];
                var i6 = info.Items[6];
                var i7 = info.Items[7];
                if (info.isenableedit == f.isenableedit && info.isprint == f.isprint && i0.fontcolor == f0.fontcolor && i0.fontname == f0.fontname && i0.fontsize == f0.fontsize && i0.height == f0.height && i0.isshow == f0.isshow && i0.italic == f0.italic && i0.labelValue == f0.labelValue && i0.mark == f0.mark && i0.type == f0.type && i0.underline == f0.underline && i0.value == f0.value && i0.width == f0.width && i0.x == f0.x && i0.y == f0.y && i1.fontcolor == f1.fontcolor && i1.fontname == f1.fontname && i1.fontsize == f1.fontsize && i1.height == f1.height && i1.isshow == f1.isshow && i1.italic == f1.italic && i1.labelValue == f1.labelValue && i1.mark == f1.mark && i1.type == f1.type && i1.underline == f1.underline && i1.value == f1.value && i1.width == f1.width && i1.x == f1.x && i1.y == f1.y && i2.fontcolor == f2.fontcolor && i2.fontname == f2.fontname && i2.fontsize == f2.fontsize && i2.height == f2.height && i2.isshow == f2.isshow && i2.italic == f2.italic && i2.labelValue == f2.labelValue && i2.mark == f2.mark && i2.src == f2.src && i2.type == f2.type && i2.underline == f2.underline && i2.width == f2.width && i2.x == f2.x && i2.y == f2.y && i3.fontcolor == f3.fontcolor && i3.fontname == f3.fontname && i3.fontsize == f3.fontsize && i3.height == f3.height && i3.isshow == f3.isshow && i3.italic == f3.italic && i3.labelValue == f3.labelValue && i3.mark == f3.mark && i3.namepicture == f3.namepicture && i3.type == f3.type && i3.underline == f3.underline && i3.value == f3.value && i3.width == f3.width && i3.x == f3.x && i3.y == f3.y && i4.dateformat == f4.dateformat && i4.fontcolor == f4.fontcolor && i4.fontname == f4.fontname && i4.fontsize == f4.fontsize && i4.height == f4.height && i4.isshow == f4.isshow && i4.italic == f4.italic && i4.labelValue == f4.labelValue && i4.mark == f4.mark && i4.type == f4.type && i4.underline == f4.underline && i4.value == f4.value && i4.width == f4.width && i4.x == f4.x && i4.y == f4.y && i5.fontcolor == f5.fontcolor && i5.fontname == f5.fontname && i5.fontsize == f5.fontsize && i5.height == f5.height && i5.isshow == f5.isshow && i5.italic == f5.italic && i5.labelValue == f5.labelValue && i5.mark == f5.mark && i5.type == f5.type && i5.underline == f5.underline && i5.value == f5.value && i5.width == f5.width && i5.x == f5.x && i5.y == f5.y && i6.fontcolor == f6.fontcolor && i6.fontname == f6.fontname && i6.fontsize == f6.fontsize && i6.height == f6.height && i6.isshow == f6.isshow && i6.italic == f6.italic && i6.labelValue == f6.labelValue && i6.mark == f6.mark && i6.type == f6.type && i6.underline == f6.underline && i6.value == f6.value && i6.width == f6.width && i6.x == f6.x && i6.y == f6.y && i7.fontcolor == f7.fontcolor && i7.fontname == f7.fontname && i7.fontsize == f7.fontsize && i7.height == f7.height && i7.isshow == f7.isshow && i7.italic == f7.italic && i7.labelValue == f7.labelValue && i7.mark == f7.mark && i7.type == f7.type && i7.underline == f7.underline && i7.value == f7.value && i7.width == f7.width && i7.x == f7.x && i7.y == f7.y) {
                    return true;
                }
            }
        }
        return false;
    }
    this.cellTypeMenu = function(f, info) {
        if (f.menutype == info.menutype && f.menuname == info.menuname) {
            return true;
        }
        return false;
    }
    this.cellTypeCombo = function(f, info) {
        if (f.clicktrigger == info.clicktrigger &&
            f.emptydisplay == info.emptydisplay &&
            f.isallownull == info.isallownull &&
            f.isenableedit == info.isenableedit &&
            f.ismulti == info.ismulti &&
            f.isprint == info.isprint &&
            f.type == info.type &&
            f.width == info.width &&
            f.bindsource.condition == info.bindsource.condition &&
            f.bindsource.showcolumn == info.bindsource.showcolumn &&
            f.bindsource.tablename == info.bindsource.tablename &&
            f.bindsource.valuecolumn == info.bindsource.valuecolumn &&
            f.noValueClear == info.noValueClear) {
            return true;
        }
        return false;
    }
    this.cellTypeRadioGroup = function(f, info) {
        if (f.isenableedit == info.isenableedit &&
            f.isprint == info.isprint &&
            f.autolayout == info.autolayout &&
            f.colcount == info.colcount &&
            f.linespace == info.linespace &&
            f.displaystyle == info.displaystyle) {
            return true;
        }
        return false;
    }
    this.cellTypeDate = function(f, info) {
        if (f.isenableedit == info.isenableedit &&
            f.isdefultdate == info.isdefultdate &&
            f.format == info.format &&
            f.isprint == info.isprint &&
            f.isallownull == info.isallownull &&
            f.emptydisplay == info.emptydisplay) {
            return true;
        }
        return false;
    }
    this.cellTypeNumber = function(f, info) {
        if (f.isenableedit == info.isenableedit &&
            f.isallownull == info.isallownull &&
            f.isdecimal == info.isdecimal &&
            f.isnegative == info.isnegative &&
            f.isprint == info.isprint &&
            f.decimalnumbers == info.decimalnumbers &&
            f.emptydisplay == info.emptydisplay &&
            f.islimit == info.islimit &&
            f.maxvalue == info.maxvalue &&
            f.minvalue == info.minvalue &&
            f.nullShowZero == info.nullShowZero) {
            return true;
        }
        return false;
    }
    this.cellTypeCheckBox = function(f, info) {
        if (f.startchar == info.startchar &&
            f.endchar == info.endchar &&
            f.isenableedit == info.isenableedit &&
            f.isprint == info.isprint &&
            f.isallselect == info.isallselect &&
            f.isother == info.isother &&
            f.multigroup == info.multigroup &&
            f.autolayout == info.autolayout &&
            f.linespace == info.linespace &&
            f.displaystyle == info.displaystyle &&
            f.isallownull == info.isallownull &&
            f.emptydisplay == info.emptydisplay &&
            f.displayLabel == info.displayLabel
        ) {
            return true
        }
        return false
    }
    this.cellTypeRichEdit = function(f, info) {
        if (f.firstindent == info.firstindent &&
            f.isenableedit == info.isenableedit &&
            f.isprint == info.isprint &&
            f.isallownull == info.isallownull &&
            f.emptydisplay == info.emptydisplay) {
            return true;
        }
        return false;
    }
    // this.cellTypeList = function(f, info) {
    //     if (f.isenableedit == info.isenableedit &&
    //         f.isprint == info.isprint &&
    //         f.clicktrigger == info.clicktrigger &&
    //         f.ismulti == info.ismulti &&
    //         f.width == info.width &&
    //         f.isallownull == info.isallownull &&
    //         f.emptydisplay == info.emptydisplay) {
    //         return true;
    //     }
    //     return false;
    // }
    this.cellTypeID = function(f, info) {
        if (f.type == info.type &&
            f.length == info.length &&
            f.isallownull == info.isallownull &&
            f.emptydisplay == info.emptydisplay) {
            return true;
        }
        return false;
    }
    this.cellTypeGuid = function(f, info) {
        if (f.type == info.type &&
            f.isallownull == info.isallownull &&
            f.emptydisplay == info.emptydisplay) {
            return true;
        }
        return false;
    }
    this.cellTypePassword = function(f, info) {
        if (f.type == info.type &&
            f.isenableedit == info.isenableedit &&
            f.isprint == info.isprint &&
            f.isallownull == info.isallownull &&
            f.emptydisplay == info.emptydisplay) {
            return true
        }
        return false
    }
    this.cellTypeGrid = function(f, info) {
        
        if (
            (f.bindsource && JSON.stringify(f.bindsource.multicolumns) == JSON.stringify(info.bindsource.multicolumns)) &&
            (f.bindsource && f.bindsource.showcolumn == info.bindsource.showcolumn) &&
            (f.bindsource && f.bindsource.tablename == info.bindsource.tablename) &&
            (f.bindsource && f.bindsource.valuecolumn == info.bindsource.valuecolumn) &&
            f.emptydisplay == info.emptydisplay &&
            f.height == info.height &&
            f.isallownull == info.isallownull &&
            f.isenableedit == info.isenableedit &&
            f.ismulti == info.ismulti &&
            f.type == info.type &&
            f.width == info.width
        ) {
            return true;
        }
    }
    return false;
}
this.cellTypeUpload = function(f, info) {
    if (f.type == info.type &&
        f.filetype == info.filetype &&
        f.uploadnumer == info.uploadnumer &&
        f.colexp == info.colexp &&
        f.pageexp == info.pageexp &&
        f.add == info.add &&
        f.delete == info.delete &&
        f.enableadd == info.enableadd &&
        f.enabledelete == info.enabledelete &&
        f.addeventid == info.addeventid &&
        f.deleteeventid == info.deleteeventid &&
        f.showmode == info.showmode &&
        f.wordMode == info.wordMode &&
        f.bindsource.docid == info.bindsource.docid &&
        f.bindsource.filename == info.bindsource.filename &&
        f.bindsource.filepath == info.bindsource.filepath &&
        f.bindsource.tablename == info.bindsource.tablename &&
        f.bindsource.filesize == info.bindsource.filesize &&
        f.bindsource.fileext == info.bindsource.fileext) {
        return true
    }
    return false
}
this.cellTypeNested = function(f, info) {
    if (f.type == info.type &&
        f.subrptpath == info.subrptpath &&
        f.subrpttype == info.subrpttype &&
        f.subrptname == info.subrptname &&
        f.subrptshowmode == info.subrptshowmode) {
        return true
    }
    return false;
}
this.cellTypeButton = function(f, info) {
    if (f.type == info.type &&
        f.activeCells == info.activeCells &&
        f.buttontype == info.buttontype &&
        f.carrycol == info.carrycol &&
        f.insertrowtype == info.insertrowtype &&
        f.isdeletedata == info.isdeletedata &&
        f.name == info.name &&
        f.status == info.status) {
        return true;
    }
    return false
}
Ext.define("vmd.ux.ContentFrame", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.LayoutPanel$1.0$LayoutPanel", "vmd.ux.GridType$1.0$GridType", "vmd.ux.FormType$1.0$FormType", "vmd.ux.NavigationPanel$1.0$NavigationPanel", "vmd.ux.OperationPanel$1.0$OperationPanel", "vmd.ux.StatisticsPanel$1.0$StatisticsPanel"]),
    version: "1.0",
    xtype: "vmd.ux.ContentFrame",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 300,
    height: 1000,
    layout: "fit",
    beforerender: "ContentFrame_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.ContentFrame_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.ContentFrame'
                }, ex, 50);
            }
        }
    },
    uxCss: ".x-tab-strip-top .x-tab-right {    padding: 0 10px;    height: 30px;    background-color: #fafafa;    font-size: 13px}",
    uxrequirecss: "[\"components/ux/gridtype/1.0/css/icons.css?ver=vmd2.0.5.200306\"]",
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
            var curActiveCmp;
            xds.on('beforecomponentchanged', function(arg) {
                if (arg) {
                    var type = arg.status;
                    var list = xds.inputInfo
                    if (list) {
                        switch (type) {
                            case 'delete':
                                if (arg.cmp.cid == 'vmdDataInput') {
                                    //删除的类型是录入时，直接删除
                                    for (var i = 0; i < list.length; i++) {
                                        if (list[i].id == arg.cmp.id)
                                            list.splice(i, 1);
                                        break;
                                    }
                                } else if (arg.cmp.cid == 'panel' || arg.cmp.cid == 'container' || arg.cmp.cid == 'tabpanel') {
                                    //删除的类型是容器时，遍历组件树
                                    for (var i = list.length - 1; i > 0; i++) {
                                        var flag = false;
                                        for (var akey in xds.inspector && xds.inspector.nodeHash) {
                                            if (list[i].id == akey) {
                                                flag = true;
                                                break;
                                            }
                                        }
                                        if (!flag) {
                                            list.splice(i, 1);
                                        }
                                    }
                                }
                                break;
                            case 'update':
                                if (arg.attr == 'id') {
                                    if (arg.cmp.cid == 'vmdDataInput') {
                                        for (var i = 0; i < list.length; i++) {
                                            if (list[i].id == arg.oldValue) {
                                                list[i].id = arg.value;
                                            }
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }
            })

            function MyTabs_tabchange(sender, tab) {
                var activeTitle = sender.activeTab.title;
                this.toolbarOperate = function() {
                    var title = MyTabs1.activeTab.title;
                    if (title == '导航栏') {
                        hwNavigationPanel.setValue(page.controller.comp.navigation.serialize())
                        page.controller.operateType = 'navigation'
                    } else if (title == '编辑栏') {
                        hwOperationPanel.setValue(page.controller.comp.operation.serialize())
                        page.controller.operateType = 'operation'
                    }
                }
                if (page && page.controller) {
                    switch (activeTitle) {
                        case '布局':
                            hwLayoutPanel.setValue(page.controller.comp.layout.serialize())
                            page.controller.operateType = 'layout'
                            break;
                        case '网格':
                            hwGridType.setInfo(page.controller.comp.grid.serialize())
                            page.controller.operateType = 'grid'
                            break;
                        case '自由格式':
                            formtype.setInfo(page.controller.comp.form.serialize())
                            page.controller.operateType = 'form'
                            break;
                        case '工具栏':
                            this.toolbarOperate()
                            break;
                        case '统计':
                            statisticspanel.setValue(page.controller.comp.statistics.serialize())
                            page.controller.operateType = 'statistics'
                            break;
                    }
                }
            }

            function MyTabs_afterrender(sender) {
                var id = this.el.dom.id
                var titleGroup = vmd(this.header.dom).find('.x-tab-strip-text')
                titleGroup[0].setAttribute('data-tooltip', '布局')
                titleGroup[1].setAttribute('data-tooltip', '网格格式')
                titleGroup[2].setAttribute('data-tooltip', '自由格式')
                titleGroup[3].setAttribute('data-tooltip', '导航条设置')
                titleGroup[4].setAttribute('data-tooltip', '编辑条设置')
                titleGroup[5].setAttribute('data-tooltip', '统计设置')
                vmd.utils.tooltip("#" + id + " [data-tooltip]")
            }

            function hwLayoutPanel_layoutItemVisibleChanged(sender, configs) {
                switch (configs.cname) {
                    case 'isShowGrid':
                        configs.cvalue ? MyTabs.unhideTabStripItem(panel1) : MyTabs.hideTabStripItem(panel1)
                        break;
                    case 'isShowForm':
                        configs.cvalue ? MyTabs.unhideTabStripItem(panel2) : MyTabs.hideTabStripItem(panel2)
                        break;
                    case 'isShowNavigation':
                        toolbarSet('isShowNavigation', configs.cvalue)
                        break;
                    case 'isShowOperation':
                        toolbarSet('isShowOperation', configs.cvalue)
                        break;
                    case 'isShowStatistics':
                        configs.cvalue ? MyTabs.unhideTabStripItem(panel5) : MyTabs.hideTabStripItem(panel5)
                        break;
                }
            }
            page.p6 = true;
            page.p7 = true;

            function toolbarSet(type, value) {
                switch (type) {
                    case 'isShowNavigation':
                        if (value) {
                            MyTabs1.unhideTabStripItem(panel6)
                            page.p6 = true;
                        } else {
                            MyTabs1.hideTabStripItem(panel6)
                            page.p6 = false
                        }
                        break;
                    case 'isShowOperation':
                        if (value) {
                            MyTabs1.unhideTabStripItem(panel7)
                            page.p7 = true;
                        } else {
                            MyTabs1.hideTabStripItem(panel7)
                            page.p7 = false
                        }
                        break;
                }
                if ((!page.p6) && (!page.p7)) {
                    MyTabs.hideTabStripItem(panel3)
                } else {
                    MyTabs.unhideTabStripItem(panel3)
                }
            }

            function hwLayoutPanel_settingChangedEvent(sender) {
                try {
                    xds.active.component.setConfig('inputConfig', JSON.stringify(page.controller.serialize()))
                    xds.fireEvent("componentchanged")
                } catch (ex) {}
            }

            function ContentFrame_beforerender(sender) {
                //增加属性面板的指向
                xds.active.component.propPanel = page;
            }

            function ContentFrame_afterrender(sender) {}

            function save(activeCmp) {
                if (activeCmp) curActiveCmp = activeCmp;
                var saveInfo = page.controller.serialize();
                var tg = saveRptInfo(saveInfo.grid, saveInfo.layout.dataSet);
                var tf = saveFormInfo(saveInfo.form, saveInfo.layout.dataSet);
                saveInfo.gridJson = tg;
                saveInfo.formJson = tf;
                if (curActiveCmp) curActiveCmp.setConfig('inputConfig', JSON.stringify(saveInfo));
                else {
                    if (xds.active.component.cid == 'vmdDataInput') xds.active.component.setConfig('inputConfig', JSON.stringify(saveInfo));
                }
                //增加事件
                saveEvents(curActiveCmp || xds.active.component, saveInfo)
            }

            function saveEvents(activeCmp, saveInfo) {
                var gridEvents = saveInfo.gridJson.main.events;
                var fromEvents = saveInfo.formJson.main.events;
                var addGridFormEvent = function(events) {
                    for (var key in events) {
                        var list = events[key];
                        for (var name in list) {
                            var _name = list[name];
                            _name && xds.vmd.addEventForDesignerCmp(activeCmp, _name, _name)
                        }
                    }
                }
                //网格
                addGridFormEvent(gridEvents);
                //自由格式
                addGridFormEvent(fromEvents);
            }

            function saveRptInfo(info, sName) {
                var maxRow = 2;
                var maxCol = info.settings.fields.length;
                var styleInfo = new reportInfos();
                var report = {};
                report.main = {};
                report.main.body = {};
                report.main.celltypes = {};
                report.main.datasource = {};
                report.main.style = {};
                report.main.tree = {};
                report.main.style.aligns = {
                    1: {
                        autoenter: "0",
                        escapelabel: 0,
                        halign: "left",
                        padding: "0 4 0 4",
                        rotation: "0",
                        rowspace: "",
                        singlerotation: undefined,
                        textcontrol: "",
                        txtdirection: "0",
                        valign: "middle"
                    }
                }
                report.main.style.borders = {
                    1: {
                        bottom: "1,RGB(204,204,204),0",
                        left: "1,RGB(204,204,204),0",
                        right: "1,RGB(204,204,204),0",
                        top: "1,RGB(204,204,204),0"
                    }
                }
                report.main.style.fonts = {
                    1: {
                        color: "#000",
                        italic: "0",
                        name: "SimSun",
                        size: "10",
                        unline: "0",
                        weight: "0"
                    },
                    2: {
                        color: "#F00", //主键红
                        italic: "0",
                        name: "SimSun",
                        size: "10",
                        unline: "0",
                        weight: "0"
                    },
                    3: {
                        color: "#00F", //非空蓝
                        italic: "0",
                        name: "SimSun",
                        size: "10",
                        unline: "0",
                        weight: "0"
                    }
                }
                report.main.style.numbers = {
                    1: {
                        type: '0'
                    }
                }
                report.main.body.columns = {};
                report.main.body.columns.width = []
                for (var i = 0; i < maxCol; i++) {
                    // report.main.body.columns.width.push(100)
                    report.main.body.columns.width.push(
                        (info.settings.fields[i].fieldsConfig && info.settings.fields[i].fieldsConfig.settings.colHide) ?
                        0 : ((info.settings.fields[i].fieldsConfig && info.settings.fields[i].fieldsConfig.settings.colWidth) ?
                            info.settings.fields[i].fieldsConfig.settings.colWidth : 100)
                    )
                }
                report.main.body.colNum = maxCol;
                report.main.body.rowNum = 2;
                report.main.body.fixedrow = 1;
                report.main.body.fixedcol = 0;
                report.main.body.sections = [];
                var s = getSectionRowInfo(0, parseInt(maxRow), 0, parseInt(maxCol), styleInfo, info, sName);
                report.main.body.sections.push(s);
                //保存字段类型和事件
                var setCellTypeAndEvent = function(cellinfo, settings, events) {
                    cellinfo.fillcelltype = styleInfo.getCellTypeID(settings).toString();
                    cellinfo.event = styleInfo.getEventsID(events).toString();
                }
                //单元格类型属性   
                for (var i = 0; i < info.settings.fields.length; i++) {
                    var sets = info.settings.fields[i].fieldsConfig;
                    // info.settings.fields[0].fieldsConfig.settings
                    if (sets) {
                        switch (sets.type) {
                            case "text":
                                if (sets.settings.text_typeSelect == 'common') {
                                    var text = {};
                                    text.type = "Text";
                                    text.regexptip = '';
                                    text.charexp = sets.settings.text_rule_charExp
                                    text.fillrule = sets.settings.text_common_fillRules
                                    text.ismultiline = sets.settings.text_common_mutilRow
                                    text.isenableedit = sets.settings.text_common_allowEdit
                                    text.isallownull = sets.settings.text_common_allowEmpty
                                    text.emptydisplay = sets.settings.text_common_emptyAlert
                                    text.minlen = sets.settings.text_rule_minLength
                                    text.maxlen = sets.settings.text_rule_maxLength
                                    text.tellformart = sets.settings.text_common_phoneType
                                    text.char = sets.settings.text_common_symbol
                                    var text_event = {
                                        click: sets.events.text_click,
                                        change: sets.events.text_change
                                    }
                                    try {
                                        if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells) {
                                            setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], text, text_event)
                                            // report.main.body.sections[0].data[0].cells[i].fillcelltype = styleInfo.getCellTypeID(text).toString();
                                            // report.main.body.sections[0].data[0].cells[i].event = styleInfo.getEventsID(text).toString();
                                        }
                                    } catch (ex) {}
                                } else if (sets.settings.text_typeSelect == 'no') {
                                    var order = {};
                                    order.type = "order";
                                    order.isallownull = sets.settings.text_no_allowEmpty
                                    order.emptydisplay = sets.settings.text_no_emptyAlert
                                    try {
                                        if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells) {
                                            setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], order, sets.events)
                                        }
                                    } catch (ex) {}
                                } else if (sets.settings.text_typeSelect == 'guid') {
                                    var guid = {};
                                    guid.type = "guid";
                                    guid.isallownull = sets.settings.text_guid_alloewEmpty
                                    guid.emptydisplay = sets.settings.text_guid_emptyAlert
                                    guid.length = sets.settings.text_guid_length
                                    try {
                                        if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                            setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], guid, sets.events)
                                    } catch (ex) {}
                                } else if (sets.settings.text_typeSelect == 'password') {
                                    var passWord = {};
                                    passWord.type = "PassWord";
                                    passWord.isenableedit = sets.settings.text_password_allowEdit
                                    passWord.isallownull = sets.settings.text_password_allowEmpty
                                    passWord.emptydisplay = sets.settings.text_password_emptyAlert
                                    try {
                                        if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                            setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], passWord, sets.events);
                                    } catch (ex) {}
                                }
                                break;
                            case "checkbox":
                                var checkBox = {};
                                checkBox.type = "CheckBoxGroup";
                                checkBox.displayLabel = sets.settings.displayLabel
                                checkBox.separator = sets.settings.symbol
                                checkBox.isenableedit = sets.settings.allowEdit
                                checkBox.isallselect = sets.settings.provideAll
                                checkBox.isother = sets.settings.provideOther
                                checkBox.multigroup = sets.settings.allowMulti
                                checkBox.autolayout = sets.settings.autolayout
                                checkBox.colcount = "";
                                checkBox.linespace = sets.settings.rowMargin
                                checkBox.isallownull = sets.settings.allowEmpty
                                checkBox.emptydisplay = sets.settings.emptyAlert
                                checkBox.bindsource = {};
                                checkBox.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet
                                checkBox.bindsource.valuecolumn = (sets.datas && sets.datas.saveField) || sets.settings.saveField
                                checkBox.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField
                                checkBox.bindsource.condition = (sets.datas && sets.datas.filter) || sets.settings.filter
                                try {
                                    if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                        setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], checkBox, sets.events);
                                } catch (ex) {}
                                break; //复选框
                            case "richText":
                                var richEdit = {};
                                richEdit.type = "RichEdit";
                                richEdit.firstindent = sets.settings.segmentPadding
                                richEdit.isenableedit = sets.settings.allowEdit
                                richEdit.isallownull = sets.settings.allowEmpty
                                richEdit.emptydisplay = sets.settings.emptyAlert
                                try {
                                    if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                        setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], richEdit, sets.events);
                                } catch (ex) {}
                                break; //富文本
                            case "date":
                                var date = {};
                                date.type = "Date";
                                date.allowuserdefine = sets.settings.customFormat;
                                date.format = sets.settings.format
                                date.isallownull = sets.settings.allowEmpty
                                date.emptydisplay = sets.settings.emptydisplay
                                date.isenableedit = sets.settings.allowEdit
                                date.isdefultdate = sets.settings.defaultNow
                                try {
                                    if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                        setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], date, sets.events);
                                } catch (ex) {}
                                break; //日期
                            case "radioButton":
                                var radioGroup = {};
                                radioGroup.type = "RadioGroup";
                                radioGroup.isenableedit = sets.settings.allowEdit
                                radioGroup.autolayout = sets.settings.adaptive
                                radioGroup.colcount = sets.settings.displayRow
                                radioGroup.linespace = sets.settings.rowMargin
                                radioGroup.displaystyle = sets.settings.displayStyle
                                radioGroup.bindsource = {};
                                radioGroup.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet
                                radioGroup.bindsource.valuecolumn = (sets.datas && sets.datas.saveField) || sets.settings.saveField
                                radioGroup.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField
                                try {
                                    if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                        setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], radioGroup, sets.events);
                                } catch (ex) {}
                                break; //单选按钮
                                // case "comlist":
                            case "comboGrid":
                                
                                var ddg = {};
                                ddg.type = "vmdgrid"
                                ddg.isenableedit = sets.settings.allowEdit
                                ddg.width = sets.settings.grid_width
                                ddg.isallownull = sets.settings.allowEmpty
                                ddg.emptydisplay = sets.settings.emptyAlert
                                ddg.ismulti = sets.settings.multi
                                ddg.height = sets.settings.gridHeight
                                ddg.bindsource = {};
                                if (sets.datas)
                                    ddg.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet
                                ddg.bindsource.valuecolumn = (sets.datas && sets.datas.saveField) || sets.settings.saveField
                                ddg.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField
                                try {
                                    if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                        setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], ddg, sets.events);
                                } catch (ex) {}
                                break; //下拉网格
                            case "comboTree":
                                var ddt = {};
                                ddt.type = "dropdowntree";
                                ddt.width = sets.settings.ct_width;
                                ddt.selectableType = sets.settings.chooseType
                                ddt.height = sets.settings.ct_height
                                ddt.isallownull = sets.settings.allowEmpty
                                ddt.emptydisplay = sets.settings.emptyAlert
                                ddt.bindsource = {};
                                ddt.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet
                                ddt.bindsource.valuecolumn = (sets.datas && sets.datas.valueField) || sets.settings.valueField
                                ddt.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField
                                ddt.bindsource.parentcolumn = (sets.datas && sets.datas.parentField) || sets.settings.parentField
                                ddt.bindsource.nodecolumn = (sets.datas && sets.datas.leafValue) || sets.settings.leafValue
                                ddt.bindsource.rootvalue = (sets.datas && sets.datas.rootValue) || sets.settings.rootValue
                                ddt.bindsource.roottext = (sets.datas && sets.datas.rootText) || sets.settings.rootText
                                try {
                                    if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                        setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], ddt, sets.events);
                                } catch (ex) {}
                                break; //下拉树
                            case "number":
                                var numberInfo = {};
                                numberInfo.type = "Number";
                                numberInfo.isenableedit = sets.settings.number_allowEdit;
                                numberInfo.isallownull = sets.settings.number_allowEmpty;
                                numberInfo.isdecimal = sets.settings.number_allowDecimal;
                                numberInfo.isnegative = sets.settings.number_allowNegetive;
                                numberInfo.decimalnumbers = sets.settings.number_decimalLength;
                                numberInfo.emptydisplay = sets.settings.number_emptyAlert;
                                numberInfo.islimit = sets.settings.number_limit;
                                numberInfo.maxvalue = sets.settings.number_maxValue;
                                numberInfo.minvalue = sets.settings.number_minValue;
                                var number_event = {
                                    click: sets.events.number_click,
                                    change: sets.events.number_change
                                }
                                try {
                                    if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                        setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], numberInfo, number_event);
                                } catch (ex) {}
                                break; //数字
                            case "combo":
                                var comboBox = {};
                                comboBox.type = "Combox";
                                comboBox.isenableedit = sets.settings.allowEdit;
                                comboBox.ismulti = sets.settings.allowMulti;
                                comboBox.width = sets.settings.combo_width;
                                comboBox.height = sets.settings.combo_height;
                                comboBox.isallownull = sets.settings.allowEmpty;
                                comboBox.emptydisplay = sets.settings.emptyAlert;
                                comboBox.noValueClear = sets.settings.noValueClear;
                                comboBox.bindsource = {};
                                comboBox.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet;
                                comboBox.bindsource.valuecolumn = (sets.datas && sets.datas.saveField) || sets.settings.saveField;
                                comboBox.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField;
                                comboBox.bindsource.condition = (sets.datas && sets.datas.filter) || sets.filter;
                                try {
                                    if (report.main.body.sections[0].data[0] && report.main.body.sections[0].data[0].cells)
                                        setCellTypeAndEvent(report.main.body.sections[0].data[0].cells[i], comboBox, sets.events);
                                } catch (ex) {}
                                break; //下拉框
                        }
                    }
                }
                report.main.celltypes = styleInfo.cellTypeInfos;
                report.main.events = styleInfo.eventInfo;
                //构造grid的bindSource
                initBindSourceProp(report);
                return report;
            }

            function saveFormInfo(info, sName) {
                var colset = info.settings.formColumn;
                var maxRow = Math.ceil(info.settings.fields.length / parseInt(colset));
                var maxCol = colset;
                var styleInfo = new reportInfos();
                var report = {};
                report.main = {};
                report.main.body = {};
                report.main.celltypes = {};
                report.main.datasource = {};
                report.main.style = {};
                report.main.tree = {};
                report.main.style.aligns = {
                    1: {
                        autoenter: "0",
                        escapelabel: 0,
                        halign: "left",
                        padding: "0 4 0 4",
                        rotation: "0",
                        rowspace: "",
                        singlerotation: undefined,
                        textcontrol: "",
                        txtdirection: "0",
                        valign: "middle"
                    },
                    2: {
                        autoenter: "0",
                        escapelabel: 0,
                        halign: "right",
                        padding: "0 4 0 4",
                        rotation: "0",
                        rowspace: "",
                        singlerotation: undefined,
                        textcontrol: "",
                        txtdirection: "0",
                        valign: "middle"
                    }
                }
                report.main.style.borders = {
                    1: {
                        bottom: "1,RGB(204,204,204),0",
                        left: "1,RGB(204,204,204),0",
                        right: "1,RGB(204,204,204),0",
                        top: "1,RGB(204,204,204),0"
                    }
                }
                report.main.style.fonts = {
                    1: {
                        color: "#000",
                        italic: "0",
                        name: "SimSun",
                        size: "10",
                        unline: "0",
                        weight: "0"
                    },
                    2: {
                        color: "#F00", //主键红
                        italic: "0",
                        name: "SimSun",
                        size: "10",
                        unline: "0",
                        weight: "0"
                    },
                    3: {
                        color: "#00F", //非空蓝
                        italic: "0",
                        name: "SimSun",
                        size: "10",
                        unline: "0",
                        weight: "0"
                    }
                }
                report.main.style.numbers = {
                    1: {
                        type: '0'
                    }
                }
                report.main.body.columns = {};
                report.main.body.columns.width = []
                if (info.settings.fields.length > 0) {
                    var extra = 0;
                    for (var i = 0; i < colset; i++) {
                        var n = i + extra;
                        var isHide = info.settings.fields[n] && info.settings.fields[n].fieldsConfig && info.settings.fields[n].fieldsConfig.settings.colHide;
                        if (isHide) {
                            extra++;
                            i--;
                        } else {
                            var w = (info.settings.fields[n] && info.settings.fields[n].fieldsConfig && info.settings.fields[n].fieldsConfig.settings.colWidth) || 100;
                            report.main.body.columns.width.push(parseInt(w / 10 * 2))
                            report.main.body.columns.width.push(parseInt(w / 10 * 7))
                            report.main.body.columns.width.push(parseInt(w / 10 * 1))
                        }
                    }
                }
                report.main.body.colNum = maxCol * 3;
                report.main.body.rowNum = maxRow;
                report.main.body.sections = [];
                var s = getSectionRowInfoform(0, parseInt(maxRow), 0, parseInt(maxCol), styleInfo, info, sName, colset);
                report.main.body.sections.push(s)
                //保存字段类型和事件
                var setCellTypeAndEvent = function(cellinfo, settings, events) {
                    cellinfo.fillcelltype = styleInfo.getCellTypeID(settings).toString();
                    cellinfo.event = styleInfo.getEventsID(events).toString();
                }
                //单元格类型属性   
                for (var i = 0; i < info.settings.fields.length; i++) {
                    var sets = info.settings.fields[i].fieldsConfig;
                    var cellInfo = report.main.body.sections[0].data[Math.floor(i / colset)].cells[(i * 3 + 1) % (3 * colset)];
                    if (sets) {
                        switch (sets.type) {
                            case "text":
                                if (sets.settings.text_typeSelect == 'common') {
                                    var text = {};
                                    text.type = "Text";
                                    text.regexptip = '';
                                    text.charexp = sets.settings.text_rule_charExp
                                    text.fillrule = sets.settings.text_common_fillRules
                                    text.ismultiline = sets.settings.text_common_mutilRow
                                    text.isenableedit = sets.settings.text_common_allowEdit
                                    text.isallownull = sets.settings.text_common_allowEmpty
                                    text.emptydisplay = sets.settings.text_common_emptyAlert
                                    text.minlen = sets.settings.text_rule_minLength
                                    text.maxlen = sets.settings.text_rule_maxLength
                                    text.tellformart = sets.settings.text_common_phoneType
                                    text.char = sets.settings.text_common_symbol
                                    var text_event = {
                                        click: sets.events.text_click,
                                        change: sets.events.text_change
                                    }
                                    try {
                                        if (cellInfo)
                                            setCellTypeAndEvent(cellInfo, text, text_event)
                                    } catch (ex) {}
                                    break;
                                } else if (sets.settings.text_typeSelect == 'no') {
                                    var order = {};
                                    order.type = "order";
                                    order.isallownull = sets.settings.text_no_allowEmpty
                                    order.emptydisplay = sets.settings.text_no_emptyAlert
                                    if (cellInfo)
                                        setCellTypeAndEvent(cellInfo, order, sets.events)
                                    break;
                                } else if (sets.settings.text_typeSelect == 'guid') {
                                    var guid = {};
                                    guid.type = "guid";
                                    guid.isallownull = sets.settings.text_guid_alloewEmpty
                                    guid.emptydisplay = sets.settings.text_guid_emptyAlert
                                    guid.length = sets.settings.text_guid_length
                                    if (cellInfo)
                                        setCellTypeAndEvent(cellInfo, guid, sets.events)
                                    break;
                                } else if (sets.settings.text_typeSelect == 'password') {
                                    var passWord = {};
                                    passWord.type = "PassWord";
                                    passWord.isenableedit = sets.settings.text_password_allowEdit
                                    passWord.isallownull = sets.settings.text_password_allowEmpty
                                    passWord.emptydisplay = sets.settings.text_password_emptyAlert
                                    if (cellInfo)
                                        setCellTypeAndEvent(cellInfo, passWord, sets.events)
                                    break;
                                }
                                break;
                            case "checkbox":
                                var checkBox = {};
                                checkBox.type = "CheckBoxGroup";
                                checkBox.displayLabel = sets.settings.displayLabel
                                checkBox.separator = sets.settings.symbol
                                checkBox.isenableedit = sets.settings.allowEdit
                                checkBox.isallselect = sets.settings.provideAll
                                checkBox.isother = sets.settings.provideOther
                                checkBox.multigroup = sets.settings.allowMulti
                                checkBox.autolayout = sets.settings.autolayout
                                checkBox.colcount = "";
                                checkBox.linespace = sets.settings.rowMargin
                                checkBox.isallownull = sets.settings.allowEmpty
                                checkBox.emptydisplay = sets.settings.emptyAlert
                                checkBox.bindsource = {};
                                checkBox.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet
                                checkBox.bindsource.valuecolumn = (sets.datas && sets.datas.saveField) || sets.settings.saveField
                                checkBox.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField
                                checkBox.bindsource.condition = (sets.datas && sets.datas.filter) || sets.settings.filter
                                if (cellInfo)
                                    setCellTypeAndEvent(cellInfo, checkBox, sets.events)
                                break;
                            case "richText":
                                var richEdit = {};
                                richEdit.type = "RichEdit";
                                richEdit.firstindent = sets.settings.segmentPadding
                                richEdit.isenableedit = sets.settings.allowEdit
                                richEdit.isallownull = sets.settings.allowEmpty
                                richEdit.emptydisplay = sets.settings.emptyAlert
                                if (cellInfo)
                                    setCellTypeAndEvent(cellInfo, richEdit, sets.events)
                                break; //富文本
                            case "date":
                                var date = {};
                                date.type = "Date";
                                date.allowuserdefine = sets.settings.customFormat;
                                date.format = sets.settings.format
                                date.isallownull = sets.settings.allowEmpty
                                date.emptydisplay = sets.settings.emptydisplay
                                date.isenableedit = sets.settings.allowEdit
                                date.isdefultdate = sets.settings.defaultNow
                                // date.isprint = sets.settings.
                                if (cellInfo)
                                    setCellTypeAndEvent(cellInfo, date, sets.events)
                                break
                            case "radioButton":
                                var radioGroup = {};
                                radioGroup.type = "RadioGroup";
                                radioGroup.isenableedit = sets.settings.allowEdit
                                // radioGroup.isprint = sets.settings.
                                radioGroup.autolayout = sets.settings.adaptive
                                radioGroup.colcount = sets.settings.displayRow
                                radioGroup.linespace = sets.settings.rowMargin
                                radioGroup.displaystyle = sets.settings.displayStyle
                                radioGroup.bindsource = {};
                                radioGroup.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet
                                radioGroup.bindsource.valuecolumn = (sets.datas && sets.datas.saveField) || sets.settings.saveField
                                radioGroup.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField
                                // radioGroup.bindsource.condition = sets.settings.
                                if (cellInfo)
                                    setCellTypeAndEvent(cellInfo, radioGroup, sets.events)
                                break; //单选按钮
                                // case "comlist":
                            case "comboGrid":
                                
                                var ddg = {};
                                ddg.type = "vmdgrid"
                                ddg.isenableedit = sets.settings.allowEdit
                                ddg.width = sets.settings.grid_width
                                ddg.isallownull = sets.settings.allowEmpty
                                ddg.emptydisplay = sets.settings.emptyAlert
                                ddg.ismulti = sets.settings.multi
                                ddg.height = sets.settings.gridHeight
                                ddg.bindsource = {};
                                ddg.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet
                                ddg.bindsource.valuecolumn = (sets.datas && sets.datas.saveField) || sets.settings.saveField
                                ddg.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField
                                if (cellInfo)
                                    setCellTypeAndEvent(cellInfo, ddg, sets.events);
                                break
                            case "comboTree":
                                var ddt = {};
                                ddt.type = "dropdowntree";
                                ddt.width = sets.settings.ct_width;
                                ddt.selectableType = sets.settings.chooseType
                                ddt.height = sets.settings.ct_height
                                ddt.isallownull = sets.settings.allowEmpty
                                ddt.emptydisplay = sets.settings.emptyAlert
                                ddt.bindsource = {};
                                ddt.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet
                                ddt.bindsource.valuecolumn = (sets.datas && sets.datas.valueField) || sets.settings.valueField
                                ddt.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField
                                ddt.bindsource.parentcolumn = (sets.datas && sets.datas.parentField) || sets.settings.parentField
                                ddt.bindsource.nodecolumn = (sets.datas && sets.datas.leafValue) || sets.settings.leafValue
                                ddt.bindsource.rootvalue = (sets.datas && sets.datas.rootValue) || sets.settings.rootValue
                                ddt.bindsource.roottext = (sets.datas && sets.datas.rootText) || sets.settings.rootText
                                if (cellInfo)
                                    setCellTypeAndEvent(cellInfo, ddt, sets.events)
                                break;
                            case "number":
                                var numberInfo = {};
                                numberInfo.type = "Number";
                                numberInfo.isenableedit = sets.settings.number_allowEdit;
                                numberInfo.isallownull = sets.settings.number_allowEmpty;
                                numberInfo.isdecimal = sets.settings.number_allowDecimal;
                                numberInfo.isnegative = sets.settings.number_allowNegetive;
                                numberInfo.decimalnumbers = sets.settings.number_decimalLength;
                                numberInfo.emptydisplay = sets.settings.number_emptyAlert;
                                numberInfo.islimit = sets.settings.number_limit;
                                numberInfo.maxvalue = sets.settings.number_maxValue;
                                numberInfo.minvalue = sets.settings.number_minValue;
                                var number_event = {
                                    click: sets.events.number_click,
                                    change: sets.events.number_change
                                }
                                if (cellInfo)
                                    setCellTypeAndEvent(cellInfo, numberInfo, number_event)
                                break;
                            case "combo":
                                var comboBox = {};
                                comboBox.type = "Combox";
                                comboBox.isenableedit = sets.settings.allowEdit;
                                comboBox.ismulti = sets.settings.allowMulti;
                                comboBox.width = sets.settings.combo_width;
                                comboBox.height = sets.settings.combo_height;
                                comboBox.isallownull = sets.settings.allowEmpty;
                                comboBox.emptydisplay = sets.settings.emptyAlert;
                                comboBox.noValueClear = sets.settings.noValueClear;
                                comboBox.bindsource = {};
                                comboBox.bindsource.tablename = (sets.datas && sets.datas.dataSet) || sets.settings.dataSet;
                                comboBox.bindsource.valuecolumn = (sets.datas && sets.datas.saveField) || sets.settings.saveField;
                                comboBox.bindsource.showcolumn = (sets.datas && sets.datas.displayField) || sets.settings.displayField;
                                comboBox.bindsource.condition = (sets.datas && sets.datas.filter) || sets.settings.filter;
                                if (cellInfo)
                                    setCellTypeAndEvent(cellInfo, comboBox, sets.events)
                                break;
                        }
                    }
                }
                report.main.celltypes = styleInfo.cellTypeInfos;
                report.main.events = styleInfo.eventInfo;
                //构建填报需要的bindSource
                initBindSourceProp(report);
                return report;
            }

            function initBindSourceProp(rpt) {
                var dts = getDataTables();
                var celltypes = rpt.main.celltypes;
                var validDts = [];
                for (var key in celltypes) {
                    var info = celltypes[key];
                    if (info.bindsource) {
                        var tablename = info.bindsource.tablename;
                        if (tablename && (validDts.indexOf(tablename) == -1)) validDts.push(tablename);
                    }
                }
                //datasource={tables:{ds1:{factname:'ds1',name:'ds1'}}}
                if (!rpt.main.datasource.tables) rpt.main.datasource.tables = {};
                Ext.each(validDts, function(name) {
                    rpt.main.datasource.tables[name] = {
                        factname: name,
                        name: name
                    }
                })
            }

            function hwNavigationPanel_settingChangedEvent(sender) {
                try {
                    xds.active.component.setConfig('inputConfig', JSON.stringify(page.controller.serialize()))
                    xds.fireEvent("componentchanged")
                } catch (ex) {}
            }

            function hwOperationPanel_settingChangedEvent(sender) {
                try {
                    xds.active.component.setConfig('inputConfig', JSON.stringify(page.controller.serialize()))
                    xds.fireEvent("componentchanged")
                } catch (ex) {}
            }

            function statisticspanel_settingChangedEvent(sender) {
                try {
                    save()
                    xds.fireEvent("componentchanged")
                } catch (ex) {}
            }
            page.getOne = true;

            function setInfo() {
                //增加属性面板的指向
                xds.active.component.propPanel = page;
                // if(){}
                if (!xds.inputInfo) xds.inputInfo = [];
                if (xds.inputInfo.length == 0) {
                    page.controller = new vmd.ux.contentFrame.Controller(page);
                    xds.inputInfo.push({
                        id: xds.active.component.id,
                        controller: page.controller
                    })
                    page.controller.setValue()
                    page.activeId = xds.active.component.id;
                } else {
                    //没有先创建
                    var flag = true;
                    for (var i = 0; i < xds.inputInfo.length; i++) {
                        if (xds.inputInfo[i].id == xds.active.component.id) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        page.controller = new vmd.ux.contentFrame.Controller(page);
                        xds.inputInfo.push({
                            id: xds.active.component.id,
                            controller: page.controller
                        })
                        page.controller.setValue()
                        page.activeId = xds.active.component.id;
                    }
                    if (xds.active.component.id != page.activeId) {
                        page.controller.setValue();
                        for (var i = 0; i < xds.inputInfo.length; i++) {
                            if (page.activeId == xds.inputInfo[i].id) {
                                page.activeId = xds.inputInfo[i].id
                                page.controller = xds.inputInfo[i].controller;
                                page.controller.setValue()
                            }
                        }
                        page.activeId = xds.active.component.id;
                    }
                }
            }

            function hwGridType_copyGridToForm(sender) {
                // page.controller.comp.form.setValue(page.controller.serialize())
                page.controller.comp.grid.setValue(page.controller.comp.form.serialize())
            }

            function formtype_copyGridToForm(sender) {
                page.controller.comp.form.setValue(page.controller.comp.grid.serialize())
            }
            var getSectionRowInfo = function(startrow, endrow, startcol, endcol, report, info, sName) {
                // var mArray = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
                var sections = {};
                sections.header = [];
                sections.data = [];
                sections.title = [];
                sections.startrow = 1;
                sections.startcol = 1;
                sections.endcol = endcol;
                sections.endrow = 2;
                //遍历有效行列提取属性信息
                var temp = [];
                var opts = {
                    type: 'grid'
                }
                for (var i = startrow; i < endrow; i++) {
                    var cells = [];
                    for (var n = startcol; n < endcol; n++) {
                        if (i == 0) {
                            opts.type2 = 'header';
                            cells.push(
                                cell('g0', info.settings.fields[n].dictionary.cname, info.settings.fields[n].dictionary, opts)
                                //('0', info.settings.fields[n].dictionary.cname,null,info.settings.fields[n].dictionary)
                            )
                        }
                        if (i == 1) {
                            opts.type2 = 'data';
                            cells.push(
                                cell('g1', sName + '.' + info.settings.fields[n].dictionary.name, info.settings.fields[n].dictionary, opts)
                                // ('1', sName + '.' + info.settings.fields[n].dictionary.name, info.settings.fields[n].dictionary)
                            )
                        }
                    }
                    temp.push({
                        i: cells
                    })
                }
                sections.header.push({
                    cells: temp[0].i,
                    height: 32
                })
                sections.data.push({
                    cells: temp[1].i,
                    height: 32
                })
                return sections;
            }
            var getSectionRowInfoform = function(startrow, endrow, startcol, endcol, report, info, sName, colset) {
                // var mArray = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
                var sections = {};
                sections.header = [];
                sections.data = [];
                sections.title = [];
                sections.startrow = startrow;
                sections.startcol = startcol;
                sections.endcol = endcol * 3;
                sections.endrow = endrow;
                //遍历有效行列提取属性信息
                var extra = 0;
                var temp = [];
                for (var i = startrow; i < endrow; i++) {
                    var cells = [];
                    for (var n = 0; n < colset; n++) {
                        var k = n + extra + colset * i;
                        if (k > info.settings.fields.length - 1) break;
                        var isHide = info.settings.fields[k].fieldsConfig && info.settings.fields[k].fieldsConfig.settings.colHide;
                        if (isHide) {
                            extra++;
                            n--;
                        } else {
                            var opts = {
                                type: 'form'
                            }
                            cells.push(cell('f0', info.settings.fields[k].dictionary.cname, info.settings.fields[k].dictionary, opts))
                            cells.push(cell('f1', sName + '.' + info.settings.fields[k].dictionary.name, info.settings.fields[k].dictionary, opts))
                            cells.push(cell('f2', '', info.settings.fields[k].dictionary, opts))
                        }
                    }
                    temp.push({
                        i: cells
                    })
                }
                for (var i = 0; i < temp.length; i++) {
                    sections.data.push({
                        cells: temp[i].i,
                        height: 45
                    })
                }
                sections.startcol = 1;
                sections.startrow = 1;
                return sections;
            }
            /*
             *desc 返回单元格信息
             *@param {string}- t 标识，网格g1-表头,g2-数据；自由格式f1-标题，f2-类型,f3-单位
             *@param {string}- v name 名称
             *@param {object}-d 数据字典对象
             *@param {object}-opts 配置type：grid||form，type2:分为网格表头和数据
             *return {object} 返回json对象
             */
            function cell(t, v, d, opts) {
                var json = {
                    align: "1",
                    borders: "1",
                    datatype: "0",
                    event: undefined,
                    fonts: "1",
                    links: undefined,
                    menus: undefined,
                    merged: "0",
                    number: "1"
                }
                if (t == 'g0') {
                    json.data = v;
                } else if (t == 'g1') {
                    json.datavalue = "=" + v;
                } else if (t == 'f0') {
                    json.data = v + ':';
                    json.align = '2'
                } else if (t == 'f1') {
                    if (d) {
                        json.datavalue = '=' + v;
                        if (d.type == 'NUMBER') json.align = '2';
                    }
                } else if (t == 'f2') {
                    //
                }
                if (d) {
                    if (d.primary != '' && t != 'g1') json.fonts = '2'
                    //  if (d.primary == '' && d.nullable != 'Y') json.fonts = '3'
                    if (d.primary == '' && d.nullable != 'Y') {
                        if (opts) {
                            if (opts.type == 'form') json.fonts = '3';
                            else if (opts.type == 'grid') {
                                if (opts.type2 == 'header') json.fonts = '3'
                            }
                        }
                    }
                }
                return json;
            }
            var getDatasets = function(report) {
                var names = [];
                var i = 0;
                var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
                if (typeof storeRoot != 'undefined') {
                    storeRoot.eachChild(function(n) {
                        var name = {};
                        name.name = n.component.config.id;
                        if (n.component.config.dsName) {
                            name.dsname = n.component.config.dsName;
                        }
                        name.fields = [];
                        for (var key in n.childNodes) {
                            var field = n.childNodes[key];
                            if (field && field.attributes) {
                                name.fields.push(field.attributes.text);
                            }
                        }
                        if (name) {
                            names.push(name);
                        }
                        i++
                    }, report);
                }
                return names;
            }

            function getDataTables() {
                var names = [];
                var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
                if (typeof storeRoot != 'undefined') {
                    storeRoot.eachChild(function(cmp) {
                        names.push(cmp.id);
                    });
                }
                return names;
            }

            function hwGridType_settingChangeEvents(sender) {
                try {
                    save()
                    xds.fireEvent("componentchanged")
                } catch (ex) {}
            }

            function formtype_settingChangeEvents(sender) {
                try {
                    save()
                    xds.fireEvent("componentchanged")
                } catch (ex) {}
            }

            function MyTabs1_tabchange(sender, tab) {
                MyTabs.toolbarOperate()
            }

            function panel_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ContentFrame',
                p2: ex.message
            }, ex, 100);
        }
        this.ContentFrame_afterrender = ContentFrame_afterrender;
        this.ContentFrame_beforerender = ContentFrame_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 1,
            height: 150,
            width: 500,
            collapsible: false,
            unstyled: false,
            tabchange: "MyTabs_tabchange",
            afterrender: "MyTabs_afterrender",
            activeItem: "panel",
            listeners: {
                tabchange: MyTabs_tabchange,
                vmdafterrender: MyTabs_afterrender
            },
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "基本",
                    header: true,
                    border: true,
                    height: 100,
                    style: "padding: 0px 0px",
                    layout: "fit",
                    autoScroll: false,
                    items: [{
                        xtype: "vmd.ux.LayoutPanel",
                        id: "hwLayoutPanel",
                        layout: "border",
                        settingChangedEvent: "hwLayoutPanel_settingChangedEvent",
                        LayoutItemVisibleChanged: "hwLayoutPanel_LayoutItemVisibleChanged",
                        layoutItemVisibleChanged: "hwLayoutPanel_layoutItemVisibleChanged",
                        listeners: {
                            settingChangedEvent: hwLayoutPanel_settingChangedEvent,
                            layoutItemVisibleChanged: hwLayoutPanel_layoutItemVisibleChanged
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "网格",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "fit",
                    autoHeight: false,
                    items: [{
                        xtype: "vmd.ux.GridType",
                        id: "hwGridType",
                        layout: "fit",
                        copyGridToForm: "hwGridType_copyGridToForm",
                        settingChangeEvents: "hwGridType_settingChangeEvents",
                        anchor: "100% 100%",
                        hidden: false,
                        listeners: {
                            copyGridToForm: hwGridType_copyGridToForm,
                            settingChangeEvents: hwGridType_settingChangeEvents
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "自由格式",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "fit",
                    items: [{
                        xtype: "vmd.ux.FormType",
                        id: "formtype",
                        layout: "fit",
                        copyGridToForm: "formtype_copyGridToForm",
                        settingChangeEvents: "formtype_settingChangeEvents",
                        listeners: {
                            copyGridToForm: formtype_copyGridToForm,
                            settingChangeEvents: formtype_settingChangeEvents
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel3",
                    title: "工具栏",
                    header: true,
                    border: true,
                    height: 100,
                    items: [{
                        xtype: "tabpanel",
                        id: "MyTabs1",
                        activeTab: 0,
                        height: 900,
                        width: 309,
                        tabchange: "MyTabs1_tabchange",
                        listeners: {
                            tabchange: MyTabs1_tabchange
                        },
                        items: [{
                                xtype: "panel",
                                id: "panel6",
                                title: "导航栏",
                                header: true,
                                border: true,
                                height: 402,
                                layout: "auto",
                                items: [{
                                    xtype: "vmd.ux.NavigationPanel",
                                    id: "hwNavigationPanel",
                                    layout: "fit",
                                    settingChangedEvent: "hwNavigationPanel_settingChangedEvent",
                                    height: 724,
                                    listeners: {
                                        settingChangedEvent: hwNavigationPanel_settingChangedEvent
                                    }
                                }]
                            },
                            {
                                xtype: "panel",
                                id: "panel7",
                                title: "编辑栏",
                                header: true,
                                border: true,
                                height: 100,
                                layout: "fit",
                                items: [{
                                    xtype: "vmd.ux.OperationPanel",
                                    id: "hwOperationPanel",
                                    layout: "fit",
                                    settingChangedEvent: "hwOperationPanel_settingChangedEvent",
                                    listeners: {
                                        settingChangedEvent: hwOperationPanel_settingChangedEvent
                                    }
                                }]
                            }
                        ]
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel5",
                    title: "统计",
                    header: true,
                    border: true,
                    height: 100,
                    items: [{
                        xtype: "vmd.ux.StatisticsPanel",
                        id: "statisticspanel",
                        layoutConfig: {
                            align: "left",
                            pack: "start"
                        },
                        layout: "vbox",
                        settingChangedEvent: "statisticspanel_settingChangedEvent",
                        listeners: {
                            settingChangedEvent: statisticspanel_settingChangedEvent
                        }
                    }]
                }
            ]
        }]
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
            save(activeCmp)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ContentFrame");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ContentFrame");
    }
})