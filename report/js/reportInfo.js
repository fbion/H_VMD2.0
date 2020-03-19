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
                    info.rightClick == f.rightClick&&
					info.itemClick==f.itemClick&&
					info.beforeClick==f.beforeClick
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
                    case "List": //下拉列表
                        if (this.cellTypeList(f, info)) {
                            id = key;
                            isIn = true;
                        }
                        break;
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
            f.minvalue == info.minvalue) {
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

    this.cellTypeList = function(f, info) {
        if (f.isenableedit == info.isenableedit &&
            f.isprint == info.isprint &&
            f.clicktrigger == info.clicktrigger &&
            f.ismulti == info.ismulti &&
            f.width == info.width &&
            f.isallownull == info.isallownull &&
            f.emptydisplay == info.emptydisplay) {
            return true;
        }
        return false;
    }

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
            f.bottontype == info.bottontype &&
            f.carrycol == info.carrycol &&
            f.insertrowtype == info.insertrowtype &&
            f.isdeletedata == info.isdeletedata &&
            f.name == info.name &&
            f.status == info.status&&
            f.click==info.click&&
            f.dbclick==info.dbclick&&
            f.lastdeleteonlydata==info.lastdeleteonlydata&&
            f.delstore==info.delstore&&
            f.allowprint==info.allowprint&&
            f.allowalert==info.allowalert&&
            f.labelposition==info.labelposition&&
            f.rowselect==info.rowselect&&
            f.text==info.text
            ) {
            return true;
        }
        return false
    }
}