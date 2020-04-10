/*
filename：vmdcore.js
creater：mafei
date created：2017.12.09
description：可视化2.0 框架公共方法类
date modified：20190114
modifier：成兵
version：2.0.4.20190114
others：
copyright：Copyright © 1999-2016, hwkj, All Rights Reserved
*/

Ext.QuickTips.init();
/*以下动态配置要放到html里*/
if(typeof vmd == "undefined") vmd = {};
vmd.virtualPath = ''
String.prototype.format = function(args) {

	var result = this;
	if(arguments.length < 1) {
		return result;
	}
	var replaceAll = function(str, exp, newStr) {
		return str.replace(new RegExp(exp, "gm"), newStr);
	}
	var data = arguments; // 如果模板参数是数组
	if(arguments.length == 1 && typeof(args) == "object") {
		// 如果模板参数是对象
		data = args;
	}
	for(var key in data) {
		var value = data[key];
		if(undefined != value) {
			result = replaceAll(result, "\\{" + key + "\\}", value);
		}
	}
	return result;
}
Ext.Loader.setConfig({
	enabled: true,
	//disableCaching:false,
	paths: { //'类名前缀':'所在路径'  
	
		'vmd.ux': '/components/ux',
		'vmd.ext': '/js/ext',
		//'vmd.Error': bootPATH+'js',
		'vmd.base': bootPATH + 'js/base',
		'vmd.webchart': bootPATH + 'js/webchart',
        'vmd.proxy': bootPATH + 'js/proxy'
	}
});

Ext.define("vmd.core", {
	statics: {
		readFile: function (path,success,error) {
	        var isDas = vmdSettings.enableDasUpload;
	        var url = 'http://'+ (vmdSettings.vmdFileServiceIp||vmdSettings.vmdUploadIp) + vmdSettings.vmdUploadRelativePath + '?FileName=' + path;
	        if (isDas) {
                //数据访问模式
	        } else {
	            //可配置的url模式
	            Ext.Ajax.request({
	                url: url,
	                timeout: 10000,
	                success: function (result) {
                       if(Ext.isFunction(success))  success(result);
	                },
	                failure: function (result) {
	                   if(Ext.isFunction(error)) error(result);
	                }
	            })
	        }
	    },
	    writeFile: function (path,content, success, error) {
	        var isDas = vmdSettings.enableDasUpload;
	        var url = 'http://' + (vmdSettings.vmdFileServiceIp||vmdSettings.vmdUploadIp) + vmdSettings.vmdUploadRelativePath;
	        if (isDas) {
	            //数据访问模式
	        } else {
	            //可配置的url模式
	            Ext.Ajax.request({
	                url: url,
	                timeout: 10000,
	                success: function (result) {
	                    if (Ext.isFunction(success)) success(result);	
						//记录日志
						if(path.indexOf(".vmd")>0)
						{
							var log = new vmd.proxy.Log();
							if(vmd.getUrlParam("type")=="ux"){
								logmsg=(vmd.getUserName()||vmd.getUserId()) + "在" + Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s') + "修改保存了" + vmd.getUrlParam("name")+"{"+vmd.getUrlParam("uxid")+"}" + "组件";
								log.save("保存设计页面", vmd.getUrlParam("uxid"),logmsg, "复合组件", function() {
									console.log("保存页面操作日志成功！")
								}, function() {
									console.log("保存页面操作日志失败")
								})			
							} 
							else
							{
								logmsg=(vmd.getUserName()||vmd.getUserId()) + "在" + Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s') + "修改保存了" + vmd.getUrlParam("name")+"{"+vmd.getUrlParam("id")+"}" + "模块";
								log.save("保存设计页面", vmd.getUrlParam("id"),logmsg, "模块", function() {
									console.log("保存页面操作日志成功！")
								}, function() {
									console.log("保存页面操作日志失败")
								})			
							}		
						}				
	                },
	                failure: function (result) {
	                    if (Ext.isFunction(error)) error(result);
	                },
	                headers: {
	                    token: '',
	                    FileName: path
	                },
	                params: {
	                    body: content
	                }
	            });
	        }
	    },
		uxControllerInst:function(clsname,rootScope){
			if(!rootScope) return;
			var cls=eval(clsname);
			try{
				var inst= new cls();
				
				Ext.applyIf(rootScope,inst)
			}catch(ex){
				console.log(clsname+'未实例化！')
			}
		},
		/**
		*desc 开启ocx遮罩层
		*@param {object}-cmp 组件dom对象
		**/
		enableIframe:function(cmp){
			
			if (!vmd._ifr) {
				vmd._ifr = document.createElement("IFRAME");
				vmd._ifr.frameBorder = 0;
				vmd._ifr.border = 0;
				vmd._ifr.setAttribute("src", "javascript:false;");
				vmd._ifr.className = "dhtmlxcombo_ifr";
				vmd._ifr.style.position = "absolute";
				vmd._ifr.style.display = "none";
				vmd._ifr.onload = function () {               
					vmd._ifr.contentWindow.document.open("text/html", "replace");
					vmd._ifr.contentWindow.document.write("<html><head><style>html,body{width:100%;height:100%;overflow:hidden;margin:0px;}</style></head><body</body></html>");
				}
				cmp.parentNode.insertBefore(vmd._ifr, cmp);
				this.iframeResize(cmp,true);
			}
			else
			{
				cmp.parentNode.insertBefore(vmd._ifr, cmp);
				this.iframeResize(cmp,true);
			}
		},
		/**
		*desc 调整ocx的遮罩层的显示
		*@param {object}-cmp 组件dom对象
		*@param {boolean}-isShow 遮罩层是否显示
		**/
		iframeResize:function(cmp,isShow){
			
			if (vmd._ifr) {
				if(isShow)
					vmd._ifr.style.display = "";
				else
					vmd._ifr.style.display = "none";
				vmd._ifr.style.left = cmp.style.left;
				vmd._ifr.style.top = cmp.style.top;
				vmd._ifr.style.width = cmp.offsetWidth + "px";
				vmd._ifr.style.height = (cmp.offsetHeight+3) + "px";
				if(!cmp.style.zIndex)
					cmp.style.zIndex=666666
				vmd._ifr.style.zIndex = cmp.style.zIndex - 1;
			}
		},
		recusiveModifyCmp: function(items, me, parentNode) {
			if(!items) return;
			//mafei 20180511
			if(Ext.isArray(items)) {
				Ext.each(items, function(cmp, index) {
					if(!me.cmpIds) me.cmpIds = [];
					if(cmp.id && cmp.id.indexOf('vmd_ux_') == 0) return false;
					if(!me[cmp.id] || Ext.isFunction(me[cmp.id])) {

						//var pNode = parentNode;
						//if (cmp.id && pNode.menu) {
						//    me[cmp.id] = pNode.menu;
						//} else {
						//    me[cmp.id] = cmp;
						//}
						me[cmp.id] = Ext.getCmp(cmp.id);
						if(!me[cmp.id]) {
							if(!me._reloadCmpList) me._reloadCmpList = [];
							if(me._reloadCmpList.indexOf(cmp.id) == -1) {
								me._reloadCmpList.push(cmp.id);
							}
							me[cmp.id] = cmp;

						}
					}
					//cmp.rootNode = cmp.rootScope = me;
					cmp.rootScope = me;
					me.cmpIds.push(cmp.id);
					parentNode = parentNode || me;
					var oldId = cmp.id;
					Ext.ComponentMgr.all.removeKey(cmp.id);
					//cmp.id = "vmd_ux_" + me.id + "_" + cmp.id;
					cmp.id = "vmd_ux_" + vmd.randomWord(false, 4) + "_" + cmp.id;

					Ext.ComponentMgr.all.add(cmp.id, cmp);
					if(parentNode.items.indexOfKey) {
						var index = parentNode.items.indexOfKey(oldId);
						parentNode.items.insert(index, cmp.id, cmp)
						parentNode.items.removeKey(oldId);
					}

					cmp.items && vmd.core.recusiveModifyCmp(cmp.items, me, cmp);

				})
			} else {
				items = items.items;
				items && Ext.each(items, function(cmp, index) {

					//递归遍历并删除Ext.ComponetMgr中的组件
					if(!me.cmpIds) me.cmpIds = [];
					if(cmp.id && cmp.id.indexOf('vmd_ux_') == 0) return false;
					if(!me[cmp.id] || Ext.isFunction(me[cmp.id])) me[cmp.id] = cmp;
					cmp.rootScope = me;
					//cmp.rootNode = cmp.rootScope = me;
					me.cmpIds.push(cmp.id);
					//tabelpanel用自己的对象
					parentNode = parentNode || me;
					//if (parentNode.xtype != "tabpanel") {

					// Ext.ComponentMgr.all.removeKey(cmp.id);
					// //删除父节点的
					// //parentNode.items.removeKey(cmp.id)

					// cmp.id = "vmd_ux_" + me.id + "_" + cmp.id;

					// Ext.ComponentMgr.all.add(cmp.id, cmp);

					//// parentNode.items.removeKey(oldId)
					//// parentNode.items.add(cmp.id, cmp)

					//}
					//cmp.items && vmd.core.recusiveModifyCmp(cmp.items, me, cmp);

					//修改复合组件算法
					var oldId = cmp.id;
					Ext.ComponentMgr.all.removeKey(cmp.id);
					// cmp.id = "vmd_ux_" + me.id + "_" + cmp.id;
					cmp.id = "vmd_ux_" + vmd.randomWord(false, 4) + "_" + cmp.id;
					Ext.ComponentMgr.all.add(cmp.id, cmp);
					var index = parentNode.items.indexOfKey(oldId);
					parentNode.items.insert(index, cmp.id, cmp)
					parentNode.items.removeKey(oldId);
					// parentNode.items.add(cmp.id, cmp)

					cmp.items && vmd.core.recusiveModifyCmp(cmp.items, me, cmp);

				})
			}

		},
		compositeCmpInit: function(items, me) {

			vmd.core.recusiveModifyCmp(items, me);

			var defineVars = [];
			Ext.each(me.cmpIds, function(id) {
				id = id.replace(/-/g, ""); //id不能带-，否则eval报错
				defineVars.push("var " + id + "=" + "this." + id + ";");
				//defineVars.push("var ksrq=this.ksrq");
			})
			me.defineVars = defineVars.join('');
			//当前模块的依赖组件
			if(!vmd.curModule) vmd.curModule = {
				uxCmpsInfo: [],
				uxCmpsList: []
			};
			var _cmpInfo = {
				id: me.xtype,
				ver: me.version
			}

			if(vmd.curModule.uxCmpsList.indexOf(me.xtype) == -1) {
				vmd.curModule.uxCmpsInfo.push(_cmpInfo);
				vmd.curModule.uxCmpsList.push(me.xtype);
			}

		},
		getCmpId: function(_cmp) {
			var _id = _cmp.id;
			if(_id && _id.indexOf('vmd_ux_') == 0) _id = _id.replace(/vmd_ux_/g, '').split('_')[1];
			return _id;
		},
		addSubViewCmp: function(cmp, viewScope) {
			if(viewScope) {
				if(cmp.xtype != 'vmd.subview') viewScope.cmpList.push(cmp.id);

			}
		},
		moduleInit: function(items, me, parentNode, viewScope) {
			if(!items) return;

			//mafei 20180511
			if(Ext.isArray(items)) {
				Ext.each(items, function(cmp, index) {
					if(cmp.xtype.indexOf('vmd.ux') == -1) {
						if(cmp && cmp.id) {
							//window[cmp.id] = Ext.getCmp(cmp.id);

							window[cmp.id] = Ext.getCmp(cmp.id);

							vmd.core.addSubViewCmp(cmp, viewScope)
							//  if (!window[cmp.id]) Tips.tips(cmp.id + '组件未初始化!', 'error');

							if(!window[cmp.id]) {
								cmp._beforeRender = function(cmp) {
									window[cmp.id] = cmp;

									vmd.core.addSubViewCmp(cmp, viewScope)
								}
							}
						}
						cmp.items && vmd.core.moduleInit(cmp.items, me, cmp, viewScope);
					}

				})
			} else {
				items = items.items;
				items && Ext.each(items, function(cmp, index) {
					if(cmp.id!='top') window[cmp.id] = cmp;
					
					vmd.core.addSubViewCmp(cmp, viewScope)
					if(cmp.items && cmp.xtype.indexOf('vmd.ux') == -1) {
						vmd.core.moduleInit(cmp.items, me, cmp, viewScope)
					}
				})
			}

		},
		//脚本执行
		script: function(text) {
			if(!text) return text;
			if(window.execScript) {
				window.execScript(text);
			} else {
				var script = document.createElement('script');
				script.setAttribute('type', 'text/javascript');
				script.text = text;
				document.head.appendChild(script);
				document.head.removeChild(script);
			}
			return text;
		},
		//组件注册
		componentRegister: function(xds, name, rootName) {
			xds[name] = Ext.extend(xds.Component, {
				cid: name,
				category: "vmd复合组件",
				text: rootName,
				//dtype 设计时组件
				dtype: name,
				//xtype 运行时组件
				xtype: name,
				xcls: name,
				//为了拖拽能自动生成递增id
				defaultName: rootName,
				iconCls: "icon-button",
				isContainer: false,
				//是否显示右下角的组件说明
				filmCls: "el-film-nolabel",
				//默认属性设置
				defaultConfig: {

				},
				isResizable: function(a, b) {

					return true;
				},
				//标准属性设置
				configs: [

					{
						name: "cls",
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
						name: "style",
						group: "外观",
						ctype: "string"
					}, {
						name: "title",
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
					}
				],
				initConfig: function(b, a) {
					//初始化默认属性设置

				},
				getPanelHeader: function() {
					var a = this.getExtComponent();
					if(a.header && a.headerAsText) {
						return a.header.child("span")
					}
					return null
				},
				onFilmDblClick: function(a) {
					var b = this.getPanelHeader();
					//先判断点击区域是否在头部区域内
					if(b && b.getRegion().contains(a.getPoint())) {
						this.startTitleEdit(b)
					} else {
						xds.PanelBase.superclass.onFilmDblClick.call(this, a)
					}
				},
				startTitleEdit: function(a) {
					xds.canvas.startEdit(this, a || this.getPanelHeader(), this
						.getConfigObject("title"), 150)
				}

			});
			xds.Registry.register(xds[name])
		},
		initConfig: function() {
			//配置上传路径
			vmdSettings.vmdUploadPath = 'http://' + (vmdSettings.vmdFileServiceIp||vmdSettings.dataServiceIp) + '/DataService/';
			Ext.apply(vmd, vmdSettings);
			//数据访问服务配置
			var dataServIp = vmd.dataServiceIp;
			if(dataServIp) {
				hwDas.hosts = [];
				hwDas.hosts.push(dataServIp)
			}

			if(!vmd.decode) vmd.decode = Ext.util.JSON.decode;
			if(!vmd.encode) vmd.encode = Ext.util.JSON.encode;
			Ext.applyIf(vmd, vmd.core);

			Ext.applyIf(vmd, vmd.util);

			/* Ext.defer(function () {
			     if (!$.browser) $.browser = vmd.browser;
			    if (typeof loadRipple != 'undefined') loadRipple(["a", "button", ".ripple-item", ".context-menu-item", "#picker"], [".disabled", ".disable", ".ztree", ".disable-ripple"]);
			 },1000)*/
			 
			 //更新版本号
			 this._updateVer();
		},
		_updateVer:function(){
			vmd.getJSON(vmd.virtualPath+'/vmdVersion.json',function(data){
				
				if(data&&data.ideVersion) vmd.vmdVersion=data.ideVersion;
			})
			
		},
		saveVmd: function(path, bodyStr, callback) {
			var saveFile=function(){Ext.Ajax.request({
				url: vmd.vmdUploadPath + 'FileService',
				// defaultPostHeader: 'text/plain',
				timeout: 5000,
				success: function(result) {
					var res = Ext.util.JSON.decode(result.responseText);
					if(res.errMsg) {

						Ext.Msg.alert('错误', res.errMsg);
						return;
					}
					callback && callback();
				},
				failure: function(result) {
					Ext.Msg.alert('错误', '网络超时，保存失败！')
				},
				headers: {
					token: '',
					FileName: path
				},
				params: {
					body: bodyStr
				}
			});
			}
			 //取出上传文件的扩展名
			var index = path.lastIndexOf(".");
			var ext = path.substr(index+1);
			if(ext.toLowerCase()=="html")
			{
				if (typeof beautifier != 'undefined') {
					bodyStr = beautifier.html(bodyStr, {"max_preserve_newlines": "-1"});
					saveFile()
				} else {
					var formatcodepath = vmd.virtualPath + '/lib/beautify/beautifier.min.js?ver='+vmd.vmdVersion;
					$LAB.script(formatcodepath)
						.wait(function () {
							bodyStr = beautifier.html(bodyStr, {"max_preserve_newlines": "-1"});
							saveFile()
						})
				}
            }			
			else
				saveFile()
			
		},
		saveAsCmp: function(curCmpId, curCmpVer, targetCmpId, callback) {
			//保存ide设计

			curCmpId = curCmpId || 'rqjd';
			targetCmpId = targetCmpId || 'test'
			version = curCmpVer ? curCmpVer + '/' : '';

			if(Ext.isFunction(version)) callback = curCmpVer;
			var _idefile = vmd.componentPath + 'ide/{0}.js',
				_vmdfile = vmd.componentPath + 'vmd/{0}.vmd',
				_uxlist = vmd.componentPath + 'list.js',
				cmpdir = curCmpId.toLowerCase(),
				targetCmpDir = targetCmpId.toLowerCase(),
				_uxfile = vmd.componentPath + 'ux/{0}/{1}/{2}.js';
			var self = this;
			var tastList = {};

			var saveIde = function() {
				// var dtd = vmd.Deferred();//创建一个defferred对象
				vmd.getFileStr(String.format(_idefile, curCmpId), function(data) {
					//进行保存操作
					//naming需要替换小写
					var reg = new RegExp(curCmpId, "g");
					data = data.replace(reg, targetCmpId);
					data = data.replace(/naming\:\s*\"\w+\"/, 'naming:"' + targetCmpId.toLowerCase() + '"');
					data = data.replace(/defaultName\:\s*\"\w+\"/, 'defaultName:"' + targetCmpId.toLowerCase() + '"');
					vmd.core.saveVmd(String.format(_idefile, targetCmpId), data, function() {
						tastList.ide = true
					})
				})
				// return dtd.promise();//返回promise对象
			}

			//保存ux组件类
			var saveUx = function() {

				vmd.getFileStr(String.format(_uxfile, cmpdir, version, curCmpId), function(data) {
					var reg = new RegExp(curCmpId, "g");
					data = data.replace(reg, targetCmpId);
					vmd.core.saveVmd(String.format(_uxfile, targetCmpDir, '1.0', targetCmpId), data, function() {
						tastList.ux = true
					})
				})
			}
			//保存组件vmd描述
			var saveVmd = function() {

				vmd.getFileStr(String.format(_vmdfile, curCmpId), function(data) {
					var reg = new RegExp(curCmpId, "g");
					data = data.replace(reg, targetCmpId);
					vmd.core.saveVmd(String.format(_vmdfile, targetCmpId), data, function() {
						tastList.vmd = true
					})
				})

			}
			saveIde(), saveUx(), saveVmd()
			var runner = new Ext.util.TaskRunner();
			var taskRun = function() {
				//vmd文件和html及html发布文件保存成功后才提示
				if(tastList.ide && tastList.vmd && tastList.ux) {
					//更新组件列表list文件
					vmd.core.removeCmpFromList(targetCmpId, function(data) {

						Ext.Msg.alert('提示', '保存成功！', function() {

						});
					}, true)
					runner.stop(task); //停止任务
					if(callback) callback();
				}

			}
			var task = {
				run: taskRun,
				interval: 100,
				duration: 5000
			}

			runner.start(task);

		},
		cmpVerUpdate: function(cmpId, curVer, updateVer, callback) {
			var _uxfile = vmd.componentPath + 'ux/{0}/{1}/{2}.js';
			if(!cmpId) {
				vmd.alert('提示', '无效组件！');
				return
			}
			if(!updateVer) {
				vmd.alert('提示', '要升级的版本不能为空');
				return
			}
			if(curVer && updateVer) {
				if(Ext.num(updateVer) <= Ext.num(curVer)) {
					vmd.alert('提示', '要升级的版本号不能小于当前的版本号！')
					return;
				}
				vmd.getFileStr(String.format(_uxfile, cmpId, curVer, cmpId), function(data) {
					//替换版本号
					data = data.replace(/version\:\"\w*[\d\.\d]+\"/, 'version:"' + updateVer + '"');
					vmd.core.saveVmd(String.format(_uxfile, cmpId, updateVer, cmpId), data, function() {
						//更新组件列表
						vmd.core.updateCmpListByVer(cmpId, updateVer, callback)

					})
				})
			}
		},
		isCheckFileExist: function(path, callback, isNoErrMsg,virtualPath,errorcallback) {
			var url;
			if(typeof virtualPath!='undefined'){
				url= virtualPath + path;
			}else{
				url = vmd.vmdUploadPath + 'FileService?FileName=' + path;
			}
			Ext.Ajax.request({
				type: 'get',
				url: url,
				success: function(result) {
				var data ;
				try{
					data = Ext.decode(result.responseText);
					if(data.errMsg && !isNoErrMsg) {
						Ext.Msg.alert('提示', data.errMsg);
						return;
					}
					if(data.data!=undefined){
						data = Ext.decode(data.data);
					}
				}
				catch(ex)
				{}				
				callback && callback(data)

				},
				failure: function(result) {
				   if(errorcallback)
				   {
					errorcallback();
				   }else{
					  Ext.Msg.alert('加载失败', '错误' + result.status + '：' + result.statusText) 
				   }
					
				}
			})
		},
		getFileStr: function(path, callback) {
			var url = vmd.vmdUploadPath + 'FileService?FileName=' + path;
			Ext.Ajax.request({
				type: 'get',
				url: url,
				success: function(result) {

					var data = Ext.decode(result.responseText);
					if(data.errMsg) {
						Ext.Msg.alert('提示', data.errMsg);
						return;
					}
					callback && callback(data.data)

				},
				failure: function(result) {

					Ext.Msg.alert('加载失败', '错误' + result.status + '：' + result.statusText)

				}
			})
		},
		removeCmpFromList: function(cmpId, callback, isResetVersion) {
			var me = this;
			var cmpListPath = vmdSettings.componentPath + 'list.js';
			this.isCheckFileExist(cmpListPath, function(cmpList) {
				cmpList = cmpList || [];

				//组件唯一
				var cmplistUnique = function(list) {

					var clone = [],
						obj = {};
					for(var i = 0; i < list.length; i++) {
						var item = list[i];
						var name = item.name;
						if(!obj[name]) {
							clone.push(item);
							obj[name] = item;
						}
					}
					return clone;
				}

				cmpList = cmplistUnique(cmpList);
				var deleteItem;
				Ext.each(cmpList, function(item, index) {
					if(item.name == cmpId) {
						deleteItem = item;
						return false;
					}
				})
				cmpList.remove(deleteItem)
				//重置版本
				if(isResetVersion) {
					cmpList.push({
						name: cmpId,
						version: '1.0',
						lastModifyTime: new Date().format('Y-m-d H:i:s')
					})
				}
				var str = Ext.encode(cmpList);
				me.saveVmd(cmpListPath, str, function() {
					callback && callback()
				});

			})

		},
		updateCmpListByVer: function(cmpId, version, callback) {
			var me = this;
			var cmpListPath = vmdSettings.componentPath + 'list.js';
			this.isCheckFileExist(cmpListPath, function(cmpList) {
				cmpList = cmpList || [];

				cmpList = Ext.Array.unique(cmpList);

				var targetCmp = Ext.Array.findBy(cmpList, function(item, i) {
					return item.name == cmpId
				})
				if(!targetCmp) {
					vmd.alert('提示', '更新的组件不存在，请先创建！')
					return
				}

				targetCmp.version = version;
				targetCmp.lastModifyTime = new Date().format('Y-m-d H:i:s');

				var str = Ext.encode(cmpList);
				me.saveVmd(cmpListPath, str, function() {
					callback && callback()
				});

			})
		},
		updateCmpZhname: function(cmpId, name, callback) {
			var me = this;
			var cmpListPath = vmdSettings.componentPath + 'list.js';
			this.isCheckFileExist(cmpListPath, function(cmpList) {
				cmpList = cmpList || [];

				cmpList = Ext.Array.unique(cmpList);

				var targetCmp = Ext.Array.findBy(cmpList, function(item, i) {
					return item.name == cmpId
				})
				if(!targetCmp) {
					vmd.alert('提示', '更新的组件不存在，请先创建！')
					return
				}

				targetCmp.zhname = name || '';
				targetCmp.lastModifyTime = new Date().format('Y-m-d H:i:s');

				var str = Ext.encode(cmpList);
				me.saveVmd(cmpListPath, str, function() {
					callback && callback()
				});

			})
		},
		createReleaseHtml: function(path, releasePath, virtualPathPref, callback, resourceServers, projectid,projectRefJs,projectRefCss,userProjectConfigJs) {
			var me = this;
			hwDas.ajax({
				das: false,
				url: path,
				type: 'get',
				dataType: 'html',
				success: function(data) {
					/*
					 *codestr 保存的代码
					 *cls 模块类名
					 *title 网页标题
					 *css 动态插入的css样式
					 *virtualpath 生成的虚拟目录,默认为空
					 */
					//var html = String.format(data, virtualPathPref || '') || '';
					data = data || '';
					var html ="";
					if(data.indexOf("vmdvirtualPath")>=0)
					{
						html = data.format({
							vmdvirtualPath: virtualPathPref || ''
						}) || '';
						html = html.format({
							vmdworkspacePath: '<script src="' + virtualPathPref + '/release/' + projectid + '/config.js"></script>'
						}) || '';
						html = html.format({
							vmdprojectcssfiles: projectRefCss||""
						}) || '';
						html = html.format({
							vmdprojectjsfiles: projectRefJs||""
						}) || '';
					}else{
						html = data.format({
							virtualPath: virtualPathPref || ''
						}) || '';
						html = html.format({
							workspacePath: '<script src="' + virtualPathPref + '/release/' + projectid + '/config.js"></script>'
						}) || '';
						html = html.format({
							projectcssfiles: projectRefCss||""
						}) || '';
						html = html.format({
							projectjsfiles: projectRefJs||""
						}) || '';
					}
					html= html.format({
							vmdprojectconfigjs: userProjectConfigJs||""
						}) || '';
					//替换代码及样式中的modules为发布路径
                    html=html.replace(/("|')\/modules/g,"$1"+virtualPathPref+"/release");
					if(resourceServers)
						html = me.replaceResVars(html, resourceServers);
					me.saveVmd(releasePath, html, callback);

				},
				error: function(data) {
					Ext.Msg.alert('提示', '生成发布文件出错！请检查该模块是否保存过。');
				}
			})
		},
		/**
		 * 动态加载组件依赖的资源（js和css）
		 * @param {string} cmpName 组件类名称,大小写区分
		 * @param {string} version 组件版本
		 * @param {function} callback return cls 回调函数
		 */
		loadUxJsCss:function(cmpName,version,callback){
			if(!cmpName) return ;
			var mainjs=vmd.virtualPath+'/components/ux/'+cmpName.toLowerCase()+'/'+version+'/'+cmpName+'.js';
			LazyLoad.js(mainjs,function(){				
				var clsprop=vmd.ux&&vmd.ux[cmpName]&&vmd.ux[cmpName].prototype;
				if(!clsprop) {
					vmd.alert('提示',mainjs+'文件丢失！')
					return 
				}
				var requirecss=Ext.decode(clsprop.uxrequirecss)||[];
				var requirejs=Ext.decode(clsprop.uxrequirejs)||[];
				Ext.each(requirecss,function(path,index){
					requirecss[index]=vmd.virtualPath+'/'+path;
				})
				Ext.each(requirejs,function(path,index){
					requirejs[index]=vmd.virtualPath+'/'+path;
				})
				if(requirecss.length>0) LazyLoad.css(requirecss);
				if(requirejs.length>0){
					LazyLoad.js(requirejs,function(){
						callback&&callback(vmd.ux[cmpName]);
					})
				}else  callback&&callback(vmd.ux[cmpName]);

			})
			
		},
		/**
		 * 复制模块文件，并做替换处理
		 * @param {string} path 原文件路径
		 * @param {string} copyPath 目标路径
		 * @param {array} paths 替换的路径信息及模块信息关系
		 * @param {string} type 获取文件的类型  html  text  等
		 * @param {function} callback  成功回调函数
		 * @param {function} error  失败回调函数
		 */
		createCopyFile: function(path, copyPath, paths, type, callback, error) {
			var me = this;
			var url = vmd.vmdUploadPath + 'FileService?FileName=' + path;
			Ext.Ajax.request({
				type: 'get',
				url: url,
				datatype: type,
				success: function(result) {
					var data = Ext.decode(result.responseText);
					var strtxt = data.data;
					for(var g = 0; g < paths.length; g++) {
						strtxt = strtxt.replace(paths[g].oldpath, paths[g].newpath);
					}
					me.saveVmd(copyPath, strtxt, function(re) {
						if(callback) callback(re)
					});
				},
				failure: function(msg) {
					if(error) error(msg)
					console.log(msg)
					Ext.Msg.alert('加载失败', '错误' + msg.status + '：' + msg.statusText)
				}
			})
		},
		getVirtualPath: function() {
			var path = window.location.href;
			//去除url中的参数
			path = path && path.replace(/\?.*/g, '');
			var hostPath = "";
			if(path.indexOf('modules') > 0)
				hostPath = path.substring(0, path.indexOf('modules'));
			else if(path.indexOf('run') > 0)
				hostPath = path.substring(0, path.indexOf('run'));
			return hostPath;
		},
		/**
		 * 动态加载JS
		 * @param {string} url 脚本地址
		 * @param {function} callback  回调函数
		 */
		loadJs: function(url, callback) {
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;
			if(typeof(callback) == 'function') {
				script.onload = script.onreadystatechange = function() {
					if(!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
						callback();
						script.onload = script.onreadystatechange = null;
					}
				};
			}
			head.appendChild(script);
		},
		/**
		 * 动态加载CSS
		 * @param {string} url 样式地址
		 */
		loadCss: function(url) {
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.href = url;
			head.appendChild(link);
		},
		/**
		 * 动态加载css脚本
		 * @param {string} cssText css样式
		 */
		loadStyleString: function(cssText) {
			var style = document.createElement("style");
			style.type = "text/css";
			try {
				// firefox、safari、chrome和Opera
				style.appendChild(document.createTextNode(cssText));
			} catch(ex) {
				// IE早期的浏览器 ,需要使用style元素的stylesheet属性的cssText属性
				style.styleSheet.cssText = cssText;
			}
			document.getElementsByTagName("head")[0].appendChild(style);
		},
		/**
		 * 动态加载js脚本
		 * @param {string} code js脚本
		 */
		loadScriptString: function(code) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			try {
				// firefox、safari、chrome和Opera
				script.appendChild(document.createTextNode(code));
			} catch(ex) {
				// IE早期的浏览器 ,需要使用script的text属性来指定javascript代码。
				script.text = code;
			}
			document.getElementsByTagName("head")[0].appendChild(script);
		},
		isDesignMode: function() {

			if(typeof xds != 'undefined' && typeof xds == 'object') {
				if(typeof xds.vmd != 'undefined' && typeof xds.vmd == 'object') {
					return true;
				}
			}

			return false;
		},
		_getServMap: function() {
			var list = [];
			if(vmd.resourceSettings) return vmd.resourceSettings;
			if(typeof xds == 'object') {
				list = xds.vmd.resource.serverList;
			} else if(typeof parent.xds == 'object') {
				list = parent.xds.vmd.resource.serverList;
			}
			var map = {};
			list.forEach(function(item, index) {
				// map[item.name] = item;
				var serverList = item.children;
				if(serverList) {
					serverList.forEach(function(_item) {
						map[item.name + "&&" + _item.name] = _item;
					})
				}
			})
			return map;
		},
		taskRunner: function(statefn, callback,interval,duration,isContinue) {
			var runner = new Ext.util.TaskRunner();
			var starttieme=new Date().getTime();
			var taskRun = function() {
				if(Ext.isFunction(statefn) && statefn()) {
					// console.log(statefn());
					runner.stop(task); //停止 任务
					if(callback) callback();
				}

			}
			var task = {
				run: taskRun,
				interval:interval|| 50,
				duration: duration||10000,
				onStop:function(){
					var now=new Date().getTime();
					if((now-starttieme)>task.duration && isContinue && callback)  callback()
				//	isContinue&&callback&&callback()
				}
			}
			runner.start(task);
		},
		/** 
		 * @desc 替换资源变量
		 * @param {string} repstr-替换的字符串
		 * @param {array}servMap- 服务器映射对象{'服务器name':'真实虚拟路径'}
		 * return {string} 返回替换后的字符串
		 * **/
		replaceResVars: function(repstr, servMap) {
			var str = "";
			var that = this;
			if(!repstr) return str;
			var servInfo;
			str = repstr.replace(/\{\S+\&\&[^/\s]+}/g, function(path) {
				var rep = {};
				var name = path.replace('{', '').replace('}', '');
				var _servMap;
				if(servMap) {
					rep = servMap;
				} else {
					_servMap = that._getServMap();
					servInfo = _servMap[name];
					if(!servInfo) return path;
					var virtualPath = "http://{ip}/{path}";
					var repdict = {
						key: name,
						value: virtualPath.format({
							ip: servInfo.address,
							path: servInfo.virtualPath,
						})
					};
					rep[repdict.key] = repdict.value || '';
				}

				path = path.format(rep);
				if(servInfo && Ext.isString(servInfo)) return servInfo;
				return path;
			});
			
			//uxpath复合组件路径处理
			str = str.format({
			    vmduxpath: vmd.virtualPath ? '/' + vmd.virtualPath : ""
			})
			return str;
		},
		/** 
		 * @desc 获取模块资源服务列表
		 * @param {string} id-模块id或项目id
		 * @param {func}success- 成功回调
		 * @param {func}error-失败回调
		 * @param {bool}isPro-是否为项目ID
		 * **/
		getModuleResourceServices: function(_id, success, error,isPro) {
			if(getUrlParam("pid"))
				_id = getUrlParam("pid")
			var url="CDEServcie/project/projectconfig/getresourcebymodule";
			if(isPro)
				url="CDEServcie/project/projectconfig/getresourcebyproject";
			var resourceServices = [];
			var runover = false;
			hwDas.get(url, {}, {
				id: _id
			}, function(result) {
				if(result.data && result.data.length > 0 && result.data[0].size > 0) {
					var j = 0;
					var length = result.data[0].size;
					for(var i = 0; i < result.data[0].datas.length; i++) {
						(function(index) {
							var resourceInfo = {
								id: result.data[0].datas[index].id,
								name: result.data[0].datas[index].name,
								address: result.data[0].datas[index].address,
								children: []
							};
							hwDas.get({
									host: result.data[0].datas[index].address,
									url: "zyzx/zyzxtree/getServerInfo"
								}, {}, {},
								function(c_result) {
									if(c_result.data && c_result.data.length > 0 && c_result.data[0].size > 0) {
										for(var k = 0; k < c_result.data[0].datas.length; k++) {
											var resourceServers = {
												id: c_result.data[0].datas[k].id,
												name: c_result.data[0].datas[k].name,
												address: c_result.data[0].datas[k].ip,
												virtualPath: vmdSettings.resourceCode
											};
											resourceInfo.children.push(resourceServers);
										}
										resourceServices.push(resourceInfo);
										j++;
									} else
										j++;
									if(j == length)
										success(resourceServices);
								},
								function() {
									resourceServices.push(resourceInfo);
									j++;
									if(j == length)
										success(resourceServices);
								})
						})(i)
					}
				} else {
					resourceServices.push({
						id: "000000-00000000-000000-000000-000000",
						name: "资源中心",
						address: vmdSettings.dataServiceIp,
						children: []
					});
					hwDas.get("zyzx/zyzxtree/getServerInfo", {}, {}, function(c_result) {
						if(c_result.data && c_result.data.length > 0 && c_result.data[0].size > 0) {
							for(var k = 0; k < c_result.data[0].datas.length; k++) {
								var resourceServer = {
									id: c_result.data[0].datas[k].id,
									name: c_result.data[0].datas[k].name,
									address: c_result.data[0].datas[k].ip,
									virtualPath: vmdSettings.resourceCode
								};
								resourceServices[0].children.push(resourceServer);
							}
							success(resourceServices);
						}
					}, function() {
						success(resourceServices);
					})
				}
			}, function(msg) {
				error(msg)
			})
		vmd.core.getProjectRefResource(_id,isPro,success, error);			
		},
		getProjectRefResource:function(id,ispro,success,error)
		{
			var url="CDEServcie/project/getproresourcebymodule";
			var params={module_id:id};
			if(ispro){
				url="CDEServcie/project/getproresource";
				params={ projectid: id}
				}
			//获取项目默认的资源信息，并记录到公共信息中
			hwDas.get(url,
				{},
				params,
				function(result){
					var projectResourceList=result.data[0].datas;
					window.projectResourceInfo=[]
					projectResourceList.forEach(function(item){
						window.projectResourceInfo.push({							
							id:item.resource_server_id+"/"+item.path,
							servName:item.resource_server_name,
							path:item.path,
							absolutePath:item.resource_server_ip+"/"+item.path,
							ext:item.type=="2"?"js":"css"	
						})					
					})
				},
				function(msg){console.log(msg)})				
		},
		/** 
		 * @desc 获取工区的配置的数据服务地址
		 * @param {string} workspaceid-工区id
		 * @param {func}success- 成功回调
		 * @param {func}error-失败回调
		 * **/
		getWorkSpaceServer: function(workspaceid, success, error) {
			vmd.workspace = {};
			vmd.workspace.workspaceid = workspaceid;
			vmd.workspace.workflowIp = "";
			vmd.workspace.dataServiceIp = "";
			vmd.workspace.msgIp = "";
			var getip = function() {
				hwDas.get("DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
					workspaceid: workspaceid,
					servicetype: 4
				}, function(result1) {
					if(success)
						success(result1)
					if(result1.data && result1.data.length > 0 && result1.data[0].datas && result1.data[0].datas.length > 0) {
						vmd.workspace.dataServiceIp = vmd.workspace.dataServiceIp || result1.data[0].datas[0].address;
					}
				}, function(msg) {
					if(error)
						error(msg)
				})
				hwDas.get("DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
						workspaceid: workspaceid,
						servicetype: 3
					}, function(result2) {
						if(success)
							success(result2)
						if(result2.data && result2.data.length > 0 && result2.data[0].datas && result2.data[0].datas.length > 0)
							vmd.workspace.workflowIp = vmd.workspace.workflowIp || result2.data[0].datas[0].address;

					},
					function(msg) {
						if(error)
							error(msg)
					})
				hwDas.get("DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
						workspaceid: workspaceid,
						servicetype: 5
					}, function(result2) {
						if(success)
							success(result2)
						if(result2.data && result2.data.length > 0 && result2.data[0].datas && result2.data[0].datas.length > 0)
							vmd.workspace.msgIp = vmd.workspace.msgIp || result2.data[0].datas[0].address;
					},
					function(msg) {
						if(error)
							error(msg)
					})
			}
			if(getUrlParam("id")) {
				hwDas.get("CDEServcie/module/getprojectidbymoduleid", {}, {
					module_id: getUrlParam("id")
				}, function(result) {
					if(success)
						success(result)
					if(result.data && result.data.length > 0 && result.data[0].datas && result.data[0].datas.length > 0) {
						vmd.workspace.projectid = result.data[0].datas[0].project_id;
					} else
						vmd.workspace.projectid = "";
					if(vmd.workspace.projectid == "eQ9ULgcVb1" || vmd.workspace.projectid == "hw3ce0447e") {} else
						getip();
					vmd.core.getProjectServer(vmd.workspace.projectid)
				}, function(msg) {
					if(error)
						error(msg)
				})
			} else
				getip();
		},
		/**
		 * @desc 获取工区的配置的数据服务地址
		 * @param {string} projectid-项目id
		 * @param {func}success- 成功回调
		 * @param {func}error-失败回调
		 * **/
		getProjectServer: function(projectid, success, error) {
			vmd.projectInfo = {
			projectId :projectid,
			workflowIp :"",
			dataServiceIp :"",
			msgIp :"",
			todoIp : "",
			authIp : "",
			docIp : "",
			reoprtIp :"",
			reportIp : "",
			logIp :""};
			
			var setProjectInfo=function(datas){
				var newmsi={};				
				if(datas.micserviceinfo)//获取项目的微服务配置信息
				{
					msi=JSON.parse(datas.micserviceinfo)//转换为项目微服务对象
					for(var i=0;i<msi.length;i++)//遍历微服务信息
					{
						if(msi[i].type!="1"&&msi[i].code)//自定义微服务，直接添加到vmd.projectInfo中
							vmd.projectInfo[msi[i].code]=msi[i].address.url||""	
						else if(msi[i].code)//内置微服务写到newmsi中，单独做处理，要兼容上一版的微服务配置模式
							newmsi[msi[i].code]=msi[i].address.url||""						
					}	
				}				
				vmd.projectInfo.projectid = datas.project_id;
				vmd.projectInfo.workflowIp =newmsi.workflow|| datas.wfserver;
				vmd.projectInfo.dataServiceIp =newmsi.hwdas|| datas.dasserver;
				vmd.projectInfo.msgIp =newmsi.hwmsc|| datas.msgserver;
				vmd.projectInfo.todoIp =newmsi.hwtdc|| datas.todoserver;
				vmd.projectInfo.authIp =newmsi.hwauth|| datas.authserver;
				vmd.projectInfo.docIp =newmsi.hwdmc|| datas.docserver;
				vmd.projectInfo.reoprtIp =newmsi.hwrao|| datas.reportserver;
				vmd.projectInfo.reportIp =newmsi.hwrao|| datas.reportserver;
				vmd.projectInfo.logIp =newmsi.hwlgc|| datas.logserver;
				vmd.projectInfo.grapDasIp = newmsi.grapDas||"";
				vmd.projectInfo.grapAasIp = newmsi.grapAas||"";
				vmd.projectInfo.umcIp = newmsi.hwumc||"";
				vmd.projectInfo.emcIp = newmsi.hwemc||"";
				vmd.projectInfo.amcIp = newmsi.hwauth||"";
				//兼容之前工区配置的信息，项目未配置，则将工区的配置对应上
				vmd.workspace.workflowIp = vmd.projectInfo.workflowIp || vmd.workspace.workflowIp;
				vmd.workspace.dataServiceIp = vmd.projectInfo.dataServiceIp || vmd.workspace.dataServiceIp;
				vmd.workspace.msgIp = vmd.projectInfo.msgIp || vmd.workspace.msgIp;				
			}
			if(vmd.projectInfo.projectId == "eQ9ULgcVb1" || vmd.projectInfo.projectId == "hw3ce0447e") {				
				success&&success()
				return;
			}
			if(projectid) {
				hwDas.get("CDEServcie/project/projectconfig/devservers", {}, {
					project_id: projectid
				}, function(result1) {
					if(result1.data && result1.data.length > 0 && result1.data[0].datas && result1.data[0].datas.length > 0) 
						setProjectInfo(result1.data[0].datas[0])
					success&&success(result1)
				}, function(msg) {
					error&&error(msg)
				})
			} else if(getUrlParam("id")) {
				hwDas.get("CDEServcie/project/projectconfig/getprodevservices", {}, {
					id: getUrlParam("id")
				}, function(result) {
					if(result.data && result.data.length > 0 && result.data[0].datas && result.data[0].datas.length > 0)
						setProjectInfo(result.data[0].datas[0])
					success&&success(result)
				}, function(msg) {
					error&&error(msg)
				})
			}
		},
		/** 
		 * @desc 保存模块的编辑信息
		 * @param {string} moduleid-模块id（或子模块id）
		 * @param {func}success- 成功回调
		 * @param {func}error-失败回调
		 * @param {string}parentModuleId-上级页面id（如果传递的模块id为自模块，则改id为上级模块Id）
		 * **/
		saveModuleEditInfo: function(moduleid, success, error, parentModuleId) {
			if(!moduleid)
				moduleid = getUrlParam("id");
			if(!moduleid)
				return;
			if(!parentModuleId)
				parentModuleId = getUrlParam("pid");
			if(parentModuleId) {
				vmd.core.saveSubWin(moduleid, parentModuleId, getUrlParam("path"), getUrlParam("name"), success, error)
			} else {
				var username = Ext.util.Cookies.get('userName') ? unescape(Ext.util.Cookies.get('userName')) : "";
				var myDate = new Date();
				hwDas.edit("CDEServcie/module/info", {}, {}, [{
					id: moduleid,
					row_changed_by: username || Ext.util.Cookies.get('hwLogin'),
					row_changed_date: Ext.Date.format(myDate, 'Y-m-d H:i:s')
				}], function(result) {
					if(success)
						success(result)
					console.log("修改模块成功！")
				}, function(msg) {
					if(error) error(msg)
					console.log("修改模块失败！" + JSON.stringify(msg))
				})
			}
		},
		/** 
		 * @desc 保存子模块信息
		 * @param {string} moduleid-模块id（或子模块id）
		 * @param {string}parentModuleId-上级页面id（如果传递的模块id为自模块，则改id为上级模块Id）
		 * @param {string}path-模块的路径
		 * @param {string}name-模块的名称
		 * @param {func}success- 成功回调
		 * @param {func}error-失败回调
		 * **/
		saveSubWin: function(moduleid, parentModuleId, path, name, success, error) {
			hwDas.get("CDEServcie/module/getchildmodule", {}, {
					module_id: parentModuleId
				}, function(result) {
					var savepath = path
					if (savepath && savepath.indexOf('/system') == 0) {
						savepath = savepath.replace('/system', '')
					}
					if (savepath && savepath.indexOf('/modules') == 0) {
						savepath = savepath.replace('/modules', '')
					}
					savepath=savepath.replace('.vmd', '')
					var username = Ext.util.Cookies.get('userName') ? unescape(Ext.util.Cookies.get('userName')) : "";
					var myDate = new Date();
					if(result.data.length > 0 && result.data[0].size > 0) {
						var project_id = result.data[0].datas[0].project_id;
						var category_id = result.data[0].datas[0].category_id;
						var mainModuleId = "";
						if(result.data[0].datas[0].type == "1")
							mainModuleId = result.data[0].datas[0].mainmoduleid;
						else
							mainModuleId = parentModuleId;
						hwDas.save("CDEServcie/module/getchildmodule", {}, {}, {
								module_id: moduleid,
								code: vmd.getGuid(36),
								name: name,
								filepath: savepath,
								category_id: category_id,
								project_id: project_id,
								upmoduleid: parentModuleId,
								mainmoduleid: mainModuleId,
								row_created_by: username,
								row_changed_by: myDate
							},
							function(result1) {
								if(success) success(result1)
								console.log("保存子页面成功！")
							},
							function(msg) {
								if(error) error(msg)
								console.log(msg)
							})
					}
				},
				function(msg) {
					if(error) error(msg)
					console.log(msg)
				})
		},
		/** 
		 * @desc 保存复合组件的编辑信息
		 * @param {string} uxid-组件id
		 * @param {func}success- 成功回调
		 * @param {func}error-失败回调
		 * **/
		saveUXCompInfo: function(uxid, success, error) {
			if(!uxid)
				uxid = getUrlParam("uxid");
			if(!uxid)
				return;
			var username = Ext.util.Cookies.get('userName') ? unescape(Ext.util.Cookies.get('userName')) : "";
			var myDate = new Date();
			hwDas.edit("CDEServcie/resource/zygl", {}, {}, [{
				id: uxid,
				row_changed_by: username || Ext.util.Cookies.get('hwLogin'),
				row_changed_date: Ext.Date.format(myDate, 'Y-m-d H:i:s')
			}], function(result) {
				if(success)
					success(result)
				console.log("修改复合组件成功！")
			}, function(msg) {
				if(error)
					error(msg)
				console.log("修改组件失败！" + JSON.stringify(msg))
			})
		},
		/** 
		 * @desc 获取环境变量（必须传递项目id或模块id）
		 * @param {string} project_id-项目id
		 * @param {string}module_id- 模块id
		 * **/
		getEnvVariables: function(project_id, module_id) {
			var params = {};
			if(project_id != "")
				params = {
					project_id: project_id
				}
			else if(module_id != "")
				params = {
					module_id: module_id
				}
			else return
			hwDas.get("CDEServcie/var/hjbl", {}, params, function(result) {
				vmd.EnvVars = {}
				vmd.EnvVars.runMode = "normal";
				vmd.EnvVars.debugStatus = "close";
				if(result.data && result.data.length > 0 && result.data[0].datas && result.data[0].datas.length > 0) {
					var evars = result.data[0].datas;
					for(var i = 0; i < evars.length; i++) {
						vmd.EnvVars[evars[i].varname] = evars[i].varvalue;
					}
				}
			}, function(msg) {
				console.log("获取环境变量出错" + JSON.stringify(msg))
			})
		},
		/** 
		 * @desc 删除子模块信息
		 * @param {string} subWinId-自模块id
		 * @param {func}success- 成功回调
		 * @param {func}error- 失败回调
		 * **/
		delSubWinInfo: function(subWinId, success, error) {
			hwDas.get("CDEServcie/module/getsubwin", {}, {
				module_id: subWinId
			}, function(result) {
				var subWinIds = subWinId;
				var getchildWinIds = function(csubWinid) {
					for(var i = 0; i < result.data[0].size; i++) {
						if(csubWinid == result.data[0].datas[i].upmoduleid) {
							subWinIds += "," + result.data[0].datas[i].id;
							getchildWinIds(result.data[0].datas[i].id)
						}
					}
				}
				getchildWinIds(subWinId)
				if(!subWinIds){
					if(error) error('删除的子页面id为空，无法删除');
					return;
				}
				hwDas.del("CDEServcie/module/getchildmodule", {}, {
					module_id: subWinIds
				}, function(result) {
					if(success) success(result)
				}, function(msg) {
					if(error) error(msg)
					console.log(msg)
				})
			}, function(msg) {
				if(error) error(msg)
				console.log(msg)
			})
		},
		checkCookieInfo: function(cookName) {
			var tName = cookName + "Tips";
			var tCookie = Cookie.get(cookName)||getUrlParam(cookName);	
			if(cookName=="hwToken"&&!tCookie)
			{
				tCookie= Cookie.get("EcyLogin")||Cookie.get("ecyLogin")||Cookie.get("hwEcyLogin");
			}		
			if(!tCookie) {	
				
				if(vmd.allTipsInfo) {
					if(vmd.allTipsInfo[tName]) {} else {
						vmd.allTipsInfo[tName] = true;
						vmd.alert("提示", "cookie中未找到" + cookName + "，请联系管理员！", function() {})
					}
				} else {
					vmd.allTipsInfo = {};
					vmd.allTipsInfo[tName] = true;
					vmd.alert("提示", "cookie中未找到" + cookName + "，请联系管理员！", function() {})
				}
			}
		}, /**
		  * @desc tab下的通用报表查询
		  *@param tabid-String|Object  当前的tabpanel对象
		  *@param map 指定tab组件下每个panel要刷新的报表{panel:['report','report2'],pane2:['report3'],pane3:['report4']}
		  *@demo tabReportQuery(tab1,{panel:['report'],panel1:['report2']})
		  *@param isRefresh-boolean 是否重置刷新标记,true为重置(一般用在查询按钮处),false为不重置(一般用在切换tab时),默认false
		  **/
		  tabReportQuery:function(tabid, map, isRefresh) {
			 var tab;
			 if (Ext.isString(tabid)) tab = Ext.getCmp(tabid);
			 else tab = tabid;
			 if (!tab) return;
			 if (Ext.isBoolean(map)) {
				 isRefresh = map;
				 map = false
			 }
			 if (!vmd._queryedRpt) vmd._queryedRpt = [];
			 if (isRefresh) vmd._queryedRpt = [];
			 var activePanel = tab.getActiveTab();
			 if (!map) {
				 //默认处理
				 var rpt = activePanel && activePanel.items && activePanel.items.items[0];
				 if (rpt && rpt.xtype.indexOf('vmd.report') != '-1') {
					 if (vmd.Array.contains(vmd._queryedRpt, rpt.id)) return;
					 rpt.query();
					 vmd._queryedRpt.push(rpt.id);
				 } else if (rpt && rpt.xtype.indexOf('vmd.chart') != '-1') {
					 if (vmd.Array.contains(vmd._queryedRpt, rpt.id)) return;
					 rpt.store.toRefresh();
					 vmd._queryedRpt.push(rpt.id);
				 }
			 } else {
				 //指定对应关系
				 var activeReports = map[activePanel.id];
				 if (activeReports && Ext.isArray(activeReports)) {
					 Ext.each(activeReports, function(item) {
						 var rpt;
						 if (vmd.Array.contains(vmd._queryedRpt, item)) return;
						 if (item) {
							 if (Ext.isString(item)) {
								 rpt = Ext.getCmp(item);
							 } else if (Ext.isObject(item)) {
								 rpt = item;
							 }
							 if (rpt && rpt.xtype.indexOf('vmd.report') != '-1') {
								 rpt && rpt.query();
							 } else if (rpt && rpt.xtype.indexOf('vmd.chart') != '-1') {
								 rpt.store.toRefresh();
							 }
							 vmd._queryedRpt.push(item);
						 }
					 })
				 }
			 }
		 },
		 /** 
		 * @desc 保存模版，只在设计模式下使用，用于存储模块的公共配置
		 * @param {string} fileName-文件名称,或者包含路径的文件名称，路径格式为 项目id/目录id/目录id/***.json
		 * @param {string}context- 文件内容
		 * @param {fun}successback- 成功回调
		 * @param {fun}errorback- 失败回调
		 * **/
		 saveTemplate :function(fileName,context,successback, errorback)
		 {	
		 
		   var geturl=function(urlPath,isPath){
			   
					 var url='';
					 var replaceStr = urlPath.replace(/([system|/]?(modules|release)\/(\w+\/)+)\w+(?=.(vmd|html))/, '');
				     var url = urlPath.replace(replaceStr, ''); 
					 
					return url || urlPath ;	
				}  
		 
		 if(!fileName)
				{errorback("必须传递文件名！")}			
			var savepath=fileName;
			if(fileName.indexOf("/")<0)//如果传递的不是路径，是文件名
			{	var urlPath=vmd.getUrlParam("path");
				if(vmd.previewMode)//保存基础模版方法只应用在设计模式下判断如果在设计模式下，则先获取当前页面的url参数path，如果url不存在，则调用父页面的path
				{
					if(!urlPath&&parent&&parent.vmd)
						urlPath=parent.vmd.getUrlParam("path")||"";	
				}
				if(!urlPath){
					errorback&&errorback("未获取到模块的路径，请在页面中传递path作为url参数或设置fileName中包含相对路径！")
					return;
				}
				//urlPath=urlPath.replace(".vmd","").replace("modules/","") ;
				/*if(urlPath.indexOf('.')>0)
					urlPath=urlPath.match("(?<=[system|/]?modules\/|release\/).+(?=\.vmd|\.html)")||urlPath.match("(?<=[system|/]?modules\/|release\/).+")||urlPath
				else
					urlPath=urlPath.match("(?<=[system|/]?modules\/|release\/).+")||urlPath		
                */
              
                 
                if(urlPath.indexOf('.')>0){
					urlPath=geturl(urlPath);
				}else{
					urlPath=geturl(urlPath,true);
				}
               				
				savepath="templates/default/"+urlPath+"/"+fileName;
			}			 
			if(savepath.indexOf("templates")<0)
			{
				//savepath="templates/default/"+(savepath.match("(?<=[system|/]?modules\/|release\/).+")||savepath	);
				
				savepath="templates/default/"+ geturl(savepath)	;
			}
			 var t_hwFao=new HwFao(vmdSettings.vmdFileServiceIp||vmdSettings.vmdUploadIp||vmdSettings.dataServiceIp,"vmd")	
			 t_hwFao.write(savepath,context,successback, errorback)		
		 }, 
		 /** 
		 * @desc 保存模版，只在设计模式的运行和运行模式下使用，用于存储模块的公共配置
		 * @param {string} fileName-文件名称,或者包含路径的文件名称，路径格式为 项目id/目录id/目录id/***.json	 
		 * @param {string}context- 文件内容
		 * @param {string}userid- 用户id
		 * @param {object}config- 用户配置 可默认 默认为vmd	 格式｛host:***,mark:***｝
		 * @param {fun}successback- 成功回调
		 * @param {fun}errorback- 失败回调
		 * **/
		 saveUserTemplate :function(fileName,context,userid,config,successback, errorback)
		 {	if(!fileName)
				{errorback("必须传递文件名！")
			}	
			if(!userid)
				{errorback("必须传递用户名！")
			}		
			 var savepath=fileName;			 
			if(fileName.indexOf("/")<0)	
			{	
				var urlPath=vmd.getUrlParam("path");
				if(!urlPath)
				{
					if(vmd.previewMode)
					{
						if(parent&&parent.vmd)
							urlPath=parent.vmd.getUrlParam("path")||"";							
					}
					if(!urlPath)
					{
						 var url = document.location.toString();
				　　　　 var arrUrl = url.split("//");
				　　　　 var start = arrUrl[1].indexOf("/");
				　　　　 var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
				　　　　 if(relUrl.indexOf("?") != -1){
				　　　　　　relUrl = relUrl.split("?")[0];
				　　　　 }
						 var urlPath=relUrl			 	
					}			
				}
				if(urlPath.indexOf('.')>0)
					urlPath=urlPath.match("(?<=[system|/]?modules\/|release\/).+(?=\.vmd|\.html)")||urlPath.match("(?<=[system|/]?modules\/|release\/).+")||urlPath
				else
					urlPath=urlPath.match("(?<=[system|/]?modules\/|release\/).+")||urlPath			
				savepath="templates/user/"+userid+"/"+urlPath+"/"+fileName;		
			}		 		 
			if(savepath.indexOf("templates")<0)
			{
				savepath="templates/user/"+userid+"/"+(savepath.match("(?<=[system|/]?modules\/|release\/).+")||savepath	);
			}
			var t_hwFao=new HwFao((config&&config.host)||vmdSettings.vmdFileServiceIp||vmdSettings.vmdUploadIp||vmdSettings.dataServiceIp,(config&&config.mark)||"vmd")			
			t_hwFao.write(savepath,context,successback, errorback)		
		 },
		 /** 
		 * @desc 读取模版，在设计模式的运行和运行模式下使用，用于读取模块的公共配置
		 * @param {string} fileName-文件名称,或者包含路径的文件名称，路径格式为 项目id/目录id/目录id/***.json	 
		 * @param {fun}successback- 成功回调
		 * @param {fun}errorback- 失败回调
		 * **/
		 readTemplate:function(fileName,successback, errorback)
		 {
			 if(!fileName)
				{errorback&&errorback("必须传递文件名！")
			}	
			var readpath=fileName;		 
			if(fileName.indexOf("/")<0)	
			{	
				var urlPath=vmd.getUrlParam("path");
				if(!urlPath)
				{
					if(vmd.previewMode)
					{
						if(parent&&parent.vmd)
							urlPath=parent.vmd.getUrlParam("path")||"";							
					}
					if(!urlPath)
					{
						 var url = document.location.toString();
				　　　　 var arrUrl = url.split("//");
				　　　　 var start = arrUrl[1].indexOf("/");
				　　　　 var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
				　　　　 if(relUrl.indexOf("?") != -1){
				　　　　　　relUrl = relUrl.split("?")[0];
				　　　　 }
						 var urlPath=relUrl		 	
					}			
				}
				if(urlPath.indexOf('.')>0)
					urlPath=urlPath.match("(?<=[system|/]?modules\/|release\/).+(?=\.vmd|\.html)")||urlPath.match("(?<=[system|/]?modules\/|release\/).+")||urlPath
				else
					urlPath=urlPath.match("(?<=[system|/]?modules\/|release\/).+")||urlPath		
				readpath="/templates/default/"+urlPath+"/"+fileName;		
			}		
			if(readpath.indexOf("templates")<0)
			{
				readpath="/templates/user/"+userid+"/"+(readpath.match("(?<=[system|/]?modules\/|release\/).+")||readpath);
			}			
			 
			readpath=vmd.bootPATH+readpath;
			hwDas.ajax({
					type: "get",
					url:readpath,
					dataType: "json",
					success: function(res) {
						successback&&successback(res)
					},
					error:function(err){
						errorback&&errorback(err)
					}
				})			 
		 },
		 /** 
		 * @desc 读取用户模版，在设计模式的运行和运行模式下使用，用于读取用户的配置
		 * @param {string} fileName-文件名称,或者包含路径的文件名称，路径格式为 项目id/目录id/目录id/***.json	 
		 * @param {string} userid-用户id	
		 * @param {object} config-服务配置	可默认 默认为vmd	 格式｛host:***,mark:***｝
		 * @param {fun}successback- 成功回调
		 * @param {fun}errorback- 失败回调
		 * **/
		 readUserTemplate :function(fileName,userid,config,successback, errorback)
		 {			 
			if(!fileName){
				errorback&&errorback("必须传递文件名！")
				return ;
			}	
			if(!userid){
				errorback&&errorback("必须传递用户名！")
				return ;
			}	
			 var readPath=fileName;
			 if(fileName.indexOf("/")<0)	
			{	
				var urlPath=vmd.getUrlParam("path");
				if(!urlPath)
				{
					if(vmd.previewMode)
					{
						if(parent&&parent.vmd)
							urlPath=parent.vmd.getUrlParam("path")||"";							
					}
					if(!urlPath)
					{
						 var url = document.location.toString();
				　　　　 var arrUrl = url.split("//");
				　　　　 var start = arrUrl[1].indexOf("/");
				　　　　 var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
				　　　　 if(relUrl.indexOf("?") != -1){
				　　　　　　relUrl = relUrl.split("?")[0];
				　　　　 }
						 var urlPath=relUrl		
						
					}			
				} 
				if(urlPath.indexOf('.')>0)
					urlPath=urlPath.match("(?<=[system|/]?modules\/|release\/).+(?=\.vmd|\.html)")||urlPath.match("(?<=[system|/]?modules\/|release\/).+")||urlPath
				else
					urlPath=urlPath.match("(?<=[system|/]?modules\/|release\/).+")||urlPath	 	
				readPath="templates/user/"+userid+"/"+urlPath+"/"+fileName;		
			}	 
			if(readPath.indexOf("templates")<0)
			{
				readPath="templates/user/"+userid+"/"+(readPath.match("(?<=[system|/]?modules\/|release\/).+")||readPath	);
			}
			 var t_hwFao=new HwFao((config&&config.host)||vmdSettings.vmdFileServiceIp||vmdSettings.vmdUploadIp||vmdSettings.dataServiceIp,(config&&config.mark)||"vmd")
			 t_hwFao.read(readPath,successback, errorback)			
		 }
	}
})
//窗体设计器的调用
Ext.define("vmdDesigner", {
	extend: 'Ext.Window',
	allas: 'vmd.window',
	alternateClassName: ['vmd.window', 'vmd.Window'],
	offset: [0, 0],
	auto: true,
	cache: true,
	modal: true,
	maximized: false,
	enableIframe: false,
	height: 600,
	width: 800,
	maximizable: true,
	resizable: true,
	params: "",
	title: "自定义",
	//html: "<iframe src='../run/default.html?r=" + new Date().getTime() + "' frameborder=0 style='height:100%;width:100%'></iframe>",
	bodyStyle: "background-color:#fff",
	frameScroll: true,
	enableLoading: false,
	loadMessage: '正在加载,请稍后...',
	listeners: {
		move: function(me, x, y) {
			var bh = document.documentElement.clientHeight;
			if(y < 0) {
				me.setPosition(x, 0);
			}
			if(y >= bh - 60) {
				me.setPosition(x, bh - 70);

			}
		}
	},
	loadMask: function() {

		if(this.enableLoading) {
			var myMask = new Ext.LoadMask(this.el, {
				msg: this.loadMessage,
				msgCls: 'z-index:10000;'
			});

			myMask.show();
			this.loading = myMask;
		}
	},
	initComponent: function() {

		var view = document.documentElement;
		if(!this.items) {

			if(this.auto) {
				this.width = view.clientWidth - this.offset[0];
				this.height = view.clientHeight - this.offset[1];
			}
			this.url = this.url || "/design/default.html";
			if(this.url.indexOf('?') == -1) {
				this.url = this.url + '?';
			}
			//构造参数进行eacape编码

			this.orginUrl = this.url;
			var url = this.getUrl(this.url);

			if(this.params) {
				if(url.indexOf('?') == -1) url = url + "?";
				else url = url + "&";
				url = url + Ext.urlEncode(this.params)
				//this.params = Ext.urlEncode(this.params);
			}
			this.url = url;
			var _scroll = this.frameScroll ? ('scrolling =' + this.frameScroll) : ('scrolling ="no"');

			//this.html = "<iframe id='testframe' src='" + url + "'  scrolling=" + _isScroll + " frameborder=0 style='height:100%;width:100%'></iframe>"
			this.html = "<iframe id='testframe' src='" + url + "'  " + _scroll + " frameborder=0 style='height:100%;width:100%'></iframe>"

		} else {
			if(this.auto) {
				if(!this.offset) this.offset = [0, 0];
				this.width = view.clientWidth - this.offset[0];
				this.height = view.clientHeight - this.offset[1];
			}
		}

		this.callParent(arguments);

	},
	getUrl: function(url) {
		var newUrl = url.substring(0, url.indexOf('?'));
		var params = "",
			radParam = "",
			noParamUrl = "";
		if(this.cache) {
			radParam = "r=" + new Date().getTime();
		}

		noParamUrl = newUrl + "?" + radParam;
		if(url.indexOf('?') != -1) {
			params = url.substring(url.indexOf('?') + 1);
			var newObj = {};
			if(params) {
				var paramsObj = Ext.urlDecode(params);
				for(var key in paramsObj) {
					newObj[key] = paramsObj[key];
				}

				var escapeParams = Ext.urlEncode(newObj);

				return newUrl + "?" + escapeParams + "&" + radParam

			} else {
				newUrl = noParamUrl;
			}
		} else {
			newUrl = noParamUrl;
		}
		return newUrl;

	},
	show: function(noMaxDispaly) {

		this.callParent();
		//if (!noMaxDispaly) this.maximize();
		/* if (this.auto && this.offset && this.offset[0] == 0 && this.offset[1]==0) {
		    this.maximize();
		 }*/
	},

	afterRender: function() {

		this.callParent(arguments);
		var me = this;

		if(this.items && this.items.length > 0) return;
		var frame = this.body.dom.children[0];
		try {

			this.iframe = frame.tagName == 'IFRAME' ? (frame.contentWindow.window || frame.contentDocument.window || WINDOW.frames[frame.id].window) : null;
			if(this.url && this.enableLoading) {
				vmd(frame).on('load', function() {
					me.loading.hide();
				})
			}
		} catch(ex) {}

		//增加iframe遮挡功能
		if(me.enableIframe) {
			var winEl = me.el;
			var ifr = document.createElement("IFRAME");
			ifr.frameBorder = 0;
			ifr.border = 0;
			ifr.setAttribute("src", "javascript:false;");
			ifr.className = "vmdWin_ifr";
			//动态调整窗口位置
			ifr.style.position = "absolute";
			ifr.style.left = 0;
			ifr.style.top = 0;
			ifr.style.width = '100%';
			ifr.style.height = '100%';
			ifr.onload = function() {
				this.onload = null;
				this.contentWindow.document.open("text/html", "replace");
				this.contentWindow.document.write("<html><head><style>html,body{width:100%;height:100%;overflow:hidden;margin:0px;}</style></head><body></body></html>");
			}
			winEl.appendChild(ifr);
		}

		var headerButtons = this.headerButtons;
		if(headerButtons) {
			var buttons = headerButtons.items;
			if(!buttons) return;
			var dh = Ext.DomHelper
			var align = headerButtons.align;
			var style = headerButtons.style || '';

			var newItems = [];
			Ext.each(buttons, function(item) {
				newItems.push({
					tag: 'div',
					cls: align
				})

			})

			var newNode = this.header.createChild({
				tag: 'div',
				cls: 'newbtn ' + align,
				style: style,
				children: newItems
			})

			var childNodes = newNode.dom.children;
			var arr = []
			Ext.each(childNodes, function(item, index) {
				var btn = buttons[index];
				var btnConf = {
					renderTo: item,
					text: btn.text,
					size: 'small',
					type: btn.type || '',
					handler: btn.click
				}
				Ext.applyIf(btnConf, btn);
				var inst = new vmd.comp.button(btnConf)
				arr.push(inst);

			})
			this.headerButtons = arr;
		}
		//增加进度条显示（默认不开启）
		this.loadMask();

	},
	statics: {

	}

})
//#region vmd.util
Ext.namespace('vmd.util');
vmd.util = {
	guid: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	/*
	 ** randomWord 产生任意长度随机字母数字组合
	 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
	 ** randomWord(false,4) 生成任意4位长度的随机数
	 ** randomWord(true,1,9) 生成任意1-9位长度的随机数
	 */

	randomWord: function(randomFlag, min, max) {
		var str = "",
			range = min,
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		// 随机产生
		if(randomFlag) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for(var i = 0; i < range; i++) {
			pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	},
	getUrlParam2: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
		var r = window.location.search.substr(1).match(reg); //匹配目标参数  
		if(r != null) return unescape(r[2]);
		return null; //返回参数值 
	},
	getUrlParam: function(param) {
		try
		{
		var params=Ext.urlDecode(location.search.substring(1));
		return param ? (params[param] ? params[param] : '') : '';
		}
		catch(ex)
		{return vmd.getUrlParam2(param)}
	},
	/**
	*desc 图片展示功能
	*@param {object} imgsInfo-图片列表对象：index当前图片索引，items图片对象数组
	*imgsInfo={index:0,items:[{ msrc: "/demo/img/login_bg2.jpg",
	                    src: "/demo/img/login_bg2.jpg",
	                    h: 0,
	                    w: 0,
	                    title: "20110215-feat-html5.png"}]}
	*@param {object} opts-图片对象参数设置
	*/
	showImg: function(imgsInfo, opts) {

		var options = {
			history: false,
			focus: true,
			index: 0,
			bgOpacity: 0.8,
			maxSpreadZoom: 5,
			closeOnScroll: false,
			shareEl: false,

			showHideOpacity: false,
			showAnimationDuration: 300,
			hideAnimationDuration: 300

		};
		Ext.applyIf(options, opts);
		vmd.loadCss(bootPATH + "lib/PhotoSwipe/photoswipe.css")
		vmd.loadCss(bootPATH + "lib/PhotoSwipe/default-skin/default-skin.css")
		$LAB.script(bootPATH + "lib/PhotoSwipe/photoswipe.min.js")
			.script(bootPATH + "lib/PhotoSwipe/photoswipe-ui-default.min.js")
			.wait(function() {
				vmd.get(bootPATH + 'lib/PhotoSwipe/photoSwipe.html', function(photoSwipeTpl) {
					if($('.pswp_content').length == 0) {
						$(photoSwipeTpl).appendTo('body');
						$('.pswp__caption__center').css({
							"text-align": "center"
						});
					}
					if($('.pswp').hasClass('pswp--open')) { //已经打开
						return;
					}

					var image = imgsInfo;
					if(!image) return;
					options.index = image.index || options.index;
					var gallery = new PhotoSwipe($('.pswp').get(0), PhotoSwipeUI_Default, image.items, options);
					gallery.loadFinished = false;
					gallery.listen('gettingData', function(index, item) {
						var img = new Image();
						img.onload = function() {
							item.w = this.width;
							item.h = this.height;
							gallery.updateSize(true);
						}
						img.src = item.src;
					});
					gallery.init();

				}, "text")

			})

	},
	/**
	 *desc 根据字节转换实际大小
	 *@param {int} size-实际的字节大小
	 *@param {int} pointNum-保留的小数位数
	 */
	bytesToString: function(size, pointNum) {
		if(size == undefined || size == '') {
			return '0B'
		}
		if(pointNum == undefined) {
			pointNum = 1;
		}
		if(size <= 1024) return parseInt(size) + "B";
		size = parseInt(size);
		var unit = {
			'G': 1073741824, // pow( 1024, 3)
			'M': 1048576, // pow( 1024, 2)
			'K': 1024, // pow( 1024, 1)
			'B': 1 // pow( 1024, 0)
		};
		for(var key in unit) {
			if(size >= unit[key]) {
				return(size / unit[key]).toFixed(pointNum) + key;
			}
		}
	},
	CreateJSPath: function(str, dis) {

		var ContainsJS = function(jsName) {
			var scripts = document.getElementsByTagName("script");
			for(var i = 0, l = scripts.length; i < l; i++) {
				var src = scripts[i].src;
				if(src.indexOf(jsName) != -1) {
					return true;
				}
			}
			return false;
		};

		if(!ContainsJS(str)) {
			return "";
		}
		var scripts = document.getElementsByTagName("script");
		var path = "";
		if(str && str.indexOf("js") != -1) {
			for(var i = 0, l = scripts.length; i < l; i++) {
				var src = scripts[i].src;
				if(src.indexOf(str) != -1) {
					path = src.split(str)[0];
					break;
				}
			}
		}

		var href = location.href;
		href = href.split("#")[0].split("?")[0].split("/");

		var isAbsolutePath = true;
		if(path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
			isAbsolutePath = false;
			href.length = href.length - 1;
			path = path.split("/");
			path = href.concat(path);
		}
		if(isAbsolutePath) {
			path = path.split("/");
		}
		path.length = path.length - 1 + (dis || 0);
		path = path.join("/");
		return path;
	}

}
window.getUrlParam = vmd.util.getUrlParam;
//#endregion
Ext.Msg.minWidth = 200;

Ext.apply(vmd, {
	alert: function(title, msg, fn, info) {

		var settings = {
			icon: Ext.Msg.INFO,
			minWidth: Ext.Msg.minWidth,
			buttons: Ext.Msg.OK
		}
		Ext.apply(settings, info);
		var inst = Ext.Msg.show({
			title: title,
			msg: msg,
			buttons: settings.buttons,
			fn: fn,
			scope: settings.scope,
			minWidth: settings.minWidth,
			icon: settings.icon
		});
		return inst;
	},
	error: function (title, msg, fn, info) {

	    var settings = {
	        icon: Ext.Msg.ERROR,
	        minWidth: Ext.Msg.minWidth,
	        buttons: Ext.Msg.OK
	    }
	    Ext.apply(settings, info);
	    var inst = Ext.Msg.show({
	        title: title,
	        msg: msg,
	        buttons: settings.buttons,
	        fn: fn,
	        scope: settings.scope,
	        minWidth: settings.minWidth,
	        icon: settings.icon
	    });
	    return inst;
	},
	getCmpDeps: function(list) {

		var deps = []
		var path = "";
		if(!vmd.virtualPath) path = '/' + vmd.componentPath + 'ux';
		else path = vmd.virtualPath + '/' + vmd.componentPath + 'ux';
		Ext.Loader.setPath('vmd.ux', path)
		if(!list) return deps;

		return list;
	},
	chartJSInit:function(callback) {
		var fileArr = [];
		var bootPath = vmd.bootPATH;
		if (!ContainsJS("json2.js")) {
			fileArr.push(bootPath + "/chart/libs/json/json2.js");
		}
		if (!ContainsJS("hwstock.src.js")) {
			fileArr.push(bootPath + "/chart/js/hwstock.src.js");
		}
		if (!ContainsJS("hwcharts-more.src.js")) {
			fileArr.push(bootPath + "/chart/js/hwcharts-more.src.js")
		}
		if (!ContainsJS("hwcharts-plugin.src.js")) {
			fileArr.push(bootPath + "/chart/js/hwcharts-plugin.src.js")
		}
		if (!ContainsJS("data.src.js")) {
			fileArr.push(bootPath + "/chart/js/modules/data.src.js")
		}
		if (!ContainsJS("hwChartApi.src.js")) {
			fileArr.push(bootPath + "/chart/js/hwChartApi.src.js")
		}
		if (!ContainsJS("defaultData.js")) {
			fileArr.push(bootPath + "/chart/data/defaultData.js")
		}
		var ieMode = getIEDocumentMode();
		if (ieMode && ieMode < 9) {
			fileArr.push(bootPath + "/chart/js/modules/oldie.src.js")
		}
		fileArr.push(bootPath + "/chart/js/hwAPI.js")
		for (var i = 0; i < fileArr.length; i++) {
			if (i < fileArr.length - 1) {
				$LAB.script(fileArr[i]).wait();
			} else {
				$LAB.script(fileArr[i]).wait(callback);
			}
		}
		function ContainsJS(jsName) {
			var scripts = document.getElementsByTagName("script");
			for (var i = 0, l = scripts.length; i < l; i++) {
				var src = scripts[i].src;
				if (src.indexOf(jsName) != -1) {
					return true;
				}
			}
			return false;
		}
		function getIEDocumentMode() {
			// 判断是否为IE
			var isIE = navigator.userAgent.toLocaleLowerCase().indexOf('msie') !== -1;

			// 判断是否为IE5678
			var isLteIE8 = isIE && !-[1, ];

			// 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
			var dm = document.documentMode,
				isIE5, isIE6, isIE7, isIE8, isIE9, isIE10, isIE11;
			if (dm) {
				return dm;
			} else {
				// 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性
				isIE5 = (isLteIE8 && (!document.compatMode || document.compatMode === 'BackCompat'));
				// 判断是否为IE6，IE7开始有XMLHttpRequest对象
				isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest;
				// 判断是否为IE7，IE8开始有document.documentMode属性
				isIE7 = isLteIE8 && !isIE6 && !document.documentMode;
				// 判断是否IE8
				isIE8 = isLteIE8 && document.documentMode;
				// 判断IE9，IE10开始支持严格模式，严格模式中函数内部this为undefined
				isIE9 = !isLteIE8 && (function() {
					"use strict";
					return !!this;
				}());
				// 判断IE10，IE11开始移除了attachEvent属性
				isIE10 = isIE && !!document.attachEvent && (function() {
					"use strict";
					return !this;
				}());
				// 判断IE11
				isIE11 = isIE && !document.attachEvent;
				if (isIE5) {
					return 5;
				} else if (isIE6) {
						return 6;
				} else if (isIE7) {
					return 7;
				} else if (isIE8) {
					return 8;
				} else if (isIE9) {
					return 6;
				} else if (isIE9) {
					return 6;
				} else if (isIE10) {
					return 10;
				} else if (isIE11) {
					return 11;
				}
			}
		}	
	},
	userAuth:function(backurl,errurl,usermark,type,appkey,host){
		vmdtoken=vmd.getUrlParam('hwToken')||vmd.Cookie.get("hwToken")||'';
		if(vmd.Cookie.get("usermark")===usermark&&vmdtoken)
			return;		
		if(backurl==null||backurl=="")
			backurl=window.location.href;		
		if(errurl==null||errurl=="")
			errurl=errurl||(vmd.bootPATH+"/system/autherror.html");
		if(host==null||host=="")
			host=host||vmd.MicService.getAuthIp();		
		window.location.href=vmd.bootPATH+"/system/auth.html"+"?backurl="+encodeURIComponent(backurl)+"&errurl="+encodeURIComponent(errurl)+"&usermark="+encodeURIComponent(usermark)+"&type="+encodeURIComponent(type)+"&appkey="+encodeURIComponent(appkey)+"&host="+encodeURIComponent(host);
	},
	getUxPath:function(name, version){
		
		version=version||'1.0';
		var _name, path;
		var prefix = 'vmd.ux.';
		var _path = prefix + '{name}${uxversion}${name}';
		if (!name) return;
		if (name.indexOf(prefix) == 0) {
			_name = name.replace('vmd.ux.', '');
			path = _path.format({
				name: _name,
				uxversion: version
			})
		} else {
			path = _path.format({
				name: name,
				uxversion: version
			})
		}
		return path;
	}
});

(function() {
	//初始化服务设置
	vmd.core.initConfig();
	//20180914 成兵  设置数据访问层的调试模式
	hwDas.runMode = getUrlParam("runMode") || hwDas.runMode;
	hwDas.debugStatus = getUrlParam("debugStatus") || hwDas.debugStatus;
	
   
})()

//修复extgrid单元格不对齐的问题
Ext.grid.ColumnModel.override({
	getTotalWidth: function(includeHidden) {
		var off = 0;
		if(Ext.isChrome) {
			off = 2;
		};
		if(!this.totalWidth) {
			this.totalWidth = 0;
			for(var i = 0, len = this.config.length; i < len; i++) {
				if(includeHidden || !this.isHidden(i)) {
					this.totalWidth += this.getColumnWidth(i) + off;
				};
			};
		};
		return this.totalWidth;
	}
});

//修复subview中被弹窗遮盖问题

if(window.dhtmlXCombo!=undefined)
{
dhtmlXCombo.prototype._showList = function(a) {
	if (this._getListVisibleCount() == 0) {
		if (a && this._isListVisible()) {
			this._hideList()
		}
		return
	}
	if (this._isListVisible()) {
		this._checkListHeight();
		return
	}
	this.list.style.zIndex = 9909;
	if (this.hdr != null && this.conf.template.header == true) {
		this.hdr.style.zIndex = Number(this.list.style.zIndex) + 1
	}
	this.list.style.visibility = "hidden";
	this.list.style.display = "";
	if (this.hdr != null && this.conf.template.header == true) {
		this.hdr.style.visibility = this.list.style.visibility;
		this.hdr.style.display = this.list.style.display
	}
	var c = (this.hdr != null && this.conf.template.header == true ? this.hdr.offsetHeight : 0);
	this.list.style.width = Math.max(this.conf.opts_width || this.conf.col_w || 0, this.conf.combo_width) + "px";
	this.list.style.top = window.dhx4.absTop(this.base) + c + this.base.offsetHeight - 1 + "px";
	this.list.style.left = window.dhx4.absLeft(this.base) + "px";
	if (this.hdr != null && this.conf.template.header == true) {
		this.hdr.style.width = this.list.style.width;
		this.hdr.style.left = this.list.style.left;
		this.hdr.style.top = parseInt(this.list.style.top) - c + "px"
	}
	this._checkListHeight();
	this.list.style.visibility = "visible";
	if (this.hdr != null && this.conf.template.header == true) {
		this.hdr.style.visibility = "visible"
	}
	this.callEvent("onOpen", [])
}
}
//vmd增加错误单例静态类
Ext.define('vmd.Error', {
    singleton: true,
    version: '2.0.6.1008',
	list: [{
        code: '003-1',
        msg: '复合组件{p1}初始化出错',
        help: '请检查复合组件配置或操作逻辑是否正确'

    },
        {
            code: '003-2',
            msg: '复合组件{p1}渲染出错',
            help: '请检查复合组件配置或操作逻辑是否正确'
        },
		{
		    code: '003-3',
		    msg: '复合组件{p1}代码注入出错,{p2}',
		    help: '请检查复合组件业务逻辑（变量、函数等）命名是否正确!'
		}
    ],
    constructor: function() {

        this._init();
    },
    /*
     *@private 初始化构造错误列表
     */
    _init: function() {

        var me = this;
       // var depsList = this._getDeps();
        this.errorList = new Ext.util.MixedCollection();
        /*Ext.each(depsList, function(item) {
            if (Ext.isObject(vmd.Error.error) && vmd.Error.error[item]) {
                var errCls = vmd.Error.error[item];
                if (errCls && Ext.isArray(errCls.list)) {
                    Ext.each(errCls.list, function(errInfo) {
                        me.errorList.add(errInfo.code, errInfo);
                    })
                }
            }
        })*/
		
		 Ext.each(this.list, function (errInfo) {
            me.errorList.add(errInfo.code, errInfo);
        })


    },
    /*
     *@private 得到依赖的错误分类列表
     */
    _getDeps: function() {
        var list = [];
        var deps = this.requires;
        Ext.each(deps, function(cls) {
            var className = cls.$className;
            if (className && className.indexOf('vmd.Error.error.') == 0) {
                list.push(className.replace(/vmd.Error.error./, ''));
            }
        })
        return list;
    },
    /*
     *@desc 得到错误信息
     *@param {string} code-错误代码
     *@return {object} 返回错误信息
     */
    _getMessage: function(code) {
        if (!code) return '';
        var errorInfo = this.errorList.get(code);
        if (!errorInfo) return null
        var msg = errorInfo.msg;
        var help = errorInfo.help;
        // var categoryName = this.category.get(categoryId).name;
        return {
            title: '错误代码：' + code,
            errCode: code,
            errMsg: msg,
            errHandle: help
        };
    },
    /*
     *@desc 错误弹出
     *@param {string|object} code-错误代码
     *@param {object} replaceinfo-要替换的对象{p1:'',p2:'',p3:''}
     *@param {function} callback-可选,回调函数
     *@param {number} timeout-可选,延时弹出错误
     *@param {object} exception-可选,错误信息
     */

    log: function(code, replace, exception, timeout, callback) {

        var msg;
        if (typeof code == 'object') {
            msg = this._getMessage(code.code);
            replace = code.replace;
            callback = code.callback;
            timeout = code.timeout;
            exception = code.exception;
        } else {
            msg = this._getMessage(code);

        }

        //无错误信息不提示
        if (!msg) {
            exception && console.error(exception)
            return;
        }
        if (replace && msg) {
            msg.errMsg = msg.errMsg.format(replace);
        } else {
            msg.errMsg = msg.errMsg.format({
                p1: '',
                p2: '',
                p3: ''
            })
        }
        //重新组织错误信息
        var title = msg.title;
        var errorMsg = '' + msg.errMsg + '<br/>' +
            '' + msg.errHandle;

        if (typeof replace == 'number') timeout = replace;
        if (typeof exception == 'number') timeout = exception;
        if (timeout) {
            Ext.defer(function() {
                new vmd.error(title, errorMsg);
            }, timeout)
        } else {
            this.error = new vmd.error(title, errorMsg, callback);
        }
        exception && console.error(exception)
    }
})
//vmd插件动态加载
Ext.define('vmd.plugins.Comps', {
    singleton: true,
    requires:['vmd.base.UxPropertySettings'],
	uses: ['vmd.proxy.Log']
})

//兼容web图形框架
if(typeof Vmd=='undefined'){
	Vmd={};
	Ext.apply(Vmd,{
		define:Ext.define,
 		Loader:Ext.Loader
	})
} 
//动态扩展vmd.core的方法
vmd.core.addStatics({
	/**
	*@desc 运行模式下加载vmd组件
	*@param {array} list 组件列表['component1','component2']
	*/
	requireCmpDeps:function(list){
		var chartflag=Ext.Array.findBy(list,function(name){
			return /vmd\.d\.webchart\.\w+/.test(name)
		})
		/*if(chartflag) {
			Ext.require('hwcharts',function(){
				Ext.require(list)
			})
	    }*/
		//Ext.require(list)
		this.classLoader(list)
	},
	/**
	*@desc 组件依赖动态加载
	*@param {array} list 组件列表['component1','component2']
	*@param {function} callback 回调函数
	*/
	classLoader:function(list,callback){
		if(!list) return;
		var i = 0;
		var count = list.length
		var fn = function(_list) {
			if (!_list) {
				callback&&callback()
				return;
			}
			Ext.require(_list, function() {
				fn(list[++i])
			})
		}
		fn(list[i]);
	},
	/**
	*@desc 复合组件动态依赖加载css、js 
	*@param {array} list 组件列表['component1','component2'],复合组件格式："vmd.ux.IsoArea$1.0$IsoArea"
	*@param {function} callback 回调函数
	*/
	uxLoader:function(list,callback){
		
		if(!list) return;
		var js=[],css=[];
		Ext.require(list, function() { 
		   Ext.each(list,function(cmpName){						
				try{		
					if(cmpName.indexOf('$')!=-1) {
						cmpName=cmpName.split('$')[0];
					}	
					css=css.concat(Ext.decode(eval(cmpName+'.prototype.uxrequirecss')));
					js=js.concat(Ext.decode(eval(cmpName+'.prototype.uxrequirejs')));	
					
				}catch(ex){console.log('动态加载复合组件失败'+ex)}
			})
			//组件列表去重
			 css=Ext.Array.unique(css);
			 js=Ext.Array.unique(js);
			 css=Ext.Array.map(css,function(value){
			     if(value&&value.indexOf('http://')==-1) return bootPATH+value;
				 return value
			 })
			 js=Ext.Array.map(js,function(value){
				 if(value&&value.indexOf('http://')==-1) return bootPATH+value;
				 return value
			 })
			 
			 css.length>0&&LazyLoad.css(css);
			 if(js.length>0){
				 LazyLoad.js(js,function(){
					 callback&&callback();
				 })
			 }else{
				 callback&&callback();
			 }
		  
		})
	}
})