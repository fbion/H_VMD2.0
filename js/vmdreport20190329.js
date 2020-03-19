//#region Report 报表组件   原先写在ide-ext.js中
var hwRaoUrl;
if (typeof xds != "undefined")
	xds.vmdReport = Ext.extend(xds.Component, {
		cid: "vmdReport",
		category: "vmd组件",
		defaultName: "&lt;report&gt;",
		text: "report(报表)",
		dtype: "vmd.dreport",
		//这里的xtype主要是为了代码显示的类型，本身无任何作用
		// xtype: "vmd.report",
		xtype: "vmd.report2_2",
		xcls: "vmd.report2_2",
		iconCls: "icon-report",
		version: "2_2",
		//控制是否可以拖拽
		isResizable: function(a, b) {
			//a为上下左右的位置方向
			return true
		},
		naming: "report",
		isContainer: false,
		//是否显示右下角的组件说明
		filmCls: "el-film-nolabel",
		//默认属性设置
		defaultConfig: {
			text: "report",
			relativepath: "Resources//Report",
			align: "center",
			fillReport: false,
			loadMode:"nomal",
			nousedataset: false,
			rptVersion: "2.2"
		},
		//属性设置
		configs: [{
			name: "click",
			group: "事件",
			editor: "ace",
			ctype: "string"

		}, {
			name: "leftlinkclick",
			group: "事件",
			editor: "ace",
			ctype: "string",
			params: "grid,cell,params"
		}, {
			name: "fillReport",
			group: "外观",
			ctype: "boolean",
			hide: true
		}, {
			name: "path",
			group: "外观",
			ctype: "string",
			editor: "file",
			edConfig: {
				//url: '/report/modules/hwe2fd927b',
				//url:"http://192.168.1.181:9050/RasService/file/report/Upload?dirPath=/report/modules/hwe2fd927b", 
				url: function() {
					var host = vmd.workspace ? (vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp) : vmdSettings.dataServiceIp;
					var hwRao = new HwRao(host, "report");
					var rpath = "report/modules/" + getUrlParam("id");
					return hwRao.getUploadUrl(rpath);
				},
				fileid: 'file',
				callback: function(vmdreport) {
					vmdreport.component.setConfig("isWebEdit", false);
				}
			}
		}, {
			name: "disabled",
			group: "外观",
			ctype: "boolean"
		}, {
			name: "id",
			group: "设计",
			ctype: "string"
		}, {
			name: "relativepath",
			group: "外观",
			ctype: "string"
		}, {
			name: "dsnames",
			group: "外观",
			ctype: "string",
			readOnly: true
		},  {
                name: "loadMode",
                group: "外观",
                ctype: "string",
                editor: "options",
                options: ["nomal", "smart","paging"]
            },{
            name: "loadNumber",
            group: "外观",
            ctype: "number"
        },{
			name: "subrptds",
			group: "外观",
			ctype: "string",
			readOnly: true
		}, {
			name: "width",
			group: "外观",
			ctype: "number"
		}, {
			name: "height",
			group: "外观",
			ctype: "number"
		}, {
			name: "nousedataset",
			group: "外观",
			ctype: "boolean",
			hide: true
		}, {
			name: "align",
			group: "外观",
			ctype: "string",
			editor: "options",
			options: ["left", "center", "right"]
		}, {
			name: "rptVersion",
			group: "外观",
			ctype: "string",
			editor: "options",
			options: ["2.2", "2.3"]
		}, {
			name: "rptType",
			group: "外观",
			ctype: "string",
			readOnly: true
		}, {
			name: "gridConfig",
			group: "外观",
			ctype: "string",
			editor: "defineWindow",
			edConfig: {
				url: getVirtualPath() + '/modules/hw39dc4349/hw9HxTCPqW/hw83848ec4.html',
				height: 485,
				width: 330,
				title: '表格属性设置'
			}
		}],
		initConfig: function(b, a) {

			//初始化默认属性设置
			//默认fill填充
			if (this.owner) {
				var configs = this.owner.getConfig();
				if (configs.layout != 'fit') this.owner.setConfig('layout', 'fit');

				//拖拽增加query事件
				var reportId = this.id || 'report';
				var _afterrender = this.userConfig && this.userConfig.afterrender;
				var _funName = reportId + '_afterrender';
				var _eventName = 'function ' + _funName;
				var _newFn = "\n" + _eventName + "(render){\n " + reportId + ".query();\n}";
				if (xds.vmd.events == undefined) xds.vmd.events = '';
				if (!_afterrender) this.setConfig('afterrender', reportId + '_afterrender');
				if (xds.vmd.events.indexOf(_eventName) == -1) xds.vmd.events += _newFn;


			}
		},
		onFilmDblClick: function(b) {
			//双击值编辑功能
			var a = this.getExtComponent();
			xds.canvas.startEdit(this, a.el, this.getConfigObject("text"), 80)
		}
	});

this.getFirstParentOfType = function(obj, tag) {
	while (obj && obj.tagName != tag && obj.tagName != "BODY") {
		obj = obj.parentNode;
	}
	return obj;
}


if (typeof xds != "undefined")
	xds.Registry.register(xds.vmdReport)


//#region vmdReport    原先写与vmdcomps.js
Ext.define("vmd.comp.DesignerReport", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.dreport',
	/**
	 * Read-only. True if this button is disabled
	 * @type Boolean
	 */
	disabled: false,
	/*
	 *type 种类有primary,success,warning,danger,info,text
	 */
	type: 'default',
	clickEvent: 'click',
	/**
	 * @cfg {Boolean} handleMouseEvents
	 * False to disable visual cues on mouseover, mouseout and mousedown (defaults to true)
	 */
	handleMouseEvents: true,
	/**
	 *@cfg {large、small、mini}
	 *默认为空，正常模式
	 */
	size: '',
	// //判断ele是否含有cls类名   
	// hasClass: function(ele, cls) {
	// 	if (ele.dom) {
	// 		return ele.dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	// 	}
	// },
	// //元素移除class
	// removeClass: function(ele, cls) {
	// 	if (hasClass(ele, cls)) {
	// 		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	// 		ele.dom.className = ele.dom.className.replace(reg, ' ');
	// 	}
	// },
	initComponent: function() {
		var host = vmd.workspace ? (vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp) : vmdSettings.dataServiceIp;
		this.hwRao = new HwRao(host, "report");
		//window.hwRaoUrl=this.hwRao.getUploadUrl(this.relativepath+"/"+this.path);
		window.hwRaoUrl = this.hwRao.getUploadUrl(this.relativepath);
		this.callParent();
		//vmd.comp.Grid.superclass.initComponent.call(this);
		this.addEvents(
			/**
			 * @event click
			 * Fires when this button is clicked
			 * @param {Button} this
			 * @param {EventObject} e The click event
			 */
			'click',

			'rowSelect',
			/**
			 * @event mouseout
			 * Fires when the mouse exits the button
			 * @param {Button} this
			 * @param {Event} e The event object
			 */
			'mouseout'
		);
	},
	getTemplateArgs: function() {},
	_resizeHeight: function() {},
	initHdTable: function() {
		var me = this;
		me.grid = new Handsontable(this.gridEl.dom, {
			// manualColumnMove: true,
			// manualRowMove: true, //行列拖动更换顺序
			// filters: true,
			// columnSorting: true,
			// sortIndicator: true,
			// rowHeaderWidth: 50,
			// renderAllCols:true,
			// viewportColumnRenderingOffset: 30,
			// viewportRowRenderingOffset: 30, //设置可视行列外预渲染的行列数
			renderAllRows: true, //禁用虚拟渲染机制
			fillHandle: true,
			customBorders: true,
			autoInsertRow: false,
			startRows: 30,
			startCols: 60,
			colWidths: 80,
			rowHeights: 26,
			colHeaders: true,
			rowHeaders: true, //显示行头列头
			manualColumnFreeze: true, //列固定和解除
			currentRowClassName: '',
			currentColClassName: '', //当前行列样式
			autoColumnSize: true, //自适应列大小
			manualColumnResize: true,
			manualRowResize: true, //行列宽度拖动设置
			// undo: true,
			// redo: true, //撤销、反撤销
			wordWrap: false,
			copyable: true,
			copyPaste: true,
			mergeCells: true,
			renderAllRows: false,
			allowInsertRow: true,
			allowInsertColumn: true,
			outsideClickDeselects: false,
			minSpareRows: 1,
			minSpareCols: 1,
			contextMenu: {
				items: {
					'mergeCells': {
						name: function() {
							var sel = me.grid.getSelectedLast();
							if (sel) {
								var info = me.grid.getPlugin('mergeCells').mergedCellsCollection.get(sel[0], sel[1]);
								if (info.row === sel[0] && info.col === sel[1] && info.col + info.colspan - 1 === sel[3]) {
									return '<i class="menuicon icons icons-16 icons-16-merge_off"></i>取消合并单元格'
								}
								return '<i class="menuicon icons icons-16 icons-16-merge_on"></i>合并单元格'
							}
						},
						hidden: false
					},
					'setFP': {
						name: function() {
							if (!this.fpArray || this.fpArray.length < 1) {
								return '定义为分片'
							} else {
								var flag = true;
								var cell = this.dealInvert()[0];
								var arr = this.fpArray;
								for (var i = 0; i < this.fpArray.length; i++) {
									if (arr[i].sr == cell.sr && arr[i].er == cell.er && arr[i].sc == cell.sc && arr[i].ec == cell.ec) {
										flag = false;
									}
								}
								if (flag) {
									return '定义为分片'
								} else {
									return '取消分片区域'
								}
							}
						},
						callback: function() {
							this.contextMenu_fpSet();
						},
						hidden: function() {
							return this.isCell();
						},
						disabled: function() {
							var cell = this.dealInvert()[0]
							if (cell.sr == cell.er && cell.sc == cell.ec) {
								return true;
							} else {
								return false;
							}
						}
					},
					'setQT': {
						name: function() {
							if (this.nestedStatus == 'new' || this.nestedStatus == 'forbid') {
								var cell = this.dealInvert()[0];
								this.inMerge();
								if ((cell.sr == cell.er && cell.sc == cell.ec) || this.inmerge) {
									return '设为嵌套区'
								} else {
									return '合并并设为嵌套表'
								}
							} else {
								return '取消嵌套区域'
							}
						},
						callback: function() {
							this.nestedTableHandle();
						},
						hidden: function() {
							return this.isCell();
						}
					},
					hsep3: "---------",
					'cut': {
						name: '剪切'
					},
					'copy': {
						name: '复制'
					},
					hsep1: "---------",
					'row_above': {
						name: '<i class="menuicon icons icons-16 icons-16-insert_row"></i>插入行<div class="rowinput hotmenuinput"></div>',
						hidden: function() {
							return !this.isCol()
						},
						callback: function() {
							this.insertRow(1)
							if (typeof inst != 'undefined' && inst.menu && inst.menu.hotMenu) {
								inst.menu.hotMenu.rootElement.style.display = 'none'
							}
						}
					},
					'remove_row': {
						name: '<i class="menuicon icons icons-16 icons-16-delete_row"></i>删除所在行',
						hidden: function() {
							return this.isRow()
						},
						callback: function() {
							this.contextMenu_removeRow();
						}
					},
					hsep2: "---------",
					'col_left': {
						name: '<i class="menuicon icons icons-16 icons-16-insert_column"></i>插入列<div class="colinput hotmenuinput"></div>',
						hidden: function() {
							return !this.isRow()
						},
						callback: function() {
							this.insertCol(1)
						}
					},
					'remove_col': {
						name: '<i class="menuicon icons icons-16 icons-16-delete_column"></i>删除所在列',
						hidden: function() {
							return this.isCol()
						},
						callback: function() {
							this.contextMenu_removeCol();
						}
					},
					hsep4: "---------",
					'title': {
						name: '标题',
						callback: function() {
							this.setRowHeader('title')
						},
						hidden: function() {
							return this.isRow()
						}
					},
					'header': {
						name: '表头',
						callback: function() {
							this.setRowHeader('header')
						},
						hidden: function() {
							return this.isRow()
						}
					},
					'data': {
						name: '数据',
						callback: function() {
							this.setRowHeader('data')
						},
						hidden: function() {
							return this.isRow()
						}
					},
					hsep6: "---------",
					'row_height': {
						name: '<i class="menuicon icons icons-16 icons-16-height"></i>行高<div class="rowheight hotmenuinputr"></div>',
						callback: function() {

						},
						hidden: function() {
							return this.isRow()
						}
					},
					'row_hide': {
						name: function() {
							var c = this.getCellMeta(0, 0).stateTemp
							var flag = this.getCellMeta(c, 0).row_hide;
							if (flag) {
								return '取消行隐藏'
							} else {
								return '行隐藏'
							}
						},
						callback: function() {
							this.setRowHeader('hide')
						},
						hidden: function() {
							return this.isRow()
						}
					},
					hsep5: "---------",
					'col_lock': {
						name: function() {
							var cell = this.dealInvert()[0];
							var ec = cell.ec;
							var flag = this.getCellMeta(0, ec).col_lock;
							if (flag) {
								return '取消列锁定'
							} else {
								return '列锁定'
							}
						},
						callback: function() {
							var cell = this.dealInvert()[0];
							var ec = cell.ec;
							if (this.getCellMeta(0, ec).col_lock) {
								this.freeze(null, null, true)
							} else {
								this.freeze(0, ec + 1, false)
							}

						},
						hidden: function() {
							return this.isCol()
						},
						disabled: function() {
							var cell = this.dealInvert()[0];
							var ec = cell.ec;
							if (this.getCellMeta(0, ec).col_lock && this.getCellMeta(0, ec + 1).col_lock) {
								return true
							}
						}
					},
					'col_width': {
						name: '<i class="menuicon icons icons-16 icons-16-width"></i>列宽<div class="colWidth hotmenuinputr"></div>',
						callback: function() {

						},
						hidden: function() {
							return this.isCol()
						}
					},
					'col_hide': {
						name: function() {
							var c = this.getCellMeta(0, 0).stateTemp
							var flag = this.getCellMeta(0, c).col_hide;
							if (flag) {
								return '取消列隐藏'
							} else {
								return '列隐藏'
							}
						},
						callback: function() {
							this.setColHeader('hide')
						},
						hidden: function() {
							return this.isCol()
						}
					},
					'clearCSS': {
						name: '清除样式',
						callback: function() {
							this.contextMenu_clearCSS();
							this.updateSettings()
						},
						hidden: function() {
							return this.isCell()
						}
					},
					'clearText': {
						name: '清除文本',
						callback: function() {
							this.contextMenu_clearText();
						},
						hidden: function() {
							return this.isCell()
						}
					},
					'clearAll': {
						name: '清除全部',
						callback: function() {
							this.contextMenu_clearAll();
						}
					}
				}
			},
			afterRender: function() {
				var hot = this;
				if (this.nestedTableArray) {
					this.drawNestedTable()
					for (var i = 0; i < this.nestedTableArray.length; i++) {
						var arr = this.nestedTableArray[i];
						var cell = this.getCell(arr.sr, arr.sc);
						if (cell && cell.style) {
							cell.style.padding = '0 0'
							cell.ondblclick = this.nestedTable
							// cell.readOnly = true;
						}
						this.changeAttributeInfo(arr.sr, arr.sc, 'cmbType', 'qtb')
						this.changeAttributeInfo(arr.sr, arr.sc, 'qtb_tableName', arr.qtb_tableName)
						this.changeAttributeInfo(arr.sr, arr.sc, 'qtb_style', arr.qtb_style)
						this.changeAttributeInfo(arr.sr, arr.sc, 'qtb_template', arr.qtb_template)
						this.changeAttributeInfo(arr.sr, arr.sc, 'qtb_unfold', arr.qtb_unfold)
					}
				}
				$('.wtSpreader')[0].onmouseup = function(e) {
					var offsetLeft = vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetLeft;
					var offsetTop = vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetTop;
					if (hot.nestedTableArray) {
						hot.nestedTableValid();
					}
					if (hot.nestedTimes && hot.cornerSet) {
						if (!hot.nestedTableValidForDrag()) {
							vmd.tip('嵌套表区域不可重叠', 'error')
							var cell = hot.dealInvert()[0];
							for (var i = 0; i < hot.nestedTableArray.length; i++) {
								var arr = hot.nestedTableArray[i];
								if (arr.sr == cell.sr && arr.sc == cell.sc) {
									var copy = [];
									var ma = hot.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
									for (var n = 0; n < ma.length; n++) {
										copy.push(ma[n])
									}
									copy.push({
										col: arr.sc,
										colspan: arr.ec - arr.sc + 1,
										removed: false,
										row: arr.sr,
										rowspan: arr.er - arr.sr + 1
									})
									hot.updateSettings({
										mergeCells: copy
									})
									return;
								}
							}
							return;
						}

						var top;
						var left;
						if (hot.whichClick == 'left') {
							top = (vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetTop - 20) + 'px'
						}
						if (hot.whichClick == 'left') {
							left = (vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetLeft - 20) + 'px'
						}
						var cssText = {
							'background-image': "url('../design/css/imgs/tz.png')",
							'background-repeat': 'no-repeat',
							'background-color': 'transparent',
							'cursor': 'se-resize',
							'height': '16px',
							'width': '16px',
							'top': top,
							'left': left,
							'border': 'none'
						}
						if (sheetHot_me.el && sheetHot_me.el.dom) {
							vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4).removeClass('corner').css(cssText)
							vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.area').eq(4).removeClass('corner').css(cssText)
						}
					} else if (hot.nestedTimes && !hot.cornerSet) {
						if (hot.whichClick == 'right') {
							var cell = hot.dealInvert()[0];
							var last = hot.selectedCell;
							if (!this.selectChanged) {
								left = offsetLeft + 'px'
								top = offsetTop + 'px'
							} else {
								if (e.which == 3) {
									left = offsetLeft + 'px'
									top = offsetTop + 'px'
								} else {
									left = offsetLeft + 'px'
									top = offsetTop + 'px'
								}
							}

							var cssText = {
								'background-image': "url('../design/css/imgs/tz.png')",
								'background-repeat': 'no-repeat',
								'background-color': 'transparent',
								'cursor': 'se-resize',
								'height': '16px',
								'width': '16px',
								'top': top,
								'left': left,
								'border': 'none'
							}
							if (sheetHot_me.el && sheetHot_me.el.dom) {
								vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4).removeClass('corner').css(cssText)
								vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.area').eq(4).removeClass('corner').css(cssText)
							}
						}
					}
					if (hot.nestedTimes && hot.cornerSet) {
						hot.handleNestedDrag();
					} else if (hot.nestedTimes && !hot.cornerSet) {
						hot.inMerge()
						if (!hot.inmerge) {
							hot.mergeCell()
						}
					}

					//分片操作
					if (hot.times && hot.cornerSet) {
						if (hot.fpAreaValidForDrag()) {
							hot.fpDrag();
						} else {
							vmd.tip('分片区域不可重叠', 'error')
						}
					}
				};
				$('.wtSpreader')[0].onmousedown = function(e) {
					if (e.which == 1) {
						hot.whichClick = 'left'
					} else if (e.which == 3) {
						hot.whichClick = 'right'
					}



				};
				if (this.fathers) {
					for (var i = 0; i < this.fathers.length; i++) {
						var arr = this.fathers[i]
						if (arr != null) {
							var father = this.numToEng(arr.fc) + (parseInt(arr.fr) + 1) + '';
							this.changeAttributeInfo(arr.cr, arr.cc, arr.type, father)
						}
					}
				}
				//拿到flList和fpList中的已有的分栏分片画上边框
				if (hot.fpArray) {
					for (var x = 0; x < hot.fpArray.length; x++) {
						//重绘外边框
						var sr = hot.fpArray[x].sr
						var sc = hot.fpArray[x].sc
						var er = hot.fpArray[x].er
						var ec = hot.fpArray[x].ec
						var ms = '2px solid #000'

						for (var a = sr; a < er + 1; a++) {
							if (sc == 0) {
								// hot.changeAttributeInfo(a, sc, 'borderL', ms)
								if (hot.getCell(a, sc) && hot.getCell(a, sc).style)
									hot.getCell(a, sc).style.borderLeft = ms;
							} else {
								// hot.changeAttributeInfo(a, sc - 1, 'borderR', ms)
								if (hot.getCell(a, sc - 1) && hot.getCell(a, sc - 1).style)
									hot.getCell(a, sc - 1).style.borderRight = ms;
							}
						}
						for (var b = sc; b < ec + 1; b++) {
							if (sr == 0) {
								// hot.changeAttributeInfo(sr, b, 'borderT', ms)
								if (hot.getCell(sr, b) && hot.getCell(sr, b).style)
									hot.getCell(sr, b).style.borderTop = ms;
							} else {
								// hot.changeAttributeInfo(sr - 1, b, 'borderB', ms)
								if (hot.getCell(sr - 1, b) && hot.getCell(sr - 1, b).style)
									hot.getCell(sr - 1, b).style.borderBottom = ms;
							}
						}
						for (var b = sc; b < ec + 1; b++) {
							// hot.changeAttributeInfo(er, b, 'borderB', ms)
							if (hot.getCell(er, b) && hot.getCell(er, b).style)
								hot.getCell(er, b).style.borderBottom = ms;
						}
						for (var b = sr; b < er + 1; b++) {
							// hot.changeAttributeInfo(b, ec, 'borderR', ms)
							if (hot.getCell(b, ec) && hot.getCell(b, ec).style)
								hot.getCell(b, ec).style.borderRight = ms;
						}
					}
				}
			},
			afterRenderer: function(td, row, col, prop, value, cellProperties) {
				this.afterRenderer(td, row, col, prop, value, cellProperties);
			},
			afterContextMenuShow: function(inst) {
				//插入行
				me.initMenuInput({
					menu: inst,
					cls: '.rowinput',
					unit: '',
					blur: function(val) {
						me.grid.insertRow(val)
						if (inst && inst.menu && inst.menu.hotMenu) {
							inst.menu.hotMenu.rootElement.style.display = 'none'
						}
					}
				});
				var rh = function() {
					var c = me.grid.getCellMeta(0, 0).stateTemp
					me.grid.fullRowHeightArray()
					return me.grid.rowHeadHeightArray[c];
				}
				//行高
				me.initMenuInput({
					menu: inst,
					cls: '.rowheight',
					unit: 'px',
					value: rh(),
					minValue: 1,
					maxValue: 100,
					blur: function(val) {
						var hot = me.grid;
						var rowHeightInst = hot.getPlugin('ManualRowResize');
						if (hot.dealInvert()) {
							var start = hot.dealInvert()[0].sr
							var end = hot.dealInvert()[0].er
							hot.fullRowHeightArray()
							for (var i = start; i < end + 1; i++) {
								rowHeightInst.setManualSize(i, val)
								hot.rowHeadHeightArray[i] = val;
								hot.setCellMeta(i, 0, 'rowHeight', val)
								hot.setCellMeta(i, 0, 'theCellChanged', true)
								hot.render()
							}
						}
						if (inst && inst.menu && inst.menu.hotMenu) {
							inst.menu.hotMenu.rootElement.style.display = 'none'
						}
					}
				});
				//插入列
				me.initMenuInput({
					menu: inst,
					cls: '.colinput',
					unit: '',
					blur: function(val) {
						me.grid.insertCol(val)
						if (inst && inst.menu && inst.menu.hotMenu) {
							inst.menu.hotMenu.rootElement.style.display = 'none'
						}
					}
				});
				var cw = function() {
					var c = me.grid.getCellMeta(0, 0).stateTemp
					me.grid.fullColWidthArray()
					return me.grid.colHeadWidthArray[c];
				}
				//列宽
				me.initMenuInput({
					menu: inst,
					cls: '.colWidth',
					unit: 'px',
					value: cw(),
					minValue: 20,
					maxValue: 100,
					blur: function(val) {
						var hot = me.grid;
						var colWidthInst = hot.getPlugin('ManualColumnResize');
						if (hot.dealInvert()) {
							var start = hot.dealInvert()[0].sc;
							var end = hot.dealInvert()[0].ec;
							hot.fullColWidthArray()
							for (var i = start; i < end + 1; i++) {
								colWidthInst.setManualSize(i, val)
								hot.colHeadWidthArray[i] = val;
								hot.setCellMeta(0, i, 'colWidth', val)
								hot.setCellMeta(0, i, 'theCellChanged', true)
								hot.render()
							}
						}
						if (inst && inst.menu && inst.menu.hotMenu) {
							inst.menu.hotMenu.rootElement.style.display = 'none'
						}
					}
				});
			}
		});
		//构造reportlist集合对象
		if (!xds.vmd.reportdict) xds.vmd.reportdict = {};
		var d_id = me.viewerNode.id;
		xds.vmd.reportdict[d_id] = me.grid;
		me.grid.addHook('afterSelection', function(sr, sc, er, ec) {
			if (this.nestedTimes) {
				var cssText = {
					'background-image': "none",
					'background-color': 'transparent',
					'cursor': 'se-resize',
					'height': '6px',
					'width': '6px'
				}
				vmd(me.el.dom).find('.htBorders .wtBorder.current').eq(4).removeClass('corner')
					.css(cssText)
				vmd(me.el.dom).find('.htBorders .wtBorder.area').eq(4).removeClass('corner')
					.css(cssText)
			}
		})
		me.grid.addHook('afterMergeCells', function(range, parent) {
			var sr = parent.row;
			var sc = parent.col;
			var er = range.to.row;
			var ec = range.to.col;
			var rs = parent.rowspan;
			var cs = parent.colspan;
			var flag = true;
			var mergedArray = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells
			for (var n = 0; n < mergedArray.length; n++) {
				if (mergedArray[n].row == sr && mergedArray[n].col == sc &&
					mergedArray[n].colspan == cs &&
					mergedArray[n].rowspan == rs) {
					flag = false;
					break;
				}
			}
			if (!flag) {
				for (var a = sr; a < er + 1; a++) {
					for (var b = sc; b < ec + 1; b++) {
						this.setCellMeta(a, b, 'mergeId', 2)
						this.setCellMeta(a, b, 'theCellChanged', true)
					}
				}
				this.setCellMeta(sr, sc, 'mergeId', 1)
			} else {
				for (var a = sr; a < er; a++) {
					for (var b = sc; b < ec; b++) {
						this.setCellMeta(a, b, 'mergeId', 0)
					}
				}
			}
		})
		me.grid.addHook('afterCut', function(data, cells) {
			this.afterCut(data, cells);
		})
		me.grid.addHook('afterCopy', function(data, cells) {
			this.afterCopy(data, cells);
		})
		me.grid.addHook('afterPaste', function(data, cells) {
			this.afterPaste(data, cells);
		})
		me.grid.addHook('afterRemoveRow', function(index, amount, physicalRows) {
			//删除行后处理合并单元格数组方法
			this.handleMergeRemoveRow(index, amount, physicalRows);
			//删除行后处理分片数组的方法
			this.handleFPRemoveRow(index, amount, physicalRows);
			//删除行后处理嵌套表数组的方法
			this.handleNestedTableRemoveRow(index, amount, physicalRows);
			this.selectCells([0, 0, 0, 0], true)
		})
		me.grid.addHook('afterRemoveCol', function(index, amount, physicalCols) {
			//删除列后处理合并单元格数组方法
			this.handleMergeRemoveCol(index, amount, physicalCols);
			//删除列后处理分片数组的方法
			this.handleFPRemoveCol(index, amount, physicalCols);
			//删除列后处理嵌套表数组的方法
			this.handleNestedTableRemoveCol(index, amount, physicalCols);
		})
		me.grid.addHook('afterColumnResize', function(col, width) {
			var hot = me.grid
			hot.fullColWidthArray()
			hot.colHeadWidthArray[col] = width;
			hot.setCellMeta(0, col, 'colWidth', width)
			hot.setCellMeta(0, col, 'theCellChanged', true)
		})
		me.grid.addHook('afterRowResize', function(row, height) {
			var hot = me.grid
			hot.fullRowHeightArray()
			hot.rowHeadHeightArray[row] = height;
			hot.setCellMeta(row, 0, 'rowHeight', height)
			hot.setCellMeta(row, 0, 'theCellChanged', true)
		})
		me.grid.addHook('afterOnCellMouseDown', function() {
			var that = this;
			//添加颜色选择器
			if (!this.oneButton) {

				var MyDiv = document.getElementsByClassName('colorPicker-palette-table-body')[0];
				var MyDiv1 = document.getElementsByClassName('colorPicker-palette-table-body')[1];

				var button = document.createElement("input");
				button.setAttribute("type", "button");
				button.setAttribute("value", "自定义颜色");
				button.setAttribute("id", 'moreFontColorButton');
				button.setAttribute("class", 'vmd-button');
				button.style.width = "190px";
				MyDiv.appendChild(button);

				var button1 = document.createElement("input");
				button1.setAttribute("type", "button");
				button1.setAttribute("value", "自定义颜色");
				button1.setAttribute("id", 'moreBackColorButton');
				button1.setAttribute("class", 'vmd-button');
				button1.style.width = "190px";
				MyDiv1.appendChild(button1);
				document.getElementById("moreFontColorButton").onclick = function() {
					// var value = {
					// 	blue: 0,
					// 	green: 0,
					// 	hue: 50,
					// 	lum: 0,
					// 	red: 0,
					// 	sat: 0
					// }
					var value = ''
					dhtmlXColorPicker.prototype.i18n.zn = {
						labelHue: "H",
						labelSat: "S",
						labelLum: "L",
						labelRed: "R",
						labelGreen: "g",
						labelBlue: "B",
						btnSelect: "选择",
						btnCancel: "取消"
					}
					myColorPicker = new dhtmlXColorPicker({
						input: moreFontColorButton.id,
						color: value,
						closeable: false
					});
					myColorPicker.loadUserLanguage('zn');
					myColorPicker.show();
					var myEvent = myColorPicker.attachEvent("onSelect", function(color, node) {
						selectColor = color
						var cell = me.grid.dealInvert()[0];
						for (var i = cell.sr; i < cell.er + 1; i++) {
							for (var n = cell.sc; n < cell.ec + 1; n++) {
								me.grid.changeAttributeInfo(i, n, 'fontColorSelect', selectColor);
								var el = me.grid.getCell(i, n);
								el.style.color = selectColor;
							}
						}
						myColorPicker.unload();
						myColorPicker = null;
					});
					var myEvent = myColorPicker.attachEvent("onCancel", function(color, node) {
						myColorPicker.unload();
						myColorPicker = null;
					});
				}
				document.getElementById("moreBackColorButton").onclick = function() {
					// var value = {
					// 	blue: 0,
					// 	green: 0,
					// 	hue: 50,
					// 	lum: 0,
					// 	red: 0,
					// 	sat: 0
					// }
					var value = ''
					dhtmlXColorPicker.prototype.i18n.zn = {
						labelHue: "H",
						labelSat: "S",
						labelLum: "L",
						labelRed: "R",
						labelGreen: "g",
						labelBlue: "B",
						btnSelect: "选择",
						btnCancel: "取消"
					}
					myColorPicker = new dhtmlXColorPicker({
						input: moreBackColorButton.id,
						color: value,
						closeable: false
					});
					myColorPicker.loadUserLanguage('zn');
					myColorPicker.show();
					var myEvent = myColorPicker.attachEvent("onSelect", function(color, node) {
						selectColor = color
						var cell = me.grid.dealInvert()[0];
						for (var i = cell.sr; i < cell.er + 1; i++) {
							for (var n = cell.sc; n < cell.ec + 1; n++) {
								me.grid.changeAttributeInfo(i, n, 'colorDisplay', selectColor);
								var el = me.grid.getCell(i, n);
								el.style.backgroundColor = selectColor;
							}
						}
						myColorPicker.unload();
						myColorPicker = null;
					});
					var myEvent = myColorPicker.attachEvent("onCancel", function(color, node) {
						myColorPicker.unload();
						myColorPicker = null;
					});
				}
				this.oneButton = true;
			}



			var cell = this.dealInvert()[0];
			var sr = cell.sr;
			var sc = cell.sc;
			var er = cell.er;
			var ec = cell.ec;

			if (this.selectedCell) {
				var last = this.selectedCell;
				if (cell.sr == last.sr && cell.sc == last.sc && cell.er == last.er && cell.ec == last.ec) {
					this.selectChanged = false;
				} else {
					this.selectChanged = true;
				}
			}

			//报表设计模式下选中
			if (xds.active && xds.active.node && xds.active.node.id != me.viewerNode.id) {
				me.viewerNode.select();
			}
			window.sheetHot = me.grid;
			window.sheetHot_me = me;
			$('.sheet-textwrapbutton')[0].onmousedown = function() {

				var hot = sheetHot;
				var cell = hot.dealInvert()[0];
				var sr = cell.sr;
				var sc = cell.sc;
				var er = cell.er;
				var ec = cell.ec;
				for (var i = sr; i < er + 1; i++) {
					for (var n = sc; n < ec + 1; n++) {
						// sheetHot.getCellMeta(0,0).cellAttributeInfo.alignInfo.autoenter
						if (hot.getCellMeta(i, n).cellAttributeInfo.alignInfo.autoenter.value == '1') {
							hot.changeAttributeInfo(i, n, 'autoenter', '0')
						} else {
							hot.changeAttributeInfo(i, n, 'autoenter', '1')
						}
					}
				}
			}

			if (me.isWebEdit) {
				if (xds.eastlayout && xds.eastlayout.activeSettings) {
					xds.eastlayout.activeSettings('ContentProperty', '', '报表', function(reportInst) {
						xds.eastlayout.reportInst = reportInst;
					});
					for (var key in xds.vmd.reportdict) {
						var rpt = xds.vmd.reportdict[key];
						if (d_id != key) rpt.deselectCell();
					}
				}
			} else {
				if (xds.eastlayout && xds.eastlayout.activeSettings) {
					xds.eastlayout.activeSettings('ContentProperty', '', '报表', function(reportInst) {
						xds.eastlayout.reportInst = reportInst;
					});
					for (var key in xds.vmd.reportdict) {
						var rpt = xds.vmd.reportdict[key];
						if (d_id != key) rpt.deselectCell();
					}
				}
			}

			this.fpCanDrag();
			this.nestedCanDrag();

			if (this.times) {
				this.allDrag('fp', me)
			} else if (this.nestedTimes) {
				this.allDrag('nested', me);
			} else {
				this.allDrag(null, me);
			}
			this.selectedCell = cell
		});
		me.grid.addHook('afterSelectionEnd', function(sr, sc, er, ec, selectionLayerLevel) {

			if (xds.eastlayout && xds.eastlayout.reportInst && xds.eastlayout.reportInst.FP) {
				var fp = xds.eastlayout.reportInst.FP;
				var cell = this.dealInvert()[0]
				if (this.fpArray && this.fpArray.length > 0) {
					var arr = this.fpArray;
					for (var i = 0; i < arr.length; i++) {
						if (cell.sr == arr[i].sr && cell.sc == arr[i].sc && cell.er == arr[i].er && cell.ec == arr[i].ec) {
							fp.seg_sliceName.setValue(arr[i].sliceName);
							fp.seg_emptyCol.setValue(arr[i].emptyCol);
							fp.seg_emptyRow.setValue(arr[i].emptyRow);
						}
					}
				}
			}

			if (typeof sheetHot != "undefined") {
				var cells = sheetHot.getSelected();
				for (var i = 0; i < cells.length; i++) {
					var sr = cells[i][0];
					var er = cells[i][2];
					var sc = cells[i][1];
					var ec = cells[i][3];
					if (sr == er && sc == ec) {
						this.toolbar['sheet-merge-cell'].addClass('toolbar-button-wrapper-disabled')
					} else {
						this.toolbar['sheet-merge-cell'].removeClass('toolbar-button-wrapper-disabled')
					}
					if (sr == er && sc == ec) {
						var td = sheetHot.getCell(sr, sc)
						if (td.style.fontWeight == 'bold') {
							this.toolbar['sheet-boldbutton'].addClass('pressed')
						} else {
							this.toolbar['sheet-boldbutton'].removeClass('pressed')

						}
						if (td.style.fontStyle == 'italic') {
							this.toolbar['sheet-italicsbutton'].addClass('pressed')
						} else {
							this.toolbar['sheet-italicsbutton'].removeClass('pressed')
						}
						if (td.style.textDecoration == 'underline') {
							this.toolbar['sheet-underlinebutton'].addClass('pressed')
							this.toolbar['sheet-strikebutton'].removeClass('pressed')
						} else {
							this.toolbar['sheet-underlinebutton'].removeClass('pressed')
						}
						if (td.style.textDecoration == 'line-through') {
							this.toolbar['sheet-underlinebutton'].removeClass('pressed')
							this.toolbar['sheet-strikebutton'].addClass('pressed')
						} else {
							this.toolbar['sheet-strikebutton'].removeClass('pressed')
						}
						if (this.getCellMeta(sr, sc).cellAttributeInfo.alignInfo.autoenter.value == '1') {
							this.toolbar['toolbar-sheet-textwrapbutton-group'][0].children[0].style.backgroundColor = 'rgba(65,70,80,.3)';
						} else {
							this.toolbar['toolbar-sheet-textwrapbutton-group'][0].children[0].style.backgroundColor = 'white';
						}
					}
					var hAlign = this.toolbar['toolbar-sheet-horizontal-align-group'][0].children[0].children[0].children[0].children[0].children[0].children[0];
					switch (this.getCellMeta(sr, sc).cellAttributeInfo.alignInfo.align.value.HAlign.value) {
						case 'left':
							hAlign.style.backgroundPosition = '0 -1200px';
							break;
						case 'right':
							hAlign.style.backgroundPosition = '0 -1304px';
							break;
						case 'center':
							hAlign.style.backgroundPosition = '0 -1148px';
							break;
					}
					var vAlign = this.toolbar['sheet-vertical-align'][0].children[0].children[0].children[0].children[0].children[0]
					switch (this.getCellMeta(sr, sc).cellAttributeInfo.alignInfo.align.value.VAlign.value) {
						case 'top':
							vAlign.style.backgroundPosition = '0 -1356px';
							break;
						case 'middle':
							vAlign.style.backgroundPosition = '0 -1252px';
							break;
						case 'bottom':
							vAlign.style.backgroundPosition = '0 -1096px';
							break;
					}
					this.toolbarFontFamily();

					this.toolbarFontSize();

					//设置选取的单元格id
					var inputID = me.expinput || document.getElementById("expinput");
					if (inputID) {
						inputID.value = me.grid.convert(sc + 1) + (sr + 1);
					}
					var el = me.grid.getCellMeta(sr, sc)
					el.cellAttributeInfo.designerCom = me;
					el.cellAttributeInfo.paserExp(el);
				}
			}

			var cell = this.dealInvert()[0];
			var no = null;
			var sr = cell.sr;
			var sc = cell.sc;
			var er = cell.er;
			var ec = cell.ec;
			if (this.selectedCell) {
				var last = this.selectedCell;
				if (cell.sr == last.sr && cell.sc == last.sc && cell.er == last.er && cell.ec == last.ec) {
					this.selectChanged = false;
				} else {
					this.selectChanged = true;
				}
			}


			var obj = [];
			var mArr = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells
			for (var k = 0; k < mArr.length; k++) {
				var msr = mArr[k].row;
				var msc = mArr[k].col;
				var mer = mArr[k].row + mArr[k].rowspan - 1;
				var mec = mArr[k].col + mArr[k].colspan - 1;
				if (sr == msr && sc == msc && er == mer && ec == mec) {
					no = k;
					break;
				}
			}
			if (no == null) {
				for (var i = sr; i < er + 1; i++) {
					for (var n = sc; n < ec + 1; n++) {
						info = this.getCellMeta(i, n);
						var runtask = function() {
							cP = xds.eastlayout.reportInst;
							cP.setPropertyInfo(info, me.grid, cell);
							var title = sheetHot.rootScope.viewerNode.id + '属性设置';
							cP.setTitle(title)
						}
						if (xds.eastlayout && xds.eastlayout.reportInst) {
							runtask()
						} else if (this.reportInst) {
							cP = this.reportInst;
							cP.setPropertyInfo(info, me.grid, cell);
						} else {
							vmd.taskRunner(function() {
								if (xds.eastlayout && xds.eastlayout.reportInst) return true;
							}, function() {
								runtask()
							})
						}
					}
				}
			} else {
				info = this.getCellMeta(sr, sc)
				var runtask = function() {
					cP = xds.eastlayout.reportInst;
					cP.setPropertyInfo(info, me.grid, cell);
					var title = sheetHot.rootScope.viewerNode.id + '属性设置';
					cP.setTitle(title)
				}
				if (xds.eastlayout && xds.eastlayout.reportInst) {
					runtask()
				} else if (this.reportInst) {
					cP = this.reportInst;
					cP.setPropertyInfo(info, me.grid, cell);
				} else {
					vmd.taskRunner(function() {
						if (xds.eastlayout && xds.eastlayout.reportInst) return true;
					}, function() {
						runtask()
					})
				}
			}


			if (xds.eastlayout && xds.eastlayout.reportInst && xds.eastlayout.reportInst.FP) {
				this.fpAreaValid();
			}

			if (this.nestedTableArray) {
				this.nestedTableValid()
			}
			this.selectedCell = cell;
		});
		me.grid.addHook('afterOnCellCornerMouseDown', function(event) {})

		me.grid.addHook('afterOnCellCornerDblClick', function(event) {})

		me.grid.addHook('afterChange', function(changes) {
			// row, prop, oldVal, newVal
			var r
			var c
			var value
			var temp

			if (changes) {
				for (var i = 0; i < changes.length; i++) {
					r = changes[i][0];
					c = changes[i][1];
					oldValue = changes[i][2];
					value = changes[i][3];
					this.changeAttributeInfo(r, c, 'txtValue', value)
				}
			}
		})
		me.grid.addHook('beforeOnCellContextMenu', function(event, croods, TD) {
			if (grid && !grid.isWebEdit) {
				this.updateSettings({
					contextMenu: false
				})
			}
			if (croods.col < 0) {
				this.setCellMeta(0, 0, 'state', 'col')
				this.setCellMeta(0, 0, 'stateTemp', croods.row)
			} else
			if (croods.row < 0) {
				this.setCellMeta(0, 0, 'state', 'row')
				this.setCellMeta(0, 0, 'stateTemp', croods.col)
			} else {
				this.setCellMeta(0, 0, 'state', 'cell')
				this.setCellMeta(0, 0, 'stateCell', [croods.row, croods.col])
			}

			this.nestedTableValid();
		})
		
		me.grid.rootScope = me;

		//初始化工具条
		Ext.defer(function() {
			me.reportToolbar.init({
				hot: me.grid
			});
		}, 50)
	},
	initMenuInput: function(opts) {
		if (!Ext.isObject(opts)) return;
		var inst = opts.menu;
		var cls = opts.cls;
		var menuEl = inst.menu.hotMenu.container;
		var blurfn = opts.blur;
		var rowinputInst;
		var rowinputEl = Ext.fly(menuEl).child(cls);
		if (rowinputEl)
			rowinputInst = new vmd.InputNumber({
				renderTo: rowinputEl.dom,
				value: opts.value || 1,
				minValue: opts.minValue || 1,
				maxValue: opts.maxValue || 10,
				unit: opts.unit,
				isShowOk: true,
				listeners: {
					afterrender: function() {
						var me = this;
						this.el.on('mousedown', function() {
							me.inputEl.dom.focus()
							stopPP()
						})
					},
					ok: function(sender, val) {
						//okfn(val);
						sender.inputEl.blur();
					},
					blur: function() {
						blurfn(rowinputInst.getValue());

					}

				}
			})
	},
	onRender: function(ct, position) {
		var me = this;
		if (!this.el) {
			this.autoEl = {
				cls: 'vmd-report',
				cn: [{
					cls: 'vmd-report-toolCt',
					cn: [{
						cls: 'vmd-report-toolbar'
					}, {
						cls: 'vmd-report-exp'
					}]
				}, {
					cls: 'vmd-report-grid'
				}, ]
			}
			this.callParent(arguments);

			this.toolCtEl = this.el.first();
			this.toolbarEl = this.toolCtEl.first();
			this.expEl = this.toolCtEl.last();
			this.gridEl = this.el.last();

			//引用designer/report.js
			//顶部工具条
			this.reportToolbar = new ReportToolbar();
			this.toolbarEl.dom.innerHTML = this.reportToolbar.getToolbarTpl();
			//表达式编辑区
			new initWebEditArea(this);
			//初始化报表设计组件
			this.initHdTable();
			if (!this.fillReport) {}

			me.isWebEdit = true;
			if (this.path) {
				if (this.path.indexOf(".json") > -1) {
					this.jsonModelParse(this);
				} else if (this.path.indexOf(".xml") > -1) {
					//this.toolCtEl.dom.hidden = true;
					//me.viewerNode.component.setConfig("isWebEdit", false);
					this.xmlModelParse(this);
				}
			}

			//注册事件
			this.onEventsReg(me, me.grid);
		}

		this.setDrag();

		if (!xds.vmdreportInfo) xds.vmdreportInfo = {};
		if (!xds.vmdreportInfo.list) xds.vmdreportInfo.list = {};
		if (!xds.vmdreportInfo.list[me.id]) {
			xds.vmdreportInfo.list[me.id] = me;
		}

		//修复列表无用对象
		var delInvalidReport = function() {


			for (var key in xds.vmdreportInfo.list) {
				var item = xds.vmdreportInfo.list[key];
				if (item.el && !item.el.dom) delete xds.vmdreportInfo.list[key];
			}
		}
		// 模板信息保存
		xds.vmd.saveReport = function(callBack) {

			delInvalidReport()
			for (var key in xds.vmdreportInfo.list) {
				var me = xds.vmdreportInfo.list[key];
				if (!me.isWebEdit && me.path && me.path.indexOf(".json") == -1) {
					if (callBack) {
						xds.project.save(null, true)
					} else {
						xds.project.save();
					}
					if (callBack) {
						callBack();
					}
					return;
				}
				me.path = getUrlParam("name") + "_" + me.viewerNode.id + ".json";
				me.relativepath = "report/modules/" + getUrlParam("id");

				me.viewerNode.component.setConfig("path", me.path);
				me.viewerNode.component.setConfig("relativepath", me.relativepath);
				me.viewerNode.component.setConfig("isWebEdit", true);
				var reportInfo = me.grid.saveRptInfo();
				if (reportInfo && reportInfo.main) {
					if (reportInfo.main.datasource && reportInfo.main.datasource.tables) {
						var datasets = "";
						for (var key in reportInfo.main.datasource.tables) {
							datasets += reportInfo.main.datasource.tables[key].factname + ",";
						}
						datasets = datasets.substring(0, datasets.length - 1);
						me.viewerNode.component.setConfig("dsnames", datasets);
					}
					var sc = reportInfo.main.body.sections;

					if (sc && sc.length > 0) {
						if ((sc[0].title && sc[0].title.length > 0) || (sc[0].header && sc[0].header.length > 0) || (sc[0].data && sc[0].data.length > 0)) {
							//var host = vmd.workspace ? (vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp) : vmdSettings.dataServiceIp;
							//var hwRao = new HwRao(host, "report"); //地址:端口和存储标识(服务管理员分配)
							var filePath = me.relativepath + "/" + me.path;
							var fileContent = Ext.encode(reportInfo);
							me.hwRao.saveJson(filePath, fileContent, function(res) {
								if (res.isSucceed) {
									var str = JSON.stringify(res.data);
									// alert(str);
								}
							}, function(res) {
								Ext.Msg.alert("错误信息", res.errMsg,
									function() {})
							});

						}
						if (callBack) {
							xds.project.save(null, true)
						} else {
							xds.project.save();
						}
						if (callBack) {
							callBack();
						}
					} else {
						me.path = "";
						if (callBack) {
							xds.project.save(null, true)
						} else {
							xds.project.save();
						}
						if (callBack) {
							callBack();
						}
						return;
					}
				}
			}
		}
	},
	onResize: function(w, h) {
		var toolbarH = this.toolCtEl.getHeight();
		var me = this;
		if (h > 100) {
			this.grid.updateSettings({
				height: h - toolbarH,
				width: w
			}, false)
		}
	},
	afterRender: function() {
		this.callParent(arguments);
		//	if (this.path && !this.isWebEdit) {
		if (this.path && this.fillReport) {
			//Ext.Msg.alert("提示", "加载模板方式不能编辑！", function () { })
			return;
		}
		//return;
		//去掉遮罩层
		function hideFilm(parentNode) {
			var t = document.getElementById("film-for-" + parentNode.id);
			if (t) {
				var designerCmp = parentNode.component;

				//if (parentNode.component && parentNode.component.cid != 'tabpanel') {
				//    t.style.display = "none";
				//}
				if (designerCmp && (designerCmp.cid == 'panel' || designerCmp.cid == 'tabpanel')) {
					var cmp = Ext.getCmp(designerCmp.activeCmpId);
					cmp._isRpt = true;
				}
				hideFilm(parentNode.parentNode);
			}
		}
		var t = document.getElementById("film-for-" + this.viewerNode.id);
		if (t) {
			t.style.display = "none";
			hideFilm(this.viewerNode.parentNode);
			//主viewport的遮罩层去掉
			var rootId = xds.inspector.root.childNodes[0].id;
			var rootMsk = document.getElementById("film-for-" + rootId);
			Ext.defer(function() {
				if (rootMsk) rootMsk.style.display = 'none';
			}, 100)
		}
	},

	// json结构模板的解析
	jsonModelParse: function(me) {
		//me.myMask.show();
		//var host = vmd.workspace ? (vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp) : vmdSettings.dataServiceIp;
		var filename = me.relativepath + "/" + me.path;
		var url = vmd.vmdUploadPath + 'FileService?FileName=' + filename;

		var myMask2 = new Ext.LoadMask(xds.canvas.el, {
			msg: '模板解析中，请稍后...'
		});

		myMask2.show();

		//var hwRao = new HwRao(host, "report");
		//var hwRao = new HwRao("192.168.1.181:8052", "report");
		me.hwRao.getJson(filename,"",
			function(result) {
				var reportInfo = Ext.decode(result.data);
				me.grid.loadWebModelOnClould(reportInfo, me.grid);
				myMask2.hide();
			},
			function(msg, f) {
				myMask2.hide();
				Ext.Msg.alert("错误信息", msg,
					function() {})
			});
	},
	// xml模板的解析
	xmlModelParse: function(me) {
		//me.myMask.show();
		//var host = vmd.workspace ? (vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp) : vmdSettings.dataServiceIp;
		filePath = me.relativepath + "/" + me.path
		if (me.relativepath == "Resources//Report") {
			filePath = "report/" + filePath;
		}
		//var urlPath = "http://" + host + "/ReportService/report/json?host=" + host + "&filepath=" + filePath;
		var myMask2 = new Ext.LoadMask(xds.canvas.el, {
			msg: '模板解析中，请稍后...'
		});

		myMask2.show();

		//var hwRao = new HwRao(host, "report");
		me.hwRao.getJson(filePath,"",
			function(result) {
				try {
					var reportInfo = Ext.decode(result.data);
					var s = "";
					if (reportInfo && reportInfo.main && reportInfo.main.datasource && reportInfo.main.datasource.tables) {
						var tb = reportInfo.main.datasource.tables;
						var data = [];
							for (key in tb) {
							var storeName = tb[key];
							s += storeName.factname + ",";
							//var base = new Base64();
                            var resultInfo=storeName.saveserver;
							//var rptInfo = base.decode(storeName.saveserver);
						    //var resultInfo = vmd.xml2json(rptInfo)
							//var resultInfo = dhx4.ajax.parse(rptInfo);
							if (resultInfo) {
								var store = "{";
								if (resultInfo.id) {
									store += "\"id\":\"" + resultInfo.id + "\",";
								}
								if (resultInfo.params && resultInfo.params.CallCode ) {
										var callcode = resultInfo.params.CallCode.replace(/\"/g, "");
									store += "\"callcode\":\"" + callcode + "\",";
								}
								if (resultInfo.path) {
									store += "\"url\":\"" + resultInfo.path + "\",";
								}

								store += "\"host\":\"\",";
								store += "\"isHwRest\":true,";
								if (resultInfo.name) {
									store += "\"name\":\"" + resultInfo.name + "\",";
								}
								store += "\"fields\":[],";
								store += "\"getMethods\":[],";
								store += "\"postMethods\":[],";
								store += "\"putMethods\":[],";
								store += "\"deleteMethods\":[],";
								store += "\"saveMethods\":[]";
								store += "}";
								var name = storeName.factname || resultInfo.name || resultInfo.id;
								data.push({
									cid: 'vmdJsonStore',
									id: name,
									storeConfig: store,
									autoLoad: false,
									dsName: storeName.name || storeName.factname
								});
								if (xds.vmd.getStoreByDsName(name) || xds.vmd.getStoreByDsName(storeName.factname)) {
									continue;
								}
                                var isChecked=/^[\u4e00-\u9fa5]*\w*$/.test(name);
                                if(!isChecked){
                                    Ext.Msg.alert("错误信息", "数据集命名不规范，含有特殊字符，请修改后再试！",
                                        function() {});
                                    myMask2.hide();
                                    return;
                                }
								parent.xds.vmd.addNode(data)
							}
						}
					}
					if (s.length > 1) {
						s = s.substring(0, s.length - 1);
					}
					//me.dsnames= s;
					me.viewerNode.component.setConfig("dsnames", s);
					//Ext.defer(function(){me.viewerNode.component.setConfig("dsnames", s);},2000)
					me.grid.loadWebModelOnClould(reportInfo, me.grid);
					if (reportInfo.main.submitrules && reportInfo.main.submitrules.length > 0) {
						me.isWebEdit = false;
						me.fillReport=true;
						me.toolCtEl.dom.hidden = true;
						me.grid.updateSettings({
							readOnly: true
						})
					}
					myMask2.hide();
				} catch (ex) {
					myMask2.hide();
				}
			},
			function(msg, f) {
				myMask2.hide();
				Ext.Msg.alert("错误信息", msg,
					function() {})
			});
	},

	// 分栏分片获取合并单元格的第一个单元格进行图形标识绘制 
	//2018.10.27 lf
	getSpanCell: function(me, row, col) {
		var cell = me.grid.cells2(row, col).cell;
		if (cell.colSpan > 1) {
			if (cell._cellIndex + cell.colSpan - 1 == col) {
				return cell;
			}
		}
		if (cell._cellIndex == col) {
			return cell;
		} else {
			cell = me.getSpanCell(me, row, col - 1);
			if (cell._cellIndex != col) {
				cell = me.getSpanCell(me, row - 1, col)
			}
			if (cell._cellIndex != col) {
				cell = me.getSpanCell(me, row - 1, col - 1)
			}
		}
		return cell;
	},
	//获取使用的数据集
	getApplayDataset: function(name, ds) {
		// 
		for (var key in ds) {
			if (name == ds[key].id) {
				return ds[key];
			}
		}
		return null;
	},
	//获取可视化中定义的所有数据集
	getDatasetNames: function() {
		var names = {};
		var i = 0;
		var storeRoot = xds.vmd.getRootNode("dataset");
		if (storeRoot) {
			storeRoot.eachChild(function(n) {
				names[i] = n;
				i++
			}, this);
		}

		return names;
	},
	setDrag: function(el) {
		var me = this;
		var formPanelDropTargetEl = this.el;
		dataArr = [];
		var formPanelDropTarget = new Ext.dd.DropTarget(formPanelDropTargetEl, {

			group: 'TreeDD',
			notifyOver: function(ddSource, e, data) {
				var td = e.target || e.srcElement;
				var nodeCmp = data.node && data.node.component;

				if (td.tagName == 'TD') {
					vmd(me.grid.table).find('td').removeClass('cell-active').removeClass('cell-active-leftnone');
					if (nodeCmp.config.xtype == "vmd.jsonStore") {
						//多个字段拖拽

						var cellprop = td.cellprop;
						var _inst = cellprop.instance;
						var _row = cellprop.row;
						var _col = cellprop.col;
						var nodes = nodeCmp.node && nodeCmp.node.childNodes;
						var ln = nodes && nodes.length || 1;

						for (var i = 0; i < ln; i++) {
							var td = _inst.getCell(_row, _col + i);

							if (i == 0) {
								vmd(td).addClass('cell-active');
							} else {
								vmd(td).addClass('cell-active-leftnone');
							}

						}


					} else {
						//单个字段拖拽

						vmd(td).addClass('cell-active');
					}

				}
				return "x-dd-drop-ok";
			},
			notifyOut: function(ddSource, e, data) {
				vmd(me.grid.table).find('td').removeClass('cell-active').removeClass('cell-active-leftnone');
			},
			notifyDrop: function(ddSource, e, data) {

				var setNodeConfig = function(_obj) {
					if (Ext.isEmptyObject(_obj.config)) {
						_obj.config = {
							xtype: _obj.cid,
							name: _obj.name
						}
					}
				}
				var setCellInfo = function(val, info, index) {

					cellprop = (e.target || e.srcElement).cellprop;
					if (!cellprop) return
					var cell_col = cellprop.col;
					var cell_row = cellprop.row;
					index = index || 0;
					//var td= cellprop.instance.getCell(cell_row, cell_col + index);
					//vmd(td).text(val)
					var temp = [cell_row, cell_col + index, val];
					dataArr.push(temp)
					// 添加数据集信息
					// if (typeof gridCellInfoObject != 'undefined') {
					// 	if (!cellprop.cellAttributeInfo) {
					// 		cellprop.cellAttributeInfo = new gridCellInfoObject();
					// 	}
					// 	cellprop.cellAttributeInfo.dataSet = info.dataSet;
					// 	cellprop.cellAttributeInfo.field = info.field;
					// 	cellprop.cellAttributeInfo.opration = "single";
					// }
				}

				var tt = e.target;
				var selectCell, cellprop;
				var nodeCmp = data.node && data.node.component;

				if (data && data.node) {
					if (nodeCmp) {
						if (nodeCmp.config) {
							//mafei 兼容处理
							setNodeConfig(nodeCmp);


							if (nodeCmp.config.xtype == "datafield") {

								var val = "=" + nodeCmp.owner.config.id + "." + nodeCmp.config.name;
								setCellInfo(val, {
									dataSet: nodeCmp.owner.config.id,
									field: nodeCmp.config.name
								});
								me.grid.setDataAtCell(dataArr)
								dataArr = [];


							} else if (nodeCmp.config.xtype == "vmd.jsonStore") {
								var nodes = nodeCmp.node && nodeCmp.node.childNodes;
								if (nodes && nodes.length > 0) {
									Ext.each(nodes, function(node, index) {
										var cmp = node.component;
										setNodeConfig(cmp);
										var val = "=" + nodeCmp.id + "." + cmp.config.name;
										setCellInfo(val, {
											dataSet: nodeCmp.owner.config.id,
											field: cmp.config.name
										}, index);
									})
									me.grid.setDataAtCell(dataArr)
									dataArr = [];
								}
							}
						}
					}
				}
				return true;
			}
		});

	},
	// 英文字母的转换
	convert: function(n) {
		var s = '';
		while (n > 0) {
			var m = n % 26;
			if (m == 0) m = 26;
			s = String.fromCharCode(m + 64) + s;
			n = (n - m) / 26;
		}
		return s;
	},
	onEventsReg: function(My, Mygrid) {},
	onEditCell: function(e) {
		// 
	},
	onEnter: function(e) {
		// 
	},
	onDestroy: function() {
		if (this.rendered) {
			//bug修复，清除dhx组件拖拽就在body中累加的combo的dom结构
			Ext.select('body>div[class*=dhxgridlist]').remove();
		}
	}
})


Ext.define("vmd.comp.Report", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.report2_2',
	/**
	 * Read-only. True if this button is disabled
	 * @type Boolean
	 */
	disabled: false,
	/*
	 *type 种类有primary,success,warning,danger,info,text
	 */
	type: 'default',
	clickEvent: 'click',
	/**
	 * @cfg {Boolean} handleMouseEvents
	 * False to disable visual cues on mouseover, mouseout and mousedown (defaults to true)
	 */
	handleMouseEvents: true,
	/**
	 *@cfg {large、small、mini}
	 *默认为空，正常模式
	 */
	size: '',
	/**
	 *变量参数
	 **/
	paramsList: "",
	initComponent: function() {

		this.myMask = new Ext.LoadMask(Ext.getBody(), {
			msg: "数据加载中,请稍后...",
			msgCls: 'z-index:10000;'
		});
		this.callParent();
		//vmd.comp.Grid.superclass.initComponent.call(this);
		this.addEvents(
			/**
			 * @event click
			 * Fires when this button is clicked
			 * @param {Button} this
			 * @param {EventObject} e The click event
			 */
			'click',

			'rowSelect',
			/**
			 * @event mouseout
			 * Fires when the mouse exits the button
			 * @param {Button} this
			 * @param {Event} e The event object
			 */
			'mouseout'

		);
	},

	onRender: function(ct, position) {
		var vmdreport = this;
		vmdreport.myMask.show();

		if (!vmdreport.el) {
			vmdreport.el = document.createElement("div");
			vmdreport.subel = document.createElement("div");
			vmdreport.subel.id = vmdreport.id;
			vmdreport.subel.style.position = "relative";
			vmdreport.el.appendChild(vmdreport.subel);
			//if (vmdreport.fillReport) {
			//	vmdreport.grid = new FillReport(vmdreport.subel, vmdreport);
			//} else {
			vmdreport.hwReport = new HwReport(vmdreport, null, vmdreport.subel, vmdreport.width, vmdreport.height);
			vmdreport.grid = vmdreport.hwReport; //兼容以前的注入脚本
		    // 非常规模式设置加载条数
			if (vmdreport.loadMode && vmdreport.loadMode != "nomal") {
			    // 设置加载模式（nomal:常规；smart:滚动加载；paging：分页）
			    vmdreport.hwReport.setLoadMode(vmdreport.loadMode);
			    if (vmdreport.loadNumber && vmdreport.loadNumber > 0) {
			        vmdreport.hwReport.setPageSize(vmdreport.loadNumber);
			    } else {
			        vmdreport.hwReport.setPageSize(0);
			    }
			}
        }

		//属性赋值
		Ext.applyIf(vmdreport, vmdreport.hwReport);
		//重改指向，保证dhx的原生态
		//this.el = this.el.children[0];
		// Ext.fly(this.el).addClass('vmd-Report');
		//注册事件
		this.onEventsReg(vmdreport, vmdreport.hwReport);
		window[vmdreport.id] = this;
		//vmd.comp.Grid.superclass.onRender.call(this, ct, position);
		this.callParent(arguments);
		this.on("afterrender",
			function() {
				vmdreport.myMask.hide();
			})
	},

	afterRender: function() {

		var vmdreport = this;
		this.callParent(arguments);
		if (vmdreport.path.indexOf(".json") > -1) {
			//this.query();
		}
	},

	onResize: function(w, h) {
		//if (this.fillReport) {
		//	this.grid.setSize();
		//	this.grid.setPosition();
		//} else {
			this.hwReport.setSize();
			this.hwReport.setPosition();
		//}
	},

	onEventsReg: function(My, Mygrid) {

	},

	// 打印
	print: function() {
		var me = this;
		if (me.fillReport) {
			me.grid.grid.clearSelection();
		} else {
			me.grid.clearSelection();
		}
		var reportDom = $('#' + me.id);
		reportDom.removeClass("x-box-item");
		var options = arguments[0] || {};
		options.style = {
			position: ''
		};
		reportDom.print(options);
	},

	// 获取值
	getValue: function(param, context) {
	    var vmdreport = this;
	    return vmdreport.hwReport.getValue(param, context);
	},

	//保存表
	save: function() {
	    var vmdreport = this;
		if (arguments.length == 0) {
		    vmdreport.hwReport.submitdb(vmdreport.hwReport);
		} else if (arguments.length == 1) {
			//save(successCallBack)
			if (typeof arguments[0] === "function") {
			    vmdreport.hwReport.submitdb(vmdreport.hwReport, arguments[0]);
			}
			//save(reportName)
			else {
			    vmdreport.hwReport.submitdb(arguments[0]);
			}
		} else if (arguments.length == 2) {
			//save(successCallBack,errorCallBack)
			if (typeof arguments[0] === "function" && typeof arguments[1] === "function") {
			    vmdreport.hwReport.submitdb(vmdreport.hwReport, arguments[0], arguments[1]);
			}
			//save(reportName,successCallBack)
			else {
			    vmdreport.hwReport.submitdb(arguments[0], arguments[1]);
			}
		} else if (arguments.length == 3) {
			//save(reportName,successCallBack,errorCallBack)
		    vmdreport.hwReport.submitdb(arguments[0], arguments[1], arguments[2]);
		} else {
			Ext.Msg.alert("提示", "参数不正确！",
				function() {})
		}
	},


	//简单网格填报
	load: function(callBack) {
		var vmdreport = this;
		var host = vmd.workspace ? (vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp) : vmdSettings.dataServiceIp;
		var filePath = vmdreport.relativepath + "/" + vmdreport.path;
		if (!vmdreport.isWebEdit && vmdreport.relativepath == "Resources//Report") {
			filePath = "report/" + filePath;
		}
		var hwRao = new HwRao(host, "report");
		hwRao.getJson(filePath,"",
			function(result) {
				var hwReport = vmdreport.hwReport;
				vmdreport.hwReport.loadJSON(result.data, function() {
					vmdreport.myMask.hide();
					if (callBack) {
						callBack.apply(vmdreport, [hwReport.grid, hwReport]);
					}
				});
			},
			function (msg, f) {
			    vmdreport.myMask.hide();
				Ext.Msg.alert("错误信息", msg,
					function() {})
			});
	},

	query: function(callBack, showType) {
		this.myMask.show();
		this.load(callBack);
	},
	
	refresh: function() {
		this.hwReport.refresh();
	},
	/*
	 * newId：新行的id
	 * srcRowId: 要拷贝的行的id
	 * ind: 插入的位置
	 */
	addRow: function(newId, srcRowId, ind) {
		this.hwReport.addRow(newId, srcRowId, ind);
	},

	deleteRow: function(rId) {
		this.hwReport.deleteRow(rId);
	},

	//空方法
	setParamValue: function() {},
	setBeforeInitFunc:function(){}
})