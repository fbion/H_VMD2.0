/******************************************************************
 ** 文件名: DataInput.js
 ** Copyright (c) 2017-2019 汉威公司技术研究院
 ** 创建人:马飞
 ** 日 期:2019-08-26
 ** 修改人:成兵
 ** 日 期:2018-08-26 
 ** 描 述:通用采集录入设计模式创建及设计时组件构建
 ** 版 本:1.0
 ******************************************************************/
Ext.define('ide.ext.DataInput', {
	constructor: function() {},
	initBindSourceProp: function(rpt) {
		var dts = this.getDataTables();
		var celltypes = rpt.main.celltypes;
		var validDts = [];

		for (var key in celltypes) {
			var info = celltypes[key];
			if (info.bindsource) {
				var tablename = info.bindsource.tablename;
				if (tablename && (validDts.indexOf(tablename) == -1)) validDts.push(tablename);
			}
		}

		if (!rpt.main.datasource.tables) rpt.main.datasource.tables = {};
		Ext.each(validDts, function(name) {
			rpt.main.datasource.tables[name] = {
				factname: name,
				name: name
			}
		})
	},
	setType: function(info, report, styleInfo, colset) {

		//保存字段类型和事件
		var setCellTypeAndEvent = function(cellinfo, settings, events) {
			cellinfo.fillcelltype = styleInfo.getCellTypeID(settings).toString();
			cellinfo.event = styleInfo.getEventsID(events).toString();
		}
		var kk = 0;
		//单元格类型属性   
		for (var i = 0; i < info.settings.fields.length; i++) {

			var isHide = info.settings.fields[i] && info.settings.fields[i].fieldsConfig && info.settings.fields[i].fieldsConfig.settings.colHide;
			if (isHide)
				continue;
			var sets = info.settings.fields[i].fieldsConfig;
			if (sets) {
				var headerCellInfo ;
					var cellInfo;
				if (colset) {//有列时为自由格式处理，根据kk来计算第几列，取第几列的字段信息。所以用kk kk只有在不隐藏的情况下才会递增
					//var headerCellInfo = report.main.body.sections[0].header[Math.floor(kk / colset)].cells[(kk * 3 + 1) % (3 * colset)];				
					 cellInfo = report.main.body.sections[0].data[Math.floor(kk / colset)].cells[(kk * 3 + 1) % (3 * colset)];
				} else {//网格列隐藏是输出宽度为0，所用用i
					 cellInfo = report.main.body.sections[0].data[0].cells[i];
					 headerCellInfo = report.main.body.sections[0].header[0].cells[i];
				}
				kk++
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
								if (cellInfo) setCellTypeAndEvent(cellInfo, text, text_event)
							} catch (ex) {}

							break;
						} else if (sets.settings.text_typeSelect == 'no') {
							var order = {};
							order.type = "order";
							order.isallownull = sets.settings.text_no_allowEmpty
							order.emptydisplay = sets.settings.text_no_emptyAlert
							if (cellInfo) setCellTypeAndEvent(cellInfo, order, sets.events)
							break;
						} else if (sets.settings.text_typeSelect == 'guid') {
							var guid = {};
							guid.type = "guid";
							guid.isallownull = sets.settings.text_guid_alloewEmpty
							guid.emptydisplay = sets.settings.text_guid_emptyAlert
							guid.length = sets.settings.text_guid_length
							if (cellInfo) setCellTypeAndEvent(cellInfo, guid, sets.events)
							break;
						} else if (sets.settings.text_typeSelect == 'password') {
							var passWord = {};
							passWord.type = "PassWord";
							passWord.isenableedit = sets.settings.text_password_allowEdit
							passWord.isallownull = sets.settings.text_password_allowEmpty
							passWord.emptydisplay = sets.settings.text_password_emptyAlert
							if (cellInfo) setCellTypeAndEvent(cellInfo, passWord, sets.events)
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
						checkBox.bindsource.tablename = (sets.datas&&sets.datas.dataSet)||sets.settings.dataSet
						checkBox.bindsource.valuecolumn = (sets.datas&&sets.datas.saveField)||sets.settings.saveField
						checkBox.bindsource.showcolumn = (sets.datas&&sets.datas.displayField)||sets.settings.displayField
						checkBox.bindsource.condition = (sets.datas&&sets.datas.filter)||sets.settings.filter
						if (cellInfo) setCellTypeAndEvent(cellInfo, checkBox, sets.events)
						var headerCheckBox={};				
						if(headerCellInfo)
						{
							headerCheckBox.type = "CheckBoxGroup";
							headerCheckBox.displayLabel = headerCellInfo.data	
							headerCheckBox.separator = ""
							headerCheckBox.isenableedit = true
							headerCheckBox.isallselect = false
							headerCheckBox.isother = false
							headerCheckBox.multigroup =false
							headerCheckBox.autolayout =false
							headerCheckBox.colcount = "";
							headerCheckBox.linespace = "1"
							headerCheckBox.isallownull = false
							headerCheckBox.emptydisplay =""	
							headerCheckBox.bindsource = {};
							headerCheckBox.bindsource.tablename = ""
							headerCheckBox.bindsource.valuecolumn = ""
							headerCheckBox.bindsource.showcolumn = ""
							headerCheckBox.bindsource.condition =""
							setCellTypeAndEvent(headerCellInfo, headerCheckBox, {change: sets.events.allChange})
						}							
						break;
					case "richText":
						var richEdit = {};
						richEdit.type = "RichEdit";
						richEdit.firstindent = sets.settings.segmentPadding
						richEdit.isenableedit = sets.settings.allowEdit
						richEdit.isallownull = sets.settings.allowEmpty
						richEdit.emptydisplay = sets.settings.emptyAlert
						if (cellInfo) setCellTypeAndEvent(cellInfo, richEdit, sets.events)
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
						if (cellInfo) setCellTypeAndEvent(cellInfo, date, sets.events)
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
						radioGroup.bindsource.tablename = (sets.datas&&sets.datas.dataSet)||sets.settings.dataSet
						radioGroup.bindsource.valuecolumn = (sets.datas&&sets.datas.saveField)||sets.settings.saveField
						radioGroup.bindsource.showcolumn = (sets.datas&&sets.datas.displayField)||sets.settings.displayField
						// radioGroup.bindsource.condition = sets.settings.
						if (cellInfo) setCellTypeAndEvent(cellInfo, radioGroup, sets.events)
						break; //单选按钮
						// case "comlist":
					case "comboGrid":

						var engToNum = function(value) {
							if (value) {
								var num = '';
								if (value.length == 1) {
									num = value.charCodeAt() - 64;
								}
								if (value.length == 2) {
									var p1 = value.charAt(0);
									var p2 = value.charAt(1);
									var count = p1.charCodeAt() - 64;
									num = (count * 26) + p2.charCodeAt() - 64;
								}
								return num;
							}
						}
						var numToEng = function(colIndex) {
							var num = colIndex + 1;
							var stringName = "";
							if (num > 0) {
								if (num >= 1 && num <= 26) {
									stringName = String.fromCharCode(64 + parseInt(num));
								} else {
									while (num > 26) {
										var count = parseInt(num / 26);
										var remainder = num % 26;
										if (remainder == 0) {
											remainder = 26;
											count--;
											stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
										} else {
											stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
										}
										num = count;
									}
									stringName = String.fromCharCode(64 + parseInt(num)) + stringName;
								}
							}
							return stringName;
						}

						var ddg = {};
						ddg.type = "vmdgrid"
						ddg.isenableedit = sets.settings.allowEdit
						ddg.width = sets.settings.grid_width
						ddg.isallownull = sets.settings.allowEmpty
						ddg.emptydisplay = sets.settings.emptyAlert
						ddg.ismulti = sets.settings.multi
						ddg.height = sets.settings.gridHeight
						ddg.bindsource = {};
						ddg.bindsource.tablename = (sets.datas&&sets.datas.dataSet)||sets.settings.dataSet
						ddg.bindsource.valuecolumn = (sets.datas&&sets.datas.saveField)||sets.settings.saveField
						ddg.bindsource.showcolumn = (sets.datas&&sets.datas.displayField)||sets.settings.displayField
						// 
						//转化为单元格
						var selected = info.settings.fields[i].fieldsConfig.selected ||info.settings.fields[i].fieldsConfig.settings.selected || [];
						var hideNum = 0;
						for (var t = 0; t < info.settings.fields.length; t++) {
							if (!info.settings.fields[t].fieldsConfig.settings.colHide) {
								for (var n = 0; n < selected.length; n++) {
									selected[n].colname = selected[n].name;
									selected[n].showtext = selected[n].cname;

									if (selected[n].cellid == info.settings.fields[t].dictionary.name) {

										if (colset) {
											var row = Math.floor((t+1 - hideNum) / colset) + 1;
											var col = (t+1 - hideNum) % colset;
											selected[n].cellid = (numToEng(col * colset + 1) + row).toString()
										} else {
											selected[n].cellid = (numToEng(t+1 - hideNum) + 2).toString()
										}

									}
								}
							} else {
								hideNum++;
							}
						}
						ddg.bindsource.multicolumns = selected;
						if (cellInfo) setCellTypeAndEvent(cellInfo, ddg, sets.events)
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
						ddt.bindsource.tablename = (sets.datas&&sets.datas.dataSet)||sets.settings.dataSet
						ddt.bindsource.valuecolumn = (sets.datas&&sets.datas.valueField)||sets.settings.valueField
						ddt.bindsource.showcolumn = (sets.datas&&sets.datas.displayField)||sets.settings.displayField
						ddt.bindsource.parentcolumn = (sets.datas&&sets.datas.parentField)||sets.settings.parentField
						ddt.bindsource.nodecolumn = (sets.datas&&sets.datas.leafValue)||sets.settings.leafValue
						ddt.bindsource.rootvalue =(sets.datas&& sets.datas.rootValue)||sets.settings.rootValue
						ddt.bindsource.roottext = (sets.datas&&sets.datas.rootText)||sets.settings.rootText
						if (cellInfo) setCellTypeAndEvent(cellInfo, ddt, sets.events)
						break;
					case "number":
						var numberInfo = {};
						numberInfo.type = "Number";
						numberInfo.isenableedit = sets.settings.number_allowEdit;
						numberInfo.isallownull = sets.settings.number_allowEmpty;
						numberInfo.isdecimal = sets.settings.number_allowDecimal;
						numberInfo.isnegative = sets.settings.number_allowNegetive;
						numberInfo.nullShowZero = sets.settings.number_nullShowZero;
						numberInfo.emptydisplay = sets.settings.number_emptyAlert;
						numberInfo.islimit = sets.settings.number_limit;
						if(numberInfo.islimit&&sets.settings.number_limitValue>=0)
							numberInfo.decimalnumbers = sets.settings.number_limitValue;
						else
							numberInfo.decimalnumbers = sets.settings.number_decimalLength;
						numberInfo.maxvalue = sets.settings.number_maxValue;
						numberInfo.minvalue = sets.settings.number_minValue;

						var number_event = {
							click: sets.events.number_click,
							change: sets.events.number_change
						}
						if (cellInfo) setCellTypeAndEvent(cellInfo, numberInfo, number_event)
						break;
					case "combo":
						var comboBox = {};
						comboBox.type = "Combox";
						comboBox.isenableedit = sets.settings.allowEdit;
						comboBox.ismulti = sets.settings.allowMulti;						
						comboBox.separator = sets.settings.splitStr||',';
						comboBox.width = sets.settings.combo_width;
						comboBox.height = sets.settings.combo_height;
						comboBox.isallownull = sets.settings.allowEmpty;
						comboBox.emptydisplay = sets.settings.emptyAlert;
						comboBox.noValueClear = sets.settings.noValueClear;
						comboBox.bindsource = {};
						comboBox.bindsource.tablename = (sets.datas&&sets.datas.dataSet)||sets.settings.dataSet;
						comboBox.bindsource.valuecolumn = (sets.datas&&sets.datas.saveField)||sets.settings.saveField;
						comboBox.bindsource.showcolumn =(sets.datas&& sets.datas.displayField)||sets.settings.displayField;
						comboBox.bindsource.condition = (sets.datas&&sets.datas.filter)||sets.settings.filter;
						if (cellInfo) setCellTypeAndEvent(cellInfo, comboBox, sets.events)
						break;
				}
			}
		}
		// return cellInfo;
	},
	/*
	 *desc 返回网格格式json信息
	 *@param {object}- info 保存方法得到的数据信息
	 *@param {string}- sname 数据集名称
	 *return {object} 返回json对象
	 */
	saveRptInfo: function(info, sName) {
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
		//必要死值
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
			},
			3: {
				autoenter: "0",
				escapelabel: 0,
				halign: "center",
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
			report.main.body.columns.width.push(
				(info.settings.fields[i].fieldsConfig && info.settings.fields[i].fieldsConfig.settings.colHide) ?
				0 : ((info.settings.fields[i].fieldsConfig && info.settings.fields[i].fieldsConfig.settings.colWidth) ?
					info.settings.fields[i].fieldsConfig.settings.colWidth : 100))
		}
		report.main.body.colNum = maxCol;
		report.main.body.rowNum = 2;
		report.main.body.fixedrow = 1;
		report.main.body.fixedcol = info.settings.fc;

		report.main.body.sections = [];
		var s = this.getSectionRowInfo(0, parseInt(maxRow), 0, parseInt(maxCol), styleInfo, info, sName);
		report.main.body.sections.push(s);

		///////////////////
		this.setType(info, report, styleInfo)

		report.main.celltypes = styleInfo.cellTypeInfos;
		report.main.events = styleInfo.eventInfo;
		//构造grid的bindSource
		this.initBindSourceProp(report);
		return report;
	},
	/*
	 *desc 返回自由格式json信息
	 *@param {object}- info 保存方法得到的数据信息
	 *@param {string}- sname 数据集名称
	 *return {object} 返回json对象
	 */
	saveFormInfo: function(info, sName) {
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
			},
			3: {
				autoenter: "0",
				escapelabel: 0,
				halign: "center",
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
		var fieldNo = 0;
		if (info.settings.fields.length > 0) {
			for (var n = 0; n < info.settings.fields.length; n++) {
				var isHide = info.settings.fields[n] && info.settings.fields[n].fieldsConfig && info.settings.fields[n].fieldsConfig.settings.colHide;
				var text = info.settings.fields[n] && info.settings.fields[n].dictionary.cname + '：'
				var unit = info.settings.fields[n].dictionary && info.settings.fields[n].dictionary.unit
				if (!isHide) {
					fieldNo++;
					var no = fieldNo % colset;
					var repeat = Math.floor(fieldNo / colset);
					if (fieldNo <= colset) {
						report.main.body.columns.width.push(text.length * 13)
						report.main.body.columns.width.push('*')
						report.main.body.columns.width.push(unit ? (unit.length + 1) * 13 : 13)
					} else {
						if (no > 0) {
							no--;
						} else {
							no = colset - 1;
						}
						if ((text.length + 1) * 13 > report.main.body.columns.width[no * 3]) {
							report.main.body.columns.width[no * 3] = (text.length + 1) * 13
						}

						if (
							unit && ((unit.length + 1) * 13 > report.main.body.columns.width[no * 3 + 2])
						) {
							report.main.body.columns.width[no * 3 + 2] = (unit.length + 1) * 13
						}
					}
				}
			}
		}

		report.main.body.colNum = maxCol * 3;
		report.main.body.rowNum = maxRow;

		report.main.body.sections = [];
		var s = this.getSectionRowInfoform(0, parseInt(maxRow), 0, parseInt(maxCol), styleInfo, info, sName, colset);
		report.main.body.sections.push(s)

		//////
		this.setType(info, report, styleInfo, colset)

		report.main.celltypes = styleInfo.cellTypeInfos;
		report.main.events = styleInfo.eventInfo;

		//构建填报需要的bindSource
		this.initBindSourceProp(report);

		return report;
	},
	/*
	 *desc 组织json格式
	 *@param {number}- startrow 起始行
	 *@param {number}- endrow 结束行
	 *@param {number}- startcol 起始列
	 *@param {number}- endcol 结束列
	 *@param {object}- report 得到的保存信息
	 *@param {object}- info 保存方法得到的数据信息
	 *@param {string}- sName 数据集名称
	 *return {object} 返回json对象
	 */
	getSectionRowInfo: function(startrow, endrow, startcol, endcol, report, info, sName) {
		var sections = {};
		sections.header = [];
		sections.data = [];
		sections.title = [];
		sections.startrow = 1;
		sections.startcol = 1;
		sections.endcol = endcol;
		sections.endrow = 2;
		sections.fixedcol = 0;

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
					var unit = info.settings.fields[n].dictionary.unit ? ("(" + info.settings.fields[n].dictionary.unit + ")") : '';
					cells.push(
						this.cell('g0', (info.settings.fields[n].dictionary.cname == '') ? info.settings.fields[n].dictionary.name + "<br>" + unit : info.settings.fields[n].dictionary.cname + "<br>" + unit, info.settings.fields[n].dictionary, opts, null, info.settings.fields[n])
					)
				}
				if (i == 1) {
					opts.type2 = 'data';
					cells.push(
						this.cell('g1', sName + '.' + info.settings.fields[n].dictionary.name, info.settings.fields[n].dictionary, opts, null, info.settings.fields[n])
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
	},
	/*
	 *desc 组织json格式
	 *@param {number}- startrow 起始行
	 *@param {number}- endrow 结束行
	 *@param {number}- startcol 起始列
	 *@param {number}- endcol 结束列
	 *@param {object}- report 得到的保存信息
	 *@param {object}- info 保存方法得到的数据信息
	 *@param {string}- sName 数据集名称
	 *@param {number}- colset 设置列数
	 *return {object} 返回json对象
	 */
	getSectionRowInfoform: function(startrow, endrow, startcol, endcol, report, info, sName, colset) {
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

					cells.push(this.cell('f0', (info.settings.fields[k].dictionary.cname == '') ? info.settings.fields[k].dictionary.name : info.settings.fields[k].dictionary.cname,
						info.settings.fields[k].dictionary, opts,info.settings.titleSite,info.settings.fields[k]))
					cells.push(this.cell('f1', sName + '.' + info.settings.fields[k].dictionary.name, info.settings.fields[k].dictionary, opts,info.settings.titleSite,info.settings.fields[k]))
					cells.push(this.cell('f2', '', info.settings.fields[k].dictionary, opts,info.settings.titleSite,info.settings.fields[k]))
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
	},
	/*
	 *desc 返回单元格信息（这里的单元格是组织成的自由格式的
	 *@param {string}- t 标识，网格g0-表头,g1-数据；自由格式f0-标题，f1-类型,f2-单位
	 *@param {string}- v name 名称
	 *@param {object}-d 数据字典对象
	 *@param {object}-opts 配置type：grid||form，type2:分为网格表头和数据
	 *@param {object}-fopts 字段的配置信息
	 *return {object} 返回json对象
	 */
	cell: function(t, v, d, opts,titleSite, fopts) {
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
			json.align = '3'
		} else if (t == 'g1') {
			json.datavalue = "=" + v;
			if(fopts && fopts.fieldsConfig && fopts.fieldsConfig.settings && fopts.fieldsConfig.settings.dicFirst === false) {
				var cf = fopts.fieldsConfig.settings
				if(d && d.type == 'NUMBER') json.align = cf.txtAlign || '2';
				else if(d && d.type == 'DATE') json.align = cf.txtAlign || '3'
				else json.align = cf.txtAlign || '1'
			} else {
				if(d && d.type == 'NUMBER') json.align = '2';
				if(d && d.type == 'DATE') json.align = '3'
			}
		} else if (t == 'f0') {
			json.data = v + ':';			
			json.align = titleSite||'2'
		} else if (t == 'f1') {
			if (d) {
				json.datavalue = '=' + v;				
			}
		} else if (t == 'f2') {

			json.data = d.unit || ""
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
	},
	/*
	 *desc 添加事件监听
	 *@param {object}- activeCmp 当前活动组件
	 *@param {object}- saveInfo 保存信息
	 */
	saveEvents: function(activeCmp, saveInfo) {
		var gridEvents = saveInfo.gridJson.main.events;
		var fromEvents = saveInfo.formJson.main.events;
		var operationEvents = {};
		var navigationEvents = {};
		operationEvents.addEvent = saveInfo.operation.addEvent
		operationEvents.delEvent = saveInfo.operation.delEvent
		operationEvents.imEvent = saveInfo.operation.imEvent
		operationEvents.saveEvent = saveInfo.operation.saveEvent

		navigationEvents.firstEvent = saveInfo.navigation.firstEvent;
		navigationEvents.lastEvent = saveInfo.navigation.lastEvent;
		navigationEvents.nextEvent = saveInfo.navigation.nextEvent;
		navigationEvents.prevEvent = saveInfo.navigation.prevEvent;

		var addGridFormEvent = function(events) {
			for (var key in events) {
				var list = events[key];
				if (typeof(list) != 'object') {
					var _name = events[key]
					_name && xds.vmd.addEventForDesignerCmp(activeCmp, _name, _name)

				} else {
					for (var name in list) {
						var _name = list[name];
						_name && xds.vmd.addEventForDesignerCmp(activeCmp, _name, _name)
					}
				}
			}
		}
		// op.push(operationEvents)
		// na.push(navigationEvents)
		//网格
		addGridFormEvent(gridEvents);
		//自由格式
		addGridFormEvent(fromEvents);
		addGridFormEvent(operationEvents)
		addGridFormEvent(navigationEvents)
	},
	/*
	 *desc 获取设计模式下的数据集名称
	 *@retrun {object}- names 设计模式数据集名称集合
	 */
	getDataTables: function() {
		var names = [];
		var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
		if (typeof storeRoot != 'undefined') {
			storeRoot.eachChild(function(cmp) {
				names.push(cmp.id);
			});
		}
		return names;
	}
})

Ext.define('ide.ext.DataInputUtils', {
	constructor: function(page, type) {
		this.page = page; //属性面板对象
		this.type = type; //类型，自由还是网格
	},
	/*
	 *desc 字段选择按钮
	 */
	clickFieldsSelect: function() {
		var sValue = this.page.rootScope.controller.comp.layout.dataSet
		//首先判断是否选择了数据集
		if (sValue == '') {
			vmd.tip('请首先选择数据集', 'error')
		} else {
			this.openSettingWin(this.page.controller);
		}
	},
	/*
	 *desc 打开字段选择窗口
	 */
	openSettingWin: function(controller, flag) {
		var me = this;
		var page = this.page;
		var dbconfigs = JSON.parse(xds.vmd.getStoreByDsName(page.rootScope.controller.comp.layout.dataSet, true).component.getConfig("storeConfig").storeConfig)
		if (dbconfigs) {
			// 创建一个新窗口（有url指向） 
			window.newWin = new vmd.window({
				url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwk9PgTMpg/hwp5jFKDnC.html',
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

			newWin.inputdbconfig = dbconfigs
			newWin.show(); //窗口显示
			newWin.getSelectedFields = function(selected) {
				var newSelectFields = [];
				var oldfields = page.controller.settings.fields;
				var ischeckfields = function(name) {
					var flag = false;
					Ext.each(oldfields, function(info) {
						if (info.dictionary.name == name) {
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
					var cmp = new vmd.ux.gridType.settings.fieldSettings();
					cmp.dictionary = selected[i];
					var type = cmp.dictionary.type;
					//根据数据字典类型设置默认值

					if (type == 'DATE') {

						cmp.fieldsConfig = {
							events: {
								change: "",
								click: "",
								dblclick: ""
							},
							settings: {
								allowEdit: true,
								allowEmpty: true,
								colHide: false,
								colWidth: "100",
								customFormat: false,
								customFormats: "",
								defaultNow: false,
								emptyAlert: "",
								format: ""
							},
							type: "date"
						}
						cmp.fieldsConfig.settings.colWidth - '80';

						newSelectFields.push(cmp);
					} else if (type == 'NUMBER') {
						cmp.fieldsConfig = {
							events: {
								number_change: "",
								number_click: ""
							},
							settings: {
								colHide: false,
								colWidth: "100",
								number_allowDecimal: true,
								number_allowEdit: true,
								number_allowEmpty: true,
								number_allowNegetive: false,
								number_nullShowZero: false,
								number_decimalLength: cmp.dictionary.precision,
								number_emptyAlert: "",
								number_limit: false,
								number_limitValue: "",
								number_max: false,
								number_maxValue: "",
								number_min: false,
								number_minValue: ""
							},
							type: "number"
						}
						var width = cmp.fieldsConfig.settings.colWidth;

						// (cmp.dictionary.length > cmp.dictionary.cname.length) ? cmp.fieldsConfig.settings.colWidth = cmp.dictionary.length * 8: cmp.fieldsConfig.settings.colWidth = cmp.dictionary.cname.length * 8;
						cmp.fieldsConfig.settings.colWidth = (cmp.dictionary.length * 8 > cmp.dictionary.cname.length * 13 ? cmp.dictionary.length * 8 : cmp.dictionary.cname.length * 13) > 250 ? 250 : (cmp.dictionary.length * 8 > cmp.dictionary.cname.length * 13 ? cmp.dictionary.length * 8 : cmp.dictionary.cname.length * 13);
						cmp.fieldsConfig.settings.colWidth = (parseInt(cmp.fieldsConfig.settings.colWidth) + 16).toString();
						newSelectFields.push(cmp);
					} else {
						cmp.fieldsConfig = {
							events: {
								text_change: "",
								text_click: ""
							},
							settings: {
								colHide: false,
								colWidth: "100",
								text_common_allowEdit: true,
								text_common_allowEmpty: true,
								text_common_emptyAlert: "",
								text_common_fillRules: "None",
								text_common_mutilRow: false,
								text_common_phoneType: "",
								text_common_symbol: false,
								text_guid_allowEmpty: true,
								text_guid_emptyAlert: "",
								text_guid_length: "",
								text_no_allowEmpty: true,
								text_no_emptyAlert: "",
								text_password_allowEdit: true,
								text_password_allowEmpty: true,
								text_password_emptyAlert: true,
								text_rule_charExp: "",
								text_rule_maxLength: "0",
								text_rule_minLength: "0",
								text_typeSelect: "common"
							},
							type: "text"
						}
						// (cmp.dictionary.length > cmp.dictionary.cname.length) ? cmp.fieldsConfig.settings.colWidth = cmp.dictionary.length * 13 : cmp.fieldsConfig.settings.colWidth = cmp.dictionary.cname.length * 13;
						cmp.fieldsConfig.settings.colWidth = (cmp.dictionary.length * 13 > cmp.dictionary.cname.length * 13 ? cmp.dictionary.length * 13 : cmp.dictionary.cname.length * 13) > 250 ? "250" : (cmp.dictionary.length * 13 > cmp.dictionary.cname.length * 13 ? cmp.dictionary.length * 13 : cmp.dictionary.cname.length * 13);
						cmp.fieldsConfig.settings.colWidth = (parseInt(cmp.fieldsConfig.settings.colWidth) + 16).toString();
						newSelectFields.push(cmp);
					}

				}
				for (var i = 0; i < newSelectFields.length; i++) {
					page.controller.settings.fields.push(newSelectFields[i]);
				}
				page.selected = [];
				for (var i = 0; i < page.controller.settings.fields.length; i++) {
					page.selected.push(page.controller.settings.fields[i].dictionary)
				}
				page.selectedField.loadData(page.selected)

				//设置数据库名称记录
				page.controller.settings.storeName = page.rootScope.controller.comp.layout.dataSet;
				////////////////////////////////////////////////////////////
				//修改form表单设置

				if (me.type == 'grid' && page.rootScope.controller.comp.form.settings.fields.length == 0) {
					me.copyToAnother()
				} else if (me.type == 'form' && page.rootScope.controller.comp.grid.settings.fields.length == 0) {
					me.copyToAnother()
				}

				page.fireEvent('settingChangeEvents')
				newWin.close()
			}
		}
	},
	celldbclick: function() {

		var page = this.page;
		var backpack = JSON.stringify(page.controller.serialize());
		// 创建一个新窗口（有url指向） 
		window.settingWin = new vmd.window({
			url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwk9PgTMpg/hwbc029294.html',
			title: '字段类型设置',
			enableLoading: true, //启用进度加载
			width: 540,
			height: 640,
			cache: false,
			auto: false, //auto为true 自动适应窗口，配合offset使用
			params: {
				inst: page.controller,
				selNum: page.MyGrid.getSelectionModel().selections.items[0].json.name,
				type: this.type
			} //url中追加的编码的参数，json格式 
		})
		settingWin.show(); //窗口显示
		settingWin.setBack = function(controller, flag) {
			debugger
			flag ? page.controller = controller : page.controller.setValue(JSON.parse(backpack));
			page.fireEvent('settingChangeEvents')
			settingWin.close()
		}
		settingWin.toOther = function(info) {
			var inst = page.rootScope.controller.comp.form.settings.fields;
			for (var i = 0; i < inst.length; i++) {
				if (inst[i].dictionary.name == info.dictionary.name) {
					inst[i].fieldsConfig.settings = info.fieldsConfig;
				}
			}
			page.fireEvent('settingChangeEvents')
		}
	},
	moveUp: function() {
		//上移
		var page = this.page;
		var selecModel = page.MyGrid.getSelectionModel()
		var group = page.MyGrid.getSelectionModel().selections.items;
		if (group.length == 0) return;
		page.selected = Ext.pluck(page.MyGrid.store.data.items, 'json')
		var name = group[0].data.mixName;
		for (var i = 0; i < page.selected.length; i++) {
			if (page.selected[i].mixName == name && i != 0) {
				var temp = page.selected[i - 1];
				page.selected[i - 1] = page.selected[i];
				page.selected[i] = temp;
				page.selectedField.loadData(page.selected)
				selecModel.selectRow(i - 1)
				var list = page.controller.settings.fields;
				var temp = list[i - 1]
				list[i - 1] = list[i]
				list[i] = temp;
				break;
			}
		}
		page.fireEvent('settingChangeEvents')
	},
	moveDown: function() {
		//下移
		var page = this.page;
		var selecModel = page.MyGrid.getSelectionModel()
		var group = page.MyGrid.getSelectionModel().selections.items;
		if (group.length == 0) return;
		page.selected = Ext.pluck(page.MyGrid.store.data.items, 'json')
		var name = group[0].data.mixName;
		var list = page.controller.settings.fields;
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
	},
	copyToAnother: function() {
		var me=this
		/*if(!vmd.ux.TypeSettings){
			Ext.require(vmd.getCmpDeps(["vmd.ux.TypeSettings$1.0$TypeSettings"]),function(){
			me._copyToAnother()
		})
	   }else me._copyToAnother()*/
	   me._copyToAnother()
	},
	_copyToAnother: function() {
		//应用到自由格式
		debugger
		var page = this.page
		if (this.type == 'grid') {
			var temp = page.rootScope.controller.comp.grid.settings.fields

			//清空设置
			page.rootScope.controller.comp.form.settings.fields = [];
			for (var i = 0; i < temp.length; i++) {
				var cmp = new vmd.ux.formType.settings.fieldSettings();
				cmp.dictionary = Ext.clone(temp[i].dictionary);

				var ff = temp[i].fieldsConfig;
				if (!ff.scope) {
					cmp.fieldsConfig = Ext.clone(ff);
				} else {
					var obj = {};
					obj.settings = {};
					obj.events = {};
					obj.type = ff.type;
					for (var key in ff) {
						if (key == 'type') {
							obj.type = ff[key];
						} else if (key.indexOf('click') > -1 || key.indexOf('change') > -1) {
							obj.events[key] = ''
						} else {
							if (key != 'scope') {
								obj.settings[key] = ff[key]
							}
						}
					}
					cmp.fieldsConfig = obj;
				}
				page.rootScope.controller.comp.form.settings.fields.push(cmp);
			}
			var temp = [];
			for (var i = 0; i < page.rootScope.controller.comp.form.settings.fields.length; i++) {
				temp.push(page.rootScope.controller.comp.form.settings.fields[i].dictionary)
			}
		} else {
			var temp = page.rootScope.controller.comp.form.settings.fields
			//清空设置
			page.rootScope.controller.comp.grid.settings.fields = [];
			for (var i = 0; i < temp.length; i++) {
				var cmp = new vmd.ux.gridType.settings.fieldSettings();
				cmp.dictionary = Ext.clone(temp[i].dictionary);

				var ff = temp[i].fieldsConfig;
				if (!ff.scope) {
					cmp.fieldsConfig = Ext.clone(ff);
				} else {
					var obj = {};
					obj.settings = {};
					obj.events = {};
					obj.type = ff.type;
					for (var key in ff) {
						if (key == 'type') {
							obj.type = ff[key];
						} else if (key.indexOf('click') > -1 || key.indexOf('change') > -1) {
							obj.events[key] = ''
						} else {
							if (key != 'scope') {
								obj.settings[key] = ff[key]
							}
						}
					}
					cmp.fieldsConfig = obj;
				}
				page.rootScope.controller.comp.grid.settings.fields.push(cmp);
			}
			var temp = [];
			for (var i = 0; i < page.rootScope.controller.comp.grid.settings.fields.length; i++) {
				temp.push(page.rootScope.controller.comp.grid.settings.fields[i].dictionary)
			}
		}
		page.selectedField.loadData(temp)
		page.fireEvent('settingChangeEvents')
	},

	delete: function() {
		var page = this.page;
		var f = page.controller.settings.fields;
		var group = page.MyGrid.getSelectionModel().selections.items;
		if (group) {
			for (var i = 0; i < group.length; i++) {
				for (var n = f.length - 1; n > -1; n--) {
					if (group[i].json.name == page.controller.settings.fields[n].dictionary.name) {
						f.splice(n, 1);
						break;
					}
				}
			}
			page.selected = [];
			for (var i = 0; i < f.length; i++) {
				page.selected.push(f[i].dictionary)
			}
			page.selectedField.loadData(page.selected)
			page.fireEvent('settingChangeEvents')
		}
	}
})

xds.vmdDataInput = Ext.extend(xds.Component, {
	cid: "vmdDataInput",
	category: "通用录入",
	defaultName: "&lt;datainput&gt;",
	text: "datainput(采集录入)",
	dtype: "vmd.design.datainput",
	//这里的xtype主要是为了代码显示的类型，本身无任何作用
	xtype: "vmd.datainput",
	xcls: "vmd.comp.DataInput",
	iconCls: "icon-datainput",
	//控制是否可以拖拽
	isResizable: function(a, b) {
		//a为上下左右的位置方向
		return true;
	},
	naming: "hwDataInput",
	isContainer: false,
	isPropPanel: true, //是否是属性面板
	requireJs: [
		"js/Datainput.js", "lib/express/complete.js", "report/js/hwreport_core.js"
	], //"lib/dhtmlx/sources/dhtmlxGrid/codebase/dhtmlxgrid.js",
	//是否显示右下角的组件说明
	//filmCls: "el-film-nolabel",
	//默认属性设置
	defaultConfig: {
		height: 600,
		width: 800
	},
	//属性设置
	isPropPanel: true,
	nodeclick: function() {
		if (xds.eastlayout && xds.eastlayout.activeSettings) {
			xds.eastlayout.activeSettings('ContentFrame', '300', '通用录入', function(dataInputSetting) {
				xds.eastlayout.dataInputSetting = dataInputSetting;

				dataInputSetting.setValue();
			});
		}
	},
	configs: [{
		name: "gridrowidchange",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "e"

	}, {
		name: "gridrowselect",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "e"

	}, {
		name: "afterBindDate",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "e"

	}, {
		name: "cls",
		group: "外观",
		ctype: "string"
	}, {
		name: "disabled",
		group: "外观",
		ctype: "boolean"
	}, {
		name: "hidden",
		group: "外观",
		ctype: "boolean"
	}, {
		name: "id",
		group: "设计",
		ctype: "string"
	}, {
		name: "style",
		group: "外观",
		ctype: "string"
	}, {
		name: "width",
		group: "外观",
		ctype: "number"
	}, {
		name: "height",
		group: "外观",
		ctype: "number"
	}, {
		name: "inputConfig",
		group: "外观",
		ctype: "string",
		hide: true
	}],
	initConfig: function(b, a) {
		//初始化默认属性设置
	},
	onFilmDblClick: function(b) {
		//双击值编辑功能  
		var a = this.getExtComponent();
	},
	onFilmClick: function(b) {
		if (xds.eastlayout && xds.eastlayout.activeSettings) {
			xds.eastlayout.activeSettings('ContentFrame', '300', '通用录入', function(dataInputSetting) {
				xds.eastlayout.dataInputSetting = dataInputSetting;
				dataInputSetting.setValue();
			});
		}
	}
	// ,
	// beforeSave: function() {
	// 	if (xds && xds.eastlayout && xds.eastlayout.dataInputSetting) xds.eastlayout.dataInputSetting.save(this.node.component);
	// }
});

xds.Registry.register(xds.vmdDataInput)
//设计模式
Ext.define('vmd.design.Datainput', {
	extend: 'Ext.BoxComponent',
	xtype: 'vmd.design.datainput',
	requires: xds.vmd.getCmpRequires(["vmd.ux.DataInputOperateBar$1.0$DataInputOperateBar", "vmd.ux.DataInputNavBar$1.0$DataInputNavBar"]),
	displayMode: 'topbottom',
	isShowGrid: true,
	isShowForm: true,
	isShowStatus: false,
	isShowToolbar: true,
	isShowNavBar: true,
	isShowEditBar: true,
	toolbarHeight: 45,
	statusHeight: 30,
	initComponent: function() {
		this.callParent(arguments);
		var me = this;
		!xds.temp.datainputevents_vmdpreview && xds.on('vmdpreview', function() {
			me.updateJson()
		});
		!xds.temp.datainputevents_vmdsave && xds.on('vmdsave', function() {
			me.updateJson()
		});
		!xds.temp.datainputevents_beforeComponentChanged && xds.on('beforecomponentchanged', function(arg) {
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

		xds.temp.datainputevents_vmdsave = true;
		xds.temp.datainputevents_beforeComponentChanged = true;
		xds.temp.datainputevents_vmdpreview = true;
	},
	updateJson: function() {

		var bucket = [];
		var list = xds.inspector.nodeHash;
		//处理采集录入生成预览所需json串，遍历组件树摘出采集录入
		for (var key in list) {
			if (list[key].component && list[key].component.cid == "vmdDataInput") {
				bucket.push(list[key]);
			}
		}
		if (bucket.length > 0) {
			var utils = new ide.ext.DataInput();
			//utils.initBindSourceProp()
			//取到采集录入组件生成json

			for (var i = 0; i < bucket.length; i++) {
				var temp = bucket[i].component.userConfig.inputConfig;
				try {
					var saveInfo = JSON.parse(temp)
				} catch (ex) {
					vmd.tip('当前界面有未指定数据集的采集录入组件，请指定后重试', 'error');
					return false;
				}
				var tg = utils.saveRptInfo(saveInfo.grid, saveInfo.layout.dataSet);
				var tf = utils.saveFormInfo(saveInfo.form, saveInfo.layout.dataSet);
				saveInfo.gridJson = tg;
				saveInfo.formJson = tf;
				bucket[i].component.setConfig('inputConfig', JSON.stringify(saveInfo))

				debugger
				utils.saveEvents(bucket[i].component, saveInfo)
			}
		}
	},
	onRender: function(ct, positon) {
		this.defaultInputConfig = JSON.stringify({
			layout: {
				displayMode: "style1",
				isShowGrid: true,
				isShowForm: true,
				isShowNavigation: true,
				isShowOperation: true,
				isShowStatistics: true
			},
			form: {
				settings: {
					storeName: "Dt1",
					columns: 3,
					fields: []
				},
				events: {}
			},
			grid: {
				settings: {
					storeName: "Dt1",
					fields: []
				},
				events: {}
			},
			navigation: {},
			operation: {},
			statistics: {}
		})
		var ICStr = this.inputConfig || this.defaultInputConfig
		var IC = Ext.isObject(ICStr) ? ICStr : JSON.parse(ICStr);
		var me = this;
		var layType = IC.layout.displayMode || "style1";
		var layInfo = IC.layout;
		this.isShowGrid = layInfo.isShowGrid;
		this.isShowForm = layInfo.isShowForm;
		this.isShowStatus = layInfo.isShowStatistics;
		this.isShowToolbar = (layInfo.isShowOperation || layInfo.isShowNavigation);
		this.isShowNavBar = layInfo.isShowNavigation;
		this.isShowEditBar = layInfo.isShowOperation;
		//网格上 自由下
		var gridFormCls = []
		//处理默认布局样式数组
		if (this.isShowGrid)
			gridFormCls.push({
				cls: 'vmd-datainput-grid'
			})
		if (this.isShowStatus)
			gridFormCls.push({
				cls: 'vmd-datainput-status'
			})
		if (this.isShowForm)
			gridFormCls.push({
				cls: 'vmd-datainput-form'
			})
		if (this.isShowToolbar)
			gridFormCls.push({
				cls: 'vmd-datainput-toolbar'
			})
		if (layType == "style2") {
			gridFormCls = []
			if (this.isShowForm)
				gridFormCls.push({
					cls: 'vmd-datainput-form'
				})
			if (this.isShowGrid)
				gridFormCls.push({
					cls: 'vmd-datainput-grid'
				})
			if (this.isShowStatus)
				gridFormCls.push({
					cls: 'vmd-datainput-status'
				})
			if (this.isShowToolbar)
				gridFormCls.push({
					cls: 'vmd-datainput-toolbar'
				})
		}

		if (!this.el) {
			this.autoEl = {
				cls: 'vmd-datainput',
				cn: gridFormCls
			}
			this.callParent(arguments);
			//网格上 自由下
			this.gridEl = this.isShowGrid ? this.el.child('.vmd-datainput-grid') : null;
			this.statusEl = this.isShowStatus ? this.el.child('.vmd-datainput-status') : null;
			this.formEl = this.isShowForm ? this.el.child('.vmd-datainput-form') : null;
			this.toolbarEl = this.isShowToolbar ? this.el.child('.vmd-datainput-toolbar') : null;
			//初始化
			this.init();
		}
	},
	init: function() {
		//初始化自由格式		
		if (this.isShowForm)
			this._initForm();
		//初始化网格
		if (this.isShowGrid)
			this._initGrid();
		//初始化状态栏
		if (this.isShowStatus)
			this._initStatus();
		//初始化工具栏
		if (this.isShowToolbar)
			this._initToolbar();
	},

	//private
	_initGrid: function() {
		var header = "Package,Version,Maintainer";
		var width = "";
		var headerStyle = [];
		var _setGridLayout = function(gridSettings) {
			var headerArr = [];
			var widthArr = [];
			var dWidth = "100";
			var fileConfig = gridSettings.fields || [];
			for (var i = 0; i < fileConfig.length; i++) {
				var cell = fileConfig[i];
				var cellDic = cell.dictionary || {};
				var cellCon = cell.fieldsConfig || {};
				if (cellCon) {
					headerArr.push(cellCon.name || cellCon.id || cellDic.cname || cellDic.name)
					widthArr.push(cellCon.width || "100")
				} else {
					headerArr.push(cellDic.cname || cellDic.name)
					widthArr.push("100")
				}

				if (cellDic.primary == "Y")
					headerStyle.push("color:red");
				else if (cellDic.nullable != "Y")
					headerStyle.push("color:blue");
				else headerStyle.push(" ");

			}
			header = headerArr.join(",");

			width = widthArr.join(",");
		}
		var ICStr = this.inputConfig || this.defaultInputConfig
		var IC = Ext.isObject(ICStr) ? ICStr : JSON.parse(ICStr);
		var fset = IC.form ? IC.grid.settings : (JSON.parse(this.defaultInputConfig).grid.settings);
		_setGridLayout(fset);

		if (!this.grid)
			this.grid = new dhtmlXGridObject(this.gridEl.dom);
		this.grid.setImagePath("../../../codebase/imgs/");
		this.grid.setHeader(header, null, headerStyle);
		this.grid.setInitWidths(width);
		this.grid.init();
		if (!header) {
			var tipgrid_div = document.createElement('div');
			tipgrid_div.innerHTML = '<div style="text-align:center;font-size:30px;color:#c5c5c5">网格格式区域</div>';
			this.gridEl.dom.firstElementChild.style.border = "0px"
			this.gridEl.insertFirst(tipgrid_div)
		}
	},
	//private
	_initForm: function(w, h) {
		var formData = [];
		var w = w || this.width;
		var _setFromLayout = function(formSettings) {
			var cols = 3; //列数
			var colWidth; //每列宽
			var unitWidth = 50; //单位的宽度
			var labelWidth = 80; //标签的的宽度
			var labelHeight = 20; //标签的高度
			if (formSettings)
				cols = formSettings.formColumn || "3";
			//处理列的最小列数			如果小于最小宽度150  则不按照设置的列数显示	
			if (cols >= ((w - 80) / 150))
				cols = parseInt((w - 80) / 150)
			//设置每列宽 总宽度 - 左边距20-右侧20-每列的便宜*列数
			colWidth = (w - 20 - 20 - (cols * 9)) / cols;
			var inputWidth = colWidth - labelWidth - unitWidth;
			//获取自耦段信息  并设置当前行，当前行的第几列
			var fileConfig = formSettings.fields || [];
			var rowNum = 0; //当前行
			var rowColNum = 0; //当前行的第几列
			for (var i = 0; i < fileConfig.length; i++) {
				var cell = fileConfig[i];
				var cellDic = cell.dictionary || {};
				var cellCon = cell.fieldsConfig || {};
				//每行的第一列，创建列的信息
				if (rowColNum == 0) {
					var rowInfo = {};
					rowInfo.type = "label";
					rowInfo.labelHeight = 0;
					rowInfo.inputHeight = 0;
					rowInfo.offsetTop = 0;
					rowInfo.list = [];


					if (cellDic.primary == "Y")
						rowInfo.style = "color:red";
					else if (cellDic.nullable != "Y")
						rowInfo.style = "color:blue";

					formData.push(rowInfo);
				}				
				//获取跨行 跨列
				var fixCol = cellCon.fixColumns || 1;
				var fixRow = cellCon.fixRows || 1;
				//每列内容信息  文本 录入区
				var childInfo = {
					type: "input",
					name: cellCon.id,
					labelWidth: labelWidth,
					labelHeight: labelHeight,
					label: (cellCon.name ? cellCon.name : (cellDic.cname || cellDic.name)) + ":",
					inputWidth: inputWidth
				};
				//单位
				var childInfoUnit = {
					type: "label",
					labelWidth: unitWidth,
					labelHeight: labelHeight,
					label: cellCon.unit || "",
					labelLeft: 0
				};
				//是计算显示长度  如果跨的列数大于设置的列数  则跨列数=列数，即整行显示
				if (fixCol >= cols)
					fixCol = cols
				if (fixRow > 1) //跨行数大于1   则将置为整行显示，在设置显示的行数 
					fixCol = cols
				//设置跨行跨列后的区域大小 
				var newInputWidth = fixCol * colWidth - labelWidth - unitWidth;
				childInfo.inputWidth = newInputWidth
				var newInputHeight = labelHeight * fixRow;
				childInfo.rows = fixRow //支持 文本、富文本  的多行显示				
				//判断在改行里边继续添加，总列数是否超出，超出则添加该列再创建一列；未超出则在改行添加
				if ((rowColNum + fixCol) >= cols && fixCol > 1) {
					if ((rowColNum + fixCol) > cols) {
						var rowInfo = {};
						rowInfo.type = "label";
						rowInfo.labelHeight = 0;
						rowInfo.inputHeight = 0;
						rowInfo.offsetTop = 0;
						rowInfo.list = [];
						formData.push(rowInfo);
						rowColNum = 0;
						rowNum++;
					}
				}
				//添加每行的子列信息
				if (rowColNum > 0)
					formData[rowNum].list.push({
						type: "newcolumn"
					});
				formData[rowNum].list.push(childInfo);
				formData[rowNum].list.push({
					type: "newcolumn"
				});
				formData[rowNum].list.push(childInfoUnit);
				rowColNum += fixCol;
				//如果列数超出设置的列数  设置下行重新开始
				if (rowColNum >= cols) {
					rowNum++
					rowColNum = 0
				}
			}
		}
		var ICStr = this.inputConfig || this.defaultInputConfig
		var IC = Ext.isObject(ICStr) ? ICStr : JSON.parse(ICStr);
		var fset = IC.form ? IC.form.settings : (JSON.parse(this.defaultInputConfig).form.settings);
		_setFromLayout(fset);
		if (this.form) {
			if (this.formEl.dom.children.length > 0)
				this.formEl.dom.children[0].remove()
		}
		this.formEl.dom.style.overflow = "auto";
		this.form = new dhtmlXForm(this.formEl.dom, formData);
		Ext.fly(this.form.cont).addClass('vmd-datainput-form');

		if (formData.length <= 0) {
			var tipForm_div = document.createElement('div');
			tipForm_div.innerHTML = '<div style="text-align:center;font-size:30px;color:#c5c5c5">自由格式区域</div>';
			this.formEl.insertFirst(tipForm_div)
		}
	},
	//private
	_initToolbar: function() {
		if (!this.isShowToolbar)
			return;
		var ICStr = this.inputConfig || this.defaultInputConfig
		var IC = Ext.isObject(ICStr) ? ICStr : JSON.parse(ICStr);
		var navset = IC.navigation || {};
		var editset = IC.operation || {};
		this.toolbarEl.setHeight(this.toolbarHeight)
		if (this.isShowNavBar && vmd.ux.DataInputNavBar) {
			var navBar = new vmd.ux.DataInputNavBar({
				renderTo: this.toolbarEl.dom,
				style: "float: left;",
				startDisplay: navset.first == undefined ? false : !navset.first,
				forwardDisplay: navset.prev == undefined ? false : !navset.prev,
				nextDisplay: navset.next == undefined ? false : !navset.next,
				endDisplay: navset.last == undefined ? false : !navset.last,
				positionDisplay: navset.pageNum == undefined ? false : !navset.pageNum
			})
		}
		if (this.isShowEditBar && vmd.ux.DataInputOperateBar) {
			var editBar = new vmd.ux.DataInputOperateBar({
				renderTo: this.toolbarEl.dom,
				style: "float: right;",
				addDisplay: editset.addbar == undefined ? false : !editset.addbar,
				deleteDisplay: editset.deletebar == undefined ? false : !editset.deletebar,
				saveDisplay: editset.savebar == undefined ? false : !editset.savebar,
				printDisplay: editset.printbar == undefined ? false : !editset.printbar,
				importDisplay: editset.exData == undefined ? false : !editset.exData
			})
		}
	},
	//private
	_initStatus: function() {
		if (!this.isShowStatus) return;
		this.statusEl.setHeight(this.statusHeight)
		var tipStatus_div = document.createElement('div');
		tipStatus_div.innerHTML = '<div style="text-align:center;font-size:25px;color:#c5c5c5">统计栏区域</div>';
		this.statusEl.insertFirst(tipStatus_div)
	},
	afterRender: function(ct) {
		this.callParent(arguments)
	},
	//private
	_resize: function(w, h) {
		// if (this.isShowStatus) h = h - this.statusHeight;
		// if (this.isShowToolbar) h = h - this.toolbarHeight;
		if (this.isShowStatus) h = h - this.statusHeight;
		if (this.isShowToolbar) h = h - this.toolbarHeight;

		if (this.isShowForm && this.isShowGrid) {
			this.gridEl.setHeight(Math.floor(h / 2));
			this.gridEl.setWidth(w);
			this.grid.setSizes();
			this.formEl.setHeight(Math.ceil(h / 2));
			this.formEl.setWidth(w);
			this._initForm(w, h / 2)
		} else if (this.isShowGrid && !this.isShowForm) {
			this.gridEl.setHeight(Math.floor(h));
			this.gridEl.setWidth(w);
			this.grid.setSizes();
		} else if (this.isShowForm && !this.isShowGrid) {
			this.formEl.setHeight(Math.ceil(h));
			this.formEl.setWidth(w);
			this._initForm(w, h)
		}
		//this.form.setSizes
	},

	onResize: function(w, h) {
		if (this.ownerCt.initialConfig.layout == 'fit') {}
		this._resize(w, h);
	}
})