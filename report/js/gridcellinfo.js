/**
 * Created by lf on 2018/5/3.
 * cellPropertyInfos
 */

function gridCellInfoObject() {


    this.textValue = {
        id: 'txtValue',
        value: "",
        type: 'Text'
    };

    this.showValue = {
        id: 'txtShowValue',
        value: "",
        type: 'Text'
    };

    // this.nr_alert={
    // 	id:'nr_alert',
    // 	value:'',
    // 	type:'Text'
    // };
    // this.nr_frontColorCheck={
    // 	id:'nr_frontColorCheck',
    // 	checked:false,
    // 	type:'CheckBox'
    // };
    // this.nr_bgColorCheck={
    // 	id:'nr_bgColorCheck',
    // 	checked:false,
    // 	type:'CheckBox'
    // };
    // this.nr_leftMarginCheck={
    // 	id:'nr_leftMarginCheck',
    // 	checked:false,
    // 	type:'CheckBox'
    // };
    // this.nr_heightCheck={
    // 	id:'nr_heightCheck',
    // 	checked:false,
    // 	type:'CheckBox'
    // };
    // this.nr_sameValueRight={
    // 	id:'nr_sameValueRight',
    // 	checked:false,
    // 	type:'CheckBox'
    // };
    // this.nr_sameValueDown={
    // 	id:'nr_sameValueDown',
    // 	checked:false,
    // 	type:'CheckBox'
    // };
    // this.nr_availableCheck={
    // 	id:'nr_availableCheck',
    // 	checked:false,
    // 	type:'CheckBox'
    // };
    // this.nr_widthCheck={
    // 	id:'nr_widthCheck',
    // 	checked:false,
    // 	type:'CheckBox'
    // };
    // this.nr_rowTextCheck={
    // 	id:'nr_rowTextCheck',
    // 	checked:false,
    // 	type:'CheckBox'
    // };
    // this.nr_bgColor={
    // 	id:'nr_bgColor',
    // 	value:'',
    // 	type:'Text'
    // };
    // this.nr_frontColor={
    // 	id:'nr_frontColor',
    // 	value:'',
    // 	type:'Text'
    // };
    // this.nr_leftMargin={
    // 	id:'nr_leftMargin',
    // 	value:'',
    // 	type:'Text'
    // };
    // this.nr_height={
    // 	id:'nr_height',
    // 	value:'',
    // 	type:'Text'
    // };
    // this.nr_rightDependencies={
    // 	id:'nr_rightDependencies',
    // 	value:'',
    // 	type:'Text'
    // };
    // this.nr_downDependencies={
    // 	id:'nr_downDependencies',
    // 	value:'',
    // 	type:'Text'
    // };
    //  this.nr_available={
    // 	id:'nr_available',
    // 	value:'',
    // 	type:'Text'
    // };
    // this.nr_width={
    // 	id:'nr_width',
    // 	value:'',
    // 	type:'Text'
    // };
    // this.nr_rowText={
    // 	id:'nr_rowText',
    // 	value:'',
    // 	type:'Text'
    // };



    this.bgColor = '';

    //    this.allowEdit= { id:'hwCheckbox',
    //        checked:false,
    //        type:'CheckBox'
    //    };
    // this. allowEdit = false;
    this.allowPrint = true;
    this.allowMultiRow = true;
    this.symbol = "";
    //    this.rule= { id:'combo',
    //        value:"",
    //        type:'ComboBox'
    //    };
    //数据集信息
    this.dataSet = '';
    //字体信息id
    this.fontid = '';
    // 边框信息id
    this.borderid = '';
    //数字属性信息
    this.numberid = "";
    //数据集字段
    this.field = "";
    //数据设置（单值、列表、分组）
    this.opration = "single";

    this.colspan = "";
    this.rowspan = "";

    // 扩展属性
    this.extraInfo = {
        // 左父格
        leftParent: {
            id: 'leftParent',
            value: "",
            type: 'Text'
        },
        // 清除左父格
        clearLeft: {
            id: 'chkExtraLeft',
            checked: false,
            type: 'CheckBox'
        },
        // 上父格
        rightParent: {
            id: 'rightParent',
            value: "",
            type: 'Text'
        },
        // 清除上父格
        clearTop: {
            id: 'chkExtraTop',
            checked: false,
            type: 'CheckBox'
        },
        // 扩展方向（1：不扩展，2：纵向，3：横向）
        direction: {
            id: 'extraDirection',
            value: "1",
            // 复合组件
            type: 'compound'
        }
    };
    // 对齐属性信息
    this.alignInfo = {
        // 对齐方式
        align: {
            id: 'AlignGroup',
            value: {
                HAlign: {
                    value: "left"
                },
                VAlign: {
                    value: "middle"
                }
            },
            type: 'compound'
        },
        // 文本控制
        textControl: {
            id: 'textControl',
            value: "",
            type: 'radiostoregroup'
        },
        // 转义标签
        escapelabel: {
            id: 'escapelabel',
            checked: false,
            type: 'CheckBox'
        },
        // 文本方向
        textDirection: {
            id: 'textDirection',
            value: "0",
            type: 'radiostoregroup'
        },
        // 旋转度
        rotation: {
            id: 'rotation',
            value: "0",
            type: 'Text'
        },
        // 单字旋转
        singleRotation: {
            id: 'singleRotation',
            checked: false,
            type: 'CheckBox'
        },
        // 单元格合并
        cellMerge: {
            id: 'cellMerge',
            value: "0",
            type: 'compound'
        },
        // 上边距
        topPadding: {
            id: 'topPadding',
            value: "0",
            type: 'Text'
        },
        // 下边距
        bottomPadding: {
            id: 'bottomPadding',
            value: "0",
            type: 'Text'
        },
        // 左边距
        leftPadding: {
            id: 'leftPadding',
            value: "4",
            type: 'Text'
        },
        // 右边距
        rightPadding: {
            id: 'rightPadding',
            value: "4",
            type: 'Text'
        },
        // 行间距
        verticalSpace: {
            id: 'verticalSpace',
            value: "",
            type: 'Text'
        },
        autoenter: {
            id: 'autoenter',
            value: '0',
            type: 'state'
        }

    };

    this.fontInfos = new fontSetting();
    //   this.borderInfo=new BorderLineSetting();

    this.initAttribute();

    this.setTextInfo = function(edit, print, multirow, symbol) {
        this.textInfo.allowEdit = edit;
        this.textInfo.allowPrint = print;
        this.textInfo.allowMultiRow = multirow;
        this.textInfo.symbol = symbol;
    };

    this.clearInfo = function() {
        this.textValue.value = "";
        this.showValue.value = "";
        this.bgColor = "";
        this.rule.value = "";
        this.allowEdit.checked = false;
        this.allowPrint = true;
        this.allowMultiRow = true;
        this.symbol = "";
        this.extraInfo.leftParent.value = "";
        this.extraInfo.rightParent.value = "";
        this.extraInfo.direction.value = "";
        this.extraInfo.clearLeft = false;
        this.extraInfo.clearTop = false;

        this.clearAlignInfo();
        this.fontInfos.clearInfo();
        //   this.borderInfo.clearInfo();
        this.clearInfo_ext();
    };

    this.setAttribute = function(attribute) {
        if (attribute) {
            //            for(var key=0;key< attribute.length;key++){
            //               if( attribute[key].name=='title'){
            //                   this.textValue=attribute[key].value;
            //                   this. symbol= attribute[key].value;
            //               }
            //             }
            this.symbol = attribute.textContent;
            this.textValue.value = attribute.textContent;
            this.showValue = attribute.cellAttributeInfo.showValue;
            attribute.cellAttributeInfo.symbol = attribute.textContent;
            this.allowEdit = attribute.cellAttributeInfo.allowEdit;
            this.allowPrint = attribute.cellAttributeInfo.allowPrint;
            this.rule = attribute.cellAttributeInfo.rule;
            // 扩展属性
            this.extraInfo.leftParent.value = attribute.cellAttributeInfo.extraInfo.leftParent.value;
            this.extraInfo.rightParent.value = attribute.cellAttributeInfo.extraInfo.rightParent.value;
            this.extraInfo.direction.value = attribute.cellAttributeInfo.extraInfo.direction.value;
            this.extraInfo.clearLeft.checked = attribute.cellAttributeInfo.extraInfo.clearLeft.checked;
            this.extraInfo.clearTop.checked = attribute.cellAttributeInfo.extraInfo.clearTop.checked;
            // 对齐信息
            this.setAlignInfo(attribute);
            this.fontInfos.setFontInfo(attribute.cellAttributeInfo.fontInfos);
            // this.borderInfo.setFontInfo(attribute.cellAttributeInfo.borderInfo);
            this.setAtrributeInfo_ext(attribute.cellAttributeInfo);
        }
    };
    // 设置对齐信息
    this.setAlignInfo = function(attribute) {
        this.alignInfo.align.value.HAlign.value = attribute.cellAttributeInfo.alignInfo.align.value.HAlign.value;
        this.alignInfo.align.value.VAlign.value = attribute.cellAttributeInfo.alignInfo.align.value.VAlign.value;
        if (attribute.style && attribute.style.textAlign)
            this.alignInfo.align.value.HAlign.value = attribute.style.textAlign;
        if (attribute.style && attribute.style.verticalAlign)
            this.alignInfo.align.value.VAlign.value = attribute.style.verticalAlign;
        this.alignInfo.textControl.value = attribute.cellAttributeInfo.alignInfo.textControl.value;
        this.alignInfo.escapelabel.checked = attribute.cellAttributeInfo.alignInfo.escapelabel.checked;
        this.alignInfo.textDirection.value = attribute.cellAttributeInfo.alignInfo.textDirection.value;
        this.alignInfo.rotation.value = attribute.cellAttributeInfo.alignInfo.rotation.value;
        this.alignInfo.singleRotation.checked = attribute.cellAttributeInfo.alignInfo.singleRotation.checked;
        this.alignInfo.cellMerge.value = attribute.cellAttributeInfo.alignInfo.cellMerge.value;
        this.alignInfo.topPadding.value = attribute.cellAttributeInfo.alignInfo.topPadding.value;
        this.alignInfo.topPadding.value = attribute.cellAttributeInfo.alignInfo.topPadding.value;
        this.alignInfo.bottomPadding.value = attribute.cellAttributeInfo.alignInfo.bottomPadding.value;
        this.alignInfo.leftPadding.value = attribute.cellAttributeInfo.alignInfo.leftPadding.value;
        this.alignInfo.rightPadding.value = attribute.cellAttributeInfo.alignInfo.rightPadding.value;
        this.alignInfo.verticalSpace.value = attribute.cellAttributeInfo.alignInfo.verticalSpace.value;
        this.alignInfo.autoenter.value = attribute.cellAttributeInfo.alignInfo.autoenter.value;
    };
    // 清空对齐信息
    this.clearAlignInfo = function(attribute) {
        this.alignInfo.align.value.HAlign.value = "left";
        this.alignInfo.align.value.VAlign.value = "middle";
        this.alignInfo.textControl.value = "0";
        this.alignInfo.escapelabel.checked = false;
        this.alignInfo.textDirection.value = "1";
        this.alignInfo.rotation.value = "0";
        this.alignInfo.singleRotation.checked = false;
        this.alignInfo.cellMerge.value = "0";
        // this.alignInfo.topPadding.value = "2";
        this.alignInfo.topPadding.value = "0";
        this.alignInfo.bottomPadding.value = "0";
        this.alignInfo.leftPadding.value = "4";
        this.alignInfo.rightPadding.value = "4";
        this.alignInfo.verticalSpace.value = "1";
        this.alignInfo.autoenter.value = '0';
    }
    this.clone = function() {
        var temp = new gridCellInfoObject();
        temp.alignInfo.align.value.HAlign.value = this.alignInfo.align.value.HAlign.value
        temp.alignInfo.align.value.VAlign.value = this.alignInfo.align.value.VAlign.value
        temp.alignInfo.textControl.value = this.alignInfo.textControl.value
        temp.alignInfo.escapelabel.checked = this.alignInfo.escapelabel.checked
        temp.alignInfo.textDirection.value = this.alignInfo.textDirection.value
        temp.alignInfo.rotation.value = this.alignInfo.rotation.value
        temp.alignInfo.singleRotation.checked = this.alignInfo.singleRotation.checked
        temp.alignInfo.cellMerge.value = this.alignInfo.cellMerge.value
        temp.alignInfo.topPadding.value = this.alignInfo.topPadding.value
        temp.alignInfo.bottomPadding.value = this.alignInfo.bottomPadding.value
        temp.alignInfo.leftPadding.value = this.alignInfo.leftPadding.value
        temp.alignInfo.rightPadding.value = this.alignInfo.rightPadding.value
        temp.alignInfo.verticalSpace.value = this.alignInfo.verticalSpace.value
        temp.alignInfo.autoenter.value = this.alignInfo.autoenter.value
        return temp;
    }
    var that = this;

    this.cellInfoToJson = function() {
        /*  var json="{";
          json+="TextInfo:[";
          json+="{id:'hwCheckbox',checked:"+that.allowEdit.toString()+",";
          json+="type:'CheckBox'},{id:'hwCheckbox1',checked:"+that.allowPrint.toString()+",";
          json+="type:'CheckBox'}]";
  
          json+="}";
  */
        // debugger
        json = {
            textinfo: [
                //                { id:'hwCheckbox',
                //                  checked:that.allowEdit.checked,
                //                  type:'CheckBox'
                //                },
                //                {
                //                    id:'hwCheckbox1',
                //                    checked:that.allowPrint,
                //                    type:'CheckBox'
                //             },
                {
                    id: 'txtValue',
                    value: that.textValue.value,
                    type: 'hwText'
                }, {
                    id: 'txtShowValue',
                    value: that.showValue.value,
                    type: 'hwText'
                }
                //                {
                //                    id:'combo',
                //                    value:that.rule.value,
                //                    type:'combo'
                //                }
            ],
            extraInfo: [{
                leftParent: {
                    id: 'leftParent',
                    value: that.extraInfo.leftParent.value,
                    type: 'Text'
                },
                // 上父格
                rightParent: {
                    id: 'rightParent',
                    value: that.extraInfo.rightParent.value,
                    type: 'Text'
                },
                // 扩展方向（1：不扩展，2：纵向，3：横向）
                direction: {
                    id: 'extraDirection',
                    value: that.extraInfo.direction.value,
                    // 复合组件
                    type: 'compound'
                },
                // 清除左父格
                clearLeft: {
                    id: 'chkExtraLeft',
                    checked: false,
                    type: 'CheckBox'
                },
                // 清除左父格
                clearTop: {
                    id: 'chkExtraTop',
                    checked: false,
                    type: 'CheckBox'
                }
            }],
            // 对齐属性信息
            alignInfo: [{
                // 对齐方式
                align: {
                    id: 'AlignGroup',
                    value: {
                        HAlign: {
                            value: that.alignInfo.align.value.HAlign.value
                        },
                        VAlign: {
                            value: that.alignInfo.align.value.VAlign.value
                        }
                    },
                    type: 'compound'
                },
                // 文本控制
                textControl: {
                    id: 'textControl',
                    value: that.alignInfo.textControl.value,
                    type: 'compound'
                },
                // 转义标签
                escapelabel: {
                    id: 'escapelabel',
                    checked: that.alignInfo.escapelabel.checked,
                    type: 'compound'
                },
                // 文本方向
                textDirection: {
                    id: 'textDirection',
                    value: that.alignInfo.textDirection.value,
                    type: 'compound'
                },
                // 旋转度
                rotation: {
                    id: 'rotation',
                    value: that.alignInfo.rotation.value,
                    type: 'Text'
                },
                // 单字旋转
                singleRotation: {
                    id: 'singleRotation',
                    value: that.alignInfo.singleRotation.checked,
                    type: 'CheckBox'
                },
                // 单元格合并
                cellMerge: {
                    id: 'cellMerge',
                    value: that.alignInfo.cellMerge.value,
                    type: 'compound'
                },
                // 上边距
                topPadding: {
                    id: 'topPadding',
                    value: that.alignInfo.topPadding.value,
                    type: 'Text'
                },
                // 下边距
                bottomPadding: {
                    id: 'bottomPadding',
                    value: that.alignInfo.bottomPadding.value,
                    type: 'Text'
                },
                // 左边距
                leftPadding: {
                    id: 'leftPadding',
                    value: that.alignInfo.leftPadding.value,
                    type: 'Text'
                },
                // 右边距
                rightPadding: {
                    id: 'rightPadding',
                    value: that.alignInfo.rightPadding.value,
                    type: 'Text'
                },
                // 行间距
                verticalSpace: {
                    id: 'verticalSpace',
                    value: that.alignInfo.verticalSpace.value,
                    type: 'Text'
                },
                autoenter: {
                    id: 'autoenter',
                    value: that.alignInfo.autoenter.value,
                    type: 'state'
                }
            }],
            fontInfos: this.fontInfos.cellInfoToJson().allFontInfo
            //  borderInfo:this.borderInfo.cellInfoToJson().comboInfo

        }
        json = this.cellInfoToJson_ext(json);
        return json;
    };

    // function forChecked(c, id, value) {
    //     if (c.type == "CheckBox") {
    //         c.checked = value;
    //     } else {
    //         c.value = value;
    //     }
    // }

    // 根据id设置相应属性的值
    this.setCellInfos = function(id, value) {
        var c = this.getInfoByID(id);
        if (c) {
            if (c.type == "CheckBox") {
                c.checked = value;
            } else {
                c.value = value;
            }
        }
        this.fontInfos.setCellInfos(id, value);
        //this.borderInfo.setCellInfos(id,value);
        this.setCellInfos_ext(id, value);
    };
    // 根据id获取属性
    this.getInfoByID = function(id) {
        if (this.textValue.id == id) {
            return this.textValue;
        }
        if (this.showValue.id == id) {
            return this.showValue;
        }
        //       if(this.allowEdit.id==id){
        //           return this.allowEdit;
        //       }
        //       if(this.rule.id==id){
        //           return this.rule;
        //       }
        // 扩展属性信息
        if (this.extraInfo.leftParent.id == id) {
            return this.extraInfo.leftParent;
        }
        if (this.extraInfo.rightParent.id == id) {
            return this.extraInfo.rightParent;
        }
        if (this.extraInfo.direction.id == id) {
            return this.extraInfo.direction;
        }
        if (this.alignInfo.align.id == id) {
            return this.alignInfo.align;
        }
        if (this.extraInfo.clearLeft.id == id) {
            return this.extraInfo.clearLeft;
        }
        if (this.extraInfo.clearTop.id == id) {
            return this.extraInfo.clearTop;
        }
        if (this.alignInfo.textControl.id == id) {
            return this.alignInfo.textControl;
        }
        if (this.alignInfo.escapelabel.id == id) {
            return this.alignInfo.escapelabel;
        }
        if (this.alignInfo.textDirection.id == id) {
            return this.alignInfo.textDirection;
        }
        if (this.alignInfo.rotation.id == id) {
            return this.alignInfo.rotation;
        }
        if (this.alignInfo.singleRotation.id == id) {
            return this.alignInfo.singleRotation;
        }
        if (this.alignInfo.cellMerge.id == id) {
            return this.alignInfo.cellMerge;
        }
        if (this.alignInfo.topPadding.id == id) {
            return this.alignInfo.topPadding;
        }
        if (this.alignInfo.bottomPadding.id == id) {
            return this.alignInfo.bottomPadding;
        }
        if (this.alignInfo.leftPadding.id == id) {
            return this.alignInfo.leftPadding;
        }
        if (this.alignInfo.rightPadding.id == id) {
            return this.alignInfo.rightPadding;
        }
        if (this.alignInfo.verticalSpace.id == id) {
            return this.alignInfo.verticalSpace;
        }
        if (this.alignInfo.autoenter.id == id) {
            return this.alignInfo.autoenter;
        }
        //if(this.fontInfos.getInfoByID(id))

        var font_obj = this.fontInfos.getInfoByID(id);
        if (font_obj) return font_obj;
        //  this.borderInfo.getInfoByID(id);
        var ext_obj = this.getInfoByID_ext(id);
        if (ext_obj) return ext_obj;
        //this.getInfoByID_ext(id);
    };
     // 表达式编辑区设置可见不可见以及各属性信息
    this.paserExp = function(el,reportid) {

        // 单元格内容带有等号的表达式的
        if (el.cellAttributeInfo.textValue.value && el.cellAttributeInfo.textValue.value.trim().substring(0, 1) == "=" && el.cellAttributeInfo.textValue.value.indexOf('.') > -1) {
            var e = this.designerCom.datasetExp || document.getElementById("datasetExp")
            if (e) {
                e.style.display = "";
            }
            var e1 = this.designerCom.valuediv || document.getElementById("valuediv")
            if (el) {
                e1.style.display = "none";
                this.parser(el.cellAttributeInfo.textValue.value, el.cellAttributeInfo,reportid);
            }
        } else {
            var e = this.designerCom.datasetExp || document.getElementById("datasetExp")
            e.style.display = "none";
            var e1 = this.designerCom.valuediv || document.getElementById("valuediv")
            e1.style.display = "";
            var ip = this.designerCom.valueInput || document.getElementById("valueInput")
            ip.value = el.cellAttributeInfo.textValue.value;
        }
    };

    this.getDSByDsName= function (dsName,reportid) {
        var r_store;
        if (!dsName)
            return r_store;
        var storeRoot = xds.vmd.getRootNode("dataset");
        if (typeof storeRoot != 'undefined') {
            storeRoot.eachChild(function(n) {
                var dsname;
                if (n.component && n.component.getConfig()) {
                    dsname = n.component.getConfig().dsName;
                    if(reportid){
                        if (dsname && dsname.indexOf(reportid) > -1) {
                            var indexCount = dsname.indexOf(reportid);
                            if (dsname.length > indexCount) {
                                dsname = dsname.substring(indexCount + reportid.length + 1);
                            }
                        }
                    }
                }
                if (dsName == n.id || dsname == dsName) {
                    r_store= n.id;
                }
            }, this);
        }
        return r_store;
    },
    // 解析表达式
    this.parser = function(exp, cellInfo,reportid) {
        var e = exp.trim().substring(1);
        var s = e.split(".");
        if (s.length > 1) {
            cellInfo.dataSet = s[0];
            // 数据集
            var all_options = this.designerCom.cmbDataset || document.getElementById("cmbDataset").options;
            // 数据列
            var comboField = this.designerCom.cmbFiled || document.getElementById("cmbFiled");
            //数据设置
            var cmbOpration = this.designerCom.cmbOpration || document.getElementById("cmbOpration");

            for (i = 0; i < all_options.length; i++) {
                //通过数据集获取在vmd2.0中定义的名称
                var ds = this.getDSByDsName(s[0],reportid);
                if (ds && all_options[i]._id == ds) // 根据option标签的ID来进行判断
                {
                    all_options[i].selected = true;
                    this.setFieldCmb(ds, comboField);
                    break;
                }
            }
            var opr = "";
            if (s[1].indexOf("(") > -1) {
                var op = s[1].split('(');
                if (op.length > 1) {
                    if (op[0] == "Select") {
                        cellInfo.opration = "select";
                        opr = "列表";
                    } else if (op[0] == "Group") {
                        cellInfo.opration = "group";
                        opr = "分组";
                    }
                    var field = op[1].split(')');
                    cellInfo.field = field[0];
                }
            } else {
                cellInfo.field = s[1];
                opr = "单值";
            }
            for (i = 0; i < comboField.options.length; i++) {
                if (i > 0 && comboField.options[i]._id.toLowerCase() == cellInfo.field.toLowerCase()) // 根据option标签的ID来进行判断
                {
                    comboField.options[i].selected = true;
                    break;
                }
            }
            for (i = 0; i < cmbOpration.options.length; i++) {
                if (i > 0 && cmbOpration.options[i]._id == opr) // 根据option标签的ID来进行判断
                {
                    cmbOpration.options[i].selected = true;
                    break;
                }
            }
        }
    };
    //设置数据集之后设置数据集字段列表
    this.setFieldCmb = function(dsname, comboField) {
        if (comboField.options.length > 0) {
            for (var i = comboField.options.length; i >= 1; i--) {
                comboField.options.remove(1);
            }
        }
        // 数据字段设置
        if (typeof xds == 'undefined') xds = parent.xds;
        var storeRoot = xds.vmd.getRootNode("dataset");
        var storeNode = storeRoot && storeRoot.findChildBy(function() {
            return this.id == dsname;
        });
        storeNode && storeNode.eachChild(function(c) {
            var op = document.createElement("option");
            op._id = c.text;
            op.innerHTML = c.text;
            comboField.appendChild(op);
        }, this);
    }

}



function fontSetting() {
    this.fontFamily = {
            id: "fontFamily",
            value: "SimSun",
            type: "comlist"
        },
        this.fontShape = {
            id: "fontShape",
            value: "normal", //1常规2倾斜3加粗4粗斜
            type: "comlist"
        },
        this.fontSize = {
            id: "fontSize",
            value: "12",
            type: "comlist"
        },
        this.underline = {
            id: "underline",
            value: "N", //Y有下划线N没有
            type: "radiostoregroup"
        },
        this.ColorSelect = {
            id: "fontColorSelect",
            value: "#000",
            type: "ColorSelect"
        }, this.fontWeight = {
            id: 'fontWeight',
            value: '',
            type: 'comlist'
        }

    //清空属性
    this.clearInfo = function() {
        this.fontFamily.value = "SimSun";
        this.fontShape.value = "normal";
        this.fontSize.value = "9";
        this.underline.value = "N";
        this.ColorSelect.value = "#000";
        this.fontWeight.value = '';
    };

    //设置值
    this.setFontInfo = function(info) {
        this.fontFamily.value = info.fontFamily.value;
        this.fontShape.value = info.fontShape.value;
        this.fontSize.value = info.fontSize.value;
        this.underline.value = info.underline.value;
        this.ColorSelect.value = info.ColorSelect.value
        this.fontWeight.value = info.fontWeight.value;
    };

    // 根据id设置相应属性的值
    this.setCellInfos = function(id, value) {
        var c = this.getInfoByID(id);
        if (c) {
            if (c.type == 'CheckBox') {
                c.checked = value
            } else {
                c.value = value
            }
        }
        return c;
    };

    //通过id获取属性
    this.getInfoByID = function(id) {
        if (this.fontFamily.id == id) {
            return this.fontFamily;
        }
        if (this.fontShape.id == id) {
            return this.fontShape;
        }
        if (this.fontSize.id == id) {
            return this.fontSize;
        }
        if (this.underline.id == id) {
            return this.underline;
        }
        if (this.ColorSelect.id == id) {
            return this.ColorSelect;
        }
        if (this.fontWeight.id == id) {
            return this.fontWeight
        }
    }
    this.clone = function() {
        var temp = new fontSetting();
        temp.fontFamily.value = this.fontFamily.value
        temp.fontShape.value = this.fontShape.value
        temp.fontSize.value = this.fontSize.value
        temp.underline.value = this.underline.value
        temp.ColorSelect.value = this.ColorSelect.value
        temp.fontWeight.value = this.fontWeight.value
        return temp;
    }

    //转换JSON串
    this.cellInfoToJson = function() {
        json = {
            allFontInfo: [{
                fontFamily: {
                    id: 'fontFamily',
                    value: this.fontFamily.value,
                    type: 'comlist'
                },
                fontShape: {
                    id: 'fontShape',
                    value: this.fontShape.value,
                    type: 'comlist'
                },
                fontSize: {
                    id: 'fontSize',
                    value: this.fontSize.value,
                    type: 'comlist'
                },
                underline: {
                    id: 'underline',
                    value: this.underline.value,
                    type: 'radiostoregroup'
                },
                ColorSelect: {
                    id: 'fontColorSelect',
                    value: this.ColorSelect.value,
                    type: 'ColorSelect'
                },
                fontWeight: {
                    id: 'fontWeight',
                    value: this.fontWeight.value,
                    type: 'comlist'
                }
            }]
        }
        return json;
    }
}