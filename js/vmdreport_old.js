//#region Report 报表组件   原先写在ide-ext.js中
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
			nousedataset: false,
			isServer:true,
			ocx_version:"1,1,5,16",
			rptVersion: "2.2"
		},
		//属性设置
		configs: [{
			name: "click",
			group: "事件",
			editor: "ace",
			ctype: "string"

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
				// url: '/modules/eQ9ULgcVb1/hw880ccc70/hw07ddcc2b/hw877497f2.html',
				url: '/report/FillReport2.0/sevice/dhtmlxform_item_upload.ashx?mode=html5&isWdk=false&uploadPath=report/Resources/Report',
				fileid: 'file',
				callback: function(vmdreport) {
					vmdreport.component.setConfig("isWebEdit", false);
				}
				// url: '/modules/hw39dc4349/hw5b7dcf6f/hwfc106fe1.html',
				// height: 260
				// width: 340,
				//  title: '模版选择'
			}
		},{
            name: "isServer",
            group: "外观",
            ctype: "boolean"
        },{
			name: "ocx_version",
			group: "外观",
		   ctype: "string"
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
			// editor: 'css'
			// ctype: "frame",
			//  editor: "defineWindow",
			// edConfig: {
			// url: '/modules/eQ9ULgcVb1/hw880ccc70/hw07ddcc2b/hw877497f2.html',
			// url: '/modules/hw39dc4349/hw5b7dcf6f/hwfc106fe1.html',
			// height: 260
			// width: 340,
			//  title: '模版选择'
			//}
		}, {
			name: "dsnames",
			group: "外观",
			ctype: "string",
			readOnly: true
		}, {
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
		},
		onFilmDblClick: function(b) {
			//双击值编辑功能
			var a = this.getExtComponent();
			xds.canvas.startEdit(this, a.el, this.getConfigObject("text"), 80)
		}

	});

//判断ele是否含有cls类名   
function hasClass(ele, cls) {
	if (ele.dom) {
		return ele.dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}
}
//元素移除class
function removeClass(ele, cls) {
	if (hasClass(ele, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		ele.dom.className = ele.dom.className.replace(reg, ' ');
	}
}
if (typeof xds != "undefined")
	xds.Registry.register(xds.vmdReport)
//#endregion


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

	initComponent: function() {

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
	getTemplateArgs: function() {
		// return [this.type, 'x-btn-' + this.scale + ' x-btn-icon-' + this.scale + '-' + this.iconAlign, this.iconAlign, this.cls, this.id];
		return {
			skin: this.skin,
			width: this.width,
			height: this.height,
			columns: this.columns
		}
	},
	_resizeHeight: function() {
		var me = this;
		var tiemout = 200

		//重置高度
		Ext.defer(function() {
			var ownerWidth = me.ownerCt.getWidth();
			if (document.getElementById('valueInput')) document.getElementById('valueInput').style.width = (ownerWidth - 100) + "px"

			var diff = Ext.isIE ? 48 : 14;
			if (me.expEl)
				me.grid.objBox.style.height = (me.el.getHeight() - me.expEl.clientHeight - 30) + "px";

			if (me.gridEl.clientWidth > ownerWidth)
				me.gridEl.style.width = ownerWidth + "px";
			//修复滚动错列
			me.grid.hdr.style.borderCollapse = "separate";

		}, tiemout)
	},
	onRender: function(ct, position) {
		var me = this;

		if (!this.el) {
			this.el = document.createElement("div");
			var subel = document.createElement("div");
			if (!this.path || this.isWebEdit) {
				var exp = document.createElement("div");
				this.el.appendChild(exp);
				this.expEl = exp;
			}

			this.gridEl = subel;
			this.el.appendChild(subel);

			if (!me.height) me.height = document.body.clientHeight - 140;

			//绑定属性面板中的size到网格中
			if (!isNaN(me.height) && me.height) this.el.style.height = me.height + "px";
			if (!isNaN(me.width) && me.width) this.el.style.width = me.width + "px";

			me.grid = new dhtmlXGridObject(subel);

			this.el.id = this.id;

			if (!this.path || this.isWebEdit) {
			//if (!this.fillReport) {
				this.initWebEditArea(exp);
			}

			if (this.path) {

				hwDas.ajax({
					das: false,
					url: "/report/OnRequestServerVMD2.0.asmx/GetServerReportDataJson_VMD",
					type: 'post',
					contentType: "application/json;charset=utf-8",
					timeout: 10000,
					dataType: "text",
					data: {
						ModelXml: this.relativepath + "/" + this.path
					},
					success: function(result) {
						result = eval('(' + result + ')');
						var resultInfo = Ext.decode(result.d);
						if (resultInfo.isFillReport == "true") {
								me.viewerNode.component.setConfig("fillReport", true)
							} else {
								me.viewerNode.component.setConfig("fillReport", false)
							}
							if (resultInfo.useds == "true") {
								me.viewerNode.component.setConfig("nousedataset", true)
							} else {
								me.viewerNode.component.setConfig("nousedataset", false)
							}

							var s = "";
							if (resultInfo.dataset.length > 0) {
								// me.dataset = resultInfo.dataset;
								var data = [];
								var dsbynames=resultInfo.dsbynames;
								var dds=dsbynames.split(',');
								for (var i = 0; i < resultInfo.dataset.length; i++) {
									// var store = "{\"storeConfig\":{";
									var store = "{";
									// store += "\"id\":\"" + resultInfo.dataset[i].serverid + "\",";
									store += "\"id\":\"" + resultInfo.dataset[i].id + "\",";
									store += "\"callcode\":\"" + resultInfo.dataset[i].CallCode + "\",";
									store += "\"url\":\"" + resultInfo.dataset[i].path + "\",";
									store += "\"host\":\"\",";
									store += "\"isHwRest\":true,";
									store += "\"name\":\"" + resultInfo.dataset[i].name + "\",";
									store += "\"fields\":[],";
									store += "\"getMethods\":[],";
									store += "\"postMethods\":[],";
									store += "\"putMethods\":[],";
									store += "\"deleteMethods\":[],";
									store += "\"saveMethods\":[]";
									store += "}";
									var name = resultInfo.dataset[i].name || resultInfo.dataset[i].serverid || resultInfo.dataset[i].id;
									data.push({
										cid: 'vmdJsonStore',
										id: name,
										storeConfig: store,
										autoLoad: false,
										dsName:dds[i]
									});
									if (i != resultInfo.dataset.length - 1) {
										s += name + ",";
									} else {
										s += name;
									}
								
									//  data = [{ cid: 'vmdJsonStore', id: 'aaaaa' }];
									if(xds.vmd.getStoreByDsName(name)||xds.vmd.getStoreByDsName(dds[i])){
										continue;
									}
									parent.xds.vmd.addNode(data)
							    }
						   }
							me.viewerNode.component.setConfig("dsnames", s)
							me.viewerNode.component.setConfig("rptType", resultInfo.rptType)
							// 子报表数据集
							var rptds = "";
							if (resultInfo.subrptdataset.length > 0) {
								// me.dataset = resultInfo.dataset;
								var data = [];
								for (var i = 0; i < resultInfo.subrptdataset.length; i++) {
									// var store = "{\"storeConfig\":{";
									var store = "{";
									store += "\"id\":\"" + resultInfo.subrptdataset[i].id + "\",";
									store += "\"callcode\":\"" + resultInfo.subrptdataset[i].CallCode + "\",";
									store += "\"url\":\"" + resultInfo.subrptdataset[i].path + "\",";
									store += "\"host\":\"\",";
									store += "\"isHwRest\":true,";
									store += "\"name\":\"" + resultInfo.subrptdataset[i].name + "\",";
									store += "\"fields\":[],";
									store += "\"getMethods\":[],";
									store += "\"postMethods\":[],";
									store += "\"putMethods\":[],";
									store += "\"deleteMethods\":[],";
									store += "\"saveMethods\":[]";
									store += "}";
									var name = resultInfo.subrptdataset[i].name || resultInfo.subrptdataset[i].serverid || resultInfo.subrptdataset[i].id;
									data.push({
										cid: 'vmdJsonStore',
										id: name,
										storeConfig: store,
										autoLoad: false
									});
									if (i != resultInfo.subrptdataset.length - 1) {
										rptds += name + ",";
									} else {
										rptds += name;
									}
									if(xds.vmd.getStoreByDsName(name)){
										continue;
									}
									parent.xds.vmd.addNode(data)
								}
							}
							me.viewerNode.component.setConfig("subrptds", rptds);
						
						if (!me.isWebEdit) {
						//if (resultInfo.isFillReport == "true" || resultInfo.isSubReport == "true") {
							me.loadToolModel(result);
						} else {
							me.loadWebModel(result);
						}
						if(me.point){
							Ext.Msg.alert("提示", "报表中引用的数据集，在数据集管理中找不到对应项，请自行核实并进行添加或别名匹配！", function() {})
						}

						if (!me.width) {
							if (me.ownerCt) {
								me.ownerCt.doLayout();
							}
							xds.canvas.syncAll();
						}
						//	me._resizeHeight()
					},
					error: function(msg, f) {
						// debugger
						Ext.Msg.alert("提示", "获取数据信息失败", function() {})

						//me._resizeHeight()
					}
				})
			}
			//me.grid.getPosition=null;
			//属性赋值
			Ext.applyIf(me, me.grid);
			//重改指向，保证dhx的原生态
			//this.el = this.el.children[0];
			Ext.fly(this.el).addClass('vmd-report');

			//注册事件
			this.onEventsReg(me, me.grid);
			window[me.id] = this;
		}
		//vmd.comp.Grid.superclass.onRender.call(this, ct, position);
		this.callParent(arguments);
		this.setDrag(this.el);
		
		        if(!xds.vmdreportInfo) xds.vmdreportInfo={};
        if(!xds.vmdreportInfo.list) xds.vmdreportInfo.list={};
        if(!xds.vmdreportInfo.list[me.id]){
            xds.vmdreportInfo.list[me.id]=me;
        }

		// 模板信息保存
		xds.vmd.saveReport = function(callBack) {
			 for (var key in xds.vmdreportInfo.list) {
               var me=xds.vmdreportInfo.list[key];
			   me.viewerNode.component.setConfig("isWebEdit", false);
					if (!me.path) {
						//me.viewerNode.component.setConfig("isWebEdit", true);
						me.path = getUrlParam("name")+"_"+me.viewerNode.id + ".xml";
					}
					else if (!me.viewerNode.component.getConfig().isWebEdit) {
					//else if (me.fillReport) {
						if (callBack) {
							callBack();
						}
						// 保存vmd文件
						if (callBack) {
							xds.project.save(null, true)
						} else {
							xds.project.save();
						}
						return;
					}
					var reportInfo = me.grid.savaRptInfo();
					if(reportInfo.rownum==0&&reportInfo.colnum==0){
						me.path ="";
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
					var ds = "";
					//xds.vmd.getStoreNames();
					var dstongyi=false;
					var datasets = me.getDatasetNames();
					if (reportInfo.datasets && reportInfo.datasets.length > 0) {
						for (var j = 0; j < reportInfo.datasets.length; j++) {
							var dss=xds.vmd.getStoreByDsName(reportInfo.datasets[j]);
								if(dss!=reportInfo.datasets[j]){
								  dstongyi=true;
								 }
							if (j == 0) {
								ds += dss;
							} else {
								ds += ",";
								ds += dss;
							}
							var s = {};
							var applayds = me.getApplayDataset(dss, datasets);
							if (applayds && applayds.component && applayds.component.config) {
								var config = Ext.decode(applayds.component.config.storeConfig);
								if (config) {
									s.name = "";
									s.factname = dss;
									s.id = config.id;
									s.callcode = config.callcode;
									s.server_name = config.name;
									s.path = config.url;
								}
							}
							reportInfo.dataSetsInfo[j] = s;
						}
					}
					me.viewerNode.component.setConfig("dsnames", ds);
					me.viewerNode.component.setConfig("path", me.path);
					
					if(dstongyi)
					{
						 Ext.Msg.confirm("提示", "点击确定按钮，报表模板中数据集别名将被统一成实际名，否则不进行统一！", function(type) {
						// Ext.Msg.alert("提示", "报表模板中数据集别名将被统一成实际名！", function(type) {
							if(type == "yes") {
								// 保存vmd文件
								if (callBack) {
									xds.project.save(null, true)
								} else {
									xds.project.save();
								}
								me.queryReport(me,reportInfo,callBack,"1");
							} else
							{
								if (reportInfo.datasets && reportInfo.datasets.length > 0) {
									for (var j = 0; j < reportInfo.datasets.length; j++) {
										var dss=xds.vmd.getStoreByDsName(reportInfo.datasets[j]);
											if(dss!=reportInfo.datasets[j]){
											  //dss=reportInfo.datasets[j];
											 }
										var s = {};
										var applayds = me.getApplayDataset(dss, datasets);
										if (applayds && applayds.component && applayds.component.config) {
											var config = Ext.decode(applayds.component.config.storeConfig);
											if (config) {
												s.name = "";
												s.factname = reportInfo.datasets[j];
												s.id = config.id;
												s.callcode = config.callcode;
												s.server_name = config.name;
												s.path = config.url;
											}
										}
										reportInfo.dataSetsInfo[j] = s;
									}
								}
								// 保存vmd文件
								if (callBack) {
									xds.project.save(null, true)
								} else {
									xds.project.save();
								}
								me.queryReport(me,reportInfo,callBack,"0");
							}
							//return;
						})
					}else{
						if (reportInfo.datasets && reportInfo.datasets.length > 0) {
							for (var j = 0; j < reportInfo.datasets.length; j++) {
								var dss=xds.vmd.getStoreByDsName(reportInfo.datasets[j]);
								if(dss!=reportInfo.datasets[j]){
									 //dss=reportInfo.datasets[j];
								}
								var s = {};
								var applayds = me.getApplayDataset(dss, datasets);
								if (applayds && applayds.component && applayds.component.config) {
									 var config = Ext.decode(applayds.component.config.storeConfig);
									 if (config) {
										s.name = "";
										s.factname = reportInfo.datasets[j];
										s.id = config.id;
										s.callcode = config.callcode;
										s.server_name = config.name;
										s.path = config.url;
									}
								}
								reportInfo.dataSetsInfo[j] = s;
							}
						}
						// 保存vmd文件
						if (callBack) {
							xds.project.save(null, true)
						} else {
							xds.project.save();
						}
						me.queryReport(me,reportInfo,callBack,"0");
					}
				}
			}
  },
	
	afterRender: function() {
		this.callParent(arguments);

		if (this.path && !this.isWebEdit) {
		//if (this.path && this.fillReport) {
			//Ext.Msg.alert("提示", "加载模板方式不能编辑！", function () { })
			return;
		}
		//return;
		//去掉遮罩层
		function hideFilm(parentNode) {
			var t = document.getElementById("film-for-" + parentNode.id);
			if (t) {
				
				if(parentNode.component&&parentNode.component.cid!='tabpanel'){
					t.style.display = "none";
				}
				hideFilm(parentNode.parentNode);
			}
		}
        
	   // this.film && this.film.hide()
		//this.ownerCt.film&&this.ownerCt.film.hide()
		var t = document.getElementById("film-for-" + this.viewerNode.id);
		if (t) {
			t.style.display = "none";
			hideFilm(this.viewerNode.parentNode);
		}
	},
		//初始化在线编辑区，新建模板或者加载在线编辑的模板时调用
	initWebEditArea: function(exp) {
		var me = this;
		// 添加表达式编辑区
		//exp.id = "expdiv";

        this.exp=exp;
		exp.style.height = "30px";
		exp.style.border = " 1px solid rgba(0, 0, 0, .15)";
		var d1 = document.createElement("div");
		d1.className = "expdiv";
		exp.appendChild(d1);
		var input = document.createElement("input");
		//input.id = "expinput";
        this.expinput=input;
		input.className = "expinput";
		d1.appendChild(input);
		var btn = document.createElement("button");
		btn.className = "expbtn";
		d1.appendChild(btn);
		var exp1 = document.createElement("div");
        this.datasetExp=exp1;
		//exp1.id = "datasetExp";
		exp1.className = "expdiv";
		exp1.style.display = "none";
		exp.appendChild(exp1);
		var exp2 = document.createElement("div");
        this.valuediv=exp2;
		//exp2.id = "valuediv";
		exp2.className = "expdiv";
		exp2.style.display = "";
		exp.appendChild(exp2);
		var valueInput = document.createElement("input");
        this.valueInput=valueInput;
		//valueInput.id = "valueInput";
		valueInput.className = "exp_value_input";
		exp2.appendChild(valueInput);
		var lable = document.createElement("label");
		lable.innerHTML = "数据集：";
		lable.className = "explabel";
		exp1.appendChild(lable);
		var combods = document.createElement("select");
		//combods.id = "cmbDataset";
       this.cmbDataset= combods
		combods.className = "expcombobox";
		exp1.appendChild(combods);
		var opNone = document.createElement("option");
		opNone.innerHTML = "请选择...";
		opNone.selected = true;
		opNone.disabled = true;
		combods.appendChild(opNone);
		if (typeof xds == 'undefined') xds = parent.xds;
		var storeRoot = xds.vmd.getRootNode("dataset");
		storeRoot && storeRoot.eachChild(function(n) {
				var op = document.createElement("option");
				op._id = n.id;
				op.innerHTML = n.id;
				combods.appendChild(op);
			},
			this);
		var lable1 = document.createElement("label");
		lable1.innerHTML = "数据列：";
		lable1.className = "explabel";
		exp1.appendChild(lable1);
		var comboField = document.createElement("select");
		//comboField.id = "cmbFiled";
        this.cmbFiled=comboField
		comboField.className = "expcombobox";
		var opNone = document.createElement("option");
		opNone.innerHTML = "请选择...";
		opNone.selected = true;
		opNone.disabled = true;
		comboField.appendChild(opNone);
		exp1.appendChild(comboField);
		var lable2 = document.createElement("label");
		lable2.innerHTML = "数据设置：";
		lable2.className = "explabel";
		exp1.appendChild(lable2);
		var comboOpration = document.createElement("select");
        this.cmbOpration=comboOpration
		//comboOpration.id = "cmbOpration";
		comboOpration.className = "expcombobox";
		var opNone = document.createElement("option");
		opNone.innerHTML = "请选择...";
		opNone.selected = true;
		opNone.disabled = true;
		comboOpration.appendChild(opNone);
		var opSingle = document.createElement("option");
		opSingle._id = "单值";
		opSingle.innerHTML = "单值";
		comboOpration.appendChild(opSingle);
		var opSelect = document.createElement("option");
		opSelect._id = "列表";
		opSelect.innerHTML = "列表";
		comboOpration.appendChild(opSelect);
		var opGroup = document.createElement("option");
		opGroup._id = "分组";
		opGroup.innerHTML = "分组";
		comboOpration.appendChild(opGroup);
		exp1.appendChild(comboOpration);
		//this.el.appendChild(exp);


		//扩展组件赋值
		me.grid.setCmpValue = function(cmp, value) {
			var me = this;
			var selectcells = {};
			selectcells.cells = me.selectCell;
			selectcells.type = "TD";
			//dom已经存在的情况下
			if (cmp) cmp.value = value;
			me.win.iframe.ContentProperty.setPropertyInfo(me.s, selectcells);


		}


		me.grid.edit = true;
		//  me.grid.enableBlockSelection(true);

		//  alert(this.path)

		// 数据集下拉框选项改变事件
		combods.addEventListener("change", function() {
			var name = this.value;
			if (name != "请选择...") {
				if (comboField.options.length > 0) {
					for (var i = comboField.options.length; i >= 1; i--) {
						comboField.options.remove(1);
					}
				}
				// 数据字段设置
				if (typeof xds == 'undefined') xds = parent.xds;
				var storeRoot = xds.vmd.getRootNode("dataset");
				var storeNode = storeRoot && storeRoot.findChildBy(function() {
					return this.id == name;
				});
				storeNode && storeNode.eachChild(function(c) {
					var op = document.createElement("option");
					op._id = c.text;
					op.innerHTML = c.text;
					comboField.appendChild(op);
				}, this);

				var cell = me.grid.selectCell;
				//   if(cell&&cell.obj) {
				if (cell) {
					if (cell.cell && cell.cell.cellAttributeInfo)
						if (cell.cell.cellAttributeInfo.opration == "single") {
							cell.innerText = "=" + name + "." + cell.cell.cellAttributeInfo.field;
							cell.setValue("=" + name + "." + cell.cell.cellAttributeInfo.field);
							cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
						}
					else if (cell.cell.cellAttributeInfo.opration == "select") {
						cell.innerText = "=" + name + ".Select(" + cell.cell.cellAttributeInfo.field + ")";
						cell.setValue("=" + name + ".Select(" + cell.cell.cellAttributeInfo.field + ")");
						cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
					} else if (cell.cell.cellAttributeInfo.opration == "group") {
						cell.innerText = "=" + name + ".Group(" + cell.cell.cellAttributeInfo.field + ")";
						cell.setValue("=" + name + ".Group(" + cell.cell.cellAttributeInfo.field + ")");
						cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
					}
					cell.cell.cellAttributeInfo.dataSet = name;
					if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
						me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
						me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell);
					}
				}
			}
		});
		//数据字段发生变化时
		comboField.addEventListener("change", function() {
			var name = this.value;
			if (name != "请选择...") {
				var cell = me.grid.selectCell;
				if (cell) {
					if (cell.cell && cell.cell.cellAttributeInfo)
						if (cell.cell.cellAttributeInfo.opration == "single") {
							cell.innerText = "=" + cell.cell.cellAttributeInfo.dataSet + "." + name;
							cell.setValue("=" + cell.cell.cellAttributeInfo.dataSet + "." + name);
							cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
						}
					else if (cell.cell.cellAttributeInfo.opration == "select") {
						cell.innerText = "=" + cell.cell.cellAttributeInfo.dataSet + ".Select(" + name + ")";
						cell.setValue("=" + cell.cell.cellAttributeInfo.dataSet + ".Select(" + name + ")");
						cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
					} else if (cell.cell.cellAttributeInfo.opration == "group") {
						cell.innerText = "=" + cell.cell.cellAttributeInfo.dataSet + ".Group(" + name + ")";
						cell.setValue("=" + cell.cell.cellAttributeInfo.dataSet + ".Group(" + name + ")");
						cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
					}
					cell.cell.cellAttributeInfo.field = name;
					if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
						me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
						me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell);
					}
				}
			}
		});
		//数据设置发生变化时（单值、分组、列表等）
		comboOpration.addEventListener("change", function() {
			var name = this.value;
			if (name != "请选择...") {
				var cell = me.grid.selectCell;
				if (cell) {
					if (cell.cell && cell.cell.cellAttributeInfo) {
						if (name == "单值") {
							cell.innerText = "=" + cell.cell.cellAttributeInfo.dataSet + "." + cell.cell.cellAttributeInfo.field;
							cell.setValue("=" + cell.cell.cellAttributeInfo.dataSet + "." + cell.cell.cellAttributeInfo.field);
							cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
							cell.cell.cellAttributeInfo.opration = "single";
						} else if (name == "列表") {
							cell.innerText = "=" + cell.cell.cellAttributeInfo.dataSet + ".Select(" + cell.cell.cellAttributeInfo.field + ")";
							cell.setValue("=" + cell.cell.cellAttributeInfo.dataSet + ".Select(" + cell.cell.cellAttributeInfo.field + ")");
							cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
							cell.cell.cellAttributeInfo.opration = "select";
						} else if (name == "分组") {
							cell.innerText = "=" + cell.cell.cellAttributeInfo.dataSet + ".Group(" + cell.cell.cellAttributeInfo.field + ")";
							cell.setValue("=" + cell.cell.cellAttributeInfo.dataSet + ".Group(" + cell.cell.cellAttributeInfo.field + ")");
							cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
							cell.cell.cellAttributeInfo.opration = "group";
						}
						if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
							me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
							me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell);
						}
					}
				}
			}
		});
		// 表达式编辑区文本框
		valueInput.addEventListener("change", function() {
			var cell = me.grid.selectCell;
			if (cell) {
				if (cell.cell && cell.cell.cellAttributeInfo) {
					cell.innerText = this.value;
					cell.setValue(this.value);
					cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
					if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
						me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
						me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell);
					}
				}
			}
		});

		window.openVisualEditor = function(flag, value) {
			// var aLotOfExpression;
			//Ext.Msg.alert("提示", "正在开发中", function () { })
			// debugger
			var cell = me.grid.selectCell;
			var myurl;
			if (flag == 2 || flag == 3) {
				myurl = ' /modules/hw39dc4349/hw786dbe49/hw1d7bf102.html?color=' + true;
			} else {
				myurl = ' /modules/hw39dc4349/hw786dbe49/hw1d7bf102.html?color=' + false;
			}
			// var string = cell.cell.innerText.trim();
			// switch (flag) {
			// 	case '0':
			// 		aLotOfExpression = cell.cell.innerText;
			// 		break;
			// 	case '1':
			// 		aLotOfExpression = cell.cell.innerText;
			// 		break;

			// }

			window.expWin = new vmd.window({
				//  url: '/modules/hw39dc4349/hw786dbe49/hwcd137bd4.html',
				url: myurl,
				auto: false,
				title: '表达式设置',
				height: 540,
				width: 702,
				modal: false,
				params: {
					expression: value
				},
				closeAction: 'hide'
			});
			window.BtnOk = function(exp) {
				debugger
				switch (flag) {
					case 0:
						if (cell) {
							if (cell.cell && cell.cell.cellAttributeInfo) {
								cell.innerText = exp;
								cell.setValue(exp);
								cell.cell.cellAttributeInfo.textValue.value = cell.innerText;
								if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
									me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell);
								}
							}
						}
						break;
					case 1:
						if (cell) {
							if (cell.cell && cell.cell.cellAttributeInfo) {
								cell.cell.cellAttributeInfo.showValue.value = exp;
								if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
									me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell)
								}
							}
						}
						break;
					case 2:
						if (cell) {
							if (cell.cell && cell.cell.cellAttributeInfo) {
								cell.cell.cellAttributeInfo.contentDetailInfo.nr_bgColor.value = exp;
								if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
									me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell)
								}
							}
						}
						break;
					case 3:
						if (cell) {
							if (cell.cell && cell.cell.cellAttributeInfo) {
								cell.cell.cellAttributeInfo.contentDetailInfo.nr_frontColor.value = exp;
								if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
									me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell)
								}
							}
						}
						break;
					case 4:
						if (cell) {
							if (cell.cell && cell.cell.cellAttributeInfo) {
								cell.cell.cellAttributeInfo.contentDetailInfo.nr_leftMargin.value = exp;
								if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
									me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell)
								}
							}
						}
						break;
					case 5:
						if (cell) {
							if (cell.cell && cell.cell.cellAttributeInfo) {
								cell.cell.cellAttributeInfo.contentDetailInfo.nr_rowText.value = exp;
								if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
									me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell)
								}
							}
						}
						break;
					case 6:
						if (cell) {
							if (cell.cell && cell.cell.cellAttributeInfo) {
								cell.cell.cellAttributeInfo.contentDetailInfo.nr_width.value = exp;
								if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
									me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell)
								}
							}
						}
						break;
					case 7:
						if (cell) {
							if (cell.cell && cell.cell.cellAttributeInfo) {
								cell.cell.cellAttributeInfo.contentDetailInfo.nr_available.value = exp;
								if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
									me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell)
								}
							}
						}
						break;
					case 8:
						if (cell) {
							if (cell.cell && cell.cell.cellAttributeInfo) {
								cell.cell.cellAttributeInfo.contentDetailInfo.nr_height.value = exp;
								if (me.grid.win.iframe && me.grid.win.iframe.ContentProperty) {
									me.grid.s = cell.cell.cellAttributeInfo.cellInfoToJson();
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, me.grid.selectCell)
								}
							}
						}
						break;
				};

			}
			window.expWin.show();
		}

		btn.addEventListener("click", function() {
			openVisualEditor(0, me.grid.selectCell.cell.innerText);
		});

		me.grid.flList = [];
		me.grid.fpList = [];
		window.grid = me.grid;
		window.setGridInfo = function(flobj, fpobj) {
			if (flobj) {
				var flag = false;
				var no;
				if (me.grid.flList.length > 0) {
					for (var key in me.grid.flList) {
						if (me.grid.flList[key].flSRow == flobj.flSRow &&
							me.grid.flList[key].flSCol == flobj.flSCol &&
							me.grid.flList[key].flECol == flobj.flECol &&
							me.grid.flList[key].flERow == flobj.flERow
						) {
							flag = true
							no = key;
						}
					}
				}
				if (flag) {
					me.grid.flList[no].seg_columnsNumber.value = flobj.seg_columnsNumber.value;
					me.grid.flList[no].seg_applyTo.value = flobj.seg_applyTo.value;
					me.grid.flList[no].seg_columnsMargin.value = flobj.seg_columnsMargin.value;
					me.grid.flList[no].seg_condition.value = flobj.seg_condition.value;
					me.grid.flList[no].seg_dividingLine.value = flobj.seg_dividingLine.value;
					me.grid.flList[no].seg_style.value = flobj.seg_style.value;
				} else {
					me.grid.flList.push(flobj)
				}
			}
			if (fpobj) {
				var flag = false;
				var no;
				if (me.grid.fpList.length > 0) {
					for (var key in me.grid.fpList) {
						if (me.grid.fpList[key].flSRow == fpobj.fpSRow &&
							me.grid.fpList[key].flSCol == fpobj.fpSCol &&
							me.grid.fpList[key].flECol == fpobj.fpECol &&
							me.grid.fpList[key].flERow == fpobj.fpERow
						) {
							flag = true
							no = key;
						}
					}
				}
				if (flag) {
					me.grid.fpList[no].seg_emptyCol.checked = fpobj.seg_emptyCol.checked;
					me.grid.fpList[no].seg_emptyRow.checked = fpobj.seg_emptyRow.checked;
					me.grid.fpList[no].seg_sliceName.value = fpobj.seg_sliceName.value;
					me.grid.fpList[no].seg_fp.checked = fpobj.seg_fp.checked;
				} else {
					me.grid.fpList.push(fpobj)
				}
			}
		};

		me.grid.clearAll(true);
		var headerstr = "";
		var headersWidth = " 30";
		var coltype = "ro";

		//循环遍历组织表头字符串
		//
		for (var i = 1; i < 30; i++) {
			headerstr += "," + this.convert(i);
			headersWidth += "," + 80;
			coltype += ",ed";
		}
		me.grid.setHeader(headerstr);
		//循环遍历组织列宽
		//
		me.grid.setInitWidths(headersWidth);
		//循环遍历组织列字段类型
		//
		me.grid.setColTypes(coltype);
		if (me.skin) {
			me.grid.setSkin(me.skin)
		} else {
			//me.grid.setSkin("material")
			me.grid.setSkin("my_default")
			// me.grid.setSkin("dhx_default");
			// me.grid.setSkin("dhx_skyblue");
		}
		// 右键菜单
		me.grid.setRightMenuObject(me.id)

		me.grid.enableMultiselect(true);
		//  me.grid.enableMultiline(true);
		me.grid.enableColSpan(true);
		me.grid.init();
		me.grid.enableEditEvents(true)
		me.grid.enableHeaderMenu(true);
		//  me.grid.enableRowspan(true);
		//重写grid的conclick事件
		me.grid.obj._oldclick = me.grid.obj.onclick;

		//me.grid.obj.style.borderCollapse = "collapse";
		me.grid.obj.onclick = me.grid.obj._onclick = function(e) {
			//选中当前report对象
			//  if(me.id!=xds.active.component.id){
			//   me.viewerNode.select();
			//  }
			// 隐藏右键菜单 lf 2018-06-21

			if (me.grid.extraInfoLeft) {

				//debugger
				if (me.grid.selectCell) {
					if (me.grid.selectCell.cell) {
						if (me.grid.selectCell.cell.cellAttributeInfo) {
							me.grid.selectCell.cell.cellAttributeInfo.extraInfo.leftParent.value = me.grid.convert(e.target.cellIndex) + "" + e.target.parentNode.rowIndex;
						}
					} else if (me.grid.selectCell.cells) {
						if (me.grid.selectCell.cells.length) {
							for (var r = 0; r < me.grid.selectCell.cells.length; r++) {
								var cc = me.grid.selectCell.cells[r].cell;
								if (cc && cc.cellAttributeInfo) {
									cc.cellAttributeInfo.extraInfo.leftParent.value = me.grid.convert(e.target.cellIndex) + "" + e.target.parentNode.rowIndex;
								}
							}
						}
					}
				}
				me.grid.extraInfoLeft = false;
				vmd('.vmd-report td').css('cursor', 'default')

				me.grid.setCmpValue(me.grid.s.extraInfo[0].leftParent, me.grid.convert(e.target.cellIndex) + "" + e.target.parentNode.rowIndex);
				return;
			}
			if (me.grid.extraInfoTop) {
				if (me.grid.selectCell) {
					if (me.grid.selectCell.cell) {
						if (me.grid.selectCell.cell.cellAttributeInfo) {
							me.grid.selectCell.cell.cellAttributeInfo.extraInfo.rightParent.value = me.grid.convert(e.target.cellIndex) + "" + e.target.parentNode.rowIndex;
						}
					} else if (me.grid.selectCell.cells) {
						if (me.grid.selectCell.cells.length) {
							for (var r = 0; r < me.grid.selectCell.cells.length; r++) {
								var cc = me.grid.selectCell.cells[r].cell;
								if (cc && cc.cellAttributeInfo) {
									cc.cellAttributeInfo.extraInfo.rightParent.value = me.grid.convert(e.target.cellIndex) + "" + e.target.parentNode.rowIndex;
								}
							}
						}
					}
				}

				me.grid.extraInfoTop = false;
				vmd('.vmd-report td').css('cursor', 'default')



				me.grid.setCmpValue(me.grid.s.extraInfo[0].rightParent, me.grid.convert(e.target.cellIndex) + "" + e.target.parentNode.rowIndex);
				return;
			}

			hideMenu();
			var selMethod = 0;
			//点击一个单元格
			if ((_isIE ? e.srcElement.nodeName : e.target.tagName) == "TD") {
				var el = me.grid.getFirstParentOfType(_isIE ? e.srcElement : e.target, "TD");
				if (!el || !el.parentNode || !el.parentNode.idd) return;
				var fl = true;
				if (me.grid.markedCells) {
					var markMethod = 0;
					if (e.shiftKey || e.metaKey) {
						markMethod = 1;
					}
					if (e.ctrlKey) {
						markMethod = 2;
					}
					me.grid.doMark(el, markMethod);
					return true;
				}
				if (me.grid.selMultiRows != false) {
					if (e.shiftKey && me.grid.row != null && me.grid.selectedRows.length) {
						selMethod = 1;
					}
					if (e.ctrlKey || e.metaKey) {
						selMethod = 2;
					}
					//刘志伟 下拉框多选时选择行的效果与选择复选框的效果一致，下拉列表不消失
					if (me.grid._combogrid_checkrow) {
						selMethod = 3;
					}
				}
			   if (!el.cellAttributeInfo) {
					el.cellAttributeInfo = new gridCellInfoObject();
				}
				el.cellAttributeInfo.designerCom=me;
				if (el.className.indexOf('celleditselected') != -1) {
					//  this._oldclick(e);
					//  this.cell._clearCell=false;
					this.grid.editCell(e);
					//  me.grid. doClickCellBorderStyle(el, fl, selMethod, false);
				} else {
					me.grid.doClickCellBorderStyle(el, fl, selMethod, false);
				}
			}
			//选中一片区域
			else if ((_isIE ? e.srcElement.nodeName : e.target.tagName) == "DIV") {
				var el = me.grid.getFirstParentOfType(_isIE ? e.srcElement : e.target, "DIV");
				var selectCells = {};
				var cells = [];
				if (me.grid._selectionArea) {
					var startCol = me.grid._startSelectionCell._cellIndex;
					var startRow = me.grid._startSelectionCell.parentNode.rowIndex;
					var endCol = me.grid._endSelectionCell._cellIndex + me.grid._endSelectionCell.colSpan - 1;
					var endRow = me.grid._endSelectionCell.parentNode.rowIndex + me.grid._endSelectionCell.rowSpan - 1;;
					if (endCol >= startCol || endRow >= startRow) {
						for (var r = startRow; r <= endRow; r++) {
							for (var c = startCol; c <= endCol; c++) {
								var cl = me.grid.cells2(r - 1, c);
								if (cl.cell) {
									if (!cl.cell.cellAttributeInfo) {
										cl.cell.cellAttributeInfo = new gridCellInfoObject();
									}
								}
								cells.push(cl);
							}
						}
					}
					selectCells.cells = cells;
					selectCells.type = "DIV";
					if (endRow - startRow > 0) {
						selectCells.rowspan = endRow - startRow + 1;
					}
					if (endCol - startCol > 0) {
						selectCells.colspan = endCol - startCol + 1;
					}
					selectCells.grid = me.grid;
					if (cells.length > 0) {
						// 清除列选中
						me.grid.clearColumnClass(1);
						if (startCol > 0) {
							var el = me.grid.cells2(startRow - 1, startCol)
							if (!el.cellAttributeInfo) {
								el.cellAttributeInfo = new gridCellInfoObject();
							}
							el.cellAttributeInfo.setAttribute(el);
							me.grid.s = el.cellAttributeInfo.cellInfoToJson();
							// 设置点击获取id给表达式编辑区赋值
							var inputID = me.expinput||document.getElementById("expinput");
							if (inputID) {
								inputID.value = me.grid.convert(el.cell._cellIndex) + el.cell.parentNode.rowIndex;
							}
							me.grid.selectCell = null;
							me.grid.selectCell = selectCells;
                            el.cellAttributeInfo.designerCom=me;
							//解析表达式，控制表达式显示数据集还是常值
							el.cellAttributeInfo.paserExp(el);
							var c = me.grid.convert(el.cell._cellIndex);
							if (selectCells.colspan) {
								c = me.grid.convert(el.cell._cellIndex + selectCells.colspan - 1);
							}
							var r = (el.cell.parentNode.rowIndex);
							if (selectCells.rowspan) {
								r = (el.cell.parentNode.rowIndex + selectCells.rowspan - 1);
							}
							me.grid.win.setTitle(me.grid.convert(el.cell._cellIndex) + el.cell.parentNode.rowIndex + ":" + c + r + "属性设置");
							if (!me.grid.haveShow) {
								me.grid.haveShow = true;
								me.grid.win.show();
								me.grid.win.alignTo(document.body, 'r-r', [-260, 0])
								//
								vmd.taskRunner(function() {
									var state = me.grid.win.iframe.ContentProperty;
									return state
								}, function() {
									//  alert()
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, selectCells)
								})
							} else {
								var selectcells = {};
								selectcells.cells = me.grid.selectCell;
								selectcells.type = "TD";
								//dom已经存在的情况下
								if (me.grid.win && me.grid.win.iframe && me.grid.win.iframe.ContentProperty)
									me.grid.win.iframe.ContentProperty.setPropertyInfo(me.grid.s, selectCells)
							}
						}
					}
				}
			}
			window.selectCells = me.grid.selectCell;
		};


		data = {
			rows: [{
				id: 1001,
				data: [
					"1",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1002,
				data: [
					"2",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1003,
				data: [
					"3",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1004,
				data: [
					"4",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1005,
				data: [
					"5",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1006,
				data: [
					"6",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1007,
				data: [
					"7",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1008,
				data: [
					"8",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1009,
				data: [
					"9",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1010,
				data: [
					"10",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1011,
				data: [
					"11",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1012,
				data: [
					"12",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1013,
				data: [
					"13",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1014,
				data: [
					"14",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1015,
				data: [
					"15",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1016,
				data: [
					"16",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1017,
				data: [
					"17",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1018,
				data: [
					"18",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1019,
				data: [
					"19",
					"",
					"",
					"",
					""
				]
			}, {
				id: 1020,
				data: [
					"20",
					"",
					"",
					"",
					""
				]
			}]
		};
		me.grid.setStyle("border:1px solid #DCDCDC;text-align:center; ", "border:1px solid #DCDCDC; text-align:center;", "border:1px solid #DCDCDC; text-align:center;", "border:1px solid #DCDCDC;text-align:center; ");
		me.grid.parse(data, "json");
		// 块的选择
		me.grid.enableBlockSelection();
	},

	//加载定制工具定制的模板
	loadToolModel: function(result) {
		var me = this;
		var resultInfo = Ext.decode(result.d);
		var base = new Base64();
		var rptInfo = base.decode(resultInfo.data);
		if (resultInfo.isFillReport == "true") {
			me.viewerNode.component.setConfig("fillReport", true)
		} else {
			me.viewerNode.component.setConfig("fillReport", false)
		}
		if (resultInfo.useds == "true") {
			me.viewerNode.component.setConfig("nousedataset", true)
		} else {
			me.viewerNode.component.setConfig("nousedataset", false)
		}

	/*	var s = "";
		if (resultInfo.dataset.length > 0) {
			// me.dataset = resultInfo.dataset;
			var data = [];
			for (var i = 0; i < resultInfo.dataset.length; i++) {
				// var store = "{\"storeConfig\":{";
				var store = "{";
				// store += "\"id\":\"" + resultInfo.dataset[i].serverid + "\",";
				store += "\"id\":\"" + resultInfo.dataset[i].id + "\",";
				store += "\"callcode\":\"" + resultInfo.dataset[i].CallCode + "\",";
				store += "\"url\":\"" + resultInfo.dataset[i].path + "\",";
				store += "\"host\":\"\",";
				store += "\"isHwRest\":true,";
				store += "\"name\":\"" + resultInfo.dataset[i].name + "\",";
				store += "\"fields\":[],";
				store += "\"getMethods\":[],";
				store += "\"postMethods\":[],";
				store += "\"putMethods\":[],";
				store += "\"deleteMethods\":[],";
				store += "\"saveMethods\":[]";
				store += "}";
				var name = resultInfo.dataset[i].name || resultInfo.dataset[i].serverid || resultInfo.dataset[i].id;
				data.push({
					cid: 'vmdJsonStore',
					id: name,
					storeConfig: store,
					autoLoad: false
				});
				if (i != resultInfo.dataset.length - 1) {
					s += name + ",";
				} else {
					s += name;
				}
			}
			//  data = [{ cid: 'vmdJsonStore', id: 'aaaaa' }];
			parent.xds.vmd.addNode(data)
		}
		me.viewerNode.component.setConfig("dsnames", s)
		me.viewerNode.component.setConfig("rptType", resultInfo.rptType)
		// 子报表数据集
		var rptds = "";
		if (resultInfo.subrptdataset.length > 0) {
			// me.dataset = resultInfo.dataset;
			var data = [];
			for (var i = 0; i < resultInfo.subrptdataset.length; i++) {
				// var store = "{\"storeConfig\":{";
				var store = "{";
				store += "\"id\":\"" + resultInfo.subrptdataset[i].id + "\",";
				store += "\"callcode\":\"" + resultInfo.subrptdataset[i].CallCode + "\",";
				store += "\"url\":\"" + resultInfo.subrptdataset[i].path + "\",";
				store += "\"host\":\"\",";
				store += "\"isHwRest\":true,";
				store += "\"name\":\"" + resultInfo.subrptdataset[i].name + "\",";
				store += "\"fields\":[],";
				store += "\"getMethods\":[],";
				store += "\"postMethods\":[],";
				store += "\"putMethods\":[],";
				store += "\"deleteMethods\":[],";
				store += "\"saveMethods\":[]";
				store += "}";
				var name = resultInfo.subrptdataset[i].name || resultInfo.subrptdataset[i].serverid || resultInfo.subrptdataset[i].id;
				data.push({
					cid: 'vmdJsonStore',
					id: name,
					storeConfig: store,
					autoLoad: false
				});
				if (i != resultInfo.subrptdataset.length - 1) {
					rptds += name + ",";
				} else {
					rptds += name;
				}
			}
			//  data = [{ cid: 'vmdJsonStore', id: 'aaaaa' }];
			parent.xds.vmd.addNode(data)
		}
		me.viewerNode.component.setConfig("subrptds", rptds);*/

		var colCount = resultInfo.colcount;
		var headers = "";
		for (var i = 1; i < parseInt(colCount) + 1; i++) {
			headers += "," + me.convert(i);
		}
		me.grid.setHeader(headers);
		//  me.grid.setInitWidths("30,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100");
		me.grid.setInitWidths("30," + resultInfo.widths);
		me.grid.setSkin("dhx_default");
		me.grid.init();
		me.grid.enableColSpan(true);
		me.grid.enableRowspan(true);

		//var xmlStr = '<?xml version="1.0" encoding="UTF-8" ?><rows>  <row id="1><cell >模型查询基本信息</cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell>  </row>  <row id="2><cell >序号</cell><cell >模型代码</cell><cell >所属单位代码</cell><cell >所属单位</cell><cell >模型名称</cell><cell >录入\n开始时间a^3</cell><cell >录入结束时间</cell><cell >录入人</cell><cell >区块长</cell><cell >项目状态</cell>  </row>  <row id="3><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell><cell ></cell>  </row></rows>';
		me.grid.loadXMLString(rptInfo);
	},

    queryReport:function(me,reportInfo,callBack,type){
			vmd.ajax({
				das: false,
				url: "/report/SaveReportXml.asmx/GetServerReportDataJson",
				type: 'post',
				//  contentType: "application/json;charset=utf-8",
				timeout: 10000,
				dataType: "text",
				data: {
					xmlStr: JSON.stringify(reportInfo),
					path: me.relativepath + "/" + me.path
					//ModelXml:  "mode/" + this.path,
				},
				success: function(result) {
                    if(type=="1"){
                      //  xds.fireEvent("componentchanged")
                        xds.canvas.setComponent(xds.inspector.root.childNodes[0]);
                    }
					if (callBack) {
						callBack();
					}
				},
				error: function(msg, f) {
					// debugger
					if (callBack) {
						callBack();
					}
					Ext.Msg.alert("提示", "保存模板信息失败！", function() {})
				}
			})
	},
	loadWebModel: function(result) {
		var me = this;
		var resultProperty = Ext.decode(result.d);
		var base = new Base64();
		var resultInfo = eval('(' + base.decode(resultProperty.property) + ')');
		var widths = "";
		// 是否没有对应的数据集信息，需要提示自己绑定
		me.point=false;
		if (resultInfo.SectionList) {
			for (s in resultInfo.SectionList) {
				var section = resultInfo.SectionList[s];
				var fp = new fpSetting();
				fp.seg_sliceName.value = section.Name;
				fp.seg_emptyRow.checked = section.Buqirow;
				fp.seg_emptyCol.checked = section.Buqicol;
				fp.fpSRow.value = section.StartRow;
				fp.fpERow.value = section.EndRow;
				fp.fpSCol.value = section.StartColumn;
				fp.fpECol.value = section.EndColumn;
				if (!me.grid.fpList)
					me.grid.fpList = [];
				me.grid.fpList.push(fp);
			}
		}
		if (resultInfo.SubfieldList) {
			for (f in resultInfo.SubfieldList) {
				var section = resultInfo.SubfieldList[f];
				var fl = new flSetting();
				fl.seg_columnsNumber.value = section.SubfieldCount;
				fl.seg_style.value = section.SubfieldTypeWraper;
				fl.seg_dividingLine.value = section.ShowSeparator;
				fl.seg_columnsMargin.value = section.SubfieldSpace;
				fl.seg_applyTo.value = section.SubfieldApplaycationWraper;
				fl.seg_condition.value = section.SubCondition;
				fl.flSRow.value = section.StartRow;
				fl.flSCol.value = section.StartCol;
				fl.flERow.value = section.EndRow;
				fl.flECol.value = section.EndCol;
				if (!me.grid.flList)
					me.grid.flList = [];
				me.grid.flList.push(fl);
			}
		}
		if (resultInfo.RowsInfo) {
			var rownum = 0;
			var colNum = 0;
			for (r in resultInfo.RowsInfo) {
				rownum = parseInt(r) + 1;
				if(rownum>me.grid.rowsCol.length){
					me.grid.addRow(me.grid.uid(),"",rownum-1);
				}
				var row = resultInfo.RowsInfo[r];
				// 行头属性设置
				var col0Cell = me.grid.cells2(rownum-1, 0);
				if (row.Height == "0" && col0Cell.getValue().indexOf("隐藏") == -1) {
					col0Cell.setValue(col0Cell.getValue() + "(隐藏)");
				}
				if (row.RowType) {
					var arrayIndex = -1;
					if (me.grid.row_attrs_index)
						arrayIndex = me.grid.row_attrs_index.indexOf(rownum-1);
					if (arrayIndex == -1) {
						me.grid.row_attrs_index.push(rownum-1);
					}
					var t = "";
					var v = me.grid.cells2(rownum-1, 0).getValue();
					if (row.RowType && row.RowType == "tableTitle") {
						//标题
						if (arrayIndex == -1) {
							me.grid.row_attrs_type.push("title");
						} else {
							me.grid.row_attrs_type[arrayIndex] = "title";
						}
						if (v.indexOf("(标题)") == -1) {
							t = "(标题)";
						}
					} else if (row.RowType && row.RowType == "tableHeader") {
						//表头
						if (arrayIndex == -1) {
							me.grid.row_attrs_type.push("header");
						} else {
							me.grid.row_attrs_type[arrayIndex] = "header";
						}
						if (v.indexOf("(表头)") == -1) {
							t = "(表头)";
						}
					} else if (row.RowType && row.RowType == "tableData") {
						// 数据
						if (arrayIndex == -1) {
							me.grid.row_attrs_type.push("data");
						} else {
							me.grid.row_attrs_type[arrayIndex] = "data";
						}
						if (v.indexOf("(数据)") == -1) {
							t = "(数据)";
						}
					}
					if (v.indexOf("(隐藏)") > -1) {
						t = "" + t + "(隐藏)";
					}
					me.grid.cells2(rownum - 1, 0).setValue((parseInt(rownum)) + t);
				}
				//me.grid.rowsCol[r].clientHeight=row.height;
				// 行高设置
				me.grid.rowsCol[r].style.height = row.Height + 'px';
				if (row.CellInfoList) {
					var cellCount = 0;
					for (l in row.CellInfoList) {
						cellCount++;
					}
					if(me.grid.rowsCol&&me.grid.rowsCol[0]&&me.grid.rowsCol[0].cells&&cellCount>=me.grid.rowsCol[0].cells.length)
					{
						//var k=me.grid.rowsCol[0].cells.length;
						for(var k=me.grid.rowsCol[0].cells.length;k<=cellCount;k++){
							me.grid.insertColumn(k,me.convert(k),'ed',80,'na','left');
						}
					}
					
					//此处循环只为设置列宽,下边的列循环会出现合并是调列的处理,故列宽单独循环设置  成兵20181013
					for (var cw = 0; cw < cellCount; cw++) {
						var col = row.CellInfoList[cw];
						var gcell = me.grid.rowsCol[r].cells[cw + 1];
						if (gcell) {
							if (rownum-1 == 0) {
								if (col.Width == "0") {
									me.grid.setColWidth(cw + 1, "80");
									var row0Cell = me.grid.hdr.children[0].children[1].children[cw + 1].firstChild;
									if (row0Cell.innerHTML.indexOf("隐藏") == -1) {
										row0Cell.innerHTML = row0Cell.innerHTML + "(隐藏)";
									}

									var arrayIndex = -1;
									if (me.grid.col_attrs_index)
										arrayIndex = me.grid.col_attrs_index.indexOf(cw + 1);
									if (arrayIndex == -1) {
										me.grid.col_attrs_index.push(cw + 1);
										me.grid.col_attrs_type.push("hide");
									} else {
										me.grid.col_attrs_type[arrayIndex] = "hide";
									}
								} else {
									me.grid.setColWidth(cw + 1, col.Width);
								}
							}
						}
					}
					var cc = 0;
					for (var c = 0; c < cellCount; c++) {
						var col = row.CellInfoList[c];

						var gcell = me.grid.rowsCol[r].cells[cc + 1];
						cc++;
						if (gcell) {
							if (c > colNum) {
								colNum = c;
							}
							var attribute = new gridCellInfoObject();
							attribute.alignInfo.align.value.HAlign.value = col.Align.HAlign;
							attribute.alignInfo.align.value.VAlign.value = col.Align.VAlign;

							//对单元格对齐方式解析
							gcell.style.textAlign = col.Align.HAlign;
							gcell.style.verticalAlign = col.Align.VAlign;

							attribute.alignInfo.textControl.value = col.Align.TextControl;
							attribute.alignInfo.escapeLabel.value = col.Align.EscapeLabel;
							attribute.alignInfo.textDirection.value = col.Align.TxtDirection;
							attribute.alignInfo.rotation.value = col.Align.Rotation;
							attribute.alignInfo.singleRotation.value = col.Align.SingleRotation;
							attribute.alignInfo.topPadding.value = col.Align.TopPadding;
							attribute.alignInfo.bottomPadding.value = col.Align.BottomPadding;
							attribute.alignInfo.leftPadding.value = col.Align.LeftPadding;
							attribute.alignInfo.rightPadding.value = col.Align.RightPadding;
							attribute.alignInfo.verticalSpace.value = col.Align.RowSpace;
							attribute.extraInfo.leftParent.value = col.Hparent;
							attribute.extraInfo.rightParent.value = col.Vparent;
							if (col.Expand == "1") {
								attribute.extraInfo.direction.value = "3";
							} else if (col.Expand == "2") {
								attribute.extraInfo.direction.value = "2";
							} else {
								attribute.extraInfo.direction.value = "1";
							}
							attribute.contentDetailInfo.nr_bgColorCheck.checked = col.IsBgColor;
							attribute.contentDetailInfo.nr_frontColorCheck.checked = col.IsForeColor;
							attribute.contentDetailInfo.nr_leftMarginCheck.checked = col.IsLeftMargin
							attribute.contentDetailInfo.nr_rowTextCheck.checked = col.IsFontsExp;
							attribute.contentDetailInfo.nr_widthCheck.checked = col.IsWidthExp;
							attribute.contentDetailInfo.nr_availableCheck.checked = col.IsEnableExp;
							attribute.contentDetailInfo.nr_heightCheck.checked = col.IsHeightExp;
							attribute.contentDetailInfo.nr_bgColor.value = col.BgColorExp;
							attribute.contentDetailInfo.nr_frontColor.value = col.ForeheadColorExp;
							attribute.contentDetailInfo.nr_leftMargin.value = col.Leftmargin;
							attribute.contentDetailInfo.nr_rowText.value = col.FontsExp;
							attribute.contentDetailInfo.nr_width.value = col.Widthexp;
							attribute.contentDetailInfo.nr_available.value = col.EnableExp;
							attribute.contentDetailInfo.nr_height.value = col.HeightExp;
							var f = parseInt(col.Fonts);
							if (resultInfo.FontsInfo && resultInfo.FontsInfo[f]) {
								var ff = resultInfo.FontsInfo[f];
								attribute.fontInfos.fontFamily.value = ff.FontName;
								gcell.style.fontFamily = ff.FontName;
								if (ff.Weight == "1" && ff.Italic == "1") {
									attribute.fontInfos.fontShape.value = "double";
									gcell.style.fontStyle = "italic";
									gcell.style.fontWeight = "bold";
								} else if (ff.Weight == "1") {
									attribute.fontInfos.fontShape.value = "bold";
									gcell.style.fontStyle = "normal";
									gcell.style.fontWeight = "bold";
								} else if (ff.Italic == "1") {
									attribute.fontInfos.fontShape.value = "italic";
									gcell.style.fontWeight = "normal";
									gcell.style.fontStyle = "italic";
								} else {
									attribute.fontInfos.fontShape.value = "normal";
									gcell.style.fontWeight = "normal";
									gcell.style.fontStyle = "normal";
								}
								attribute.fontInfos.fontSize.value = ff.FontSize;
								gcell.style.fontSize = me.grid.fontSizeToPX(ff.FontSize)
								if (ff.UnderLine == "0") {
									attribute.fontInfos.underline.value = "N";
								} else {
									attribute.fontInfos.underline.value = "Y";
								}
								if (ff.FontColor) {
									attribute.fontInfos.ColorSelect.value = ff.FontColor;
									gcell.style.color = ff.FontColor;
								}
								attribute.fontid = col.Fonts;
								if(col.Foreheadcolor){
                                    attribute.fontInfos.ColorSelect.value = col.Foreheadcolor;
                                    gcell.style.color = col.Foreheadcolor;
                                }
							}
							var b = parseInt(col.Borders);
							if (resultInfo.BordersInfo && resultInfo.BordersInfo[b]) {
								var bb = resultInfo.BordersInfo[b];
								attribute.borderInfo.ColorSelect.value = bb.Bottomborder.substring(2, bb.Bottomborder.length - 2);
								attribute.borderInfo.LineStyle.value = "Solid";
								attribute.borderInfo.BorderStyle.value = "all";
								gcell.style.borderWidth = "1";
								gcell.style.borderColor = attribute.borderInfo.ColorSelect.value;
								gcell.style.borderStyle = "solid";
							}
							attribute.borderid = col.Borders;
							if (col.Backgroundcolor) {
								attribute.bgcolorInfo.ColorSelectInner.value = col.Backgroundcolor;
								gcell.style.setProperty('background-color', col.Backgroundcolor, 'important');
							}
							if (col.Rowspan && parseInt(col.Rowspan) > 1 && col.Colspan && parseInt(col.Colspan) > 1) {}
							
							                 //数字属性信息
                            var m=parseInt(col.Masks);
                            if(resultInfo.NumberInfos&&resultInfo.NumberInfos[m]){
                                var numinfo=resultInfo.NumberInfos[m];
                                if(numinfo.NumType=="1"){
                                    attribute.numberInfo.allSortCom.value="myNumber";
                                    attribute.numberInfo.xs.value=parseInt(numinfo.DecimalDigits);
                                    if(numinfo.IsSeparator){
                                        attribute.numberInfo.useCommaCheckBox.checked=true;
                                    }
                                    if(numinfo.ShowZero){
                                        attribute.numberInfo.noZeroCheckBox.checked=true;
                                    }
									if(numinfo.Numbering)
                                    {
                                        attribute.numberInfo.numShowType.value=numinfo.Numbering;
                                    }
                                }
                                if(numinfo.NumType=="2") {
                                    attribute.numberInfo.allSortCom.value="myCurrency";
                                    attribute.numberInfo.xs1.value=parseInt(numinfo.DecimalDigits);
                                    if(numinfo.ShowZero){
                                        attribute.numberInfo.noZeroCheckBox1.checked=true;
                                    }
                                }
                                if(numinfo.NumType=="3") {
                                    attribute.numberInfo.allSortCom.value="myDate";
                                    attribute.numberInfo.dateSortCom.value=numinfo.DateFormat;
                                }
                                if(numinfo.NumType=="4") {
                                    attribute.numberInfo.allSortCom.value="myTime";
                                }
                                if(numinfo.NumType=="5") {
                                    attribute.numberInfo.allSortCom.value="myPercentage";
                                    attribute.numberInfo.xs3.value=parseInt(numinfo.DecimalDigits);
                                    if(numinfo.ShowZero){
                                        attribute.numberInfo.noZeroCheckBox3.checked=true;
                                    }
                                }
                                if(numinfo.NumType=="6") {
                                    attribute.numberInfo.allSortCom.value="mySciCounting";
                                    attribute.numberInfo.xs4.value=parseInt(numinfo.DecimalDigits);
                                    if(numinfo.ShowZero){
                                        attribute.numberInfo.noZeroCheckBox4.checked=true;
                                    }
                                }
                                if(numinfo.NumType=="7") {
                                    attribute.numberInfo.allSortCom.value="myText";
                                }
                                if(numinfo.NumType=="8") {
                                    attribute.numberInfo.allSortCom.value="mySpecial";
                                }
                            }
                            attribute.numberid=col.Masks;

							attribute.textValue.value = col.Data;
							  attribute.showValue.value=col.ShowValue;
							gcell.cellAttributeInfo = attribute;
							//gcell.offsetWidth = col.Width;
							gcell.innerText = col.Data;
							if(col.Data.substring(0,1)== "="){
								var e = col.Data.trim().substring(1);
								var s = e.split(".");
								if (s.length > 1) {
									if(xds.vmd.getStoreByDsName(s[0])==""||xds.vmd.getStoreByDsName(s[0])==undefined)
									{
										me.point=true;
									}
								}
							}
						}
					}

				}
			}
			var fixedCol = parseInt(resultInfo.Fixedcolcount);
			if (fixedCol > 0) {
				me.grid.clickCol = fixedCol;
				me.grid.doLockedCol(true);
			}

			//在展示完之后   处理合并
			for (r in resultInfo.RowsInfo) {
				rownum = r;
				var row = resultInfo.RowsInfo[r];
				for (var c = 0; c < cellCount; c++) {
					var col = row.CellInfoList[c];
					var gcell; 
					for(var l=0;l<me.grid.rowsCol[r].cells.length;l++){
						if(me.grid.rowsCol[r].cells[l]._cellIndex==c)
						{
							gcell=me.grid.rowsCol[r].cells[l];
							break;
						}
					}
					if(gcell){
						var cell_ind = gcell.cellIndex;
						if (cell_ind != c + 1) {
							cell_ind = c + 1;
						}
						if (col.Rowspan && parseInt(col.Rowspan) > 1 && col.Colspan && parseInt(col.Colspan) > 1) {
							for (var ii = 0; ii < col.Rowspan; ii++) {
								me.grid.setColspan(me.grid.rowsCol[parseInt(r) + ii].idd, cell_ind, parseInt(col.Colspan));
							}
							me.grid.setRowspan(me.grid.rowsCol[r].idd, cell_ind, parseInt(col.Rowspan));
						} else if (col.Rowspan && parseInt(col.Rowspan) > 1) {
							var cell_ind = gcell.cellIndex;
							if (cell_ind != c + 1) {
								cell_ind = c + 1;
							}
							me.grid.setRowspan(me.grid.rowsCol[r].idd, cell_ind, parseInt(col.Rowspan));
						} else if (col.Colspan && parseInt(col.Colspan) > 1) {
							var cell_ind = gcell.cellIndex;
							if (cell_ind != c + 1) {
								cell_ind = c + 1;
							}
							me.grid.setColspan(me.grid.rowsCol[r].idd, cell_ind, parseInt(col.Colspan));
							//c = c + parseInt(col.Colspan) - 1;
						}
					}
				}
			}
		}
		//拿到flList和fpList中的已有的分栏分片画上边框
		//debugger
		var flList = me.grid.flList;
		var fpList = me.grid.fpList;
		if (fpList.length > 0) {
			for (var key in fpList) {
				if (fpList[key].fpSRow) {
					if (fpList[key].fpSRow.value == fpList[key].fpERow.value &&
						fpList[key].fpSCol.value != fpList[key].fpECol.value) {
						var cell1 = me.getSpanCell(me, fpList[key].fpSRow.value - 1, fpList[key].fpSCol.value);
						var cell2 = me.getSpanCell(me, fpList[key].fpSRow.value - 1, fpList[key].fpECol.value);
						Ext.get(cell1).addClass('fphangL');
						Ext.get(cell2).addClass('fphangR');
					} else if (fpList[key].fpSRow.value != fpList[key].fpERow.value &&
						fpList[key].fpSCol.value == fpList[key].fpECol.value) {
						var cell1 = me.getSpanCell(me, fpList[key].fpSRow.value - 1, fpList[key].fpSCol.value);
						var cell2 = me.getSpanCell(me, fpList[key].fpERow.value - 1, fpList[key].fpSCol.value);
						Ext.get(cell1).addClass('fplieU');
						Ext.get(cell2).addClass('fplieD');
					} else {
						var cell1 = me.getSpanCell(me, fpList[key].fpSRow.value - 1, fpList[key].fpSCol.value);
						var cell2 = me.getSpanCell(me, fpList[key].fpERow.value - 1, fpList[key].fpSCol.value);
						var cell3 = me.getSpanCell(me, fpList[key].fpSRow.value - 1, fpList[key].fpECol.value);
						var cell4 = me.getSpanCell(me, fpList[key].fpERow.value - 1, fpList[key].fpECol.value);
						Ext.get(cell1).addClass('fpLU');
						Ext.get(cell2).addClass('fpLD');
						Ext.get(cell3).addClass('fpRU');
						Ext.get(cell4).addClass('fpRD');
					}
				}
			}
		}
		if (flList.length > 0) {
			for (var key in flList) {
				if (flList[key].flSRow) {
					if (flList[key].flSRow.value == flList[key].flERow.value &&
						flList[key].flSCol.value != flList[key].flECol.value) {
						var cell1 = me.getSpanCell(me, flList[key].flSRow.value - 1, flList[key].flSCol.value);
						var cell2 = me.getSpanCell(me, flList[key].flSRow.value - 1, flList[key].flECol.value);
						if (hasClass(Ext.get(cell1), 'fphangL')) {
							removeClass(cell1, 'fphangL')
							Ext.get(cell1).addClass('lphangL');
						} else {
							Ext.get(cell1).addClass('flhangL');
						}
						if (hasClass(Ext.get(cell2), 'fphangR')) {
							removeClass(cell2, 'fphangR')
							Ext.get(cell2).addClass('lphangR');
						} else {
							Ext.get(cell2).addClass('flhangR');
						}
					} else if (flList[key].flSRow.value != flList[key].flERow.value &&
						flList[key].flSCol.value == flList[key].flECol.value) {
						var cell1 = me.getSpanCell(me, flList[key].flSRow.value - 1, flList[key].flSCol.value);
						var cell2 = me.getSpanCell(me, flList[key].flERow.value - 1, flList[key].flSCol.value);
						if (hasClass(Ext.get(cell1), 'fplieU')) {
							removeClass(cell1, 'fplieU')
							Ext.get(cell1).addClass('lplieU');
						} else {
							Ext.get(cell1).addClass('fllieU')
						}
						if (hasClass(Ext.get(cell2), 'fplieD')) {
							removeClass(cell2, 'fllieD')
							Ext.get(cell2).addClass('lplieD');
						} else {
							Ext.get(cell2).addClass('fllieD')
						}
					} else {
						var cell1 = me.getSpanCell(me, flList[key].flSRow.value - 1, flList[key].flSCol.value);
						var cell2 = me.getSpanCell(me, flList[key].flERow.value - 1, flList[key].flSCol.value);
						var cell3 = me.getSpanCell(me, flList[key].flSRow.value - 1, flList[key].flECol.value);
						var cell4 = me.getSpanCell(me, flList[key].flERow.value - 1, flList[key].flECol.value);

						if (flList[key].seg_style.value == "0") {
							if (hasClass(Ext.get(cell1), 'fpLU')) {
								removeClass(cell1, 'fpLU')
								Ext.get(cell1).addClass('lpcf');
							} else {
								Ext.get(cell1).addClass('flcf')
							}
						} else if (flList[key].seg_style.value == "1") {
							if (hasClass(Ext.get(cell1), 'fpLU')) {
								removeClass(cell1, 'fpLU')
								Ext.get(cell1).addClass('lprf');
							} else {
								Ext.get(cell1).addClass('flrf')
							}
						} else {
							if (hasClass(Ext.get(cell1), 'fpLU')) {
								removeClass(cell1, 'fpLU')
								Ext.get(cell1).addClass('lpLU');
							} else {
								Ext.get(cell1).addClass('flLU')
							}
						}
						if (hasClass(Ext.get(cell2), 'fpLD')) {
							removeClass(cell2, 'fpLD')
							Ext.get(cell2).addClass('lpLD');
						} else {
							Ext.get(cell2).addClass('flLD')
						}
						if (hasClass(Ext.get(cell3), 'fpRU')) {
							removeClass(cell3, 'fpRU')
							Ext.get(cell3).addClass('lpRU');
						} else {
							Ext.get(cell3).addClass('flRU')
						}
						if (hasClass(Ext.get(cell4), 'fpRD')) {
							removeClass(cell4, 'fpRD')
							Ext.get(cell4).addClass('lpRD');
						} else {
							Ext.get(cell4).addClass('flRD')
						}
						// Ext.get(cell1).addClass('flLU');
						// Ext.get(cell2).addClass('flLD');
						// Ext.get(cell3).addClass('flRU');
						// Ext.get(cell4).addClass('flRD');
					}
				}
			}
		}
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
		// debugger
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
		storeRoot.eachChild(function(n) {
			names[i] = n;
			i++
		}, this);
		return names;
	},

	setDrag: function(el) {
		// 2018.5.22 拖拽功能 lf
		var formPanelDropTargetEl = el;
		var formPanelDropTarget = new Ext.dd.DropTarget(formPanelDropTargetEl, {
			id: 'targetid',
			group: 'TreeDD',
			notifyEnter: function(ddSource, e, data) {
				//Add some flare to invite drop.
				//formPanel.body.stopFx();
				//formPanel.body.highlight();
			},
			getCmpXtype:function(){
				
				
			},
			notifyDrop: function(ddSource, e, data) {
				// Reference the record (single selection) for readability
				//var selectedRecord = ddSource.dragData.selections[0];

				// Load the record into the form
				//formPanel.getForm().loadRecord(selectedRecord);

				// Delete record from the grid.  not really required.
				//ddSource.grid.store.remove(selectedRecord);
				//return(true);
				
				var setNodeConfig=function(_obj){
					if(Ext.isEmptyObject(_obj.config)){
								_obj.config={
									xtype:_obj.cid,
									name:_obj.name
								}
							}
				}
				
				var tt = e.target;
				var selectCell;
				if (tt && tt.parentNode && tt.parentNode.grid && tt.parentNode.grid.cells) {
					selectCell = tt.parentNode.grid.cells(tt.parentNode.idd, tt.cellIndex);
				}
				if (data && data.node) {
					if (data.node.component) {
						if (data.node.component.config) {
							//mafei 兼容处理
							setNodeConfig(data.node.component);
							if (data.node.component.config.xtype == "datafield") {
								selectCell.setValue("=" + data.node.component.owner.config.id + "." + data.node.component.config.name);
								// selectCell.setValue(data.node.component.config.name);
								// 添加数据集信息
								if (!selectCell.cell.cellAttributeInfo) {
									selectCell.cell.cellAttributeInfo = new gridCellInfoObject();
								}
								selectCell.cell.cellAttributeInfo.dataSet = data.node.component.owner.config.id;
								selectCell.cell.cellAttributeInfo.field = data.node.component.config.name;
								selectCell.cell.cellAttributeInfo.opration = "single";

							} else if (data.node.component.config.xtype == "vmd.jsonStore") {
								if (data.node.component.node && data.node.component.node.childNodes && data.node.component.node.childNodes.length > 0) {
									for (var key in data.node.component.node.childNodes) {
										if (tt && tt.parentNode && tt.parentNode.grid && tt.parentNode.grid.cells) {
											selectCell = tt.parentNode.grid.cells(tt.parentNode.idd, tt.cellIndex + parseInt(key));
											if (selectCell) {
												
												setNodeConfig(data.node.component.node.childNodes[key].component);
												selectCell.setValue("=" + data.node.component.id + "." + data.node.component.node.childNodes[key].component.config.name);
												// 添加数据集信息
												if (!selectCell.cell.cellAttributeInfo) {
													selectCell.cell.cellAttributeInfo = new gridCellInfoObject();
												}
												selectCell.cell.cellAttributeInfo.dataSet = data.node.component.owner.config.id;
												selectCell.cell.cellAttributeInfo.field = data.node.component.node.childNodes[key].component.config.name;
												selectCell.cell.cellAttributeInfo.opration = "single";
											}
										}
									}
								}
							}
						}
					}
				}
				return true;
				// selectCell.setValue("拖拽上了111");
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

	onEventsReg: function(My, Mygrid) {
		Mygrid.attachEvent("onRowSelect", function(id) {
			My.fireEvent('rowSelect', Mygrid, id)
		});
		Mygrid.attachEvent("onBeforeRowDeleted", function(rowId) {
			My.fireEvent('beforeRowDeleted', Mygrid, rowId)
		});
		Mygrid.attachEvent("onCheckbox", function(rowId, cellInd, state) {
			My.fireEvent('checkbox', Mygrid, rowId, cellInd, state)
		});
		Mygrid.attachEvent("onEnter", function(rowId, cellInd) {
			return My.fireEvent('enter', Mygrid, rowId, cellInd)
		});
		Mygrid.attachEvent("onRowDblClicked", function(rowId) {
			My.fireEvent('rowDblClicked', Mygrid, rowId)
		});
		Mygrid.attachEvent("onEditCell", function(stage, rowId, cellInd) {
			return My.fireEvent('editCell', Mygrid, stage, rowId, cellInd)
		});
		Mygrid.attachEvent("onDrag", function(sId, tId, sObj, tObj, sInd, tInd) {
			alert("11133");
			return My.fireEvent('onDrag', Mygrid, sId, tId, sObj, tObj, sInd, tInd)
		});


		var me = this;

		me.ownerCt.on('afterlayout', function() {

			me._resizeHeight()


		})
	},

	onEditCell: function(e) {
		// debugger
	},
	onEnter: function(e) {
		// debugger
	},
	onDestroy: function() {

		if (this.rendered) {
			//bug修复，清除dhx组件拖拽就在body中累加的combo的dom结构
			Ext.select('body>div[class*=dhxgridlist]').remove();
		}
	}
})



//Ext.reg('vmd.report', vmd.comp.report);

//#endregion vmdreport



//#region vmdReport    原先写与vmdcomps.js
Ext.define("vmd.comp.Report", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.report',
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
	getTemplateArgs: function() {
		// return [this.type, 'x-btn-' + this.scale + ' x-btn-icon-' + this.scale + '-' + this.iconAlign, this.iconAlign, this.cls, this.id];
		return {
			skin: this.skin,
			width: this.width,
			height: this.height,
			columns: this.columns
		}
	},

	onRender: function(ct, position) {
		var me = this;
		//me.myMask.show();

		if (!this.el) {
			//  this.el = document.createElement("div");

			//var subel=document.createElement("div");
			//this.el.appendChild(subel)
			//绑定属性面板中的size到网格中
			this.el = document.createElement("div");
			if (!isNaN(me.height) && me.height) this.el.style.height = me.height + "px";
			if (!isNaN(me.width) && me.width) this.el.style.width = me.width + "px";
			// this.el.style.height = "170px";
			// this.el.style.width = "300px";

			//
			var defaultConfig = {
				parent: this.el,
				filter: true
			};


			if (me.fillReport) {
				// me.grid = new FillReport(ct.dom);
				me.grid = new FillReport(this.el);

			} else {
				me.grid = new dhtmlXGridObject(this.el);
			}

			this.el.id = this.id;
		}
		//me.grid.getPosition=null;
		//属性赋值
		Ext.applyIf(me, me.grid);
		//重改指向，保证dhx的原生态
		//this.el = this.el.children[0];

		// Ext.fly(this.el).addClass('vmd-Report');

		//注册事件
		this.onEventsReg(me, me.grid);
		window[me.id] = this;
		//vmd.comp.Grid.superclass.onRender.call(this, ct, position);

		this.callParent(arguments);
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

	onEventsReg: function(My, Mygrid) {
		Mygrid.attachEvent("onRowSelect", function(id) {
			My.fireEvent('rowSelect', Mygrid, id)
		});
		Mygrid.attachEvent("onBeforeRowDeleted", function(rowId) {
			My.fireEvent('beforeRowDeleted', Mygrid, rowId)
		});
		Mygrid.attachEvent("onCheckbox", function(rowId, cellInd, state) {
			My.fireEvent('checkbox', Mygrid, rowId, cellInd, state)
		});
		Mygrid.attachEvent("onEnter", function(rowId, cellInd) {
			My.fireEvent('enter', Mygrid, rowId, cellInd)
		});
		Mygrid.attachEvent("onRowDblClicked", function(rowId) {
			My.fireEvent('rowDblClicked', Mygrid, rowId)
		});
		Mygrid.attachEvent("onEditCell", function(stage, rowId, cellInd) {
			My.fireEvent('editCell', Mygrid, stage, rowId, cellInd)
		});

		Mygrid.attachEvent("onFillReportResize", function(stage, rowId, cellInd) {

			//调整布局适应滚动条
			My.ownerCt.doLayout()
		});
	},
	// 加载数据文件
	loadReportXML: function(xmlPath) {
		var me = this;
		this.loadXML(xmlPath, function() {

			me.myMask.hide();
		});
	},
	// 打印
	print: function() {
		var me = this;
		//var reprotid = document.getElementById(me.id);
		//bdhtml = window.document.body.innerHTML;//获取当前页的html代码
		//window.document.body.innerHTML = reprotid.innerHTML;
		//if (dhx4.isIE) {
		//    PageSetup_Null();
		//    document.execCommand("print")
		//} else {
		//    window.print();
		//}
		//window.document.body.innerHTML = bdhtml;
		//HwPrint('#' + me.id);
		$('#' + me.id).print();
	},
	PageSetup_Null: function() {
		try {
			var HKEY_Root, HKEY_Path, HKEY_Key;
			HKEY_Root = "HKEY_CURRENT_USER";
			HKEY_Path = "//Software//Microsoft//Internet Explorer//PageSetup//";
			var Wsh = new ActiveXObject("WScript.Shell");
			HKEY_Key = "header";
			Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
			HKEY_Key = "footer";
			Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
		} catch (e) {}
	},
	// 获取值
	getValue: function() {
		var me = this.grid;
		if (me && arguments.length == 1) {
			return me.getValue(me, arguments[0]);
		} else if (me && arguments.length == 2) {
			return me.getValue(arguments[0], arguments[1]);
		} else {
			return "";
		}
	},

	//保存表
	save: function() {
		var me = this;
		//save()
		if (arguments.length == 0) {
			me.grid.submitdb(me.grid);
		} else if (arguments.length == 1) {
			//save(successCallBack)
			if (typeof arguments[0] === "function") {
				me.grid.submitdb(me.grid, arguments[0]);
			}
			//save(reportName)
			else {
				me.grid.submitdb(arguments[0]);
			}
		} else if (arguments.length == 2) {
			//save(successCallBack,errorCallBack)
			if (typeof arguments[0] === "function" && typeof arguments[1] === "function") {
				me.grid.submitdb(me.grid, arguments[0], arguments[1]);
			}
			//save(reportName,successCallBack)
			else {
				me.grid.submitdb(arguments[0], arguments[1]);
			}
		} else if (arguments.length == 3) {
			//save(reportName,successCallBack,errorCallBack)
			me.grid.submitdb(arguments[0], arguments[1], arguments[2]);
		} else {
			Ext.Msg.alert("提示", "参数不正确！", function() {})
		}
	},

	getFillReport: function() {
		return this.grid;
	},

	onEditCell: function(e) {
		// debugger
	},
	onEnter: function(e) {
		//  debugger
	},
	onDestroy: function() {

		if (this.rendered) {
			//bug修复，清除dhx组件拖拽就在body中累加的combo的dom结构
			//Ext.select('body>div[class*=dhxgridlist]').remove();
		}
	},
	setParamValue: function(pname, pvalue) {

		this.paramsList += "{\"Key\":\"" + pname + "\",\"Value\":\"" + pvalue + "\"},";

	},
	//查询填报
	fillRpt: function() {
		var report = this;
		var mygrid = report;

		var paramsList = mygrid.paramsList;
		// mygrid.clearAll(true);
		var ds, paths = "",
			bspar = "",
			m_host = "",
			params = "";
		if (report.dsnames) {
			ds = report.dsnames.split(",");
		}
		if (ds.length > 0) {
			for (var i = 0; i < ds.length; i++) {
				var d = eval(ds[i]);
				if (d) {
					m_host = d.storeConfig.host;
					bspar = d.storeConfig.callcode;
					var p = "";
					if (d.storeConfig.getMethods.length > 0) {
						p = "[";
						for (var k = 0; k < d.storeConfig.getMethods.length; k++) {
							var valueExp = d.storeConfig.getMethods[k].value1 == "" ? (d.storeConfig.getMethods[k].value2 == "" ? 'return ""' : d.storeConfig.getMethods[k].value2) : d.storeConfig.getMethods[k].value1;
							var paramValue = eval("(function(){" + valueExp + "})()");
							p += "{\"Key\":\"" + d.storeConfig.getMethods[k].id + "\",\"Value\":\"" + paramValue + "\"}";
							if (k != d.storeConfig.getMethods.length - 1) {
								p += ",";
							}
						}
						p += "]";
					}
					if (i != ds.length - 1) {
						paths += d.storeConfig.url + ",";
						p += "#";
					} else {
						paths += d.storeConfig.url;
					}
					params += p;
				}
			}
		}
		if (paramsList.length > 0) {
			paramsList = paramsList.substring(0, paramsList.length - 1);
			paramsList = "[" + paramsList + "]";
		}
		var useds = "0";
		if (report.nousedataset) {
			useds = "1";
		}
		// var date = MyField.getValue() || new Date();
		//  debugger
		// alert(Ext.util.Format.date(date,'Y-m-d'))
		// return
		hwDas.ajax({
			das: false,
			url: vmd.virtualPath + "/report/FillReportParse2.0.asmx/GetServerReportDataJson_VMD22",
			type: 'post',
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			data: {
				ModelXml: report.relativepath + "//" + report.path,
				isuseds: useds,
				//"mode/填报.xml",
				tablenames: report.dsnames || "",
				subrptds: report.subrptds || "",
				paramValue: paramsList || "",
				type: "hwrest",
				// 数据服务ip
				host: vmdSettings.dataServiceIp,
				// 数据服务接口
				path: paths,
				methods: "get",

				basicparams: "",
				//数据服务参数
				restparams: params,
				// restparams: "[{\"Key\":\"sqrq\",\"Value\":\"" + Ext.util.Format.date(date, 'Y-m-d') + "\"}]",
				// restparams: "[{Key:sqrq,"+"Value:"+Ext.Date.format(date,'Y-m-d')+"}]",
				contenttype: "",
				formbody: ""
			},
			success: function(result) {

				// mygrid.clearAll(true);
				var resultInfo = Ext.decode(result.d);
				if (resultInfo.value.toString().indexOf("<?xml version=\"1.0\" encoding=\"utf-8\" ?>") > -1) {
					// var mygrid = componentMapTable.getMap(id);
					//var fillReport = new FillReport(mygrid.id);
					//  mygrid.componentObj = fillReport;
					// hwv.fillreport.reports = hwv.fillreport.reports || {};
					// hwv.fillreport.reports[id + "_parent"] = fillReport;
					mygrid.loadXML(resultInfo.value,
						function() {});
				} else if (/^Data\\[a-zA-Z0-9_]+.xml/i.test(resultInfo.value)) {
					//var mygrid = componentMapTable.getMap(id);
					// var fillReport = new FillReport(mygrid.id);
					//mygrid.componentObj = fillReport;
					// hwv.fillreport.reports = hwv.fillreport.reports || {};
					// hwv.fillreport.reports[id + "_parent"] = fillReport;
					// debugger
					mygrid.grid.setAlignment(report.align);
					mygrid.grid.loadXMLFile(vmd.virtualPath + "/report/" + resultInfo.value);
					// debugger
					//mygrid.myMask.hide();

				}

			},
			error: function(msg, f) {
				mygrid.myMask.hide();
				// debugger
				Ext.Msg.alert("提示", "获取数据信息失败", function() {})
			}
		})
	},
	//查询报表
	selectRpt: function(callback) {
		var report = this;
		var mygrid = report;
		mygrid.clearAll(true);
		//  var date = MyField.getValue() || new Date();
		var ds, paths = "",
			bspar = "",
			m_host = "",
			params = "";
		if (report.dsnames) {
			ds = report.dsnames.split(",");
		}
		if (ds.length > 0) {
			for (var i = 0; i < ds.length; i++) {
				var d = eval(ds[i]);
				m_host = d.storeConfig.host;
				bspar = d.storeConfig.callcode;
				var p = "";
				if (d.storeConfig.getMethods.length > 0) {
					p = "[";
					for (var k = 0; k < d.storeConfig.getMethods.length; k++) {
						var valueExp = d.storeConfig.getMethods[k].value1 == "" ? (d.storeConfig.getMethods[k].value2 == "" ? 'return ""' : d.storeConfig.getMethods[k].value2) : d.storeConfig.getMethods[k].value1;
						var paramValue = eval("(function(){" + valueExp + "})()");
						p += "{\"Key\":\"" + d.storeConfig.getMethods[k].id + "\",\"Value\":\"" + paramValue + "\"}";
						if (k != d.storeConfig.getMethods.length - 1) {
							p += ",";
						}
					}
					p += "]";
				}
				if (i != ds.length - 1) {
					paths += d.storeConfig.url + ",";
					p += "#";
				} else {
					paths += d.storeConfig.url;
				}
				params += p;
			}
		}
		var useds = "0";
		if (report.nousedataset) {
			useds = "1";
		}
		// debugger
		// alert(Ext.util.Format.date(date,'Y-m-d'))
		// return
		hwDas.ajax({
			das: false,
			url: vmd.virtualPath + "/report/OnRequestDb2.0.asmx/GetServerReportDataJson_VMD1",
			type: 'post',
			contentType: "application/json;charset=utf-8",
			timeout: 5000,
			dataType: "json",
			data: {
				ModelXml: report.relativepath + "//" + report.path,
				isuseds: useds,
				type: "hwrest",
				//数据服务ip
				host: vmdSettings.dataServiceIp,
				// 数据服务接口
				path: paths,
				methods: "get",
				basicparams: "",
				// 数据服务参数
				restparams: params,
				// restparams: "[{\"Key\":\"sqrq\",\"Value\":\"" + Ext.util.Format.date(date, 'Y-m-d') + "\"}]",
				// restparams: "[{Key:sqrq,"+"Value:"+Ext.Date.format(date,'Y-m-d')+"}]",
				contenttype: "",
				formbody: ""
			},
			success: function(result) {
				// debugger
				mygrid.clearAll(true);
				var resultInfo = Ext.decode(result.d);
				// mygrid = new dhtmlXGridObject();
				var gridData = {};
				try {
					gridData = Ext.decode(resultInfo.value);
				} catch (exxx) {
					throw new error(resultInfo.value);
				}
				//intGrid(mygrid);
				mygrid.loadGridAttribute(gridData.attributelist);
				// mygrid.setSkin("dhx_skyblue");
				mygrid.setSkin("dhx_default");

				mygrid.init();
				mygrid.loadReportXML(vmd.virtualPath + "/report/" + gridData.xmlfilename, callback);

			},
			error: function(msg, f) {
				mygrid.myMask.hide();
				// debugger
				Ext.Msg.alert("提示", "获取数据信息失败", function() {})
			}
		})

	},
	query: function(callBack) {
		// this.myMask.show();
		// 填报报表
		if (this.fillReport) {
			this.fillRpt(callBack);
		} else {
			// 查询报表
			this.selectRpt();
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
	getTemplateArgs: function() {
		// return [this.type, 'x-btn-' + this.scale + ' x-btn-icon-' + this.scale + '-' + this.iconAlign, this.iconAlign, this.cls, this.id];
		return {
			skin: this.skin,
			width: this.width,
			height: this.height,
			columns: this.columns
		}
	},

	onRender: function(ct, position) {
		var me = this;
		me.myMask.show();

		if (!this.el) {
			//  this.el = document.createElement("div");
			//绑定属性面板中的size到网格中
			this.el = document.createElement("div");

			var defaultConfig = {
				parent: this.el,
				filter: true
			};

			if (me.fillReport) {
				this.el.style.overflow = "auto";
				this.subel = document.createElement("div");
				this.subel.id = this.id;
				this.subel.style.position = "relative";
				this.el.appendChild(this.subel);
				if (!isNaN(me.height)) {
					this.el.style.height = me.height + "px";
					this.subel.style.height = me.height + "px";
				} else {
					this.el.style.height = (ct.dom.offsetHeight || ct.dom.offsetParent.offsetHeight) + "px";
					this.subel.style.height = (ct.dom.offsetHeight || ct.dom.offsetParent.offsetHeight) + "px";
				}
				if (!isNaN(me.width)) {
					this.el.style.width = me.width + "px";
				} else {
					this.el.style.width = (ct.dom.offsetWidth || ct.dom.offsetParent.offsetWidth) + "px";
				}

				// me.grid = new FillReport(ct.dom);
				me.grid = new FillReport(this.subel);

			} else {
				this.el.id = this.id;
				this.el.className = " x-box-item";
				me.grid = new dhtmlXGridObject(this.el);
			}
		}
		//me.query();
		//me.grid.getPosition=null;
		//属性赋值
		Ext.applyIf(me, me.grid);
		//重改指向，保证dhx的原生态
		//this.el = this.el.children[0];
		// Ext.fly(this.el).addClass('vmd-Report');
		//注册事件
		this.onEventsReg(me, me.grid);
		window[me.id] = this;
		//vmd.comp.Grid.superclass.onRender.call(this, ct, position);
		this.callParent(arguments);
		this.on("afterrender",
			function() {
				//me.query();
				 if(!me.isServer&&Ext.isIE){
                    var rid=me.id;
                    this.create_MyOcxFrame_activex(rid, rid, "100%", "100%",me.ocx_version);
                }
				me.myMask.hide();
			})
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

	doLayout: function(a, b) {
		//  debugger
	},
	onResize: function(w, h) {
		var me = this;
		if (!me.fillReport) {
			var grid = me.grid;
			var gb = grid.globalBox;
			var wd = 0;
			// 带有锁定列情况的设置
			if (gb) {
				var gb_fc = grid._fake;
				if (gb_fc) {
					var gridEl = Ext.get(gb_fc.objBox);
					var h1 = 0;
					if (gb_fc.hdrBox) {
						h1 = gb_fc.hdrBox.offsetHeight;
					}
					// Ext.get(gb_fc).setHeight(h);
					gb_fc.entBox.style.height = h + "px";
					if (gridEl) {
						gridEl.setHeight(h - h1);
					}
					wd = gb_fc.objBox.clientWidth;
				}
			}
			var gridEl = Ext.get(grid.objBox);
			var h1 = 0;
			if (grid.hdrBox) {
				h1 = grid.hdrBox.offsetHeight;
			}
			if (gridEl) {
				gridEl.setHeight(h - h1);
			}
			if (grid._width) {
				grid.entBox.style.width = (grid._width > w - wd ? w - wd : grid._width) + "px";
			}
		}
	},
	onEventsReg: function(My, Mygrid) {
		Mygrid.attachEvent("onRowSelect",
			function(id) {
				My.fireEvent('rowSelect', Mygrid, id)
			});
		Mygrid.attachEvent("onBeforeRowDeleted",
			function(rowId) {
				My.fireEvent('beforeRowDeleted', Mygrid, rowId)
			});
		Mygrid.attachEvent("onCheckbox",
			function(rowId, cellInd, state) {
				My.fireEvent('checkbox', Mygrid, rowId, cellInd, state)
			});
		Mygrid.attachEvent("onEnter",
			function(rowId, cellInd) {
				My.fireEvent('enter', Mygrid, rowId, cellInd)
			});
		Mygrid.attachEvent("onRowDblClicked",
			function(rowId) {
				My.fireEvent('rowDblClicked', Mygrid, rowId)
			});
		Mygrid.attachEvent("onEditCell",
			function(stage, rowId, cellInd) {
				My.fireEvent('editCell', Mygrid, stage, rowId, cellInd)
			});

		//Mygrid.attachEvent("onFillReportResize", function (stage, rowId, cellInd) {
		//调整布局适应滚动条
		//My.ownerCt.doLayout();

		//});
	},
	// 加载数据文件
	loadReportXML: function(xmlPath, callback) {
		var me = this;
		this.loadXML(xmlPath, function() {
			callback && callback.call(me);
			me.myMask.hide();
		});
	},
	// 打印
	print: function() {
		var me = this;
		 if(!me.isServer&&Ext.isIE){
            var rid=me.id;
            var ocx = document.getElementById(rid+"_ocx");
            ocx.IPrint();
        }
		else{
			var grid;
			if (me.fillReport) {
				grid = this.grid.grid;
				me.grid.grid.clearSelection();
			} else {
				grid = this.grid;
				me.grid.clearSelection();
			}
			
			var reportDom = $('#' + me.id);
			reportDom.removeClass("x-box-item");
			var cloneDom = reportDom.clone();
			//存在锁定列
			if(grid._fake){
				var cloneDom_fakeDivDom = cloneDom[0].children[0];
				var cloneDom_gridDivDom = cloneDom[0].children[1];
				
				var reportDom_fakeDivDom_hdr = reportDom[0].children[0].children[0];
				var reportDom_gridDivDom_hdr = reportDom[0].children[1].children[0];
				var reportDom_fakeDivDom_table = reportDom[0].children[0].children[1].children[0];
				var reportDom_gridDivDom_table = reportDom[0].children[1].children[1].children[0];
				
				
				var cloneDom_fakeDivDom_objbox = cloneDom_fakeDivDom.children[1];
				var cloneDom_gridDivDom_objbox = cloneDom_gridDivDom.children[1];
				
				var cloneDom_fakeDivDom_table = cloneDom_fakeDivDom_objbox.children[0];
				var cloneDom_gridDivDom_table = cloneDom_gridDivDom_objbox.children[0];
				
				var printHeight = Math.max(reportDom_fakeDivDom_hdr.clientHeight + reportDom_fakeDivDom_table.clientHeight, reportDom_gridDivDom_hdr.clientHeight + reportDom_gridDivDom_table.clientHeight);
				
				cloneDom_fakeDivDom_objbox.style.height = printHeight + "px";
				cloneDom_gridDivDom_objbox.style.height = printHeight + "px";
				
				cloneDom_fakeDivDom.style.height = printHeight + "px";
				cloneDom_gridDivDom.style.height = printHeight + "px";
				
				cloneDom[0].style.height = printHeight + "px";
			}
			else{
				var cloneDom_gridDivDom = cloneDom[0];
				
				var reportDom_gridDivDom_hdr = reportDom[0].children[0];
				var reportDom_gridDivDom_table = reportDom[0].children[1].children[0];
				
				var cloneDom_gridDivDom_objbox = cloneDom_gridDivDom.children[1];
				
				var cloneDom_gridDivDom_table = cloneDom_gridDivDom_objbox.children[0];
				
				var printHeight = reportDom_gridDivDom_hdr.clientHeight + reportDom_gridDivDom_table.clientHeight;
				
				cloneDom_gridDivDom_objbox.style.height = printHeight + "px";
				
				cloneDom_gridDivDom.style.height = printHeight + "px";
				
				cloneDom[0].style.height = printHeight + "px";
			}
			cloneDom.print();
		}
	},
	  selectFields: function () {
       var me = this;
        if(!me.isServer&&Ext.isIE){
            var rid=me.id;
            var ocx = document.getElementById(rid+"_ocx");
            ocx.ISetSelectFieldsButtonEnable("leftmove");
            ocx.ISetSelectFieldsButtonEnable("rightmove");
            var name= me.path.substring(0,me.path.indexOf(".xml"));
            ocx.IDoSelectFields("c:\\HwTemplet\\" +name + ".txt");
        }
    },

	//打印联单
	printBill: function(bills) {
		//数组，几个元素为几连单
		//[{
		//    cells: [{ row: 2, col: 11, value: "存根" }]
		//}, {
		//    cells: [{ row: 2, col: 11, value: "委托方取报告和领取退样" }]
		//}, {
		//    cells: [{ row: 2, col: 11, value: "随样品及报告流转后存档" }]
		//}]
		var me = this;
		me.grid.grid.clearSelection();
		var options = arguments[0] || {};
		options.style = {
			position: ''
		};

		var container = document.createElement("div");
		var grid = this.grid.grid;
		for (var i = 0; i < bills.length; i++) {
			//替换单元格内容
			var cells = bills[i].cells;
			for (var j = 0; j < cells.length; j++) {
				var cellObj = grid.cells2(cells[j].row, cells[j].col);
				cells[j].oldValue = cellObj.getValue();
				cellObj.setValue(cells[j].value);
			}
			var reportDom = $('#' + me.id);
			reportDom.removeClass("x-box-item");
			var cloneDom = reportDom.clone();
			cloneDom.css({
				pageBreakAfter: 'always',
				position: ""
			});
			$(container).append(cloneDom);
			for (var j = 0; j < cells.length; j++) {
				var cellObj = grid.cells2(cells[j].row, cells[j].col);
				cellObj.setValue(cells[j].oldValue);
			}
		}
		$(container).print(options);
	},

	printImage: function() {
		var me = this;
		me.grid.grid.clearSelection();
		var reportDom = $('#dhxgrid_upload_container');
		var options = arguments[0] || {};
		options.globalStyles = false;
		reportDom.print(options);
	},
	PageSetup_Null: function() {
		try {
			var HKEY_Root, HKEY_Path, HKEY_Key;
			HKEY_Root = "HKEY_CURRENT_USER";
			HKEY_Path = "//Software//Microsoft//Internet Explorer//PageSetup//";
			var Wsh = new ActiveXObject("WScript.Shell");
			HKEY_Key = "header";
			Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
			HKEY_Key = "footer";
			Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
		} catch (e) {}
	},
	// 获取值
	getValue: function() {
		var me = this.grid;
		if (me && arguments.length == 1) {
			return me.getValue(me, arguments[0]);
		} else if (me && arguments.length == 2) {
			return me.getValue(arguments[0], arguments[1]);
		} else {
			return "";
		}
	},

	//保存表
	save: function() {
		var me = this;
		me.grid.params = me.params;
		//save()
		if (arguments.length == 0) {
			me.grid.submitdb(me.grid);
		} else if (arguments.length == 1) {
			//save(successCallBack)
			if (typeof arguments[0] === "function") {
				me.grid.submitdb(me.grid, arguments[0]);
			}
			//save(reportName)
			else {
				me.grid.submitdb(arguments[0]);
			}
		} else if (arguments.length == 2) {
			//save(successCallBack,errorCallBack)
			if (typeof arguments[0] === "function" && typeof arguments[1] === "function") {
				me.grid.submitdb(me.grid, arguments[0], arguments[1]);
			}
			//save(reportName,successCallBack)
			else {
				me.grid.submitdb(arguments[0], arguments[1]);
			}
		} else if (arguments.length == 3) {
			//save(reportName,successCallBack,errorCallBack)
			me.grid.submitdb(arguments[0], arguments[1], arguments[2]);
		} else {
			Ext.Msg.alert("提示", "参数不正确！",
				function() {})
		}
	},

	//导入excel
	importExcel: function() {
		var me = this;
		if (arguments.length == 0) {
			me.grid.importExcel();
		} else if (arguments.length == 1) {
			//save(successCallBack)
			if (typeof arguments[0] === "function") {
				me.grid.importExcel("", arguments[0]);
			}
			//save(reportName)
			else {
				me.grid.importExcel(arguments[0]);
			}
		} else if (arguments.length == 2) {
			me.grid.importExcel(arguments[0], arguments[1]);
		}
	},
	// 导出/另存为excel
	exportExcel: function() {
		var me = this;
        if(!me.isServer&&Ext.isIE){
            var rid=me.id;
            var ocx = document.getElementById(rid+"_ocx");
            ocx.ISave();
        }
        else{
			var title = me.path.substring(me.path.lastIndexOf("/") + 1, me.path.indexOf(".xml"));
			var cacheDataName;
			if(me.xmlFileUrl){
			cacheDataName = me.xmlFileUrl;
			}
		   else{
			cacheDataName=title;
		   }
			// var cacheDataName =  title;
			//  if (!cacheDataName) return
			//cacheDataName = cacheDataName.substring(cacheDataName.lastIndexOf("/") + 1, cacheDataName.indexOf(".xml"));
			var WinWidth = 200;
			var WinHeight = 100;
			var WinLeft = Math.round((screen.availWidth - WinWidth) / 2);
			var WinTop = Math.round((screen.availHeight - WinHeight) / 2);
			var WinPar = "height=" + WinHeight + ",width=" + WinWidth + ",left=" + WinLeft + ",top=" + WinTop + ",status=no,toolbar=no,menubar=no,location=no,resizable=0";
			window.open(vmd.virtualPath + "/report/handler/DoExcelSave.aspx?cachname=" + cacheDataName + "&reportname=" + escape(title), "_self", WinPar);
			window.focus();
		}
	},
	// 下载excel模版
	loadExcel: function() {
		var me = this;
		var title = me.path.substring(me.path.lastIndexOf("/") + 1, me.path.indexOf(".xml"));
		var cacheDataName = me.relativepath;
		if (!cacheDataName) return;
		var WinWidth = 200;
		var WinHeight = 100;
		var WinLeft = Math.round((screen.availWidth - WinWidth) / 2);
		var WinTop = Math.round((screen.availHeight - WinHeight) / 2);
		var WinPar = "height=" + WinHeight + ",width=" + WinWidth + ",left=" + WinLeft + ",top=" + WinTop + ",status=no,toolbar=no,menubar=no,location=no,resizable=0";
		window.open(vmd.virtualPath + "/report/handler/LoadExcel.aspx?cachname=" + cacheDataName + "&reportname=" + escape(title), "", WinPar);
		window.focus();
	},
	fillRptPost: function(url, data, formAttributes) {
		// create the form
		var me = this;
		var form = me.createElementRpt('form', {
				method: 'post',
				action: url,
				enctype: 'multipart/form-data'
			}, {
				display: 'none'
			},
			document.body);

		// add the data
		me.objectEachRpt(data,
			function(val, name) {
				me.createElementRpt('input', {
						type: 'hidden',
						name: name,
						value: val
					},
					null, form);
			});

		// submit
		form.submit();

		// clean up
		me.discardElement(form);
	},
	discardElement: function(element) {
		var garbageBin = this.createElementRpt('div');
		// move the node and empty bin
		if (element) {
			garbageBin.appendChild(element);
		}
		garbageBin.innerHTML = '';
	},
	createElementRpt: function(tag, attribs, styles, parent, nopad) {
		var el = document.createElement(tag);
		// css = H.css;
		if (attribs) {
			this.extendRpt(el, attribs);
		}
		if (parent) {
			parent.appendChild(el);
		}
		return el;
	},
	extendRpt: function(a, b) {
		var n;
		if (!a) {
			a = {};
		}
		for (n in b) {
			a[n] = b[n];
		}
		return a;
	},

	objectEachRpt: function(obj, fn, ctx) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				fn.call(ctx || obj[key], obj[key], key, obj);
			}
		}
	},

	// 填报导出/另存为excel
	exportExcelFillRpt: function(params) {
		var me = this;

		var title = me.path.substring(me.path.lastIndexOf("/") + 1, me.path.indexOf(".xml"));;
		var cacheDataName = title;
		// if (!cacheDataName) return
		// cacheDataName = cacheDataName.substring(cacheDataName.lastIndexOf("/") + 1, cacheDataName.indexOf(".xml"));
		var jsonStr = me.grid.getExportExcelJSON(params);

		me.fillRptPost(vmd.virtualPath + "/report/FillRptExcelSave.ashx", {
			cname: cacheDataName,
			rptname: (title || 'report').replace(/[ ]/g, ""),
			// type: options.type,
			// width: options.width || 0, // IE8 fails to post undefined correctly, so use 0
			// scale: options.scale || 2,
			jsonstr: escape(JSON.stringify(jsonStr)),
            xmlfilepath:me.relativepath+"//"+me.path
		}, {});

		/*hwDas.ajax({
		 das: false,
		 url: vmd.virtualPath+"/report/ExcelSaveFillRpt.asmx/FillRptSaveExcel",
		 type: 'post',
		 contentType: "application/json;charset=utf-8",
		 dataType: "html",
		 data: {
		 CachFileName:cacheDataName,
		 ReportName:title,
		 jsonStr:JSON.stringify(jsonStr)

		 },
		 success: function(result) {
		 alert("导出成功！")
		 },
		 error: function(msg, f) {
		 alert("导出失败！")
		 }
		 })

		 var uploadPath=vmd.virtualPath+"/report/ExcelSaveFillRpt.asmx/FillRptSaveExcel"
		 var d = document.createElement("div");
		 d.style.display = "none";
		 document.body.appendChild(d);
		 var uid = "form_expexcel";

		 d.innerHTML = '<form id="' + uid + '" method="post" action="'+uploadPath+'" accept-charset="utf-8"  enctype="application/x-www-form-urlencoded"'  + this.target + '>'+
		 '<input type="hidden" name="jsonStr" id="jsonStr"/>'+
		 '<input type="hidden" name="ReportName" id="ReportName"/>'+
		 '<input type="hidden" name="CachFileName" id="CachFileName"/></form>';

		 document.getElementById(uid).firstChild.value = typeof JSON2 != "undefined" ? JSON.stringify(jsonStr): "[]";
		 document.getElementById(uid).children[1].value=title;
		 document.getElementById(uid).children[2].value=cacheDataName;
		 document.getElementById(uid).submit();
		 d.parentNode.removeChild(d);
		 */
		//window.open(vmd.virtualPath + "/report/handler/FillRptDoExcelSave.aspx?cachname=" + cacheDataName + "&reportname=" + escape(title)+ "&jsonStr=" + escape(jsonStr), "", WinPar);
		// window.focus();
	},

	getFillReport: function() {
		return this.grid;
	},

	onEditCell: function(e) {
		// debugger
	},
	onEnter: function(e) {
		//  debugger
	},
	onDestroy: function() {

		if (this.rendered) {
			//bug修复，清除dhx组件拖拽就在body中累加的combo的dom结构
			//Ext.select('body>div[class*=dhxgridlist]').remove();
		}
	},
	setParamValue: function(pname, pvalue) {

		this.paramsList += "{\"Key\":\"" + pname + "\",\"Value\":\"" + pvalue + "\"},";

	},
	//查询填报
	fillRpt: function(callBack) {
		var report = this;
		var mygrid = report;

		if (isNaN(report.height)) {
			report.el.dom.style.height = report.el.dom.offsetParent.offsetParent.offsetHeight + "px";
		}
		if (isNaN(report.width)) {
			report.el.dom.style.width = report.el.dom.offsetParent.offsetParent.offsetWidth + "px";
		}

		var paramsList = mygrid.paramsList;
		// mygrid.clearAll(true);
		var ds, paths = "",
			bspar = "",
			m_host = "",
			params = "";
		if (report.dsnames) {
			ds = report.dsnames.split(",");
		}
		if (ds.length > 0) {
			for (var i = 0; i < ds.length; i++) {
				var d = eval(ds[i]);
				if (d) {
					m_host = d.storeConfig.host;
					bspar = d.storeConfig.callcode;
					var p = "";
					if (d.storeConfig.getMethods.length > 0) {
						p = "[";
						for (var k = 0; k < d.storeConfig.getMethods.length; k++) {
							var valueExp = d.storeConfig.getMethods[k].value1 == "" ? (d.storeConfig.getMethods[k].value2 == "" ? 'return ""' : d.storeConfig.getMethods[k].value2) : d.storeConfig.getMethods[k].value1;
							var paramValue = eval("(function(){" + valueExp + "})()");
							p += "{\"Key\":\"" + d.storeConfig.getMethods[k].id + "\",\"Value\":\"" + paramValue + "\"}";
							if (k != d.storeConfig.getMethods.length - 1) {
								p += ",";
							}
						}
						p += "]";
					}
					if (i != ds.length - 1) {
						paths += d.storeConfig.url + ",";
						p += "#####";
					} else {
						paths += d.storeConfig.url;
					}
					params += p;
				}
			}
		}
		if (paramsList.length > 0) {
			paramsList = paramsList.substring(0, paramsList.length - 1);
			paramsList = "[" + paramsList + "]";
		}
		var useds = "0";
		if (report.nousedataset) {
			useds = "1";
		}
		 var hwToken=Cookie.get('hwToken')||getUrlParam("hwToken");
		var dsip;
		if (vmd.workspace) {
			dsip = vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp;
		} else {
			dsip = vmdSettings.dataServiceIp;
		}
		// var date = MyField.getValue() || new Date();
		//  debugger
		// alert(Ext.util.Format.date(date,'Y-m-d'))
		// return
		hwDas.ajax({
			das: false,
			url: vmd.virtualPath + "/report/FillReportParse2.0.asmx/GetServerReportDataJson_VMD22",
			type: 'post',
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			data: {
				ModelXml: report.relativepath + "//" + report.path,
				isuseds: useds,
				//"mode/填报.xml",
				tablenames: report.dsnames || "",
				subrptds: report.subrptds || "",
				paramValue: paramsList || "",
				type: "hwrest",
				// 数据服务ip
				host: dsip,
				// 数据服务接口
				path: paths,
				methods: "get",

				basicparams: "",
				//数据服务参数
				restparams: params,
				// restparams: "[{\"Key\":\"sqrq\",\"Value\":\"" + Ext.util.Format.date(date, 'Y-m-d') + "\"}]",
				// restparams: "[{Key:sqrq,"+"Value:"+Ext.Date.format(date,'Y-m-d')+"}]",
				contenttype: "",
				formbody: "",
				token:hwToken
			},
			success: function(result) {

				// mygrid.clearAll(true);
				var resultInfo = Ext.decode(result.d);
				if (resultInfo.value.toString().indexOf("<?xml version=\"1.0\" encoding=\"utf-8\" ?>") > -1) {
					// var mygrid = componentMapTable.getMap(id);
					//var fillReport = new FillReport(mygrid.id);
					//  mygrid.componentObj = fillReport;
					// hwv.fillreport.reports = hwv.fillreport.reports || {};
					// hwv.fillreport.reports[id + "_parent"] = fillReport;
					mygrid.loadXML(resultInfo.value,
						function() {});
				} else if (/^Data\\[a-zA-Z0-9_]+.xml/i.test(resultInfo.value)) {
					//var mygrid = componentMapTable.getMap(id);
					// var fillReport = new FillReport(mygrid.id);
					//mygrid.componentObj = fillReport;
					// hwv.fillreport.reports = hwv.fillreport.reports || {};
					// hwv.fillreport.reports[id + "_parent"] = fillReport;
					// debugger
					//连接不上数据库，查不到数据，报错，结束掉进度条
					if (resultInfo.value.indexOf("通过web服务获取表失败") != -1) {
						mygrid.myMask.hide();
					}
					mygrid.grid.setAlignment(report.align);
					mygrid.grid.loadXMLFile(vmd.virtualPath + "/report/" + resultInfo.value, callBack);
					// debugger
					mygrid.myMask.hide();

				}

			},
			error: function(msg, f) {
				mygrid.myMask.hide();
				var e = msg;
				if (e && e.indexOf("异常信息") > -1) {
					e = e.substring(e.indexOf("异常信息") + 5);
				}
				if (e && e.indexOf("StackTrace") > -1) {
					e = e.substring(0, e.indexOf("StackTrace"));
				}
				var tipStr = "";
				if (e) tipStr = e;
				else tipStr = "获取数据出错。";
				// debugger
				vmd.alert("提示", tipStr, null, {
					icon: Ext.Msg.ERROR
				})
			}
		})
	},
	//简单网格填报
	fillRpt_Grid: function() {
		var report = this;
		var mygrid = report;

		if (isNaN(report.height)) {
			report.el.dom.style.height = report.el.dom.offsetParent.offsetParent.offsetHeight + "px";
		}
		if (isNaN(report.width)) {
			report.el.dom.style.width = report.el.dom.offsetParent.offsetParent.offsetWidth + "px";
		}

		var paramsList = mygrid.paramsList;
		// mygrid.clearAll(true);
		var paths = "",
			bspar = "",
			m_host = "",
			params = "";

		if (paramsList.length > 0) {
			paramsList = paramsList.substring(0, paramsList.length - 1);
			paramsList = "[" + paramsList + "]";
		}

		var dsip;
		if (vmd.workspace) {
			dsip = vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp;
		} else {
			dsip = vmdSettings.dataServiceIp;
		}

		hwDas.ajax({
			das: false,
			url: vmd.virtualPath + "/report/OnRequestDb2.3.asmx/GetServerReportDataJson_VMD23",
			type: 'post',
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			data: {
				ModelXml: report.relativepath + "//" + report.path,
				tablenames: report.dsnames || "",
				type: "hwrest",
				//数据服务ip
				host: dsip,
				// 数据服务接口
				path: paths,
				methods: "get",
				basicparams: "",
				// 数据服务参数
				restparams: params,
				// restparams: "[{\"Key\":\"sqrq\",\"Value\":\"" + Ext.util.Format.date(date, 'Y-m-d') + "\"}]",
				// restparams: "[{Key:sqrq,"+"Value:"+Ext.Date.format(date,'Y-m-d')+"}]",
				contenttype: "",
				formbody: ""
			},
			success: function(result) {
				var resultInfo = Ext.decode(result.d);
				mygrid.grid = new FillReport(mygrid.subel);
				mygrid.grid.setAlignment(report.align);
				mygrid.grid.loadJSON(resultInfo.value);
				mygrid.myMask.hide();
			},
			error: function(msg, f) {
				mygrid.myMask.hide();
				var e = msg;
				if (e && e.indexOf("异常信息") > -1) {
					e = e.substring(e.indexOf("异常信息") + 5);
				}
				if (e && e.indexOf("StackTrace") > -1) {
					e = e.substring(0, e.indexOf("StackTrace"));
				}
				var tipStr = "";
				if (e)
					tipStr = e;
				else
					tipStr = "获取数据出错。";
				// debugger
				vmd.alert("提示", tipStr, null, {
					icon: Ext.Msg.ERROR
				})
			}
		})

	},
	//填报自动调整修改
	fillReportResize: function(diff) {
		var report = this;
		var fillreport = report.grid;
		var rptDom = fillreport.grid.objBox;
		var _resizeHeight = function() {

			var h = fillreport.grid.obj.clientHeight + (diff || 0);
			var resizeh = h - 2;
			report.ownerCt.setHeight(h);
			report.el.first().setHeight(resizeh);
			Ext.get(rptDom).setHeight(resizeh);

		}

		fillreport.attachEvent("onFillReportResize", function() {

			_resizeHeight()

		});
		_resizeHeight()
	},
	//查询报表
	selectRpt: function(callBack,showTypes) {
		var report = this;
		if (!isNaN(report.height)) {
			report.el.dom.style.height = report.height + "px";
		} else {
			//	report.entBox.style.display="none"
			report.entBox.style.visibility = "hidden"
			//if(report.entBox.style.width&&report.entBox.style.width.indexOf('px')==-1)
			report.entBox.style.width = "100%";
			report.entBox.style.height = "100%";
			if (report.el.dom.parentNode.parentNode) {
				report.el.dom.style.height = report.el.dom.parentNode.parentNode.offsetHeight + "px";
			} else if (report.el.dom.parentNode) {
				report.el.dom.style.height = report.el.dom.parentNode.offsetHeight + "px";
			}
			report.ownerCt.doLayout();
		}
		if (!isNaN(report.width)) {
			report.el.dom.style.width = report.width + "px";
		} else {
			report.el.dom.style.width = (report.el.dom.offsetWidth || report.el.dom.parentNode.offsetWidth || report.el.dom.parentNode.parentNode.offsetWidth) + "px";
		}
		var mygrid = report;
		mygrid.clearAll(true);
		//  var date = MyField.getValue() || new Date();
		var ds, paths = "",
			bspar = "",
			m_host = "",
			params = "";
		if (report.dsnames) {
			ds = report.dsnames.split(",");
		}
		if (ds && ds.length > 0) {
			for (var i = 0; i < ds.length; i++) {
				var d = eval(ds[i]);
				m_host = d.storeConfig.host;
				bspar = d.storeConfig.callcode;
				var p = "";
				if (d.storeConfig.getMethods.length > 0) {
					p = "[";
					for (var k = 0; k < d.storeConfig.getMethods.length; k++) {
						var valueExp = d.storeConfig.getMethods[k].value1 == "" ? (d.storeConfig.getMethods[k].value2 == "" ? 'return ""' : d.storeConfig.getMethods[k].value2) : d.storeConfig.getMethods[k].value1;
						var paramValue = eval("(function(){" + valueExp + "})()");
						p += "{\"Key\":\"" + d.storeConfig.getMethods[k].id + "\",\"Value\":\"" + paramValue + "\"}";
						if (k != d.storeConfig.getMethods.length - 1) {
							p += ",";
						}
					}
					p += "]";
				}
				if (i != ds.length - 1) {
					paths += d.storeConfig.url + ",";
					p += "#####";
				} else {
					paths += d.storeConfig.url;
				}
				params += p;
			}
		} else {
			report.myMask.hide();
			return;
		}
		var useds = "0";
		if (report.nousedataset) {
			useds = "1";
		}
		var hwToken=Cookie.get('hwToken')||getUrlParam("hwToken");
		var dsip;
		if (vmd.workspace) {
			dsip = vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp;
		} else {
			dsip = vmdSettings.dataServiceIp;
		}
		mygrid.myMask.show();
	if(report.isServer==undefined||report.isServer||!Ext.isIE){
     if(showTypes) {
            report.requestHeader(paths, params, showTypes, function (grid) {
                report.requestData(grid, paths, params, showTypes, function () {
                    if (callBack) {
                        callBack.apply(report, [mygrid]);
                    }
                })
            });
        }else {
         // debugger
         // alert(Ext.util.Format.date(date,'Y-m-d'))
         // return
         hwDas.ajax({
             das: false,
             url: vmd.virtualPath + "/report/OnRequestDb2.2.asmx/GetServerReportDataJson_VMD1",
             type: 'post',
             contentType: "application/json;charset=utf-8",
             dataType: "json",
             data: {
                 ModelXml: report.relativepath + "//" + report.path,
                 isuseds: useds,
                 type: "hwrest",
                 //数据服务ip
                 host: dsip,
                 // 数据服务接口
                 path: paths,
                 methods: "get",
                 basicparams: "",
                 // 数据服务参数
                 restparams: params,
                 // restparams: "[{\"Key\":\"sqrq\",\"Value\":\"" + Ext.util.Format.date(date, 'Y-m-d') + "\"}]",
                 // restparams: "[{Key:sqrq,"+"Value:"+Ext.Date.format(date,'Y-m-d')+"}]",
                 contenttype: "",
                 formbody: "",
                 showType: "",
                 queryType: "",
				 token:hwToken
             },
             success: function (result) {
                 mygrid.entBox.style.visibility = "visible"
                 // debugger
                 //mygrid.clearAll(true);
                 report.el.dom.className = report.el.dom.className.replace("x-box-item", "");
                 mygrid = new dhtmlXGridObject(report.el.dom);
                 report.grid = mygrid;

                 function FloatCenter(sLeft, sTop) {
                     for (var i = 0; i < mygrid.hdr.rows.length; i++) {

                         var isFloatTitle = false;
                         var gridContainer = null;
                         var floatTitleContainerH = null;
                         var floatTitleContainerW = null;
                         var titleText = "";
                         var titleStyle = null;

                         //没有锁定列，并且标题单元格全部合并
                         if ( mygrid.hdr.rows[i].clientHeight != 0 &&mygrid.hdr.rows[i].cells.length == 1) {
                             var centerCell = mygrid.hdr.rows[i].cells[0];
                             mygrid.hdr.rows[i].style.height = mygrid.hdr.rows[i].offsetHeight + "px";
                             isFloatTitle = true;
                             titleText = centerCell.innerText;
                             titleStyle = centerCell.style.cssText;
                             gridContainer = mygrid.entBox;
                             floatTitleContainerH = mygrid.hdr.rows[i].offsetHeight - 4;
                             floatTitleContainerW = Math.min(gridContainer.offsetWidth, centerCell.offsetWidth) - 4;
							 if(centerCell.offsetWidth > floatTitleContainerW){
								floatTitleContainerW -= 20;
							}
                             if (centerCell && centerCell.firstChild && centerCell.firstChild.style) {
                                 centerCell.firstChild.style.display = "none";
                             }
                         }
                         //有锁定列，并且标题单元格都合并
                         else if (mygrid._fake&& mygrid.hdr.rows[i].clientHeight != 0  && mygrid._fake.hdr.rows[i].cells.length == 1 && mygrid.hdr.rows[i].cells.length == 2) {
                             var fakeCell = mygrid._fake.hdr.rows[i].cells[0];
                             var centerCell = mygrid.hdr.rows[i].cells[1];
                             mygrid.hdr.rows[i].style.height = mygrid.hdr.rows[i].offsetHeight + "px";
                             isFloatTitle = true;
                             titleText = centerCell.innerText;
                             titleStyle = centerCell.style.cssText;
                             gridContainer = mygrid._fake.entBox.parentNode;
                             floatTitleContainerH = mygrid._fake.hdr.rows[i].offsetHeight - 4;
                             floatTitleContainerW = Math.min(gridContainer.offsetWidth, fakeCell.offsetWidth + centerCell.offsetWidth) - 4;
							 if((fakeCell.offsetWidth + centerCell.offsetWidth) > floatTitleContainerW){
								floatTitleContainerW -= 20;
							}
                             centerCell.firstChild.style.display = "none";
                         }

                         if (isFloatTitle) {
                             var t_floatTitleContainer = mygrid["floatTitleContainer" + i];
                             if (!t_floatTitleContainer) {
                                 t_floatTitleContainer = mygrid["floatTitleContainer" + i] = document.createElement("table");
                                 t_floatTitleContainer.className = "hdr";
                                 var tr = document.createElement("tr");
                                 var td = document.createElement("td");
                                 var tmpTitlediv = document.createElement("div");
                                 td.appendChild(tmpTitlediv);
                                 tr.appendChild(td);
                                 t_floatTitleContainer.appendChild(tr);

                                 //t_floatTitleContainer.innerHTML = "<tr><td style='border-width:0px;'><div class='hdrcell' style='" + titleStyle + ";border-width:0px;line-height:" + (floatTitleContainerH - 8) +"px'>" + titleText + "</div></td></tr>";
                                 report.el.dom.style.position = "relative";
                                 //if (!dhx4.isIE) {
                                     t_floatTitleContainer.style.zIndex = 100;
                                     t_floatTitleContainer.style.position = "absolute";
                                     t_floatTitleContainer.style.borderCollapse = "collapse";
                                     t_floatTitleContainer.style.borderSpacing = "0px";
                                     t_floatTitleContainer.style.top = "2px";
                                     t_floatTitleContainer.style.left = "2px";
                                     t_floatTitleContainer.style.height = (floatTitleContainerH - 4) + "px";
                                     t_floatTitleContainer.style.lineHeight = (floatTitleContainerH - 4) + "px";
                                     t_floatTitleContainer.style.width = floatTitleContainerW + "px";
                                     t_floatTitleContainer.style.borderWidth = "0px";
                                     t_floatTitleContainer.style.padding = "0px";
                                     t_floatTitleContainer.style.margin = "0px";

                                     tmpTitlediv.className = "hdrcell";
                                     tmpTitlediv.style.cssText = titleStyle;
                                     tmpTitlediv.style.borderWidth = "0px";
                                     tmpTitlediv.style.lineHeight = (floatTitleContainerH - 4) + "px";
                                     tmpTitlediv.style.height = (floatTitleContainerH - 4) + "px";
                                     tmpTitlediv.style.padding = "0px";
                                     tmpTitlediv.innerHTML = titleText;
                                     td.style.borderWidth = "0px";
                                     td.style.backgroundColor = "transparent";
                                     td.style.filter = "Alpha(opacity=60)";
                                 //} else {
                                 //    t_floatTitleContainer.style.cssText = t_floatTitleContainer.style.cssText + ";position:absolute;top:0px;border-collapse:collapse;border-spacing:0px;z-index:100;height:" + (floatTitleContainerH - 4) + "px;line-height:" + (floatTitleContainerH - 4) + "px;width:" + floatTitleContainerW + "px;border-width:0px;padding:0px;margin:0px;";

                                 //    tmpTitlediv.className = "hdrcell";
                                 //    tmpTitlediv.style.cssText = titleStyle + ";border-width:0px;line-height:" + (floatTitleContainerH - 4) + "px;height:" + (floatTitleContainerH - 4) + "px;";
                                 //    tmpTitlediv.innerHTML = titleText;
                                 //    td.style.cssText = "border-width:0px;background-color:transparent;filter:Alpha(opacity=60);";
                                 //}
                                 gridContainer.appendChild(t_floatTitleContainer);
                             }
                             return;
                         }
                     }
                 }

                 /*mygrid.attachEvent("onXLE",
                  function(cInd, cWidth, obj) {
                  FloatCenter();
                  return true;
                  });*/

                 //mygrid.attachEvent("onResize", function (cInd, cWidth, obj) {
                 //    FloatCenter();
                 //    return true;
                 //});
                 mygrid.attachEvent("onScroll",
                     function (sLeft, sTop) {
                         FloatCenter(sLeft, sTop);
                         return true;
                     });

                 mygrid.loadReportXML = report.loadReportXML;
                 mygrid.myMask = report.myMask;
                 mygrid.setImagePath(vmd.virtualPath + "/report/dhtmlx/dhtmlxGrid/codebase/imgs/");
                 var resultInfo = Ext.decode(result.d);
                 // mygrid = new dhtmlXGridObject();
                 var gridData = {};
                 try {
                     gridData = Ext.decode(resultInfo.value);
                 } catch (exxx) {
                     throw new error(resultInfo.value);
                 }
                 if (gridData) {
                     //intGrid(mygrid);
                     mygrid.loadGridAttribute(gridData.attributelist);
                     // mygrid.setSkin("dhx_skyblue");
                     mygrid.setSkin("dhx_default");
                     mygrid.dontSetSizes = true;
                     //设置容器的大小
                     var totalWidth = 0;
                     for (var i = 0; i < gridData.attributelist.length; i++) {
                         if (gridData.attributelist[i].key == "setInitWidths") {
                             totalWidth = eval(gridData.attributelist[i].value.replace(/,/g, '+'));
                         }
                     }

                     var _width = ((totalWidth + 20) > mygrid.entBox.parentNode.offsetWidth ? mygrid.entBox.parentNode.offsetWidth : (totalWidth + 20));
                     report.grid._width = totalWidth;
                     if (report.align == "center") {
                         mygrid.entBox.style.width = _width + "px";
                     } else {
                         mygrid.entBox.style.width = mygrid.entBox.parentNode.offsetWidth;
                     }
                     mygrid.entBox.style.height = (mygrid.entBox.parentNode.offsetHeight || mygrid.entBox.parentNode.parentNode.offsetHeight) + 'px';
                     mygrid.entBox.style.margin = "0 auto";
                     if (report.beforeInitFunc) {
                         report.beforeInitFunc.apply(report, [mygrid]);
                     }
                     mygrid.init();

                     FloatCenter();
                     mygrid.hdr.className += " rpt-header";
                     mygrid.obj.className += " rpt-data";
                     if (mygrid._fake) {
                         mygrid._fake.hdr.className += " rpt-header lock";
                         mygrid._fake.obj.className += " rpt-data lock";
                         mygrid.globalBox.className += " vmd-rpt";
                     }
                     else {
                         mygrid.entBox.className += " vmd-rpt";
                     }
                     // 获取数据表信息失败后结束进度条
                     if (resultInfo.value.indexOf("通过web服务获取表失败") != -1) {
                         mygrid.myMask.hide();
                     }
                     var index1 = gridData.xmlfilename.indexOf("Data/") + 5;
                     var index3 = gridData.xmlfilename.indexOf(".xml");
                     report.xmlFileUrl = gridData.xmlfilename.substring(index1, index3);
                     //Data/292DEB8D88D34d3687C976E850F2898E.xml
                     mygrid.loadReportXML(vmd.virtualPath + "/report/" + gridData.xmlfilename, function () {
                         //mygrid.loadReportXML(vmd.virtualPath + "/report/" + "Data/F81873D66D794893803F2FF904DDF4F9.xml", callBack);
                         mygrid.myMask.hide();
                         if (mygrid.noHeader) {
                             mygrid.forEachCell(mygrid.getRowId(0), function (cellObj, ind) {
                                 cellObj.cell.className += " vmd-top";
                             });
                         }
                         if (callBack) {
                             callBack.apply(report, [mygrid]);
                         }
                     });
                 } else {
                     if (resultInfo.errMsg) {
                         mygrid.myMask.hide();
                         //Ext.Msg.alert("提示", resultInfo.errMsg, function() {})
                         vmd.alert("提示", resultInfo.errMsg, null, {
                             icon: Ext.Msg.ERROR
                         })
                     }
                 }
             },
             error: function (msg, f) {
                 mygrid.myMask.hide();
                 var e = msg;
                 if (e && e.indexOf("异常信息") > -1) {
                     e = e.substring(e.indexOf("异常信息") + 5);
                 }
                 if (e && e.indexOf("StackTrace") > -1) {
                     e = e.substring(0, e.indexOf("StackTrace"));
                 }
                 var tipStr = "";
                 if (e) tipStr = e;
                 else tipStr = "获取数据出错。";
                 // debugger
                 vmd.alert("提示", tipStr, null, {
                     icon: Ext.Msg.ERROR
                 })
             }
         })
     }
	}else{
		 mygrid.entBox.style.visibility = "visible"
            mygrid.myMask.hide();
           // var rid = report.viewerNode.id;
            var rid=mygrid.id;
          //  this.create_MyOcxFrame_activex(rid, rid, "1000px", "1000px");
                var ocx = document.getElementById(rid+"_ocx");
               // ocx.style.display = "none";
                hwDas.ajax({
                    das: false,
                    url: vmd.virtualPath + "/report/OnRequestDb2.2.asmx/GetOcxReportDataJson_VMD",
                    type: 'post',
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    data: {
                        //  ModelXml: mygrid.relativepath + "//" + mygrid.path,
                        isuseds: mygrid.nousedataset ? "1" : "0",
                        type: "hwrest",
                        //数据服务ip
                        host: dsip,
                        // 数据服务接口
                        path: paths,
                        methods: "get",
                        basicparams: "",
                        // 数据服务参数
                        restparams: params,
                        // restparams: "[{\"Key\":\"sqrq\",\"Value\":\"" + Ext.util.Format.date(date, 'Y-m-d') + "\"}]",
                        // restparams: "[{Key:sqrq,"+"Value:"+Ext.Date.format(date,'Y-m-d')+"}]",
                        contenttype: "",
                        formbody: "",
                        // showType: "",
                        //queryType: "mode",
                        token: hwToken
                    },
                    success: function (result) {

                        mygrid.myMask.hide();

                        var gridData = {};
                        try {
                            var resultInfo = Ext.decode(result.d);
                            gridData = Ext.decode(resultInfo.value);
                        } catch (exxx) {
                            throw new error(resultInfo.value);
                        }
                        ocx.IClear();
                        ocx.ISetInterFaceName("ISetTheWayOfSqlExcute", 1, 0);
                        ocx.ISetParamValueAndType("2", "string");
                        ocx.ISetInterFaceName("ISetDsFromNetDataSet", 1, 0);
                        ocx.ISetParamValueAndType(gridData.Data, "string");
                        ocx.ISetInterFaceName("ISetReportModelXml", 1, 0);
                        ocx.ISetParamValueAndType(vmd.bootPATH	+"/report/"+mygrid.relativepath + "/" + mygrid.path, "string");
						 if (callBack) {
                            callBack.apply(report, [mygrid]);
                        }
                       // ocx.style.display = "";
					   var name= mygrid.path.substring(0,mygrid.path.indexOf(".xml"));
                        ocx.ISetDyHeaderTempletByFile("c:\\HwTemplet\\" +name + ".txt");
                        ocx.IShowReport(); //显示报表
                    },
                    error: function (msg, f) {
                        vmd.alert("提示", msg, null, {
                            icon: Ext.Msg.ERROR
                        })
                    }
                })

	    }
	},
	// 创建ocx
    create_MyOcxFrame_activex:  function(parentID, strID, width, height,ActiveX_MyOcxFrame_Ver) {
        var parentObj = document.getElementById(parentID);
      //  var ActiveX_MyOcxFrame_Ver = "1,1,5,16";
        var subHtml = "<OBJECT classid=clsid:7171B3A7-5142-4629-BDFE-E7FD46D3A9FC" +
            " id=" + strID+"_ocx"+ " " +
            " name=" + strID+"_ocx" + " " +
            " codebase='" + vmd.bootPATH +
            "/report/ocx/ReportCanvas.cab#Version=" + ActiveX_MyOcxFrame_Ver + "' " +
            " style= 'HEIGHT:" + height + "; WIDTH: " + width + ";ALIGN:center;'></OBJECT> ";
        parentObj.innerHTML = subHtml;
    },
 // 加载头部
    requestHeader: function(paths, params,showTypes, callBack){
        var mygrid = this;
        var report = this;
        mygrid.myMask.show();
  var hwToken=Cookie.get('hwToken')||getUrlParam("hwToken");
        var dsip;
        if (vmd.workspace) {
            dsip = vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp;
        } else {
            dsip = vmdSettings.dataServiceIp;
        }

        hwDas.ajax({
            das: false,
            url: vmd.virtualPath + "/report/OnRequestDb2.2.asmx/GetServerReportDataJson_VMD1",
            type: 'post',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: {
                ModelXml: mygrid.relativepath + "//" + mygrid.path,
                isuseds: mygrid.nousedataset ? "1" : "0",
                type: "hwrest",
                //数据服务ip
                host: dsip,
                // 数据服务接口
                path: paths,
                methods: "get",
                basicparams: "",
                // 数据服务参数
                restparams: params,
                // restparams: "[{\"Key\":\"sqrq\",\"Value\":\"" + Ext.util.Format.date(date, 'Y-m-d') + "\"}]",
                // restparams: "[{Key:sqrq,"+"Value:"+Ext.Date.format(date,'Y-m-d')+"}]",
                contenttype: "",
                formbody: "",
                showType: "",
                queryType: "mode",
				  token:hwToken
            },
            success: function(result) {
                mygrid.entBox.style.visibility = "visible"
                mygrid.el.dom.className = mygrid.el.dom.className.replace("x-box-item", "");
                mygrid = new dhtmlXGridObject(mygrid.el.dom);
                report.grid = mygrid;


                function FloatCenter(sLeft, sTop) {
                    for (var i = 0; i < mygrid.hdr.rows.length; i++) {

                        var isFloatTitle = false;
                        var gridContainer = null;
                        var floatTitleContainerH = null;
                        var floatTitleContainerW = null;
                        var titleText = "";
                        var titleStyle = null;

                        //没有锁定列，并且标题单元格全部合并
                        if (mygrid.hdr.rows[i].clientHeight != 0 && mygrid.hdr.rows[i].cells.length == 1) {
                            var centerCell = mygrid.hdr.rows[i].cells[0];
                            mygrid.hdr.rows[i].style.height = mygrid.hdr.rows[i].offsetHeight + "px";
                            isFloatTitle = true;
                            titleText = centerCell.innerText;
                            titleStyle = centerCell.style.cssText;
                            gridContainer = mygrid.entBox;
                            floatTitleContainerH = mygrid.hdr.rows[i].offsetHeight - 4;
                            floatTitleContainerW = Math.min(gridContainer.offsetWidth, centerCell.offsetWidth) - 4;
							if(centerCell.offsetWidth > floatTitleContainerW){
								floatTitleContainerW -= 20;
							}
                            if (centerCell && centerCell.firstChild && centerCell.firstChild.style) {
                                centerCell.firstChild.style.display = "none";
                            }
                        }


                        //有锁定列，并且标题单元格都合并
                        else if (mygrid._fake && mygrid.hdr.rows[i].clientHeight != 0 && mygrid._fake.hdr.rows[i].cells.length == 1 && mygrid.hdr.rows[i].cells.length == 2) {
                            var fakeCell = mygrid._fake.hdr.rows[i].cells[0];
                            var centerCell = mygrid.hdr.rows[i].cells[1];
                            mygrid.hdr.rows[i].style.height = mygrid.hdr.rows[i].offsetHeight + "px";
                            isFloatTitle = true;
                            titleText = centerCell.innerText;
                            titleStyle = centerCell.style.cssText;
                            gridContainer = mygrid._fake.entBox.parentNode;
                            floatTitleContainerH = mygrid._fake.hdr.rows[i].offsetHeight - 4;
                            floatTitleContainerW = Math.min(gridContainer.offsetWidth, fakeCell.offsetWidth + centerCell.offsetWidth) - 4;
							if((fakeCell.offsetWidth + centerCell.offsetWidth) > floatTitleContainerW){
								floatTitleContainerW -= 20;
							}
                            centerCell.firstChild.style.display = "none";
                        }


                        if (isFloatTitle) {
                            var t_floatTitleContainer = mygrid["floatTitleContainer" + i];
                            if (!t_floatTitleContainer) {
                                t_floatTitleContainer = mygrid["floatTitleContainer" + i] = document.createElement("table");
                                t_floatTitleContainer.className = "hdr rpt-title";
                                var tr = document.createElement("tr");
                                var td = document.createElement("td");
                                td.style.backgroundColor = "transparent";
                                var tmpTitlediv = document.createElement("div");
                                td.appendChild(tmpTitlediv);
                                tr.appendChild(td);
                                t_floatTitleContainer.appendChild(tr);

                                //t_floatTitleContainer.innerHTML = "<tr><td style='border-width:0px;'><div class='hdrcell' style='" + titleStyle + ";border-width:0px;line-height:" + (floatTitleContainerH - 8) +"px'>" + titleText + "</div></td></tr>";
                                report.el.dom.style.position = "relative";
                                if (!dhx4.isIE) {

                                    t_floatTitleContainer.style.zIndex = 100;
                                    t_floatTitleContainer.style.position = "absolute";
                                    t_floatTitleContainer.style.borderCollapse = "collapse";
                                    t_floatTitleContainer.style.borderSpacing = "0px";
                                    t_floatTitleContainer.style.top = "2px";
                                    t_floatTitleContainer.style.left = "2px";
                                    t_floatTitleContainer.style.height = (floatTitleContainerH - 4) + "px";
                                    t_floatTitleContainer.style.lineHeight = (floatTitleContainerH - 4) + "px";
                                    t_floatTitleContainer.style.width = floatTitleContainerW + "px";
                                    t_floatTitleContainer.style.borderWidth = "0px";
                                    t_floatTitleContainer.style.padding = "0px";
                                    t_floatTitleContainer.style.margin = "0px";

                                    tmpTitlediv.className = "hdrcell";
                                    tmpTitlediv.style.cssText = titleStyle;
                                    tmpTitlediv.style.borderWidth = "0px";
                                    tmpTitlediv.style.lineHeight = (floatTitleContainerH - 4) + "px";
                                    tmpTitlediv.style.height = (floatTitleContainerH - 4) + "px";
                                    tmpTitlediv.style.padding = "0px";
                                    tmpTitlediv.innerHTML = titleText;
                                    td.style.borderWidth = "0px";
                                    td.style.backgroundColor = "transparent";
                                    td.style.filter = "Alpha(opacity=60)";
                                } else {

                                    t_floatTitleContainer.style.cssText = t_floatTitleContainer.style.cssText + ";position:absolute;top:0px;border-collapse:collapse;border-spacing:0px;z-index:100;height:" + (floatTitleContainerH - 4) + "px;line-height:" + (floatTitleContainerH - 4) + "px;width:" + floatTitleContainerW + "px;border-width:0px;padding:0px;margin:0px;";

                                    tmpTitlediv.className = "hdrcell";
                                    tmpTitlediv.style.cssText = titleStyle + ";border-width:0px;line-height:" + (floatTitleContainerH - 4) + "px;height:" + (floatTitleContainerH - 4) + "px;";
                                    tmpTitlediv.innerHTML = titleText;
                                    td.style.cssText = "border-width:0px;background-color:transparent;filter:Alpha(opacity=60);";
                                }


                                gridContainer.appendChild(t_floatTitleContainer);
                            }
                            return;
                        }
                    }
                }
                mygrid.attachEvent("onScroll",
                    function(sLeft, sTop) {
                        FloatCenter(sLeft, sTop);
                        return true;
                    });
                mygrid.setImagePath(vmd.virtualPath + "/report/dhtmlx/dhtmlxGrid/codebase/imgs/");
                var resultInfo = Ext.decode(result.d);
                // mygrid = new dhtmlXGridObject();
                var gridData = {};
                try {
                    gridData = Ext.decode(resultInfo.value);
                } catch (exxx) {
                    throw new error(resultInfo.value);
                }
                if (gridData) {
                    //intGrid(mygrid);
                    mygrid.loadGridAttribute(gridData.attributelist);
                    // mygrid.setSkin("dhx_skyblue");
                    mygrid.setSkin("dhx_default");
                    mygrid.dontSetSizes = true;
                    //设置容器的大小
                    var totalWidth = 0;
                    for (var i = 0; i < gridData.attributelist.length; i++) {
                        if (gridData.attributelist[i].key == "setInitWidths") {
                            totalWidth = eval(gridData.attributelist[i].value.replace(/,/g, '+'));
                        }
                    }

                    var _width = ((totalWidth + 20) > mygrid.entBox.parentNode.clientWidth ? mygrid.entBox.parentNode.clientWidth : (totalWidth + 20));
                    mygrid._width = totalWidth;
                    if (report.align == "center") {
                        mygrid.entBox.style.width = _width + "px";
                    } else {
                        mygrid.entBox.style.width = mygrid.entBox.parentNode.clientWidth;
                    }
                    mygrid.entBox.style.height = (mygrid.entBox.parentNode.clientHeight || mygrid.entBox.parentNode.parentNode.clientHeight) + 'px';
                    mygrid.entBox.style.margin = "0 auto";


                    if(report.beforeInitFunc){
                        report.beforeInitFunc.apply(report,[mygrid]);
                    }
					mygrid.custom_xml_vmd = true;
                    mygrid.init();

                    FloatCenter();

                    mygrid.hdr.className += " rpt-header";
                    mygrid.obj.className += " rpt-data";
                    if(mygrid._fake){
                        mygrid._fake.hdr.className += " rpt-header lock";
                        mygrid._fake.obj.className += " rpt-data lock";
                        mygrid.globalBox.className += " vmd-rpt";
						
						var trs = mygrid.hdr.children[0].children;
						var c_rowspan = 1;
						for(var i = 1; i < trs.length; i+=c_rowspan){
							if(i == 1){
								trs[i].className += " header-top";
							}
							for(var j = trs[i].children.length - 1; j >= 0; j--){
								if(trs[i].children[j].clientHeight != 0){
									c_rowspan = trs[i].children[j].rowSpan;
									trs[i].children[j].className += " c-last";
									break;
								}
							}
						}
						
						var _fakeTRs = mygrid._fake.hdr.children[0].children;
						c_rowspan = 1;
						for(var i = 1; i < _fakeTRs.length; i+=c_rowspan){
							if(i == 1){
								_fakeTRs[i].className += " header-top";
							}
							for(var j = 0; j < _fakeTRs[i].children.length; j++){
								if(_fakeTRs[i].children[j].clientHeight != 0){
									c_rowspan = _fakeTRs[i].children[j].rowSpan;
									_fakeTRs[i].children[j].className += " c-first";
									break;
								}
							}
						}
                    }
                    else{
                        mygrid.entBox.className += " vmd-rpt";
						var trs = mygrid.hdr.children[0].children;
						var c_rowspan = 1;
						for(var i = 1; i < trs.length; i+=c_rowspan){
							if(i == 1){
								trs[i].className += " header-top";
							}
							for(var j = 0; j < trs[i].children.length; j++){
								if(trs[i].children[j].clientHeight != 0){
									c_rowspan = trs[i].children[j].rowSpan;
									trs[i].children[j].className += " c-first";
									break;
								}
							}
						}
						for(var i = 1; i < trs.length; i+=c_rowspan){
							for(var j = trs[i].children.length - 1; j >= 0; j--){
								if(trs[i].children[j].clientHeight != 0){
									c_rowspan = trs[i].children[j].rowSpan;
									trs[i].children[j].className += " c-last";
									break;
								}
							}
						}
                    }

                    // 获取数据表信息失败后结束进度条
                    if (resultInfo.value.indexOf("通过web服务获取表失败") != -1) {
                        mygrid.myMask.hide();
                    }
                    var index1 = gridData.xmlfilename.indexOf("Data/") + 5;
                    var index3 = gridData.xmlfilename.indexOf(".xml");
                    mygrid.xmlFileUrl = gridData.xmlfilename.substring(index1, index3);
                    if (callBack) {
                        callBack.apply(mygrid, [mygrid]);
                    }

                } else {
                    if (resultInfo.errMsg) {
                        mygrid.myMask.hide();
                        //Ext.Msg.alert("提示", resultInfo.errMsg, function() {})
                        vmd.alert("提示", resultInfo.errMsg, null, {
                            icon: Ext.Msg.ERROR
                        })
                    }
                }
            },
            error: function(msg, f) {
                mygrid.myMask.hide();
                var e = msg;
                if (e && e.indexOf("异常信息") > -1) {
                    e = e.substring(e.indexOf("异常信息") + 5);
                }
                if (e && e.indexOf("StackTrace") > -1) {
                    e = e.substring(0, e.indexOf("StackTrace"));
                }
                var tipStr = "";
                if (e) tipStr = e;
                else tipStr = "获取数据出错。";
                // debugger
                vmd.alert("提示", tipStr, null, {
                    icon: Ext.Msg.ERROR
                })
            }
        })
    },
//加载数据
    requestData: function(grid, paths, params,showTypes, callBack){
        var mygrid = this;
        mygrid.myMask.show();
 var hwToken=Cookie.get('hwToken')||getUrlParam("hwToken");
        var dsip;
        if (vmd.workspace) {
            dsip = vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp;
        } else {
            dsip = vmdSettings.dataServiceIp;
        }

        hwDas.ajax({
            das: false,
            url: vmd.virtualPath + "/report/OnRequestDb2.2.asmx/GetServerReportDataJson_VMD1",
            type: 'post',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: {
                ModelXml: mygrid.relativepath + "//" + mygrid.path,
                isuseds: mygrid.nousedataset ? "1" : "0",
                type: "hwrest",
                //数据服务ip
                host: dsip,
                // 数据服务接口
                path: paths,
                methods: "get",
                basicparams: "",
                // 数据服务参数
                restparams: params,
                // restparams: "[{\"Key\":\"sqrq\",\"Value\":\"" + Ext.util.Format.date(date, 'Y-m-d') + "\"}]",
                // restparams: "[{Key:sqrq,"+"Value:"+Ext.Date.format(date,'Y-m-d')+"}]",
                contenttype: "",
                formbody: "",
                showType: "",
                queryType: "data",
                token:hwToken
            },
            success: function(result) {

                var resultInfo = Ext.decode(result.d);
                grid.loadXML(vmd.virtualPath + "/report/" + resultInfo.value, function() {
                    mygrid.myMask.hide();
                    if(grid.noHeader){
                        grid.forEachCell(grid.getRowId(0),function(cellObj,ind){
                            cellObj.cell.className += " vmd-top";
                        });
                    }
                    if (callBack) {
                        callBack.apply(mygrid, [grid]);
                    }
                });
            },
            error: function(msg, f) {
                mygrid.myMask.hide();
                var e = msg;

                if (e && e.indexOf("异常信息") > -1) {
                    e = e.substring(e.indexOf("异常信息") + 5);
                }

                if (e && e.indexOf("StackTrace") > -1) {
                    e = e.substring(0, e.indexOf("StackTrace"));
                }

                var tipStr = "";
                if (e) tipStr = e;
                else tipStr = "获取数据出错。";
                // debugger
                vmd.alert("提示", tipStr, null, {
                    icon: Ext.Msg.ERROR
                })
            }
        })
    },
	query: function(callBack,showType) {
		this.myMask.show();
		// 填报报表
		if (this.fillReport) {
			if (this.rptVersion == "2.3" && this.rptType == "grid") {
				this.fillRpt_Grid(callBack);
			} else {
				this.fillRpt(callBack);
			}
		} else {
			if(showType){
			    // 查询报表
			    this.selectRpt(callBack,showType);
			}else {
				this.selectRpt(callBack,false);
			}
		}
	},
	setBeforeInitFunc:function(callBack){
		this.beforeInitFunc = callBack;
	},

	savaRptInfo: function() {
		//  this.grid.savaRptInfo();
	},
	//填报自动调整修改
	fillReportResize: function(diff) {
		var report = this;
		var fillreport = report.grid;
		var rptDom = fillreport.grid.objBox;
		var _resizeHeight = function() {

			var h = fillreport.grid.obj.clientHeight + (diff || 40);
			var resizeh = h - 2;
			
			//20181225 增加兼容处理
			var gridWidth=fillreport.grid.obj.scrollWidth;
			var ctWidth=report.ownerCt.getWidth();
			if(gridWidth>ctWidth) {
				h=h+20;
			}
			
			report.ownerCt.setHeight(h);
			report.el.first().setHeight(resizeh);
			Ext.get(rptDom).setHeight(resizeh);

		}

		fillreport.attachEvent("onFillReportResize", function() {

			_resizeHeight()

		});
		_resizeHeight()
	},
	//报表自动调整
	reportResize: function(diff) {
		var report = this;
		var clientHeight = report.grid.obj.clientHeight + (diff || 0);
        
        var hdrHeight=	report.grid.hdrBox.clientHeight;	
		Ext.get(report.grid.objBox).setHeight(clientHeight);
		
		var _height=hdrHeight+clientHeight;
		report.el.setHeight(_height)
		report.ownerCt.setHeight(_height);
	}

})

//Ext.reg('vmd.report', vmd.comp.report);

//#endregion vmdreport