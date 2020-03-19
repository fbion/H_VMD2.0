/**
 * Created by Administrator on 2018/9/10.
 * 
 */

// 添加属性信息
gridCellInfoObject.prototype.initAttribute = function() {
	this.contentDetailInfo = new contentDetailType(); //内容界面剩余
	this.cell_NumberInfo = new cellNumberType(); //属性-数字
	this.borderInfo = new BorderLineSetting(); //边框
	this.bgcolorInfo = new bgColorSetting(); //背景色
	this.numberInfo = new numberCategory(); //数字
	this.printInfo = new printSetting(); //打印选项
	this.storeInfo = new storeGeter(); //页面上的数据库信息
	this.contentInfo = new ContentSetting(); //属性-总下拉框
	this.cell_TextInfo = new cellTextType(); //属性-文本
	this.cell_ComboInfo = new cellComboType(); //属性-下拉框
	this.cell_CheckBoxInfo = new cellCheckBoxType(); //属性-复选框
	this.cell_ApprovlInfo = new cellApprovlType(); //属性-审批组件
	this.cell_UploadInfo = new cellUplodeType(); //属性-上传组件
	this.cell_NestedTableInfo = new cellNestedTableType(); //属性-嵌套表
	this.cell_RichTextInfo = new cellRichTextType(); //属性-富文本
	this.cell_GraphicInfo = new cellGraphicType(); //属性-图形
	this.cell_RadioButtonInfo = new cellRadioButtonType(); //属性-单选框
	this.cell_ProgressBarInfo = new cellProgressBarType(); //属性-进度条
	this.cell_DateInfo = new cellDateType() //属性-日期
	this.cell_DropDownTreeInfo = new cellDropDownTreeType() //属性-下拉树

	this.cell_ButtonInfo = new cellButtonType(); //属性-按钮
	this.cell_ddg = new cellDropDownGrid(); //属性-下拉网格

	this.leftLink = new leftLink(); // 超链接
	this.menu = new menu(); // 菜单
	this.flInfo = new flSetting(); //分栏
	this.fpInfo = new fpSetting(); //分片
};
//清空属性
gridCellInfoObject.prototype.clearInfo_ext = function() {
	var me = this;
	for (var key in me) {
		var obj = me[key];
		if (obj && me.hasOwnProperty(key)) {
			if (obj.clearInfo) {
				obj.clearInfo();
			}
		}
	}
};
//设置值
gridCellInfoObject.prototype.setAtrributeInfo_ext = function(info, cell) {
	if (this.cell_ButtonInfo) {

		this.cell_ButtonInfo.setCellInfo(info.cell_ButtonInfo, cell)
	}
	if (this.cell_ddg) {
		this.cell_ddg.setCellInfo(info.cell_ddg, cell)
	}
	if (this.fpInfo) {
		this.fpInfo.setCellInfo(info.fpInfo, cell)
	}
	if (this.flInfo) {
		this.flInfo.setCellInfo(info.flInfo, cell)
	}
	if (this.leftLink) { // 超链接
		this.leftLink.setCellInfo(info.leftLink, cell);
	}
	if (this.menu) { // 菜单
		this.menu.setCellInfo(info.menu, cell);
	}
	if (this.contentDetailInfo) {
		this.contentDetailInfo.setCellInfo(info.contentDetailInfo, cell)
	}
	if (this.cell_DropDownTreeInfo) {
		this.cell_DropDownTreeInfo.setCellInfo(info.cell_DropDownTreeInfo, cell)
	}
	if (this.storeInfo) {
		this.storeInfo.setCellInfo(info.storeInfo, cell);
	}
	if (this.cell_data_sczjInfo) {
		this.cell_data_sczjInfo.setCellInfo(info.cell_data_sczjInfo, cell)
	}
	if (this.cell_data_xlsInfo) {
		this.cell_data_xlsInfo.setCellInfo(info.cell_data_xlsInfo, cell)
	}
	if (this.cell_CheckBoxInfo) {
		this.cell_CheckBoxInfo.setCellInfo(info.cell_CheckBoxInfo, cell)
	}
	if (this.cell_data) {
		this.cell_data.setCellInfo(info.cell_data, cell)
	}
	if (this.cell_data_fxkInfo) {
		this.cell_data_fxkInfo.setCellInfo(info.cell_data_fxkInfo, cell)
	}
	if (this.cell_data_dxanInfo) {
		this.cell_data_dxanInfo.setCellInfo(info.cell_data_dxanInfo, cell)
	}
	if (this.contentInfo) {
		this.contentInfo.setCellInfo(info.contentInfo, cell)
	}
	if (this.borderInfo) {
		this.borderInfo.setCellInfo(info.borderInfo, cell);
	}
	if (this.bgcolorInfo) {
		this.bgcolorInfo.setCellInfo(info.bgcolorInfo, cell);
	}
	if (this.ordinaryDataInfo) {
		this.ordinaryDataInfo.setCellInfo(info.ordinaryDataInfo, cell)
	}
	if (this.numberInfo) {
		this.numberInfo.setCellInfo(info.numberInfo, cell);
	}
	if (this.printInfo) {
		this.printInfo.setCellInfo(info.printInfo, cell);
	}
	if (this.cell_TextInfo) {
		this.cell_TextInfo.setCellInfo(info.cell_TextInfo, cell);
	}
	if (this.cell_ComboInfo) {
		this.cell_ComboInfo.setCellInfo(info.cell_ComboInfo, cell);
	}
	if (this.VCEventInfo) {
		this.VCEventInfo.setCellInfo(info.VCEventInfo, cell)
	}
	if (this.cell_ApprovlInfo) {
		this.cell_ApprovlInfo.setCellInfo(info.cell_ApprovlInfo, cell)
	}
	if (this.cell_RadioButtonInfo) {
		this.cell_RadioButtonInfo.setCellInfo(info.cell_RadioButtonInfo, cell)
	}
	if (this.cell_UploadInfo) {
		this.cell_UploadInfo.setCellInfo(info.cell_UploadInfo, cell)
	}
	if (this.cell_NestedTableInfo) {
		this.cell_NestedTableInfo.setCellInfo(info.cell_NestedTableInfo, cell)
	}
	if (this.cell_RichTextInfo) {
		this.cell_RichTextInfo.setCellInfo(info.cell_RichTextInfo, cell)
	}
	if (this.cell_GraphicInfo) {
		this.cell_GraphicInfo.setCellInfo(info.cell_GraphicInfo, cell)
	}
	if (this.cell_NumberInfo) {
		this.cell_NumberInfo.setCellInfo(info.cell_NumberInfo, cell)
	}
	if (this.cell_ProgressBarInfo) {
		this.cell_ProgressBarInfo.setCellInfo(info.cell_ProgressBarInfo, cell)
	}
	if (this.cell_DateInfo) {
		this.cell_DateInfo.setCellInfo(info.cell_DateInfo, cell)
	}
};
// 根据id设置相应属性的值
gridCellInfoObject.prototype.setCellInfos_ext = function(id, value) {
	var me = this;
	for (var key in me) {
		var obj = me[key];
		if (obj && me.hasOwnProperty(key)) {
			if (obj.setCellInfos) {
				obj.setCellInfos(id, value)
			}
		}
	}
};
//通过id获取属性
gridCellInfoObject.prototype.getInfoByID_ext = function(id, com) {
	var returnval;
	var me = this;
	if (com)
		me = com;
	for (var key in me) {
		var obj = me[key];
		if (obj && me.hasOwnProperty(key)) {
			if (typeof obj == "object") {
				for (var akey in obj) {
					if (typeof obj[akey] == "object") {
						if (obj[akey] && obj[akey].id) {
							if (obj[akey].id == id) {
								returnval = obj[akey];
							}
						}
					}
				}
			}
		}
	}
	for (var key in me) {
		var obj = me[key];
		if (obj && me.hasOwnProperty(key)) {
			var boo = typeof obj;
			if (boo == "object") {
				for (var akey in obj) {
					if (obj[akey] == id) {
						//returnval = obj.getInfoByID(id);
						return obj;
						//	break;
					}
					if (obj && obj[akey]) {
						if (obj[akey].id == id) {
							if (obj && obj.getInfoByID) {
								returnval = obj.getInfoByID(id);
								break;
							}
						}
					}
				}
			}

		}
	}
	return returnval;
};
//转换JSON串
gridCellInfoObject.prototype.cellInfoToJson_ext = function(json) {
	if (this.cell_ButtonInfo) {
		json.cell_ButtonInfo = this.cell_ButtonInfo.cellInfoToJson().buttonJson;
	}
	if (this.cell_ddg) {
		json.cell_ddg = this.cell_ddg.cellInfoToJson().cell_ddg;
	}
	if (this.fpInfo) {
		json.fpInfo = this.fpInfo.cellInfoToJson().fpInfo;
	}
	if (this.flInfo) {
		json.flInfo = this.flInfo.cellInfoToJson().flInfo;
	}
	if (this.leftLink) { // 超链接
		json.leftLink = this.leftLink.cellInfoToJson().cellLeftLinkInfo;
	}
	if (this.menu) { // 菜单
		json.menu = this.menu.cellInfoToJson().cellMenuInfo
	}
	if (this.contentDetailInfo) {
		json.contentDetailInfo = this.contentDetailInfo.cellInfoToJson().cdInfo;
	}
	if (this.cell_DropDownTreeInfo) {
		json.cell_DropDownTreeInfo = this.cell_DropDownTreeInfo.cellInfoToJson().xlsInfo;
	}
	if (this.storeInfo) {
		json.storeInfo = this.storeInfo.cellInfoToJson().allStore;
	}
	if (this.cell_data_sczjInfo) {
		json.cell_data_sczjInfo = this.cell_data_sczjInfo.cellInfoToJson().sczjData;
	}
	if (this.cell_data_xlsInfo) {
		json.cell_data_xlsInfo = this.cell_data_xlsInfo.cellInfoToJson().xlsData;
	}
	if (this.cell_data_fxkInfo) {
		json.cell_data_fxkInfo = this.cell_data_fxkInfo.cellInfoToJson().fxkData;
	}
	if (this.cell_data_dxanInfo) {
		json.cell_data_dxanInfo = this.cell_data_dxanInfo.cellInfoToJson().dxanData;
	}
	if (this.cell_data) {
		json.cell_data = this.cell_data.cellInfoToJson().xlkData;
	}
	if (this.contentInfo) {
		json.contentInfo = this.contentInfo.cellInfoToJson().Content
	}
	if (this.cell_CheckBoxInfo) {
		json.cell_CheckBoxInfo = this.cell_CheckBoxInfo.cellInfoToJson().cellCheckBoxInfo
	}
	if (this.borderInfo) {
		//   
		json.borderInfo = this.borderInfo.cellInfoToJson().comboInfo;
	}
	if (this.bgcolorInfo) {
		json.bgcolorInfo = this.bgcolorInfo.cellInfoToJson().background_color;
	}
	if (this.ordinaryDataInfo) {
		json.ordinaryDataInfo = this.ordinaryDataInfo.cellInfoToJson().ordinaryDataInfo;
	}
	if (this.numberInfo) {
		json.numberInfo = this.numberInfo.cellInfoToJson().allNumberInfo;
	}
	if (this.printInfo) {
		json.printInfo = this.printInfo.cellInfoToJson().printSettingInfo;
	}
	if (this.cell_TextInfo) {
		json.cell_TextInfo = this.cell_TextInfo.cellInfoToJson().cellTextInfo;
	}
	if (this.cell_ComboInfo) {
		json.cell_ComboInfo = this.cell_ComboInfo.cellInfoToJson().cellComboInfo;
	}
	if (this.VCEventInfo) {
		json.VCEventInfo = this.VCEventInfo.cellInfoToJson().VCEventInfo;
	}
	if (this.cell_ApprovlInfo) {
		json.cell_ApprovlInfo = this.cell_ApprovlInfo.cellInfoToJson().cellApprovlInfo
	}
	if (this.cell_RadioButtonInfo) {
		json.cell_RadioButtonInfo = this.cell_RadioButtonInfo.cellInfoToJson().cellNumberInfo
	}
	if (this.cell_UploadInfo) {
		json.cell_UploadInfo = this.cell_UploadInfo.cellInfoToJson().cellUpdateTypeInfo
	}
	if (this.cell_NestedTableInfo) {
		json.cell_NestedTableInfo = this.cell_NestedTableInfo.cellInfoToJson().cellNestedTableInfo
	}
	if (this.cell_RichTextInfo) {
		json.cell_RichTextInfo = this.cell_RichTextInfo.cellInfoToJson().cellRichTextInfo
	}
	if (this.cell_GraphicInfo) {
		json.cell_GraphicInfo = this.cell_GraphicInfo.cellInfoToJson().cellGraphicInfo
	}
	if (this.cell_NumberInfo) {
		json.cell_NumberInfo = this.cell_NumberInfo.cellInfoToJson().cellNumberInfo
	}
	if (this.cell_ProgressBarInfo) {
		json.cell_ProgressBarInfo = this.cell_ProgressBarInfo.cellInfoToJson().cellProgressBarInfo
	}
	if (this.cell_DateInfo) {
		json.cell_DateInfo = this.cell_DateInfo.cellInfoToJson().cellDateInfo
	}
	return json;
};

//判断checked和value
function forChecked(c, id, value) {
	if (c.type == "CheckBox") {

		c.checked = value;
	} else if (typeof value == "object") {
		if (value && value.data && value.data.name) {
			c.value = value.data.name;
		} else if (value && value.inputValue) {
			c.value = value.inputValue;
			// radiostoregroup特殊处理
		}

	} else {
		c.value = value;
	}
}

function contentDetailType() {
	this.nr_frontColorCheck = {
			id: 'nr_frontColorCheck',
			checked: false,
			type: 'CheckBox'
		},
		this.nr_bgColorCheck = {
			id: 'nr_bgColorCheck',
			checked: false,
			type: 'CheckBox'
		},
		this.nr_leftMarginCheck = {
			id: 'nr_leftMarginCheck',
			checked: false,
			type: 'CheckBox'
		},
		this.nr_heightCheck = {
			id: 'nr_heightCheck',
			checked: false,
			type: 'CheckBox'
		},
		this.nr_sameValueRight = {
			id: 'nr_sameValueRight',
			checked: false,
			type: 'CheckBox'
		},
		this.nr_sameValueDown = {
			id: 'nr',
			checked: false,
			type: 'CheckBox'
		},
		this.nr_availableCheck = {
			id: 'nr_availableCheck',
			checked: false,
			type: 'CheckBox'
		},
		this.nr_widthCheck = {
			id: 'nr_widthCheck',
			checked: false,
			type: 'CheckBox'
		},
		this.nr_rowTextCheck = {
			id: 'nr_rowTextCheck',
			checked: false,
			type: 'CheckBox'
		},
		this.nr_bgColor = {
			id: 'nr_bgColor',
			value: '',
			type: 'Text'
		},
		this.nr_frontColor = {
			id: 'nr_frontColor',
			value: '',
			type: 'Text'
		},
		this.nr_leftMargin = {
			id: 'nr_leftMargin',
			value: '',
			type: 'Text'
		},
		this.nr_height = {
			id: 'nr_height',
			value: '',
			type: 'Text'
		},
		this.nr_rightDependencies = {
			id: 'nr_rightDependencies',
			value: '',
			type: 'Text'
		},
		this.nr_downDependencies = {
			id: 'nr_downDependencies',
			value: '',
			type: 'Text'
		},
		this.nr_available = {
			id: 'nr_available',
			value: '',
			type: 'Text'
		},
		this.nr_width = {
			id: 'nr_width',
			value: '',
			type: 'Text'
		},
		this.nr_rowText = {
			id: 'nr_rowText',
			value: '',
			type: 'Text'
		}
	this.clone = function() {
		var temp = new contentDetailType();
		temp.nr_bgColorCheck.checked = this.nr_bgColorCheck.checked;
		temp.nr_frontColorCheck.checked = this.nr_frontColorCheck.checked;
		temp.nr_leftMarginCheck.checked = this.nr_leftMarginCheck.checked;
		temp.nr_heightCheck.checked = this.nr_heightCheck.checked;
		temp.nr_sameValueRight.checked = this.nr_sameValueRight.checked;
		temp.nr_sameValueDown.checked = this.nr_sameValueDown.checked;
		temp.nr_availableCheck.checked = this.nr_availableCheck.checked;
		temp.nr_widthCheck.checked = this.nr_widthCheck.checked;
		temp.nr_rowTextCheck.checked = this.nr_rowTextCheck.checked;
		temp.nr_bgColor.value = this.nr_bgColor.value
		temp.nr_frontColor.value = this.nr_frontColor.value
		temp.nr_leftMargin.value = this.nr_leftMargin.value
		temp.nr_rowText.value = this.nr_rowText.value
		temp.nr_width.value = this.nr_width.value
		temp.nr_available.value = this.nr_available.value
		temp.nr_height.value = this.nr_height.value
		temp.nr_downDependencies.value = this.nr_downDependencies.value
		temp.nr_rightDependencies.value = this.nr_rightDependencies.value
		return temp;
	}

	//清空属性
	this.clearInfo = function() {
		// this.nr_alert.value = "";
		this.nr_bgColorCheck.checked = false;
		this.nr_frontColorCheck.checked = false;
		this.nr_leftMarginCheck.checked = false;
		this.nr_heightCheck.checked = false;
		this.nr_sameValueRight.checked = false;
		this.nr_sameValueDown.checked = false;
		this.nr_availableCheck.checked = false;
		this.nr_widthCheck.checked = false;
		this.nr_rowTextCheck.checked = false;
		this.nr_bgColor.value = ""
		this.nr_frontColor.value = ""
		this.nr_leftMargin.value = ""
		this.nr_rowText.value = ""
		this.nr_width.value = ""
		this.nr_available.value = ""
		this.nr_height.value = ""
		this.nr_downDependencies.value = ""
		this.nr_rightDependencies.value = ""
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.nr_bgColorCheck.checked = info.nr_bgColorCheck.checked
		this.nr_frontColorCheck.checked = info.nr_frontColorCheck.checked
		this.nr_leftMarginCheck.checked = info.nr_leftMarginCheck.checked
		this.nr_heightCheck.checked = info.nr_heightCheck.checked
		this.nr_sameValueRight.checked = info.nr_sameValueRight.checked
		this.nr_sameValueDown.checked = info.nr_sameValueDown.checked
		this.nr_availableCheck.checked = info.nr_availableCheck.checked
		this.nr_widthCheck.checked = info.nr_widthCheck.checked
		this.nr_rowTextCheck.checked = info.nr_rowTextCheck.checked
		this.nr_bgColor.value = info.nr_bgColor.value
		this.nr_frontColor.value = info.nr_frontColor.value
		this.nr_leftMargin.value = info.nr_leftMargin.value
		this.nr_rowText.value = info.nr_rowText.value
		this.nr_width.value = info.nr_width.value
		this.nr_available.value = info.nr_available.value
		this.nr_height.value = info.nr_height.value
		this.nr_downDependencies.value = info.nr_downDependencies.value
		this.nr_rightDependencies.value = info.nr_rightDependencies.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)


	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cdInfo: [
				this.nr_frontColorCheck = {
					id: 'nr_frontColorCheck',
					checked: this.nr_frontColorCheck.checked,
					type: 'CheckBox'
				},
				this.nr_bgColorCheck = {
					id: 'nr_bgColorCheck',
					checked: this.nr_bgColorCheck.checked,
					type: 'CheckBox'
				},
				this.nr_leftMarginCheck = {
					id: 'nr_leftMarginCheck',
					checked: this.nr_leftMarginCheck.checked,
					type: 'CheckBox'
				},
				this.nr_heightCheck = {
					id: 'nr_heightCheck',
					checked: this.nr_heightCheck.checked,
					type: 'CheckBox'
				},
				this.nr_sameValueRight = {
					id: 'nr_sameValueRight',
					checked: this.nr_sameValueRight.checked,
					type: 'CheckBox'
				},
				this.nr_sameValueDown = {
					id: 'nr_sameValueDown',
					checked: this.nr_sameValueDown.checked,
					type: 'CheckBox'
				},
				this.nr_availableCheck = {
					id: 'nr_availableCheck',
					checked: this.nr_availableCheck.checked,
					type: 'CheckBox'
				},
				this.nr_widthCheck = {
					id: 'nr_widthCheck',
					checked: this.nr_widthCheck.checked,
					type: 'CheckBox'
				},
				this.nr_rowTextCheck = {
					id: 'nr_rowTextCheck',
					checked: this.nr_rowTextCheck.checked,
					type: 'CheckBox'
				},
				this.nr_bgColor = {
					id: 'nr_bgColor',
					value: this.nr_bgColor.value,
					type: 'Text'
				},
				this.nr_frontColor = {
					id: 'nr_frontColor',
					value: this.nr_frontColor.value,
					type: 'Text'
				},
				this.nr_leftMargin = {
					id: 'nr_leftMargin',
					value: this.nr_leftMargin.value,
					type: 'Text'
				},
				this.nr_height = {
					id: 'nr_height',
					value: this.nr_height.value,
					type: 'Text'
				},
				this.nr_rightDependencies = {
					id: 'nr_rightDependencies',
					value: this.nr_rightDependencies.value,
					type: 'Text'
				},
				this.nr_downDependencies = {
					id: 'nr_downDependencies',
					value: this.nr_downDependencies.value,
					type: 'Text'
				},
				this.nr_available = {
					id: 'nr_available',
					value: this.nr_available.value,
					type: 'Text'
				},
				this.nr_width = {
					id: 'nr_width',
					value: this.nr_width.value,
					type: 'Text'
				},
				this.nr_rowText = {
					id: 'nr_rowText',
					value: this.nr_rowText.value,
					type: 'Text'
				}
			]
		}
		return json;
	}
}

function cellDropDownGrid() {
	this.ddg_height = {
			id: 'ddg_height',
			value: '250',
			type: 'text'
		},
		this.combogrid_click = {
			id: 'combogrid_click',
			value: '',
			type: 'text'
		},
		this.combogrid_change = {
			id: 'combogrid_change',
			value: '',
			type: 'text'
		},
		this.ddg_typeSetting = {
			id: "ddg_typeSetting",
			value: "",
			type: "comlist"
		},
		this.ddg_dataSet = {
			id: "ddg_dataSet",
			value: "",
			type: "comlist"
		},
		this.ddg_saveFiled = {
			id: "ddg_saveFiled",
			value: "",
			type: "comlist"
		}, this.ddg_myDisplayFiled = {
			id: "ddg_myDisplayFiled",
			value: "",
			type: "comlist"
		}, this.ddg_dropDownDisplayColumn = {
			id: "ddg_dropDownDisplayColumn",
			value: "",
			type: "text"
		}, this.ddg_filterCondition = {
			id: "ddg_filterCondition",
			value: "",
			type: "text"
		},
		this.ddg_allowEdit = {
			id: 'ddg_allowEdit',
			checked: true,
			type: 'CheckBox'
		},
		this.ddg_allowPrint = {
			id: 'ddg_allowPrint',
			checked: true,
			type: 'CheckBox'
		},
		this.ddg_allowEmpty = {
			id: 'ddg_allowEmpty',
			checked: true,
			type: 'CheckBox'
		},
		this.ddg_separator = {
			id: 'ddg_separator',
			value: ',',
			type: 'text'
		},
		this.ddg_myWidth = {
			id: 'ddg_myWidth',
			value: '100.00',
			type: 'text'
		},
		this.ddg_emptyAlert = {
			id: 'ddg_emptyAlert',
			value: '',
			type: 'text'
		}, this.ddg_multi = {
			id: 'ddg_multi',
			checked: false,
			type: 'CheckBox'
		}

	//清空属性
	this.clearInfo = function() {
		this.ddg_height.value = '250'
		this.combogrid_click.value = ''
		this.combogrid_change.value = ''
		this.ddg_allowEdit.checked = true
		this.ddg_allowPrint.checked = true
		this.ddg_allowEmpty.checked = true
		this.ddg_separator.value = ','
		this.ddg_myWidth.value = '100.00'
		this.ddg_emptyAlert.value = ''
		this.ddg_filterCondition.value = ""
		this.ddg_dropDownDisplayColumn.value = ""
		this.ddg_myDisplayFiled.value = ""
		this.ddg_saveFiled.value = ""
		this.ddg_dataSet.value = ""
		this.ddg_typeSetting.value = ""
		this.ddg_multi.checked = false
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.ddg_height.value = info.ddg_height.value
		this.combogrid_click.value = info.combogrid_click.value
		this.combogrid_change.value = info.combogrid_change.value
		this.ddg_allowEdit.checked = info.ddg_allowEdit.checked
		this.ddg_allowPrint.checked = info.ddg_allowPrint.checked
		this.ddg_allowEmpty.checked = info.ddg_allowEmpty.checked
		this.ddg_separator.value = info.ddg_separator.value
		this.ddg_myWidth.value = info.ddg_myWidth.value
		this.ddg_emptyAlert.value = info.ddg_emptyAlert.value
		this.ddg_filterCondition.value = info.ddg_filterCondition.value
		this.ddg_dropDownDisplayColumn.value = info.ddg_dropDownDisplayColumn.value
		this.ddg_myDisplayFiled.value = info.ddg_myDisplayFiled.value
		this.ddg_saveFiled.value = info.ddg_saveFiled.value
		this.ddg_dataSet.value = info.ddg_dataSet.value
		this.ddg_typeSetting.value = info.ddg_typeSetting.value
		this.ddg_multi.checked = info.ddg_multi.checked
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cell_ddg: [{
				ddg_height: {
					id: 'ddg_height',
					value: this.ddg_height.value,
					type: 'text'
				},
				ddg_typeSetting: {
					id: 'ddg_typeSetting',
					value: this.ddg_typeSetting.value,
					type: 'comlist'
				},
				combogrid_click: {
					id: 'combogrid_click',
					value: this.combogrid_click.value,
					type: 'text'
				},
				combogrid_change: {
					id: 'combogrid_change',
					value: this.combogrid_change.value,
					type: 'text'
				},
				ddg_dataSet: {
					id: 'ddg_dataSet',
					value: this.ddg_dataSet.value,
					type: 'comlist'
				},
				ddg_saveFiled: {
					id: 'ddg_saveFiled',
					value: this.ddg_saveFiled.value,
					type: 'comlist'
				},
				ddg_myDisplayFiled: {
					id: 'ddg_myDisplayFiled',
					value: this.ddg_myDisplayFiled.value,
					type: 'comlist'
				},
				ddg_dropDownDisplayColumn: {
					id: 'ddg_dropDownDisplayColumn',
					value: this.ddg_dropDownDisplayColumn.value,
					type: 'text'
				},
				ddg_filterCondition: {
					id: 'ddg_filterCondition',
					value: this.ddg_filterCondition.value,
					type: 'text'
				},
				ddg_allowEdit: {
					id: 'ddg_allowEdit',
					checked: this.ddg_allowEdit.checked,
					type: 'CheckBox'
				},
				ddg_allowPrint: {
					id: 'ddg_allowPrint',
					checked: this.ddg_allowPrint.checked,
					type: 'CheckBox'
				},
				ddg_allowEmpty: {
					id: 'ddg_allowEmpty',
					checked: this.ddg_allowEmpty.checked,
					type: 'CheckBox'
				},
				ddg_separator: {
					id: 'ddg_separator',
					value: this.ddg_separator.value,
					type: 'text'
				},
				ddg_myWidth: {
					id: 'ddg_myWidth',
					value: this.ddg_myWidth.value,
					type: 'text'
				},
				ddg_emptyAlert: {
					id: 'ddg_emptyAlert',
					value: this.ddg_emptyAlert.value,
					type: 'text'
				},
				ddg_multi: {
					id: 'ddg_multi',
					checked: this.ddg_multi.checked,
					type: 'CheckBox'
				}
			}]
		}
		return json;
	}
}

function cellButtonType() {
	this.button_styleType = {
			id: 'button_styleType',
			value: 'none',
			type: 'text'
		},
		this.button_rowSelect = {
			id: 'button_rowSelect',
			value: '1',
			type: 'text'
		},
		this.button_delStore = {
			id: 'button_delStore',
			value: false,
			type: 'text'
		},
		this.button_alert = {
			id: 'button_alert',
			value: false,
			type: 'text'
		},
		this.lastDeleteOnlyData = {
			id: 'lastDeleteOnlyData',
			value: true,
			type: 'text'
		},
		this.button_carry = {
			id: 'button_carry',
			value: '',
			type: 'text'
		},
		this.button_text = {
			id: 'button_text',
			value: '',
			type: 'text'
		},
		this.button_allowPrint = {
			id: 'button_allowPrint',
			value: true,
			type: 'text'
		},
		this.button_wbStyle = {
			id: 'button_wbStyle',
			value: 'r',
			type: 'text'
		},
		this.buttoneve_click = {
			id: 'buttoneve_click',
			value: '',
			type: 'text'
		},
		this.buttoneve_dbClick = {
			id: 'buttoneve_dbClick',
			value: '',
			type: 'text'
		}

	//清空属性
	this.clearInfo = function() {
		this.button_styleType.value = ''
		this.button_rowSelect.value = ''
		this.button_delStore.value = ''
		this.button_alert.value = ''
		this.lastDeleteOnlyData.value = ''
		this.button_carry.value = ''
		this.button_text.value = ''
		this.button_allowPrint.value = ''
		this.button_wbStyle.value = ''
		this.buttoneve_click.value = ''
		this.buttoneve_dblclick.value = ''

		// this.button_wbStyle.value = ''
		// this.button_allowPrint.checked = true
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.button_styleType.value = info.button_styleType.value
		this.button_rowSelect.value = info.button_rowSelect.value
		this.button_delStore.value = info.button_delStore.value
		this.button_alert.value = info.button_alert.value
		this.lastDeleteOnlyData.value = info.lastDeleteOnlyData.value
		this.button_carry.value = info.button_carry.value
		this.button_text.value = info.button_text.value
		this.button_allowPrint.value = info.button_allowPrint.value
		this.button_wbStyle.value = info.button_wbStyle.value
		this.buttoneve_click.value = info.buttoneve_click.value
		this.buttoneve_dblclick.value = info.buttoneve_dblclick.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			buttonJson: [{
				button_styleType: {
					id: 'button_styleType',
					value: this.button_styleType.value,
					type: 'text'
				},
				button_rowSelect: {
					id: 'button_rowSelect',
					value: this.button_rowSelect.value,
					type: 'text'
				},
				button_delStore: {
					id: "button_delStore",
					value: this.button_delStore.value,
					type: 'comlist'
				},
				button_alert: {
					id: "button_alert",
					value: this.button_alert.value,
					type: 'radiostoregroup'
				},
				lastDeleteOnlyData: {
					id: "lastDeleteOnlyData",
					value: this.lastDeleteOnlyData.value,
					type: 'CheckBox'
				},
				button_carry: {
					id: "button_carry",
					value: this.button_carry.value,
					type: 'CheckBox'
				},
				button_text: {
					id: "button_text",
					value: this.button_text.value,
					type: 'radiostoregroup'
				},
				button_allowPrint: {
					id: "button_allowPrint",
					value: this.button_allowPrint.value,
					type: 'comlist'
				},
				button_wbStyle: {
					id: 'button_wbStyle',
					value: this.button_wbStyle.value,
					type: 'CheckBox'
				},
				buttoneve_click: {
					id: "buttoneve_click",
					value: this.buttoneve_click.value,
					type: 'comlist'
				},
				buttoneve_dbClick: {
					id: "buttoneve_dbClick",
					value: this.buttoneve_dbClick.value,
					type: 'comlist'
				}

			}]
		}
		return json;
	}
}


function cellCheckBoxType() {
	this.fxk_displayLabel = {
			id: 'fxk_displayLabel',
			value: '',
			type: 'text'
		},
		this.checkbox_click = {
			id: 'checkbox_click',
			value: '',
			type: 'text'
		},
		this.checkbox_change = {
			id: 'checkbox_change',
			value: '',
			type: 'text'
		},
		this.fxk_typeSetting = {
			id: "fxk_typeSetting",
			value: "",
			type: "comlist"
		},
		this.fxk_dataSet = {
			id: "fxk_dataSet",
			value: "",
			type: "comlist"
		},
		this.fxk_saveFiled = {
			id: "fxk_saveFiled",
			value: "",
			type: "comlist"
		}, this.fxk_myDisplayFiled = {
			id: "fxk_myDisplayFiled",
			value: "",
			type: "comlist"
		}, this.fxk_dropDownDisplayColumn = {
			id: "fxk_dropDownDisplayColumn",
			value: "",
			type: "text"
		}, this.fxk_filterCondition = {
			id: "fxk_filterCondition",
			value: "",
			type: "text"
		}, this.fxk_allowEdit = {
			id: "fxk_allowEdit",
			checked: true,
			type: "CheckBox"
		},
		this.fxk_allowPrint = {
			id: "fxk_allowPrint",
			checked: true,
			type: "CheckBox"
		},
		this.fxk_mutilGroup = {
			id: "fxk_mutilGroup",
			checked: false,
			type: "CheckBox"
		},
		this.fxk_allowEmpty = {
			id: "fxk_allowEmpty",
			checked: true,
			type: "CheckBox"
		},
		this.fxk_emptyAlert = {
			id: "fxk_emptyAlert",
			value: "",
			type: "text"
		},
		this.fxk_separator = {
			id: "fxk_separator",
			value: ",",
			type: "text"
		},
		this.fxk_starter = {
			id: "fxk_starter",
			value: "",
			type: "comlist"
		},
		this.fxk_ender = {
			id: "fxk_ender",
			value: "",
			type: "comlist"
		},
		this.fxk_proveAll = {
			id: "fxk_proveAll",
			checked: false,
			type: "CheckBox"
		},
		this.fxk_proveOther = {
			id: "fxk_proveOther",
			checked: false,
			type: "CheckBox"
		},
		this.fxk_auto = {
			id: "fxk_auto",
			checked: "",
			type: "CheckBox"
		},
		this.fxk_displayCol = {
			id: "fxk_displayCol",
			value: "",
			type: "text"
		},
		this.fxk_rowMargin = {
			id: "fxk_rowMargin",
			value: "",
			type: "text"
		}



	//清空属性
	this.clearInfo = function() {
		this.fxk_displayLabel.value = ''
		this.checkbox_click.value = ''
		this.checkbox_change.value = ''
		this.fxk_separator.value = ","
		this.fxk_starter.value = ""
		this.fxk_ender.value = ""
		this.fxk_proveAll.checked = false
		this.fxk_proveOther.checked = false
		this.fxk_displayCol.value = "0"
		this.fxk_rowMargin.value = "0"
		this.fxk_auto.checked = false
		this.fxk_allowEdit.checked = true
		this.fxk_allowPrint.checked = true;
		this.fxk_mutilGroup.checked = false
		this.fxk_allowEmpty.checked = true
		this.fxk_emptyAlert.value = ""
		this.fxk_filterCondition.value = ""
		this.fxk_dropDownDisplayColumn.value = ""
		this.fxk_myDisplayFiled.value = ""
		this.fxk_saveFiled.value = ""
		this.fxk_dataSet.value = ""
		this.fxk_typeSetting.value = ""
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.fxk_displayLabel.value = info.fxk_displayLabel.value
		this.checkbox_click.value = info.checkbox_click.value
		this.checkbox_change.value = info.checkbox_change.value
		this.fxk_allowEdit.checked = info.fxk_allowEdit.checked
		this.fxk_allowPrint.checked = info.fxk_allowPrint.checked
		this.fxk_mutilGroup.checked = info.fxk_mutilGroup.checked
		this.fxk_allowEmpty.checked = info.fxk_allowEmpty.checked
		this.fxk_emptyAlert.value = info.fxk_emptyAlert.value
		this.fxk_separator.value = info.fxk_separator.value
		this.fxk_starter.value = info.fxk_starter.value
		this.fxk_ender.value = info.fxk_ender.value
		this.fxk_proveAll.checked = info.fxk_proveAll.checked
		this.fxk_proveOther.checked = info.fxk_proveOther.checked
		this.fxk_displayCol.value = info.fxk_displayCol.value
		this.fxk_rowMargin.value = info.fxk_rowMargin.value
		this.fxk_auto.checked = info.fxk_auto.checked
		this.fxk_filterCondition.value = info.fxk_filterCondition.value;
		this.fxk_dropDownDisplayColumn.value = info.fxk_dropDownDisplayColumn.value;
		this.fxk_myDisplayFiled.value = info.fxk_myDisplayFiled.value;
		this.fxk_saveFiled.value = info.fxk_saveFiled.value;
		this.fxk_dataSet.value = info.fxk_dataSet.value;
		this.fxk_typeSetting.value = info.fxk_typeSetting.value;
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellCheckBoxInfo: [{
				// this.checkbox_click.value = ''
				// this.checkbox_change.value = ''
				checkbox_click: {
					id: 'checkbox_click',
					value: this.checkbox_click.value,
					type: 'text'
				},
				checkbox_change: {
					id: 'checkbox_change',
					value: this.checkbox_change.value,
					type: 'text'
				},
				fxk_displayLabel: {
					id: 'fxk_displayLabel',
					value: this.fxk_displayLabel.value,
					type: 'text'
				},
				fxk_typeSetting: {
					id: 'fxk_typeSetting',
					value: this.fxk_typeSetting.value,
					type: 'comlist'
				},
				fxk_dataSet: {
					id: 'fxk_dataSet',
					value: this.fxk_dataSet.value,
					type: 'comlist'
				},
				fxk_saveFiled: {
					id: 'fxk_saveFiled',
					value: this.fxk_saveFiled.value,
					type: 'comlist'
				},
				fxk_myDisplayFiled: {
					id: 'fxk_myDisplayFiled',
					value: this.fxk_myDisplayFiled.value,
					type: 'comlist'
				},
				fxk_dropDownDisplayColumn: {
					id: 'fxk_dropDownDisplayColumn',
					value: this.fxk_dropDownDisplayColumn.value,
					type: 'text'
				},
				fxk_filterCondition: {
					id: 'fxk_filterCondition',
					value: this.fxk_filterCondition.value,
					type: 'text'
				},
				fxk_auto: {
					id: 'fxk_auto',
					checked: this.fxk_auto.checked,
					type: 'CheckBox'
				},
				fxk_rowMargin: {
					id: 'fxk_rowMargin',
					value: this.fxk_rowMargin.value,
					type: 'text'
				},
				fxk_displayCol: {
					id: 'fxk_displayCol',
					value: this.fxk_displayCol.value,
					type: 'text'
				},
				fxk_proveOther: {
					id: 'fxk_proveOther',
					checked: this.fxk_proveOther.checked,
					type: 'CheckBox'
				},
				fxk_proveAll: {
					id: 'fxk_proveAll',
					checked: this.fxk_proveAll.checked,
					type: 'CheckBox'
				},
				fxk_starter: {
					id: 'fxk_starter',
					value: this.fxk_starter.value,
					type: 'comlist'
				},
				fxk_separator: {
					id: 'fxk_separator',
					value: this.fxk_separator.value,
					type: 'text'
				},
				fxk_ender: {
					id: 'fxk_ender',
					value: this.fxk_ender.value,
					type: 'comlist'
				},
				fxk_allowEdit: {
					id: 'fxk_allowEdit',
					checked: this.fxk_allowEdit.checked,
					type: 'CheckBox'
				},
				fxk_allowPrint: {
					id: 'fxk_allowPrint',
					checked: this.fxk_allowPrint.checked,
					type: 'CheckBox'
				},
				fxk_allowEmpty: {
					id: 'fxk_allowEmpty',
					checked: this.fxk_allowEmpty.checked,
					type: 'CheckBox'
				},
				fxk_mutilGroup: {
					id: 'fxk_mutilGroup',
					checked: this.fxk_mutilGroup.checked,
					type: 'CheckBox'
				},
				fxk_emptyAlert: {
					id: 'fxk_emptyAlert',
					value: this.fxk_emptyAlert.value,
					type: 'text'
				}
			}]



		}

		return json;
	}
}

function ValueClickEvent() {

	this.hub = {
		id: "hub",
		value: "",
		type: "vmd.ace"
	}

	//清空属性
	this.clearInfo = function() {
		this.hub.value = ""
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.hub.value = info.hub.value;
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			VCEventInfo: [{
				hub: {
					id: 'hub',
					value: this.hub.value,
					type: 'vmd.ace'
				}
			}]
		}
		return json;
	}
}

function cellApprovlType() {
	this.spzj_spyj_fontWeight = {
			id: 'spzj_spyj_fontWeight',
			value: '0',
			type: 'text'
		},
		this.spzj_spbm_fontWeight = {
			id: 'spzj_spbm_fontWeight',
			value: '0',
			type: 'text'
		},
		this.spzj_ty_fontWeight = {
			id: 'spzj_ty_fontWeight',
			value: '0',
			type: 'text'
		},
		this.spzj_bty_fontWeight = {
			id: 'spzj_bty_fontWeight',
			value: '0',
			type: 'text'
		},
		this.spzj_th_fontWeight = {
			id: 'spzj_th_fontWeight',
			value: '0',
			type: 'text'
		},
		this.spzj_spz_fontWeight = {
			id: 'spzj_spz_fontWeight',
			value: '0',
			type: 'text'
		},
		this.spzj_spr_fontWeight = {
			id: 'spzj_spr_fontWeight',
			value: '0',
			type: 'text'
		},
		this.spzj_sprq_fontWeight = {
			id: 'spzj_sprq_fontWeight',
			value: '0',
			type: 'text'
		},



		this.spzj_approval = {
			id: 'spzj_approval',
			value: '',
			type: 'text'
		},
		this.spzj_spyj_fontFamily = {
			id: "spzj_spyj_fontFamily",
			value: "SimSun",
			type: "text"
		},
		this.spzj_spyj_fontStyle = {
			id: "spzj_spyj_fontStyle",
			value: "0",
			type: "text"
		},
		this.spzj_spyj_fontSize = {
			id: "spzj_spyj_fontSize",
			value: "9px",
			type: "text"
		},
		this.spzj_spyj_underLine = {
			id: "spzj_spyj_underLine",
			value: "0",
			type: "comlist"
		},
		// this.spzj_spyj_mark = {
		// 	id: "spzj_spyj_mark",
		// 	value: "",
		// 	type: "radiostoregroup"
		// },
		this.spzj_spyj_color = {
			id: "spzj_spyj_color",
			value: "#000",
			type: "ColorSelectInner"
		},


		this.spzj_spbm_fontFamily = {
			id: "spzj_spbm_fontFamily",
			value: "SimSun",
			type: "text"
		},
		this.spzj_spbm_fontStyle = {
			id: "spzj_spbm_fontStyle",
			value: "0",
			type: "text"
		},
		this.spzj_spbm_fontSize = {
			id: "spzj_spbm_fontSize",
			value: "9px",
			type: "text"
		},
		this.spzj_spbm_underLine = {
			id: "spzj_spbm_underLine",
			value: "0",
			type: "comlist"
		},
		// this.spzj_spbm_mark = {
		// 	id: "spzj_spbm_mark",
		// 	value: "",
		// 	type: "radiostoregroup"
		// },
		this.spzj_spbm_color = {
			id: "spzj_spbm_color",
			value: "#000",
			type: "ColorSelectInner"
		},


		this.spzj_ty_fontFamily = {
			id: "spzj_ty_fontFamily",
			value: "SimSun",
			type: "text"
		},
		this.spzj_ty_fontStyle = {
			id: "spzj_ty_fontStyle",
			value: "0",
			type: "text"
		},
		this.spzj_ty_fontSize = {
			id: "spzj_ty_fontSize",
			value: "9px",
			type: "text"
		},
		this.spzj_ty_underLine = {
			id: "spzj_ty_underLine",
			value: "0",
			type: "comlist"
		},
		// this.spzj_ty_mark = {
		// 	id: "spzj_ty_mark",
		// 	value: "",
		// 	type: "radiostoregroup"
		// },
		this.spzj_ty_color = {
			id: "spzj_ty_color",
			value: "#000",
			type: "ColorSelectInner"
		},


		this.spzj_bty_fontFamily = {
			id: "spzj_bty_fontFamily",
			value: "SimSun",
			type: "text"
		},
		this.spzj_bty_fontStyle = {
			id: "spzj_bty_fontStyle",
			value: "0",
			type: "text"
		},
		this.spzj_bty_fontSize = {
			id: "spzj_bty_fontSize",
			value: "9px",
			type: "text"
		},
		this.spzj_bty_underLine = {
			id: "spzj_bty_underLine",
			value: "0",
			type: "comlist"
		},
		// this.spzj_bty_mark = {
		// 	id: "spzj_bty_mark",
		// 	value: "",
		// 	type: "radiostoregroup"
		// },
		this.spzj_bty_color = {
			id: "spzj_bty_color",
			value: "#000",
			type: "ColorSelectInner"
		},

		this.spzj_th_fontFamily = {
			id: "spzj_th_fontFamily",
			value: "SimSun",
			type: "text"
		},
		this.spzj_th_fontStyle = {
			id: "spzj_th_fontStyle",
			value: "0",
			type: "text"
		},
		this.spzj_th_fontSize = {
			id: "spzj_th_fontSize",
			value: "9px",
			type: "text"
		},
		this.spzj_th_underLine = {
			id: "spzj_th_underLine",
			value: "0",
			type: "comlist"
		},
		// this.spzj_th_mark = {
		// 	id: "spzj_th_mark",
		// 	value: "",
		// 	type: "radiostoregroup"
		// },
		this.spzj_th_color = {
			id: "spzj_th_color",
			value: "#000",
			type: "ColorSelectInner"
		},


		this.spzj_spz_fontFamily = {
			id: "spzj_spz_fontFamily",
			value: "SimSun",
			type: "text"
		},
		this.spzj_spz_fontStyle = {
			id: "spzj_spz_fontStyle",
			value: "0",
			type: "text"
		},
		this.spzj_spz_fontSize = {
			id: "spzj_spz_fontSize",
			value: "9px",
			type: "text"
		},
		this.spzj_spz_underLine = {
			id: "spzj_spz_underLine",
			value: "0",
			type: "comlist"
		},
		// this.spzj_spz_mark = {
		// 	id: "spzj_spz_mark",
		// 	value: "",
		// 	type: "radiostoregroup"
		// },
		this.spzj_spz_color = {
			id: "spzj_spz_color",
			value: "#000",
			type: "ColorSelectInner"
		},

		this.spzj_spr_fontFamily = {
			id: "spzj_spr_fontFamily",
			value: "SimSun",
			type: "text"
		},
		this.spzj_spr_fontStyle = {
			id: "spzj_spr_fontStyle",
			value: "0",
			type: "text"
		},
		this.spzj_spr_fontSize = {
			id: "spzj_spr_fontSize",
			value: "9px",
			type: "text"
		},
		this.spzj_spr_underLine = {
			id: "spzj_spr_underLine",
			value: "0",
			type: "comlist"
		},
		// this.spzj_spr_mark = {
		// 	id: "spzj_spr_mark",
		// 	value: "",
		// 	type: "radiostoregroup"
		// },
		this.spzj_spr_color = {
			id: "spzj_spr_color",
			value: "#000",
			type: "ColorSelectInner"
		},

		this.spzj_sprq_fontFamily = {
			id: "spzj_sprq_fontFamily",
			value: "SimSun",
			type: "text"
		},
		this.spzj_sprq_fontStyle = {
			id: "spzj_sprq_fontStyle",
			value: "0",
			type: "text"
		},
		this.spzj_sprq_fontSize = {
			id: "spzj_sprq_fontSize",
			value: "9px",
			type: "text"
		},
		this.spzj_sprq_underLine = {
			id: "spzj_sprq_underLine",
			value: "0",
			type: "comlist"
		},
		// this.spzj_sprq_mark = {
		// 	id: "spzj_sprq_mark",
		// 	value: "",
		// 	type: "radiostoregroup"
		// },
		this.spzj_sprq_color = {
			id: "spzj_sprq_color",
			value: "#000",
			type: "ColorSelectInner"
		},


		this.spzj_allowEdit = {
			id: "spzj_allowEdit",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_allowPrint = {
			id: "spzj_allowPrint",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_ty_display = {
			id: "spzj_ty_display",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_ty_bqmc = {
			id: "spzj_ty_bqmc",
			value: "同意",
			type: "text"
		},
		this.spzj_ty_spjg = {
			id: "spzj_ty_spjg",
			value: "",
			type: "text"
		},
		this.spzj_ty_font = {
			id: "spzj_ty_font",
			value: "",
			type: "text"
		},
		this.spzj_ty_x = {
			id: "spzj_ty_x",
			value: "0",
			type: "text"
		},
		this.spzj_ty_y = {
			id: "spzj_ty_y",
			value: "0",
			type: "text"
		},
		this.spzj_ty_height = {
			id: "spzj_ty_height",
			value: "25",
			type: "text"
		},
		this.spzj_ty_width = {
			id: "spzj_ty_width",
			value: "60",
			type: "text"
		}



		,
		this.spzj_bty_display = {
			id: "spzj_bty_display",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_bty_bqmc = {
			id: "spzj_bty_bqmc",
			value: "不同意",
			type: "text"
		},
		this.spzj_bty_spjg = {
			id: "spzj_bty_spjg",
			value: "",
			type: "text"
		},
		this.spzj_bty_font = {
			id: "spzj_bty_font",
			value: "",
			type: "text"
		},
		this.spzj_bty_x = {
			id: "spzj_bty_x",
			value: "0",
			type: "text"
		},
		this.spzj_bty_y = {
			id: "spzj_bty_y",
			value: "0",
			type: "text"
		},
		this.spzj_bty_height = {
			id: "spzj_bty_height",
			value: "25",
			type: "text"
		},
		this.spzj_bty_width = {
			id: "spzj_bty_width",
			value: "60",
			type: "text"
		}



		,
		this.spzj_th_display = {
			id: "spzj_th_display",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_th_bqmc = {
			id: "spzj_th_bqmc",
			value: "退回",
			type: "text"
		},
		this.spzj_th_spjg = {
			id: "spzj_th_spjg",
			value: "",
			type: "text"
		},
		this.spzj_th_font = {
			id: "spzj_th_font",
			value: "",
			type: "text"
		},
		this.spzj_th_x = {
			id: "spzj_th_x",
			value: "0",
			type: "text"
		},
		this.spzj_th_y = {
			id: "spzj_th_y",
			value: "0",
			type: "text"
		},
		this.spzj_th_height = {
			id: "spzj_th_height",
			value: "25",
			type: "text"
		},
		this.spzj_th_width = {
			id: "spzj_th_width",
			value: "60",
			type: "text"
		}



		,
		this.spzj_spz_display = {
			id: "spzj_spz_display",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_spz_bqmc = {
			id: "spzj_spz_bqmc",
			value: "",
			type: "text"
		},
		this.spzj_spz_tply = {
			id: "spzj_spz_tply",
			value: "",
			type: "text"
		},
		this.spzj_spz_font = {
			id: "spzj_spz_font",
			value: "",
			type: "text"
		},
		this.spzj_spz_x = {
			id: "spzj_spz_x",
			value: "0",
			type: "text"
		},
		this.spzj_spz_y = {
			id: "spzj_spz_y",
			value: "0",
			type: "text"
		},
		this.spzj_spz_height = {
			id: "spzj_spz_height",
			value: "120",
			type: "text"
		},
		this.spzj_spz_width = {
			id: "spzj_spz_width",
			value: "0",
			type: "text"
		}



		,
		this.spzj_spr_display = {
			id: "spzj_spr_display",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_spr_bqmc = {
			id: "spzj_spr_bqmc",
			value: "审批人：",
			type: "text"
		},
		this.spzj_spr_spr = {
			id: "spzj_spr_spr",
			value: "",
			type: "text"
		},
		this.spzj_spr_font = {
			id: "spzj_spr_font",
			value: "",
			type: "text"
		},
		this.spzj_spr_x = {
			id: "spzj_spr_x",
			value: "0",
			type: "text"
		},
		this.spzj_spr_y = {
			id: "spzj_spr_y",
			value: "0",
			type: "text"
		},
		this.spzj_spr_height = {
			id: "spzj_spr_height",
			value: "25",
			type: "text"
		},
		this.spzj_spr_width = {
			id: "spzj_spr_width",
			value: "0",
			type: "text"
		},
		this.spzj_spr_qmzp = {
			id: "spzj_spr_qmzp",
			value: "",
			type: "text"
		}


		,
		this.spzj_sprq_display = {
			id: "spzj_sprq_display",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_sprq_bqmc = {
			id: "spzj_sprq_bqmc",
			value: "审批日期：",
			type: "text"
		},
		this.spzj_sprq_sprq = {
			id: "spzj_sprq_sprq",
			value: "",
			type: "text"
		},
		this.spzj_sprq_font = {
			id: "spzj_sprq_font",
			value: "",
			type: "text"
		},
		this.spzj_sprq_x = {
			id: "spzj_sprq_x",
			value: "0",
			type: "text"
		},
		this.spzj_sprq_y = {
			id: "spzj_sprq_y",
			value: "0",
			type: "text"
		},
		this.spzj_sprq_height = {
			id: "spzj_sprq_height",
			value: "25",
			type: "text"
		},
		this.spzj_sprq_width = {
			id: "spzj_sprq_width",
			value: "0",
			type: "text"
		},
		this.spzj_sprq_rqgs = {
			id: "spzj_sprq_rqgs",
			value: "yyyy-MM-dd",
			type: "comlist"
		}



		,
		this.spzj_spyj_display = {
			id: "spzj_spyj_display",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_spyj_bqmc = {
			id: "spzj_spyj_bqmc",
			value: "审批意见：",
			type: "text"
		},
		this.spzj_spyj_yjnr = {
			id: "spzj_spyj_yjnr",
			value: "",
			type: "text"
		},
		this.spzj_spyj_font = {
			id: "spzj_spyj_font",
			value: "",
			type: "text"
		},
		this.spzj_spyj_x = {
			id: "spzj_spyj_x",
			value: "0",
			type: "text"
		},
		this.spzj_spyj_y = {
			id: "spzj_spyj_y",
			value: "0",
			type: "text"
		},
		this.spzj_spyj_height = {
			id: "spzj_spyj_height",
			value: "0",
			type: "text"
		},
		this.spzj_spyj_width = {
			id: "spzj_spyj_width",
			value: "0",
			type: "text"
		}


		,
		this.spzj_spbm_display = {
			id: "spzj_spbm_display",
			checked: true,
			type: "CheckBox"
		},
		this.spzj_spbm_bqmc = {
			id: "spzj_spbm_bqmc",
			value: "审批部门：",
			type: "text"
		},
		this.spzj_spbm_bmmc = {
			id: "spzj_spbm_bmmc",
			value: "",
			type: "text"
		},
		this.spzj_spbm_font = {
			id: "spzj_spbm_font",
			value: "",
			type: "text"
		},
		this.spzj_spbm_x = {
			id: "spzj_spbm_x",
			value: "0",
			type: "text"
		},
		this.spzj_spbm_y = {
			id: "spzj_spbm_y",
			value: "0",
			type: "text"
		},
		this.spzj_spbm_height = {
			id: "spzj_spbm_height",
			value: "0",
			type: "text"
		},
		this.spzj_spbm_width = {
			id: "spzj_spbm_width",
			value: "0",
			type: "text"
		}



	//清空属性
	this.clearInfo = function() {
		this.spzj_approval = ''
		this.spzj_spyj_fontFamily = "SimSun"
		this.spzj_spyj_fontStyle = "0"
		this.spzj_spyj_fontSize = "9px"
		this.spzj_spyj_color = "#000"
		this.spzj_spyj_underLine = ""
		// this.spzj_spyj_mark = ""

		this.spzj_spbm_fontFamily = "SimSun"
		this.spzj_spbm_fontStyle = "0"
		this.spzj_spbm_fontSize = "9px"
		this.spzj_spbm_color = "#000"
		this.spzj_spbm_underLine = ""
		// this.spzj_spbm_mark = ""

		this.spzj_ty_fontFamily = "SimSun"
		this.spzj_ty_fontStyle = "0"
		this.spzj_ty_fontSize = "9px"
		this.spzj_ty_color = "#000"
		this.spzj_ty_underLine = ""
		// this.spzj_ty_mark = ""

		this.spzj_bty_fontFamily = "SimSun"
		this.spzj_bty_fontStyle = "0"
		this.spzj_bty_fontSize = "9px"
		this.spzj_bty_color = "#000"
		this.spzj_bty_underLine = ""
		// this.spzj_bty_mark = ""

		this.spzj_th_fontFamily = "SimSun"
		this.spzj_th_fontStyle = "0"
		this.spzj_th_fontSize = "9px"
		this.spzj_th_color = "#000"
		this.spzj_th_underLine = ""
		// this.spzj_th_mark = ""

		this.spzj_spz_fontFamily = "SimSun"
		this.spzj_spz_fontStyle = "0"
		this.spzj_spz_fontSize = "9px"
		this.spzj_spz_color = "#000"
		this.spzj_spz_underLine = ""
		// this.spzj_spz_mark = ""

		this.spzj_spr_fontFamily = "SimSun"
		this.spzj_spr_fontStyle = "0"
		this.spzj_spr_fontSize = "9px"
		this.spzj_spr_color = "#000"
		this.spzj_spr_underLine = ""
		// this.spzj_spr_mark = ""

		this.spzj_sprq_fontFamily = "SimSun"
		this.spzj_sprq_fontStyle = "0"
		this.spzj_sprq_fontSize = "9px"
		this.spzj_sprq_color = "#000"
		this.spzj_sprq_underLine = ""
		// this.spzj_sprq_mark = ""

		this.spzj_allowEdit.value = true
		this.spzj_allowPrint.value = true
		this.spzj_ty_display.value = true
		this.spzj_ty_bqmc.value = ""
		this.spzj_ty_spjg.value = ""
		this.spzj_ty_font.value = ""
		this.spzj_ty_x.value = "10"
		this.spzj_ty_y.value = "170"
		this.spzj_ty_height.value = 0
		this.spzj_ty_width.value = 0
		this.spzj_bty_display.value = true
		this.spzj_bty_bqmc.value = ""
		this.spzj_bty_spjg.value = ""
		this.spzj_bty_font.value = ""
		this.spzj_bty_x.value = "70"
		this.spzj_bty_y.value = "170"
		this.spzj_bty_height.value = 0
		this.spzj_bty_width.value = 0
		this.spzj_th_display.value = true
		this.spzj_th_bqmc.value = ""
		this.spzj_th_spjg.value = ""
		this.spzj_th_font.value = ""
		this.spzj_th_x.value = "130"
		this.spzj_th_y.value = "170"
		this.spzj_th_height.value = 0
		this.spzj_th_width.value = 0
		this.spzj_spz_display.value = true
		this.spzj_spz_bqmc.value = ""
		this.spzj_spz_tply.value = ""
		this.spzj_spz_font.value = ""
		this.spzj_spz_x.value = "240"
		this.spzj_spz_y.value = "110"
		this.spzj_spz_height.value = 0
		this.spzj_spz_width.value = 0
		this.spzj_spr_display.value = true
		this.spzj_spr_bqmc.value = ""
		this.spzj_spr_spr.value = ""
		this.spzj_spr_font.value = ""
		this.spzj_spr_x.value = "240"
		this.spzj_spr_y.value = "140"
		this.spzj_spr_height.value = 0
		this.spzj_spr_width.value = 0
		this.spzj_spr_qmzp.value = ""
		this.spzj_sprq_display.value = true
		this.spzj_sprq_bqmc.value = ""
		this.spzj_sprq_sprq.value = ""
		this.spzj_sprq_font.value = ""
		this.spzj_sprq_x.value = "240"
		this.spzj_sprq_y.value = "170"
		this.spzj_sprq_height.value = 0
		this.spzj_sprq_width.value = 0
		this.spzj_sprq_rqgs.value = "0"
		this.spzj_spyj_display.value = true
		this.spzj_spyj_bqmc.value = ""
		this.spzj_spyj_yjnr.value = ""
		this.spzj_spyj_font.value = ""
		this.spzj_spyj_x.value = "20"
		this.spzj_spyj_y.value = "10"
		this.spzj_spyj_height.value = 0
		this.spzj_spyj_width.value = 0
		this.spzj_spbm_display.value = true
		this.spzj_spbm_bqmc.value = ""
		this.spzj_spbm_bmmc.value = ""
		this.spzj_spbm_font.value = ""
		this.spzj_spbm_x.value = "20"
		this.spzj_spbm_y.value = "30"
		this.spzj_spbm_height.value = 0
		this.spzj_spbm_width.value = 0
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.spzj_approval.value = info.spzj_approval.value

		this.spzj_spyj_fontWeight.value = info.spzj_spyj_fontWeight.value
		this.spzj_spbm_fontWeight.value = info.spzj_spbm_fontWeight.value
		this.spzj_ty_fontWeight.value = info.spzj_ty_fontWeight.value
		this.spzj_bty_fontWeight.value = info.spzj_bty_fontWeight.value
		this.spzj_th_fontWeight.value = info.spzj_th_fontWeight.value
		this.spzj_spz_fontWeight.value = info.spzj_spz_fontWeight.value
		this.spzj_spr_fontWeight.value = info.spzj_spr_fontWeight.value
		this.spzj_sprq_fontWeight.value = info.spzj_sprq_fontWeight.value

		this.spzj_spyj_fontFamily.value = info.spzj_spyj_fontFamily.value
		this.spzj_spyj_fontStyle.value = info.spzj_spyj_fontStyle.value
		this.spzj_spyj_fontSize.value = info.spzj_spyj_fontSize.value
		this.spzj_spyj_color.value = info.spzj_spyj_color.value
		this.spzj_spyj_underLine.value = info.spzj_spyj_underLine.value
		// this.spzj_spyj_mark.value = info.spzj_spyj_mark.value

		this.spzj_spbm_fontFamily.value = info.spzj_spbm_fontFamily.value
		this.spzj_spbm_fontStyle.value = info.spzj_spbm_fontStyle.value
		this.spzj_spbm_fontSize.value = info.spzj_spbm_fontSize.value
		this.spzj_spbm_color.value = info.spzj_spbm_color.value
		this.spzj_spbm_underLine.value = info.spzj_spbm_underLine.value
		// this.spzj_spbm_mark.value = info.spzj_spbm_mark.value

		this.spzj_ty_fontFamily.value = info.spzj_ty_fontFamily.value
		this.spzj_ty_fontStyle.value = info.spzj_ty_fontStyle.value
		this.spzj_ty_fontSize.value = info.spzj_ty_fontSize.value
		this.spzj_ty_color.value = info.spzj_ty_color.value
		this.spzj_ty_underLine.value = info.spzj_ty_underLine.value
		// this.spzj_ty_mark.value = info.spzj_ty_mark.value

		this.spzj_bty_fontFamily.value = info.spzj_bty_fontFamily.value
		this.spzj_bty_fontStyle.value = info.spzj_bty_fontStyle.value
		this.spzj_bty_fontSize.value = info.spzj_bty_fontSize.value
		this.spzj_bty_color.value = info.spzj_bty_color.value
		this.spzj_bty_underLine.value = info.spzj_bty_underLine.value
		// this.spzj_bty_mark.value = info.spzj_bty_mark.value

		this.spzj_th_fontFamily.value = info.spzj_th_fontFamily.value
		this.spzj_th_fontStyle.value = info.spzj_th_fontStyle.value
		this.spzj_th_fontSize.value = info.spzj_th_fontSize.value
		this.spzj_th_color.value = info.spzj_th_color.value
		this.spzj_th_underLine.value = info.spzj_th_underLine.value
		// this.spzj_th_mark.value = info.spzj_th_mark.value

		this.spzj_spz_fontFamily.value = info.spzj_spz_fontFamily.value
		this.spzj_spz_fontStyle.value = info.spzj_spz_fontStyle.value
		this.spzj_spz_fontSize.value = info.spzj_spz_fontSize.value
		this.spzj_spz_color.value = info.spzj_spz_color.value
		this.spzj_spz_underLine.value = info.spzj_spz_underLine.value
		// this.spzj_spz_mark.value = info.spzj_spz_mark.value

		this.spzj_spr_fontFamily.value = info.spzj_spr_fontFamily.value
		this.spzj_spr_fontStyle.value = info.spzj_spr_fontStyle.value
		this.spzj_spr_fontSize.value = info.spzj_spr_fontSize.value
		this.spzj_spr_color.value = info.spzj_spr_color.value
		this.spzj_spr_underLine.value = info.spzj_spr_underLine.value
		// this.spzj_spr_mark.value = info.spzj_spr_mark.value

		this.spzj_sprq_fontFamily.value = info.spzj_sprq_fontFamily.value
		this.spzj_sprq_fontStyle.value = info.spzj_sprq_fontStyle.value
		this.spzj_sprq_fontSize.value = info.spzj_sprq_fontSize.value
		this.spzj_sprq_color.value = info.spzj_sprq_color.value
		this.spzj_sprq_underLine.value = info.spzj_sprq_underLine.value
		// this.spzj_sprq_mark.value = info.spzj_sprq_mark.value

		this.spzj_allowEdit.checked = info.spzj_allowEdit.checked
		this.spzj_allowPrint.checked = info.spzj_allowPrint.checked
		this.spzj_ty_display.checked = info.spzj_ty_display.checked
		this.spzj_ty_bqmc.value = info.spzj_ty_bqmc.value
		this.spzj_ty_spjg.value = info.spzj_ty_spjg.value
		this.spzj_ty_font.value = info.spzj_ty_font.value
		this.spzj_ty_x.value = info.spzj_ty_x.value
		this.spzj_ty_y.value = info.spzj_ty_y.value
		this.spzj_ty_height.value = info.spzj_ty_height.value
		this.spzj_ty_width.value = info.spzj_ty_width.value
		this.spzj_bty_display.checked = info.spzj_bty_display.checked
		this.spzj_bty_bqmc.value = info.spzj_bty_bqmc.value
		this.spzj_bty_spjg.value = info.spzj_bty_spjg.value
		this.spzj_bty_font.value = info.spzj_bty_font.value
		this.spzj_bty_x.value = info.spzj_bty_x.value
		this.spzj_bty_y.value = info.spzj_bty_y.value
		this.spzj_bty_height.value = info.spzj_bty_height.value
		this.spzj_bty_width.value = info.spzj_bty_width.value
		this.spzj_th_display.checked = info.spzj_th_display.checked
		this.spzj_th_bqmc.value = info.spzj_th_bqmc.value
		this.spzj_th_spjg.value = info.spzj_th_spjg.value
		this.spzj_th_font.value = info.spzj_th_font.value
		this.spzj_th_x.value = info.spzj_th_x.value
		this.spzj_th_y.value = info.spzj_th_y.value
		this.spzj_th_height.value = info.spzj_th_height.value
		this.spzj_th_width.value = info.spzj_th_width.value
		this.spzj_spz_display.checked = info.spzj_spz_display.checked
		this.spzj_spz_bqmc.value = info.spzj_spz_bqmc.value
		this.spzj_spz_tply.value = info.spzj_spz_tply.value
		this.spzj_spz_font.value = info.spzj_spz_font.value
		this.spzj_spz_x.value = info.spzj_spz_x.value
		this.spzj_spz_y.value = info.spzj_spz_y.value
		this.spzj_spz_height.value = info.spzj_spz_height.value
		this.spzj_spz_width.value = info.spzj_spz_width.value
		this.spzj_spr_display.checked = info.spzj_spr_display.checked
		this.spzj_spr_bqmc.value = info.spzj_spr_bqmc.value
		this.spzj_spr_spr.value = info.spzj_spr_spr.value
		this.spzj_spr_font.value = info.spzj_spr_font.value
		this.spzj_spr_x.value = info.spzj_spr_x.value
		this.spzj_spr_y.value = info.spzj_spr_y.value
		this.spzj_spr_height.value = info.spzj_spr_height.value
		this.spzj_spr_width.value = info.spzj_spr_width.value
		this.spzj_spr_qmzp.value = info.spzj_spr_qmzp.value
		this.spzj_sprq_display.checked = info.spzj_sprq_display.checked
		this.spzj_sprq_bqmc.value = info.spzj_sprq_bqmc.value
		this.spzj_sprq_sprq.value = info.spzj_sprq_sprq.value
		this.spzj_sprq_font.value = info.spzj_sprq_font.value
		this.spzj_sprq_x.value = info.spzj_sprq_x.value
		this.spzj_sprq_y.value = info.spzj_sprq_y.value
		this.spzj_sprq_height.value = info.spzj_sprq_height.value
		this.spzj_sprq_width.value = info.spzj_sprq_width.value
		this.spzj_sprq_rqgs.value = info.spzj_sprq_rqgs.value
		this.spzj_spyj_display.checked = info.spzj_spyj_display.checked
		this.spzj_spyj_bqmc.value = info.spzj_spyj_bqmc.value
		this.spzj_spyj_yjnr.value = info.spzj_spyj_yjnr.value
		this.spzj_spyj_font.value = info.spzj_spyj_font.value
		this.spzj_spyj_x.value = info.spzj_spyj_x.value
		this.spzj_spyj_y.value = info.spzj_spyj_y.value
		this.spzj_spyj_height.value = info.spzj_spyj_height.value
		this.spzj_spyj_width.value = info.spzj_spyj_width.value
		this.spzj_spbm_display.checked = info.spzj_spbm_display.checked
		this.spzj_spbm_bqmc.value = info.spzj_spbm_bqmc.value
		this.spzj_spbm_bmmc.value = info.spzj_spbm_bmmc.value
		this.spzj_spbm_font.value = info.spzj_spbm_font.value
		this.spzj_spbm_x.value = info.spzj_spbm_x.value
		this.spzj_spbm_y.value = info.spzj_spbm_y.value
		this.spzj_spbm_height.value = info.spzj_spbm_height.value
		this.spzj_spbm_width.value = info.spzj_spbm_width.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellApprovlInfo: [{
				spzj_spyj_fontWeight: {
					id: 'spzj_spyj_fontWeight',
					value: this.spzj_spyj_fontWeight.value,
					type: 'text'
				},
				spzj_spbm_fontWeight: {
					id: 'spzj_spbm_fontWeight',
					value: this.spzj_spbm_fontWeight.value,
					type: 'text'
				},
				spzj_ty_fontWeight: {
					id: 'spzj_ty_fontWeight',
					value: this.spzj_ty_fontWeight.value,
					type: 'text'
				},
				spzj_bty_fontWeight: {
					id: 'spzj_bty_fontWeight',
					value: this.spzj_bty_fontWeight.value,
					type: 'text'
				},
				spzj_th_fontWeight: {
					id: 'spzj_th_fontWeight',
					value: this.spzj_th_fontWeight.value,
					type: 'text'
				},
				spzj_spz_fontWeight: {
					id: 'spzj_spz_fontWeight',
					value: this.spzj_spz_fontWeight.value,
					type: 'text'
				},
				spzj_spr_fontWeight: {
					id: 'spzj_spr_fontWeight',
					value: this.spzj_spr_fontWeight.value,
					type: 'text'
				},
				spzj_sprq_fontWeight: {
					id: 'spzj_sprq_fontWeight',
					value: this.spzj_sprq_fontWeight.value,
					type: 'text'
				},



				spzj_approval: {
					id: 'spzj_approval',
					value: this.spzj_approval.value,
					type: 'text'
				},
				spzj_spyj_fontFamily: {
					id: "spzj_spyj_fontFamily",
					value: this.spzj_spyj_fontFamily.value,
					type: "text"
				},
				spzj_spyj_fontStyle: {
					id: "spzj_spyj_fontStyle",
					value: this.spzj_spyj_fontStyle.value,
					type: "text"
				},
				spzj_spyj_fontSize: {
					id: "spzj_spyj_fontSize",
					value: this.spzj_spyj_fontSize.value,
					type: "text"
				},
				spzj_spyj_underLine: {
					id: "spzj_spyj_underLine",
					value: this.spzj_spyj_underLine.value,
					type: "comlist"
				},
				// spzj_spyj_mark: {
				// 	id: "spzj_spyj_mark",
				// 	value: this.spzj_spyj_mark.value,
				// 	type: "radiostoregroup"
				// },
				spzj_spyj_color: {
					id: "spzj_spyj_color",
					value: this.spzj_spyj_color.value,
					type: "ColorSelectInner"
				},


				spzj_spbm_fontFamily: {
					id: "spzj_spbm_fontFamily",
					value: this.spzj_spbm_fontFamily.value,
					type: "text"
				},
				spzj_spbm_fontStyle: {
					id: "spzj_spbm_fontStyle",
					value: this.spzj_spbm_fontStyle.value,
					type: "text"
				},
				spzj_spbm_fontSize: {
					id: "spzj_spbm_fontSize",
					value: this.spzj_spbm_fontSize.value,
					type: "text"
				},
				spzj_spbm_underLine: {
					id: "spzj_spbm_underLine",
					value: this.spzj_spbm_underLine.value,
					type: "comlist"
				},
				// spzj_spbm_mark: {
				// 	id: "spzj_spbm_mark",
				// 	value: this.spzj_spbm_mark.value,
				// 	type: "radiostoregroup"
				// },
				spzj_spbm_color: {
					id: "spzj_spbm_color",
					value: this.spzj_spbm_color.value,
					type: "ColorSelectInner"
				},


				spzj_ty_fontFamily: {
					id: "spzj_ty_fontFamily",
					value: this.spzj_ty_fontFamily.value,
					type: "text"
				},
				spzj_ty_fontStyle: {
					id: "spzj_ty_fontStyle",
					value: this.spzj_ty_fontStyle.value,
					type: "text"
				},
				spzj_ty_fontSize: {
					id: "spzj_ty_fontSize",
					value: this.spzj_ty_fontSize.value,
					type: "text"
				},
				spzj_ty_underLine: {
					id: "spzj_ty_underLine",
					value: this.spzj_ty_underLine.value,
					type: "comlist"
				},
				// spzj_ty_mark: {
				// 	id: "spzj_ty_mark",
				// 	value: this.spzj_ty_mark.value,
				// 	type: "radiostoregroup"
				// },
				spzj_ty_color: {
					id: "spzj_ty_color",
					value: this.spzj_ty_color.value,
					type: "ColorSelectInner"
				},


				spzj_bty_fontFamily: {
					id: "spzj_bty_fontFamily",
					value: this.spzj_bty_fontFamily.value,
					type: "text"
				},
				spzj_bty_fontStyle: {
					id: "spzj_bty_fontStyle",
					value: this.spzj_bty_fontStyle.value,
					type: "text"
				},
				spzj_bty_fontSize: {
					id: "spzj_bty_fontSize",
					value: this.spzj_bty_fontSize.value,
					type: "text"
				},
				spzj_bty_underLine: {
					id: "spzj_bty_underLine",
					value: this.spzj_bty_underLine.value,
					type: "comlist"
				},
				// spzj_bty_mark: {
				// 	id: "spzj_bty_mark",
				// 	value: this.spzj_bty_mark.value,
				// 	type: "radiostoregroup"
				// },
				spzj_bty_color: {
					id: "spzj_bty_color",
					value: this.spzj_bty_color.value,
					type: "ColorSelectInner"
				},

				spzj_th_fontFamily: {
					id: "spzj_th_fontFamily",
					value: this.spzj_th_fontFamily.value,
					type: "text"
				},
				spzj_th_fontStyle: {
					id: "spzj_th_fontStyle",
					value: this.spzj_th_fontStyle.value,
					type: "text"
				},
				spzj_th_fontSize: {
					id: "spzj_th_fontSize",
					value: this.spzj_th_fontSize.value,
					type: "text"
				},
				spzj_th_underLine: {
					id: "spzj_th_underLine",
					value: this.spzj_th_underLine.value,
					type: "comlist"
				},
				// spzj_th_mark: {
				// 	id: "spzj_th_mark",
				// 	value: this.spzj_th_mark.value,
				// 	type: "radiostoregroup"
				// },
				spzj_th_color: {
					id: "spzj_th_color",
					value: this.spzj_th_color.value,
					type: "ColorSelectInner"
				},


				spzj_spz_fontFamily: {
					id: "spzj_spz_fontFamily",
					value: this.spzj_spz_fontFamily.value,
					type: "text"
				},
				spzj_spz_fontStyle: {
					id: "spzj_spz_fontStyle",
					value: this.spzj_spz_fontStyle.value,
					type: "text"
				},
				spzj_spz_fontSize: {
					id: "spzj_spz_fontSize",
					value: this.spzj_spz_fontSize.value,
					type: "text"
				},
				spzj_spz_underLine: {
					id: "spzj_spz_underLine",
					value: this.spzj_spz_underLine.value,
					type: "comlist"
				},
				// spzj_spz_mark: {
				// 	id: "spzj_spz_mark",
				// 	value: this.spzj_spz_mark.value,
				// 	type: "radiostoregroup"
				// },
				spzj_spz_color: {
					id: "spzj_spz_color",
					value: this.spzj_spz_color.value,
					type: "ColorSelectInner"
				},

				spzj_spr_fontFamily: {
					id: "spzj_spr_fontFamily",
					value: this.spzj_spr_fontFamily.value,
					type: "text"
				},
				spzj_spr_fontStyle: {
					id: "spzj_spr_fontStyle",
					value: this.spzj_spr_fontStyle.value,
					type: "text"
				},
				spzj_spr_fontSize: {
					id: "spzj_spr_fontSize",
					value: this.spzj_spr_fontSize.value,
					type: "text"
				},
				spzj_spr_underLine: {
					id: "spzj_spr_underLine",
					value: this.spzj_spr_underLine.value,
					type: "comlist"
				},
				// spzj_spr_mark: {
				// 	id: "spzj_spr_mark",
				// 	value: this.spzj_spr_mark.value,
				// 	type: "radiostoregroup"
				// },
				spzj_spr_color: {
					id: "spzj_spr_color",
					value: this.spzj_spr_color.value,
					type: "ColorSelectInner"
				},

				spzj_sprq_fontFamily: {
					id: "spzj_sprq_fontFamily",
					value: this.spzj_sprq_fontFamily.value,
					type: "text"
				},
				spzj_sprq_fontStyle: {
					id: "spzj_sprq_fontStyle",
					value: this.spzj_sprq_fontStyle.value,
					type: "text"
				},
				spzj_sprq_fontSize: {
					id: "spzj_sprq_fontSize",
					value: this.spzj_sprq_fontSize.value,
					type: "text"
				},
				spzj_sprq_underLine: {
					id: "spzj_sprq_underLine",
					value: this.spzj_sprq_underLine.value,
					type: "comlist"
				},
				// spzj_sprq_mark: {
				// 	id: "spzj_sprq_mark",
				// 	value: this.spzj_sprq_mark.value,
				// 	type: "radiostoregroup"
				// },
				spzj_sprq_color: {
					id: "spzj_sprq_color",
					value: this.spzj_sprq_color.value,
					type: "ColorSelectInner"
				},
				spzj_allowEdit: {
					id: 'spzj_allowEdit',
					checked: this.spzj_allowEdit.checked,
					type: 'CheckBox'
				},
				spzj_allowPrint: {
					id: 'spzj_allowPrint',
					checked: this.spzj_allowPrint.checked,
					type: 'CheckBox'
				},
				spzj_ty_display: {
					id: 'spzj_ty_display',
					checked: this.spzj_ty_display.checked,
					type: 'CheckBox'
				},
				spzj_ty_bqmc: {
					id: 'spzj_ty_bqmc',
					value: this.spzj_ty_bqmc.value,
					type: 'text'
				},
				spzj_ty_spjg: {
					id: 'spzj_ty_spjg',
					value: this.spzj_ty_spjg.value,
					type: 'text'
				},
				spzj_ty_font: {
					id: 'spzj_ty_font',
					value: this.spzj_ty_font.value,
					type: 'text'
				},
				spzj_ty_x: {
					id: 'spzj_ty_x',
					value: this.spzj_ty_x.value,
					type: 'text'
				},
				spzj_ty_y: {
					id: 'spzj_ty_y',
					value: this.spzj_ty_y.value,
					type: 'text'
				},
				spzj_ty_height: {
					id: 'spzj_ty_height',
					value: this.spzj_ty_height.value,
					type: 'text'
				},
				spzj_ty_width: {
					id: 'spzj_ty_width',
					value: this.spzj_ty_width.value,
					type: 'text'
				},
				spzj_bty_display: {
					id: 'spzj_bty_display',
					checked: this.spzj_bty_display.checked,
					type: 'CheckBox'
				},
				spzj_bty_bqmc: {
					id: 'spzj_bty_bqmc',
					value: this.spzj_bty_bqmc.value,
					type: 'text'
				},
				spzj_bty_spjg: {
					id: 'spzj_bty_spjg',
					value: this.spzj_bty_spjg.value,
					type: 'text'
				},
				spzj_bty_font: {
					id: 'spzj_bty_font',
					value: this.spzj_bty_font.value,
					type: 'text'
				},
				spzj_bty_x: {
					id: 'spzj_bty_x',
					value: this.spzj_bty_x.value,
					type: 'text'
				},
				spzj_bty_y: {
					id: 'spzj_bty_y',
					value: this.spzj_bty_y.value,
					type: 'text'
				},
				spzj_bty_height: {
					id: 'spzj_bty_height',
					value: this.spzj_bty_height.value,
					type: 'text'
				},
				spzj_bty_width: {
					id: 'spzj_bty_width',
					value: this.spzj_bty_width.value,
					type: 'text'
				},
				spzj_th_display: {
					id: 'spzj_th_display',
					checked: this.spzj_th_display.checked,
					type: 'CheckBox'
				},
				spzj_th_bqmc: {
					id: 'spzj_th_bqmc',
					value: this.spzj_th_bqmc.value,
					type: 'text'
				},
				spzj_th_spjg: {
					id: 'spzj_th_spjg',
					value: this.spzj_th_spjg.value,
					type: 'text'
				},
				spzj_th_font: {
					id: 'spzj_th_font',
					value: this.spzj_th_font.value,
					type: 'text'
				},
				spzj_th_x: {
					id: 'spzj_th_x',
					value: this.spzj_th_x.value,
					type: 'text'
				},
				spzj_th_y: {
					id: 'spzj_th_y',
					value: this.spzj_th_y.value,
					type: 'text'
				},
				spzj_th_height: {
					id: 'spzj_th_height',
					value: this.spzj_th_height.value,
					type: 'text'
				},
				spzj_th_width: {
					id: 'spzj_th_width',
					value: this.spzj_th_width.value,
					type: 'text'
				},
				spzj_spz_display: {
					id: 'spzj_spz_display',
					checked: this.spzj_spz_display.checked,
					type: 'CheckBox'
				},
				spzj_spz_bqmc: {
					id: 'spzj_spz_bqmc',
					value: this.spzj_spz_bqmc.value,
					type: 'text'
				},
				spzj_spz_tply: {
					id: 'spzj_spz_tply',
					value: this.spzj_spz_tply.value,
					type: 'text'
				},
				spzj_spz_font: {
					id: 'spzj_spz_font',
					value: this.spzj_spz_font.value,
					type: 'text'
				},
				spzj_spz_x: {
					id: 'spzj_spz_x',
					value: this.spzj_spz_x.value,
					type: 'text'
				},
				spzj_spz_y: {
					id: 'spzj_spz_y',
					value: this.spzj_spz_y.value,
					type: 'text'
				},
				spzj_spz_height: {
					id: 'spzj_spz_height',
					value: this.spzj_spz_height.value,
					type: 'text'
				},
				spzj_spz_width: {
					id: 'spzj_spz_width',
					value: this.spzj_spz_width.value,
					type: 'text'
				},
				spzj_spr_display: {
					id: 'spzj_spr_display',
					checked: this.spzj_spr_display.checked,
					type: 'CheckBox'
				},
				spzj_spr_bqmc: {
					id: 'spzj_spr_bqmc',
					value: this.spzj_spr_bqmc.value,
					type: 'text'
				},
				spzj_spr_spr: {
					id: 'spzj_spr_spr',
					value: this.spzj_spr_spr.value,
					type: 'text'
				},
				spzj_spr_font: {
					id: 'spzj_spr_font',
					value: this.spzj_spr_font.value,
					type: 'text'
				},
				spzj_spr_x: {
					id: 'spzj_spr_x',
					value: this.spzj_spr_x.value,
					type: 'text'
				},
				spzj_spr_y: {
					id: 'spzj_spr_y',
					value: this.spzj_spr_y.value,
					type: 'text'
				},
				spzj_spr_height: {
					id: 'spzj_spr_height',
					value: this.spzj_spr_height.value,
					type: 'text'
				},
				spzj_spr_width: {
					id: 'spzj_spr_width',
					value: this.spzj_spr_width.value,
					type: 'text'
				},
				spzj_spr_qmzp: {
					id: 'spzj_spr_qmzp',
					value: this.spzj_spr_qmzp.value,
					type: 'text'
				},
				spzj_sprq_display: {
					id: 'spzj_sprq_display',
					checked: this.spzj_sprq_display.checked,
					type: 'CheckBox'
				},
				spzj_sprq_bqmc: {
					id: 'spzj_sprq_bqmc',
					value: this.spzj_sprq_bqmc.value,
					type: 'text'
				},
				spzj_sprq_sprq: {
					id: 'spzj_sprq_sprq',
					value: this.spzj_sprq_sprq.value,
					type: 'text'
				},
				spzj_sprq_font: {
					id: 'spzj_sprq_font',
					value: this.spzj_sprq_font.value,
					type: 'text'
				},
				spzj_sprq_x: {
					id: 'spzj_sprq_x',
					value: this.spzj_sprq_x.value,
					type: 'text'
				},
				spzj_sprq_y: {
					id: 'spzj_sprq_y',
					value: this.spzj_sprq_y.value,
					type: 'text'
				},
				spzj_sprq_height: {
					id: 'spzj_sprq_height',
					value: this.spzj_sprq_height.value,
					type: 'text'
				},
				spzj_sprq_width: {
					id: 'spzj_sprq_width',
					value: this.spzj_sprq_width.value,
					type: 'text'
				},
				spzj_sprq_rqgs: {
					id: 'spzj_sprq_rqgs',
					value: this.spzj_sprq_rqgs.value,
					type: 'comlist'
				},
				spzj_spyj_display: {
					id: 'spzj_spyj_display',
					checked: this.spzj_spyj_display.checked,
					type: 'CheckBox'
				},
				spzj_spyj_bqmc: {
					id: 'spzj_spyj_bqmc',
					value: this.spzj_spyj_bqmc.value,
					type: 'text'
				},
				spzj_spyj_yjnr: {
					id: 'spzj_spyj_yjnr',
					value: this.spzj_spyj_yjnr.value,
					type: 'text'
				},
				spzj_spyj_font: {
					id: 'spzj_spyj_font',
					value: this.spzj_spyj_font.value,
					type: 'text'
				},
				spzj_spyj_x: {
					id: 'spzj_spyj_x',
					value: this.spzj_spyj_x.value,
					type: 'text'
				},
				spzj_spyj_y: {
					id: 'spzj_spyj_y',
					value: this.spzj_spyj_y.value,
					type: 'text'
				},
				spzj_spyj_height: {
					id: 'spzj_spyj_height',
					value: this.spzj_spyj_height.value,
					type: 'text'
				},
				spzj_spyj_width: {
					id: 'spzj_spyj_width',
					value: this.spzj_spyj_width.value,
					type: 'text'
				},
				spzj_spbm_display: {
					id: 'spzj_spbm_display',
					checked: this.spzj_spbm_display.checked,
					type: 'CheckBox'
				},
				spzj_spbm_bqmc: {
					id: 'spzj_spbm_bqmc',
					value: this.spzj_spbm_bqmc.value,
					type: 'text'
				},
				spzj_spbm_bmmc: {
					id: 'spzj_spbm_bmmc',
					value: this.spzj_spbm_bmmc.value,
					type: 'text'
				},
				spzj_spbm_font: {
					id: 'spzj_spbm_font',
					value: this.spzj_spbm_font.value,
					type: 'text'
				},
				spzj_spbm_x: {
					id: 'spzj_spbm_x',
					value: this.spzj_spbm_x.value,
					type: 'text'
				},
				spzj_spbm_y: {
					id: 'spzj_spbm_y',
					value: this.spzj_spbm_y.value,
					type: 'text'
				},
				spzj_spbm_height: {
					id: 'spzj_spbm_height',
					value: this.spzj_spbm_height.value,
					type: 'text'
				},
				spzj_spbm_width: {
					id: 'spzj_spbm_width',
					value: this.spzj_spbm_width.value,
					type: 'text'
				}
			}]

		}
		return json;
	}
}

function cellUplodeType() {
	this.sczj_wdk = {
			id: 'sczj_wdk',
			checked: false,
			type: 'CheckBox'
		},
		this.sczj_dataSet = {
			id: "sczj_dataSet",
			value: "",
			type: "comlist"
		},
		this.sczj_dataPath = {
			id: "sczj_dataPath",
			value: "",
			type: "comlist"
		},
		this.sczj_dataName = {
			id: "sczj_dataName",
			value: "",
			type: "comlist"
		}, this.sczj_dataSize = {
			id: "sczj_dataSize",
			value: "",
			type: "comlist"
		},
		this.sczj_dataType = {
			id: "sczj_dataType",
			value: "",
			type: "comlist"
		}, this.sczj_dataId = {
			id: "sczj_dataId",
			value: "",
			type: "comlist"
		},
		this.upload_click = {
			id: "upload_click",
			value: "",
			type: "text"
		},
		this.upload_dblclick = {
			id: "upload_dblclick",
			value: "",
			type: "text"
		},
		this.upload_change = {
			id: "upload_change",
			value: "",
			type: "text"
		},
		this.sczj_Type = {
			id: "sczj_Type",
			value: "0",
			type: "radiostoregroup"
		},
		this.sczj_max = {
			id: "sczj_max",
			value: "4",
			type: "text"
		},
		this.sczj_everyPage = {
			id: "sczj_everyPage",
			value: "",
			type: "text"
		},
		this.sczj_everyRow = {
			id: "sczj_everyRow",
			value: "3",
			type: "text"
		},
		this.sczj_add = {
			id: "sczj_add",
			checked: true,
			type: "CheckBox"
		},
		this.sczj_delete = {
			id: "sczj_delete",
			checked: true,
			type: "CheckBox"
		},
		this.sczj_addText = {
			id: "sczj_addText",
			value: "",
			type: "text"
		},
		this.sczj_deleteText = {
			id: "sczj_deleteText",
			value: "",
			type: "text"
		},
		this.sczj_display = {
			id: "sczj_display",
			value: "EqualScaling",
			type: "radiostoregroup"
		}



	//清空属性
	this.clearInfo = function() {
		this.sczj_wdk.checked = false;
		this.upload_click.value = ""
		this.upload_dblclick.value = ""
		this.upload_change.value = ""
		this.sczj_Type.value = "0"
		this.sczj_max.value = "3";
		this.sczj_everyPage.value = ""
		this.sczj_everyRow.value = ""
		this.sczj_add.checked = true
		this.sczj_delete.checked = true
		this.sczj_addText.value = ""
		this.sczj_deleteText.value = ""
		this.sczj_display.value = "EqualScaling"
		this.sczj_dataSet.value = ""
		this.sczj_dataPath.value = ""
		this.sczj_dataName.value = ""
		this.sczj_dataSize.value = ""
		this.sczj_dataType.value = ""
		this.sczj_dataId.value = ""

	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.sczj_wdk.checked = info.sczj_wdk.checked
		this.upload_click = info.upload_click.value
		this.upload_dblclick = info.upload_dblclick.value
		this.upload_change = info.upload_change.value
		this.sczj_Type.value = info.sczj_Type.value;
		this.sczj_max.value = info.sczj_max.value
		this.sczj_everyPage.value = info.sczj_everyPage.value
		this.sczj_everyRow.value = info.sczj_everyRow.value
		this.sczj_add.checked = info.sczj_add.checked
		this.sczj_delete.checked = info.sczj_delete.checked
		this.sczj_addText.value = info.sczj_addText.value
		this.sczj_deleteText.value = info.sczj_deleteText.value
		this.sczj_display.value = info.sczj_display.value
		this.sczj_dataSet.value = info.sczj_dataSet.value;
		this.sczj_dataPath.value = info.sczj_dataPath.value;
		this.sczj_dataName.value = info.sczj_dataName.value;
		this.sczj_dataSize.value = info.sczj_dataSize.value;
		this.sczj_dataType.value = info.sczj_dataType.value;
		this.sczj_dataId.value = info.sczj_dataId.value;
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellUpdateTypeInfo: [{
				sczj_wdk: {
					id: 'sczj_wdk',
					checked: this.sczj_wdk.checked,
					type: 'CheckBox'
				},
				sczj_dataSet: {
					id: 'sczj_dataSet',
					value: this.sczj_dataSet.value,
					type: 'comlist'
				},
				sczj_dataPath: {
					id: 'sczj_dataPath',
					value: this.sczj_dataPath.value,
					type: 'comlist'
				},
				sczj_dataName: {
					id: 'sczj_dataName',
					value: this.sczj_dataName.value,
					type: 'comlist'
				},
				sczj_dataSize: {
					id: 'sczj_dataSize',
					value: this.sczj_dataSize.value,
					type: 'comlist'
				},
				sczj_dataType: {
					id: 'sczj_dataType',
					value: this.sczj_dataType.value,
					type: 'comlist'
				},
				sczj_dataId: {
					id: 'sczj_dataId',
					value: this.sczj_dataId.value,
					type: 'comlist'
				},
				upload_click: {
					id: 'upload_click',
					value: this.upload_click.value,
					type: 'text'
				},
				upload_dblclick: {
					id: 'upload_dblclick',
					value: this.upload_dblclick.value,
					type: 'text'
				},
				upload_change: {
					id: 'upload_change',
					value: this.upload_change.value,
					type: 'text'
				},
				sczj_Type: {
					id: "sczj_Type",
					value: this.sczj_Type.value,
					type: 'radiostoregroup'
				},
				sczj_max: {
					id: 'sczj_max',
					value: this.sczj_max.value,
					type: 'text'
				},
				sczj_everyPage: {
					id: 'sczj_everyPage',
					value: this.sczj_everyPage.value,
					type: 'text'
				},
				sczj_everyRow: {
					id: 'sczj_everyRow',
					value: this.sczj_everyRow.value,
					type: 'text'
				},
				sczj_add: {
					id: 'sczj_add',
					checked: this.sczj_add.checked,
					type: 'CheckBox'
				},
				sczj_delete: {
					id: 'sczj_delete',
					checked: this.sczj_delete.checked,
					type: 'CheckBox'
				},
				sczj_addText: {
					id: 'sczj_addText',
					value: this.sczj_addText.value,
					type: 'text'
				},
				sczj_deleteText: {
					id: 'sczj_deleteText',
					value: this.sczj_deleteText.value,
					type: 'text'
				},
				sczj_display: {
					id: 'sczj_display',
					value: this.sczj_display.value,
					type: 'radiostoregroup'
				}
			}]
		}
		return json;
	}
}

function cellNestedTableType() {
	this.qtb_template = {
			id: "qtb_template",
			value: "",
			type: "text"
		},
		this.qtb_tableName = {
			id: "qtb_tableName",
			value: "",
			type: "text"
		},
		this.qtb_unfold = {
			id: "qtb_unfold",
			checked: false,
			type: "CheckBox"
		},
		this.qtb_style = {
			id: "qtb_style",
			value: "0",
			type: "radiostoregroup"
		}

	//清空属性
	this.clearInfo = function() {
		this.qtb_template.value = ""
		this.qtb_tableName.value = "";
		this.qtb_unfold.checked = false
		this.qtb_style.value = "0";
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.qtb_template.value = info.qtb_template.value
		this.qtb_tableName.value = info.qtb_tableName.value
		this.qtb_unfold.checked = info.qtb_unfold.checked
		this.qtb_style.value = info.qtb_style.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellNestedTableInfo: [{
				qtb_template: {
					id: 'qtb_template',
					value: this.qtb_template.value,
					type: 'text'
				},
				qtb_tableName: {
					id: 'qtb_tableName',
					value: this.qtb_tableName.value,
					type: 'text'
				},
				qtb_unfold: {
					id: 'qtb_unfold',
					checked: this.qtb_unfold.checked,
					type: 'CheckBox'
				},
				qtb_style: {
					id: 'qtb_style',
					value: this.qtb_style.value,
					type: 'radiostoregroup'
				}
			}]

		}
		return json;
	}
}

function cellRichTextType() {
	this.richedit_click = {
			id: 'richedit_click',
			value: '',
			type: 'text'
		},
		this.richedit_change = {
			id: 'richedit_change',
			value: '',
			type: 'text'
		},
		this.fwb_allowEdit = {
			id: "fwb_allowEdit",
			checked: true,
			type: "CheckBox"
		},
		this.fwb_allowPrint = {
			id: "fwb_allowPrint",
			checked: false,
			type: "CheckBox"
		},
		this.fwb_allowEmpty = {
			id: "fwb_allowEmpty",
			checked: false,
			type: "CheckBox"
		},
		this.fwb_indent = {
			id: "fwb_indent",
			value: "0",
			type: "text"
		},
		this.fwb_emptyAlert = {
			id: "fwb_emptyAlert",
			value: "",
			type: "text"
		}

	//清空属性
	this.clearInfo = function() {
		this.richedit_click.value = ''
		this.richedit_change.value = ''
		this.fwb_allowEdit.checked = true
		this.fwb_allowPrint.checked = false;
		this.fwb_allowEmpty.checked = false
		this.fwb_indent.value = "0";
		this.fwb_emptyAlert.value = "";
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.richedit_click.value = info.richedit_click.value
		this.richedit_change.value = info.richedit_change.value
		this.fwb_allowEdit.checked = info.fwb_allowEdit.checked
		this.fwb_allowPrint.checked = info.fwb_allowPrint.checked
		this.fwb_allowEmpty.checked = info.fwb_allowEmpty.checked
		this.fwb_indent.value = info.fwb_indent.value
		this.fwb_emptyAlert.value = info.fwb_emptyAlert.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellRichTextInfo: [{
				richedit_click: {
					id: "richedit_click",
					value: this.richedit_click.value,
					type: 'text'
				},
				richedit_change: {
					id: 'richedit_change',
					value: this.richedit_change.value,
					type: 'text'
				},
				fwb_allowEdit: {
					id: 'fwb_allowEdit',
					checked: this.fwb_allowEdit.checked,
					type: 'CheckBox'
				},
				fwb_allowPrint: {
					id: 'fwb_allowPrint',
					checked: this.fwb_allowPrint.checked,
					type: 'CheckBox'
				},
				fwb_allowEmpty: {
					id: 'fwb_allowEmpty',
					checked: this.fwb_allowEmpty.checked,
					type: 'CheckBox'
				},
				fwb_indent: {
					id: 'fwb_indent',
					value: this.fwb_indent.value,
					type: 'text'
				},
				fwb_emptyAlert: {
					id: 'fwb_emptyAlert',
					value: this.fwb_emptyAlert.value,
					type: 'text'
				}
			}]
		}
		return json;
	}
}

function cellGraphicType() {
	this.tx_displayMode = {
			id: "tx_displayMode",
			value: "0",
			type: "comlist"
		},
		this.tx_picLayout = {
			id: "tx_picLayout",
			value: "0",
			type: "comlist"
		},
		this.tx_source = {
			id: "tx_source",
			value: "0",
			type: "comlist"
		},
		this.tx_control = {
			id: "tx_control",
			value: "",
			type: "comlist"
		},
		this.tx_excelExport = {
			id: "tx_excelExport",
			checked: false,
			type: "CheckBox"
		}
	//清空属性
	this.clearInfo = function() {
		this.tx_displayMode.value = ""
		this.tx_picLayout.value = "";
		this.tx_source.value = ""
		this.tx_control.value = "";
		this.tx_excelExport.checked = false;
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.tx_displayMode.value = info.tx_displayMode.value
		this.tx_picLayout.value = info.tx_picLayout.value
		this.tx_source.value = info.tx_source.value
		this.tx_control.value = info.tx_control.value
		this.tx_excelExport.checked = info.tx_excelExport.checked
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellGraphicInfo: [{
				tx_displayMode: {
					id: 'tx_displayMode',
					value: this.tx_displayMode.value,
					type: 'comlist'
				},
				tx_picLayout: {
					id: 'tx_picLayout',
					value: this.tx_picLayout.value,
					type: 'comlist'
				},
				tx_source: {
					id: 'tx_source',
					value: this.tx_source.value,
					type: 'comlist'
				},
				tx_control: {
					id: 'tx_control',
					value: this.tx_control.value,
					type: 'comlist'
				},
				tx_excelExport: {
					id: 'tx_excelExport',
					checked: this.tx_excelExport.checked,
					type: 'CheckBox'
				},

			}]

		}
		return json;
	}
}

function cellRadioButtonType() {
	this.radio_click = {
			id: 'radio_click',
			value: '',
			type: 'text'
		},
		this.radio_change = {
			id: 'radio_change',
			value: '',
			type: 'text'
		},
		this.dxan_typeSetting = {
			id: "dxan_typeSetting",
			value: "",
			type: "comlist"
		},
		this.dxan_dataSet = {
			id: "dxan_dataSet",
			value: "",
			type: "comlist"
		},
		this.dxan_saveFiled = {
			id: "dxan_saveFiled",
			value: "",
			type: "comlist"
		}, this.dxan_myDisplayFiled = {
			id: "dxan_myDisplayFiled",
			value: "",
			type: "comlist"
		}, this.dxan_dropDownDisplayColumn = {
			id: "dxan_dropDownDisplayColumn",
			value: "",
			type: "text"
		}, this.dxan_filterCondition = {
			id: "dxan_filterCondition",
			value: "",
			type: "text"
		}, this.dxan_allowEdit = {
			id: "dxan_allowEdit",
			checked: true,
			type: "CheckBox"
		},
		this.dxan_allowPrint = {
			id: "dxan_allowPrint",
			checked: true,
			type: "CheckBox"
		},
		this.dxan_auto = {
			id: "dxan_auto",
			checked: false,
			type: "CheckBox"
		},
		this.dxan_displayRows = {
			id: "dxan_displayRows",
			value: "0",
			type: "text"
		},
		this.dxan_rowMargin = {
			id: "dxan_rowMargin",
			value: "0",
			type: "text"
		},
		this.dxan_displayType = {
			id: "dxan_displayType",
			value: "round",
			type: "radiostoregroup"
		}



	//清空属性
	this.clearInfo = function() {
		this.radio_click.value = ''
		this.radio_change.value = ''
		this.dxan_allowEdit.checked = true
		this.dxan_allowPrint.checked = true
		this.dxan_auto.checked = false
		this.dxan_displayRows.value = "0"
		this.dxan_rowMargin.value = "0"
		this.dxan_displayType.value = "round"
		this.dxan_filterCondition.value = ""
		this.dxan_dropDownDisplayColumn.value = ""
		this.dxan_myDisplayFiled.value = ""
		this.dxan_saveFiled.value = ""
		this.dxan_dataSet.value = ""
		this.dxan_typeSetting.value = ""
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.radio_click.value = info.radio_click.value
		this.radio_change.value = info.radio_change.value
		this.dxan_allowEdit.checked = info.dxan_allowEdit.checked
		this.dxan_allowPrint.checked = info.dxan_allowPrint.checked
		this.dxan_auto.checked = info.dxan_auto.checked
		this.dxan_displayRows.value = info.dxan_displayRows.value
		this.dxan_rowMargin.value = info.dxan_rowMargin.value
		this.dxan_displayType.value = info.dxan_displayType.value
		this.dxan_filterCondition.value = info.dxan_filterCondition.value;
		this.dxan_dropDownDisplayColumn.value = info.dxan_dropDownDisplayColumn.value;
		this.dxan_myDisplayFiled.value = info.dxan_myDisplayFiled.value;
		this.dxan_saveFiled.value = info.dxan_saveFiled.value;
		this.dxan_dataSet.value = info.dxan_dataSet.value;
		this.dxan_typeSetting.value = info.dxan_typeSetting.value;
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellNumberInfo: [{
				dxan_allowEdit: {
					id: 'dxan_allowEdit',
					checked: this.dxan_allowEdit.checked,
					type: 'CheckBox'
				},
				radio_click: {
					id: 'radio_click',
					value: this.radio_click.value,
					type: 'text'
				},
				radio_change: {
					id: 'radio_change',
					value: this.radio_change.value,
					type: 'text'
				},
				dxan_allowPrint: {
					id: 'dxan_allowPrint',
					checked: this.dxan_allowPrint.checked,
					type: 'CheckBox'
				},
				dxan_auto: {
					id: 'dxan_auto',
					checked: this.dxan_auto.checked,
					type: 'CheckBox'
				},
				dxan_displayRows: {
					id: 'dxan_displayRows',
					value: this.dxan_displayRows.value,
					type: 'text'
				},
				dxan_rowMargin: {
					id: 'dxan_rowMargin',
					value: this.dxan_rowMargin.value,
					type: 'text'
				},
				dxan_displayType: {
					id: 'dxan_displayType',
					value: this.dxan_displayType.value,
					type: 'radiostoregroup'
				},
				dxan_typeSetting: {
					id: 'dxan_typeSetting',
					value: this.dxan_typeSetting.value,
					type: 'comlist'
				},
				dxan_dataSet: {
					id: 'dxan_dataSet',
					value: this.dxan_dataSet.value,
					type: 'comlist'
				},
				dxan_saveFiled: {
					id: 'dxan_saveFiled',
					value: this.dxan_saveFiled.value,
					type: 'comlist'
				},
				dxan_myDisplayFiled: {
					id: 'dxan_myDisplayFiled',
					value: this.dxan_myDisplayFiled.value,
					type: 'comlist'
				},
				dxan_dropDownDisplayColumn: {
					id: 'dxan_dropDownDisplayColumn',
					value: this.dxan_dropDownDisplayColumn.value,
					type: 'text'
				},
				dxan_filterCondition: {
					id: 'dxan_filterCondition',
					value: this.dxan_filterCondition.value,
					type: 'text'
				}
			}]

		}
		return json;
	}
}

function cellNumberType() {
	this.number_click = {
			id: 'number_click',
			value: '',
			type: 'text'
		},
		this.number_change = {
			id: 'number_change',
			value: '',
			type: 'text'
		},
		this.sz_allowEdit = {
			id: "sz_allowEdit",
			checked: true,
			type: "CheckBox"
		},
		this.sz_allowPrint = {
			id: "sz_allowPrint",
			checked: true,
			type: "CheckBox"
		},
		this.sz_allowEmpty = {
			id: "sz_allowEmpty",
			checked: true,
			type: "CheckBox"
		},
		this.sz_allowFloat = {
			id: "sz_allowFloat",
			checked: true,
			type: "CheckBox"
		},
		this.sz_allowNegative = {
			id: "sz_allowNegative",
			checked: true,
			type: "CheckBox"
		},
		this.sz_max = {
			id: "sz_max",
			checked: false,
			type: "CheckBox"
		},
		this.sz_min = {
			id: "sz_min",
			checked: false,
			type: "CheckBox"
		},
		this.sz_limit = {
			id: "sz_limit",
			checked: false,
			type: "CheckBox"
		},
		this.sz_decimalPoints = {
			id: "sz_decimalPoints",
			value: "0",
			type: "text"
		},
		this.sz_emptyAlert = {
			id: "sz_emptyAlert",
			value: "",
			type: "text"
		},
		this.sz_maxValue = {
			id: 'sz_maxValue',
			value: '',
			type: 'text'
		},
		this.sz_minValue = {
			id: 'sz_minValue',
			value: '',
			type: 'text'
		}
	//清空属性
	this.clearInfo = function() {
		this.number_click.value = ''
		this.number_change.value = ''
		this.sz_allowEmpty.checked = true
		this.sz_allowEdit.checked = true
		this.sz_allowPrint.checked = true
		this.sz_allowFloat.checked = true
		this.sz_allowNegative.checked = true
		this.sz_max.checked = false
		this.sz_min.checked = false
		this.sz_limit.checked = false
		this.sz_decimalPoints.value = "0"
		this.sz_emptyAlert.value = ""
		this.sz_maxValue = '';
		this.sz_minValue = '';
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.number_click.value = info.number_click.value
		this.number_change.value = info.number_change.value
		this.sz_allowEmpty.checked = info.sz_allowEmpty.checked
		this.sz_allowEdit.checked = info.sz_allowEdit.checked
		this.sz_allowPrint.checked = info.sz_allowPrint.checked
		this.sz_allowFloat.checked = info.sz_allowFloat.checked
		this.sz_allowNegative.checked = info.sz_allowNegative.checked
		this.sz_max.checked = info.sz_max.checked
		this.sz_min.checked = info.sz_min.checked
		this.sz_limit.checked = info.sz_limit.checked
		this.sz_decimalPoints.value = info.sz_decimalPoints.value
		this.sz_emptyAlert.value = info.sz_emptyAlert.value
		this.sz_maxValue = info.sz_maxValue.value;
		this.sz_minValue = info.sz_minValue.value;
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellNumberInfo: [{
				number_click: {
					id: 'number_click',
					value: this.number_click.value,
					type: 'text'
				},
				number_change: {
					id: 'number_change',
					value: this.number_change.value,
					type: 'text'
				},
				sz_allowEdit: {
					id: 'sz_allowEdit',
					checked: this.sz_allowEdit.checked,
					type: 'CheckBox'
				},
				sz_allowPrint: {
					id: 'sz_allowPrint',
					checked: this.sz_allowPrint.checked,
					type: 'CheckBox'
				},
				sz_allowEmpty: {
					id: 'sz_allowEmpty',
					checked: this.sz_allowEmpty.checked,
					type: 'CheckBox'
				},
				sz_allowFloat: {
					id: 'sz_allowFloat',
					checked: this.sz_allowFloat.checked,
					type: 'CheckBox'
				},
				sz_allowNegative: {
					id: 'sz_allowNegative',
					checked: this.sz_allowNegative.checked,
					type: 'CheckBox'
				},
				sz_max: {
					id: 'sz_max',
					checked: this.sz_max.checked,
					type: 'CheckBox'
				},
				sz_min: {
					id: 'sz_min',
					checked: this.sz_min.checked,
					type: 'CheckBox'
				},
				sz_limit: {
					id: 'sz_limit',
					checked: this.sz_limit.checked,
					type: 'CheckBox'
				},
				sz_decimalPoints: {
					id: 'sz_decimalPoints',
					value: this.sz_decimalPoints.value,
					type: 'text'
				},
				sz_emptyAlert: {
					id: 'sz_emptyAlert',
					value: this.sz_emptyAlert.value,
					type: 'text'
				}

				,
				sz_maxValue: {
					id: 'sz_maxValue',
					value: this.sz_maxValue.value,
					type: 'text'
				},
				sz_minValue: {
					id: 'sz_minValue',
					value: this.sz_minValue.value,
					type: 'text'
				}
			}]
		}
		return json;
	}
}

function cellProgressBarType() {
	this.jdt_borderColor = {
			id: "jdt_borderColor",
			value: "",
			type: "colorSelect"
		},
		this.jdt_innerColor = {
			id: "jdt_innerColor",
			value: "",
			type: "colorSelect"
		},
		this.jdt_innerColorText = {
			id: "jdt_innerColorText",
			value: "",
			type: "text"
		},
		this.jdt_someValue = {
			id: "jdt_someValue",
			value: "",
			type: "text"
		},
		this.jdt_btop = {
			id: "jdt_btop",
			value: "5",
			type: "text"
		},
		this.jdt_bleft = {
			id: "jdt_bleft",
			value: "5",
			type: "text"
		},
		this.jdt_bright = {
			id: "jdt_bright",
			value: "5",
			type: "text"
		},
		this.jdt_bbottom = {
			id: "jdt_bbottom",
			value: "5",
			type: "text"
		}
	//清空属性
	this.clearInfo = function() {
		this.jdt_borderColor.value = ""
		this.jdt_innerColor.value = "#000000"
		this.jdt_innerColorText.value = "#000000"
		this.jdt_someValue.value = "#000000"
		this.jdt_btop.value = "5"
		this.jdt_bleft.value = "5"
		this.jdt_bright.value = "5"
		this.jdt_bbottom.value = "5"
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.jdt_borderColor.value = info.jdt_borderColor.value
		this.jdt_innerColor.value = info.jdt_innerColor.value
		this.jdt_innerColorText.value = info.jdt_innerColorText.value
		this.jdt_someValue.value = info.jdt_someValue.value
		this.jdt_btop.value = info.jdt_btop.value
		this.jdt_bleft.value = info.jdt_bleft.value
		this.jdt_bright.value = info.jdt_bright.value
		this.jdt_bbottom.value = info.jdt_bbottom.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellProgressBarInfo: [{
				jdt_borderColor: {
					id: 'jdt_borderColor',
					value: this.jdt_borderColor.value,
					type: 'colorSelect'
				},
				jdt_innerColor: {
					id: 'jdt_innerColor',
					value: this.jdt_innerColor.value,
					type: 'colorSelect'
				},
				jdt_innerColorText: {
					id: 'jdt_innerColorText',
					value: this.jdt_innerColorText.value,
					type: 'text'
				},
				jdt_someValue: {
					id: 'jdt_someValue',
					value: this.jdt_someValue.value,
					type: 'text'
				},
				jdt_btop: {
					id: 'jdt_btop',
					value: this.jdt_btop.value,
					type: 'text'
				},
				jdt_bleft: {
					id: 'jdt_bleft',
					value: this.jdt_bleft.value,
					type: 'text'
				},
				jdt_bright: {
					id: 'jdt_bright',
					value: this.jdt_bright.value,
					type: 'text'
				},
				jdt_bbottom: {
					id: 'jdt_bbottom',
					value: this.jdt_bbottom.value,
					type: 'text'
				}
			}]
		}
		return json;
	}
}

function cellDateType() {
	this.rq_customFormat = {
			id: 'rq_customFormat',
			value: '',
			type: 'text'
		},
		this.date_click = {
			id: 'date_click',
			value: '',
			type: 'text'
		},
		this.date_dblclick = {
			id: 'date_dblclick',
			value: '',
			type: 'text'
		},
		this.date_change = {
			id: 'date_change',
			value: '',
			type: 'text'
		},
		this.rq_allowEdit = {
			id: "rq_allowEdit",
			checked: true,
			type: "CheckBox"
		},
		this.rq_customize = {
			id: "rq_customize",
			checked: false,
			type: "CheckBox"
		},
		this.rq_dateStyle = {
			id: "rq_dateStyle",
			value: "yyyy-MM-dd",
			type: "comlist"
		},
		this.rq_defaultToday = {
			id: "rq_defaultToday",
			checked: true,
			type: "CheckBox"
		},
		this.rq_allowPrint = {
			id: "rq_allowPrint",
			checked: true,
			type: "CheckBox"
		},
		this.rq_allowEmpty = {
			id: "rq_allowEmpty",
			checked: true,
			type: "CheckBox"
		},
		this.rq_emptyAlert = {
			id: "rq_emptyAlert",
			value: "",
			type: "text"
		}



	//清空属性
	this.clearInfo = function() {
		this.rq_customFormat = ''
		this.date_click.value = ''
		this.date_dblclick.value = ''
		this.date_change.value = ''
		this.rq_allowEdit.checked = true
		this.rq_customize.checked = false
		this.rq_dateStyle.value = "%Y-%m-%d"
		this.rq_defaultToday.checked = true
		this.rq_allowPrint.checked = true
		this.rq_allowEmpty.checked = true
		this.rq_emptyAlert.value = ""
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.rq_customFormat.value = info.rq_customFormat.value
		this.date_click.value = info.date_click.value
		this.date_dblclick.value = info.date_dblclick.value
		this.date_change.value = info.date_change.value
		this.rq_allowEmpty.checked = info.rq_allowEmpty.checked
		this.rq_allowEdit.checked = info.rq_allowEdit.checked
		this.rq_allowPrint.checked = info.rq_allowPrint.checked
		this.rq_customize.checked = info.rq_customize.checked
		this.rq_defaultToday.checked = info.rq_defaultToday.checked
		this.rq_dateStyle.value = info.rq_dateStyle.value
		this.rq_emptyAlert.value = info.rq_emptyAlert.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellDateInfo: [{
				rq_customFormat: {
					id: 'rq_customFormat',
					value: this.rq_customFormat.value,
					type: 'text'
				},
				date_click: {
					id: 'date_click',
					value: this.date_click.value,
					type: 'text'
				},
				date_dblclick: {
					id: 'date_dblclick',
					value: this.date_dblclick.value,
					type: 'text'
				},
				date_change: {
					id: 'date_change',
					value: this.date_change.value,
					type: 'text'
				},
				rq_allowEdit: {
					id: 'rq_allowEdit',
					checked: this.rq_allowEdit.checked,
					type: 'CheckBox'
				},
				rq_allowPrint: {
					id: 'rq_allowPrint',
					checked: this.rq_allowPrint.checked,
					type: 'CheckBox'
				},
				rq_allowEmpty: {
					id: 'rq_allowEmpty',
					checked: this.rq_allowEmpty.checked,
					type: 'CheckBox'
				},
				rq_dateStyle: {
					id: 'rq_dateStyle',
					value: this.rq_dateStyle.value,
					type: 'comlist'
				},
				rq_emptyAlert: {
					id: 'rq_emptyAlert',
					value: this.rq_emptyAlert.value,
					type: 'text'
				},
				rq_defaultToday: {
					id: 'rq_defaultToday',
					checked: this.rq_defaultToday.checked,
					type: 'CheckBox'
				},
				rq_customize: {
					id: 'rq_customize',
					checked: this.rq_customize.checked,
					type: 'CheckBox'
				}
			}]

		}
		return json;
	}
}

// function DataSetting() {
// this.data_typeSetting = {
// 		id: "data_typeSetting",
// 		value: "",
// 		type: "comlist"
// 	},
// 	this.data_dataSet = {
// 		id: "data_dataSet",
// 		value: "",
// 		type: "comlist"
// 	},
// 	this.data_saveFiled = {
// 		id: "data_saveFiled",
// 		value: "",
// 		type: "comlist"
// 	}, this.data_myDisplayFiled = {
// 		id: "data_myDisplayFiled",
// 		value: "",
// 		type: "comlist"
// 	}, this.data_dropDownDisplayColumn = {
// 		id: "data_dropDownDisplayColumn",
// 		value: "",
// 		type: "text"
// 	}, this.data_filterCondition = {
// 		id: "data_filterCondition",
// 		value: "",
// 		type: "text"
// 	},


// 		//清空属性
// 		this.clearInfo = function() {
// this.data_filterCondition.value = ""
// this.data_dropDownDisplayColumn.value = ""
// this.data_myDisplayFiled.value = ""
// this.data_saveFiled.value = ""
// this.data_dataSet.value = ""
// this.data_typeSetting.value = ""
// 		};

// 	//设置值
// 	this.setCellInfo = function(info, cell) {
// 		this.data_filterCondition.value = info.data_filterCondition.value;
// 		this.data_dropDownDisplayColumn.value = info.data_dropDownDisplayColumn.value;
// 		this.data_myDisplayFiled.value = info.data_myDisplayFiled.value;
// 		this.data_saveFiled.value = info.data_saveFiled.value;
// 		this.data_dataSet.value = info.data_dataSet.value;
// 		this.data_typeSetting.value = info.data_typeSetting.value;
// 	};

// 	// 根据id设置相应属性的值
// 	this.setCellInfos = function(id, value) {
// 		var c = this.getInfoByID(id);
// 		if (c) {
// 			forChecked(c, id, value)
// 		}
// 	};

// 	//通过id获取属性
// 	this.getInfoByID = function(id) {
// 		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
// 	}

// 	//转换JSON串
// 	this.cellInfoToJson = function() {
// 		json = {
// 			xlkData: [{
// 				data_typeSetting: {
// 					id: 'data_typeSetting',
// 					value: this.data_typeSetting.value,
// 					type: 'comlist'
// 				},
// 				data_dataSet: {
// 					id: 'data_dataSet',
// 					value: this.data_dataSet.value,
// 					type: 'comlist'
// 				},
// 				data_saveFiled: {
// 					id: 'data_saveFiled',
// 					value: this.data_saveFiled.value,
// 					type: 'comlist'
// 				},
// 				data_myDisplayFiled: {
// 					id: 'data_myDisplayFiled',
// 					value: this.data_myDisplayFiled.value,
// 					type: 'comlist'
// 				},
// 				data_dropDownDisplayColumn: {
// 					id: 'data_dropDownDisplayColumn',
// 					value: this.data_dropDownDisplayColumn.value,
// 					type: 'text'
// 				},
// 				data_filterCondition: {
// 					id: 'data_filterCondition',
// 					value: this.data_filterCondition.value,
// 					type: 'text'
// 				}
// 			}]
// 		}
// 		return json;
// 	}
// }


// function xlsDataSetting() {

// 	this.xls_dataSet = {
// 			id: "xls_dataSet",
// 			value: "",
// 			type: "comlist"
// 		},
// 		this.xls_myDisplayFiled = {
// 			id: "xls_myDisplayFiled",
// 			value: "",
// 			type: "comlist"
// 		},
// 		this.xls_myFatherFiled = {
// 			id: "xls_myFatherFiled",
// 			value: "",
// 			type: "comlist"
// 		},
// 		this.xls_myNodeFiled = {
// 			id: "xls_myNodeFiled",
// 			value: "",
// 			type: "comlist"
// 		},
// 		this.xls_rootValue = {
// 			id: "xls_rootValue",
// 			value: "",
// 			type: "comlist"
// 		},
// 		this.xls_rootNodeText = {
// 			id: "xls_rootNodeText",
// 			value: "",
// 			type: "comlist"
// 		}, this.xls_myValueFiled = {
// 			id: "xls_myValueFiled",
// 			value: "",
// 			type: "comlist"
// 		}

// 	//清空属性
// 	this.clearInfo = function() {
// 		this.xls_dataSet.value = ""
// 		this.xls_myDisplayFiled.value = ""
// 		this.xls_myFatherFiled.value = ""
// 		this.xls_myNodeFiled.value = ""
// 		this.xls_rootValue.value = ""
// 		this.xls_rootNodeText.value = ""
// 		this.xls_myValueFiled.value = ""
// 	};

// 	//设置值
// 	this.setCellInfo = function(info, cell) {
// 		this.xls_dataSet.value = info.xls_dataSet.value;
// 		this.xls_myDisplayFiled.value = info.xls_myDisplayFiled.value;
// 		this.xls_myFatherFiled.value = info.xls_myFatherFiled.value;
// 		this.xls_myNodeFiled.value = info.xls_myNodeFiled.value;
// 		this.xls_rootValue.value = info.xls_rootValue.value;
// 		this.xls_rootNodeText.value = info.xls_rootNodeText.value;
// 		this.xls_myValueFiled.value = info.xls_myValueFiled.value;
// 	};

// 	// 根据id设置相应属性的值
// 	this.setCellInfos = function(id, value) {
// 		var c = this.getInfoByID(id);
// 		if (c) {
// 			forChecked(c, id, value)
// 		}
// 	};

// 	//通过id获取属性
// 	this.getInfoByID = function(id) {
// 		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
// 	}

// 	//转换JSON串
// 	this.cellInfoToJson = function() {
// 		json = {
// 			xlsData: [{
// 				xls_dataSet: {
// 					id: 'xls_dataSet',
// 					value: this.xls_dataSet.value,
// 					type: 'comlist'
// 				},
// 				xls_myDisplayFiled: {
// 					id: 'xls_myDisplayFiled',
// 					value: this.xls_myDisplayFiled.value,
// 					type: 'comlist'
// 				},
// 				xls_myFatherFiled: {
// 					id: 'xls_myFatherFiled',
// 					value: this.xls_myFatherFiled.value,
// 					type: 'comlist'
// 				},
// 				xls_myNodeFiled: {
// 					id: 'xls_myNodeFiled',
// 					value: this.xls_myNodeFiled.value,
// 					type: 'comlist'
// 				},
// 				xls_rootValue: {
// 					id: 'xls_rootValue',
// 					value: this.xls_rootValue.value,
// 					type: 'comlist'
// 				},
// 				xls_rootNodeText: {
// 					id: 'xls_rootNodeText',
// 					value: this.xls_rootNodeText.value,
// 					type: 'comlist'
// 				},
// 				xls_myValueFiled: {
// 					id: 'xls_myValueFiled',
// 					value: this.xls_myValueFiled.value,
// 					type: 'comlist'
// 				}
// 			}]
// 		}
// 		return json;
// 	}
// }

function cellDropDownTreeType() {
	this.ddt_height = {
			id: 'ddt_height',
			value: '250',
			type: 'text'
		},
		this.ddt_allowEmpty = {
			id: 'ddt_allowEmpty',
			checked: true,
			type: 'CheckBox'
		},
		this.ddt_emptyAlert = {
			id: 'ddt_emptyAlert',
			value: '',
			type: 'text'
		},
		this.selectableType = {
			id: 'selectableType',
			value: '',
			type: 'comlist'
		},
		this.filter_xls = {
			id: 'filter_xls',
			value: '',
			type: 'text'
		},
		this.combotree_click = {
			id: 'combotree_click',
			value: '',
			type: 'text'
		},
		this.combotree_change = {
			id: 'combotree_change',
			value: '',
			type: 'text'
		},
		this.myWidth = {
			id: "myWidth",
			value: "100",
			type: "text"
		},
		this.xls_dataSet = {
			id: 'xls_dataSet',
			value: '',
			type: 'combo'
		},
		this.xls_myDisplayFiled = {
			id: 'xls_myDisplayFiled',
			value: '',
			type: 'combo'
		},
		this.xls_myFatherFiled = {
			id: 'xls_myFatherFiled',
			value: '',
			type: 'combo'
		},
		this.xls_myNodeFiled = {
			id: 'xls_myNodeFiled',
			value: '',
			type: 'combo'
		},
		this.xls_rootValue = {
			id: 'xls_rootValue',
			value: '',
			type: 'combo'
		},
		this.xls_rootNodeText = {
			id: 'xls_rootNodeText',
			value: '',
			type: 'combo'
		},
		this.xls_myValueFiled = {
			id: 'xls_myValueFiled',
			value: '',
			type: 'combo'
		}

	//清空属性
	this.clearInfo = function() {
		this.selectableType.value = ''
		this.filter_xls.value = ''
		this.combotree_click.value = ''
		this.combotree_change.value = ''
		this.myWidth.value.value = "100"
		this.xls_dataSet.value = ""
		this.xls_myDisplayFiled.value = ""
		this.xls_myFatherFiled.value = ""
		this.xls_myNodeFiled.value = ""
		this.xls_rootValue.value = ""
		this.xls_rootNodeText.value = ""
		this.xls_myValueFiled.value = ""
		this.ddt_height.value = '250'
		this.ddt_allowEmpty.checked = true
		this.ddt_emptyAlert.value = ''
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.selectableType.value = info.selectableType.value
		this.filter_xls.value = info.filter_xls.value
		this.combotree_click.value = info.combotree_click.value;
		this.combotree_change.value = info.combotree_change.value
		this.myWidth.value.value = info.myWidth.value;
		this.xls_dataSet.value = info.xls_dataSet.value
		this.xls_myDisplayFiled.value = info.xls_myDisplayFiled.value
		this.xls_myFatherFiled.value = info.xls_myFatherFiled.value
		this.xls_myNodeFiled.value = info.xls_myNodeFiled.value
		this.xls_rootValue.value = info.xls_rootValue.value
		this.xls_rootNodeText.value = info.xls_rootNodeText.value
		this.xls_myValueFiled.value = info.xls_myValueFiled.value
		this.ddt_height.value = info.this.ddt_height.value
		this.ddt_allowEmpty.checked = info.this.ddt_allowEmpty.checked
		this.ddt_emptyAlert.value = info.this.ddt_emptyAlert.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			xlsInfo: [{
				ddt_height: {
					id: 'ddt_height',
					value: this.ddt_height.value,
					type: 'text'
				},
				ddt_allowEmpty: {
					id: 'ddt_allowEmpty',
					checked: this.ddt_allowEmpty.checked,
					type: 'CheckBox'
				},
				ddt_emptyAlert: {
					id: 'ddt_emptyAlert',
					value: this.ddt_emptyAlert.value,
					type: 'text'
				},



				selectableType: {
					id: 'selectableType',
					value: this.selectableType.value,
					type: 'comlist'
				},
				filter_xls: {
					id: 'filter_xls',
					value: this.filter_xls.value,
					type: 'text'
				},
				myWidth: {
					id: 'myWidth',
					value: this.myWidth.value,
					type: 'text'
				},
				combotree_click: {
					id: 'combotree_click',
					value: this.combotree_click.value,
					type: 'text'
				},
				combotree_change: {
					id: 'combotree_change',
					value: this.combotree_change.value,
					type: 'text'
				},
				xls_dataSet: {
					id: 'xls_dataSet',
					value: this.xls_dataSet.value,
					type: 'combo'
				},
				xls_myDisplayFiled: {
					id: 'xls_myDisplayFiled',
					value: this.xls_myDisplayFiled.value,
					type: 'combo'
				},
				xls_myFatherFiled: {
					id: 'xls_myFatherFiled',
					value: this.xls_myFatherFiled.value,
					type: 'combo'
				},
				xls_myNodeFiled: {
					id: 'xls_myNodeFiled',
					value: this.xls_myNodeFiled.value,
					type: 'combo'
				},
				xls_rootValue: {
					id: 'xls_rootValue',
					value: this.xls_rootValue.value,
					type: 'combo'
				},
				xls_rootNodeText: {
					id: 'xls_rootNodeText',
					value: this.xls_rootNodeText.value,
					type: 'combo'
				},
				xls_myValueFiled: {
					id: 'xls_myValueFiled',
					value: this.xls_myValueFiled.value,
					type: 'combo'
				}
			}]
		}
		return json;
	}
}



function BorderLineSetting() {
	this.LineStyle = {
			id: "LineStyle",
			value: "Solid",
			type: "LineStyle"
		},
		this.ColorSelect = {
			id: "ColorSelect",
			value: "#000000",
			type: "colorSelect"
		},
		this.BorderStyle = {
			id: "BorderStyle",
			value: "none",
			type: "combo"
		}, this.borderL = {
			id: 'borderL',
			value: '1px solid #e9e1e1',
			type: 'button'
		}, this.borderR = {
			id: 'borderR',
			value: '1px solid #e9e1e1',
			type: 'button'
		}, this.borderT = {
			id: 'borderT',
			value: '1px solid #e9e1e1',
			type: 'button'
		}, this.borderB = {
			id: 'borderB',
			value: '1px solid #e9e1e1',
			type: 'button'
		}

	this.clone = function() {
		var temp = new BorderLineSetting()
		temp.LineStyle.value = this.LineStyle.value
		temp.ColorSelect.value = this.ColorSelect.value
		temp.BorderStyle.value = this.BorderStyle.value
		temp.borderL.value = this.borderL.value
		temp.borderR.value = this.borderR.value
		temp.borderT.value = this.borderT.value
		temp.borderB.value = this.borderB.value
		return temp;
	}
	//清空属性
	this.clearInfo = function() {
		this.LineStyle.value = "Solid"
		this.ColorSelect.value = "#000000";
		this.BorderStyle.value = "none";
		this.borderL.value = '1px solid #e9e1e1';
		//this.borderL.value = 'initial solid #cccccc';
		this.borderR.value = '1px solid #e9e1e1';
		this.borderT.value = '1px solid #e9e1e1';
		this.borderB.value = '1px solid #e9e1e1';
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.LineStyle.value = info.LineStyle.value;
		this.ColorSelect.value = info.ColorSelect.value;
		this.BorderStyle.value = info.BorderStyle.value;
		this.borderL.value = info.borderL.value;
		this.borderR.value = info.borderR.value;
		this.borderT.value = info.borderT.value;
		this.borderB.value = info.borderB.value;
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			borderInfo: [{
				LineStyle: {
					id: 'LineStyle',
					value: this.LineStyle.value,
					type: 'none'
				},
				ColorSelect: {
					id: 'ColorSelect',
					value: this.ColorSelect.value,
					type: 'ColorSelect'
				},
				BorderStyle: {
					id: 'BorderStyle',
					value: this.BorderStyle.value,
					type: 'none'
				},
				borderL: {
					id: 'borderL',
					value: this.borderL.value,
					type: 'button'
				},
				borderR: {
					id: 'borderR',
					value: this.borderR.value,
					type: 'button'
				},
				borderT: {
					id: 'borderT',
					value: this.borderT.value,
					type: 'button'
				},
				borderB: {
					id: 'borderB',
					value: this.borderB.value,
					type: 'button'
				},
			}]
		}
		return json;

	}

}

// 背景色信息
function bgColorSetting() {
	this.ColorSelectInner = {
		id: "colorDisplay",
		value: "#fff",
		type: "colorSelect"
	}
	//清空属性
	this.clearInfo = function() {
		this.ColorSelectInner.value = "#fff"
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.ColorSelectInner.value = info.ColorSelectInner.value;
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {

		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};
	this.clone = function() {
		var temp = new bgColorSetting();
		temp.ColorSelectInner.value = this.ColorSelectInner.value;
		return temp;
	}
	//通过id获取属性
	this.getInfoByID = function(id) {

		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			background_color: [{
				ColorSelectInner: {
					id: 'colorDisplay',
					value: this.ColorSelectInner.value,
					type: 'ColorSelect'
				}
			}]
		}
		return json;

	}
}

function numberCategory() {

	this.allSortCom = {
			id: "allSortCom",
			value: "myConventional",
			type: "comlist"
		},
		this.xs = {
			id: "xs",
			value: "-1",
			type: "text"
		},
		this.xs1 = {
			id: "xs1",
			value: "-1",
			type: "text"
		},
		this.xs2 = {
			id: "xs2",
			value: "-1",
			type: "text"
		},
		this.xs3 = {
			id: "xs3",
			value: "-1",
			type: "text"
		},
		this.xs4 = {
			id: "xs4",
			value: "-1",
			type: "text"
		},
		this.noZeroCheckBox = {
			id: "noZeroCheckBox",
			checked: false,
			type: "CheckBox"
		},
		this.noZeroCheckBox1 = {
			id: "noZeroCheckBox1",
			checked: false,
			type: "CheckBox"
		},
		this.noZeroCheckBox2 = {
			id: "noZeroCheckBox2",
			checked: false,
			type: "CheckBox"
		},
		this.noZeroCheckBox3 = {
			id: "noZeroCheckBox3",
			checked: false,
			type: "CheckBox"
		},
		this.noZeroCheckBox4 = {
			id: "noZeroCheckBox4",
			checked: false,
			type: "CheckBox"
		},
		this.symbolCom = {
			id: "symbolCom",
			value: "",
			type: "comlist"
		},
		this.symbolCom1 = {
			id: "symbolCom1",
			value: "",
			type: "comlist"
		},
		this.areaCom = {
			id: "areaCom",
			value: "",
			type: "comlist"
		},
		this.areaCom1 = {
			id: "areaCom1",
			value: "",
			type: "comlist"
		},
		this.areaCom2 = {
			id: "areaCom2",
			value: "",
			type: "comlist"
		},
		this.dateSortCom = {
			id: "dateSortCom",
			value: "",
			type: "comlist"
		},
		this.customCom = {
			id: "customCom",
			value: "",
			type: "comlist"
		},
		this.useCommaCheckBox = {
			id: "useCommaCheckBox",
			checked: false,
			type: "CheckBox"
		},
		this.negativeCom = {
			id: "negativeCom",
			value: "",
			type: "comlist"
		},
		this.numShowType = {
			id: "numShowType",
			value: "",
			type: "combo"
		}

	//置空
	this.clearInfo = function() {


		this.allSortCom.value = "myConventional";
		this.xs.value = "0";
		this.xs1.value = "0";
		this.xs2.value = "0";
		this.xs3.value = "0";
		this.xs4.value = "0";

		this.noZeroCheckBox.checked = false;
		this.noZeroCheckBox1.checked = false;
		this.noZeroCheckBox2.checked = false;
		this.noZeroCheckBox3.checked = false;
		this.noZeroCheckBox4.checked = false;

		this.areaCom.value = "0";
		this.areaCom1.value = "0";
		this.areaCom2.value = "0"

		this.symbolCom.value = "none";
		this.symbolCom1.value = "none";

		this.useCommaCheckBox.checked = false;
		this.negativeCom.value = "1";
		this.dateSortCom.value = "0";
		this.customCom.value = "1";
		this.numShowType.value = "";
	};
	this.setCellInfo = function(info, cell) {

		// this.underline.value = info.underline.value;
		this.allSortCom.value = info.allSortCom.value;
		this.xs.value = info.xs.value;
		this.xs1.value = info.xs1.value;
		this.xs2.value = info.xs2.value;
		this.xs3.value = info.xs3.value;
		this.xs4.value = info.xs4.value;

		this.noZeroCheckBox.checked = info.noZeroCheckBox.checked;
		this.noZeroCheckBox1.checked = info.noZeroCheckBox1.checked;
		this.noZeroCheckBox2.checked = info.noZeroCheckBox2.checked;
		this.noZeroCheckBox3.checked = info.noZeroCheckBox3.checked;
		this.noZeroCheckBox4.checked = info.noZeroCheckBox4.checked;

		this.areaCom.value = info.areaCom.value;
		this.areaCom1.value = info.areaCom1.value;
		this.areaCom2.value = info.areaCom2.value;

		this.symbolCom.value = info.symbolCom.value;
		this.symbolCom1.value = info.symbolCom1.value;

		this.useCommaCheckBox.checked = info.useCommaCheckBox.checked;
		this.negativeCom.value = info.negativeCom.value;
		this.dateSortCom.value = info.dateSortCom.value;
		this.customCom.value = info.customCom.value;
		this.numShowType.value = info.numShowType.value;
	};
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}
	this.cellInfoToJson = function() {
		json = {
			allNumberInfo: [{
				xs: {
					id: "xs",
					value: this.xs.value,
					type: "text"
				},

				allSortCom: {
					id: "allSortCom",
					value: this.allSortCom.value,
					type: "comlist"
				},
				noZeroCheckBox: {
					id: "noZeroCheckBox",
					checked: this.noZeroCheckBox.checked,
					type: "CheckBox"
				},
				useCommaCheckBox: {
					id: "useCommaCheckBox",
					checked: this.useCommaCheckBox.checked,
					type: "CheckBox"
				},
				xs1: {
					id: "xs1",
					value: this.xs1.value,
					type: "text"
				},
				noZeroCheckBox1: {
					id: "noZeroCheckBox1",
					checked: this.noZeroCheckBox1.checked,
					type: "CheckBox"
				},
				symbolCom: {
					id: "symbolCom",
					value: this.symbolCom.value,
					type: "comlist"
				},
				dateSortCom: {
					id: "dateSortCom",
					value: this.dateSortCom.value,
					type: "comlist"
				},
				areaCom: {
					id: "areaCom",
					value: this.areaCom.value,
					type: "comlist"
				},
				areaCom1: {
					id: "areaCom1",
					value: this.areaCom1.value,
					type: "comlist"
				},
				areaCom2: {
					id: "areaCom2",
					value: this.areaCom2.value,
					type: "comlist"
				},
				customCom: {
					id: "customCom",
					value: this.customCom.value,
					type: "comlist"
				},
				xs3: {
					id: "xs3",
					value: this.xs3.value,
					type: "text"
				},
				xs4: {
					id: "xs4",
					value: this.xs4.value,
					type: "text"
				},
				noZeroCheckBox3: {
					id: "noZeroCheckBox3",
					checked: this.noZeroCheckBox3.checked,
					type: "CheckBox"
				},
				noZeroCheckBox4: {
					id: "noZeroCheckBox4",
					checked: this.noZeroCheckBox4.checked,
					type: "CheckBox"
				},
				xs2: {
					id: "xs2",
					value: this.xs2.value,
					type: "text"
				},
				noZeroCheckBox2: {
					id: "noZeroCheckBox2",
					checked: this.noZeroCheckBox2.checked,
					type: "CheckBox"
				},
				symbolCom1: {
					id: "symbolCom1",
					value: this.symbolCom1.value,
					type: "comlist"
				},
				negativeCom: {
					id: "negativeCom",
					value: this.negativeCom.value,
					type: "comlist"
				},
				numShowType: {
					id: "numShowType",
					value: this.numShowType.value,
					type: "combo"
				}
			}]
		}
		return json;
	}
}

function printSetting() {
	this.print_printInner = {
			id: "print_printInner",
			checked: false,
			type: "CheckBox"
		},
		this.print_printBack = {
			id: "print_printBack",
			checked: false,
			type: "CheckBox"
		},
		this.print_exportBack = {
			id: "print_exportBack",
			checked: false,
			type: "CheckBox"
		},
		this.print_sx = {
			id: "print_sx",
			checked: false,
			type: "CheckBox"
		}


	//清空属性
	this.clearInfo = function() {
		this.print_printInner.checked = false;
		this.print_printBack.checked = false;
		this.print_exportBack.checked = false;
		this.print_sx.checked = false;
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.print_printInner.checked = info.print_printInner.checked;
		this.print_printBack.checked = info.print_printBack.checked;
		this.print_exportBack.checked = info.print_exportBack.checked;
		this.print_sx.checked = info.print_sx.checked;
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			printSettingInfo: [{
				print_printInner: {
					id: 'print_printInner',
					checked: this.print_printInner.checked,
					type: 'CheckBox'
				},
				print_printBack: {
					id: 'print_printBack',
					checked: this.print_printBack.checked,
					type: 'CheckBox'
				},
				print_exportBack: {
					id: 'print_exportBack',
					checked: this.print_exportBack.checked,
					type: 'CheckBox'
				},
				print_sx: {
					id: 'print_sx',
					checked: this.print_sx.checked,
					type: 'CheckBox'
				}
			}]

		}
		return json;
	}
}

function storeGeter() {
	// 
	this.names = {};
	var i = 0;
	var c = 0;
	var storeRoot = xds.vmd.getRootNode("dataset");
	if (storeRoot) {
		storeRoot.eachChild(function(n) {
			this.names[i] = n;
			i++
		}, this);
	}

	var temp;
	var s = [];
	var ob = [];
	var b = []

	for (i = 0; i < 9999999; i++) {
		if (this.names[i]) {
			for (var x = 0; x < this.names[i].childNodes.length; x++) {
				var obj = {
					father: this.names[i].attributes.text,
					child: this.names[i].childNodes[x].attributes.text
				};
				s.push(obj);
			}

			for (var x = 0; x < this.names[i].childNodes.length; x++) {
				if (temp != this.names[i].attributes.text) {
					var obj = {
						father: this.names[i].attributes.text
					}
				}
				ob.push(obj);
			}
		} else {
			break;
		}
	}

	// 对数据库名称去重处理
	for (var key in ob) {
		var t;
		// 
		if (key == 0) {
			b.push(ob[0])
			t = ob[0];
		} else {
			if (ob[key].father) {
				if (ob[key].father != t.father) {
					b.push(ob[key])
					t = ob[key]
				} else {
					t = t;
				}
			}

		}
	}


	this.stores = {
		id: "stores",
		value: s,
		type: "store"
	}
	this.storeName = {
		id: "storeName",
		value: b,
		type: "store"
	}
	this.clearInfo = function() {
		this.stores.value = s;
		this.storeName.value = b;
	}
	this.setCellInfo = function(info, cell) {
		this.stores.value = info.stores.value;
		this.storeName.value = info.storeName.value;
	}
	this.setCellInfos = function() {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	}
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}
	this.cellInfoToJson = function() {
		json = {
			allStore: [{
				stores: {
					id: 'stores',
					value: this.stores.value,
					type: 'store'
				},
				storeName: {
					id: 'storeName',
					value: this.storeName.value,
					type: 'store'
				}
			}]
		}
		return json;
	}


};

function ContentSetting() {
	this.cmbType = {
		id: "cmbType",
		value: "cg",
		type: "comlist"
	}



	//清空属性
	this.clearInfo = function() {
		this.cmbType.value = "cg"
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.cmbType.value = info.cmbType.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			Content: [{
				cmbType: {
					id: 'cmbType',
					value: this.cmbType.value,
					type: 'comlist'
				}
			}]
		}
		return json;
	}
}

function cellTextType() {
	this.wb_rule_charExp = {
			id: 'wb_rule_charExp',
			value: '',
			type: 'text'
		},
		this.wb_allType = {
			id: 'wb_allType',
			value: 'wb',
			type: 'combo'
		},
		this.wb_text_allowEdit = {
			id: 'wb_text_allowEdit',
			type: 'CheckBox',
			checked: true
		},
		this.wb_text_allowPrint = {
			id: 'wb_text_allowPrint',
			type: 'CheckBox',
			checked: true
		},
		this.wb_text_allowRows = {
			id: 'wb_text_allowRows',
			type: 'CheckBox',
			checked: false
		},
		this.wb_text_symbol = {
			id: 'wb_text_symbol',
			type: 'CheckBox',
			checked: false
		},
		this.wb_text_allowEmpty = {
			id: 'wb_text_allowEmpty',
			type: 'CheckBox',
			checked: true
		},
		this.wb_text_emptyAlert = {
			id: 'wb_text_emptyAlert',
			type: 'text',
			value: ''
		},
		this.wb_text_fillRules = {
			id: 'wb_text_fillRules',
			type: 'text',
			value: ''
		},
		this.wb_rule_min = {
			id: 'wb_rule_min',
			type: 'text',
			value: ''
		},
		this.wb_rule_max = {
			id: 'wb_rule_max',
			type: 'text',
			value: ''
		},
		this.wb_rule_phoneType = {
			id: 'wb_rule_phoneType',
			type: 'text',
			value: ''
		},
		this.wb_no_allowPrint = {
			id: 'wb_no_allowPrint',
			type: 'CheckBox',
			checked: true
		},
		this.wb_no_allowEmpty = {
			id: 'wb_no_allowEmpty',
			type: 'CheckBox',
			checked: true
		},
		this.wb_no_emptyAlert = {
			id: 'wb_no_emptyAlert',
			type: 'text',
			value: ''
		},
		this.wb_password_allowEmpty = {
			id: 'wb_password_allowEmpty',
			type: 'CheckBox',
			checked: true
		},
		this.wb_password_allowEdit = {
			id: 'wb_password_allowEdit',
			type: 'CheckBox',
			checked: true
		},
		this.wb_password_allowPrint = {
			id: 'wb_password_allowPrint',
			type: 'CheckBox',
			checked: true
		},
		this.wb_password_emptyAlert = {
			id: 'wb_password_emptyAlert',
			type: 'text',
			value: ''
		},
		this.wb_guid_emptyAlert = {
			id: 'wb_guid_emptyAlert',
			type: 'text',
			value: ''
		},
		this.wb_guid_length = {
			id: 'wb_guid_length',
			type: 'text',
			value: ''
		},
		this.wb_guid_allowEmpty = {
			id: 'wb_guid_allowEmpty',
			type: 'CheckBox',
			checked: true
		},
		this.text_click = {
			id: 'text_click',
			type: 'text',
			value: ''
		},
		this.text_change = {
			id: 'text_change',
			type: 'text',
			value: ''
		}



	//清空属性
	this.clearInfo = function() {
		this.wb_allType.value = 'wb';
		this.wb_rule_charExp.value = ''

		this.wb_text_allowEdit.checked = true
		this.wb_text_allowPrint.checked = true
		this.wb_text_allowRows.checked = false
		this.wb_text_symbol.checked = false
		this.wb_text_allowEmpty.checked = true
		this.wb_text_emptyAlert.value = ''
		this.wb_text_fillRules.value = ''

		this.wb_rule_min.value = ''
		this.wb_rule_max.value = ''
		this.wb_rule_phoneType.value = ''

		this.wb_no_allowPrint.checked = true
		this.wb_no_allowEmpty.checked = true
		this.wb_no_emptyAlert.value = ''

		this.wb_password_allowEmpty.checked = true
		this.wb_password_allowEdit.checked = true
		this.wb_password_allowPrint.checked = true
		this.wb_password_emptyAlert.value = ''

		this.wb_guid_emptyAlert.value = ''
		this.wb_guid_length.value = '0'
		this.wb_guid_allowEmpty.checked = true

		this.text_click.value = ''
		this.text_change.value = ''
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.wb_rule_charExp.value = info.wb_rule_charExp.value
		this.wb_allType.value = info.wb_allType.value
		this.wb_text_allowEdit.checked = info.wb_text_allowEdit.checked;
		this.wb_text_allowPrint.checked = info.wb_text_allowPrint.checked;
		this.wb_text_allowRows.checked = info.wb_text_allowRows.checked;
		this.wb_text_symbol.checked = info.wb_text_symbol.checked;
		this.wb_text_allowEmpty.checked = info.wb_text_allowEmpty.checked;
		this.wb_text_emptyAlert.value = info.wb_text_emptyAlert.value;
		this.wb_text_fillRules.value = info.wb_text_fillRules.value;
		this.wb_rule_min.value = info.wb_rule_min.value;
		this.wb_rule_max.value = info.wb_rule_max.value;
		this.wb_no_emptyAlert.value = info.wb_no_emptyAlert.value
		this.wb_rule_phoneType.value = info.wb_rule_phoneType.value;
		this.wb_no_allowPrint.checked = info.wb_no_allowPrint.checked;
		this.wb_no_allowEmpty.checked = info.wb_no_allowEmpty.checked;
		this.wb_password_allowEmpty.checked = info.wb_password_allowEmpty.checked;
		this.wb_password_allowEdit.checked = info.wb_password_allowEdit.checked;
		this.wb_password_allowPrint.checked = info.wb_password_allowPrint.checked;
		this.wb_password_emptyAlert.value = info.wb_password_emptyAlert.value;
		this.wb_guid_emptyAlert.value = info.wb_guid_emptyAlert.value;
		this.wb_guid_length.value = info.wb_guid_length.value;
		this.wb_guid_allowEmpty.checked = info.wb_guid_allowEmpty.checked;

		this.text_click.value = info.text_click.value
		this.text_change.value = info.text_change.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellTextInfo: [{
				wb_rule_charExp: {
					id: 'wb_rule_charExp',
					value: this.wb_rule_charExp.value,
					type: 'text'
				},
				text_click: {
					id: 'text_click',
					value: this.text_click.value,
					type: 'text'
				},
				text_change: {
					id: 'text_change',
					value: this.text_change.value,
					type: 'text'
				},
				wb_allType: {
					id: 'wb_allType',
					value: this.wb_allType.value,
					type: 'combo'
				},
				wb_text_allowEdit: {
					id: 'wb_text_allowEdit',
					checked: this.wb_text_allowEdit.checked,
					type: 'CheckBox'
				},
				wb_text_allowPrint: {
					id: 'wb_text_allowPrint',
					checked: this.wb_text_allowPrint.checked,
					type: 'CheckBox'
				},
				wb_text_allowRows: {
					id: 'wb_text_allowRows',
					checked: this.wb_text_allowRows.checked,
					type: 'CheckBox'
				},
				wb_text_symbol: {
					id: 'wb_text_symbol',
					checked: this.wb_text_symbol.checked,
					type: 'CheckBox'
				},
				wb_text_allowEmpty: {
					id: 'wb_text_allowEmpty',
					checked: this.wb_text_allowEmpty.checked,
					type: 'CheckBox'
				},
				wb_no_emptyAlert: {
					id: 'wb_no_emptyAlert',
					value: this.wb_no_emptyAlert.value,
					type: 'text'
				},
				wb_no_allowPrint: {
					id: 'wb_no_allowPrint',
					checked: this.wb_no_allowPrint.checked,
					type: 'CheckBox'
				},
				wb_no_allowEmpty: {
					id: 'wb_no_allowEmpty',
					checked: this.wb_no_allowEmpty.checked,
					type: 'CheckBox'
				},
				wb_password_allowEmpty: {
					id: 'wb_password_allowEmpty',
					checked: this.wb_password_allowEmpty.checked,
					type: 'CheckBox'
				},
				wb_password_allowEdit: {
					id: 'wb_password_allowEdit',
					checked: this.wb_password_allowEdit.checked,
					type: 'CheckBox'
				},
				wb_password_allowPrint: {
					id: 'wb_password_allowPrint',
					checked: this.wb_password_allowPrint.checked,
					type: 'CheckBox'
				},
				wb_guid_allowEmpty: {
					id: 'wb_guid_allowEmpty',
					checked: this.wb_guid_allowEmpty.checked,
					type: 'CheckBox'
				},
				wb_text_emptyAlert: {
					id: 'wb_text_emptyAlert',
					value: this.wb_text_emptyAlert.value,
					type: 'text'
				},
				wb_text_fillRules: {
					id: 'wb_text_fillRules',
					value: this.wb_text_fillRules.value,
					type: 'text'
				},
				wb_rule_min: {
					id: 'wb_rule_min',
					value: this.wb_rule_min.value,
					type: 'text'
				},
				wb_rule_max: {
					id: 'wb_rule_max',
					value: this.wb_rule_max.value,
					type: 'text'
				},
				wb_rule_phoneType: {
					id: 'wb_rule_phoneType',
					value: this.wb_rule_phoneType.value,
					type: 'text'
				},
				wb_password_emptyAlert: {
					id: 'wb_password_emptyAlert',
					value: this.wb_password_emptyAlert.value,
					type: 'text'
				},
				wb_guid_emptyAlert: {
					id: 'wb_guid_emptyAlert',
					value: this.wb_guid_emptyAlert.value,
					type: 'text'
				},
				wb_guid_length: {
					id: 'wb_guid_length',
					value: this.wb_guid_length.value,
					type: 'text'
				}
			}]
		}
		return json;
	}
}

function cellComboType() {
	this.xlk_height = {
			id: 'xlk_height',
			value: '250',
			type: 'text'
		},
		this.combo_click = {
			id: 'combo_click',
			value: '',
			type: 'text'
		},
		this.combo_change = {
			id: 'combo_change',
			value: '',
			type: 'text'
		},
		this.xlk_typeSetting = {
			id: "xlk_typeSetting",
			value: "",
			type: "comlist"
		},
		this.xlk_dataSet = {
			id: "xlk_dataSet",
			value: "",
			type: "comlist"
		},
		this.xlk_saveFiled = {
			id: "xlk_saveFiled",
			value: "",
			type: "comlist"
		}, this.xlk_myDisplayFiled = {
			id: "xlk_myDisplayFiled",
			value: "",
			type: "comlist"
		}, this.xlk_dropDownDisplayColumn = {
			id: "xlk_dropDownDisplayColumn",
			value: "",
			type: "text"
		}, this.xlk_filterCondition = {
			id: "xlk_filterCondition",
			value: "",
			type: "text"
		}, this.xlk_allowEdit = {
			id: "xlk_allowEdit",
			checked: true,
			type: "CheckBox"
		},
		this.xlk_allowPrint = {
			id: "xlk_allowPrint",
			checked: true,
			type: "CheckBox"
		},
		// this.xlk_oneClick = {
		// 	id: "xlk_oneClick",
		// 	checked: false,
		// 	type: "CheckBox"
		// },
		// this.xlk_multiple = {
		// 	id: "xlk_multiple",
		// 	checked: false,
		// 	type: "CheckBox"
		// },
		this.xlk_myWidth = {
			id: "xlk_myWidth",
			value: "100",
			type: "text"
		},
		this.xlk_allowEmpty = {
			id: "xlk_allowEmpty",
			checked: true,
			type: "CheckBox"
		},
		this.xlk_emptyAlert = {
			id: "xlk_emptyAlert",
			value: "",
			type: "text"
		},
		this.noValueClear = {
			id: 'noValueClear',
			checked: false,
			type: 'CheckBox'
		},
		this.xlk_ismulti = {
			id: 'xlk_ismulti',
			checked: false,
			type: 'CheckBox'
		}, this.xlk_separator = {
			id: 'xlk_separator',
			value: ',',
			type: 'text'
		}



	//清空属性
	this.clearInfo = function() {
		this.xlk_height.value = '250'
		this.noValueClear.checked = false
		this.combo_click.value = ''
		this.combo_change.value = ''
		this.xlk_allowEmpty.checked = true
		this.xlk_allowEdit.checked = true
		this.xlk_allowPrint.checked = true
		this.xlk_emptyAlert.value = ""
		this.xlk_myWidth.value = "100"
		// this.xlk_multiple.checked = false
		// this.xlk_oneClick.checked = false
		this.xlk_filterCondition.value = ""
		this.xlk_dropDownDisplayColumn.value = ""
		this.xlk_myDisplayFiled.value = ""
		this.xlk_saveFiled.value = ""
		this.xlk_dataSet.value = ""
		this.xlk_typeSetting.value = ""
		this.xlk_ismulti.checked = false
		this.xlk_separator.value = ','
	};

	//设置值
	this.setCellInfo = function(info, cell) {
		debugger
		this.xlk_height.value = info.xlk_height.value;
		this.combo_click.value = info.combo_click.value;
		this.combo_change.value = info.combo_change.value;
		this.noValueClear.checked = info.noValueClear.checked
		this.xlk_allowEmpty.checked = info.xlk_allowEmpty.checked
		this.xlk_allowEdit.checked = info.xlk_allowEdit.checked
		this.xlk_allowPrint.checked = info.xlk_allowPrint.checked
		this.xlk_emptyAlert.value = info.xlk_emptyAlert.value
		this.xlk_myWidth.value = info.xlk_myWidth.value
		// this.xlk_multiple.checked = info.xlk_multiple.checked
		// this.xlk_oneClick.checked = info.xlk_oneClick.checked
		this.xlk_filterCondition.value = info.xlk_filterCondition.value;
		this.xlk_dropDownDisplayColumn.value = info.xlk_dropDownDisplayColumn.value;
		this.xlk_myDisplayFiled.value = info.xlk_myDisplayFiled.value;
		this.xlk_saveFiled.value = info.xlk_saveFiled.value;
		this.xlk_dataSet.value = info.xlk_dataSet.value;
		this.xlk_typeSetting.value = info.xlk_typeSetting.value;
		this.xlk_ismulti.checked = info.xlk_ismulti.checked
		this.xlk_separator.value = info.xlk_separator.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellComboInfo: [{
				xlk_height: {
					id: 'xlk_height',
					value: this.xlk_height.value,
					type: 'text'
				},
				xlk_ismulti: {
					id: 'xlk_ismulti',
					checked: this.xlk_ismulti.checked,
					type: 'CheckBox'
				},
				xlk_separator: {
					id: 'xlk_separator',
					value: this.xlk_separator.value,
					type: 'text'
				},
				noValueClear: {
					id: 'noValueClear',
					checked: this.noValueClear.checked,
					type: 'CheckBox'
				},
				xlk_allowEdit: {
					id: 'xlk_allowEdit',
					checked: this.xlk_allowEdit.checked,
					type: 'CheckBox'
				},
				combo_click: {
					id: 'combo_click',
					value: this.combo_click.value,
					type: 'text'
				},
				combo_change: {
					id: 'combo_change',
					value: this.combo_change.value,
					type: 'text'
				},
				xlk_allowPrint: {
					id: 'xlk_allowPrint',
					checked: this.xlk_allowPrint.checked,
					type: 'CheckBox'
				},
				xlk_allowEmpty: {
					id: 'xlk_allowEmpty',
					checked: this.xlk_allowEmpty.checked,
					type: 'CheckBox'
				},
				xlk_emptyAlert: {
					id: 'xlk_emptyAlert',
					value: this.xlk_emptyAlert.value,
					type: 'text'
				},
				// xlk_multiple: {
				// 	id: 'xlk_multiple',
				// 	checked: this.xlk_multiple.checked,
				// 	type: 'CheckBox'
				// },
				// xlk_oneClick: {
				// 	id: 'xlk_oneClick',
				// 	checked: this.xlk_oneClick.checked,
				// 	type: 'CheckBox'
				// },
				xlk_myWidth: {
					id: 'xlk_myWidth',
					value: this.xlk_myWidth.value,
					type: 'text'
				},
				xlk_typeSetting: {
					id: 'xlk_typeSetting',
					value: this.xlk_typeSetting.value,
					type: 'comlist'
				},
				xlk_dataSet: {
					id: 'xlk_dataSet',
					value: this.xlk_dataSet.value,
					type: 'comlist'
				},
				xlk_saveFiled: {
					id: 'xlk_saveFiled',
					value: this.xlk_saveFiled.value,
					type: 'comlist'
				},
				xlk_myDisplayFiled: {
					id: 'xlk_myDisplayFiled',
					value: this.xlk_myDisplayFiled.value,
					type: 'comlist'
				},
				xlk_dropDownDisplayColumn: {
					id: 'xlk_dropDownDisplayColumn',
					value: this.xlk_dropDownDisplayColumn.value,
					type: 'text'
				},
				xlk_filterCondition: {
					id: 'xlk_filterCondition',
					value: this.xlk_filterCondition.value,
					type: 'text'
				}
			}]
		}
		return json;
	}
}



function flSetting() {
	this.seg_columnsNumber = {
		id: "seg_columnsNumber",
		value: 2,
		type: "text"
	}, this.seg_style = {
		id: "seg_style",
		value: "",
		type: "comlist"
	}, this.seg_dividingLine = {
		id: "seg_dividingLine",
		value: 'N',
		type: "radiostoregroup"
	}, this.seg_columnsMargin = {
		id: "seg_columnsMargin",
		value: 0,
		type: "text"
	}, this.seg_applyTo = {
		id: "seg_applyTo",
		value: "",
		type: "comlist"
	}, this.seg_condition = {
		id: "seg_condition",
		value: "",
		type: "comlist"
	}, this.flId = {
		id: "flId",
		value: "",
		type: "ID"
	}, this.flSRow = {
		id: "flSRow",
		value: "",
		type: "mark"
	}, this.flERow = {
		id: "flERow",
		value: "",
		type: "mark"
	}, this.flSCol = {
		id: "flSCol",
		value: "",
		type: "mark"
	}, this.flECol = {
		id: "flECol",
		value: "",
		type: "mark"
	}



	//清空属性
	this.clearInfo = function() {
		this.seg_columnsNumber.value = 2;
		this.seg_style.value = "";
		this.seg_dividingLine.value = 'N';
		this.seg_columnsMargin.value = 0;
		this.seg_applyTo.value = "";
		this.seg_condition.value = "";
		this.flId.value = "";
		this.flSRow.value = "";
		this.flERow.value = "";
		this.flSCol.value = "";
		this.flECol.value = ""

	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.seg_columnsNumber.value = info.seg_columnsNumber.value
		this.seg_style.value = info.seg_style.value
		this.seg_dividingLine.value = info.seg_dividingLine.value
		this.seg_columnsMargin.value = info.seg_columnsMargin.value
		this.seg_applyTo.value = info.seg_applyTo.value
		this.seg_condition.value = info.seg_condition.value
		this.flId.value = info.flId.value
		this.flSRow.value = info.flSRow.value
		this.flERow.value = info.flERow.value
		this.flSCol.value = info.flSCol.value
		this.flECol.value = info.flECol.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			flInfo: [{
				seg_columnsNumber: {
					id: "seg_columnsNumber",
					value: this.seg_columnsNumber.value,
					type: "text"
				},
				seg_style: {
					id: "seg_style",
					value: this.seg_style.value,
					type: "comlist"
				},
				seg_dividingLine: {
					id: "seg_dividingLine",
					value: this.seg_dividingLine.value,
					type: "radiostoregroup"
				},
				seg_columnsMargin: {
					id: "seg_columnsMargin",
					value: this.seg_columnsMargin.value,
					type: "text"
				},
				seg_applyTo: {
					id: "seg_applyTo",
					value: this.seg_applyTo.value,
					type: "comlist"
				},
				seg_condition: {
					id: "seg_condition",
					value: this.seg_condition.value,
					type: "comlist"
				},
				flId: {
					id: "flId",
					value: this.flId.value,
					type: "ID"
				},
				flSRow: {
					id: "flSRow",
					value: this.flSRow.value,
					type: "mark"
				},
				flERow: {
					id: "flERow",
					value: this.flERow.value,
					type: "mark"
				},
				flSCol: {
					id: "flSCol",
					value: this.flSCol.value,
					type: "mark"
				},
				flECol: {
					id: "flECol",
					value: this.flECol.value,
					type: "mark"
				}
			}]
		}
		return json;
	}
}

function fpSetting() {
	this.seg_fp = {
			id: "seg_fp",
			checked: false,
			type: "CheckBox"
		},
		this.seg_sliceName = {
			id: "seg_sliceName",
			value: "",
			type: "text"
		}, this.seg_emptyRow = {
			id: "seg_emptyRow",
			checked: false,
			type: "CheckBox"
		}, this.seg_emptyCol = {
			id: "seg_emptyCol",
			checked: false,
			type: "CheckBox"
		}, this.fpId = {
			id: "fpId",
			value: "",
			type: "ID"
		}, this.fpSRow = {
			id: "fpSRow",
			value: "",
			type: "mark"
		}, this.fpERow = {
			id: "fpERow",
			value: "",
			type: "mark"
		}, this.fpSCol = {
			id: "fpSCol",
			value: "",
			type: "mark"
		}, this.fpECol = {
			id: "fpECol",
			value: "",
			type: "mark"
		}



	//清空属性
	this.clearInfo = function() {
		this.seg_fp.checked = false;
		this.seg_sliceName.value = 0;
		this.seg_emptyRow.checked = false;
		this.seg_emptyCol.checked = false;
		this.fpId.value = "";
		this.fpSRow.value = "";
		this.fpERow.value = "";
		this.fpSCol.value = "";
		this.fpECol.value = "";


	};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.seg_fp.checked = info.seg_fp.checked
		this.seg_sliceName.value = info.seg_sliceName.value
		this.seg_emptyRow.checked = info.seg_emptyRow.checked
		this.seg_emptyCol.checked = info.seg_emptyCol.checked
		this.fpId.value = info.fpId.value
		this.fpSRow.value = info.fpSRow.value
		this.fpERow.value = info.fpERow.value
		this.fpSCol.value = info.fpSCol.value
		this.fpECol.value = info.fpECol.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			fpInfo: [{
				seg_fp: {
					id: "seg_fp",
					checked: this.seg_fp.checked,
					type: "CheckBox"
				},
				seg_sliceName: {
					id: "seg_sliceName",
					value: this.seg_sliceName.value,
					type: "text"
				},
				seg_emptyRow: {
					id: "seg_emptyRow",
					checked: this.seg_emptyRow.checked,
					type: "CheckBox"
				},
				seg_emptyCol: {
					id: "seg_emptyCol",
					checked: this.seg_emptyCol.checked,
					type: "CheckBox"
				},
				fpId: {
					id: "fpId",
					value: this.fpId.value,
					type: "ID"
				},
				fpSRow: {
					id: "fpSRow",
					value: this.fpSRow.value,
					type: "mark"
				},
				fpERow: {
					id: "fpERow",
					value: this.fpERow.value,
					type: "mark"
				},
				fpSCol: {
					id: "fpSCol",
					value: this.fpSCol.value,
					type: "mark"
				},
				fpECol: {
					id: "fpECol",
					value: this.fpECol.value,
					type: "mark"
				}
			}]
		}
		return json;
	}
}

// 超链接
function leftLink() {
	this.linkParam = {
			id: "linkParam",
			value: "",
			type: "text"
		},
		this.linkEvent = {
			id: "linkEvent",
			value: "",
			type: "text"
		},

		//清空属性
		this.clearInfo = function() {
			this.linkParam.value = ""
			this.linkEvent.value = ""
		};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.linkParam.value = info.linkParam.value
		this.linkEvent.value = info.linkEvent.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellLeftLinkInfo: [{
				linkParam: {
					id: 'linkParam',
					value: this.linkParam.value,
					type: 'text'
				},
				linkEvent: {
					id: 'linkEvent',
					value: this.linkEvent.value,
					type: 'text'
				}
			}]
		}
		return json;
	}
}

// 菜单
function menu() {
	this.menuID = {
			id: "menuID",
			value: "",
			type: "text"
		},
		this.menuParam = {
			id: "menuParam",
			value: "",
			type: "text"
		},
		this.menuSource = {
			id: "menuSource",
			value: "1",
			type: "text"
		},
		this.menuDataset = {
			id: "menuDataset",
			value: "",
			type: "text"
		},
		this.menuEvent = {
			id: "menuEvent",
			value: "",
			type: "text"
		}, this.cmbMenuID = {
			id: "cmbMenuID",
			value: "",
			type: "comlist"
		},
		this.menuChoose = {
			id: "menuChoose",
			checked: false,
			type: "CheckBox"
		},
		this.menuPID = {
			id: "menuPID",
			value: "",
			type: 'comlist'
		},
		this.menuText = {
			id: "menuText",
			value: "",
			type: 'text'
		},
		this.menuName = {
			id: 'menuName',
			value: '',
			type: 'text'
		},

		//清空属性
		this.clearInfo = function() {
			this.menuID.value = "";
			this.menuParam.value = ""
			this.menuSource.value = "1";
			this.menuDataset.value = "";
			this.menuEvent.value = "";
			this.menuChoose.checked = false;
			this.cmbMenuID.value = ""
			this.menuPID = ""
			this.menuText = ""
			this.menuName = ''
		};

	//设置值
	this.setCellInfo = function(info, cell) {
		this.menuID.value = info.menuID.value;
		this.menuParam.value = info.menuParam.value;
		this.menuSource.value = info.menuSource.value;
		this.menuDataset.value = info.menuDataset.value;
		this.menuEvent.value = info.menuEvent.value;
		this.menuChoose.checked = info.menuChoose.checked;
		this.cmbMenuID.value = info.cmbMenuID.value
		this.menuPID = info.menuPID.value
		this.menuName = info.menuName.value
		this.menuText = info.menuText.value
	};

	// 根据id设置相应属性的值
	this.setCellInfos = function(id, value) {
		var c = this.getInfoByID(id);
		if (c) {
			forChecked(c, id, value)
		}
	};

	//通过id获取属性
	this.getInfoByID = function(id) {
		return gridCellInfoObject.prototype.getInfoByID_ext(id, this)
	}

	//转换JSON串
	this.cellInfoToJson = function() {
		json = {
			cellMenuInfo: [{
				menuID: {
					id: 'menuID',
					value: this.menuID.value,
					type: 'text'
				},
				menuParam: {
					id: 'menuParam',
					value: this.menuParam.value,
					type: 'text'
				},
				menuSource: {
					id: 'menuSource',
					value: this.menuSource.value,
					type: 'text'
				},
				menuDataset: {
					id: 'menuDataset',
					value: this.menuDataset.value,
					type: 'text'
				},
				menuEvent: {
					id: 'menuEvent',
					value: this.menuEvent.value,
					type: 'text'
				},
				cmbMenuID: {
					id: 'cmbMenuID',
					value: this.cmbMenuID.value,
					type: 'comlist'
				},
				menuChoose: {
					id: 'menuChoose',
					checked: this.menuChoose.checked,
					type: 'CheckBox'
				},
				menuPID: {
					id: 'menuPID',
					value: this.menuPID.value,
					type: 'comlist'
				},
				menuText: {
					id: 'menuText',
					value: this.menuText.value,
					type: 'text'
				},
				menuName: {
					id: 'menuName',
					value: this.menuName.value,
					type: 'text'
				}
			}]
		}
		return json;
	}
}