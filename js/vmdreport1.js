
/*this.getFirstParentOfType = function(obj, tag) {
	while (obj && obj.tagName != tag && obj.tagName != "BODY") {
		obj = obj.parentNode;
	}
	return obj;
}*/


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
		this.submitMask = new Ext.LoadMask(Ext.getBody(), {
			msg: "数据保存中,请稍后...",
			msgCls: 'z-index:10000;'
		});
		this.callParent();
		this.addEvents(
			/**
			 * @event click
			 * Fires when this button is clicked
			 * @param {Button} this
			 * @param {EventObject} e The click event
			 */

			'click', 'rowSelect',
			/**
			 * @event mouseout
			 * Fires when the mouse exits the button
			 * @param {Button} this
			 * @param {Event} e The event object
			 */
			'mouseout');

	},

	onRender: function(ct, position) {
		// window.lockColNum = 0;
		// window.judgedRowNum = 0;
		var vmdreport = this;
		vmdreport.myMask.show();

		if (!vmdreport.el) {
			vmdreport.el = document.createElement("div");
			vmdreport.subel = document.createElement("div");
			vmdreport.subel.id = vmdreport.id;
			vmdreport.subel.style = vmdreport.style;
			vmdreport.subel.style.position = "relative";
			vmdreport.el.appendChild(vmdreport.subel);
			vmdreport.hwReport = new HwReport(vmdreport, null, vmdreport.subel, vmdreport.width, vmdreport.height, false, vmdreport.autoWidth, vmdreport.autoHeight);
			vmdreport.hwReport.setAlign(this.align);
			vmdreport.hwReport.setTitle(this.title);
			vmdreport.hwReport.enabledTitleFloat(this.isTitleFloat);
			vmdreport.hwReport.enabledSelecteStates(this.isSelectStates);
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
				if (!vmdreport.isServer && Ext.isIE) {
					var rid = vmdreport.id;
					this.create_MyOcxFrame_activex(rid, rid, "100%", "100%", vmdreport.ocx_version);
				}
				vmdreport.myMask.hide();
			})

	},

	afterRender: function() {
		var vmdreport = this;
		this.callParent(arguments);
	},

	onResize: function(w, h) {
		
		this.hwReport.setSize(w, h - (this.diff || 0));
		this.hwReport.setPosition();
	},

	onEventsReg: function(My, Mygrid) {},



	//report的打印
	print: function(options) {
		var me = this;
		if (!me.isServer && Ext.isIE) {
			var rid = me.id;
			var ocx = document.getElementById(rid + "_ocx");
			ocx.IPrint();
		} else {
			me.hwReport.print(options);
		}
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
		if (vmdreport.loading) {
			return;
		}
		vmdreport.loading = true;
		var host = vmd.projectInfo ? (vmd.projectInfo.reportIp || vmdSettings.vmdReportIp || vmdSettings.dataServiceIp) : vmdSettings.vmdReportIp || vmdSettings.dataServiceIp;
		if (vmdreport.relativepath && vmdreport.path) {
			var filePath = vmdreport.relativepath + "/" + vmdreport.path;
			vmdreport.configPath = vmdreport.relativepath + "/" + vmd.getUserId() + "_" + vmdreport.path;
			//  vmdreport.hwReport.configFile= vmdreport.relativepath + "/"+ vmd.getUserId()+"_"+ vmdreport.path;
			vmdreport.hwReport.configFile = {};
			vmdreport.hwReport.configFile.rptHeaderPath = vmdreport.relativepath + "/" + vmd.getUserId() + "_" + vmdreport.path;;
			vmdreport.hwReport.configFile.rptHeaderHost = "";
			vmdreport.hwReport.xmlModelXml = vmdreport.relativepath + "/" + vmdreport.path;
			vmdreport.hwReport.dataSetList = vmdreport.dsnames;
			if (vmdreport.relativepath.indexOf("report/") == -1 && (vmdreport.relativepath.indexOf("Resources//Report") != -1 || vmdreport.relativepath.indexOf("Resources/Report") != -1)) {
				filePath = "report/" + filePath;
			}
			var hwRao = new HwRao(host, "report");
			if (vmdreport.isServer == undefined || vmdreport.isServer || !Ext.isIE) {
				if (vmdreport.isServer == false && !Ext.isIE) {
					vmdreport.myMask.hide();
					vmd.alert("提示", "ocx报表只允许在ie内核32位浏览器下运行展示！");
					return;
				}
				hwRao.getJson(filePath, vmdreport.dsnames,
					function(result) {
						var hwReport = vmdreport.hwReport;
						vmdreport.hwReport.loadJSON(result.data, function() {
						    hwReport.headerdefine = eval("(" + result.data + ")"); //JSON.parse(result.data);
							vmdreport.myMask.hide();
							vmdreport.loading = false;
							vmdreport.grid = hwReport.grid; //兼容以前的注入脚本
							vmdreport.grid.grid = hwReport.grid; //兼容以前的注入脚本
							if (callBack) {
								callBack.apply(hwReport, [hwReport.grid, hwReport]);
							}
						});
					},
					function(msg, f) {
						vmdreport.myMask.hide();
						Ext.Msg.alert("错误信息", msg,
							function() {})
					}, vmdreport.hwReport.configFile);
			} else {
				//vmdreport.myMask.hide();
				vmd.isOcx = true;
				var rid = vmdreport.id;
				var ocx = document.getElementById(rid + "_ocx");
				ocx.style.height = (this.ownerCt.getHeight() - 2) + "px";
				ocx.style.width = this.ownerCt.getWidth() + "px";
				var ds, paths = "",
					bspar = "",
					m_host = "",
					params = "";
				if (vmdreport.dsnames) {
					ds = vmdreport.dsnames.split(",");
				}
				ocx.IClear();
				ocx.ISetInterFaceName("ISetTheWayOfSqlExcute", 1, 0);
				ocx.ISetParamValueAndType("2", "string");
				hwRao.getJson(filePath, vmdreport.dsnames,
					function(result) {
						ocx.ISetInterFaceName("ISetReportModelJson", 1, 0);
						ocx.ISetParamValueAndType(result.data, "string");
						if (vmdreport.align == "center") {
							ocx.ISetReportAttribute("ReportAlgin", "center");
						} else if (vmdreport.align == "left") {
							ocx.ISetReportAttribute("ReportAlgin", "left");
						} else if (vmdreport.align == "right") {
							ocx.ISetReportAttribute("ReportAlgin", "right");
						}
						if (vmdreport.title) {
							ocx.ISetInterFaceName("ISetTableTitle", 1, 0);
							var title = eval("(function(){" + vmdreport.title + "}())");
							ocx.ISetParamValueAndType(title, "string");
						}
						if (ds && ds.length > 0) {
							var qCount = 0;
							vmdreport.getRptData(ds, ocx, host);
							if (qCount == ds.length) {
								ocx.IShowReport(); //显示报表
							}
						}
					},
					function(msg, f) {
						vmdreport.myMask.hide();
						vmdreport.loading = false;
						Ext.Msg.alert("错误信息", msg,
							function() {})
					}, vmdreport.configFile);
			}
		} else {
			vmdreport.myMask.hide();
			vmdreport.loading = false;
		}

	},
	getRptData: function(ds, ocx, host) {
		var vmdreport = this;
		var qCount = 0,
			bspar = "",
			m_host = "";
		for (var i = 0; i < ds.length; i++) {
			(function(dstable, ds) {
				var d = eval(dstable);
				m_host = d.storeConfig.host;
				bspar = d.storeConfig.callcode;
				var param = {};
				if (d.storeConfig.getMethods.length > 0) {
					for (var k = 0; k < d.storeConfig.getMethods.length; k++) {
						var valueExp = d.storeConfig.getMethods[k].value1 == "" ? (d.storeConfig.getMethods[k].value2 == "" ? 'return ""' : d.storeConfig.getMethods[k].value2) : d.storeConfig.getMethods[k].value1;
						var paramValue = eval("(function(){" + valueExp + "})()");
						param[d.storeConfig.getMethods[k].id] = paramValue;
					}
				}
				var pDasSerIp = (vmd && vmd.projectInfo && vmd.projectInfo.dataServiceIp) ? vmd.projectInfo.dataServiceIp : ""
				var wDasSerIp = (vmd && vmd.workspace && vmd.workspace.dataServiceIp) ? vmd.workspace.dataServiceIp : ""
				host = pDasSerIp || wDasSerIp || vmdSettings.dataServiceIp
				var hwDao = new HwDao(host, "vmdcode", true, 20 * 1000); //地址:端口,授权码(服务管理员分配),是否异步,超时时间(单位ms)
				var url = d.storeConfig.url; //服务相对路径
				// var param = { a: "", b: "" };//查询参数
				//分页:startindex: 记录开始索引, pagesize: 获取数据量
				/*var header = {
					startindex: 0,
					pagesize: 100
				};*/
				var header = {};
				hwDao.get(url, header, param, function(res) {
					if (res.isSucceed) {
						// res.data[0].name= d.storeConfig.name;
						res.data[0].name = dstable;
						// var m_ds = JSON.stringify(res.data);
						var m_ds = Ext.encode(res.data);
						//  alert(str);
						ocx.ISetInterFaceName("ISetDsFromJsonStr", 1, 0);
						ocx.ISetParamValueAndType(m_ds, "string");
						qCount++;
						if (qCount == ds.length) {
							vmdreport.myMask.hide();
							vmdreport.loading = false;
							ocx.IShowReport(); //显示报表
						}
					} else {
						vmdreport.myMask.hide();
						vmdreport.loading = false;
						alert(res.errMsg);
					}
				}, function(res) {
					vmdreport.myMask.hide();
					vmdreport.loading = false;
					alert(res);
				});

			})(ds[i], ds)

		}
	},

	// 创建ocx
	create_MyOcxFrame_activex: function(parentID, strID, width, height, ActiveX_MyOcxFrame_Ver) {
		var parentObj = document.getElementById(parentID);
		var subHtml = "<OBJECT classid=clsid:8E524DF7-B332-499E-BEC5-430F30C70A9A" + " id=" + strID + "_ocx" + " " + " name=" + strID + "_ocx" + " " + " codebase='" + vmd.bootPATH + "/report/ocx/ReportCanvas31.cab#Version=" + ActiveX_MyOcxFrame_Ver + "' " + " style= 'HEIGHT:" + height + "; WIDTH: " + width + ";ALIGN:center;'></OBJECT> ";
		parentObj.innerHTML = subHtml;
		eval("function " + strID + "_ocx:: FireOnLeftHyperLinkEx(m_Event,sParam){  if(window.onLeftLinkClick){ var arguments=[];  arguments=sParam; window.onLeftLinkClick(arguments);}else{  Ext.getCmp('" + strID + "').events[m_Event].listeners[0].fn.call(null,null,null,null,sParam); }  }");
		eval("function " + strID + "_ocx::FireOnRightMenuEx(m_Event,EventParam){  Ext.getCmp('" + strID + "').events[m_Event].listeners[0].fn.call(null,null,null,null,null,EventParam);   }")
	},
	// 字段选择
	selectFields: function() {
		var me = this;
		var rid = me.id;
		if (!me.isServer && Ext.isIE) {
			var ocx = document.getElementById(rid + "_ocx");
			ocx.ISetSelectFieldsButtonEnable("leftmove");
			ocx.ISetSelectFieldsButtonEnable("rightmove");
			var name = me.path.substring(0, me.path.indexOf(".xml"));
			ocx.IDoSelectFields("c:\\HwTemplet\\" + name + ".txt");
		} else {
			me.hwReport.selectWin = selectField(me.hwReport, me.hwReport.configGrid, me.hwReport.configFile, rid);
		}
	},
	// 导出/另存为excel
	exportExcel: function(params) {
		var me = this;
		if (!me.isServer && Ext.isIE) {
			var rid = me.id;
			var ocx = document.getElementById(rid + "_ocx");
			ocx.ISave();
		} else {
			this.hwReport.exportExcel(params);
		}

	},

	//填报导入excel文件
	importExcel: function(sender, callback) {
		if (typeof sender == "function") {
			callback = sender;
			sender = undefined;
		}
		var vmdreport = this;
		if (!vmdreport._importInputButton) {
		    var inputdiv = document.createElement("div");
		    inputdiv.id = "upload_excel_file_div";
		    document.body.appendChild(inputdiv);
		    inputdiv.style.hidden = "hidden";
		    var input = ' <input type="file" id="upload_excel_file" hidden="hidden" >';
		    inputdiv.innerHTML = input;

		    var host = vmd.projectInfo ? (vmd.projectInfo.reportIp || vmdSettings.vmdReportIp || vmdSettings.dataServiceIp) : vmdSettings.vmdReportIp || vmdSettings.dataServiceIp;
		    var hwRao = new HwRao(host, "report");
		    var url = hwRao.getImportExcelUrl();
		    var excelInput = vmdreport._importInputButton = document.getElementById("upload_excel_file");
		    excelInput.url = url;
		    //excelInput.click();
		    excelInput[-[1, ] ? "onchange" : "onpropertychange"] = function () {
		        var fd = new FormData();
				if(!excelInput.files[0])
					return;
		        fd.append("file", excelInput.files[0]);
		        var msg = Ext.MessageBox;
		        vmd.ajax({
		            url: url,
		            type: 'POST',
		            cache: false,
		            data: fd,
		            processData: false,
		            contentType: false,
		            dataType: "json",
		            beforeSend: function () {
		                uploading = true;
		            },
		            success: function (data) {
		                if (data.isSucceed) {
							datas=data.data;
							if (vmd.isString(data.data)) {
								eval("dhtmlx.imptemp=" + data.data + ";");
								datas = dhtmlx.imptemp;
							}
							vmdreport.fireEvent("beforeImpDatas", vmdreport, datas);
		                    vmdreport.hwReport.loadData(datas, "", callback);
							vmdreport.fireEvent("afterImpDates", vmdreport, datas);
		                }
		                else {
		                    Ext.Msg.show({
		                        title: "导入失败！",
		                        msg: data.errMsg,
		                        buttons: Ext.Msg.OK,
		                        icon: Ext.Msg.ERROR
		                    });
		                }
		            },
		            error: function (data) {
		                Ext.Msg.show({
		                    title: "导入失败！",
		                    msg: '上传失败，请重新上传！',
		                    buttons: Ext.Msg.OK,
		                    icon: Ext.Msg.ERROR
		                });
		            },
		            complete: function () {
		                //msg.hide();
		            }
		        });
		    }
		    excelInput.click();
		}
		else {
		    vmdreport._importInputButton.value = "";
		    vmdreport._importInputButton.click();
		}
	},
	query: function(callBack, showType) {
		this.myMask.show();
		this.load(callBack);
	},

	// 获取值
	getValue: function(param, context) {
		var vmdreport = this;
		return vmdreport.hwReport.getValue(param, context);
	},

	//设置单元格的值，report.setValue("A1","123"),或者report.setValue(0,0,"123")
	setValue: function() {
		this.hwReport.setValue.apply(this.hwReport, arguments);
	},
	refresh: function() {
		this.hwReport.refresh();
	},
	/*
	 * newId：新行的id
	 * srcRowIndex: 要拷贝的行的索引
	 * insertInd: 插入的位置
	 */
	addRow: function(newId, srcRowIndex, insertInd, carrys) {
		this.hwReport.addRow(newId, srcRowIndex, insertInd, carrys);
	},

	/*
	 * 添加多行
	 */
	addRows: function(startRowIndex, rowsNum) {
		this.hwReport.addRows(startRowIndex, rowsNum);
	},
	deleteRow: function(rIndex) {
		this.hwReport.deleteRow(rIndex);
	},
	deleteGroupRow: function(rIndex) {
		this.hwReport.deleteGroupRow(rIndex);
	},
	getCells: function(param, contextCell) {
		return this.hwReport.getCells(param, contextCell);
	},
	getCell: function(param, contextCell) {
		var cells = this.hwReport.getCells(param, contextCell);
		if (cells && cells.length > 0) {
			return cells[0];
		}
		return null;
	},
	getRerport: function(name) {
		return this.hwReport.getReport(name);
	},
	//空方法
	// 下载excel模版
	loadExcel: function() {},
	setParamValue: function() {},
	setBeforeInitFunc: function() {},
	getFillReport: function() {
		return this.hwReport;
	},
	reportResize: function(diff) {
		var that = this;
		this.diff = diff = diff || 0;
		var hwReport = this.hwReport;
		var clientHeight = hwReport.grid.obj.clientHeight + (diff || 0);

		var hdrHeight = hwReport.grid.hdrBox.clientHeight;
		//Ext.get(hwReport.grid.objBox).setHeight(clientHeight);
		document.body.style.overflow = "auto";
		var _height = hdrHeight + clientHeight;
		this.height = _height;
		this.el.setHeight(_height);
		this.el.dom.parentNode.style.height = _height + "px";
		//this.ownerCt.setHeight(_height);
		hwReport.autoHeight = true;
		hwReport.setSize(null, _height - diff);
		hwReport.setPosition(null, _height - diff);
		hwReport.grid.objBox.style.overflow = "hidden";
		this.el.dom.parentNode.style.overflow = "hidden";

		if (!this.onRowAddedEventId) {
			this.onRowAddedEventId = hwReport.grid.attachEvent("onRowAdded", function(newId) {
				that.reportResize(diff);
				return true;
			});
		}
		if (!this.onRowDeletedEventId) {
			this.onRowDeletedEventId = hwReport.grid.attachEvent("onAfterRowDeleted", function(newId) {
				that.reportResize(diff);
				return true;
			});
		}
	},
	setTitle: function(title) {
		this.hwReport.setTitle(title);
	},
	fillReportResize: function(diff) {
		this.reportResize.apply(this, [diff]);
	},
	copyToClipboard: function(options) {
		this.hwReport.copyToClipboard(options);
	},
	// 填报导出
	exportExcelFillRpt: function() {
		this.exportExcel();
	},
	//设置某列复选框是否选中
	setColumnCheck: function(col, bool) {
		this.hwReport.setColumnCheck(col, bool);
	},
	//检查某列的复选框是否全部处于选中状态
	isCheckedAll: function(col) {
		return this.hwReport.isCheckedAll(col);
	},
	//下一条
	nextItem: function() {
		this.hwReport.nextItem();
	},
	//上一条
	preItem: function() {
		this.hwReport.preItem();
	},
	//跳转到第几条
	jumpToItem: function(number) {
		this.hwReport.jumpToItem(number);
	}
})
