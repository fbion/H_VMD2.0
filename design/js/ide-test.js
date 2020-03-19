
Ext.Loader.setConfig({
	enabled: true,
	//disableCaching:false,
	paths: { //'类名前缀':'所在路径'  
		'ide': '../design',
		'core': '../js'
	}
});
/*Ext扩展*/
window.designer = {};

//if (typeof vmdSettings != 'underfined')
//    vmdSettings.vmdUploadPath = 'http://' + vmdSettings.dataServiceIp + /DataService/;
//默认为模块开发
designer.mode = "module";
designer.prefix = {
	cmp: 'vmd.ux.',
	module: 'vmd.module.'
}
if(Ext.MessageBox) {
	Ext.MessageBox.buttonText = {
		ok: "确定",
		cancel: "取消",
		yes: "是",
		no: "否"
	};
}
designer.toolbar = {
	open: "打开",
	New: "模块",
	NewComp: "复合组件",
	del: "删除",
	add: "添加",
	save: "保存",
	saveAs: "另存",
	view: "代码预览",
	help: "帮助",
	about: "关于"
}
designer.CJsonWindow = {
	title: "查看代码"
}
designer.ConfigEditor = {
	title: "属性面板",
	ComponentInspector: "组件布局结构树"
}
designer.Toolbox = {
	title: "工具箱",
	expandall: "展开",
	collapseall: "折叠",
	RepaintCanvas: "刷新画板"
}
designer.ContextMenu = {
	SelectComponent: "选择组件",
	SaveToToolbox: "保存到工具箱",
	MoveUp: "上移",
	Copy: '复制',
	Paste: '粘贴',
	MoveDown: "下移",
	Delete: "删除",
	QuickAdd: "快速添加",
	newVariable: '新建变量',
	newDataSet: '新建数据集'

}
designer.ActionMsg = {
	DeleteComponent: "删除组件",
	DeleteComponentMsg: "确实要删除当前所选组件吗?"
}

designer.Source = {
	UITitle: "设计",
	JosCodeTitle: "脚本",
	HtmCodeTitle: "Html"
}
designer.WindowButton = {
	OK: "确定",
	Close: "关闭",
	Cancel: "取消"
}
Ext.BLANK_IMAGE_URL = "images/s.gif";
Ext.layout.BorderLayout.WARN = false;
Ext.layout.BorderLayout.Region.prototype.floatingZIndex = 65000;
Ext.WindowMgr.zseed = 65000;
window.xds = new Ext.util.Observable();
xds.userControls = [];
xds.vmd = {
	layoutStr: "",
	//comps: {},
	workflow: "",
	//事件
	events: "",
    //扩充事件字典
	eventDict: {
	    afterrender: new StringMap(),
	    beforerender: new StringMap()
	},
	//特殊属性
	props: {},
	//模块样式
	css: "",
	//模版扩充对集成功能的调试
	tplType: 'module',
	propName: "vmd-prop-", //2018-01-25 chengtao 添加
	ux: {
		//复合组件配置
		paths: {
			cmp: vmdSettings.componentPath + 'ux/',
			vmd: vmdSettings.componentPath + 'vmd/',
			ide: vmdSettings.componentPath + 'ide/'

		},
		cmpListPath: vmdSettings.componentPath + 'list.js',
		data: {
			view: '',
			interface: '',
			//接口的属性、方法、事件
			i_props: '',
			i_methods: '',
			i_events: ''
		}

	},
	resource:{
	    data: {
            res:'',
	        css: '',
	        js: '',
            img:''
	    },
	    serverList: [],
        loadComplete:false
	},
	tplList: {
		module: {
			previewPath: '../run/default.html',
			releasePath: 'templete/module.html'
		},
		report: {
			previewPath: '../run/report.html',
			releasePath: 'templete/report.html'
		},
		report2_2: {
			previewPath: '../run/report2_2.html',
			releasePath: 'templete/report.html'
		},
		chart: {
		    previewPath: '../run/chart.html',
		    releasePath: 'templete/chart.html'
		},
		reportChart: {
		    previewPath: '../run/reportchart.html',
		    releasePath: 'templete/reportchart.html'
		}

	},
	//扩展组件list的方法
	cmpList: {
	    list: [],
	    map:new StringMap(),
		getVerByName: function(name) {

			var targetCmp = Ext.Array.findBy(this.list, function(item, i) {
				return item.name == name
			})
			if (targetCmp) return { v: targetCmp.version, zhname: targetCmp.zhname };
			return null;
		},
		getInfoByName: function(name) {
			var targetCmp = Ext.Array.findBy(this.list, function(item, i) {
				return item.name == name
			})
			if(targetCmp) return targetCmp;
			return null
		}
	},
	clear: function() {
		//this.comps = {};
		this.layoutStr = "";
		this.workflow = "";
		this.events = "";
		this.props = "";
		this.css = "";
		this.ux.data = {};

	},
	getPreviewPath: function() {
		return this.tplList[this.tplType].previewPath;
	},
	getReleasePath: function() {

		//return this.tplList[this.tplType].releasePath + "?r=" + new Date().getTime();
		return this.tplList[this.tplType].releasePath;
	},
	setTplType: function(type) {
		this.tplType = type || "module";
	},
	findByCid: function(cls) {
		var root = xds.inspector.root.childNodes[0];
		var cmp;
		var find = function(node) {

			if(node.component && node.component.cid == cls) {

				cmp = node.component
			} else {

				for(var i = 0; i < node.childNodes.length; i++) {
					var subNode = node.childNodes[i];
					find(subNode)
				}

			}
		}
		find(root);
		return cmp;

	},
	findAllByCid: function(cls) {
		var root = xds.inspector.root.childNodes[0];
		var cmp=[];
		var find = function(node) {

			if(node.component && node.component.cid == cls) {

				cmp.push(node.component)
			} else {

				for(var i = 0; i < node.childNodes.length; i++) {
					var subNode = node.childNodes[i];
					find(subNode)
				}

			}
		}
		find(root);
		return cmp;

	},
	checkCid: function() {
	    //修改集成功能类型
	    var reportCid = "vmdReport", chartCid = "vmdChart",reportAndChart="reportChart";
	    var report = xds[reportCid];
	    var chart = xds[chartCid];
	    var ver = report && report.prototype.version;
	    var chart_ver = chart && chart.prototype.version;
	    var isHasReport = xds.vmd.findByCid(reportCid);
	    var isHasChart = xds.vmd.findByCid(chartCid);
	    
	    if (isHasReport) {
			ver = ver || '';
			xds.vmd.setTplType('report' + ver);
		}
	    if (isHasChart) {
	        ver = chart_ver || '';
		    xds.vmd.setTplType('chart' + ver);
	    }
	    if (isHasReport && isHasChart) {
	        ver = "";
	        xds.vmd.setTplType('reportChart' + ver);
	    }
        
	},
	setCmpListMap: function (data) {
	    var ux = xds.vmd.ux;
	    xds.vmd.cmpList.list = data;
	    xds.vmd.cmpList.map = new StringMap();
	    //加载复合组件
	    var cmpList = [];
	    var cmpPathPref = '../' + ux.paths.cmp;
	    var cmpIdePathPref = '../' + ux.paths.ide;
	    Ext.each(data, function (item, i) {
	        //优化需要加版本路径
	        var r = Math.random();
	        var name = item.name,
                ver = item.version + '/';
	        var _dir = name.toLowerCase() + '/';
	        //var cmpPath = cmpPathPref  + name + '.js?r=' + r
	        var cmpPath = cmpPathPref + _dir + ver + name + '.js?r=' + r
	        var cmpIdePath = cmpIdePathPref + name + '.js?r=' + r
	        cmpList.push(cmpPath);
	        cmpList.push(cmpIdePath);
	        xds.vmd.cmpList.map.put(name, item);
	    })
	    if (cmpList.length > 0) xds.vmd.cmpList.map.put('all', cmpList);
	},
    /*ide初始化*/
	init: function() {

		var me = this;
		var ux = xds.vmd.ux;

	    //模版配置文件的加载
		Ext.applyIf(xds.vmd.tplList, vmd.ideTpl);
		//读取组件的配置文件
		//this.isCheckFileExist(ux.cmpListPath, function(data) {
		this.readCmpList(ux.cmpListPath, function(data) {
			if(!data) {
				//加载模块
				me.initModule()
			} else {
				//记录组件列表
			    me.setCmpListMap(data);

				/*var loadjs = cmpList||[];
				var allcmploaded;
				$LAB
					.script(loadjs)
					.wait(function() { // 等待所有script加载完再执行这个代码块
						allcmploaded = true;
						//加载模块树
						xds.toolbox.loadUserTypes2();
						me.initModule()
					});
                  
				if (loadjs.length>0)
				    LazyLoad.js(loadjs, function () {
				        allcmploaded = true;
				        //加载模块树
				        xds.toolbox.loadUserTypes2();
				        me.initModule();
				    })
				else {
                    //无复合组件的模式
				    allcmploaded = true;
				    me.initModule();
				}
                 */
				me.initModule();

			    //工区配置信息获取
				vmd.getWorkSpaceServer(xds.vmd.params.workspaceId());

				//轮训检查防止空白页面出现
				/*var startTime = new Date().getTime();
				var runner = new Ext.util.TaskRunner();
				var myMask = new Ext.LoadMask(Ext.getBody(), {
					msg: "组件初始化中...",
					msgCls: 'z-index:10000;'
				});
				var taskRun = function() {

					var curTime = new Date().getTime();
					var diff = curTime - startTime;
					if(allcmploaded) {
						runner.stop(task); //停止任务
					} else {
						//console.log(diff);
						if(diff >= 1000) {
							// console.log(diff);
							myMask.show();
						}
						if(diff >= (task.duration - 1000)) {
							vmd.alert('警告', '复合组件文件缺失，请联系VMD开发人员，否则将影响模块正常运行！')
							me.initModule();
							runner.stop(task); //停止任务
						}

					}
				}
				var task = {
					run: taskRun,
					interval: 100,
					duration: 5000
				}

				runner.start(task);
                */
			}
		})

	},
	setDesigerMode: function() {
		var type = xds.vmd.params.type();
		designer.mode = type || 'module';
	},
	setDesignCode: function (codeStr) {
	    var arr = [];
	    var params = "vmd.workspace=" + Ext.encode(vmd.workspace);
	    arr.push(params);
	    arr.push(codeStr);
        return  arr.join('\n');
	},
	initModule: function() {
        
		var type = xds.vmd.params.type();
		var me = this;
		this.setDesigerMode();
		//根据模块参数打开对应模块
		if(type == 'ux') {
		    //隐藏资源选择功能，复合组件通过接口设置
		    Ext.fly('btn_res')&&Ext.fly('btn_res').remove();
			//  designer.mode = type;
			var uxpath = xds.vmd.params.path();

			if(!uxpath) {
				this.newUxCmp();
			} else {

				if(uxpath.indexOf(vmd.componentPath) == -1) {
					uxpath = vmd.componentPath + "vmd/" + uxpath;
				}
				this.isCheckFileExist(uxpath, function(data) {

				    //if (data) xds.project.loadVmdFile(uxpath);
				    if (data) me.loadVmdFile(uxpath);
					else me.newUxCmp();

				})

			}
		} else {

		    var tplpath = xds.vmd.params.tplPath();
		    var path = xds.vmd.params.path(),
                modulepath = tplpath || path;
		    if (tplpath) {
		        vmd.isCheckFileExist(path, function (data) {

		            if (!data) {
		                modulepath = tplpath;
		            } else modulepath = path;
		            me.loadVmdFile(modulepath);

		        }, true)

		    } else {
		        //xds.project.loadVmdFile(modulepath);
		        me.loadVmdFile(modulepath);
               
		    }
		    //设定当前模块类型
		    xds.vmd.setTplType(xds.vmd.params.tplType());
		}

		//根据name修改title标题
		var title = this.params.name() || document.title;
		document.title = title;

	},
	loadVmdFile:function(path,callback){
	    var me = this;
	    if (!vmd.vmdUploadPath) {
	        Ext.Msg.alert('出错', '请检查服务配置config.js')
	        return
	    }
	    //默认加载登录测试页面
	    var filename = path;
	    if (designer.mode == "ux") filename = path;
	    var myMask = new Ext.LoadMask(Ext.getBody(), {
	        msg: "模块加载中,请稍后...",
	        msgCls: 'z-index:10000;'
	    });
	    xds.vmd.loading = myMask;
	    var url = vmd.vmdUploadPath + 'FileService?FileName=' + filename;
	    //防止加载空页面报错
	    if (!filename) url = "templete/module.html";

	    myMask.show();
        //
	    xds.vmd.serializeStr="";
	    Ext.Ajax.request({
	        url: url,
	        timeout: 5000,
	        success: function (result) {
	            var res;
	            try {
	                res = Ext.util.JSON.decode(result.responseText);
	                if (res.errMsg && !xds.vmd.params.vmdMode()) {
	                    Ext.Msg.alert('加载失败', res.errMsg);
	                    //return
	                }
	            } catch (ex) {
	                res = {};
	            }

	            var vmd;
	            try {

	                xds.vmd.serializeStr = res.data;
	                // callback && callback();
                    
	                var loadjs = me.getDepUxs();
	                //优化：先按需加载复合组件
                    
	                if (loadjs.length>0)
	                LazyLoad.js(loadjs, function () {
	                    //加载模块树
	                    xds.toolbox.loadUserTypes2();

	                    xds.project.loadVmdFile();
	                })
	                else xds.project.loadVmdFile();

	                
	            } catch (ex) {
	                Ext.Msg.alert('反序列化失败', ex.message)
	            }

	            
	        },
	        failure: function (result) {
	            myMask.hide();
	            Ext.Msg.alert('加载失败', '错误' + result.status + '：' + result.statusText + "<p>" + "请检查数据服务是否启动!");
	        }

	    })
	},
	getDepUxs:function(){
	    var data = Ext.decode(xds.vmd.serializeStr);
	    var ux = xds.vmd.ux;
	    var cmpList = [];
	    var deps = [];
	    var cmpPathPref = '../' + ux.paths.cmp;
	    var cmpIdePathPref = '../' + ux.paths.ide;
	    var uxpref = designer.prefix.cmp;
	    var cmpMap = xds.vmd.cmpList.map;
	    var that = this;
        
	    var _loadPublicCmps = function () {
	        vmd.loadPublicCmps = vmd.loadPublicCmps || [];
	        //添加公共组件
	        vmd.loadPublicCmps.forEach(function (name) {
	            var cls = uxpref + name;
	            if (deps.indexOf(cls) == -1) {
	                that._getCmpPathByCls(cls, cmpList, deps);
	            }
	        })
	    }

	    var checkNode = function (nodes) {
        
	        Ext.each(nodes, function (node) {
	            var cmp = node;
	            var cls = cmp.cid;
	            if (cls.indexOf(uxpref) == 0 && deps.indexOf(cls) == -1) {
	                //构造带有版本号的路径
                    
	                try {
	                    /*cmpInfo=cmpMap.get(name);
	                    if (!cmpInfo) return false;
	                    var r = Math.random();
	                    ver = cmpInfo.version + '/';
	                    var _dir = name.toLowerCase() + '/';
	                    //var cmpPath = cmpPathPref  + name + '.js?r=' + r
	                    var cmpPath = cmpPathPref + _dir + ver + name + '.js?r=' + r;
	                    var cmpIdePath = cmpIdePathPref + name + '.js?r=' + r;
	                    deps.push(cls);
	                    cmpList.push(cmpPath);
	                    cmpList.push(cmpIdePath);*/
	                    that._getCmpPathByCls(cls, cmpList, deps);

	                } catch (ex) { }

	            }
	            checkNode(node.cn);
	        })
	    }


	    if (vmd.isLoadAllCmps) {
	        cmpList = cmpMap.get('all');
	    }

	    if (data) {
	        var page = Ext.decode(data.vmdlayout);
	        var dom = page.components[0];

	        if (!vmd.isLoadAllCmps) {
	             
	            checkNode(dom.cn);
	            _loadPublicCmps();

	        }

	    } else {
	        //空模版
	        if (!vmd.isLoadAllCmps) _loadPublicCmps();
	    }
        
	    return cmpList;

	    
	},

	_getCmpPathByCls: function (cls, cmpList, deps) {
	    

	    cmpList = cmpList || [];
	    deps = deps || [];
	    var ux = xds.vmd.ux;
	    var cmpPathPref = '../' + ux.paths.cmp;
	    var cmpIdePathPref = '../' + ux.paths.ide;
	    var uxpref = designer.prefix.cmp;
	    var cmpMap = xds.vmd.cmpList.map;
	    var name = cls.replace(uxpref, '')
	    cmpInfo = cmpMap.get(name);
	    if (!cmpInfo) return false;
	    var r = Math.random();
	    ver = cmpInfo.version + '/';
	    var _dir = name.toLowerCase() + '/';
	    //var cmpPath = cmpPathPref  + name + '.js?r=' + r
	    var cmpPath = cmpPathPref + _dir + ver + name + '.js?r=' + r;
	    var cmpIdePath = cmpIdePathPref + name + '.js?r=' + r;
	    deps.push(cls);
	    cmpList.push(cmpPath);
	    cmpList.push(cmpIdePath);
	},
	params: {

		id: function() {
		    return getUrlParam('id') || getUrlParam('uxid');
		},
		name: function() {
			return getUrlParam('name');
		},
		path: function() {
			var path = getUrlParam('path');

			if(path && path.indexOf('/modules') == 0) {
				if(path && path.indexOf('/modules') == 0) {
					path = path.replace('/modules', 'modules')
				}
			}
			return path;
		},
		tplPath: function() {
			return getUrlParam('tplPath') || getUrlParam('tplpath');
		},
		tplType: function() {
			return getUrlParam('tplType');
		},
		vmdMode: function() {
			return getUrlParam('vmdMode') || getUrlParam('vmdmode');
		},
		savePath: function() {
			var path = getUrlParam('savePath') || getUrlParam('savepath');

			if(path && path.indexOf('/modules') == 0) {
				if(path && path.indexOf('/modules') == 0) {
					path = path.replace('/modules', 'modules')
				}
			}
			return path;
		},
		debug: function() {
			return getUrlParam('debugger');
		},
		type: function() {
			return getUrlParam('type') || getUrlParam('Type');
		},
		ver: function() {
			return getUrlParam('ver') || '1.0';
		},
		workspaceId: function () {
		    return getUrlParam('workspaceid') || '';
		}

	},

	getRootNode: function(type) {
		var node
		switch(type) {
			case "dataset":
				node = xds.inspector.root.childNodes[1];
				break;
			case "variable":
				node = xds.inspector.root.childNodes[2];
				break;
			case "workflow":
				node = xds.inspector.root.childNodes[3];
				break;
		}
		return node;
	},
	getStoreNames: function() { //2017-12-29 (chengtao)添加  获取所有的数据集名称
		var names = [];
		var storeRoot = xds.vmd.getRootNode("dataset");
		storeRoot&&storeRoot.eachChild(function (n) {
			names.push(n.id);
		}, this);
		return names;
	},
	getVarNames: function() { //2017-12-29 (chengtao)添加  获取所有的数据集名称

		var names = [];
		var storeRoot = xds.vmd.getRootNode("variable");
		storeNode&&storeRoot.eachChild(function (n) {
			names.push(n.id);
		}, this);
		return names;
	},
	getStoreFieldNames: function(name) { //2017-12-29 (chengtao)添加  获取所有的数据集的字段名称
		var names = [];
		var storeRoot = xds.vmd.getRootNode("dataset");
		var storeNode = storeRoot.findChildBy(function() {
			return this.id == name;
		});
		storeNode&&storeNode.eachChild(function (c) {
			names.push(c.text);
		}, this);
		return names;
	},
	getMenuNames: function() { //20180504 成兵(chengbing)添加  获取所有的菜单名称

		var names = [];
		var storeRoot = xds.vmd.findAllByCid("vmdMenu");
		storeRoot&&storeRoot.forEach(function (n) {
			names.push(n.id);
		}, this);
		return names;
	},
	_addNode: function(cont) {
		cont = cont || {
			cid: 'vmdJsonStore',
			dataSource: '这是测试数据'
		};

		//如果id相同，则不添加(直接拖拽到布局上)
		if(xds.inspector.nodeHash[cont.id]) return

		var copy = Ext.apply({}, cont);
		if(!cont.userConfig) cont.userConfig = {};
		Ext.applyIf(cont.userConfig, copy)
		var cmp = xds.Registry.get(cont.cid);
		if(!cmp) return;
		var b = new cmp(cont);

		var targetCmp = xds.inspector.root.childNodes[0];
		xds.fireEvent("componentevent", {
			type: "new",
			parentId: targetCmp ? targetCmp.id : null,
			component: b,
			instacne: b
		});
	},
	_addNodeByParent: function(conf, parent) {
		if(typeof parent == "string") {
			parent = this.getTreeNodeById(parent);
		}
		//对于数据集、变量的特殊处理（它们不返回userconfig）
		if(!conf.userConfig) {
			var copy = Ext.apply({}, conf);
			if(!conf.userConfig) conf.userConfig = {};
			Ext.applyIf(conf.userConfig, copy);
		}

		xds.inspector.restore(conf, parent);
	},
	addNode: function(item, parent) {

		if(typeof item == "object") {
			Ext.each(item, function(obj) {
				if(parent)
					this._addNodeByParent(obj, parent);
				else
					this._addNode(obj);
			}, this)
		} else if(typeof item == "string") {
			this._addNode(item);
		}
	},
	deleteNodeById: function() {

	},
	deleteChildNodeById: function(id) {
		var parentNode = this.getTreeNodeById(id);
		var child = parentNode.childNodes;
		for(var i = child.length - 1; i >= 0; i--) {
			parentNode.removeChild(child[i]);
		}
	},
	getTreeNodeById: function(id) {
		return xds.inspector.nodeHash[id];

	},
	/*树节点可以重复通过name*/
	repeatRootTypes: function() {
	    return ['datafield', 'gridcolumn', 'booleancolumn', 'checkcolumn', 'numbercolumn', 'datecolumn', 'templatecolumn', 'vmdWorkFlowNodeVar', 'vmdWorkFlowNode']
	},
	/*控制工具箱分类是否显示*/
	isCategoryCollapse: function(name) {
		//默认节点
		var node = ['Grid', 'Toolbar'];
		if(node.indexOf(name) != -1) {
			return true;
		}
		return false;
	},
	newUxInterface: function() {
		var interfacevmd = xds.vmd.ux.data.interface;
		var newvmd = {
			"components": [{
				"cid": "vmduxprops"
			}, {
				"cid": "vmduxmethods"
			}, {
				"cid": "vmduxevents"
			}]
		};
		interfacevmd = interfacevmd || newvmd;

		var b = new xds.Project(interfacevmd);
		b.interfaceOpen();
	},
	newResource: function () {
	    var resvmd = xds.vmd.resource.data.res;
	    var newvmd = {
	        "components": [{
	            "cid": "vmdrescsss"
	        }, {
	            "cid": "vmdresjss"
	        }, {
	            "cid": "vmdresimgs"
	        }]
	    };
	    resvmd = resvmd || newvmd;

	    var b = new xds.Project(resvmd);
	    b.resourceOpen();
	},
	//新建复合组件
	_newUxCmp: function() {
		//当前设计模式为复合组件开发
		designer.mode = "ux";
		xds.vmd.clear();

		//弹窗设置

		var name = xds.vmd.params.path() || '';
		name = name.replace('.vmd', '') || 'MyPanel';
		var me = this;
		xds.project.close(function() {
			//var content = {
			//    "components": [{ "cid": "uxpanel", "id":name, "layoutConfig": {}, "userConfig": { "layout": "absolute", "header": false,"width":600,"height":350} }
			//    , { "cid": "vmduxprops" }, { "cid": "vmduxmethods" }, { "cid": "vmduxevents" }
			//    ]
			//};
			xds.vmd.ux.data.view = {
				"components": [{
					"cid": "uxpanel",
					"id": name,
					"layoutConfig": {},
					"userConfig": {
						"layout": "absolute",
						"header": false,
						"width": 600,
						"height": 350
					}
				}]
			};

			//自定义对外属性、方法、事件

			var a = new xds.Project(xds.vmd.ux.data.view);
			a.open();
			//接口树 加载

			me.newUxInterface();
		})
	},
	newUxCmp: function () {
	    var me = this;
	    var loadjs = me.getDepUxs();
	    //优化：先按需加载复合组件
	    if (loadjs.length > 0)
	        LazyLoad.js(loadjs, function () {
	            //加载模块树
	            xds.toolbox.loadUserTypes2();
	            me._newUxCmp();
	        })
	    else me._newUxCmp();
	},
	getDisabledContextMenu: function() {
		//return ['viewport', 'vmddataset', 'vmdvariable', 'uxpanel'];
	    return ['viewport', 'uxpanel', 'vmdrescsss', 'vmdresjss', 'vmdresimgs'];

	},
	isDisabledContextMenu: function(cid) {
		var disabledMenu = this.getDisabledContextMenu();
		if(disabledMenu.indexOf(cid) != -1) return true;
		return false;
	},
	isOnlyNewActionMenu: function(cid) {
		var menu = ['vmduxprops', 'vmduxmethods', 'vmduxevents'];
		if(menu.indexOf(cid) != -1) return true;
		return false;
	},
	varAndDatasetMenu: function(cid) {
		var menu = ['vmddataset', 'vmdvariable', 'vmduxevents'];
		if(menu.indexOf(cid) != -1) return true;
		return false;
	},
	getToolbarHideCategory: function() {

		if(xds.vmd.params.type() == 'ux') return ['变量', '数据集', '工作流'];

		return null
	},

	isCheckFileExist: function(path, callback) {
		var url = vmd.vmdUploadPath + 'FileService?FileName=' + path;
		Ext.Ajax.request({
			type: 'get',
			url: url,
			success: function(result) {

				var data = Ext.decode(result.responseText);
				if(data.errMsg) {
					console.log(data.errMsg)
					// Ext.Msg.alert('提示', data.errMsg);
					// return;
				}
				data = Ext.decode(data.data);

				callback && callback(data)

			},
			failure: function(result) {

				Ext.Msg.alert('加载失败', '错误' + result.status + '：' + result.statusText)

			}
		})
	},
	readCmpList: function (path, callback) {
	    var url = bootPATH + vmdSettings.componentPath + "list.js";
	    vmd.getJSON(url, { random: Math.random() }, function (data) {
	        
	        callback && callback(data)
	    })
	    
	},
	isCheckUxhasSelf: function() {
		var root = xds.inspector.root.firstChild;
		var isHasSelf = false;
		if(designer.mode != "ux") return isHasSelf;
		var uxName = designer.prefix.cmp + xds.vmd.params.path().replace('.vmd', '');
		var checkNode = function(nodes) {

			Ext.each(nodes, function(node) {
				var cmp = node.component;
				if(cmp.cid == uxName) {
					isHasSelf = true;
					return false
				}
				checkNode(node.childNodes)
			})
			//return isHasSelf;

		}
		checkNode(root.childNodes);
		return isHasSelf
	},
	getCmpDeps: function() {
		var root = xds.inspector.root.firstChild;
		var deps = [];
		var checkNode = function(nodes) {

			Ext.each(nodes, function(node) {
				var cmp = node.component;
				if(cmp.cid.indexOf(designer.prefix.cmp) != -1 && deps.indexOf(cmp.cid) == -1) {
					//构造带有版本号的路径
					var cls = cmp.cid,
						_cls;
					try {
						_cls = eval(cls);
						var ver = _cls.prototype.version || '1.0';
						//格式vmd.ux.rqjd$1.0$Rqjd
						cls = cls + '$' + ver + '$' + cls.replace(designer.prefix.cmp, '');

					} catch(ex) {}

					deps.push(cls)
				}
				checkNode(node.childNodes)
			})
		}
		checkNode(root.childNodes);
		deps=vmd.unique(deps);
		return Ext.encode(deps);

	},
	//判断是否复合组件模式
	isUx: function() {
		var mode = designer.mode;
		if(mode == 'ux') {
			return true;
		}
		return false;
	},
	getUxPropNode: function() {
		return xds.interface.root.childNodes[0];
	},
	getUxMethodNode: function() {
		return xds.interface.root.childNodes[1];
	},
	getUxEventNode: function() {
		return xds.interface.root.childNodes[2];
	},
	addPropGroupNodes: function(data) {
		var node = this.getUxPropNode();
		if(!node) return;
		this._addNodes(data, node, 'uxpropgroup', true);
	},
	addPropNodes: function(data) {
		var node = this.getUxPropNode();
		if(!node) return;
		//var createConf = function (obj) {
		//    var newObj = { cid: 'uxprop', id: obj.id, userConfig: {} };
		//    //delete obj.cid;
		//   // delete obj.id;
		//    Ext.apply(newObj.userConfig, obj);
		//    return newObj;
		//}

		//node.removeAll();
		//Ext.each(conf, function (item) {
		//    item = createConf(item);
		//    xds.interface.restore(item, node);
		//})
		//node.expand()
		var newData = [];
		var me = this;
		me._group = {}
		Ext.each(data, function(item) {
			if(item.group) {
				//var _data = { id: item.group, cid: 'uxpropgroup' };
				if(!me._group[item.group]) {
					me._group[item.group] = {
						id: item.group,
						cid: 'uxpropgroup',
						cn: []
					};
					newData.push(me._group[item.group]);
				}
				me._group[item.group].cn.push(item);

			} else {
				newData.push(item);
			}
		})
		this._addNodes(newData, node, 'uxprop');

	},
	addMethodNodes: function(data) {
		var node = this.getUxMethodNode();
		if(!node) return;

		this._addNodes(data, node, 'uxmethod');

	},
	addEventNodes: function(data) {
		var node = this.getUxEventNode();
		if(!node) return;

		this._addNodes(data, node, 'uxevent');

	},
	_addNodes: function(data, node, cid, isNoRemoveAll) {

		var createConf = function(obj) {
			var newObj = {
				cid: obj.cid || cid,
				id: obj.id,
				userConfig: {}
			};
			//delete obj.cid;
			// delete obj.id;
			Ext.apply(newObj.userConfig, obj);
			if(obj.cn) {
				newObj.cn = [];
				Ext.each(obj.cn, function(item) {
					item = createConf(item);
					newObj.cn.push(item);
				})
				delete newObj.userConfig.cn
			}

			return newObj;
		}
		if(!isNoRemoveAll) node.removeAll();

		Ext.each(data, function(item) {
			// node.leaf = false
			item = createConf(item);
			xds.interface.restore(item, node);
		})

		node.expand()

	},
	getPropsData: function() {
		var data = []
		var node = this.getUxPropNode()
		if(!node) return data;
		//var _data = node.component.getInternals(true);
		//if (_data.cn) {
		//    var tempData = Ext.decode(Ext.encode(_data.cn));
		//    Ext.each(tempData, function (item) {
		//        var obj = {};
		//        obj.id = item.id;
		//        Ext.apply(obj, item.userConfig)
		//        data.push(obj);
		//    })
		//}
		data = this._getData2(node);

		return data;

	},
	getMethodsData: function() {

		var data = []
		var node = this.getUxMethodNode();
		if(!node) return data;
		data = this._getData(node);

		return data;
	},
	getEventsData: function() {

		var data = []
		var node = this.getUxEventNode();
		if(!node) return data;
		data = this._getData(node);

		return data;
	},
	_getData: function(node) {
		var data = [];
		var _data = node.component.getInternals(true);
		if(_data.cn) {
			var tempData = Ext.decode(Ext.encode(_data.cn));
			Ext.each(tempData, function(item) {
				var obj = {};
				obj.id = item.id;
				Ext.apply(obj, item.userConfig)
				data.push(obj);
			})
		}
		return data;

	},
	_getData2: function(node) {
		var data = [];
		var _data = node.component.getInternals(true);
		if(_data.cn) {
			var tempData = Ext.decode(Ext.encode(_data.cn));
			var di = function(nodes, scope) {
				Ext.each(nodes, function(item) {

					if(item.cn) di(item.cn, item);
					else if(item.cid == 'uxprop') {
						var obj = {};
						obj.id = item.id;

						Ext.apply(obj, item.userConfig)
						if(scope) obj.group = scope.id;
						else delete obj.group
						data.push(obj);
					}
				})
			}
			di(tempData);

		}
		return data;

	},
	getConfigByName: function(cid, name) {
		var obj = {};
		var d = xds.Registry.get(cid);
		if(!cid) return obj;
		var configs = d.configs.items;

		Ext.each(configs, function(item) {
			if(item.name == name) {
				obj = item;
				return false;
			}
		})

		return obj;

	},
	getAllCmpsByNode: function(node, nodeList) {
		nodeList = nodeList || [];
		var me = this;
		Ext.each(node.childNodes, function(item) {
			var obj = {
				cmpId: item.id
			};
			nodeList.push(obj);
			me.getAllCmpsByNode(item, nodeList);
		})
	},
	getServMap:function(){
	    var list = this.resource.serverList;
	    var map = {};
	    list.forEach(function (item,index) {
	        // map[item.name] = item;
	        var serverList = item.children;
	        if (serverList) {
	            serverList.forEach(function (_item) {
	                map[item.name+"&&"+_item.name] = _item;
	            })
	        }
	    })
	    return map;
	},
	getServList:function(){
	    var map = this.getServMap();
	    var arr = [];
	    for (var key in map) {
	        arr.push(key);
	    }
	    return arr;
	},
	getVirtualPathByServName:function(name){
	    var map = this.getServMap();
	    var serInfo=map[name];
	    if (!serInfo) return "";
	    return this._getVirtualPath(map[name].address,map[name].virtualPath);
	},
	_getResDataByCategory: function (data, isAddVer, isWithVar) {
	    var arr = [];
	    var that = this;
	    var cache = true;
	    data&&data.forEach(function (item, index) {
	        var servName = item.servName;
            if (!servName) return false;
	        var virtualPath = that.getVirtualPathByServName(servName);
	        var path = item.path;
	        var realPath = virtualPath + "/" + path + (cache ? "?rad=" + time() : "");
	        if (isAddVer) {
	            realPath = virtualPath + "/" + path + ("?v=" + vmd.vmdVersion);
	        }
	        if (isWithVar) {
                realPath = "{" + servName + "}" + "/" + path + ("?v=" + vmd.vmdVersion);
	        }
	        arr.push(realPath);
	    })
	    return arr;
	},
	getJsFiles: function (isAddVer, isWithVar) {
	    var arr = [];
	    if(!xds.resource) return null;
	    var jsData = xds.resource.getJsData();
	    
	    arr = this._getResDataByCategory(jsData, isAddVer, isWithVar);
	    if (arr.length == 0) return null;
	    return arr;
	},
	getCssFiles: function (isAddVer,isWithVar) {
	    var arr = [];
	    if (!xds.resource) return arr;
	    var cssData = xds.resource.getCssData();
	    
	    arr = this._getResDataByCategory(cssData, isAddVer, isWithVar);
	    return arr;
	},
	_getVirtualPath :function (ip,path) {
	    return "http://"+ ip + "/" + path + "/";
	}

};
xds.types = {};
xds.configs = {};
xds.addEvents("init", "newcomponent");
xds.create = function(b) {
	var a = xds.Registry.get(b.cid);

	try {
		return new a(b)
	} catch(ex) {
		Ext.Msg.alert('错误', '设计时组件：' + b.cid + ' 未定义!');
		xds.vmd.loading.hide()
	}
};
xds.copy = function(e) {
	var d = {};
	if(!e) {
		return d
	}
	var c, b;
	for(var a in e) {
		c = typeof e[a];
		b = e[a];
		if(c === "object") {
			if(Ext.isArray(b)) {
				d[a] = b.slice(0)
			} else {
				d[a] = xds.copy(b)
			}
		} else {
			if(c !== "function") {
				d[a] = b
			}
		}
	}
	return d
};
xds.initConfigs = function(c, e) {
	var d = e[c];
	e[c] = new Ext.util.MixedCollection(false, function(g) {
		return g.name
	});
	if(d) {
		for(var b = 0, a = d.length; b < a; b++) {
			e[c].add(new xds.Config.types[d[b].ctype](d[b]))
		}
	}
};
if(!Array.prototype.contains) {
	Array.prototype.contains = function(a) {
		return this.indexOf(a) !== -1
	}
}(function() {
	var c = Ext.Component.prototype.afterRender;
	var a = null;
	Ext.Component.override({
		filmCls: "",
		infoCls: "",
		afterRender: function() {
			c.apply(this, arguments);
			if(this.viewerNode) {
				this.createFilm();
				this.initDesigner()
			}
		},
		createFilm: function() {
			if(!a) {
				a = Ext.getCmp("canvas")
			}
			if(a && a.el && a.el.contains(this.el)) {
				var d = this.viewerNode;
				var id = "film-for-" + d.id;
				var film = Ext.fly(id);
				if(film) film.remove()
				this.film = a.body.createChild({
					cls: "el-film x-unselectable " + d.component.filmCls,
					id: id,
					style: "z-index: " + (50000 + (d.getDepth() * 100)),
					cn: [{
						tag: "b",
						cls: d.component.flyoutCls
					}, {
						tag: "i",
						html: d.component.dock || d.text
					}]
				});
				//else this.film = film;
				this.film.enableDisplayMode();
				this.syncFilm();
				this.on("resize", this.syncFilm, this);
				this.on("destroy", this.destroyDesigner, this)
			}
		},
		onFilmClick: function() {
			xds.fireEvent("componentclick", {
				component: this.viewerNode.attributes.config,
				node: this.viewerNode
			})
		},
		syncFilm: function() {
			var e;
			if(this.film && (e = this.getFilmEl())) {
				var d = e.getRegion();
				//mafei 20180327
				var dd = this.viewerNode;
				var cid = dd.component.cid;
				var regCmp = cid && xds.Registry.all.get(cid);
				var isContainer = regCmp && regCmp.prototype.isContainer;
				if(dd.getDepth() > 2 && isContainer) {
					d.bottom -= 3;
					d.right -= 3;
				}
				this.film.setRegion(d);
				this.film.lastRegion = d
			}
		},
		getFilmEl: function() {
			var d = this.getPositionEl();
			if(this.fieldLabel) {
				return this.el.up(".x-form-item") || d
			}
			return d
		},
		destroyDesigner: function() {
			this.film && this.film.remove()
		},
		createFloater: function(g, e, d) {
			this.film.createChild({
				cls: "xds-floater",
				cn: {
					cls: "xds-floater-left",
					cn: {
						cls: "xds-floater-right",
						cn: {
							cls: "xds-floater-center xds-child-target x-unselectable",
							id: "chld-for-" + g,
							cn: [{
								tag: "img",
								src: Ext.BLANK_IMAGE_URL,
								unselectable: "on",
								cls: d
							}, {
								tag: "span",
								unselectable: "on",
								html: e
							}]
						}
					}
				}
			})
		},
		initDesigner: function() {}
	});
	var b = Ext.form.Field.prototype.initEvents;
	Ext.form.Field.prototype.initEvents = function() {
		b.apply(this, arguments);
		if(this.bindTo) {
			var d = this.bindTo;
			var e = d.component.getConfigObject(d.name);
			var g = e.getValue(d.component);
			if(g === undefined) {
				g = d.defaultValue || e.defaultValue
			}
			this.setValue(d.get ? d.get(this) : g);
			this.on(d.event || "change", d.set ||
				function() {
					var h = this.getValue();
					if(h === d.clear) {
						h = undefined
					}
					e.setValue(d.component, h);
					if(xds.active.component == d.component) {
						xds.props.setValue(d.name, h)
					}
				})
		}
	}
})();
Ext.tree.TreeNode.prototype.setNodeId = function(c) {
	var b = this;
	this.id = c;
	this.attributes.id = c;
	if(this.component) {
		this.component.id = c
	}
	var a = this.getOwnerTree();
	if(a) {
		delete a.nodeHash[b];
		a.nodeHash[c] = this
	}
};
(function() {
	var a = Ext.lib.Event;
	var b = a.addListener;
	a.suspend = function() {
		a.addListener = a.on = Ext.emptyFn
	};
	a.resume = function() {
		a.addListener = a.on = b
	}
})();
Ext.menu.Menu2 = Ext.extend(Ext.Container, {
	minWidth: 120,
	shadow: "sides",
	subMenuAlign: "tl-tr?",
	defaultAlign: "tl-bl?",
	allowOtherMenus: false,
	hidden: true,
	constructor: function(a) {
		if(Ext.isArray(a)) {
			a = {
				items: a
			}
		}
		Ext.apply(this, a);
		this.addEvents("beforeshow", "beforehide", "show", "hide", "click", "mouseover", "mouseout", "itemclick");
		Ext.menu.MenuMgr.register(this);
		Ext.menu.Menu.superclass.constructor.call(this)
	},
	onRender: function(b, a) {
		if(!b) {
			b = Ext.getBody()
		}
		this.el = new Ext.Layer({
			shadow: this.shadow,
			dh: {
				id: this.getId(),
				cls: "x-menu x-layer " + (this.cls ? (this.cls + "") : "") + (this.plain ? " x-menu-plain" : ""),
				cn: [{
					tag: "a",
					cls: "x-menu-focus",
					href: "#",
					onclick: "return false;",
					tabIndex: "-1"
				}, {
					tag: "ul",
					cls: "x-menu-list"
				}]
			},
			constrain: false,
			parentEl: b,
			zindex: this.zIndex || 15000
		});
		this.setLayout(new Ext.layout.ContainerLayout({
			renderItem: this.renderItem
		}));
		Ext.menu.Menu.superclass.onRender.apply(this, arguments);
		if(!this.keyNav) {
			this.keyNav = new Ext.menu.MenuNav(this)
		}
		this.focusEl = this.el.child("a.x-menu-focus");
		this.ul = this.el.child("ul.x-menu-list");
		this.ul.on("click", this.onClick, this);
		this.ul.on("mouseover", this.onMouseOver, this);
		this.ul.on("mouseout", this.onMouseOut, this)
	},
	getLayoutTarget: function() {
		return this.ul
	},
	renderItem: function(g, b, e) {
		if(g && !g.rendered) {
			var a = document.createElement("li");
			a.className = "x-menu-list-item";
			g.render(a, this.container);
			if(typeof b == "number") {
				b = e.dom.childNodes[b]
			}
			e.dom.insertBefore(a, b || null);
			if(this.extraCls) {
				var d = g.getPositionEl ? g.getPositionEl() : g;
				d.addClass(this.extraCls)
			}
		} else {
			if(g && !this.isValidParent(g, e)) {
				if(this.extraCls) {
					g.addClass(this.extraCls)
				}
				if(typeof b == "number") {
					b = e.dom.childNodes[b]
				}
				e.dom.insertBefore(g.getActionEl().dom, b || null)
			}
		}
	},
	autoWidth: function() {
		var d = this.el,
			c = this.ul;
		if(!d) {
			return
		}
		var a = this.width;
		if(a) {
			d.setWidth(a)
		} else {
			if(Ext.isIE) {
				d.setWidth(this.minWidth);
				var b = d.dom.offsetWidth;
				d.setWidth(c.getWidth() + d.getFrameWidth("lr"))
			}
		}
	},
	delayAutoWidth: function() {
		if(this.el) {
			if(!this.awTask) {
				this.awTask = new Ext.util.DelayedTask(this.autoWidth, this)
			}
			this.awTask.delay(20)
		}
	},
	findTargetItem: function(b) {
		var a = b.getTarget(".x-menu-list-item", this.ul, true);
		if(a && a.menuItemId) {
			return this.items.get(a.menuItemId)
		}
	},
	onClick: function(b) {
		var a;
		if(a = this.findTargetItem(b)) {
			a.onClick(b);
			this.fireEvent("click", this, a, b)
		}
	},
	setActiveItem: function(a, b) {
		if(a != this.activeItem) {
			if(this.activeItem) {
				this.activeItem.deactivate()
			}
			this.activeItem = a;
			a.activate(b)
		} else {
			if(b) {
				a.expandMenu()
			}
		}
	},
	tryActivate: function(g, e) {
		var b = this.items;
		for(var c = g, a = b.length; c >= 0 && c < a; c += e) {
			var d = b.get(c);
			if(!d.disabled && d.canActivate) {
				this.setActiveItem(d, false);
				return d
			}
		}
		return false
	},
	onMouseOver: function(b) {
		var a;
		if(a = this.findTargetItem(b)) {
			if(a.canActivate && !a.disabled) {
				this.setActiveItem(a, true)
			}
		}
		this.fireEvent("mouseover", this, b, a)
	},
	onMouseOut: function(b) {
		var a;
		if(a = this.findTargetItem(b)) {
			if(a == this.activeItem && a.shouldDeactivate(b)) {
				this.activeItem.deactivate();
				delete this.activeItem
			}
		}
		this.fireEvent("mouseout", this, b, a)
	},
	show: function(b, c, a) {
		this.parentMenu = a;
		if(!this.el) {
			this.render()
		}
		this.fireEvent("beforeshow", this);
		this.showAt(this.el.getAlignToXY(b, c || this.defaultAlign), a, false)
	},
	showAt: function(c, b, a) {
		this.parentMenu = b;
		if(!this.el) {
			this.render()
		}
		if(a !== false) {
			this.fireEvent("beforeshow", this);
			c = this.el.adjustForConstraints(c)
		}
		this.el.setXY(c);
		this.el.show();
		this.hidden = false;
		this.focus();
		this.fireEvent("show", this)
	},
	focus: function() {
		if(!this.hidden) {
			this.doFocus.defer(50, this)
		}
	},
	doFocus: function() {
		if(!this.hidden) {
			this.focusEl.focus()
		}
	},
	hide: function(a) {
		if(this.el && this.isVisible()) {
			this.fireEvent("beforehide", this);
			if(this.activeItem) {
				this.activeItem.deactivate();
				this.activeItem = null
			}
			this.el.hide();
			this.hidden = true;
			this.fireEvent("hide", this)
		}
		if(a === true && this.parentMenu) {
			this.parentMenu.hide(true)
		}
	},
	add: function() {
		var c = arguments,
			b = c.length,
			g;
		for(var d = 0; d < b; d++) {
			var e = c[d];
			if(e.render) {
				g = this.addItem(e)
			} else {
				if(typeof e == "string") {
					if(e == "separator" || e == "-") {
						g = this.addSeparator()
					} else {
						g = this.addText(e)
					}
				} else {
					if(e.tagName || e.el) {
						g = this.addElement(e)
					} else {
						if(typeof e == "object") {
							Ext.applyIf(e, this.defaults);
							g = this.addMenuItem(e)
						}
					}
				}
			}
		}
		return g
	},
	getEl: function() {
		if(!this.el) {
			this.render()
		}
		return this.el
	},
	addSeparator: function() {
		return this.addItem(new Ext.menu.Separator())
	},
	addElement: function(a) {
		return this.addItem(new Ext.menu.BaseItem(a))
	},
	addItem: function(a) {
		Ext.menu.Menu.superclass.add.call(this, a);
		if(this.rendered) {
			this.doLayout()
		}
		return a
	},
	addMenuItem: function(a) {
		if(!(a instanceof Ext.menu.Item)) {
			if(typeof a.checked == "boolean") {
				a = new Ext.menu.CheckItem(a)
			} else {
				a = new Ext.menu.Item(a)
			}
		}
		return this.addItem(a)
	},
	addText: function(a) {
		return this.addItem(new Ext.menu.TextItem(a))
	},
	insert: function(a, b) {
		Ext.menu.Menu.superclass.insert.apply(this, arguments);
		if(this.rendered) {
			this.doLayout()
		}
		return b
	},
	remove: function(a) {
		Ext.menu.Menu.superclass.remove.call(this, a, true);
		if(this.rendered) {
			this.doLayout()
		}
	},
	removeAll: function() {
		if(this.items) {
			var a;
			while(a = this.items.first()) {
				this.remove(a)
			}
		}
	},
	onDestroy: function() {
		Ext.menu.Menu.superclass.onDestroy.apply(this, arguments);
		Ext.menu.MenuMgr.unregister(this);
		if(this.keyNav) {
			this.keyNav.disable()
		}
		if(this.ul) {
			this.ul.removeAllListeners()
		}
	}
});
Ext.menu.MenuNav2 = function(a) {
	Ext.menu.MenuNav.superclass.constructor.call(this, a.el);
	this.scope = this.menu = a
};
Ext.extend(Ext.menu.MenuNav2, Ext.KeyNav, {
	doRelay: function(c, b) {
		var a = c.getKey();
		if(!this.menu.activeItem && c.isNavKeyPress() && a != c.SPACE && a != c.RETURN) {
			this.menu.tryActivate(0, 1);
			return false
		}
		return b.call(this.scope || this, c, this.menu)
	},
	up: function(b, a) {
		if(!a.tryActivate(a.items.indexOf(a.activeItem) - 1, -1)) {
			a.tryActivate(a.items.length - 1, -1)
		}
	},
	down: function(b, a) {
		if(!a.tryActivate(a.items.indexOf(a.activeItem) + 1, 1)) {
			a.tryActivate(0, 1)
		}
	},
	right: function(b, a) {
		if(a.activeItem) {
			a.activeItem.expandMenu(true)
		}
	},
	left: function(b, a) {
		a.hide();
		if(a.parentMenu && a.parentMenu.activeItem) {
			a.parentMenu.activeItem.activate()
		}
	},
	enter: function(b, a) {
		if(a.activeItem) {
			b.stopPropagation();
			a.activeItem.onClick(b);
			a.fireEvent("click", this, a.activeItem);
			return true
		}
	}
});
Ext.grid.GridView.override({
	focusCell: function(c, a, b) {
		this.syncFocusEl(this.ensureVisible(c, a, b));
		if(Ext.isGecko) {
			this.focusEl.focus()
		} else {
			this.focusEl.focus.defer(1, this.focusEl)
		}
	},
	resolveCell: function(e, c, d) {
		if(typeof e != "number") {
			e = e.rowIndex
		}
		if(!this.ds) {
			return null
		}
		if(e < 0 || e >= this.ds.getCount()) {
			return null
		}
		c = (c !== undefined ? c : 0);
		var b = this.getRow(e),
			a;
		if(!(d === false && c === 0)) {
			while(this.cm.isHidden(c)) {
				c++
			}
			a = this.getCell(e, c)
		}
		return {
			row: b,
			cell: a
		}
	},
	getResolvedXY: function(a) {
		if(!a) {
			return null
		}
		var b = this.scroller.dom,
			e = a.cell,
			d = a.row;
		return e ? Ext.fly(e).getXY() : [b.scrollLeft + this.el.getX(), Ext.fly(d).getY()]
	},
	syncFocusEl: function(d, a, c) {
		var b = d;
		if(!Ext.isArray(b)) {
			d = Math.min(d, Math.max(0, this.getRows().length - 1));
			b = this.getResolvedXY(this.resolveCell(d, a, c))
		}
		this.focusEl.setXY(b || this.scroller.getXY())
	},
	ensureVisible: function(u, g, e) {
		var s = this.resolveCell(u, g, e);
		if(!s || !s.row) {
			return
		}
		var l = s.row,
			h = s.cell;
		var o = this.scroller.dom;
		var t = 0;
		var d = l,
			q = this.el.dom;
		while(d && d != q) {
			t += d.offsetTop;
			d = d.offsetParent
		}
		t -= this.mainHd.dom.offsetHeight;
		var r = t + l.offsetHeight;
		var a = o.clientHeight;
		var q = parseInt(o.scrollTop, 10);
		var n = q + a;
		if(t < q) {
			o.scrollTop = t
		} else {
			if(r > n) {
				o.scrollTop = r - a
			}
		}
		if(e !== false) {
			var m = parseInt(h.offsetLeft, 10);
			var k = m + h.offsetWidth;
			var i = parseInt(o.scrollLeft, 10);
			var b = i + o.clientWidth;
			if(m < i) {
				o.scrollLeft = m
			} else {
				if(k > b) {
					o.scrollLeft = k - o.clientWidth
				}
			}
		}
		return this.getResolvedXY(s)
	}
});

//begin  (chengtao) 2018-01-09 添加 扩展容器组件 实现容器内组件的数据绑定功能
Ext.override(Ext.Container, {
	editing: false,
	bindDataStore: function(store, index) {
		this.bindStore = store;
		if(this.bindStore) {
			if(this.bindStore !== store && this.bindStore.autoDestroy) {
				this.bindStore.destroy();
			} else {
				this.bindStore.un("remove", this.onStoreRemove, this);
				this.bindStore.un("update", this.onStoreUpdate, this);
				this.bindStore.un("clear", this.onStoreClear, this);
			}
			if(!store) {
				this.bindStore = null;
			}
		}
		if(store) {
			this.bindStore = store;
			this.bindIndex = index;
			this.bindRecordId = undefined;

			//数据处理
			var values = {};
			if(this.bindIndex) {
				var record = this.bindStore.getAt(this.bindIndex);
				Ext.copyTo(values, record.data);
				this.bindRecordId = record.id;
			} else {
				var count = this.bindStore.getCount();
				for(var i = 0; i < count; i++) {
					var r = this.bindStore.getAt(i); //遍历每一行
					values[r.id] = r.get("value");
				}
			}
			this.setCompValues(values);

			this.bindStore.on({
				scope: this,
				remove: this.onStoreRemove,
				update: this.onStoreUpdate,
				clear: this.onStoreClear
			});
		}
		return this;
	},
	setCompValues: function(values) {
		this.bindValues = values;
		var field, id;
		var me = this;
		for(id in values) {
			if(!Ext.isFunction(values[id]) && (field = this.findById(id))) {
				field.setValue(values[id]);
				field.originalValue = field.getValue();
				if(!field.hasListener("change")) {
					field.on("change", function(a, b, c) {
						if(typeof a == 'object') {
							this.onValueChange(a.id, b);
						} else {
							this.onValueChange(a, b);
						}
					}, this);
				}
				if(!field.hasListener("check")) {
					field.on("check", function(a, b, c) {
						if(typeof a == 'object') {
							this.onValueChange(a.id, b);
						} else {
							this.onValueChange(a, b);
						}
					}, this);
				}
				if(!field.hasListener("select")) {
					field.on("select", function(a, b, c) {
						if(typeof a == 'object') {
							this.onValueChange(a.id, a.getValue());
						} else {
							this.onValueChange(a, b);
						}
					}, this);
				}

				field.addHighLightClass && field.addHighLightClass(field, me.component.propStore.store, id)
			}
		}
		return this;
	},
	onStoreUpdate: function(ds, record, e) {
		if(this.editing && e != Ext.data.Record.REJECT && record == this.dataRecord) { //2018-01-25
			return;
		}
		if(this.bindValues) {
			{
				var values = {};
				if(this.bindRecordId) {
					if(record.id == this.bindRecordId) {
						Ext.copyTo(values, record.data);
					} else {
						return;
					}
				} else {
					values[record.id] = record.get("value");
				}
				this.setCompValues(values);
			}
		}
	},
	onStoreClear: function(ds, records, index) {
		return
		if(this.editing) {
			return;
		}
		if(this.bindValues) {
			var values = {};
			for(var id in this.bindValues) {
				values[id] = null;
			}
			this.setCompValues(values);
		}
	},
	onStoreRemove: function(store, record, index) {
		return
		if(this.editing) {
			return;
		}
		if(this.bindValues) {
			{
				var values = {};
				if(this.bindRecordId) {
					if(record.id == this.bindRecordId) {
						for(var id in this.bindValues) {
							values[id] = null;
						}
					}
				} else {

					values[record.id] = null;
				}
				this.setCompValues(values);
			}
		}
	},
	onValueChange: function(id, value) {
		if(this.bindValues) {
			{
				if(this.bindIndex) {
					var record = this.bindStore.getById(this.bindRecordId);
					this.editing = true;
					record.set(id, value);
					this.editing = false;
					this.bindValues[id] = value;
				} else {
					var record = this.bindStore.getById(id);
					this.editing = true;
					record.set("value", value);
					this.editing = false;
					this.bindValues[id] = value;
				}
			}
		}
	}
});
//重写FormPanel的findById方法,可以查找到内部组件
Ext.override(Ext.form.FormPanel, {
	findById: function(id) {
		return this.getForm().findField(id);
	}
});
//end
//begin  (chengtao) 2018-01-09 添加 定义属性容器,类,实现属性面板的显示Ext.form.FormPanel
xds.PropPanel = Ext.extend(Ext.Container, {
	enableColumnMove: false,
	stripeRows: false,
	trackMouseOver: false,
	enableHdMenu: true,
	baseCls: "x-plain",
	cacheSizes: false,
	border: false,
	layout: "fit",
	constructor: function(a) {
		this.propStore = a;
		xds.PropPanel.superclass.constructor.call(this);
	},
	initComponent: function() {
		xds.PropPanel.superclass.initComponent.call(this);
	},
	setComponent: function(a, b) {
		//要加载样式
		Ext.util.CSS.removeStyleSheet("vmdcss")
		Ext.util.CSS.createStyleSheet(xds.vmd.css, "vmdcss")
		this.component = a;
		this.removeAll();
		this.add(b);
		this.doLayout();
	},
	clear: function() {
		delete this.component;
	},
	onRender: function() {
		xds.PropPanel.superclass.onRender.apply(this, arguments);
	},
	expand: function() {

	},
	collapse: function() {

	}
});
//end

/*
 * Ext GUI Designer Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com This
 * product is NOT licensed for production use.
 */
//begin  (chengtao) 2018-01-04  调整
xds.PropertyRecord = Ext.data.Record.create([{
	name: "name",
	type: "string"
}, "value", "group"]);
//组件属性store
xds.PropertyStore = function() {
	this.store = new Ext.data.GroupingStore({
		recordType: xds.PropertyRecord,
		groupField: "group"
	});
	this.store.on("update", this.onUpdate, this);
	xds.PropertyStore.superclass.constructor.call(this)
};
Ext.extend(xds.PropertyStore, Ext.util.Observable, {
	showCommon: true,
	getConfigByType: function(b, a) {
		if(b == "Common") {
			return this.component.getConfigObject(a)
		}
		var c = this.component["get" + b + "Configs"]();
		return c.map[a]
	},
	getConfig: function(a) {
		if(a.configType) {
			return this.getConfigByType(a.configType, a.data.name)
		}
		return this.component.getConfigObject(a.data.name)
	},
	getConfigAt: function(a) {

		return this.getConfig(this.store.getAt(a))
	},
	setComponent: function(p, d) {
		this.component = p;
		this.store.removeAll();
		this.store.loadRecords({
			records: d
		}, {}, true);

	},
	onUpdate: function(f, a, e) {
		if(e == Ext.data.Record.EDIT) {
			var b = a.data.value;
			var c = a.modified.value;

			if(a.data.name == "id" && (xds.inspector.nodeHash[b] || b == 'name' || /^[0-9]+/.test(b) == true)) {
				//mafei id重复
				a.reject();
				return
			} else {
				this.getConfig(a).setValue(this.component, b);
			}
			//this.getConfig(a).setValue(this.component, b);
			if(a.configType == "Common") {
				this.store.getById(a.id).set("value", b)
			} else {
				var d = this.store.getById("Common-" + a.id);
				if(d) {
					d.set("value", b)
				}
			}
			a.commit();
		}
	},
	rejectChange: function(record) {

		var activeCmp = this.component;
		var cmpConfig = activeCmp.config;
		if(cmpConfig && cmpConfig.xtype == 'viewport') {
			record.reject();
			return true;
		}
		return false;
	}
});
//end

Ext.ux.SelectBox = function(a) {
	this.searchResetDelay = 1000;
	a = a || {};
	a = Ext.apply(a || {}, {
		editable: false,
		forceSelection: true,
		rowHeight: false,
		lastSearchTerm: false,
		triggerAction: "all",
		mode: "local",
		emptyText: "请选择"

	});
	Ext.ux.SelectBox.superclass.constructor.apply(this, arguments);
	this.lastSelectedIndex = this.selectedIndex || 0
};
Ext.extend(Ext.ux.SelectBox, Ext.form.ComboBox, {
	lazyInit: false,
	initEvents: function() {
		Ext.ux.SelectBox.superclass.initEvents.apply(this, arguments);
		//this.el.on("keydown", this.keySearch, this, true);
		this.cshTask = new Ext.util.DelayedTask(
			this.clearSearchHistory, this)
	},
	keySearch: function(f, d, b) {
		var a = f.getKey();
		var c = String.fromCharCode(a);
		var g = 0;
		if(!this.store.getCount()) {
			return
		}
		switch(a) {
			case Ext.EventObject.HOME:
				f.stopEvent();
				this.selectFirst();
				return;
			case Ext.EventObject.END:
				f.stopEvent();
				this.selectLast();
				return;
			case Ext.EventObject.PAGEDOWN:
				this.selectNextPage();
				f.stopEvent();
				return;
			case Ext.EventObject.PAGEUP:
				this.selectPrevPage();
				f.stopEvent();
				return
		}
		if((f.hasModifier() && !f.shiftKey) || f.isNavKeyPress() ||
			f.isSpecialKey()) {
			return
		}
		if(this.lastSearchTerm == c) {
			g = this.lastSelectedIndex
		}
		this.search(this.displayField, c, g);
		this.cshTask.delay(this.searchResetDelay)
	},
	onRender: function(b, a) {
		this.store.on("load", this.calcRowsPerPage, this);
		Ext.ux.SelectBox.superclass.onRender.apply(this, arguments);
		if(this.mode == "local") {
			this.calcRowsPerPage()
		}
	},
	onSelect: function(a, c, b) {
		if(this.fireEvent("beforeselect", this, a, c) !== false) {
			this.setValue(a.data[this.valueField || this.displayField]);
			if(!b) {
				this.collapse()
			}
			this.lastSelectedIndex = c + 1;
			this.fireEvent("select", this, a, c)
		}
	},
	render: function(a) {
		Ext.ux.SelectBox.superclass.render.apply(this, arguments);
		if(Ext.isSafari) {
			this.el.swallowEvent("mousedown", true)
		}
		this.el.unselectable();
		this.innerList.unselectable();
		this.trigger.unselectable();
		this.innerList.on("mouseup", function(d, c, b) {
			if(c.id && c.id == this.innerList.id) {
				return
			}
			this.onViewClick()
		}, this);
		this.innerList.on("mouseover", function(d, c, b) {
			if(c.id && c.id == this.innerList.id) {
				return
			}
			this.lastSelectedIndex = this.view
				.getSelectedIndexes()[0] +
				1;
			this.cshTask.delay(this.searchResetDelay)
		}, this);
		this.trigger.un("click", this.onTriggerClick, this);
		this.trigger.on("mousedown", function(d, c, b) {
			d.preventDefault();
			this.onTriggerClick()
		}, this);
		this.on("collapse", function(d, c, b) {
			Ext.getDoc().un("mouseup", this.collapseIf, this)
		}, this, true);
		this.on("expand", function(d, c, b) {
			Ext.getDoc().on("mouseup", this.collapseIf, this)
		}, this, true)
	},
	clearSearchHistory: function() {
		this.lastSelectedIndex = 0;
		this.lastSearchTerm = false
	},
	selectFirst: function() {
		this.focusAndSelect(this.store.data.first())
	},
	selectLast: function() {
		this.focusAndSelect(this.store.data.last())
	},
	selectPrevPage: function() {
		if(!this.rowHeight) {
			return
		}
		var a = Math.max(this.selectedIndex - this.rowsPerPage, 0);
		this.focusAndSelect(this.store.getAt(a))
	},
	selectNextPage: function() {
		if(!this.rowHeight) {
			return
		}
		var a = Math.min(this.selectedIndex + this.rowsPerPage,
			this.store.getCount() - 1);
		this.focusAndSelect(this.store.getAt(a))
	},
	search: function(c, b, d) {
		c = c || this.displayField;
		this.lastSearchTerm = b;
		var a = this.store.find.apply(this.store, arguments);
		if(a !== -1) {
			this.focusAndSelect(a)
		}
	},
	focusAndSelect: function(a) {
		var b = typeof a === "number" ? a : this.store.indexOf(a);
		this.select(b, this.isExpanded());
		this.onSelect(this.store.getAt(a), b, this.isExpanded())
	},
	calcRowsPerPage: function() {
		if(this.store.getCount()) {
			this.rowHeight = Ext.fly(this.view.getNode(0)).getHeight();
			this.rowsPerPage = this.maxHeight / this.rowHeight
		} else {
			this.rowHeight = false
		}
	}
});

//扩展selectboxex
Ext.ux.SelectBoxEx = Ext.extend(Ext.ux.SelectBox, {

})

//扩展MultiComboBox begin  (chengtao) 2017-12-29
Ext.ux.MultiComboBox = function(a) {
	this.searchResetDelay = 1000;
	a = a || {};
	a = Ext.apply(a || {}, {
		editable: false,
		forceSelection: true,
		rowHeight: false,
		lastSearchTerm: false,
		triggerAction: "all",
		mode: "local"
	});
	Ext.ux.MultiComboBox.superclass.constructor.apply(this, arguments);
	this.lastSelectedIndex = this.selectedIndex || 0;
};
Ext.extend(Ext.ux.MultiComboBox, Ext.form.MultiComboBox, {
	lazyInit: false,
	initEvents: function() {
		Ext.ux.MultiComboBox.superclass.initEvents.apply(this, arguments);
		this.el.on("keydown", this.keySearch, this, true);
		this.cshTask = new Ext.util.DelayedTask(
			this.clearSearchHistory, this)
	},
	keySearch: function(f, d, b) {
		var a = f.getKey();
		var c = String.fromCharCode(a);
		var g = 0;
		if(!this.store.getCount()) {
			return
		}
		switch(a) {
			case Ext.EventObject.HOME:
				f.stopEvent();
				this.selectFirst();
				return;
			case Ext.EventObject.END:
				f.stopEvent();
				this.selectLast();
				return;
			case Ext.EventObject.PAGEDOWN:
				this.selectNextPage();
				f.stopEvent();
				return;
			case Ext.EventObject.PAGEUP:
				this.selectPrevPage();
				f.stopEvent();
				return
		}
		if((f.hasModifier() && !f.shiftKey) || f.isNavKeyPress() ||
			f.isSpecialKey()) {
			return
		}
		if(this.lastSearchTerm == c) {
			g = this.lastSelectedIndex
		}
		this.search(this.displayField, c, g);
		this.cshTask.delay(this.searchResetDelay)
	},
	onRender: function(b, a) {
		this.store.on("load", this.calcRowsPerPage, this);
		Ext.ux.MultiComboBox.superclass.onRender.apply(this, arguments);
		if(this.mode == "local") {
			this.calcRowsPerPage()
		}
	},
	clearSearchHistory: function() {
		this.lastSelectedIndex = 0;
		this.lastSearchTerm = false
	},
	selectFirst: function() {
		this.focusAndSelect(this.store.data.first())
	},
	selectLast: function() {
		this.focusAndSelect(this.store.data.last())
	},
	selectPrevPage: function() {
		if(!this.rowHeight) {
			return
		}
		var a = Math.max(this.selectedIndex - this.rowsPerPage, 0);
		this.focusAndSelect(this.store.getAt(a))
	},
	selectNextPage: function() {
		if(!this.rowHeight) {
			return
		}
		var a = Math.min(this.selectedIndex + this.rowsPerPage,
			this.store.getCount() - 1);
		this.focusAndSelect(this.store.getAt(a))
	},
	search: function(c, b, d) {
		c = c || this.displayField;
		this.lastSearchTerm = b;
		var a = this.store.find.apply(this.store, arguments);
		if(a !== -1) {
			this.focusAndSelect(a)
		}
	},
	focusAndSelect: function(a) {
		var b = typeof a === "number" ? a : this.store.indexOf(a);
		this.select(b, this.isExpanded());
		this.onSelect(this.store.getAt(a), b, this.isExpanded())
	},
	calcRowsPerPage: function() {
		if(this.store.getCount()) {
			this.rowHeight = Ext.fly(this.view.getNode(0)).getHeight();
			this.rowsPerPage = this.maxHeight / this.rowHeight
		} else {
			this.rowHeight = false
		}
	}
});
//end

xds.FlyoutSelect = Ext.extend(Ext.ux.SelectBox, {
	listClass: "x-combo-list-small",
	width: 120,
	displayField: "text",
	initComponent: function() {
		this.store = new Ext.data.SimpleStore({
			fields: ["text"],
			expandData: true,
			data: this.data
		});
		delete this.data;
		xds.FlyoutSelect.superclass.initComponent.call(this)
	},
	initList: function() {
		Ext.form.ComboBox.prototype.initList.call(this);
		this.list.setZIndex(80005)
	}
});
Ext.reg("flyoutselect", xds.FlyoutSelect);
Ext.ux.TileView = Ext.extend(Ext.DataView, {
	categoryName: "category",
	imagePath: "imagePath",
	imageName: "imageName",
	itemName: "text",
	itemDescription: "description",
	itemIconCls: "iconCls",
	itemSelector: "dd",
	initComponent: function() {
		this.tpl = new Ext.XTemplate(this.getMarkup(), {
			getCategory: this.getCategory,
			openCategory: this.openCategory,
			view: this
		});
		Ext.ux.TileView.superclass.initComponent.call(this)
	},
	getMarkup: function() {
		return [
			'<div class="x-tile-ct">',
			'<tpl for=".">',
			'<tpl if="this.openCategory(values, xindex, xcount)">',
			'<tpl if="xindex != 1">',
			'<div style="clear:left"></div></dl>',
			"</tpl>",
			'<h2><div unselectable="on" class="x-unselectable">{[this.getCategory(values)]}</div></h2>',
			"<dl>", "</tpl>", '<dd><img title="{text:htmlEncode}" src="',
			Ext.BLANK_IMAGE_URL, '" class="{', this.itemIconCls, '}"/>',
			"<div><h4>{", this.itemName, "}</h4><p>{",
			this.itemDescription, "}</p></div>", "</dd>",
			'<tpl if="xindex == xcount">',
			'<div style="clear:left"></div></dl>', "</tpl>", "</tpl>",
			"</div>"
		].join("")
	},
	openCategory: function(b, c, d) {
		var a = this.getCategory(b);
		if(this.lastCat != a) {
			this.lastCat = a;
			return true
		}
		return false
	},
	getCategory: function(a) {
		return a[this.view.categoryName]
	},
	onClick: function(b) {

		var a = b.getTarget("h2", 3, true);
		if(a) {
			a.toggleClass("collapsed");
			a.next("dl").toggleClass("collapsed")
		} else {
			return Ext.ux.TileView.superclass.onClick.apply(this, arguments)
		}
	}
});
xds.MoreField = Ext.extend(Ext.BoxComponent, {
	defaultAutoCreate: {
		tag: "div",
		cls: "x-more-field",
		cn: [{
			tag: "span"
		}, {
			tag: "a",
			href: "#"
		}]
	},
	fieldClass: "x-form-text",
	isFormField: true,
	value: undefined,
	getName: function() {
		return this.name || this.id
	},
	onRender: function(c, a) {
		xds.MoreField.superclass.onRender.call(this, c, a);
		if(!this.el) {
			var b = this.getAutoCreate();
			this.el = c.createChild(b, a)
		}
		this.el.addClass([this.fieldClass, this.cls]);
		this.valueEl = this.el.child("span");
		this.btnEl = this.el.child("a");
		this.btnEl.swallowEvent("click", true);
		this.btnEl.on("click", this.onMoreClick, this);
		this.initValue()
	},
	onMoreClick: Ext.emptyFn,
	afterRender: function(b, a) {
		xds.MoreField.superclass.afterRender.call(this);
		this.originalValue = this.getRawValue()
	},
	initValue: function() {
		if(this.value !== undefined) {
			this.setValue(this.value)
		}
	},
	isDirty: function() {
		return false
	},
	isValid: function() {
		return true
	},
	validate: function() {
		return true
	},
	processValue: function(a) {
		return a
	},
	validateValue: function(a) {
		return true
	},
	reset: Ext.emptyFn,
	markInvalid: Ext.emptyFn,
	clearInvalid: Ext.emptyFn,
	getRawValue: function() {
		return this.value
	},
	getValue: function() {
		return this.value
	},
	setRawValue: function(a) {
		this.value = a;
		if(this.valueEl) {
			this.valueEl.dom.innerHTML = a
		}
	},
	setValue: function(a) {
		this.setRawValue(a)
	}
});
Ext.reg("morefield", xds.MoreField);
xds.Project = Ext.extend(Ext.util.Observable, {
	constructor: function(a) {
		Ext.apply(this, a)
	},
	save: function(a, b) {

		if(xds.vmd.isCheckUxhasSelf()) {
			Ext.Msg.alert('提示', '复合组件不能包含自身！');
			return;
		}
		if(!xds.Project.file) {
			this.saveAs(a, b);
			return
		}
		xds.File.saveProject(this.getData(), a, b)
	},
	saveAs: function(a, b) {
		xds.File.saveProjectAs(this.getData(), a, b)
	},
	preview: function() {
		//修改集成功能的模版类型

		if(xds.vmd.isCheckUxhasSelf()) {
			Ext.Msg.alert('提示', '复合组件不能包含自身！');
			return;
		}
		xds.vmd.checkCid();
		var defaultTitle = '页面预览';
		var name = xds.vmd.params.name();
		var moduleName = name;
		var title = moduleName ? (moduleName + '__' + defaultTitle) : defaultTitle;
		var height = Ext.getBody().getHeight() - 80;
		var width = Ext.getBody().getWidth() - 100;
		var pre = new Ext.Window({
			title: title,
			modal: true,
			html: "<iframe  src='" + xds.vmd.getPreviewPath() + "'?r=" + new Date().getTime() + "' frameborder=0  style='height:100%;width:100%'></iframe>",
			bodyStyle: "background-color:#fff",
			height: height,
			width: width,
			maskStyle: 'opacity:0.8',
			draggable: false,
			listeners: {
				move: function(me, x, y) {
					me.moveZone(me, x, y);
				}
			}

		})

		pre.show();
		//pre.maximize()
	},
	open: function() {
		if(typeof(xds.Project.file) != 'undefined')
			xds.File.setTitle(xds.Project.file.nativePath);
		else
			xds.File.setTitle("New Project");

		xds.inspector.root.beginUpdate();
		var d = xds.inspector.root;
		while(d.firstChild) {
			d.removeChild(d.firstChild)
		}
		var b = this.components || [];
		for(var a = 0, e; e = b[a]; a++) {
			//mafei 通过右侧监听树的操作实现界面加载
			xds.inspector.restore(e, d)
		}

		xds.inspector.root.endUpdate();
		if(d.firstChild) {
			//触发组件渲染的关键点，会触发componentselect方法
			d.firstChild.select()
		}

	},
	interfaceOpen: function() {

		if(designer.mode == 'ux') {
			xds.interface.root.beginUpdate();
			var d = xds.interface.root;
			while(d.firstChild) {
				d.removeChild(d.firstChild)
			}
			var b = this.components || [];
			for(var a = 0, e; e = b[a]; a++) {
				//mafei 通过右侧监听树的操作实现界面加载
				xds.interface.restore(e, d)
			}

			xds.interface.root.endUpdate();

		}
	},
	resourceOpen: function () {

	
	    xds.resource.root.beginUpdate();
	    var d = xds.resource.root;
	    while (d.firstChild) {
	        d.removeChild(d.firstChild)
	    }
	    var b = this.components || [];
	    for (var a = 0, e; e = b[a]; a++) {
	        xds.resource.restore(e, d)
	    }

	    xds.resource.root.endUpdate();

	    
	},
	getData: function() {
		var b = {
			name: this.name,
			file: this.file,
			components: []
		};
		var a = xds.inspector.root;
		var c = a.firstChild;
		while(c) {
			b.components.push(c.component.getInternals(true));
			c = c.nextSibling
		}
		return b
	},
	getData2: function() {
		var b = {
			name: this.name,
			file: this.file,
			components: []
		};
		var a = xds.interface.root;
		var c = a.firstChild;
		while(c) {
			b.components.push(c.component.getInternals(true));
			c = c.nextSibling
		}
		return b
	},
	getResourceData: function () {
	    var b = {
	        name: this.name,
	        file: this.file,
	        components: []
	    };
	    var a = xds.resource.root;
	    var c = a.firstChild;
	    while (c) {
	        b.components.push(c.component.getInternals(true));
	        c = c.nextSibling
	    }
	    return b
	},
	viewJoson: function() {
		var a = new xds.CJsonWindow({
			title: '查看JSON代码',
			jdb: this.getJson()
		})
		a.show();
	},
	getJson: function() {
		var a = xds.inspector.root;
		var c = a.firstChild;
		var b = {
			components: []
		};

	    //mafei
		xds.vmd.eventDict.afterrender = new StringMap();
		xds.vmd.eventDict.beforerender = new StringMap();

		while(c) {
			b.components.push(c.component.getJsonConfig(true));
			c = c.nextSibling
		}
		//var b=this.getData();

		function parse_store(o) {
			if(typeof(o.cn) != 'undefined') {
				o.fields = o.cn;
				delete o.cn;
			}
		}

		function parse_object(o) {
			if(o.xtype == 'grid') {
				o.columns = [];
			}
			if(typeof(o.cn) != 'undefined') {
				var i = 0;
				var len = o.cn.length;
				var moved = 0;
				while(i < len) {
					if(typeof(o.cn[i].dock) != 'undefined') {
						o[o.cn[i].dock] = o.cn[i].cn || [];
						delete o.cn[i];
						moved++;
						i++;
						continue;
					}
					switch(o.cn[i].xtype) {
						case 'gridcolumn':
					    case 'booleancolumn':
						case 'checkcolumn':
						case 'stringcolumn':
						case 'datecolumn':
						case 'templatecolumn':
						case 'numbercolumn':
							// delete o.cn[i].xtype;
							o.columns.push(o.cn[i]);
							delete o.cn[i];
							moved++;
							break;
						case 'jsonstore':
						case 'arraystore':
						case 'xmlstore':
							parse_store(o.cn[i]);
							o.store = Ext.apply({}, o.cn[i]);
							delete o.cn[i];
							moved++;
							break;
					}
					i++;
				}
				if(moved < len) {
					o.items = o.cn;
					delete o.cn;
				} else {
					delete o.cn;
				}
				if(typeof(o.items) != 'undefined') {
					len = o.items.length;
					for(var i = 0; i < len; i++) {
						if(typeof(o.items[i]) != 'undefined')
							parse_object(o.items[i]);
					}
				}
				if(typeof(o.tbar) != 'undefined') {
					len = o.tbar.length;
					for(var i = 0; i < len; i++) {
						if(typeof(o.tbar[i]) != 'undefined')
							parse_object(o.tbar[i]);
					}
				}
				if(typeof(o.fbar) != 'undefined') {
					len = o.fbar.length;
					for(var i = 0; i < len; i++) {
						if(typeof(o.fbar[i]) != 'undefined')
							parse_object(o.fbar[i]);
					}
				}
				if(typeof(o.bbar) != 'undefined') {
					len = o.bbar.length;
					for(var i = 0; i < len; i++) {
						if(typeof(o.bbar[i]) != 'undefined')
							parse_object(o.bbar[i]);
					}
				}
				if(typeof(o.store) != 'undefined') {
					//20171122
					// if (typeof (o.store) != 'object')
					//    delete o.store;
				}
			}
		}
		for(var ii = 0; ii < b.components.length; ii++) {
			parse_object(b.components[ii]);
		}
		return(b.components);
	},
	setData: function(a) {
		Ext.apply(this, a)
	},
	doClose: function() {
		var a = xds.inspector.root;
		while(a.firstChild) {
			var b = a.removeChild(a.firstChild);
			b.destroy()
		}
		delete xds.Project.file
		xds.canvas.clear()
	},
	close: function(a, b) {
		var msg = "是否要保存这个" + (designer.mode == "module" ? '模块' : '复合组件') + "?";
		var layoutStr = Ext.encode(xds.project.getData());
		//增加调用关闭接口
		var isClose;
		if(!a) isClose = true;
		if(isClose) {

			if(layoutStr != xds.vmd.layoutStr) {
				msg = "模块发生变化是否要保存？"
			} else {
				window.close();
				return
			}

		}
		if(xds.inspector.root.firstChild) {
			if(xds.inspector.root.firstChild.childNodes.length > 0)
				Ext.Msg.show({
					title: "温馨提示",
					msg: msg,
					buttons: isClose ? Ext.Msg.YESNO : Ext.Msg.YESNOCANCEL,
					fn: function(c) {

						if(c == "yes") {
							xds.vmd.layoutStr = layoutStr;

							this.save({
								callback: function() {
									// this.doClose()

									if(isClose) {
										// window.close();
									}
								},
								scope: this
							});
							if(!isClose) {
								a();

							}

						} else {
							if(c == "no") {
								if(!isClose) {
									this.doClose()
									a()
								} else {
									window.close()
								}

							} else {

							}
						}
					},
					scope: this
				})
			else {
				this.doClose()
				a && a()
			}
		} else {
			this.doClose();
			if(a) Ext.callback(a, this);
			if(isClose) {
				window.close();
			}
		}
	},
	loadInspector: function(vmdStr) {

		var a = new xds.Project(vmdStr);
		a.open()
		if(designer.mode == 'ux') {

		    xds.vmd.newUxInterface()
		}else{
		    xds.vmd.newResource()
		}

	},
    /*拆分两个功能块*/
	_loadVmdFile: function (path) {

	    var me = this;
	    if (!vmd.vmdUploadPath) {
	        Ext.Msg.alert('出错', '请检查服务配置config.js')
	        return
	    }
	    //默认加载登录测试页面
	    var filename = path;
	    if (designer.mode == "ux") filename = path;
	    var myMask = new Ext.LoadMask(Ext.getBody(), {
	        msg: "模块加载中,请稍后...",
	        msgCls: 'z-index:10000;'
	    });
	    xds.vmd.loading = myMask;
	    var url = vmd.vmdUploadPath + 'FileService?FileName=' + filename;
	    //防止加载空页面报错
	    if (!filename) url = "templete/module.html";

	    myMask.show();
	    Ext.Ajax.request({
	        url: url,
	        timeout: 5000,
	        success: function (result) {
	            var res;
	            try {
	                res = Ext.util.JSON.decode(result.responseText);
	                if (res.errMsg && !xds.vmd.params.vmdMode()) {
	                    Ext.Msg.alert('加载失败', res.errMsg);
	                    //return
	                }
	            } catch (ex) {
	                res = {};
	            }

	            var vmd;
	            try {
	                vmd = Ext.util.JSON.decode(res.data);
	                //事件
	                xds.vmd.events = vmd.vmdevents;
	                //样式
	                xds.vmd.css = vmd.vmdcss;
	                //特殊属性
	                xds.vmd.props = Ext.decode(vmd.vmdprops);
	                if (vmd.type) designer.mode = vmd.type;
	            } catch (ex) {
	                Ext.Msg.alert('反序列化失败', ex.message)
	            }

	            //结构
	            var layout = {
	                "components": [{
	                    "cid": "viewport",
	                    "name": "MyViewport",
	                    "layoutConfig": {},
	                    "userConfig": {
	                        "layout": "absolute"
	                    }
	                },
						{
						    "cid": "vmddataset"
						}, {
						    "cid": "vmdvariable"
						}
	                ]
	            }
	            //参数path不为空处理
	            if (vmd && vmd.vmdlayout) {
	                // xds.vmd.layoutStr = vmd.vmdlayout;
	                layout = Ext.util.JSON.decode(vmd.vmdlayout);
	                if (designer.mode != 'ux') {
	                    //数据集
	                    if (!layout.components[1]) {
	                        layout.components.push({
	                            cid: 'vmddataset'
	                        })
	                    }
	                    //变量
	                    if (!layout.components[2]) {
	                        layout.components.push({
	                            cid: 'vmdvariable'
	                        })
	                    }
	                    //资源
	                    xds.vmd.resource.data.res = Ext.decode(vmd.vmdresource);
	                } else {
	                    xds.vmd.ux.data.interface = Ext.decode(vmd.vmdinterface);
	                    xds.vmd.ux.data.view = layout;
	                }

	                xds.vmd.layoutStr = Ext.encode(layout);

	            }
	            //加载组件树
	            me.loadInspector(layout);
	            //var a = new xds.Project(layout);
	            //a.open()

	            myMask.hide();

	            //20171201工作流处理
	            Ext.require('ide.ext.workflow', function () {
	                ide.ext.workflow.init(layout);
	            });
	        },
	        failure: function (result) {
	            myMask.hide()
	            Ext.Msg.alert('加载失败', '错误' + result.status + '：' + result.statusText + "<p>" + "请检查数据服务是否启动!");
	        }

	    })
	},
	loadVmdFile: function(path) {
        
		var me = this;
	
	    var vmd;
	    try {
	        vmd = Ext.util.JSON.decode(xds.vmd.serializeStr);
		    //事件
		    xds.vmd.events = vmd.vmdevents;
		    //样式
		    xds.vmd.css = vmd.vmdcss;
		    //特殊属性
		    xds.vmd.props = Ext.decode(vmd.vmdprops);
		    if(vmd.type) designer.mode = vmd.type;
	    } catch(ex) {
		    Ext.Msg.alert('反序列化失败', ex.message)
	    }

	    //结构
	    var layout = {
		    "components": [{
				    "cid": "viewport",
				    "name": "MyViewport",
				    "layoutConfig": {},
				    "userConfig": {
					    "layout": "absolute"
				    }
			    },
			    {
				    "cid": "vmddataset"
			    }, {
				    "cid": "vmdvariable"
			    }
		    ]
	    }
        //参数path不为空处理
	    if(vmd && vmd.vmdlayout) {
		    // xds.vmd.layoutStr = vmd.vmdlayout;
		    layout = Ext.util.JSON.decode(vmd.vmdlayout);
		    if(designer.mode != 'ux') {
			    //数据集
			    if(!layout.components[1]) {
				    layout.components.push({
					    cid: 'vmddataset'
				    })
			    }
			    //变量
			    if(!layout.components[2]) {
				    layout.components.push({
					    cid: 'vmdvariable'
				    })
			    }
			    //资源
			    xds.vmd.resource.data.res = Ext.decode(vmd.vmdresource);
		    } else {
			    xds.vmd.ux.data.interface = Ext.decode(vmd.vmdinterface);
			    xds.vmd.ux.data.view = layout;
		    }

		    xds.vmd.layoutStr = Ext.encode(layout);

	    }
	    //加载组件树
	    me.loadInspector(layout);
	    //var a = new xds.Project(layout);
	    //a.open()

	    //myMask.hide();
	    xds.vmd.loading.hide();
	    //20171201工作流处理
	    Ext.require('ide.ext.workflow', function() {
		    ide.ext.workflow.init(layout);
	    });
			
	},
	saveVmdFile: function (path, bodyStr, callback, callbackInfo) {
	    var id = xds.vmd.params.id();
		var myMask = new Ext.LoadMask(Ext.getBody(), {
			msg: "正在保存中,请稍后...",
			msgCls: 'z-index:70000;'
		});

		var vmdXds = xds.vmd;
		if(!path) {
			Ext.Msg.alert('提示', '违法操作，无法保存，请从正确的地址进入！')
			return
		}
		myMask.show();
		//默认保存登录测试页面
		var filename = path;
		var tastList = {
			vmdState: false,
			htmlState: false,
			htmlrState: false
		};
		var saveVmd = function(filename, bodyStr, taskName, callback) {
			Ext.Ajax.request({
				url: vmd.vmdUploadPath + 'FileService',
				// defaultPostHeader: 'text/plain',
				timeout: 10000,
				success: function(result) {
					var res = Ext.util.JSON.decode(result.responseText);
					if(res.errMsg) {
						//vmdstate = true;
					    tastList[taskName] = true;
					    myMask.hide();
						Ext.Msg.alert('错误', res.errMsg);
						return;
					}
					//Ext.Msg.alert('提示', '保存成功！');
					//vmdstate = true;
					tastList[taskName] = true;
					myMask.hide();

					if(callback) callback();
				},
				failure: function(result) {
					//vmdstate = true;
					tastList[taskName] = true;
					Ext.Msg.alert('错误', '网络超时，保存失败！')
					myMask.hide()

				},
				headers: {
					token: '',
					FileName: filename
				},
				params: {
					body: bodyStr
				}

			});
		}
		if(designer.mode == "ux") {
			filename = path;
			//存储组件的总配置文件，便于左侧树的加载（usercontrols/config.js）
			//designer.prefix.cmp;
			if(filename) filename = filename.replace(/.vmd$/, '');
			var root = xds.inspector.root.childNodes[0].component;
			var name = filename || root.id;

			var vmdpath, jspath, idepath, savePref, cmpVer = xds.vmd.params.ver();
			cmpVer = cmpVer + '/';
			var cmpDir = name.toLowerCase() + '/';
			//完整相对路径
			vmdpath = vmdXds.ux.paths.vmd + name + '.vmd';
			jspath = vmdXds.ux.paths.cmp + name + '.js';
			//增加版本号
			jspath = vmdXds.ux.paths.cmp + cmpDir + cmpVer + name + '.js';
			idepath = vmdXds.ux.paths.ide + name + '.js';
			tastList = {
				vmdState: false,
				jsState: false,
				configState: false

			}

			var runner = new Ext.util.TaskRunner();

			var taskRun = function() {
				//vmd文件和js及config保存成功后才提示
				if(tastList.vmdState && tastList.jsState && tastList.configState) {
					Ext.Msg.alert('提示', '保存成功！', function() {
						if(callback && !callbackInfo.isShow) {
							window.close()
						}
					});
					runner.stop(task); //停止 任务
					if(callback) callback();
				}

			}
			var task = {
				run: taskRun,
				interval: 100,
				duration: 10000
			}
			runner.start(task);

			//进行保存验证(读取config.js)，先判断数据库中是否有该组件（path为空时），并提示是否覆盖

			var cmpListPath = vmdXds.ux.cmpListPath;
			var url = vmd.vmdUploadPath + 'FileService?FileName=' + cmpListPath
			var cmpList = [];
			var saveUx = function() {
				//1、保存复合组件描述文件
				saveVmd(vmdpath, bodyStr, "vmdState")

				//2、保存复合组件的js文件
				var page = xds.project.getJson()[0];
				var codeStr = SourceX.JonsScript(page);
				saveVmd(jspath, codeStr, "jsState");

				//3、保存复合组件的ide的属性设置
				//先加载组件模块
				Ext.Ajax.request({
					type: 'get',
					url: 'templete/ux.js',
					success: function(result) {

						var str = result.responseText;
						/*
						 *param1 复合组件英文全称
						 *param2 复合组件英文简称
						 *param3 复合组件中文名称
						 *param4 自定义的复合组件属性
						 *param5 自定义的复合组件属性的默认值
						 *param6 复合组件ace自动识别
						 */
						var defineProps = "",
							propsArr = [],
							propdata, eventData, methodData, defalutConfigs = {};
						propdata = xds.vmd.getPropsData();
						methodData = xds.vmd.getMethodsData();
						eventData = xds.vmd.getEventsData();
						Ext.each(propdata, function(item) {
							if(!item.uxcid) return false;
							var d = xds.vmd.getConfigByName(item.uxcid, item.bindValue);
							//组件设计时的默认值
							var ideconfig = xds.Registry.all.map[item.uxcid].prototype;
							var dvalue = ideconfig.defaultConfig;
							var obj = {};
							obj.name = item.id;
							obj.group = item.group || "设计";
							obj.ctype = d.ctype || "string";
							if(d.editor) {
								obj.editor = d.editor;
								if(d.options) obj.options = d.options;
								if(d.edConfig) obj.edConfig = d.edConfig;
							}
							propsArr.push(obj);

						    //构造属性的默认值(20180315)
							if (!xds.inspector.nodeHash[item.bindCmp]) return false;
							var activeCmpId = xds.inspector.nodeHash[item.bindCmp].component.activeCmpId;
							dvalue = Ext.getCmp(activeCmpId);

							var bindval = (dvalue.initialConfig && dvalue.initialConfig[item.bindValue]) || dvalue[item.bindValue]
							if(bindval && typeof bindval != 'object') {
								defalutConfigs[item.id] = bindval;
							}
						})
					    //如果扩展有布局layout要把布局信息添加到设计时模式下
						
						if (page.layout) {
						    defalutConfigs.layout = page.layout;
						}
						
						//事件接口的装配
						Ext.each(eventData, function(item) {
							var obj = {};
							obj.name = item.id;
							obj.group = "事件";
							obj.ctype = 'string';
							obj.editor = 'ace';
							obj.params = item.params;

							propsArr.push(obj);
						})

						defineProps = Ext.encode(propsArr);
						//去掉首位字符
						defineProps = defineProps.replace(/^\[/, "").replace(/\]$/, "")
						if(defineProps) defineProps = "," + defineProps;

						defalutConfigs = Ext.encode(defalutConfigs);

						var uxcls = designer.prefix.cmp + name;
						var uxAceAutoMatchStr = '',
							uxAceAutoMatchObj;
						//添加ace自动识别功能
						uxAceAutoMatchObj = addUxControlFun && addUxControlFun({
							cid: uxcls,
							prop: propdata,
							method: methodData,
							event: eventData
						});
						if(uxAceAutoMatchObj) {
							var _name = 'Data_' + uxcls.replace(/\./g, '_');
							uxAceAutoMatchStr = 'var ' + _name + '=' + Ext.encode(uxAceAutoMatchObj);
							uxAceAutoMatchStr += '\n' + '\tControlsDataManage._add(' + _name + ')';
						}
						var layoutConfig = "";
					    //保存复合组件设计模式下布局丢失问题
						if (page.layoutConfig) {
						    layoutConfig = "this.layoutConfig=" + Ext.encode(page.layoutConfig)+"\n";
						}
						

						// str = String.format(str, uxcls, name, name, defineProps, defalutConfigs, uxAceAutoMatchStr);
						str = str.format({
							uxcls: uxcls,
							name: name,
							zhname: name,
							defineProps: defineProps,
							defalutConfigs: defalutConfigs,
							uxAceAutoMatchStr: uxAceAutoMatchStr,
							layoutConfig: layoutConfig
						});
						saveVmd(idepath, str, "configState");

					    //日志记录
						vmd.saveUXCompInfo && vmd.saveUXCompInfo(id);
					},
					failure: function(data) {
						Ext.Msg.alert('提示', '加载复合组件设计时配置出错！');
						myMask.hide();
					}
				})
			}
			//保存组件list文件
			var saveCmpList = function(cmpList, isUpdate) {
				cmpList = cmpList || [];

				var zhname = decodeURIComponent(getUrlParam('uxname'))||'';
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
                
				var cmpInfo = {
					name: name,
					version: xds.vmd.params.ver(),
					lastModifyTime: new Date().format('Y-m-d H:i:s'),
					zhname: zhname
				}
				//更新配置文件
				var updateItem;
				Ext.each(cmpList, function(item, index) {
					if(item.name == name) {
						updateItem = item;
						return false;
					}
				})

				if(updateItem) {
					//var updateItem = cmpList[updateItemIndex];
					//更新version 及修改时间
					updateItem.lastModifyTime = new Date().format('Y-m-d H:i:s');
					var ver = updateItem.version;
					var lasv = parseInt(ver.split('.')[2]) + 1;
					var newv = [ver.split('.')[0], ver.split('.')[1], lasv];
					updateItem.version = newv.join('.');
					updateItem.version = xds.vmd.params.ver();
					updateItem.zhname = zhname;
				} else {
					cmpList.push(cmpInfo);
				}
				var str = Ext.encode(cmpList);
				saveVmd(cmpListPath, str, "all", function() {
					saveUx()
				});
			}

			// 加载组件list
			Ext.Ajax.request({
				type: 'get',
				url: url,
				success: function(result) {

					var data = Ext.decode(result.responseText);
					if(data.errMsg) {
						Ext.Msg.alert('提示', data.errMsg);
						myMask.hide();
						return;
					}
					var curCmpList = Ext.decode(data.data);

					saveCmpList(curCmpList, true);

				},
				failure: function(result) {

					Ext.Msg.alert('提示', '网络超时，请稍后再试！');
					myMask.hide();
				}
			})

		} else {

			//module.html

			var readModuleTemplete = function(filename, codeStr, cls) {
				hwDas.ajax({
					das: false,
					url: xds.vmd.getReleasePath(),
					type: 'get',
					dataType: 'html',
					success: function(data) {
						//解析vmd为html文件
						var title = xds.vmd.params.name() || ''
						/*
						 *codestr 保存的代码
						 *cls 模块类名
						 *title 网页标题
						 *css 动态插入的css样式
						 *virtualpath 生成的虚拟目录,默认为空
                         *cssfiles 要加载的css文件
                         *jsfiles 要加载的js文件
						 */
						var ver = "?ver="+vmd.vmdVersion||'2.0';
						var createStylesheet = function (isWithVar) {
						    var cssfiles = [], tempArr = [], _cssfiles='';
						    cssfiles = xds.vmd.getCssFiles(true, isWithVar);
						    cssfiles.forEach(function (item) {
						        var _css = '<link href="' + item + '" rel="stylesheet" />';
						        tempArr.push(_css);
						    })
						    _cssfiles = tempArr.join('\n\t');
						    return _cssfiles;
						}
						var createScript = function (isWithVar) {
						    var jsfiles=[],tempArr = [], _jsfiles = '';
						    jsfiles = xds.vmd.getJsFiles(true, isWithVar);
						    jsfiles && jsfiles.forEach(function (item) {
						        var _js = '<script src="' + item + '" ></script>';
						        tempArr.push(_js);
						    })
						    _jsfiles = tempArr.join('\n\t');
						    return _jsfiles;
						}

						var virtualPath = '', cssfiles='',jsfiles='';
						
						cssfiles = createStylesheet();
						jsfiles = createScript();

						//var html = String.format(data, codeStr, cls, title, xds.vmd.css || '', virtualPath, cssfiles, jsfiles);

						var html = data.format({
						    codeStr: vmd.replaceResVars(codeStr),
						    cls: cls,
						    title: title,
						    css: xds.vmd.css || '',
						    virtualPath: virtualPath,
						    cssfiles: cssfiles,
						    jsfiles: jsfiles,
						    ver: ver,
						    workspaceInfo: "vmd.workspace="+Ext.encode(vmd.workspace),
						    workspacePath: ""
						})

						saveVmd(filename, html, "htmlState");

						//20171205 增加发布临时html文件
						var _filename = filename.substring(filename.lastIndexOf('/') + 1, filename.length);
						_filename = _filename.replace('.html', '') + '_r' + '.html';
						filename = filename.substring(0, filename.lastIndexOf('/')) + '/' + _filename;

                        //返回带变量替换的值
						cssfiles = createStylesheet(true);
						jsfiles = createScript(true);
					    //html = String.format(data, codeStr, cls, title, xds.vmd.css || '', '{0}', cssfiles, jsfiles);
						html = data.format({
						    codeStr: codeStr,
						    cls: cls,
						    title: title,
						    css: xds.vmd.css || '',
						    virtualPath: "{virtualPath}",
						    workspaceInfo: "",
						    workspacePath: "{workspacePath}",
						    cssfiles: cssfiles,
						    jsfiles: jsfiles,
						    ver: ver
						})
						saveVmd(filename, html, "htmlrState");

                        //日志记录
						vmd.saveModuleEditInfo && vmd.saveModuleEditInfo(id);

					},
					error: function(data) {
						Ext.Msg.alert('提示', '加载模块模版文件出错！');
					}
				})
			}
			//修改集成功能类型
			xds.vmd.checkCid();

			saveVmd(filename, bodyStr, "vmdState")

			var page = xds.project.getJson()[0];
			var codeStr = SourceX.JonsScript(page);

			var cls = page.name;
			var htmlfile = filename.replace('.vmd', '.html');
			readModuleTemplete(htmlfile, codeStr, cls)

			var runner = new Ext.util.TaskRunner();
			var taskRun = function() {
				//vmd文件和html及html发布文件保存成功后才提示
				if(tastList.vmdState && tastList.htmlState && tastList.htmlrState) {
					Ext.Msg.alert('提示', '保存成功！', function() {

						if(callback && !callbackInfo.isShow) {
							window.close()
						}
					});
					runner.stop(task); //停止 任务
					if(callback) callback();
				}

			}
			var task = {
				run: taskRun,
				interval: 100,
				duration: 10000
			}

			runner.start(task);
		    //报表及曲线描述文件功能保存功能
			if (Ext.isFunction(xds.vmd.saveReport)) xds.vmd.saveReport();
			if (Ext.isFunction(xds.vmd.saveChart)) xds.vmd.saveChart();


		}

	}
});

Ext.override(Ext.Window, {
	moveZone: function(me, x, y) {
		var bh = document.documentElement.clientHeight;
		if(y < 0) {
			me.setPosition(x, 0);
		}
		if(y >= bh - 60) {
			me.setPosition(x, bh - 70);
		}
	}
});

xds.Config = Ext.extend(Ext.util.Observable, {
	name: "",
	viewid: "",
	defautValue: "",
	type: "String",
	htmlEncode: true,
	editor: "string",
	setFn: "setConfig",
	getFn: "getConfigValue",
	constructor: function(a) {
		Ext.apply(this, a);
	},
	getHeight: function() {
		return(document.documentElement || document.body).clientHeight - 50;
	},
	getWidth: function() {
		var width = (document.documentElement || document.body).clientWidth;
		if(width > 400) {
			return width - 200;
		}
		return width - 20;
	},
	getValue: function(a) {
		return a[this.getFn](this.name)
	},
	setValue: function(e, b) {
		var a = e[this.getFn](this.name);
		e[this.setFn](this.name, b);
		if(String(a) !== String(b)) {
			if(typeof this.updateFn == "string") {
				var d = e.getExtComponent();
				d[this.updateFn](b)
			} else {
				if(typeof this.updateFn == "function") {
					this.updateFn(e.getExtComponent(), b, e)
				} else {
					xds.fireEvent("componentchanged")
				}
			}
		}
	},
	getView: function(a) {
		if(this.propEditor) { //不能用同一个
			this.propEditor.destroy();
		}
		var editorclass = xds.Config.editors[this.editor];
		if(editorclass) {
			this.propEditor = new editorclass(this, a);
		}
		if(this.propEditor) {
			return this.propEditor.view;
		} else {
			return {};
		}
	},
	render: function(a, c, b) {
		return a
	}
});
//end
xds.Config.String = Ext.extend(xds.Config, {
	type: "String",
	defaultValue: "",
	htmlEncode: true,
	editor: "string"
});
xds.Config.Number = Ext.extend(xds.Config, {
	type: "Number",
	defaultValue: 0,
	htmlEncode: false,
	editor: "number"
});
xds.Config.Boolean = Ext.extend(xds.Config, {
	type: "Boolean",
	defaultValue: false,
	editor: "boolean",
	htmlEncode: false,
	render: function(a, c, b) {
		a = a === undefined ? this.defaultValue : a;
		return '<span class="bcheck"><input type="checkbox" class="' +
			b.id + '"' + (a ? " checked" : "") + "></span>"
	}
});
xds.Config.Frame = Ext.extend(xds.Config, {
	type: "Frame",
	editor: "frame",
	htmlEncode: false,
	render: function(a, c, b) {

		var url = this.edConfig && this.edConfig.url || "";
		var height = (this.edConfig && this.edConfig.height || 23) + "px";
		//嵌套页面回写父容器的属性值
		window.vmdPropsSetValue = function(prop, value) {
			if(arguments.length = 1) {
				value = prop;
				prop = null;
			}
			var c = b.store.getById(prop || xds.vmd.propName + b.id);
			if(c) {
				c.set("value", value)
			}
		}
		//构造edvalue对象
		window.edValue = {}
		for(var key in b.store.data.map) {
			var item = b.store.data.map[key].data;
			window.edValue[key] = item.value;
		}

		//store.grid.component.configs.map[ed.record.id].setValue(store.grid.component, value);
		return '<iframe  src=' + url + ' style="height:' + height + '" frameborder=0 scrolling=no></iframe>';
	}
});
xds.Config.Object = Ext.extend(xds.Config.String, {
	type: "Object",
	defaultValue: null,
	editor: "object",
	render: function() {
		return "[object]..."
	},
	setValue: function(c, value) {
		if(typeof value != "object") {
			value = Ext.util.Format.trim(value);
			var o;
			eval("o = " + (value.length > 0 ? value : "null") + ";");
			c.setConfig(this, o)
		} else {
			c.setConfig(this, value)
		}
		xds.fireEvent("componentchanged")
	}
});
xds.Config.Array = Ext.extend(xds.Config.Object, {});
xds.Config.types = {
	string: xds.Config.String,
	number: xds.Config.Number,
	"boolean": xds.Config.Boolean,
	object: xds.Config.Object,
	frame: xds.Config.Frame
};

//扩展  begin  (chengtao) 2017-12-29
xds.Config.Editor = Ext.extend(Ext.util.Observable, {

	constructor: function(a, b) {
	    var me = this;
		this.config = a;
		this.component = b;
		this.init();
		this.view.id = this.config.viewid || xds.vmd.propName + this.config.name;
		xds.activecmpEdView.add(this.view.id, this.view);
        //汉化
		if (vmd.enableChinesize) {
		    this.view.fieldLabel = this.getPropName()||this.config.zhname || this.config.name;
		} else {
			this.view.fieldLabel = this.config.name;
		}

		this.view.name = this.config.name;

		this.view.on('afterrender', function() {

			this.addHighLightClass();
			this.view.addHighLightClass = this._addHighLightClass;

		}, this)
		this.view.on('specialkey', function(field, e) {

			if(e.keyCode == 13) {
				field.onBlur();
				field.el && field.el.dom.blur()
				this.addHighLightClass()
			}

		}, this)

		this.view.on("focus", function (p) {
		    this.setPropDesc();
		    //console.log(this.view)
		}, this);
		Ext.defer(function () {
		    me.view.on("check", function (p) {
		        this.setPropDesc();
		    }, me);
		},200)
		
	},
	getEditorCmpId:function(id){
	    return id && id.replace(xds.vmd.propName, '').replace('Container-', '');
	},
	_getFieldProp:function(type){
	    var prop;
	    var cid = this.component.cid;
	    
	    if (!type) type = "Property";
	    //var propDict = ControlsDataManage[cid] && ControlsDataManage[cid][type];
	    //prop = propDict && propDict[this.getEditorCmpId(this.view.id)];
	    var cmpId = this.getEditorCmpId(this.view.id);
	    var propArr = ControlsDataManage._getTreeNodes(cid, type)||[];
	    prop=Ext.Array.findBy(propArr, function (item) {
	        return item&&(item.id == cmpId);
	    },this)
	    return prop || {};
	},
	getPropName: function (type) {
	    var name = '';
	    var prop = this._getFieldProp(type);
	    if (prop) name = prop.data&&prop.data.Name;
	    return name;

	},
	setPropDesc:function(type){
	    var html = '<div class="properyDescript"><h3 class="properyDescript-title">{text}</h3><p class="properyDescript-content"></p>{comment}</div>'
	    var propDesc = Ext.getCmp('propDesc');
	    var prop = this._getFieldProp(type);
	    var descInfo = ControlsDataManage.showDescript(prop);
	    html = html.format({ text: descInfo.text||'', comment: descInfo.comment||'' });
	    vmd(Ext.getDom(propDesc.body.id)).html(html);
	},
	_addHighLightClass: function(cmp, store, name) {

		var item = store.getById(name) || store.getById('vmd-prop-' + name) || store.getById('Container-vmd-prop-' + name)
		if(item) {
			var data = item.data;

			var field = cmp;
			if(data.value) {
				field.label.addClass("has-value");
			} else {
				field.label.removeClass("has-value");
			}
		}
	},
	addHighLightClass: function() {

		var store = this.component.propStore.store;
		var name = this.config.name;
		this._addHighLightClass(this.view, store, name)

	},
	getHeight: function() {
		return document.body.clientHeight - 50;
	},
	getWidth: function() {
		return document.body.clientWidth - 50;
	},
	init: function() {
		this.view = new Ext.form.TextField({
			selectOnFocus: true,
			enableKeyEvent: true

		})

	},

	reload: function() {},
	edit: function () {
	},
	destroy: function() {
		if(this.view && this.view.destroy) {
			this.view.destroy();
		}
	}
})
xds.Config.Editor.string = Ext.extend(xds.Config.Editor, {});
xds.Config.Editor.boolean = Ext.extend(xds.Config.Editor, {
	init: function() {
		this.view = new Ext.form.Checkbox({})
	}
});
xds.Config.Editor.date = Ext.extend(xds.Config.Editor, {
	init: function() {
		this.view = new Ext.form.DateField({
			selectOnFocus: true
		})
	}
});
xds.Config.Editor.number = Ext.extend(xds.Config.Editor, {
	init: function() {
		this.view = new Ext.form.NumberField({
			selectOnFocus: true,
			enableKeyEvent: true
		})
	}
});
xds.Config.Editor.code = Ext.extend(xds.Config.Editor, {});
xds.Config.Editor.object = Ext.extend(xds.Config.Editor, {});
xds.Config.Editor.file = Ext.extend(xds.Config.Editor, {
	constructor: function(a, b) {
		this.config = a;
		this.component = b;
		this.init();
	},
	init: function() {
		var me = this;
		this.config.edConfig = this.config.edConfig || {};
		var fileView = new Ext.form.FileUploadField({
			fileUpload: true
		});
		fileView.id = this.config.viewid || xds.vmd.propName + this.config.name;
		if(this.config.title) {
			fileView.fieldLabel = this.config.title;
		} else {
			fileView.fieldLabel = this.config.name;
		}

		fileView.name = this.config.edConfig.fileid || "Body";

		this.url = this.config.edConfig.url || "";

		this.view = new Ext.FormPanel({
			renderTo: Ext.getBody(),
			fileUpload: true,
			//frame: true,
			autoHeight: true,
			header: false,
			border: false,
			bodyBorder: false,
			labelWidth: 80,
			method: 'POST',
			url: this.url,
			defaults: {
			    anchor: '100%'
			},
			style: { width: 0 }
		});
	    // items: [fileView]
		this.view.add(fileView);
		fileView.on("fileselected", function(e, a) {
			this.view.getForm().submit({
				url: this.url,
				waitTitle: "文件上传",
				waitMsg: '正在上传...',
				success: function(form, action) {
					var callback = me.config.edConfig.callback;
					var data = Ext.decode(action.response.responseText);
					//callback&&callback(me.view,data);
					var newValue = data.name;
					var oldValue = fileView.getValue();
					fileView.setValue(newValue);
					fileView.fireEvent("change", fileView, newValue, oldValue);
				}
			});

		}, this);

	}
});
xds.Config.Editor.frame = Ext.extend(xds.Config.Editor, {
	init: function() {
		var url = this.config.edConfig && this.config.edConfig.url || "";
		var height = (this.config.edConfig && this.config.edConfig.height || 30) + "px";
		//嵌套页面回写父容器的属性值
		var me = this;
		window.vmdPropsSetValue = function(prop, value) {
			if(arguments.length = 1) {
				value = prop;
				prop = null;
			}
			if(prop) {
				me.view.fireEvent("change", prop, value);
			} else {
				var newValue = value || "";
				var oldValue = me.view.getValue();
				me.view.setValue(newValue);
				me.view.fireEvent("change", me.view, newValue, oldValue);
			}
		}
		//构造edvalue对象
		window.edValue = {}
		for(var key in this.component.configs.map) {
			var item = this.component.configs.map[key];
			window.edValue[key] = item.getValue(this.component);
		}

		this.view = new Ext.Panel({
			fitToFrame: true,
			html: '<iframe  src=' + url + ' style="height:' + height + '" frameborder=0 scrolling=no></iframe>',
			setValue: function(value) {
				this.value = value;
			},
			getValue: function() {
				return this.value;
			}
		});
	}
});
xds.Config.Editor.options = Ext.extend(xds.Config.Editor, {
	init: function() {
		this.view = new Ext.ux.SelectBox({
			listClass: "x-combo-list-small",
			store: new Ext.data.SimpleStore({
				fields: ["text"],
				expandData: true
			}),
			displayField: "text"
		});
		this.reload();
	},
	reload: function() {
		if(!this.config.edConfig) {
			this.config.edConfig = {};
		}
		//mafei 增加属性设置
		Ext.apply(this.view, this.config.edConfig)
		if(this.config.edConfig.type != "store" &&
			this.config.edConfig.type != "storeField" &&
			this.config.edConfig.type != "var" &&
			this.config.edConfig.type != "menu") {
			var options = this.config.options || [];
			this.view.store.loadData(options);
		} else {
			this.view.on("focus", function(p) {
				var cfg = this.config.edConfig || {};
				var options = this.config.options || [];
				

				if(cfg.type == "store") //获取数据集
				{
					options = xds.vmd.getStoreNames();

				} else if(cfg.type == "storeField") //获取数据集的字段
				{
				    var scname = cfg.cname || "store";
					var storeRecord = xds.props.findRecord(scname); //获取指定的属性值
					if(storeRecord && storeRecord.data && storeRecord.data.value) {
						options = xds.vmd.getStoreFieldNames(storeRecord.data.value);
					}
					if (cfg.storeFromParent) {
					    var pNode = this.component.owner;
					    var pNodeBindStoreName = pNode.config.store;
					    if (pNodeBindStoreName) {
					        options = xds.vmd.getStoreFieldNames(pNodeBindStoreName);
					    }
					    
					}
                    

				} else if(cfg.type == "var") //获取数据集的字段
				{
					options = xds.vmd.getVarNames();
				} else if(cfg.type == "menu") //获取数据集的字段
				{
					options = xds.vmd.getMenuNames();
				}
				this.view.store.loadData(options);
			}, this);
		}
	}
});
xds.Config.Editor.multiOptions = Ext.extend(xds.Config.Editor.options, {
	init: function() {
		this.view = new Ext.ux.MultiComboBox({
			listClass: "x-combo-list-small",
			store: new Ext.data.SimpleStore({
				fields: ["text"],
				expandData: true
			}),
			displayField: "text",
			valueField: "text"
		});
		this.reload();
	}
});
xds.Config.Editor.combo = Ext.extend(xds.Config.Editor.options, {
	init: function() {
		this.view = new Ext.ux.SelectBoxEx({
			listClass: "x-combo-list-small",
			store: new Ext.data.SimpleStore({
				fields: ["text", "value"]
			}),
			displayField: "text",
			valueField: "value"
		});
		this.reload();
	}
});
xds.Config.Editor.js = Ext.extend(xds.Config.Editor, {
	init: function() {
		xds.Config.Editor.js.superclass.init.call(this);
		this.view.readOnly = true;
		this.view.on("focus", function(p) {
			this.edit();
		}, this);
	},
	edit: function() {
		var editor = new vmd.comp.Ace({
			/*必须加id（itemId）不然add操作会重复累加dom结构*/
			id: 'ace_js',
			language: 'javascript'
			//,
			//theme: 'tomorrow_night_blue'
		})
		var aceWin = new Ext.Window({
			layout: 'fit',
			title: "模版编辑",
			width: 800,
			height: 600,
			modal: true,
			hidden: true,
			items: [editor],
			listeners: {
				move: function(me, x, y) {
					this.moveZone(me, x, y);
				}
			}
		});
		init_def_platformControlData();

		aceWin.height = this.getHeight();
		aceWin.width = this.getWidth();
		var me = this;
		aceWin.closeFn = function() {
			//修复ace tooltip还存在的问题
			Ext.select('.Ace-Tern-tooltip').remove();
			var oldValue = this.view.getValue();
			var newValue = editor.getValue();
			if(newValue) {
				try {
					this.view.setValue(newValue);
				} catch(ex) {
					console.log('属性解析出错！')
				}
			} else {
				newValue = undefined;
				this.view.setValue(undefined)
			};
			if(oldValue !== newValue) {
				this.view.fireEvent("change", this.view, newValue, oldValue);
			}

		};
		aceWin.on('close', aceWin.closeFn, this)

		Ext.defer(function() {
			var value = me.view.getValue() || "";
			//对于tpl属性特殊处理
			if(me.config.name == "tpl")
				value = value.replace(/',/g, "',\n")
			editor.value = value;
			aceWin.show();
			Ext.defer(function() {
				editor.focus();
				value && editor.initCodeFormatJs(editor.language,
					function() {
						editor.formatting();
					})
			}, 150)
		}, 50)
	}
});
xds.Config.Editor.html = Ext.extend(xds.Config.Editor.js, {
	edit: function() {
		var editor = new vmd.comp.Ace({
			language: 'html'
		})
		var win = new Ext.Window({
			title: "html代码编写",
			modal: true,
			maximized: false,
			height: 600,
			width: 800,
			maximizable: true,
			resizable: true,
			bodyStyle: "background-color:#fff",
			items: [editor],
			listeners: {
				move: function(me, x, y) {
					this.moveZone(me, x, y);
				}
			}

		});
		var me = this;
		// win.height = this.getHeight();
		// win.width = this.getWidth();
		Ext.defer(function() {
			editor.value = me.view.getValue() || '';
			win.show();
			Ext.defer(function() {
				editor.focus();
				editor.initCodeFormatJs(editor.language,
					function() {
						editor.formatting();
					})
			}, 100)

		}, 50);
		//关闭
		win.closefn = function() {
			var newValue = editor.getValue() || "";
			var oldValue = this.view.getValue();
			if(oldValue !== newValue) {
				this.view.setValue(newValue);
				this.view.fireEvent("change", this.view, newValue, oldValue);
			}
		};
		win.on('close', win.closefn, this);
	}
});
xds.Config.Editor.style = Ext.extend(xds.Config.Editor.js, {
	edit: function() {
		var editor = new vmd.comp.Ace({
			/*必须加id（itemId）不然add操作会重复累加dom结构*/
			id: 'ace_style',
			itemId: 'abc',
			language: 'css'
			//,
			//theme: 'tomorrow_night_blue'
		})
		var aceWin = new Ext.Window({
			layout: 'fit',
			title: "样式编辑",
			width: 600,
			height: 500,
			modal: true,
			items: [editor],
			listeners: {
				move: function(me, x, y) {
					this.moveZone(me, x, y);
				}
			}
		});
		var me = this;
		aceWin.closefn = function() {
			//修复ace tooltip还存在的问题
			Ext.select('.Ace-Tern-tooltip').remove();

			var newValue = editor.getValue();
			if(newValue) {
				//提取style内部的内容
				newValue = newValue.trim();
				newValue = newValue.replace(/[\r\n|\n|\r]/g, "");
				//截取规范内的字符串
				//val = val.substring(val.indexOf('style{'), val.indexOf('}'));
				// val = val.replace(/style|{|}/g, '').trim();

				var regStyle = /style\s*{(.[^}]*)}/;
				var isLegal = regStyle.test(newValue);
				if(isLegal) {
					newValue = RegExp.$1;
					newValue = newValue && newValue.trim();
				} else {
					newValue = undefined;
				}
			} else {
				newValue = undefined;
			}
			var oldValue = this.view.getValue();
			if(oldValue !== newValue) {
				this.view.setValue(newValue);
				this.view.fireEvent("change", this.view, newValue, oldValue);
			}
		};
		aceWin.on('close', aceWin.closefn, this)

		Ext.defer(function() {
			Ext.defer(function() {
				editor.gotoLine(2);
				editor.focus();
			}, 150)
			var value = me.view.getValue() || "";
			var rule = "/*在下方填写样式规则*/"
			var cssStr = String.format("style{\n{0}\n}", value);
			editor.value = cssStr;
			aceWin.show();

			value && editor.initCodeFormatJs(editor.language,
				function() {
					editor.formatting();
				})

		}, 50)
	}
});
xds.Config.Editor.css = Ext.extend(xds.Config.Editor.style, {});
xds.Config.Editor.ace = Ext.extend(xds.Config.Editor, {
    init: function () {
        var me = this;
		xds.Config.Editor.ace.superclass.init.call(this);
		this.view.readOnly = true;
		this.view.un('focus');
		this.view.on("focus", function(p) {
		    //this.edit();
		    var me = this;
		    Ext.defer(function () {
		        me.setPropDesc("Event");
		    },50)
		    
            
		}, this);
		this.view.on('afterrender', function () {
           this.el.on("dblclick", function (p) {
		        me.edit();
		    }, this);
		})
		

	},
	edit: function() {

		var editor = new vmd.comp.Ace({
			id: "ace_code"
		});
		var aceWin = new Ext.Window({
			title: "事件编辑",
			id: "aceWin",
			width: 900,
			height: 600,
			modal: true,
			maximizable: true,
			maskStyle: 'opacity:0.7',
			layout: 'border',
			draggable: false,
			listeners: {
				move: function(me, x, y) {
					this.moveZone(me, x, y);
				}

			}
		});
		var me = this;
		aceWin.closeFn = function() {
			//修复ace tooltip还存在的问题
			Ext.select('.Ace-Tern-tooltip').remove();
			var val = aceWin.val;
			if(aceWin.script == val) {
				return;
			}
			Ext.Msg.confirm("提示", "脚本已改变是否保存?", function(btn) {
				if(btn == 'no') return;
				var click_label = me.view.originalValue ? me.view.originalValue:(me.component.id + "_" + me.config.name);
				/* if (!me.view.getValue()) {
				     me.view.setValue(click_label);
				     me.view.fireEvent("change", me.view, click_label, "");
				 }*/
				if(val.trim()) {
					//if(val.search(new RegExp("function\\s+" + click_label + "\\s*?\\(")) == -1) {
					//	click_label = undefined;
					//}
					me.view.setValue(click_label);
					me.view.fireEvent("change", me.view, click_label, "");
					xds.vmd.events = val;
				} else {
					click_label = undefined;
					me.view.setValue(click_label);
					me.view.fireEvent("change", me.view, click_label, "");
					delete xds.vmd.events
				}
			})
		}

		//mafei 在ide-automachjs中
		init_def_platformControlData();
		//重置高度和宽度
		aceWin.height = this.getHeight();
		aceWin.width = this.getWidth();
		aceWin.on('close', aceWin.closeFn, this)
		//当前拖拽组件
		window.setTimeout(function() {
			window.setTimeout(function() {
				//代码编辑器初始化
				if(typeof rowIndex == "number") {
					aceWin.aceline = rowIndex;
					//editor.gotoLine(rowIndex);
					//editor.focus();
				}
			}, 150)
			var code = xds.vmd.events;
			var eventName = me.view.getValue() || me.component.id + "_" + me.config.name;

			var getdefaulteventname = function() {
				var params = me.config.params || "";
				if(params) params = "," + params;
				return "function(sender" + params + "){\n\n}";
			}
			var m = getdefaulteventname(),
				code = code ? code : "",
				replaceStr = "function {0}{1}",
				regex = new RegExp("function\\s+" + eventName + "\\s*?\\(");
			if(eventName && code.search(regex) == -1) {
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
			myMask.show()
			aceWin.loading = myMask
			aceWin.update("<iframe  id='iframe_page' src='" + vmd.virtualPath + "/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw63cd4471.html?" + Date.parse(new Date()) + "' width=100% height=100% frameborder=0  ></iframe>")

			var scriptArr = code.split("\n"),
				rowIndex = null;
			Ext.each(scriptArr,
				function(o, p) {
					if(o.search(regex) != -1) {
						rowIndex = p + 2;
						return false
					}
				});
		}, 50)
	}
});
xds.Config.Editor.defineWindow = Ext.extend(xds.Config.Editor, {
	init: function() {
		xds.Config.Editor.ace.superclass.init.call(this);
		this.view.readOnly = true;
		this.view.on("focus", function(p) {
			this.edit();
		}, this);

	},
	edit: function() {
		var win = new Ext.Window({
			title: "自定义",
			modal: true,
			maximized: false,
			height: 600,
			width: 800,
			maximizable: true,
			resizable: true,
			bodyStyle: "background-color:#fff",
			listeners: {
				move: function(me, x, y) {
					this.moveZone(me, x, y);
				}
			}
		});
		var me = this;
		Ext.defer(function() {
			var wincfg = me.config.edConfig || {},
				_r = new Date().getTime();
			Ext.apply(win, wincfg);

			if(!win.cache) {
				_r = '';
			}
			var _dhx = '?r=' + _r;
			if(wincfg.url && wincfg.url.indexOf('?') != -1) {
				_dhx = '&r=' + _r;
			}
			win.html = "<iframe src='" + wincfg.url + _dhx + "' frameborder=0 scrolling=no style='height:100%;width:100%'></iframe>";
			win.show();
		}, 50)
		//关闭

		win.closefn = function() {
			var subWin = win.el.query('iframe')[0].contentWindow;
			var newValue = this.vmdReturnValue || subWin.vmdReturnValue;
			var oldValue = this.view.getValue();
			if(!win.isCover) return;

			var edconfig = this.config && this.config.edConfig
			if(edconfig && Ext.isFunction(edconfig.callback)) edconfig.callback(newValue, this);
			//vmdReturnValue为string时直接返回，当为object时，格式为{props:{name:'',id:'',style:''}}
			if(typeof newValue == "object") {
				//分为属性，变量、数据集等
				var props = newValue.props;
				if(props) {
					for(var key in props) {
						newValue = props[key];
						if(key == this.config.name) {
							this.view.setValue(newValue);
							if(oldValue !== newValue) {
								this.view.fireEvent("change", this.view, newValue, oldValue);
							}
						} else {
							//下来进行优化
							//var cmpConf = this.component.configs.map[key], _viewId = cmpConf.viewId;
							//this.name = key;
							//cmpConf.setValue(this.component, newValue);
							var view = xds.activecmpEdView.get(xds.vmd.propName + key);
							if(view) {
								view.setValue(newValue);
								if(oldValue !== newValue) {
									view.fireEvent("change", view, newValue, oldValue);
								}
							}

						}

					}
				}

			} else {
				this.view.setValue(newValue);
				//if(oldValue !== newValue) {
				//	this.view.fireEvent("change", this.view, newValue, oldValue);
				//}
				if (oldValue !== newValue) {
				    this.view.fireEvent("change", this.view, newValue, oldValue);

				    //数据集选中后同步name
				   /* try {
				        var _id = xds.vmd.propName + 'storeConfig';
				        var dsName = Ext.decode(newValue).name;
				        var orginalDsName = Ext.decode(oldValue).name;
				        if (this.component && this.component.cid == 'vmdJsonStore' && this.view.id == _id && dsName != orginalDsName) {
				            //id修改
				            var view = Ext.getCmp(xds.vmd.propName + 'id');

				            if (view) {
				                view.setValue(newValue);
				                if (oldValue !== newValue) {
				                    view.fireEvent("change", view, dsName, this.component.id);
				                }
				            }


				        }
				    } catch (ex) { }
                    */

				}

			}

		}

		window.edValue = {}
		for(var key in this.component.configs.map) {
			var item = this.component.configs.map[key];
			window.edValue[key] = item.getValue(this.component);
		}

		//准备废掉
		window.edClose = function(isCover) {
			//if (isCover == null) isCover = true;
			win.isCover = isCover;
			win.close();
		};
		window.edclose = function(returnValue) {

			if(returnValue != null) {
				win.isCover = true;
				me.vmdReturnValue = returnValue;
			} else win.isCover = false;
			win.close();
		}

		win.on('close', win.closefn, this)
	}
});
xds.Config.Editor.image = Ext.extend(xds.Config.Editor.defineWindow, {
	edit: function() {

		var src = this.view.value || '';
		this.config.edConfig = {
			url: bootPATH + '/js/plugins/image/index.html?path=' + src,
			height: 500,
			width: 690,
			title: '图片上传'
		}
		this.callParent();
	}

})

xds.Config.editors = {
	date: xds.Config.Editor.date,
	string: xds.Config.Editor.string,
	number: xds.Config.Editor.number,
	boolean: xds.Config.Editor.boolean,
	code: xds.Config.Editor.code,
	object: xds.Config.Editor.object,
	combo: xds.Config.Editor.combo,
	options: xds.Config.Editor.options,
	multiOptions: xds.Config.Editor.multiOptions,
	js: xds.Config.Editor.js,
	html: xds.Config.Editor.html,
	style: xds.Config.Editor.style,
	css: xds.Config.Editor.css,
	ace: xds.Config.Editor.ace,
	defineWindow: xds.Config.Editor.defineWindow,
	frame: xds.Config.Editor.frame,
	file: xds.Config.Editor.file,
	image: xds.Config.Editor.image

};
//end

xds.editorConfigs = new Ext.util.MixedCollection(false, function(a) {
	return a.name
});

xds.editorConfigs.addAll([new xds.Config.String({
	name: "name",
	ctype: "string",
	group: "(Designer)",
	getValue: function(a) {
		return(a.name == a.defaultName) ? a.id : a.name;
	},
	setValue: function(e, b) {
		var a = e.id;
		var d = xds.inspector.getNodeById(e.id);
		if(xds.canvas.selectedId == a) {
			xds.canvas.selectedId = b
		}
		d.setNodeId(b);
		d.setText(b)
	}
}), new xds.Config.String({
	name: "userXType",
	ctype: "string",
	group: "(Designer)",
	getValue: function(a) {
		return a.userXType
	},
	setValue: function(b, a) {
		b.userXType = a
	}
})]);
xds.dockConfigs = new Ext.util.MixedCollection(false, function(a) {
	return a.name
});
xds.dockConfigs.addAll([new xds.Config.String({
	name: "dock",
	ctype: "string",
	group: "(Designer)",
	editor: "options",
	options: ["(none)", "bbar", "tbar", "fbar"],
	getValue: function(a) {
		return a.dock
	},
	setValue: function(b, a) {
		if(a == "(none)") {
			a = undefined
		}
		b.dock = a;
		b.setSuffix(a);
		xds.fireEvent("componentchanged")
	}
})]);
xds.commonConfigs = ["id", "itemId", "title", "text", "layout", "width",
	"height", "autoScroll", "url", "name", "fieldLabel", "iconCls"
];
xds.MainMenu = Ext.extend(Ext.Toolbar, {
	id: "app-menu",
	defaults: {
		minWidth: 42
	},
	initComponent: function() {
		this.items = [{
			text: "File",
			menu: [xds.actions.newAction, "-", xds.actions.openAction,
				"-", xds.actions.saveAction,
				xds.actions.saveAsAction
			]
		}, {
			text: "Project",
			menu: [xds.actions.newCmpAction,
				xds.actions.deleteCmpAction
			]
		}, {
			text: "Help",
			menu: [xds.actions.help, "-", xds.actions.aboutXds]
		}];
		xds.MainMenu.superclass.initComponent.call(this)
	}
});
xds.actions = {
	saveAction: new Ext.Action({
		iconCls: "icon-project-save",
		itemText: "Save Project",
		tooltip: designer.toolbar.save,
		text: designer.toolbar.save,
		handler: function() {
			xds.project.save()
		}
	}),
	saveAsAction: new Ext.Action({
		iconCls: "icon-project-saveas",
		itemText: "Save Project As...",
		tooltip: designer.toolbar.saveAs,
		text: designer.toolbar.saveAs,
		handler: function() {
			xds.project.saveAs()
		}
	}),
	//新建工程
	newAction: new Ext.Action({
		//iconCls: "icon-project-new",
		itemText: designer.toolbar.New,
		tooltip: designer.toolbar.New,
		text: designer.toolbar.New,
		handler: function() {
			designer.mode = "module";
			xds.vmd.clear();
			//xds.vmd.events = "";
			xds.project.close(function() {
				var content = {
					"components": [{
						"cid": "viewport",
						"name": "MyViewport",
						"layoutConfig": {},
						"userConfig": {
							"layout": "absolute"
						}
					}, {
						cid: 'vmddataset'
					}, {
						cid: 'vmdvariable'
					}]
				};
				var a = new xds.Project(content);
				a.open();
			})

		}
	}),
	newUxCmpAction: new Ext.Action({
		//iconCls: "icon-project-new",
		itemText: designer.toolbar.NewComp,
		tooltip: designer.toolbar.NewComp,
		text: designer.toolbar.NewComp,
		itemId: 'newuxcmp',
		handler: function() {
			xds.vmd.newUxCmp();

		}
	}),
	openAction: new Ext.Action({
		iconCls: "icon-project-open",
		itemText: designer.toolbar.open,
		tooltip: designer.toolbar.open,
		text: designer.toolbar.open,
		handler: function() {
			xds.project.close(function() {
				xds.File.openProject(function(b) {
					var a = new xds.Project(b);
					a.open()
				})
			})
		}
	}),
	newCmpAction: new Ext.Action({
		iconCls: "icon-cmp-new",
		tooltip: designer.toolbar.add,
		itemText: designer.toolbar.add,
		text: designer.toolbar.add,
		handler: function() {
			var a = new xds.CWindow({
				title: designer.toolbar.add
			});
			a.show()
		}
	}),
	deleteCmpAction: new Ext.Action({
		iconCls: "icon-cmp-delete",
		tooltip: designer.toolbar.del,
		disabled: true,
		itemText: designer.toolbar.del,
		text: designer.toolbar.del,
		handler: function() {
			xds.inspector.removeComponent(xds.active.component)
		}
	}),
	help: new Ext.Action({
		iconCls: "icon-about",
		tooltip: designer.toolbar.help,
		itemText: designer.toolbar.del.help,
		text: designer.toolbar.del.help,
		handler: function() {}
	}),
	aboutXds: new Ext.Action({
		tooltip: designer.toolbar.about,
		itemText: designer.toolbar.about,
		handler: function() {}
	}),
	viewJson: new Ext.Action({
		iconCls: "icon-view-json",
		itemText: designer.CJsonWindow.title,
		tooltip: designer.CJsonWindow.title,
		text: designer.CJsonWindow.title,
		handler: function() {

			xds.project.viewJoson();
		}
	}),
	preview: new Ext.Action({
		iconCls: "icon-view-json",
		tooltip: "点击预览",
		text: "预览",
		handler: function() {

			xds.project.preview();

		}
	})
};
xds.Component = Ext.extend(Ext.util.Observable, {
	isContainer: false,
	isVisual: true,
	ids: {},
	nameSuffix: "",
	filmCls: "",
	flyoutCls: "",
	minWidth: 10,
	minHeight: 10,
	snapToGrid: 10,
	showGrid: true,
	constructor: function(a) {
		Ext.apply(this, a);
		this.name = this.name || this.defaultName;

		this.id = this.id || this.nextId();
		//mafei 防止id重复
		var me = this;
		//if (!this.ids[this.id])
		//    this.ids[this.id] = this;
		//else {
		//    this.id = this.nextId();
		//    this.ids[this.id] = this;
		//}

		this.userConfig = this.userConfig || {};
		if(this.enableFlyout) {
			this.flyoutCls = "xds-flyout"
		}
	},
	setOwner: function(a) {
		if(this.owner && !a) {
			this.setName(this.id)
		}
		this.owner = a;
		delete this.config
	},
	setConfig: function(a, b) {
		var originalId = this.id;
		this.userConfig[a] = b;
		if(this.config && !Ext.isEmptyObject(this.config)) {
			this.config[a] = b
		}
		//mafei 
		if(this.config && this.config.height == "") {
			delete this.config.height
		}
		if(this.config && this.config.width == "") {
			delete this.config.width
		}
		//处理id变化组件删不掉的问题
		if(a == "id") {
			var originalNode = xds.inspector.nodeHash[originalId];

			if(originalNode) {
				delete xds.inspector.nodeHash[originalId];

			}
			//this.node = null;
			//this.id = b;
			//var newNode = this.getNode();
			//this.node = newNode;

			var originalFilm = Ext.get('film-for-' + originalId);
			if(originalFilm) {
				originalFilm.id = "film-for-" + b;
				originalFilm.dom.id = "film-for-" + b;
				var filmCache = Ext.elCache['film-for-' + originalId];
				if(filmCache) {
					var newCache = {
						data: filmCache.data,
						el: filmCache.el,
						events: filmCache.events
					};
					delete Ext.elCache['film-for-' + originalId];

					//Ext.elCache['film-for-' + b] = newCache;
				}

			}

			if(this.node) {

				this.node.ui.elNode.setAttribute('ext:tree-node-id', b);
				this.node.id = b;
				this.node.text = b;
				xds.inspector.nodeHash[b] = this.node;

			}
		}
		var flag = false;
		if(a == "id" ||
			a == "itemId" ||
			(a == "name" && !this.getConfigValue("id") && !this
				.getConfigValue("itemId"))) {
			this.setName(b);
			flag = true;
		}
		if(a == "name" && !flag && xds.vmd.repeatRootTypes().indexOf(this.cid) != -1) {

			this.name = b;
			this.getNode().setText(b + this.nameSuffix)
		}
		if(a == "layout") {
			delete this.layoutConfig;
			xds.props.refresh.defer(100, xds.props);
			if(xds.Layouts[b] && xds.Layouts[b].onInit) {
				xds.Layouts[b].onInit(this.getNode())
			}
		}
	},
	getSnapToGrid: function(a) {
		return !this.snapToGrid ? "(none)" : this.snapToGrid
	},
	setSnapToGrid: function(b, a) {
		this.snapToGrid = a == "(none)" ? 0 : parseInt(a, 10)
	},
	setName: function(a) {
		//if (this.ids[a]) {

		//    return false;
		//} else {
		//    delete this.ids[this.id];
		//    this.ids[a] = this;
		//}
		this.name = a;
		//20171124
		if(xds.vmd.repeatRootTypes().indexOf(this.cid) == -1) {

			this.id = a; //同步id
		}
		//this.id = a;//同步id
		this.getNode().setText(a + this.nameSuffix)
	},
	//id默认设置
	getConfig: function() {
		//mafei新增4.2基类后需要兼容config
		if(!this.config || Ext.isEmptyObject(this.config)) {
			//if (!this.config) {
			this.config = Ext.apply({
				xtype: this.xtype,
				id: this.id

			}, this.defaultConfig);
			this.initConfig(this.config, this.owner);
			Ext.apply(this.config, this.userConfig)
		}
		return this.config
	},
	getLayoutCfg: function() {
		var i = 0;
		for(p in this.layoutConfig) i++;
		if(i > 0)
			return xds.copy(this.layoutConfig);
	},
	//序列化转换
	getJsonConfig: function(a) {
		//节点可以重复
		var hasRepeatNode = function(cid) {
			if(xds.vmd.repeatRootTypes().indexOf(cid) != -1) {
				return true;
			}
			return false;
		}

		var c = null;
		if(!c) {
			c = Ext.apply({
				xtype: this.xtype,
				dock: this.dock,
				name: (this.name == this.defaultName) ? this.id : (this.name || this.defaultName),
				id: this.id,
				xcls: this.xcls,
				layoutConfig: this.getLayoutCfg()
				//userConfig : xds.copy(this.userConfig)
			}, this.defaultConfig);

			//20171121
			if(c.id && hasRepeatNode(this.cid)) {
				delete c.id;
			}

			this.initConfig(c, this.owner);
			Ext.apply(c, this.userConfig)

			//mafei 构造序列化对象
			var me = this;
			if(!c.listeners) {

				//先找到组将定义对象，然后从配置中找到事件中是否含有该属性，最后动态构造events
				var all = xds.Registry.all;

				Ext.each(all.items, function(cmp, index) {
					// cmp = new cmp();
					cmp = cmp.prototype;
					if(cmp.xcls == c.xcls) {
						var configs = cmp.configs.items;
						for(var key in me.userConfig) {
							Ext.each(configs, function(conf) {
								//修复高度、宽度百分比不起作用
								// if (!c.height) delete c.height;
								// if (!c.width) delete c.width;

								if(c[conf.name] == "" && typeof c[conf.name] == "string") delete c[conf.name]

								if(me.userConfig[key] && conf.name == key && conf.group == "事件") {
									//修复在代码编辑器中删除其他事件引发的解析错误
									if(xds.vmd.events) {
										if(xds.vmd.events.indexOf(c[key]) == -1) {
										    delete me.userConfig[key];
										    delete me.config[key]
										}
									}
									if(!me.userConfig[key]) return;

									
									var obj = {};
									//c.listeners[key] = me.userConfig[key] + "_vmdlisteners";
									/*if (key == "afterrender" || key == "beforerender") {
									    xds.vmd.eventDict[key].put(c.id, { cmpId: c.id, eventName: key, eventMethod: me.userConfig[key] })
									    
									} else {
									    if (!c.listeners) c.listeners = {};
									    c.listeners[key] = me.userConfig[key] + "_vmdlisteners";
									}*/


                                    //20180526
									if (!c.listeners) c.listeners = {};
									if (key == "afterrender")
									    c.listeners['vmd'+key] = me.userConfig[key] + "_vmdlisteners";
									else c.listeners[key] = me.userConfig[key] + "_vmdlisteners";
									return false;
								}
							})
						}

						return false;
					}
				})
			}
		}
		if(this.userXType) {
			c.userXType = this.userXType
		}
		if(a) {
			var f = this.getNode();
			if(f.hasChildNodes()) {
				c.cn = [];
				for(var b = 0, e; e = f.childNodes[b]; b++) {
					if(!e.component.dropHide) {
						//不可见元素不添加到viewport结构中
						c.cn.push(e.component.getJsonConfig(true))
					}

				}
			}
		}
		return c;
	},
	getConfigValue: function(a) {
		return this.getConfig()[a]
	},
	isSet: function(a) {
		return this.userConfig[a] !== undefined
	},
	initConfig: function(b, a) {},
	nextId: function() {
		return Ext.getCmp("structure").nextId(this.naming)
	},
	getNode: function() {
		if(!this.node) {
			var b = this.attrs = {
				id: this.id,
				text: //!this.owner
					//? this.id
					//: (this.name || this.defaultName),
					(this.name == this.defaultName) ? (this.id || this.defaultName) : this.name,
				iconCls: this.iconCls,
				leaf: true
			};
			if(this.isContainer) {
				b.leaf = false;
				b.children = [];
				b.expanded = true
			}

			this.node = new Ext.tree.TreeNode(b);
			this.node.component = this
		}
		return this.node
	},
	getFilm: function() {
		return Ext.get("film-for-" + this.id)
	},
	isValidChild: function(a, b) {
		if(this.isContainer) {
			if(this.validChildTypes) {
				return this.validChildTypes.contains(a)
			}
			return xds.Registry.get(a).prototype.isVisual !== false
		}
		return false
	},
	isValidParent: function(a) {
		return this.isVisual ? true : !!a
	},
	getConfigs: function() {
		return this.configs
	},
	getConfigObject: function(b) {
		if(this.configs.map[b]) {
			return this.configs.map[b]
		} else {
			var d = this.getLayoutConfigs();
			if(d && d.map[b]) {
				return d.map[b]
			} else {
				var a = this.getEditorConfigs();
				if(a && a.map[b]) {
					return a.map[b]
				} else {
					var c = this.getContainerConfigs();
					if(c) {
						return c.map[b]
					}
				}
			}
		}
	},
	getContainerConfigs: function() {
		var a = this.getConfigValue("layout");
		if(a && a != "auto") {
			return xds.Layouts[a].layoutConfigs
		}
		return null
	},
	setContainerConfig: function(a, b) {
		this.layoutConfig = this.layoutConfig || {};
		this.layoutConfig[a] = b
	},
	getContainerConfigValue: function(a) {
		return this.layoutConfig ? this.layoutConfig[a] : undefined
	},
	getLayoutConfigs: function() {
		if(this.owner) {
			var a = this.owner.getConfigValue("layout");
			if(a && a != "auto") {
				return xds.Layouts[a].configs
			}
		}
		return null
	},
	getCommonConfigs: function() {
		if(!this.configs.common) {
			this.configs.common = this.configs.filterBy(function(a) {
				return xds.commonConfigs.indexOf(a.name) !== -1
			})
		}
		return this.configs.common
	},
	getEditorConfigs: function() {
		if(this.owner) {
			return false
		}
		//mafei 默认去掉树根节点userXType和name
		return false;
		//return xds.editorConfigs
	},
	createCanvasConfig: function(f) {
		var e = Ext.apply({}, this.getConfig());
		e.xtype = this.dtype;
		e.stateful = false;
		e.viewerNode = f;
		if(this.layoutConfig) {
			e.layoutConfig = Ext.apply({}, this.layoutConfig)
		}
		if(this.snapToGrid && this.showGrid && e.layout == "absolute") {
			var b = "xds-grid-" + this.snapToGrid;
			e.bodyCssClass = e.bodyCssClass ? e.bodyCssClass + b : b
		}
		this.activeCmpId = e.id = Ext.id();
		if(f.hasChildNodes()) {
			e.items = [];
			for(var d = 0, a = f.childNodes.length; d < a; d++) {
				if(!this.assignDocked(e, f.childNodes[d])) {
					//mafei 扩展不可见组件不在设计器上显示
					var node;
					node = f.childNodes[d].component
						.createCanvasConfig(f.childNodes[d]);
					if(!f.childNodes[d].component.dropHide) {
						e.items.push(node)
					}

					// e.items.push(f.childNodes[d].component
					//      .createCanvasConfig(f.childNodes[d]))
				}
			}
			if(e.items.length < 1) {
				delete e.items
			}
		}
		return e
	},
	getActions: function() {
		return null
	},
	setSuffix: function(b, a) {
		//设置后缀
		a = a || "loaded";
		if(!b) {
			delete this.nameSuffix
		} else {
			this.nameSuffix = ' <i class="xds-suffix-' + a + '">&nbsp;' +
				b + "&nbsp;</i>"
		}
		this.setName(this.name)
	},
	assignDocked: function(a, b) {
		//分配dock模式
		b = b.component ? b.component : b;
		if(b.dock) {
			a[b.dock] = b.createCanvasConfig(b.getNode());
			return true
		}
		return false
	},
	syncFilm: function() {
		if(this.isVisual !== false) {
			var a = Ext.getCmp(this.activeCmpId);
			if(a) {
				a.syncFilm()
			}
		}
	},
	getExtComponent: function() {
		return Ext.getCmp(this.activeCmpId)
	},
	isResizable: function() {
		return false
	},
	onFilmClick: Ext.emptyFn,
	getLabel: function(f) {
		var a;
		var d = this.getExtComponent();
		if(d) {
			var c = d.el.up(".x-form-item", 3);
			if(c) {
				a = c.down(".x-form-item-label")
			}
			var b = d.el.next(".x-form-cb-label");
			if(a && a.getRegion().contains(f.getPoint())) {
				return {
					el: a,
					name: "fieldLabel"
				}
			} else {
				if(b && b.getRegion().contains(f.getPoint())) {
					return {
						el: b,
						name: "boxLabel"
					}
				}
			}
		}
		return null
	},
	onFilmDblClick: function(b) {
		var a = this.getLabel(b);
		if(a) {
			xds.canvas.startEdit(this, a.el, this
				.getConfigObject(a.name))
		}
	},
	onSelectChange: function(a) {
		this.selected = a
	},
	onFilmMouseDown: function(a) {
		if(this.enableFlyout && a.getTarget("b", 1)) {
			this.delegateFlyout(a)
		}
	},
	delegateFlyout: function(a) {
		if(this.enableFlyout) {
			if(!this.flyout) {
				this.getNode().select();
				this.flyout = this.onFlyout(a);
				if(this.flyout && !this.flyout.isVisible()) {
					this.flyout
						.showBy(this.getFlyoutButton(), "tl-tr?")
				}
			} else {
				this.flyout.destroy()
			}
		}
	},
	getFlyoutButton: function() {
		var a = this.getFilm();
		return a ? a.child("b") : null
	},
	hasConfig: function(a, b) {
		return this.getConfigValue(a) === b
	},
	getInternals: function(a, b, idIgnore) {
		if(b) this.cid = designer.prefix.cmp + this.name; //区分复合组件
		//mafei 修复序列化后加载组件id和name不对应的问题，去掉name改为id
		var d = {
			cid: this.cid,
			id: //!this.owner
				//? this.id
				//: (this.name || this.defaultName),
				(this.name == this.defaultName) ? this.id : this.name,
			dock: this.dock,
			layoutConfig: xds.copy(this.layoutConfig),
			userConfig: xds.copy(this.userConfig)
		};

		if(idIgnore) {
			delete d.id;
			delete d.userConfig.id;
		}

		//20171121
		if(xds.vmd.repeatRootTypes().indexOf(this.cid) != -1) {
			d.name = d.id;
			delete d.id;
		}
		if(this.userXType) {
			d.userXType = this.userXType
		}
		if(a) {
			var f = this.getNode();
			//mafei 201709 //区分复合组件,参数b当前模式状态
			if(f.hasChildNodes() && !b) {
				d.cn = [];
				for(var b = 0, e; e = f.childNodes[b]; b++) {
					//d.cn.push(e.component.getInternals(true))
					d.cn.push(e.component.getInternals(true, null, idIgnore));
				}
			}
		}
		return d
	},
	getDefaultInternals: function() {
		return {
			cid: this.cid
		}
	},
	getSpec: function() {
		return this.spec || this.getDefaultInternals()
	},
	beforeRemove: function() {
		if(this.flyout) {
			this.flyout.destroy()
		}
	},
	isAnchored: function() {
		var a = this.owner ? this.owner.getConfigValue("layout") : "";
		return a && this.getConfigValue("anchor") &&
			(a == "form" || a == "anchor" || a == "absolute")
	},
	isFit: function() {
		var a = this.owner ? this.owner.getConfigValue("layout") : "";
		return a == "fit" || a == "card"
	},
	setComponentX: function(b, a) {
		b.setPosition(a)
	},
	setComponentY: function(a, b) {
		a.setPosition(undefined, b)
	},
	//begin (chengtao) 2018-01-10  添加 
	getPropPanelItem: function() {

		var confgs = [];
		var haveconfgs = {};
		var f = [];
		var m = this.configs.items;

		var d = this.getConfig();
		for(var h = 0, n = m.length, e, j; h < n; h++) {
			e = m[h].name;
			if(!haveconfgs[e]) {
				m[h].viewid = xds.vmd.propName + e;
				confgs.push(m[h]);
				haveconfgs[e] = e;
			}

			j = m[h].group;
			f.push(new xds.PropertyRecord({
				name: e,
				value: d[e],
				group: j
			}, xds.vmd.propName + e));
		}
		var b = this.getLayoutConfigs();
		if(b) {
			b = b.items;
			for(var h = 0, n = b.length, e; h < n; h++) {
				e = b[h].name;
				if(!haveconfgs[e]) {
					b[h].viewid = xds.vmd.propName + e;
					confgs.push(b[h]);
					haveconfgs[e] = e;
				}
				f.push(new xds.PropertyRecord({
					name: e,
					value: d[e],
					group: b[h].group
				}, xds.vmd.propName + e))
			}
		}
		var m = this.getContainerConfigs();
		if(m) {
			m = m.items;
			for(var h = 0, n = m.length, e; h < n; h++) {
				e = m[h].name;
				if(!haveconfgs[e]) {
					m[h].viewid = "Container-" + xds.vmd.propName + e;
					confgs.push(m[h]);
					haveconfgs[e] = e;
				}
				var a = new xds.PropertyRecord({
					name: e,
					value: m[h].getValue(this),
					group: m[h].group
				}, "Container-" + xds.vmd.propName + e);
				a.configType = "Container";
				f.push(a)
			}
		}
		//if (this.showCommon) {
		//    var m = this.getCommonConfigs();
		//    if (m) {
		//        m = m.items;
		//            confgs = confgs.concat(m);
		//        for (var h = 0, n = m.length, e; h < n; h++) {
		//            e = m[h].name;
		//            var a = new xds.PropertyRecord({
		//                name: e,
		//                value: m[h].getValue(this),
		//                group: "(Common)"
		//            }, "Common-" + e);
		//            a.configType = "Common";
		//            f.push(a)
		//        }
		//    }
		//}
		var l = this.getEditorConfigs();
		if(l) {
			l = l.items;
			for(var h = 0, n = l.length, e; h < n; h++) {
				e = l[h].name;
				if(!haveconfgs[e]) {
					l[h].viewid = xds.vmd.propName + e;
					confgs.push(l[h]);
					haveconfgs[e] = e;
				}
				f.push(new xds.PropertyRecord({
					name: e,
					value: l[h].getValue(this),
					group: l[h].group
				}, xds.vmd.propName + e))
			}
		}

		var v = this.viewConfig;
		if(!v) {
			v = this.getOriginalPropPanel(confgs);
		}
		return {
			view: v,
			record: f
		};
	},
	getOriginalPropPanel: function(confgs) {
		var propGroups = {};

		xds.activecmpEdView = new Ext.util.MixedCollection();

		Ext.each(confgs, function(item) {
			if(item.viewid == (xds.vmd.propName + "id")) {
				return;
			}
			var group;
			if(propGroups[item.group]) {
				group = propGroups[item.group];
			} else {
				group = {
					xtype: 'fieldset',
					title: item.group,
					collapsible: true,
					border: false,
					labelWidth: 80,
					isAuto: true,
					defaults: {
						anchor: '99%'
					},
					defaultType: 'textfield', //默认类型  
					items: []
				};
				propGroups[item.group] = group;
			}
			var propitem = item.getView(this);
		    //增加组件类的标识方便对复合组件的引用查找
			if (propitem.name=='xtype') propitem.readOnly = true;
			group.items.push(propitem);
		}, this);
		//复合组件id不可修改
		var _isReadOnly = function() {

			if(xds.active.component.id == xds.inspector.root.firstChild.id && xds.vmd.isUx()) return true;
			return false;
		}
		var propItems = {
			xtype: "form",
			title: '属性',
			layout: 'form',
			header: false,
			border: false,
			labelWidth: 80,
			autoHeight: true,
			autoWidth: true,
			defaults: {
				autoHeight: true,
				anchor: '99%'
			},
			defaultType: 'textfield',
			cls: 'vmd-prop',
			isAuto: true,
			items: [{
				id: xds.vmd.propName + "id",
				fieldLabel: 'id',
				labelAlign: 'right',
				style: 'padding:5px 0px',
				name: 'id',
				readOnly: _isReadOnly(),
				//regex: /^\w+$/,
				//regexText:'id只能由字母和数字组成！',
				enableKeyEvent: true, //2018-01-25
				listeners: {
					"specialkey": function(field, e) {
						if(e.keyCode == 13) {
							field.onBlur();
							field.el && field.el.dom.blur()
						}
					}
				}
			}]
		};
		var eventTimes = {
			title: '事件',
			layout: 'form',
			cls: 'vmd-event',
			// labelAlign: 'right',
			autoScroll: true,
			autoHeight: true,
			autoWidth: true,
			header: false,
			border: false,
			labelWidth: 80,
			isAuto: true,
			defaults: {
				anchor: '98%'
			},
			defaultType: 'textfield',
			items: []
		};
		for(var pname in propGroups) {
			var item = propGroups[pname];
			if(propGroups.hasOwnProperty(pname)) { //过滤
				if(pname == "事件") {
					eventTimes.items = item.items;
				} else {
					//if (pname != "Ext.Container" && pname != "Ext.layout.AbsoluteLayout") {
					propItems.items.push(item);
					//}
				}
			}
		};
		return {
			id: "proptabpanel",
			xtype: 'tabpanel',
			activeTab: 0,
			defaults: {
				bodyStyle: 'padding:5px'
			},
			cls: 'vmd-propPanel',
			items: [{
				id: "tab-props",
				title: '属性',
				layout: 'fit',
				border: false,
				xtype: "panel",
				autoScroll: true,
				items: [propItems]
			}, {
				id: "tab-events",
				title: '事件',
				layout: 'fit',
				border: false,
				xtype: "panel",
				autoScroll: true,
				items: [eventTimes]
			}, {
				id: "tab-css",
				title: '样式',
				layout: 'fit',
				border: false,
				xtype: "panel",
				autoScroll: true,
				items: []
			}],
			listeners: {
			    beforetabchange: function (tp, p, c) {
                    if(p.getId() == 'tab-css') {
						if(!vmd.cssWin) {
							vmd.cssWin = new Ext.Window({
								layout: 'fit',
								title: "样式编辑",
								width: 800,
								height: (document.body.clientHeight - 50),
								modal: true,
								hidden: true,
								closeAction: 'hide',
								items: [{
									xtype: 'vmd.ace',
									itemId: 'ace_css',
									language: 'css',
									value: xds.vmd.css || ''
								}]
							})
							vmd.cssWin.on('hide', function() {

								xds.vmd.css = vmd.cssWin.getComponent('ace_css').getValue();
							})
						}
						vmd.cssWin.show();
						return false;

					}

				},
			    beforerender: function () {
			        
                    this.activeTab = xds.vmd._activePropTab || 0;
				},
				tabchange: function (tabpanel, tab) {
				    xds.vmd._activePropTab = tabpanel.items.keys.indexOf(tab.id);
				}
			}

		};
	}
	//end
});
xds.Component.getFilmEl = function() {
	var a = this.getPositionEl();
	if(this.fieldLabel) {
		return this.el.up(".x-form-item") || a
	}
	return a
};
xds.Component.isValidDrop = function (a, b) {
    var dragCmp = xds.Registry.all.get(b.cid);
    var dragCmpFn;
    if (dragCmp) {
        dragCmpFn = dragCmp.prototype.isValidDrop;
    }
    if (Ext.isFunction(dragCmpFn)) {
        return a != b && (!a || dragCmpFn(a));
    }
	return a != b && (!a || a.isValidChild(b.cid)) && b.isValidParent(a)
};
//组件注册
xds.Registry = function() {
	var a = new Ext.util.MixedCollection(true, function(d) {
		return d.prototype.cid
	});
	var b = Ext.extend(Ext.data.JsonStore, {
		constructor: function() {
			b.superclass.constructor.call(this, {
				id: "cid",
				fields: [{
						name: "id",
						mapping: "cid"
					}, "xtype", "xcls", "typeDef", "text",
					"iconCls", "naming", "category",
					"isVisual"
				]
			})
		}
	});
	var c = null;
	return {
		register: function(f) {
			a.add(f);
			f.prototype.__xdclass = f;
			var g = f.prototype.configs || [];
			f.prototype.configs = f.configs = new Ext.util.MixedCollection(
				false,
				function(h) {
					return h.name
				});
			//begin (chengtao) 2018-01-16添加  属性分组
			var v = f.prototype.vmdConfigs || [];
			var groups = {};
			for(var e = 0, d = v.length; e < d; e++) {
				var item = v[e];
				for(var i = 0, j = item.items.length; i < j; i++) {
					groups[item.items[i].name] = item.items[i];
					groups[item.items[i].name].group = item.title;
				}
			}
			//end
			for(var e = 0, d = g.length; e < d; e++) {
				//mafei 20171021 对样式统一采用ace编辑器处理
				if(!g[e]) break;
				switch(g[e].name) {
					case 'style':
						if(!g[e].editor)
							g[e].editor = "style";
						break;
					case 'bodyStyle':
						if(!g[e].editor)
							g[e].editor = "style";
						break;
					case 'html':
						if(!g[e].editor)
							g[e].editor = "html";
						break;
				}
				//begin (chengtao) 2018-01-16添加  属性分组
				if(groups[g[e].name]) {
					var item = groups[g[e].name];
					Ext.apply(g[e], item);
				}
				//end
				try {
					f.configs.add(new xds.Config.types[g[e].ctype](g[e]))

				} catch(ex) {

					console.log(f.prototype.cid + '组件设计模式加载失败,错误属性：' + g[e].name)
				}

			}
			//对于隐藏的组件不增加统一事件
			if(f.prototype.isInvisible || f.prototype.dropHide || f.prototype.isNotComponent) {
				return;
			}

			//修复统一增加的事件初次加载无效的bug
			f.configs.add(new xds.Config.types['string']({
				name: 'beforerender',
				group: '事件',
				ctype: 'string',
				editor: 'ace'
			}));
			f.configs.add(new xds.Config.types['string']({
				name: 'afterrender',
				group: '事件',
				ctype: 'string',
				editor: 'ace'
			}))

			//对公共样式统一处理
			var pcss = [{
				name: 'style',
				group: '外观',
				ctype: 'string',
				editor: 'style'
			},{
			    name: 'xtype',
			    group: '类标识',
			    ctype: 'string'
		    
			}];
			var filterCid = ['gridcolumn', 'checkcolumn', 'numbercolumn', 'datecolumn', 'templatecolumn'],
                cid = f.prototype.cid;
			
		    if (filterCid.indexOf(cid) == -1)
			    Ext.each(pcss, function(item) {
				    if(f.configs && f.configs.keys.indexOf(item.name) == -1) {
					    f.configs.add(new xds.Config.types['string'](item));
				    }
			    })

		},
		unregister: function(d) {
			a.remove(d)
		},
		get: function(d) {
			return a.get(d)
		},
		all: a,
		createStore: function(g) {
			if(!c) {
				c = [];
				for(var e = 0, d = a.items.length; e < d; e++) {
					c.push(a.items[e].prototype)
				}
			}
			var f = new b();
			f.loadData(c);
			if(g) {
				f.filter("isVisual", true)
			}
			return f
		},
		addUserType: function(d) {
			this.userTypes = this.userTypes || [];
			this.userTypes.push(d)
		}
	}
}();
//mafei画板窗体设计器
xds.Canvas = Ext.extend(Ext.Panel, {
	constructor: function() {
		xds.canvas = this;
		xds.on("componentselect", this.onComponentSelect, this, {
			delay: 10
		});
		if(!xds.vmd.params.debug()) designer.Source.UITitle = ""
		xds.Canvas.superclass.constructor.call(this, {
			title: designer.Source.UITitle,
			id: "canvas",
			region: "center",
			baseCls: "x-plain",
			layout: "auto",
			bodyStyle: "padding:0px;position:relative;left:0;top:0;",
			items: new Ext.Panel({
				baseCls: "x-plain"
			}),
			autoScroll: true,
			bregion: new Ext.lib.Region(0, 0, 0, 0),
			rregion: new Ext.lib.Region(0, 0, 0, 0),
			cregion: new Ext.lib.Region(0, 0, 0, 0)
		})
	},
	afterRender: function() {
		xds.Canvas.superclass.afterRender.call(this);
		//以下为拖拽、移动的核心
		this.body.on("mousedown", this.onBodyMouseDown, this);
		//点击属性显示
		this.body.on("click", this.onBodyClick, this);
		//右键菜单
		this.body.on("contextmenu", this.onBodyContextMenu, this);
		this.body.on("mouseover", this.onBodyOver, this, {
			buffer: 50
		});
		this.body.on("mousemove", this.onBodyMove, this);
		this.body.on("dblclick", this.onBodyDblClick, this);
		Ext.getBody().on("mouseover", this.onDocOver, this);
		//拖拽核心
		//左侧可以拖到右侧
		this.dropZone = new xds.Canvas.DropZone(this);
		//拖拽调整
		this.dragTracker = new xds.Canvas.DragTracker({
			el: this.body
		})
	},
	isFlyoutBtnClick: function(b) {
		if(this.selectedId) {
			var c = xds.inspector.getNodeById(this.selectedId);
			if(c) {
				var a = c.component.getFlyoutButton();
				if(a && a.getRegion().contains(b.getPoint())) {
					return c.component
				}
			}
		}
		return false
	},
	onBodyMouseDown: function(b, a, d) {
		if(d = this.isFlyoutBtnClick(b)) {
			d.delegateFlyout(b);
			return
		}
		var d = this.findTarget(b);
		if(d) {
			d.component.onFilmMouseDown(b)
		}
	},
	onBodyDblClick: function(b, a) {
		var d = this.findTarget(b);
		if(d) {
			d.component.onFilmDblClick(b)
		}
	},
	onBodyClick: function(d, b) {

		if(this.isFlyoutBtnClick(d)) {
			return
		}
		if(d.target == this.body.dom) {
			xds.inspector.getSelectionModel().clearSelections();
			return
		}
		var f = this.findTarget(d);
		if(f) {
			var a = f.component.selected;
			if(f.component.onFilmClick(d, a) !== false) {
				xds.fireEvent("componentclick", {
					component: f.component,
					node: f,
					event: d
				})
			}
		}
	},
	onBodyOver: function(b, a) {
		if(a = b.getTarget(".el-film", 2)) {
			if(a != this.overFilm) {
				this.overFilm = Ext.get(a);
				this.overFilm.addClass("el-film-over")
			}
		}
	},
	onBodyMove: function(g, k) {
		//鼠标移动处理
		if((k = g.getTarget(".el-film", 2))) {
			if(g.getTarget("b", 1)) {
				var j = Ext.get(k);
				j.setStyle("cursor", "default");
				this.dragTracker.setDragMode("Absolute");
				return
			}
			var h = this.getTargetComponent(k);
			if(h) {
				var j = Ext.get(k);
				var f = j.lastRegion;
				var d = 7;
				var n = g.getPoint();
				var m = h.component.isResizable("Corner", g);
				var i = this.bregion;
				i.top = f.bottom - d;
				i.left = f.left;
				i.right = f.right - (m ? d : 0);
				i.bottom = f.bottom;
				if(i.contains(n) &&
					h.component.isResizable("Bottom", g)) {
					this.dragTracker.setDragMode("Bottom");
					j.setStyle("cursor", "s-resize");
					return
				}
				var a = this.rregion;
				a.top = f.top;
				a.left = f.right - d;
				a.right = f.right;
				a.bottom = f.bottom - (m ? d : 0);
				if(a.contains(n) &&
					h.component.isResizable("Right", g)) {
					this.dragTracker.setDragMode("Right");
					j.setStyle("cursor", "e-resize");
					return
				}
				var h = this.cregion;
				h.top = f.bottom - d;
				h.left = f.right - d;
				h.right = f.right;
				h.bottom = f.bottom;
				if(m && h.contains(n)) {
					this.dragTracker.setDragMode("Corner");
					j.setStyle("cursor", Ext.isAir ?
						"move" :
						"se-resize");
					return
				}
				j.setStyle("cursor", "default")
			}
			this.dragTracker.setDragMode("Absolute")
		}
	},
	onBodyContextMenu: function(d) {
		d.preventDefault();
		var b = this.findTarget(d, false);
		if(b) {
			var f = this.getTargetComponent(b);
			if(f) {
				if(f.component && f.component.config.xtype == 'viewport') return;
				var a = xds.inspector.getContextMenu();
				f.select();
				a.node = f;
				a.showAt(d.getXY())
				//重置菜单位置最高
				//a.el && a.el.setStyle('z-index', a.zIndex)
			}
		}
	},
	onDocOver: function(a) {
		if(this.overFilm && !a.within(this.overFilm)) {
			this.overFilm.removeClass("el-film-over");
			delete this.overFilm
		}
	},
	beginUpdate: function() {
		this.updating = true
	},
	endUpdate: function(a) {
		this.updating = false;
		if(this.updateCmp && a !== true) {
			this.setComponent(this.updateCmp)
		}
	},
	setComponent: function(b) {

	    var that=this;
		if(this.updating) {
			this.updateCmp = b;
			return
		}
		if(b && b.getOwnerTree) {
			b = this.createConfig(b)
		}
		var a = this.items.items[0];

		if(a) {

			if(a.viewerNode) {
				//mafei 20171113 防止选择节点出现空白问题
				if(b && b.viewerNode && (b.viewerNode.component.isInvisible || b.viewerNode.component.cid == "vmdWorkFlow")) {
					return
				}
				a.viewerNode.component.beforeRemove()
			}
			this.remove(a)
		}
		if(b) {
			//检查加载的模块中是否有缺失复合组件的问题
			var clsmgr = function(alias) {
				var registerCmp = Ext.ComponentMgr.types[alias.replace('widget.', '')];
				return Ext.ClassManager.maps.aliasToName[alias] || registerCmp && registerCmp.$className || '';
			}
			
			var missclsinfo = {}
			var checkClass = function(item) {
				if(!item) return
				var xtype = item.xtype;
				if(xtype) {
					var widget = 'widget.' + xtype
					if(!clsmgr(widget)) {
						if(!missclsinfo.cls) missclsinfo.cls = [];
						missclsinfo.cls.push(xtype);
						return
					}
				}
				if(item.items) {
					item.items.forEach(function(t, i) {
						checkClass(t);
					})
				}

			}
			//mafei 20180419
			checkClass(b);
			if(missclsinfo.cls) {

			    //vmd.alert('组件文件丢失', '以下组件class不存在<br>' + missclsinfo.cls.join(',') + '<br><b>模块无法打开，请联系组件开发人员!</b>');
                //对嵌套复合组件的处理方案，需要异步等待完成后再render画步
			    var statefn = function () {
			        var state = true;
			        var unloadcls = missclsinfo.cls;
			        unloadcls.forEach(function (xtype) {
			            var widget = 'widget.' + xtype
			            state = state&&clsmgr(widget);
			        })
			        return state;
			    }
			    var runner = new Ext.util.TaskRunner();
			    var taskRun = function () {
			        if (statefn()) {
			            runner.stop(task); //停止 任务
                        //重新刷新
                        that.setComponent(b)
			            
			        }

			    }
			    var task = {
			        run: taskRun,
			        interval: 100,
			        duration: 10000
			    }
			    runner.start(task);
			    return;
			}

			var d = this.add(b);
			Ext.lib.Event.suspend();
			this.doLayout();
			//debugger
			d.show();
			Ext.lib.Event.resume();
			this.syncAll.defer(50, this)

		}
	},
	clear: function() {
		this.setComponent(null)
	},
	setComponentFromNode: function(a) {
		this.setComponent(this.createConfig(a))
	},
	createConfig: function(a) {
		return a.component.createCanvasConfig(a)
	},
	onComponentSelect: function(a) {

		this.setSelected(a.node ? a.node.id : null);
		if(a.component && this.editData &&
			a.component != this.editData.component) {
			this.stopEdit()
		}
	},
	setSelected: function(d, activeObj) {
		if(this.selectedId != d) {
			var a = Ext.get("film-for-" + this.selectedId);
			if(a) {
				a.removeClass("el-film-selected");
				a.setStyle('z-index', (parseInt(a.getStyle("z-index")) - 1))
			} else {
				var c = Ext.get("chld-for-" + this.selectedId);
				if(c) {
					c.up(".xds-floater").removeClass("chld-selected")
				}
			}
		}
		//mafei 20171204 修复浮动点击不起作用bug
		//if (this.selectedId && (this.selectedId == d)) return;
		this.selectedId = d;

		if(d) {
			var b = Ext.get("film-for-" + this.selectedId);
			if(b) {

				//修复选中效果边框加粗后出现滚动条的问题
				var target = this.getTargetComponent(b);
				var activeCmp = target && target.component;
				var activeCmpType = activeCmp.config && activeCmp.config.xtype;
				if(activeCmpType != 'viewport')
					b.addClass("el-film-selected");
				else
					b.addClass("el-film-selected e-film-viewport");
				b.setStyle('z-index', (parseInt(b.getStyle("z-index")) + 1));

			} else {
				var c = Ext.get("chld-for-" + this.selectedId);
				if(c) {
					c.up(".xds-floater").addClass("chld-selected")
				}
			}
		}
	},
	syncAll: function() {
		if(xds.active && xds.active.topNode) {
			xds.active.topNode.cascade(function() {
				this.component.syncFilm()
			})
		}
		this.setSelected(this.selectedId)
	},
	getTargetComponent: function(b) {
		var a = b.id.substr(9);
		return xds.inspector.getNodeById(a)
	},
	findTarget: function(c, b) {
		var a = c.getTarget(".el-film", 2) ||
			c.getTarget(".xds-child-target", 2);
		if(a && b !== false) {
			return this.getTargetComponent(a)
		}
		return a
	},
	getInlineEditor: function() {
		if(!this.inlineEd) {
			this.inlineEd = new Ext.Editor({
				alignment: "l-l?",
				completeOnEnter: true,
				autoSize: "width",
				zIndex: 60000,
				shadow: "drop",
				shadowOffset: 3,
				cls: "x-small-editor",
				field: {
					selectOnFocus: true
				},
				ignoreNoChange: false,
				doAutoSize: function() {
					if(typeof this.requestedWidth == "number") {
						this.setSize(this.requestedWidth)
					} else {
						this.setSize(this.boundEl.getWidth())
					}
				}
			});
			this.inlineEd.on("complete", this.onEditComplete, this)
		}
		return this.inlineEd
	},
	stopEdit: function() {
		if(this.inlineEd && this.inlineEd.editing) {
			this.inlineEd.completeEdit()
		}
	},
	startEdit: function(f, e, a, c) {
		var g = this.editData;
		if(g && g.component == f && g.el == e && g.config == a) {
			return
		}
		this.stopEdit();
		this.editData = {
			component: f,
			el: e,
			config: a
		};
		var b = this.getInlineEditor();
		b.requestedWidth = c;
		b.startEdit(e, a.getValue(f))
	},
	onEditComplete: function(a, b, c) {
		if(String(b) != String(c)) {
			if(xds.active &&
				xds.active.component == this.editData.component) {
				xds.props.setValue(this.editData.config.name, b)
			} else {
				this.editData.config.setValue(this.editData.component,
					b)
			}
		}
		delete this.editData
	},
	originalXY: function() {
		//mafei 20180412 修复拖拽组件超过边界后闪动问题
		var canvasBody = xds.canvas.bwrap.first();
		if(canvasBody) {
			var scrollXY = canvasBody.getScroll();
			xds.canvas.overflowScroll = {
				left: scrollXY.left,
				top: scrollXY.top
			}
		}
	}
});
xds.Canvas.DropZone = Ext.extend(Ext.dd.DropZone, {
	constructor: function(a) {
		this.allowContainerDrop = false;
		xds.Canvas.DropZone.superclass.constructor.call(this, a.bwrap, {});
		this.canvas = a;
		this.dragOverData = {};
		this.lastInsertClass = "xds-no-status"
	},
	//关联左侧树能够拖拽
	ddGroup: "TreeDD",
	getTargetFromEvent: function(a) {
		return a.getTarget(".xds-child-target", 2) ||
			a.getTarget(".el-film", 2) || this.canvas
	},
	isValidDropPoint: function(g, b, d) {
		var a = g ? g.component : null;
		var f = b.node.component || b.node.instance;
		return xds.Component.isValidDrop(a, f)
	},
	onNodeEnter: function(d, a, c, b) {},
	onNodeOver: function(h, a, f, d) {
		var g = this.canvas.getTargetComponent(h);
		if(h == this.canvas) {
			return this.isValidDropPoint(g, d, f) ?
				"xds-dd-new" :
				this.dropNotAllowed
		}
		var b = d.node;
		if(this.isValidDropPoint(g, d, f)) {
			return "xds-dd-add"
		} else {
			return this.dropNotAllowed
		}
	},
	onNodeOut: function(d, a, c, b) {},
	/*
	 * @param {object} h dom对象
	 *@param {object} a 拖拽对象
	 *@param {object} e 拖拽e
	 *@param {object} d 拖拽dragData
	 */
	onNodeDrop: function(h, a, f, d) {
		var g = h == this.canvas ? null : this.canvas
			.getTargetComponent(h);
		var b = d.node;
        
		if(this.isValidDropPoint(g, d, f)) {
		    this.canvas.lastDropPoint = f.getPoint();
            //mafei 20180621 修复支持资源的拖拽（图片）
		    var type, cmp,conf;
		    conf={
		        type: b.component?"move":"new",
		        parentId: g ? g.id : null,
		        component: b.component?
                    b.component:
                    b.instance.getSpec(),
		        instacne: b.instance
		    }
		    
		    if (b.isDragCopy) {
		        conf.type = 'new';
		        conf.spec = b.spec;
		    } else if (b.isDragSetPropValue) {
		        conf.type = 'setvalue';
		    }

			//触发该动作有组件选中和重新渲染动作
		    xds.fireEvent("componentevent", conf);
		    delete this.canvas.lastDropPoint;

		    //解决删除组件后组件结构树节点不展开的问题
		    xds.inspector && xds.inspector.root.expand(true);
			return true
		} else {
			return false
		}
	}
});
xds.Canvas.DragTracker = Ext.extend(Ext.dd.DragTracker, {
	autoStart: true,
	preventDefault: false,
	dragMode: "Absolute",
	setDragMode: function(a) {
		if(!this.active && !this.waiting) {
			this.dragMode = a
		}
	},
	onMouseUp: function(a) {
		this.waiting = false;
		xds.Canvas.DragTracker.superclass.onMouseUp.call(this, a)
	},
	isAbsolute: function(a) {
		return(a.component.owner && a.component.owner.getConfigValue("layout") == "absolute")
	},
	onBeforeStart: function(b) {
		var a = b.getTarget(".el-film", 2);
		this.snapValue = false;
		if(a && !b.getTarget("b", 1)) {
			this.node = xds.canvas.getTargetComponent(a);
			this.cmp = this.node.component;

			if(this.dragMode == "Absolute") {
				if(this.isAbsolute(this.node)) {
					this.pos = this.cmp.getExtComponent().getPosition(true);
					this.snapValue = this.node.component.owner.snapToGrid;
					this.startX = this.pos[0];
					this.startY = this.pos[1];
					this.waiting = true;
					return true
				}
			} else {
				this.startSize = this.cmp.getExtComponent().getSize();
				this.waiting = true;
				if(this.isAbsolute(this.node)) {
					this.snapValue = this.node.component.owner.snapToGrid
				}
				return true
			}
		}
		return false
	},
	onStart: function(a) {
		this.waiting = false;
		this.node.select();
		this.cmp.getExtComponent().film.addClass("el-film-drag")
	},
	onDrag: function(a) {
		this["onDrag" + this.dragMode](a, this.getOffset(), this.cmp
			.getExtComponent())
	},
	onDragAbsolute: function(b, c, a) {
		a.setPosition(this.snap(this.startX - c[0]), this.snap(this.startY -
			c[1]));
		a.syncFilm()
	},
	onDragRight: function(b, c, a) {
		a.setWidth(Math.max(this.cmp.minWidth, this.snap(this.startSize.width -
			c[0])));
		a.syncFilm()
	},
	onDragBottom: function(b, c, a) {
		a.setHeight(Math.max(this.cmp.minHeight, this
			.snap(this.startSize.height - c[1])));
		a.syncFilm()
	},
	onDragCorner: function(b, c, a) {
		a.setSize(Math.max(this.cmp.minWidth, this.snap(this.startSize.width -
			c[0])), Math.max(this.cmp.minHeight, this
			.snap(this.startSize.height - c[1])));
		a.syncFilm()
	},
	onEnd: function(b) {
		xds.canvas.originalXY();

		var a = this.cmp.getExtComponent();
		a.film.removeClass("el-film-drag");
		this["onEnd" + this.dragMode](b, this.getOffset(), a);
		if(a.ownerCt && a.ownerCt.layout) {
			delete a.anchorSpec;
			a.ownerCt.doLayout()
		}
	},
	onEndAbsolute: function(b, c, a) {
		var d = a.getPosition(true);
		d[0] = this.snap(d[0]);
		d[1] = this.snap(d[1]);
		xds.canvas.beginUpdate();
		this.cmp.setConfig("x", d[0]);
		this.cmp.setConfig("y", d[1]);
		xds.props.setValue("x", d[0]);
		xds.props.setValue("y", d[1]);
		xds.canvas.endUpdate(true);
		xds.fireEvent("componentchanged")
	},
	onEndRight: function(c, d, b) {
		xds.canvas.beginUpdate();
		var a = b.getWidth();
		this.cmp.setConfig("width", a);
		xds.props.setValue("width", a);
		xds.canvas.endUpdate(true);
		xds.fireEvent("componentchanged")
	},
	onEndBottom: function(c, d, b) {
		xds.canvas.beginUpdate();
		var a = b.getHeight();
		this.cmp.setConfig("height", a);
		xds.props.setValue("height", a);
		xds.canvas.endUpdate(true);
		xds.fireEvent("componentchanged")
	},
	onEndCorner: function(d, f, c) {
		xds.canvas.beginUpdate();
		var b = c.getWidth();
		this.cmp.setConfig("width", b);
		xds.props.setValue("width", b);
		var a = c.getHeight();
		this.cmp.setConfig("height", a);
		xds.props.setValue("height", a);
		xds.canvas.endUpdate(true);
		xds.fireEvent("componentchanged")
	},
	snap: function(c, b) {
		b = b || this.snapValue;
		if(b < 1 || !c) {
			return c
		}
		var e = c,
			d = b;
		var a = c % d;
		if(a > 0) {
			if(a > (d / 2)) {
				e = c + (d - a)
			} else {
				e = c - a
			}
		}
		return e
	}
});
//右侧属性面板///////////   begin (chengtao) 2018-01-04 调整
xds.ConfigEditor = Ext.extend(Ext.Panel, {
	constructor: function() {
		var self = this;
		this.propStore = new xds.PropertyStore();

		this.form = new xds.PropPanel(this.propStore);

		self.form.on('afterrender', function() {

			self.form.el.on("contextmenu", self.onRowContext, self);

		})
		var formPanel = this.form;
		xds.ConfigEditor.superclass.constructor.call(this, {
			id: "props",
			region: "south",
			margins: "0 0 0 0",
			title: designer.ConfigEditor.title,
			layout: "fit",
			border: false,
			//items: this.form,
			items: [{
			    xtype: "panel",
			    layout: "fit",
			    border: false,
			    height: 100,
			    region: "center",
                items:this.form
			 },
			 {
			    id: 'propDesc',
			    xtype: "panel",
				border: false,
				height: 55,
				region: "south",
				split: true,
				collapseMode: 'mini',
				minHeight: 10,
				autoScroll: true,
                bodyStyle:'padding:0 3px'
			 }],
            layout:'border',
			disabled: true,
			split: true,
			height: Math.round(Ext.lib.Dom.getViewportHeight() *
				0.5),
			tools: [{
				id: "expand-all",
				handler: function() {
					this.form.expand();
				},
				qtip: "全部展开",
				scope: this
			}, {
				id: "collapse-all",
				handler: function() {
					this.form.collapse();
				},
				qtip: "全部收缩",
				scope: this
			}]
		})
	},
	findRecord: function(b) {
	    var a = null;
	    var store = this.propStore.store;
	    store.each(function (c) {
			if(c.data.name == b) {
				a = c;
				return false
			}
		});
		return a
	},
	findType: function(c) {
		var b = xds.configs[xds.active.component.xcls].configs;
		for(var d = 0, a = b.length; d < a; d++) {
			if(b[d].name == c) {
				return b[d].type
			}
		}
		return "String"
	},
	addAndEdit: function(c, d, e) {
		var b = xds.active.component.config;
		if(e !== undefined || b[c] === undefined) {
			b[c] = e !== undefined ? this.convertForType(d, e) : this
				.getDefaultForType(d);

			this.grid.setComponent(b);
			this.propStore.setComponent(b);

			//this.form.setComponent(b);
		}
		if(e === undefined) {
			var a = this.findRecord(c);
			if(a) {
				this.grid.startEditing.defer(10, this.grid, [this.propStore.store.indexOf(a), 1])
			}
		} else {
			xds.fireEvent("componentchanged")
		}
	},
	getDefaultForType: function(a) {
		a = a.toLowerCase();
		switch(a) {
			case "string":
				return "";
			case "boolean":
				return false;
			case "number":
				return 0;
			default:
				return ""
		}
	},
	convertForType: function(a, b) {
		a = a.toLowerCase();
		switch(a) {
			case "string":
				return "" + b;
			case "boolean":
				return !(b === false || b === "0" || b === "false");
			case "number":
				return b === "" ? 0 : parseInt(b, 10);
			default:
				return b
		}
	},
	onRowContext: function(a, c, b) {

		if(!this.contextMenu) {
			this.contextMenu = new Ext.menu.Menu({
				items: [{
					text: "删除",
					iconCls: "icon-delete",
					handler: function() {
						xds.active.component
							.getConfigObject(this.contextProperty)
							.setValue(xds.active.component,
								undefined);
						this.refresh();
						xds.fireEvent("componentchanged")
					},
					scope: this
				}, "-", {
					text: "刷新值ֵ",
					iconCls: "icon-refresh",
					handler: this.refresh,
					scope: this
				}]
			})
		}
		var field = c && (c.htmlFor || c.id)
		if(field) {
			c = this.propStore.store.indexOfId(field);
			this.contextProperty = this.propStore.store.getAt(c).data.name;
			this.contextMenu.items.items[0].setText("删除" +
				this.contextProperty);
			this.contextMenu.showAt(a.getXY());
			a.stopEvent()
		}

	},
	refresh: function() {
		if(xds.active) {
			var a = xds.active.component;
			a.propStore = this.propStore;
			var ac = a.getPropPanelItem();
			//debugger

			this.propStore.setComponent(a, ac.record);
			this.form.setComponent(a, ac.view);
			this.form.bindDataStore(this.propStore.store);
		} else {
			this.form.clear();
		}
	},
	setValue: function(c, b) {
		var a = this.propStore.store.getById(c);
		if(a) {
			a.set("value", b)
		} else {
			this.propStore.store.each(function(a) {
				if(a.data.name == c) {
					a.set("value", b)
				}
			});
		}
	}
});
//end
xds.Inspector = Ext.extend(Ext.tree.TreePanel, {
	constructor: function() {
		xds.inspector = this;
		xds.Inspector.superclass.constructor.call(this, {
			id: "structure",
			region: "center",
			split: true,
			height: 300,
			minHeight: 120,
			autoScroll: true,
			margins: "0 0 0 0",
			title: designer.ConfigEditor.ComponentInspector,
			trackMouseOver: false,
			animate: false,
			autoScroll: true,
			useArrows: true,
			enableDD: true,
			border: false,
			rootVisible: false,
			tools: [{
				id: "expand-all",
				qtip: designer.Toolbox.expandall,
				handler: function() {
					this.root.expand(true)
				},
				scope: this
			}, {
				id: "collapse-all",
				qtip: designer.Toolbox.collapseall,
				handler: function() {
					this.root.collapse(true)
				},
				scope: this
			}, {
				id: "refresh",
				qtip: designer.Toolbox.RepaintCanvas,
				handler: function() {
					xds.fireEvent("componentchanged")
				}
			}],
			keys: [{
				key: Ext.EventObject.DELETE,
				fn: function() {
					if(xds.active) {
						Ext.Msg.confirm(designer.ActionMsg.DeleteComponent, designer.ActionMsg.DeleteComponentMsg,
							function(a) {
								if(a == "yes" && xds.active) {
									xds.inspector.removeComponent(xds.active.component);
									//begin 2018-01-03 (chengtao)  添加 修复删除后组件在 画板上还存在的问题
									if(xds.active.component.removeComponent) {
										xds.active.component.removeComponent();
									}
									xds.fireEvent("componentchanged");
									//end
								}
							})
					}
				}
			}]
		})
	},
	initComponent: function() {
		this.loader = new xds.Inspector.DemoLoader();
		this.root = {
			id: "croot",
			async: true,
			expanded: true,
			allowDrag: false,
			text: "croot",
			allowDrop: false
		};
		this.on("nodedragover", this.onDragOver, this);
		this.on("beforeappend", this.onBeforeAppend, this);
		this.on("beforenodedrop", this.onBeforeDrop, this);
		this.on("nodedrop", this.onAfterDrop, this);
		this.on("contextmenu", this.onNodeContext, this);

		xds.on("componentevent", this.onComponentEvent, this);
		xds.on("componentclick", this.onComponentClick, this);
		this.getSelectionModel().on("selectionchange", function(c, b) {
			var a = b;

			//20171128
			if(Ext.fly('props_prop')) {
				if(!Ext.fly('props_prop').hasClass('x-btn-pressed')) {
					Ext.getDom('props_prop').click();
				}
			}
			//Ext.fly('props_event').removeClass('x-btn-pressed')
			while(a && a.parentNode != this.root) {
				a = a.parentNode
			}
			if(this.prevSelection) {
				this.prevSelection.onSelectChange(false);
				delete this.prevSelection
			}
			if(b && b.component) {
				b.component.onSelectChange(true);
				this.prevSelection = b.component
			}
			xds.fireEvent("componentselect", {
				component: b ? b.component : null,
				node: b,
				top: a ? a.component : null,
				topNode: a
			})
		}, this);
		xds.Inspector.superclass.initComponent.call(this)
	},
	onBeforeEdit: function(c, b, a) {
		return !this.getNodeById(b)
	},
	onEdit: function(c, b, a) {
		var d = this.editor.editNode
	},
	onComponentClick: function(a) {
		if(a.node) {
			a.node.select()
		}
	},
	onBeforeAppend: function(a, b, d) {
		var c;
		if(b.component && (c = b.component.getConfigValue("layout"))) {
			if(xds.Layouts[c] && xds.Layouts[c].onBeforeAdd) {
				xds.Layouts[c].onBeforeAdd(b, d)
			}
		}
	},
	removeComponent: function(b) {
		var a = b.attributes ? b : this.getNodeById(b.id);
		if(a) {
			if(a.isSelected()) {
				if(a.nextSibling) {
					a.nextSibling.select()
				} else {
					if(a.previousSibling) {
						a.previousSibling.select()
					} else {
						if(a.parentNode.component) {
							a.parentNode.select()
						} else {
							xds.canvas.clear()
						}
					}
				}
			}
			a.parentNode.removeChild(a);
			if(!this.root.hasChildNodes()) {
				xds.canvas.clear()
			}
		}
	},
	getContextMenu2: function(isHide) {

		if(!this.contextMenu2) {
			var a = this.contextMenu2 = new Ext.menu.Menu({
				zIndex: 80000,
				onContextShow: function() {

					var d = a.node.component.getActions();
					if(d) {

						for(var c = 0, b = d.length; c < b; c++) {
							a.add(d[c])
						}
					}
				},
				onContextClose: function() {
					var d = a.node.component.getActions();
					if(d) {
						// a.remove(a.items.get("actions-sep"));
						for(var c = 0, b = d.length; c < b; c++) {
							a.remove(a.items.get(d[c].initialConfig.itemId))
						}
					}
					a.node.ui && a.node.ui.removeClass("xds-context-node")
				}
			});
			a.on("beforeshow", a.onContextShow, a);
			a.on("hide", a.onContextClose, a)

		}
		return this.contextMenu2
	},
	getContextMenu3: function(cid) {

		var getText = function() {
			return cid == 'vmdvariable' ? designer.ContextMenu.newVariable : designer.ContextMenu.newDataSet
		}
		if(!this.contextMenu3) {
			var a = this.contextMenu3 = new Ext.menu.Menu({
				zIndex: 80000,
				items: [{
					itemId: 'new',
					text: getText(),
					iconCls: "icon-new",
					handler: function() {
						a.node.select()
						cid = this.parentMenu.cid || cid;
						switch(cid) {
							case 'vmddataset':
								xds.vmd.addNode([{
									cid: 'vmdJsonStore'
								}], xds.vmd.getRootNode(cid));
								break;
							case 'vmdvariable':
								xds.vmd.addNode([{
									cid: 'vmdVariable'
								}], xds.vmd.getRootNode(cid));
								break;
						}

					}
				}]
			})

		} else {
			this.contextMenu3.getComponent('new').setText(getText());

		}
		this.contextMenu3.cid = cid;

		return this.contextMenu3
	},
	getContextMenu: function(isHide) {
		if(!this.contextMenu) {
			var a = this.contextMenu = new Ext.menu.Menu({
				zIndex: 80000,
				items: [{
					text: designer.ContextMenu.SelectComponent,
					iconCls: "icon-cmp-view",
					handler: function() {
						a.node.select()
					}
				}, {
					itemId: "save-to-toolbox",
					text: designer.ContextMenu.SaveToToolbox,
					iconCls: "icon-save",
					handler: function() {

						debugger
						var mode = designer.mode;
						//定义组件类与模块区分开
						if(mode == "ux") {

							var code = SourceX.JonsScript(xds.project.getJson()[0]);
							vmd.core.script(code);
							//为了预览直接看效果
							xds.userControls.push(code);
							var root = a.node.component;
							var name = designer.prefix.cmp + root.name;
							//设计模式组件注册
							vmd.core.componentRegister(xds, name, root.name);

							var b = a.node.component.getInternals(true, true);
							b.naming = b.name || b.id;
							//防止拖拽id不自动变化的问题
							delete b.id;
							//序列化需要保留userConfig,非序列化直接解析去掉
							delete b.userConfig;
							xds.Registry.addUserType(b);
							xds.toolbox.loadUserTypes();
							var c = xds.toolbox
								.getNodeById("User_Components");
							if(c && c.lastChild) {
								c.lastChild.ensureVisible();
								c.lastChild.ui.highlight()
							}

						} else {
							var b = a.node.component.getInternals(true);
							b.naming = b.name;
							xds.Registry.addUserType(b);
							xds.toolbox.loadUserTypes();
							var c = xds.toolbox
								.getNodeById("User_Components");
							if(c && c.lastChild) {
								c.lastChild.ensureVisible();
								c.lastChild.ui.highlight()
							}
						}

					}
				}, "-", {
					itemId: "cmp-copy",
					text: designer.ContextMenu.Copy,
					handler: function() {

						//20171229
						var b = a.node.component.getInternals(true, null, true);
						//b.naming = b.name || b.id;

						//xds.vmd.addNode(b, a.node.parentNode)
						var newNode = xds.inspector.restore(b, a.node.parentNode);

						newNode.select();
						xds.fireEvent("componentchanged")
					}
				}, "-", {
					itemId: "move-up",
					text: designer.ContextMenu.MoveUp,
					handler: function() {
						a.node.parentNode.insertBefore(a.node,
							a.node.previousSibling);
						a.node.select();
						xds.fireEvent("componentchanged")
					}
				}, {
					itemId: "move-down",
					text: designer.ContextMenu.MoveDown,
					handler: function() {
						a.node.parentNode.insertBefore(a.node,
							a.node.nextSibling.nextSibling);
						a.node.select();
						xds.fireEvent("componentchanged")
					}
				}, "-", {
					text: designer.ContextMenu.Delete,
					iconCls: "icon-delete",
					handler: function() {
						xds.inspector.removeComponent(a.node.component);
						//20171128 chengbing  删除组件时，调用组件的删除方法
						if(a.node.component.removeComponent) {
							a.node.component.removeComponent();
						}
						xds.fireEvent("componentchanged")
					}
				}],
				onContextShow: function() {
					this.items.get("save-to-toolbox")
						.setDisabled(!!a.node.component.owner);
					this.items.get("move-up")
						.setDisabled(!a.node.previousSibling);
					this.items.get("move-down")
						.setDisabled(!a.node.nextSibling);
					a.node.ui.addClass("xds-context-node");
					var d = a.node.component.getActions();
					if(d) {
						a.add(new Ext.menu.Separator({
							id: "actions-sep"
						}));
						for(var c = 0, b = d.length; c < b; c++) {
							a.add(d[c])
						}
					}
				},
				onContextClose: function() {
					var d = a.node.component.getActions();
					if(d) {
						a.remove(a.items.get("actions-sep"));
						for(var c = 0, b = d.length; c < b; c++) {
							a.remove(a.items.get(d[c].initialConfig.itemId))
						}
					}
					a.node.ui && a.node.ui.removeClass("xds-context-node")
				}
			});
			a.on("beforeshow", a.onContextShow, a);
			a.on("hide", a.onContextClose, a)
		}
		return this.contextMenu
	},
	onNodeContext: function(c, b) {

		var hide;
		if(c && c.component) {
			if(xds.vmd.isDisabledContextMenu(c.component.cid) && !xds.vmd.params.debug()) {
				return
			}

		}
		//20180102
		var a;
		if(xds.vmd.isOnlyNewActionMenu(c.component.cid))
			a = this.getContextMenu2(hide);
		else {
			if(xds.vmd.varAndDatasetMenu(c.component.cid)) {
				if(xds.vmd.isUx()) return
				a = this.getContextMenu3(c.component.cid);
			} else
				a = this.getContextMenu(hide);
		}

		a.node = c;
		a.showAt(b.getXY());
		b.stopEvent()
	},
	nextId: function(b) {
		if(!this.getNodeById(b)) {
			return b
		}
		var a = 0;
		var cc;
		//while (this.getNodeById(b + (++a))) {
		//}
		while(this.getNodeById(b + (++a))) {
			//if (!cc) cc = this.getNodeById(b + a);

		}
		//mafei id重复
		//if (cc && cc.component.ids[b + a]) {

		//    while (this.getNodeById(b + (++a)) || cc.component.ids[b + a]) {
		//    }
		//}
		return b + a
	},
	onDragOver: function(a) {
		return xds.Component.isValidDrop(this
			.getDropPosition(a.target, a.point).parent.component,
			a.dropNode.component || a.dropNode.instance)
	},
	onBeforeDrop: function (d) {
        xds.canvas.originalXY();

		if(!xds.Component.isValidDrop(
				this.getDropPosition(d.target, d.point).parent.component,
				d.dropNode.component || d.dropNode.instance)) {
			return false
		}
		if(d.tree == d.source.tree) {
			if(!d.dropNode.component.owner) {
				this.initCopy(d.dropNode, d.target, d.point);
				d.dropStatus = true;
				return false
			}
			return true
		} else {
			if(d.dropNode) {
				d.dropStatus = true;
				var c = this.getDropPosition(d.target, d.point);
				var b = d.dropNode.instance.getSpec();
				var a = this.restore(b, c.parent, c.before);
				a.select();
				xds.fireEvent("componentchanged")
			}
		}
		return false
	},
	getDropPosition: function(b, a) {
		var c = {};
		switch(a) {
			case "above":
				c.parent = b.parentNode;
				c.before = b;
				break;
			case "below":
				c.parent = b.parentNode;
				c.before = b.nextSibling;
				break;
			default:
				c.parent = b
		}
		return c
	},
	onAfterDrop: function (a) {
        a.dropNode.select();
		a.dropNode.component.setOwner(a.dropNode.parentNode.component);
		xds.fireEvent("componentchanged")
	},
	onComponentEvent: function(c) {

		var b = c.parentId ? this.getNodeById(c.parentId) : this.root;
		if(c.type == "new") {
			//mafei20171114 扩展数据集、变量拖拽
			if(c.instacne && c.instacne.isVmdType) {
				var node = xds.vmd.getRootNode(c.instacne.isVmdType);
				//工作流特殊处理(只添加一次)
				if(c.component && c.component.cid == "vmdWorkFlow") {
					if(!node)
						b = this.root;
					else {
						return false;
					}
				} else {
					b = node || b;
				}

			}

			xds.canvas.originalXY();
			this.restore(c.spec || c.component, b).select();
			xds.fireEvent("componentchanged")
		} else {
			if(c.type == "move") {
				xds.canvas.originalXY();
				c.component.setOwner(b.component);
				var a = c.component.getNode();
				b.appendChild(a);
				a.select();
				xds.fireEvent("componentchanged")
			}
		}

	},
	initCopy: function(c, b, a) {
		Ext.Msg.show({
			title: "复制",
			msg: "复制组件到一个新的层是不可撤消的. 您是否要继续?",
			buttons: Ext.Msg.YESNOCANCEL,
			fn: function(d) {
				if(d == "yes") {
					var e = c.component.getInternals(true);
					var f = this.getDropPosition(b, a);
					this.restore(e, f.parent, f.before).select()
				} else {
					if(d == "no") {
						var f = this.getDropPosition(b, a);
						c.component.setOwner(f.parent.component);
						f.parent.insertBefore(c, f.before);
						c.select();
						xds.fireEvent("componentchanged")
					}
				}
			},
			scope: this
		})
	},
	restore: function(h, b, f) {
		try {
			b = b || this.root;
			var e = xds.create(h);

			delete e.cn;
			if(b) {
				e.setOwner(b.component)
			}
			var d = e.getNode();
			if(b) {
				b.insertBefore(d, f)
			}
			if(h.cn) {
				for(var a = 0, g; g = h.cn[a]; a++) {
					this.restore(g, d)
				}
			}
			return d

		} catch(ex) {}

	}
});
xds.Inspector.DemoLoader = Ext.extend(Ext.tree.TreeLoader, {
	load: function(a, b) {
		b()
	}
});

xds.Interface = Ext.extend(xds.Inspector, {

	constructor: function() {
		xds.interface = this;

		xds.Inspector.superclass.constructor.call(this, {
			id: "interface",
			region: "center",
			split: true,
			height: 300,
			minHeight: 120,
			autoScroll: true,
			margins: "0 0 0 0",
			trackMouseOver: false,
			animate: false,
			autoScroll: true,
			useArrows: true,
			enableDD: true,
			border: false,
			title: '对外接口设置',
			rootVisible: false,
			tools: [{
				id: "expand-all",
				qtip: designer.Toolbox.expandall,
				handler: function() {
					this.root.expand(true)
				},
				scope: this
			}, {
				id: "collapse-all",
				qtip: designer.Toolbox.collapseall,
				handler: function() {
					this.root.collapse(true)
				},
				scope: this
			}, {
				id: "refresh",
				qtip: designer.Toolbox.RepaintCanvas,
				handler: function() {
					xds.fireEvent("componentchanged")
				}
			}],
			keys: [{
				key: Ext.EventObject.DELETE,
				fn: function() {
					if(xds.active) {
						Ext.Msg.confirm(designer.ActionMsg.DeleteComponent, designer.ActionMsg.DeleteComponentMsg,
							function(a) {
								if(a == "yes" && xds.active) {
									xds.interface
										.removeComponent(xds.active.component)
								}
							})
					}
				}
			}]
		})
	},
	initComponent: function() {
		this.loader = new xds.Inspector.DemoLoader();
		this.root = {
			id: "iroot",
			async: true,
			expanded: true,
			allowDrag: false,
			text: "iroot",
			allowDrop: false
		};
		this.on("contextmenu", this.onNodeContext, this);

		xds.Inspector.superclass.initComponent.call(this)
	},
	hasPropGroupNodeById: function(id) {

		var flag = false;
		var propNodes = this.root.childNodes[0];
		Ext.each(propNodes.childNodes, function(item) {

			var cmp = item.component;
			if(cmp.cid == 'uxpropgroup' && cmp.id == id) {
				flag = true;
				return false;
			}
		})

		return flag;

	},
	getContextMenu: function(isHide) {
		if(!this.contextMenu) {
			var a = this.contextMenu = new Ext.menu.Menu({
				zIndex: 80000,
				items: [{
					itemId: "move-up",
					text: designer.ContextMenu.MoveUp,
					handler: function() {
						a.node.parentNode.insertBefore(a.node,
							a.node.previousSibling);
						a.node.select();
						xds.fireEvent("componentchanged")
					}
				}, {
					itemId: "move-down",
					text: designer.ContextMenu.MoveDown,
					handler: function() {
						a.node.parentNode.insertBefore(a.node,
							a.node.nextSibling.nextSibling);
						a.node.select();
						xds.fireEvent("componentchanged")
					}
				}, "-", {
					text: designer.ContextMenu.Delete,
					iconCls: "icon-delete",
					handler: function() {
						xds.interface.removeComponent(a.node.component);
						//20171128 chengbing  删除组件时，调用组件的删除方法
						if(a.node.component.removeComponent) {
							a.node.component.removeComponent();
						}
						xds.fireEvent("componentchanged")
					}
				}],
				onContextShow: function() {

					this.items.get("move-up")
						.setDisabled(!a.node.previousSibling);
					this.items.get("move-down")
						.setDisabled(!a.node.nextSibling);
					a.node.ui.addClass("xds-context-node");
					var d = a.node.component.getActions();
					if(d) {
						a.add(new Ext.menu.Separator({
							id: "actions-sep"
						}));
						for(var c = 0, b = d.length; c < b; c++) {
							a.add(d[c])
						}
					}
				},
				onContextClose: function() {
					var d = a.node.component.getActions();
					if(d) {
						a.remove(a.items.get("actions-sep"));
						for(var c = 0, b = d.length; c < b; c++) {
							a.remove(a.items.get(d[c].initialConfig.itemId))
						}
					}
					a.node.ui && a.node.ui.removeClass("xds-context-node")
				}
			});
			a.on("beforeshow", a.onContextShow, a);
			a.on("hide", a.onContextClose, a)
		}
		return this.contextMenu
	}
})


xds.Resource = Ext.extend(xds.Inspector, {

    constructor: function () {
        xds.resource = this;

        xds.Inspector.superclass.constructor.call(this, {
            id: "resource",
            region: "center",
            split: true,
            height: 300,
            minHeight: 120,
            autoScroll: true,
            margins: "0 0 0 0",
            trackMouseOver: false,
            animate: false,
            autoScroll: true,
            useArrows: true,
            enableDD: true,
            border: false,
            title: '引用的资源文件',
            rootVisible: false,
            tools: [{
                id: "expand-all",
                qtip: designer.Toolbox.expandall,
                handler: function () {
                    this.root.expand(true)
                },
                scope: this
            }, {
                id: "collapse-all",
                qtip: designer.Toolbox.collapseall,
                handler: function () {
                    this.root.collapse(true)
                },
                scope: this
            }, {
                id: "refresh",
                qtip: designer.Toolbox.RepaintCanvas,
                handler: function () {
                    xds.fireEvent("componentchanged")
                }
            }],
            keys: [{
                key: Ext.EventObject.DELETE,
                fn: function () {
                    if (xds.active) {
                        Ext.Msg.confirm(designer.ActionMsg.DeleteComponent, designer.ActionMsg.DeleteComponentMsg,
							function (a) {
							    if (a == "yes" && xds.active) {
							        xds.resource
										.removeComponent(xds.active.component)
							    }
							})
                    }
                }
            }]
        })
    },
    initComponent: function () {
        this.loader = new xds.Inspector.DemoLoader();
        this.root = {
            id: "iroot_res",
            async: true,
            expanded: true,
            allowDrag: true,
            text: "iroot_res",
            allowDrop: true
        };

        this.on("nodedragover", this.onDragOver, this);
        this.on("contextmenu", this.onNodeContext, this);

        this.on("startdrag", this.onStartDrag, this);
        this.on("dragdrop", this.onDragDrag, this);
        

        xds.Inspector.superclass.initComponent.call(this)
    },
    onDragDrag: function (that, node, dd, e) {
        //拖拽到有效区域内的鼠标放开后的动作
        var sourceCmp = node && node.component;
        if (sourceCmp.cid == 'rescss' || sourceCmp.cid == 'resjs') return;
        var filmId = e.target.id;
        if (!filmId) return;
        filmId = filmId.replace("film-for-", '');
        var targetNode = xds.inspector.getNodeById(filmId);
        targetNode.select();
        var targetCid = targetNode.component.cid;
        var map = node.instance.ddPropsMap;
        var targetProp = xds.vmd.propName+map[targetCid];
        var value = "";
        var _data = node._data;
        var repstr = "{{servname}}/{path}";
        value = repstr.format({
            servname: _data.servName,
            path:_data.path
         });
        xds.props.setValue(targetProp, value)
       
    },
    onStartDrag:function(that,node,e){
        this.curDragNode = node;
        var cmp=node.component;
        var cid = cmp.cid;
        if (cid == 'resimg') {
            var g = xds.Registry.get(cid);
            if (g) {
                node.instance = new g();
                node.spec = node.instance.getSpec();
                node._data={};
                Ext.apply(node._data, cmp.userConfig);
                
                //node.isDragCopy = true;
                node.isDragSetPropValue = true;
            }
        }
        
        //node.instacne=new 
    },
    getContextMenu: function (isHide) {
        
        if (!this.contextMenu) {
            var a = this.contextMenu = new Ext.menu.Menu({
                zIndex: 80000,
                items: [{
                    itemId: "move-up",
                    text: designer.ContextMenu.MoveUp,
                    handler: function () {
                        a.node.parentNode.insertBefore(a.node,
							a.node.previousSibling);
                        a.node.select();
                        xds.fireEvent("componentchanged")
                    }
                }, {
                    itemId: "move-down",
                    text: designer.ContextMenu.MoveDown,
                    handler: function () {
                        a.node.parentNode.insertBefore(a.node,
							a.node.nextSibling.nextSibling);
                        a.node.select();
                        xds.fireEvent("componentchanged")
                    }
                }, "-", {
                    text: designer.ContextMenu.Delete,
                    iconCls: "icon-delete",
                    handler: function () {
                        xds.resource.removeComponent(a.node.component);
                        //20171128 chengbing  删除组件时，调用组件的删除方法
                        if (a.node.component.removeComponent) {
                            a.node.component.removeComponent();
                        }
                        xds.fireEvent("componentchanged");
                    }
                },
                {
                    text: "引用的资源地址",
                    handler: function () {
                        
                        var cmp = a.node.component;
                        var servname = cmp.userConfig.servName;
                        var path = cmp.userConfig.path;
                        var repstr = "{{servname}}/{path}";
                        var value = repstr.format({
                            servname: servname,
                            path: path
                        });
                        var win = new vmd.window({
                            title:'资源地址（可以在脚本和样式中引用）',
                            items: [{
                                xtype: "textfield",
                                name: 'name',
                                height: 30,
                                value: value
                            }],
                            layout:'fit',
                            height: 80,
                            width: 400,
                            auto: false,
                            maximizable:false
                        })
                        win.show();

                    }
                }

                ],
                onContextShow: function () {

                    this.items.get("move-up")
						.setDisabled(!a.node.previousSibling);
                    this.items.get("move-down")
						.setDisabled(!a.node.nextSibling);
                    a.node.ui.addClass("xds-context-node");
                    var d = a.node.component.getActions();
                    if (d) {
                        a.add(new Ext.menu.Separator({
                            id: "actions-sep"
                        }));
                        for (var c = 0, b = d.length; c < b; c++) {
                            a.add(d[c])
                        }
                    }
                },
                onContextClose: function () {
                    var d = a.node.component.getActions();
                    if (d) {
                        a.remove(a.items.get("actions-sep"));
                        for (var c = 0, b = d.length; c < b; c++) {
                            a.remove(a.items.get(d[c].initialConfig.itemId))
                        }
                    }
                    a.node.ui && a.node.ui.removeClass("xds-context-node")
                }
            });
            a.on("beforeshow", a.onContextShow, a);
            a.on("hide", a.onContextClose, a)
        }
        return this.contextMenu
    },
    getCssNode: function () {
        return this.root.childNodes[0];
    },
    getJsNode: function () {
        return this.root.childNodes[1];
    },
    getImgNode: function () {
        return this.root.childNodes[2];
    },
   
    addCssNodes: function (data) {
        var node = this.getCssNode();
        if (!node) return;

        this._addNodes(data, node, 'rescss',true);

    },
    addJsNodes: function (data) {
        var node = this.getJsNode();
        if (!node) return;

        this._addNodes(data, node, 'resjs',true);

    },
    addImgNodes: function (data) {
        var node = this.getImgNode();
        if (!node) return;

        this._addNodes(data, node, 'resimg',true);

    },
    _addNodes: function (data, node, cid, isNoRemoveAll) {
        var me = this;
        var createConf = function (obj) {
            var newObj = {
                cid: obj.cid || cid,
                id: obj.id,
                userConfig: {}
            };
            //delete obj.cid;
            // delete obj.id;
            Ext.apply(newObj.userConfig, obj);
            if (obj.cn) {
                newObj.cn = [];
                Ext.each(obj.cn, function (item) {
                    item = createConf(item);
                    newObj.cn.push(item);
                })
                delete newObj.userConfig.cn
            }

            return newObj;
        }
        if (!isNoRemoveAll) node.removeAll();

        Ext.each(data, function (item) {
            // node.leaf = false
            item = createConf(item);
            var _node = me.restore(item, node);
            /*if (!_node._data) {
                _node._data = {};
                Ext.apply(_node._data, item.userConfig);
                delete _node._data.id;
            }*/
        })

        node.expand();

    },
    getCssData: function () {
        var data = []
        var node = this.getCssNode();
        if (!node) return data;
        data = this._getData(node);

        return data;

    },
    getJsData: function () {

        var data = []
        var node = this.getJsNode();
        if (!node) return data;
        data = this._getData(node);

        return data;
    },
    getImgData: function () {

        var data = []
        var node = this.getImgNode();
        if (!node) return data;
        data = this._getData(node);
        return data;
    },
    _getData: function (node) {
        var data = [];
        var _data = node.component.getInternals(true);
        if (_data.cn) {
            var tempData = Ext.decode(Ext.encode(_data.cn));
            Ext.each(tempData, function (item) {
                var obj = {};
                obj.id = item.id;
                Ext.apply(obj, item.userConfig)
                data.push(obj);
            })
        }
        return data;

    }
})



//工具箱
xds.Toolbox = Ext.extend(Ext.tree.TreePanel, {
	constructor: function() {
		xds.Toolbox.superclass.constructor.call(this, {
			width: 200,
			region: "west",
			split: true,
			id: "toolbox",
			border: false,
			margins: "0 0 0 0",
			cmargins: "0 1 0 0",
			title: designer.Toolbox.title,
			layout: "fit",
			title: "组件箱",
			collapsible: true,
			rootVisible: false,
			animate: false,
			autoScroll: true,
			useArrows: true,
			minWidth: 150,
			enableDrag: true,
			collapseFirst: false,
			animCollapse: false,
			animFloat: false,
			tools: [{
				id: "expand-all",
				handler: function() {
					this.root.expand(true)
				},
				qtip: designer.Toolbox.expandall,
				scope: this
			}, {
				id: "collapse-all",
				handler: function() {
					this.root.collapse(true)
				},
				qtip: designer.Toolbox.collapseall,
				scope: this
			}]
		});
		xds.toolbox = this
	},
	initComponent: function() {
		//组件加载
		this.loader = new xds.Toolbox.DemoLoader();
		this.root = {
			id: "troot",
			async: true,
			expanded: true,
			text: "troot"
		};

		xds.Toolbox.superclass.initComponent.call(this);
		this.getSelectionModel().on("beforeselect", function(a, b) {
			if(b && !b.isLeaf()) {
				b.toggle();
				return false
			}
		});
		this.on("dblclick", this.onDblClick, this)
	},
	onDblClick: function(a) {
		if(a.isLeaf() && xds.active &&
			xds.Component.isValidDrop(xds.active.component, a.instance)) {
			xds.inspector.restore(a.instance.getSpec(), xds.active.node);
			xds.fireEvent("componentchanged")
		}
	},
	loadUserTypes: function () {
        
		var e = xds.Registry.userTypes;
		if (e) {
		    var d = this.getNodeById("User_Components");
		    if (d) {
		        while (d.firstChild) {
		            d.removeChild(d.firstChild)
		        }
		    } else {
		        d = this.root.appendChild({
		            cls: "toolbox-ct",
		            allowDrag: false,
		            text: "User Components",
		            id: "User_Components",
		            leaf: false
		        })
		    }
		    d.beginUpdate();
		    for (var b = 0, a; a = e[b]; b++) {
		        var g = xds.Registry.get(a.cid);
		        if (g) {
		            var f = new Ext.tree.TreeNode({
		                text: a.name || a.naming,
		                iconCls: g.prototype.iconCls,
		                leaf: true,
		                user: true
		            });
		            d.appendChild(f);
		            f.type = g;
		            f.spec = a;
		            f.instance = new g();
		            f.instance.spec = a
		        }
		    }
		    d.endUpdate();
		    d.expand()
		} else {
		    d = this.root.appendChild({
		        cls: "toolbox-ct User_Components",
		        allowDrag: false,
		        text: "vmd复合组件",
		        id: "User_Components",
		        leaf: false
		    })
            
		}
	},
	loadUserTypes2: function () {
	    
	    xds.Registry.vmdux = [];
		var e = xds.Registry.userTypes;
		if(e) {
			var d = this.getNodeById("User_Components");
			if(d) {
				while(d.firstChild) {
					d.removeChild(d.firstChild)
				}
			} else {
				d = this.root.appendChild({
				    cls: "toolbox-ct User_Components",
					allowDrag: false,
					text: "vmd复合组件",
					id: "User_Components",
					leaf: false
				})

			}
			d.beginUpdate();
			for(var b = 0, a; a = e[b]; b++) {
				a = a.prototype;
				var g = xds.Registry.get(a.cid);
				xds.Registry.vmdux.push(a.cid);
				var nodeText = a.text || a.name || a.naming;
				var getVer = function(name) {
					var v;
					if(name) {
					    v = xds.vmd.cmpList.getVerByName(name);
                        
					    if (v) {
					        var _v = v.v;
					        var _zhname = v.zhname;

					        name = name + ' V' + _v;
					        if (_zhname) {
					            name = name + "(" + _zhname + ")";
					        }
					    }
					}
					return name;
				}
				if(g) {
					var f = new Ext.tree.TreeNode({
						text: getVer(nodeText),
						iconCls: g.prototype.iconCls,
						leaf: true,
						user: true
					});
					d.appendChild(f);
					f.type = g;
					f.spec = a;
					f.instance = new g();
					f.instance.spec = a
				}
			}
			d.endUpdate();
			d.expand()
		}
	},
	onRender: function(b, a) {
		xds.Toolbox.superclass.onRender.call(this, b, a);
		this.innerCt.setStyle("padding-bottom", "20px")
	}
});
xds.Toolbox.Loader = Ext.extend(Ext.tree.TreeLoader, {
	load: Ext.emptyFn
});
xds.Toolbox.WebLoader = Ext.extend(xds.Toolbox.Loader, {});
xds.Toolbox.DemoLoader = Ext.extend(xds.Toolbox.Loader, {
	load: function(a, k) {
		if(a.id != "troot") {
			k();
			return
		}
		var l = a.getOwnerTree();
		a.beginUpdate();
		var j = xds.Registry.all.items;

		for(var b = 0, d = j.length, g, f, e; b < d; b++) {
			f = j[b];
			e = "xdc" + f.prototype.category.replace(/\s/g, "_");
			g = l.getNodeById(e);

			//分类控制
			var hideCategoryArr = xds.vmd.getToolbarHideCategory();
			if(hideCategoryArr && hideCategoryArr.indexOf(f.prototype.category) != -1) continue;

			//mafei 控制工具箱组件是否显示
			if(f.prototype.isInvisible || f.prototype.hide) continue;
			if(!g) {
				g = a.appendChild({
					cls: "toolbox-ct",
					allowDrag: false,
					text: f.prototype.category,
					id: e,
					leaf: false
				})
			}
			var h = new Ext.tree.TreeNode({
				text: f.prototype.text,
				iconCls: f.prototype.iconCls,
				leaf: true
			});
			g.appendChild(h);
			h.type = f;
			h.instance = new f()
			//20171125 控制grid和toolbar节点默认不展开
			if(!xds.vmd.isCategoryCollapse(f.prototype.category)) {
				g.expand.defer(10, g, [true]);
			}
		}
		l.loadUserTypes();
		a.endUpdate();
		// a.expand.defer(10, a, [true]);
		k();
		xds.fireEvent("componentsloaded");

		vmd('.User_Components').append('<div class="uxadd" style="float:right;margin-right:15px;color:blue">添加</div>');
		vmd('.User_Components .uxadd').bind('click', function (e) {
		    
		    xds.uxSelectWin = new vmd.window({
		        url: vmd.uxSelectPath,
		        auto: false,
		        width: 880,
		        height: 610,
		        enableLoading: true,
                title:'复合组件选择'
		    })
		    xds.uxSelectWin.show();

		    xds.uxSelectWin.addUx = function (listCmp) {
		        
		        if (listCmp) {

		            var ux = xds.vmd.ux;
		            xds.vmd.readCmpList(ux.cmpListPath,function(data){
		            
		                if (data) {
		                    xds.vmd.setCmpListMap(data);
		                    var list = [];
		                    var pref = designer.prefix.cmp;
		                    xds.Registry.vmdux = xds.Registry.vmdux || [];
		                    listCmp = listCmp || [];
		                    listCmp.forEach(function (item) {

		                        var cls,_cls = item.cls;
		                        var name = item.name
		                        cls = pref + _cls;
		                        if (xds.Registry.vmdux.indexOf(cls) == -1) {
		                            var map = xds.vmd.cmpList.map;
		                            if (!map.get(_cls)) map.put(_cls, item);
		                            xds.vmd._getCmpPathByCls(cls, list);
		                        }

		                    })
		                    if (list.length > 0)
		                        LazyLoad.js(list, function () {
		                            //加载模块树
		                            xds.toolbox.loadUserTypes2();
		                        })
		                }
		            })


		           
		        }

		      
		        xds.uxSelectWin.close();
		    }
		    
		    e.stopPropagation();
		})
	}
});

xds.Layouts = {
	form: {
		id: "form",
		xcls: "Ext.layout.FormLayout",
		text: "Form Layout",
		configs: [{
			name: "anchor",
			group: "Ext.layout.FormLayout",
			ctype: "string"
		},{
			name: "fieldLabel",
			group: "Ext.layout.FormLayout",
			ctype: "string"
		}, {
			name: "hideLabel",
			group: "Ext.layout.FormLayout",
			ctype: "boolean"
		}, {
			name: "itemCls",
			group: "Ext.layout.FormLayout",
			ctype: "string"
		}, {
			name: "labelSeparator",
			group: "Ext.layout.FormLayout",
			ctype: "string"
		}, {
			name: "labelStyle",
			group: "Ext.layout.FormLayout",
			ctype: "string"
		}],
		layoutConfigs: [{
			name: "labelAlign",
			group: "(Layout)",
			ctype: "string",
			editor: "options",
			options: ["left", "right", "top"]
		}, {
			name: "labelSeparator",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "string"
		}, {
			name: "labelPad",
			group: "Ext.layout.FormLayout",
			ctype: "number"
		}, {
			name: "labelWidth",
			group: "Ext.layout.FormLayout",
			ctype: "number"
		}]
	},
	table: {
		id: "table",
		xcls: "Ext.layout.TableLayout",
		text: "Table Layout",
		configs: [{
			name: "cellId",
			group: "Ext.layout.TableLayout",
			ctype: "string"
		}, {
			name: "cellCls",
			group: "Ext.layout.TableLayout",
			ctype: "string"
		}, {
			name: "colspan",
			group: "Ext.layout.TableLayout",
			ctype: "number"
		}, {
			name: "rowspan",
			group: "Ext.layout.TableLayout",
			ctype: "number"
		}],
		layoutConfigs: [{
			name: "columns",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "number"
		}]
	},
	card: {
		id: "card",
		xcls: "Ext.layout.CardLayout",
		text: "Card Layout",
		configs: [],
		layoutConfigs: [{
			name: "deferredRender",
			group: "(Layout)",
			ctype: "boolean",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			defaultValue: false
		}]
	},
	accordion: {
		id: "accordion",
		xcls: "Ext.layout.AccordionLayout",
		text: "Accordion Layout",
		configs: [],
		layoutConfigs: [{
			name: "fill",
			group: "(Layout)",
			ctype: "boolean",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			defaultValue: true
		}, {
			name: "autoWidth",
			group: "(Layout)",
			ctype: "boolean",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			defaultValue: true
		}, {
			name: "titleCollapse",
			group: "(Layout)",
			ctype: "boolean",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			defaultValue: true
		}, {
			name: "hideCollapseTool",
			group: "(Layout)",
			ctype: "boolean",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			defaultValue: false
		}, {
			name: "collapseFirst",
			group: "(Layout)",
			ctype: "boolean",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			defaultValue: false
		}, {
			name: "animate",
			group: "(Layout)",
			ctype: "boolean",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			defaultValue: false
		}, {
			name: "sequence",
			group: "(Layout)",
			ctype: "boolean",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			defaultValue: false
		}, {
			name: "activeOnTop",
			group: "(Layout)",
			ctype: "boolean",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			defaultValue: false
		}]
	},
	border: {
		id: "border",
		xcls: "Ext.layout.BorderLayout",
		text: "Border Layout",
		configs: [{
			name: "collapseMode",
			group: "Ext.layout.BorderLayout",
			ctype: "string",
			editor: "options",
			options: ["standard", "mini"]
		}, {
			name: "margins",
			group: "Ext.layout.BorderLayout",
			ctype: "string"
		}, {
			name: "minHeight",
			group: "Ext.layout.BorderLayout",
			ctype: "number"
		}, {
			name: "minWidth",
			group: "Ext.layout.BorderLayout",
			ctype: "number"
		}, {
			name: "region",
			group: "Ext.layout.BorderLayout",
			ctype: "string",
			editor: "options",
			options: ["center", "east", "north", "south", "west"]
		}, {
			name: "split",
			group: "Ext.layout.BorderLayout",
			ctype: "boolean"
		}],
		onBeforeAdd: function(d, c) {
			var f = ["center", "west", "east", "north", "south"];
			var e = d.firstChild;
			while(e) {
				var b = e.component.getConfigValue("region");
				if(b) {
					var a = f.indexOf(b);
					if(a != -1) {
						f.splice(a, 1)
					}
				}
				e = e.nextSibling
			}
			//mafei 修复布局保存下次加载的问题
			var value = c.component.userConfig && c.component.userConfig.region;
			c.component.setConfig("region", value || f[0])
		},
		onInit: function(a) {
			var b = a.firstChild;
			while(b) {
				this.onBeforeAdd(a, b);
				b = b.nextSibling
			}
		}
	},
	anchor: {
		id: "anchor",
		xcls: "Ext.layout.AnchorLayout",
		text: "Anchor Layout",
		configs: [{
			name: "anchor",
			group: "Ext.layout.AnchorLayout",
			ctype: "string"
		}]
	},
	absolute: {
		id: "absolute",
		xcls: "Ext.layout.AbsoluteLayout",
		text: "Absolute Layout",
		configs: [{
			name: "anchor",
			group: "Ext.layout.AbsoluteLayout",
			ctype: "string"
		}, {
			name: "x",
			group: "Ext.layout.AbsoluteLayout",
			ctype: "number"
		}, {
			name: "y",
			group: "Ext.layout.AbsoluteLayout",
			ctype: "number"
		}],
		layoutConfigs: [{
			name: "snapToGrid",
			group: "Ext.layout.AbsoluteLayout",
			setFn: "setSnapToGrid",
			getFn: "getSnapToGrid",
			ctype: "string",
			editor: "options",
			options: ["(none)", "5", "10", "15", "20"],
			defaultValue: "10"
		}],
		onBeforeAdd: function(b, a) {
			if(xds.canvas.lastDropPoint) {
				var d = b.component.getExtComponent();
				if(d) {
					var c = d.getLayoutTarget()
						.translatePoints(xds.canvas.lastDropPoint);
					c.left = xds.canvas.dragTracker.snap(c.left,
						b.component.snapToGrid);
					c.top = xds.canvas.dragTracker.snap(c.top,
						b.component.snapToGrid);
					a.component.userConfig.x = c.left;
					a.component.userConfig.y = c.top
				}
			}
		}
	},
	column: {
		id: "column",
		xcls: "Ext.layout.ColumnLayout",
		text: "Column Layout",
		configs: [{
			name: "columnWidth",
			group: "Ext.layout.ColumnLayout",
			ctype: "number"
		}],
		layoutConfigs: [{
			name: "scrollOffset",
			group: "(Layout)",
			ctype: "number"
		}]
	},
	fit: {
		id: "fit",
		xcls: "Ext.layout.FitLayout",
		text: "Fit Layout",
		configs: []
	},
	hbox: {
		id: "hbox",
		xcls: "Ext.layout.HBoxLayout",
		text: "HBox Layout",
		configs: [{
			name: "flex",
			group: "Ext.layout.HBoxLayout",
			ctype: "number"
		}, {
			name: "margins",
			group: "Ext.layout.HBoxLayout",
			ctype: "string"
		}],
		layoutConfigs: [{
			name: "align",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "string",
			editor: "options",
			options: ["top", "middle", "stretch", "stretchmax"],
			defaultValue: "top"
		}, {
			name: "pack",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "string",
			editor: "options",
			options: ["start", "center", "end"],
			defaultValue: "start"
		}, {
			name: "padding",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "string",
			defaultValue: "0"
		}, {
			name: "scrollOffset",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "number",
			defaultValue: 0
		}]
	},
	vbox: {
		id: "vbox",
		xcls: "Ext.layout.VBoxLayout",
		text: "VBox Layout",
		configs: [{
			name: "flex",
			group: "Ext.layout.VBoxLayout",
			ctype: "number"
		}, {
			name: "margins",
			group: "Ext.layout.VBoxLayout",
			ctype: "string"
		}],
		layoutConfigs: [{
			name: "align",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "string",
			editor: "options",
			options: ["left", "center", "stretch", "stretchmax"],
			defaultValue: "top"
		}, {
			name: "pack",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "string",
			editor: "options",
			options: ["start", "center", "end"],
			defaultValue: "start"
		}, {
			name: "padding",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "string",
			defaultValue: "0"
		}, {
			name: "scrollOffset",
			group: "(Layout)",
			setFn: "setContainerConfig",
			getFn: "getContainerConfigValue",
			ctype: "number",
			defaultValue: 0
		}]
	}
};
xds.layouts = ["auto", "absolute", "accordion", "anchor", "border", "card",
	"column", "fit", "form", "hbox", "table", "vbox"
];
xds.layouts = ["auto", "absolute", "anchor", "border",
	"column", "fit", "form", "hbox", "table", "vbox"
];
(function() {
	for(var a in xds.Layouts) {
		if(xds.Layouts.hasOwnProperty(a)) {
			xds.initConfigs("configs", xds.Layouts[a]);
			xds.initConfigs("layoutConfigs", xds.Layouts[a])
		}
	}
})();
xds.StoreCache = new Ext.util.MixedCollection(false, function(a) {
	return a.component.id
});
Ext.intercept(Ext.StoreMgr, "register", function(a) {
	if(a.cache === false) {
		return false
	}
	if(a.component) {
		xds.StoreCache.replace(a)
	}
});
//容器自动提示div
xds.Flyout = Ext.extend(Ext.Tip, {
	floating: {
		shadow: true,
		shim: true,
		useDisplay: false,
		constrain: false,
		zindex: 80001
	},
	cls: "component-info x-small-editor",
	width: 170,
	layout: "form",
	labelAlign: "top",
	initComponent: function() {
		xds.Flyout.superclass.initComponent.call(this);
		this.component.flyout = this;
		this.component.flyoutCls = "xds-flyout xds-flyout-open";
		this.component.getFlyoutButton().addClass("xds-flyout-open");
		this.mon(xds.canvas.el, "mousedown", this.doAutoClose, this);
		this.mon(xds.east.el, "mousedown", this.doAutoClose, this);
		this.mon(xds.toolbox.el, "mousedown", this.doAutoClose, this);
		this.syncTask = Ext.TaskMgr.start({
			run: function() {
				var a = this.component.getFlyoutButton();
				if(a) {
					this.showBy(a, "tl-tr?")
				}
			},
			scope: this,
			interval: 100
		})
	},
	beforeDestroy: function() {
		delete this.component.flyout;
		this.component.flyoutCls = "xds-flyout";
		xds.un("componentselect", this.doAutoClose, this);
		if(this.component.getFlyoutButton()) {
			this.component.getFlyoutButton()
				.removeClass("xds-flyout-open")
		}
		Ext.TaskMgr.stop(this.syncTask);
		xds.Flyout.superclass.beforeDestroy.call(this)
	},
	doAutoClose: function(a) {

		if(!a.within(this.el) &&
			a.target != this.component.getFlyoutButton().dom) {
			this.destroy()
		}
	},
	doAutoWidth: Ext.emptyFn
});
xds.CJsonWindow = Ext.extend(Ext.Window, {
	iconCls: "icon-cmp",
	width: 620,
	height: 400,
	modal: true,
	plain: true,
	layout: 'border',
	initComponent: function() {
		this.fbar = ['->', {
			text: designer.WindowButton,
			handler: this.onAccept,
			scope: this
		}, {
			text: designer.WindowButton.Cancel,
			handler: this.close,
			scope: this
		}];
		var rootNode = new Ext.tree.TreeNode({
			leaf: false,
			text: "哎哟喂"
		});
		var cfg = {
			NOID: true,
			CLASS: true
		};

		function build_node(n) {
			var node = new Ext.tree.TreeNode({
				leaf: false,
				text: n.id,
				js: n
			})
			if(typeof(n.tbar) != 'undefined') {
				var len = n.tbar.length;
				var tbar = new Ext.tree.TreeNode({
					expand: true,
					leaf: false,
					text: 'tbar',
					iconCls: 'icon-toolbar',
					js: n.tbar
				});
				for(var i = 0; i < len; i++) {
					if(typeof(n.tbar[i]) != 'undefined')
						tbar.appendChild(build_node(n.tbar[i]));
				}
				node.appendChild(tbar);
			}
			if(typeof(n.bbar) != 'undefined') {
				var len = n.bbar.length;
				var bbar = new Ext.tree.TreeNode({
					leaf: false,
					text: 'bbar',
					iconCls: 'icon-toolbar',
					js: n.bbar
				});
				for(var i = 0; i < len; i++) {
					if(typeof(n.bbar[i]) != 'undefined')
						bbar.appendChild(build_node(n.bbar[i]));
				}
				node.appendChild(bbar);
			}
			if(typeof(n.fbar) != 'undefined') {
				var len = n.fbar.length;
				var fbar = new Ext.tree.TreeNode({
					leaf: false,
					text: 'fbar',
					iconCls: 'icon-toolbar',
					js: n.fbar
				});
				for(var i = 0; i < len; i++) {
					if(typeof(n.fbar[i]) != 'undefined')
						fbar.appendChild(build_node(n.fbar[i]));
				}
				node.appendChild(fbar);
			}
			if(typeof(n.columns) != 'undefined') {
				var len = n.columns.length;
				for(var i = 0; i < len; i++) {
					if(typeof(n.columns[i]) != 'undefined')
						node.appendChild(new Ext.tree.TreeNode({
							leaf: true,
							text: n.columns[i].header,
							iconCls: 'icon-grid',
							js: n.columns[i]
						}));
				}
			}
			if(typeof(n.store) != 'undefined') {
				node.appendChild(new Ext.tree.TreeNode({
					leaf: true,
					text: 'store',
					iconCls: 'icon-json',
					js: n.store
				}));
			}
			if(typeof(n.items) != 'undefined') {
				var len = n.items.length;
				for(var i = 0; i < len; i++) {
					if(typeof(n.items[i]) != 'undefined')
						node.appendChild(build_node(n.items[i]));
				}
			}
			return node;
		}

		function isArray(o) {
			return Object.prototype.toString.call(o) === '[object Array]';
		}

		function FieldToStr(obj, lpad) {
			var bString = true;
			for(var p in obj) {
				switch(p) {
					case 'name':
					case 'xcls':
					case 'xtype':
					case 'storeId':
					case 'id':
					case 'dock':
					case 'layoutConfig':
						break;
					case 'type':
						if(obj[p] != 'auto') bString = false;
						break;
					default:
						alert(p);
						bString = false;
				}
			}
			if(bString) {
				return "'" + obj.name + "'";
			}
			var arr = []
			for(var p in obj) {
				switch(p) {
					case 'xtype':
					case 'xcls':
					case 'storeId':
						// case 'id':
					case 'layoutConfig':
						break;
					case 'type':
						if(obj[p] != 'auto')
							arr.push(p + ':"' + obj[p] + '"');
						break;
					default:
						switch(typeof(obj[p])) {
							case 'string':
								arr.push(p + ':"' + obj[p] + '"');
								break;
						}
						break;
				}
			}
			return '{\n' + lpad + '\t' + arr.join(',\n' + lpad + '\t') + '\n' + lpad + '}';
		}

		function fieldsToString(obj, lpad) {
			if(isArray(obj)) {
				var l = obj.length;
				var arr = [];
				for(var i = 0; i < l; i++) {
					arr.push(FieldToStr(obj[i], lpad));
				}

				return '[' + '\n' + lpad + arr.join(",\n" + lpad) + "\n" + lpad + ']';
			}
			return '[]';
		}

		function objToCls(obj, dt, lpad) {
			// obj.name;
			var out = '';
			var s = obj.name.split('.');
			if(s.length > 2) // Ext.ux.component ...
			{
				out = 'Ext.ns("';
				var ns = [];
				for(var i = 0; i < s.length - 1; i++) //namespa
					ns.push(s[i]);
				out += ns.join('.') + '");\n';
			}
			if(s.length == 1) obj.name = 'Ext.' + obj.name; //Ext.component

			out += obj.name + '=Ext.extend(' + obj.xcls + ' ,{\n';
			var arr = [];
			for(var p in obj) {
				switch(p) {
					case 'name':
						break;
					case 'xcls':
						break;
					case 'userXType':
						break;
						// case 'id': if (cfg.NOID) break;
					case 'items':
					case 'tbar':
					case 'fbar':
					case 'bbar':
						break;
						break;
					default:
						switch(typeof(obj[p])) {
							case 'string':
								arr.push(p + ':"' + obj[p].replace('"', '\\\"') + '"');
								break;
							case 'number':
								arr.push(p + ':' + obj[p]);
								break;
							case 'boolean':
								arr.push(p + ':' + (obj[p] ? 'true' : 'false'));
								break;
							case 'object':
								arr.push(p + ':' + objToString(obj[p], null, lpad + '\t', false));
								break;
						}
				}
			}
			out += arr.join(',\n' + lpad);
			if(arr.length > 0) out += ',\n' + lpad;
			out += 'initComponent: function(){\n';

			// initComponent 代码处理
			if(typeof(obj.tbar) != 'undefined') {
				out += lpad + '\tthis.tbar=' + objToString(obj.tbar, 'button', lpad + '\t\t', false) + '\n';
			}
			if(typeof(obj.fbar) != 'undefined') {
				out += lpad + '\tthis.fbar=' + objToString(obj.fbar, 'button', lpad + '\t\t', false) + '\n';
			}
			if(typeof(obj.bbar) != 'undefined') {
				out += lpad + '\tthis.bbar=' + objToString(obj.bbar, 'button', lpad + '\t\t', false) + '\n';
			}
			if(typeof(obj.items) != 'undefined') {
				if(typeof(obj['defaultType']) == 'string') {
					out += lpad + '\tthis.items=' + objToString(obj.items, obj['defaultType'], lpad + '\t\t', false) + '\n';
				} else {
					switch(obj['xtype']) {
						case 'viewport':
							out += lpad + '\tthis.items=' + objToString(obj.items, 'panel', lpad + '\t\t', false) + '\n';
							break;
						default:
							out += lpad + '\tthis.items=' + objToString(obj.items, null, lpad + '\t\t', false) + '\n';
							break;
					}
				}
			}
			out += '\t' + lpad + obj.name + '.superclass.initComponent.call(this);\n' + lpad + '}\n})';
			if(typeof(obj.userXType) == 'string') {
				out += '\nExt.reg("' + obj.userXType + '",' + obj.name + ');';
			}
			return out;
		}

		function objToString(obj, dt, lpad, isW, isClass) { // dt = defaulttype
			if(!lpad) {
				lpad = '';
			}
			var out = '';
			var isArr = isArray(obj);
			if(!isArr && isClass && typeof(obj['name']) == 'string') { // generate class code;
				return objToCls(obj, dt, lpad, false);
			}
			if(isW) {
				if(isArr) {
					out = '[' + '\n' + lpad;
				} else {
					out = 'var ' + obj.name + '=new ' + obj.xcls + '({' + '\n' + lpad;

				}
			} else {
				if(isArr) {
					out = '[' + '\n' + lpad;
				} else {
					out = '{' + '\n' + lpad;
				}
			}
			var arr = [];
			if(isArr) {
				var len = obj.length;
				for(var i = 0; i < len; i++) {
					switch(typeof(obj[i])) {
						case 'string':
							arr.push('"' + obj[i].replace('"', '\\\"') + '"');
							break;
						case 'number':
							arr.push(obj[i]);
							break;
						case 'boolean':
							arr.push(obj[i] ? 'true' : 'false');
							break;
						case 'object':
							arr.push(objToString(obj[i], dt, lpad + '\t', false));
							break;
					}
				}
			} else {
				for(var p in obj) {
					switch(p) {
						case 'xcls':
							break;
							// case 'id':
						case 'storeId':
							if(cfg.NOID) break;
						case 'name':
							break;
						case 'xtype':
							if(!isW) {
								switch(obj[p]) {
									case 'tbfill':
										return '"->"';
									case 'tbseparator':
										return '"-"';
									case 'tbspacer':
										return '" "';
								}
							}
							if(typeof(dt) == 'string' && dt == obj[p]) {
								break;
							}
							if(isW) break;
						default:
							switch(typeof(obj[p])) {
								case 'string':
									arr.push(p + ':"' + obj[p].replace('"', '\\\"') + '"');
									break;
								case 'number':
									arr.push(p + ':' + obj[p]);
									break;
								case 'boolean':
									arr.push(p + ':' + (obj[p] ? 'true' : 'false'));
									break;
								case 'object':
									switch(p) {
										case 'items': //子控件
											if(typeof(obj['defaultType']) == 'string') {
												arr.push(p + ':' + objToString(obj[p], obj['defaultType'], lpad + '\t', false));
												break;
											}
											switch(obj['xtype']) {
												case 'buttongroup':
													arr.push(p + ':' + objToString(obj[p], 'button', lpad + '\t', false));
													break;
												case 'viewport':
													arr.push(p + ':' + objToString(obj[p], 'panel', lpad + '\t', false));
													break;
												default:
													arr.push(p + ':' + objToString(obj[p], null, lpad + '\t', false));
													break;
											}
											break;
										case 'bbar':
										case 'tbar':
										case 'fbar': //工具条
											arr.push(p + ':' + objToString(obj[p], 'button', lpad + '\t', false));
											break;
										case 'fields':
											arr.push(p + ':' + fieldsToString(obj[p], lpad + '\t'));
											break;
										default:
											arr.push(p + ':' + objToString(obj[p], null, lpad + '\t', false));
									}
									break;
							}
							break;
					}
				}
			}
			if(isW) {
				if(isArr) {
					out += arr.join(',\n' + lpad) + '\n' + lpad.substring(0, lpad.length - 1) + ']'
				} else {
					out += arr.join(',\n' + lpad) + '\n' + lpad.substring(0, lpad.length - 1) + '})'
				}
			} else {
				if(isArr) {
					out += arr.join(',\n' + lpad) + '\n' + lpad.substring(0, lpad.length - 1) + ']'
				} else {
					out += arr.join(',\n' + lpad) + '\n' + lpad.substring(0, lpad.length - 1) + '}'
				}
			}
			return out;
		}

		for(var i = 0; i < this.jdb.length; i++) {
			rootNode.appendChild(build_node(this.jdb[i]));
		}
		this.items = [
			new Ext.Panel({
				region: "center",
				plain: true,
				border: false,
				layout: "fit",
				margins: '3 3 3 0',
				items: [{
					xtype: "textarea",
					id: 'textarea-viewjson-value',
					fieldLabel: "Text",
					name: "textarea",
					value: '/*请单击组件树的节点以查看生成的代码。*/'
				}],
				tbar: [{
					iconCls: 'icon-copy',
					itemText: '复制代码',
					tooltip: '复制代码到剪辑版',
					handler: function() {
						var psb = window.parentSandboxBridge;
						var te = Ext.getCmp('textarea-viewjson-value');
						psb.toClipboard(te.getValue().replace(/(\n)/g, '\r\n'));
					}
				}, {
					iconCls: 'icon-save',
					itemText: "保存代码到",
					tooltip: '保存代码到文件',
					handler: function(b, e) {
						var te = Ext.getCmp('textarea-viewjson-value');
						window.parentSandboxBridge.saveJSAs({
							contents: te.getValue().replace(/(\n)/g, '\r\n')
						});
					}
				}]
			})
			/*,
			             new Ext.Panel({
			             region : "west",plain:true,
			             width : 180,
			             margins: '3 3 3 3',
			             items:[
			             new Ext.tree.TreePanel({
			             useArrows:true,animate:true,containerScroll:true,border:false,
			             root:rootNode,
			             listeners:{
			             click:function(n,e){
			             var ed=Ext.getCmp('textarea-viewjson-value');
			             if(!n.parentNode)
			             {
			             ed.setValue('请单击组件树的节点以查看JSON代码.');
			             }else{
			             var js=n.attributes.js;
			             ed.setValue(objToString(js,null,'\t',true,cfg.CLASS));
			             }


			             }
			             },scope:this
			             })
			             ]
			             })*/
		];
		var ed = Ext.getCmp('textarea-viewjson-value');
		if(this.jdb.length > 0) {
			var js = this.jdb[0];
			ed.setValue(objToString(js, null, '\t', true, cfg.CLASS));
		}
		xds.CJsonWindow.superclass.initComponent.call(this)
	},
	onAccept: function() {
		this.close()
	}
});
xds.CWindow = Ext.extend(Ext.Window, {
	iconCls: "icon-cmp",
	width: 500,
	height: 350,
	layout: "border",
	plain: true,
	modal: true,
	initComponent: function() {
		this.items = [this.view = new Ext.ux.TileView({
			style: "background:#fff;overflow:auto",
			region: "center",
			categoryName: "category",
			store: new xds.Registry.createStore(true),
			singleSelect: true,
			trackOver: true,
			overClass: "x-tile-over"
		}), {
			layout: "form",
			region: "south",
			height: 29,
			bodyStyle: "padding:3px;border-top:1px solid #B7CCE4;",
			baseCls: "x-plain",
			labelWidth: 70,
			items: this.idField = new Ext.form.TextField({
				value: "MyComponent",
				selectOnFocus: true,
				fieldLabel: "Class Name",
				anchor: "100%"
			})
		}];
		this.buttons = [{
			text: "OK",
			disabled: true,
			handler: this.onAccept,
			scope: this
		}, {
			text: "Cancel",
			handler: this.close,
			scope: this
		}];
		this.view.on("selectionchange", this.onViewSelect, this);
		xds.CWindow.superclass.initComponent.call(this)
	},
	onViewSelect: function() {
		var a = this.view.getSelectedRecords()[0];
		if(a) {
			this.buttons[0].enable();
			this.idField.setValue(xds.inspector.nextId(a.data.naming))
		} else {
			this.buttons[0].disable()
		}
	},
	onAccept: function() {

		var a = this.view.getSelectedRecords()[0];
		var b = xds.Registry.get(a.id);
		xds.fireEvent("componentevent", {
			type: "new",
			component: (new b()).getSpec()
		});
		this.close()
	}
});

xds.PanelBase = Ext.extend(xds.Component, {
	category: "Containers",
	isContainer: true,
	enableFlyout: true,
	isResizable: function(a, b) {
		return !this.isFit() && !this.isAnchored()
	},
	initConfig: function(b, a) {
		if(!a) {
			b.width = 400;
			b.height = 250
		}
	},
	autoScrollable: true,
	layoutable: true,
	getFlyoutItems: function() {
		var a = [];
		if(this.layoutable) {
			a.push({
				xtype: "flyoutselect",
				fieldLabel: "选择一种布局方式",
				data: xds.layouts,
				bindTo: {
					component: this,
					name: "layout",
					event: "select",
					defaultValue: "auto"
				}
			})
		}
		if(this.autoScrollable) {
			a.push({
				xtype: "checkbox",
				boxLabel: "Enable autoScroll",
				hideLabel: true,
				bindTo: {
					component: this,
					name: "autoScroll",
					event: "check"
				}
			})
		}
		if(this.owner && this.owner.hasConfig("layout", "border")) {
			a.push({
				xtype: "flyoutselect",
				fieldLabel: "Select a region",
				data: ["north", "east", "center", "south",
					"west"
				],
				bindTo: {
					component: this,
					name: "region",
					event: "select"
				}
			})
		}
		if(this.hasConfig("layout", "absolute")) {
			a.push({
				xtype: "flyoutselect",
				fieldLabel: "Snap to grid",
				data: ["(none)", 5, 10, 15, 20],
				bindTo: {
					component: this,
					name: "snapToGrid",
					event: "select"
				}
			})
		}
		return a
	},
	onFlyout: function() {
		var a = this.getFlyoutItems();
		return new xds.Flyout({
			title: this.getNode().text,
			component: this,
			items: a
		})
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
xds.types.Container = Ext.extend(xds.Component, {
	cid: "container",
	category: "Containers",
	defaultName: "&lt;container&gt;",
	text: "Div",
	dtype: "xdcontainer",
	//xtype: "container",
	//xcls: "Ext.Container",
	xtype: "vmd.div",
	xcls: "vmd.comp.Div",
	iconCls: "icon-container",
	naming: "div",
	enableFlyout: true,
	isContainer: true,
	defaultConfig: {
		autoEl: "div",
		border: true,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'top left'
	},
	initConfig: function(b, a) {

		//if (!a) {
		b.width = 400;
		b.height = 50
		//}
	},
	isResizable: function(a, b) {
		return !this.isFit() && !this.isAnchored()
	},
	configs: [ {
			name: "border",
			group: "外观",
			ctype: "boolean"
		}, {
			name: "autoScroll",
			group: "Ext.Container",
			ctype: "boolean"
		}, {
			name: "layout",
			group: "Ext.Container",
			ctype: "string",
			editor: "options",
			options: xds.layouts
		}, {
			name: "autoHeight",
			group: "Ext.BoxComponent",
			ctype: "boolean"
		}, {
			name: "autoWidth",
			group: "Ext.BoxComponent",
			ctype: "boolean"
		}, {
			name: "height",
			group: "Ext.BoxComponent",
			ctype: "number"
		},
		{
			name: "html",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "width",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "x",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "y",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "cls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "disabled",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "disabledClass",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "hideMode",
			group: "Ext.Component",
			ctype: "string",
			editor: "options",
			options: ["display", "offsets", "visibility"]
		}, {
			name: "id",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "overCls",
			group: "Ext.Component",
			ctype: "string"
		},{
			name: "style",
			group: "外观",
			ctype: "string"
		},
		{
			name: "disableImage",
			group: "背景设置",
			ctype: "boolean"

		}, {
			name: "backgroundImage",
			group: "背景设置",
			ctype: "string",
			editor: "defineWindow",
			edConfig: {
				url: bootPATH + '/js/plugins/image/index.html',
				height: 500,
				width: 690,
				title: '图片上传',
				callback: function(data, edobj) {
					if(data) {
						//   data.props.backgroundImage = data.props.src;
					}
				}
			}
		}, {
			name: "backgroundRepeat",
			group: "背景设置",
			ctype: "string",
			editor: "options",
			options: ["no-repeat", "repeat-x", "repeat-y"]
		},
		{
			name: "backgroundPosition",
			group: "背景设置",
			ctype: "string",
			editor: "options",
			options: ["top left", "top center", "top right", "center left", "center center", "center right", "bottom left", "bottom center", "bottom right"],
			edConfig: {
				editable: true,
				forceSelection: false
			}
		},
        {
            name: "click",
            group: "事件",
            ctype: "string",
            editor: "ace",
            params:'e'
        }


	],
	onFlyout: function() {
		var a = [{
			xtype: "flyoutselect",
			fieldLabel: "选择一种布局方式",
			data: xds.layouts,
			bindTo: {
				component: this,
				name: "layout",
				event: "select",
				defaultValue: "auto"
			}
		}];
		if(this.owner && this.owner.hasConfig("layout", "border")) {
			a.push({
				xtype: "flyoutselect",
				fieldLabel: "Select a region",
				data: ["north", "east", "center", "south",
					"west"
				],
				bindTo: {
					component: this,
					name: "region",
					event: "select"
				}
			})
		}
		return new xds.Flyout({
			title: this.getNode().text,
			component: this,
			items: a
		})
	}
});
xds.Registry.register(xds.types.Container);
xds.Container = Ext.extend(Ext.Container, {
	onRender: function(ct) {
	    var me = this;
		xds.Container.superclass.onRender.apply(this, arguments);

		var config;
		//if (this.bodyCssClass) this.el.addClass(this.bodyCssClass);
		if(this.backgroundImage && !this.disableImage) {
		    if (this.backgroundImage.indexOf('icon-') == -1) {
		        this._backgroundImage = this.backgroundImage;
		        if (xds.vmd.resource.loadComplete) {
		            this.backgroundImage = vmd.replaceResVars(this.backgroundImage);
		        } else {
		            vmd.taskRunner(function () {
		                return xds.vmd.resource.loadComplete;
		            }, function () {
		                me.el && me.el.setStyle('backgroundImage', "url('" + vmd.replaceResVars(me._backgroundImage) + "')");
		            })
		        }
		       
		        //this.backgroundImage = vmd.replaceResVars(this.backgroundImage);
			    if (this.backgroundImage.indexOf('http://') == -1) {
			        this.backgroundImage = vmd.virtualPath + this.backgroundImage;
			    } 
			    var _url = 'url("' + this.backgroundImage + '")';
			    _url = 'url("' + this.backgroundImage + '")';
				config = {

					backgroundImage: _url,
					backgroundPosition: this.backgroundPosition,
					backgroundRepeat: this.backgroundRepeat
				};

			} else {

				var fontSize = Math.max(this.width, this.height);
				config = {
					'font-size': +this.height + 'px'
				}
				this.el.addClass("font " + this.backgroundImage)
			}
			this.el.applyStyles(config);

		}

	},
	afterRender: function() {
		this.el.addClass('vmd-div');
		this.border && this.el.addClass('vmd-div-border');
		xds.Container.superclass.afterRender.call(this, arguments)

	}

});
Ext.reg("xdcontainer", xds.Container);

//表单面板
xds.types.Form = Ext.extend(xds.PanelBase, {
	cid: "form",
	defaultName: "&lt;form&gt;",
	text: "Form Panel(表单面板)",
	dtype: "xdform",
	xtype: "form",
	xcls: "Ext.form.FormPanel",
	iconCls: "icon-form",
	naming: "MyForm",
	defaultConfig: {
		title: "Form Panel",
		labelWidth: 100,
		labelAlign: "left",
		layout: "form",
		header: true,
		border: true
	},
	initConfig: function(b, a) {
		if(!a) {
			b.width = 400;
			b.height = 250;
			b.padding = "10px"
		}
	},
	configs: [{
		name: "formId",
		group: "Ext.form.FormPanel",
		ctype: "string"
	}, {
		name: "itemCls",
		group: "Ext.form.FormPanel",
		ctype: "string"
	}, {
		name: "labelAlign",
		group: "Ext.form.FormPanel",
		ctype: "string",
		editor: "options",
		options: ["left", "right", "top"],
		defaultValue: "left"
	}, {
		name: "labelSeparator",
		group: "Ext.form.FormPanel",
		ctype: "string",
		defaultValue: ":"
	}, {
		name: "labelWidth",
		group: "Ext.form.FormPanel",
		ctype: "number"
	},{
		name: "autoScroll",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "bodyStyle",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "border",
		group: "Ext.Panel",
		ctype: "boolean"
	},{
		name: "disabled",
		group: "Ext.Panel",
		ctype: "boolean"
	},  {
		name: "header",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "html",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "iconCls",
		group: "Ext.Panel",
		ctype: "string"
	},{
		name: "padding",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "title",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "unstyled",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "layout",
		group: "Ext.Container",
		ctype: "string",
		editor: "options",
		options: xds.layouts
	}, {
		name: "autoHeight",
		group: "Ext.BoxComponent",
		ctype: "boolean"
	}, {
		name: "autoWidth",
		group: "Ext.BoxComponent",
		ctype: "boolean"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "itemId",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "overCls",
		group: "Ext.Component",
		ctype: "string"
	},{
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}]
});
xds.Registry.register(xds.types.Form);
xds.FormPanel = Ext.extend(Ext.form.FormPanel, {});
Ext.reg("xdform", xds.FormPanel);

xds.types.Panel = Ext.extend(xds.PanelBase, {
	cid: "panel",
	defaultName: "&lt;panel&gt;",
	text: "Panel(面板)",
	dtype: "xdpanel",
	xtype: "panel",
	xcls: "Ext.Panel",
	iconCls: "icon-panel",
	naming: "panel",
	defaultConfig: {
		title: "Panel",
		header: true,
		border: true,
		height: 100
	},
	configs: [{
			name: "autoScroll",
			group: "Ext.Panel",
			ctype: "boolean"
		}, {
			name: "bodyStyle",
			group: "Ext.Panel",
			ctype: "string"
		}, {
			name: "border",
			group: "Ext.Panel",
			ctype: "boolean"
		}, {
			name: "disabled",
			group: "Ext.Panel",
			ctype: "boolean"
		}, {
			name: "header",
			group: "Ext.Panel",
			ctype: "boolean"
		}, {
			name: "html",
			group: "Ext.Panel",
			ctype: "string"
		}, {
			name: "padding",
			group: "Ext.Panel",
			ctype: "string"
		}, {
			name: "title",
			group: "Ext.Panel",
			ctype: "string",
			updateFn: "setTitle"
		}, {
			name: "layout",
			group: "Ext.Container",
			ctype: "string",
			editor: "options",
			options: xds.layouts
		}, {
			name: "autoHeight",
			group: "Ext.BoxComponent",
			ctype: "boolean"
		}, {
			name: "autoWidth",
			group: "Ext.BoxComponent",
			ctype: "boolean"
		}, {
			name: "height",
			group: "Ext.BoxComponent",
			ctype: "number",
			updateFn: "setHeight"
		}, {
			name: "width",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "x",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "y",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "cls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "ctCls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "disabled",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "disabledClass",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.Component",
			ctype: "boolean"
		},
		{
			name: "hideMode",
			group: "Ext.Component",
			ctype: "string",
			editor: "options",
			options: ["display", "offsets", "visibility"]
		}, {
			name: "id",
			group: "Ext.Component",
			ctype: "string"
		},
		{
			name: "region",
			group: "Ext.Panel",
			ctype: "string"
		}, {
			name: "style",
			group: "Ext.Component",
			ctype: "string"
		}
	]
});
xds.Registry.register(xds.types.Panel);

xds.Panel = Ext.extend(Ext.Panel, {});
Ext.reg("xdpanel", xds.Panel);

xds.types.TabPanel = Ext.extend(xds.PanelBase, {
	cid: "tabpanel",
	defaultName: "&lt;tabs&gt;",
	text: "TabPanel(选项卡)",
	dtype: "xdtabpanel",
	xtype: "tabpanel",
	xcls: "Ext.TabPanel",
	iconCls: "icon-tabs",
	naming: "MyTabs",
	layoutable: false,
	autoScrollable: false,
	defaultConfig: {
		activeTab: 0,
		height: 150,
		width: 500
	},
	configs: [{
			name: "activeTab",
			group: "Ext.TabPanel",
			ctype: "string",
			updateFn: "setActiveTab"
		},{
			name: "bodyStyle",
			group: "Ext.Panel",
			ctype: "string"
		}, {
			name: "border",
			group: "Ext.Panel",
			ctype: "boolean"
		},  {
			name: "collapsible",
			group: "Ext.Panel",
			ctype: "boolean"
		}, {
			name: "disabled",
			group: "Ext.Panel",
			ctype: "boolean"
		}, {
			name: "unstyled",
			group: "Ext.Panel",
			ctype: "boolean"
		}, {
			name: "activeItem",
			group: "Ext.Container",
			ctype: "string"
		},{
			name: "autoHeight",
			group: "Ext.BoxComponent",
			ctype: "boolean"
		}, {
			name: "autoWidth",
			group: "Ext.BoxComponent",
			ctype: "boolean"
		}, {
			name: "height",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "width",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "x",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "y",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "cls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "ctCls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "disabled",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "disabledClass",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "hideMode",
			group: "Ext.Component",
			ctype: "string",
			editor: "options",
			options: ["display", "offsets", "visibility"]
		}, {
			name: "id",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "itemId",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "overCls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "style",
			group: "Ext.Component",
			ctype: "string"
		},
		{
			name: "tabchange",
			group: "事件",
			editor: "ace",
			ctype: "string",
			params: "tab"
		}
	],
	getFlyoutItems: function() {
		var a = xds.types.TabPanel.superclass.getFlyoutItems.call(this);
		var d = [],
			e = this;
		var g = this.getNode().childNodes;
		for(var b = 0, f; f = g[b]; b++) {
			if(!f.dock) {
				d.push(f.component.getConfigValue("title"))
			}
		}
		a.unshift({
			xtype: "flyoutselect",
			fieldLabel: "Active Item",
			data: d,
			bindTo: {
				component: this,
				name: "activeTab",
				event: "select",
				get: function() {
					var c = e.getExtComponent();
					var h = c.getActiveTab();
					if(h) {
						return d[c.items.indexOf(h)]
					} else {
						return d[0]
					}
				},
				set: function(j) {
					var i = d.indexOf(j.getValue());
					var h = e.getConfigObject("activeTab");
					h.setValue(e, i);
					if(xds.active.component == e) {
						xds.props.setValue("activeTab", i)
					}
				}
			}
		});
		return a
	},
	getDefaultInternals: function() {

		return {
			cid: this.cid,
			cn: [{
				cid: "panel",
				userConfig: {
					title: "Tab1"
				}
			}, {
				cid: "panel",
				userConfig: {
					title: "Tab2"
				}
			}, {
				cid: "panel",
				userConfig: {
					title: "Tab3"
				}
			}]
		}
	},
	getTabTarget: function(d) {
		if(d.getTarget("b", 1)) {
			return false
		}
		var g = this.getExtComponent();
		if(g) {
			var k = d.getPoint();
			var f = g.stripWrap.getRegion();
			if(!f.contains(k)) {
				return
			}
			var j = g.stripWrap.dom.getElementsByTagName("li"),
				b = false;
			for(var a = 0, c = j.length - 1; a < c; a++) {
				var h = j[a];
				if(Ext.fly(h).getRegion().contains(k)) {
					b = a;
					break
				}
			}
			return b
		}
		return false
	},
	getTabComponent: function(b) {
		var e = 0;
		var d = this.getNode();
		for(var a = 0, c; c = d.childNodes[a]; a++) {
			if(!c.dock) {
				if(e === b) {
					return c.component
				} else {
					e++
				}
			}
		}
		return null
	},
	onFilmClick: function(d) {
		var b = this.getTabTarget(d);
		if(b !== false) {
			var a = this.getConfigObject("activeTab");
			a.setValue(this, b);
			if(xds.active && xds.active.component == this) {
				xds.props.setValue("activeTab", b)
			}
			var c = this.getTabComponent(b);
			if(c) {
				c.getNode().select();
				//mafei 20180330 tabpanel容器内组件选中问题
				if(xds.active && xds.active.node) {
					xds.active.node.parentNode.cascade(function() {
						this.component.syncFilm()
					})
				}
				return false
			}
		}
	},
	onFilmDblClick: function(d) {
		var a = this.getTabTarget(d);
		if(a !== false) {
			var c = this.getTabComponent(a);
			var b = this.getExtComponent().getTabEl(a);
			xds.canvas.startEdit(c, b, c.getConfigObject("title"), 100)
		}
	}
});
xds.Registry.register(xds.types.TabPanel);
xds.TabPanel = Ext.extend(Ext.TabPanel, {});
Ext.reg("xdtabpanel", xds.TabPanel);

/*
isInvisible 组件再工具箱上直接不加载
dropHide:组件拖拽在画布上隐藏，但在组件树上显示
hide 组件在工具箱上隐藏
*/
xds.types.Viewport = Ext.extend(xds.Component, {
	cid: "viewport",
	category: "Containers",
	defaultName: "&lt;viewport&gt;",
	text: "Viewport(视图)",
	dtype: "xdviewport",
	xtype: "viewport",
	//xcls: "Ext.Viewport",
	xcls: "vmd.comp.viewport",
	iconCls: "icon-viewport",
	naming: "MyViewport",
	enableFlyout: true,
	isContainer: true,
	hide: true,
	filmCls: "el-film-btn-overlap",
	isValidParent: function(a) {
		return !a
	},
	configs: [{
		name: "layout",
		group: "Ext.Container",
		ctype: "string",
		editor: "options",
		options: xds.layouts
	}, {
		name: "autoScroll",
		group: "Ext.BoxComponent",
		ctype: "boolean"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}],
	onFlyout: function() {
		return new xds.Flyout({
			title: this.getNode().text,
			component: this,
			items: [{
				xtype: "flyoutselect",
				fieldLabel: "选择一种布局方式",
				data: xds.layouts,
				bindTo: {
					component: this,
					name: "layout",
					event: "select",
					defaultValue: "auto"
				}
			}]
		})
	}
});
xds.Registry.register(xds.types.Viewport);
xds.Viewport = Ext.extend(Ext.Panel, {
	baseCls: "page",
	frame: true,
	initComponent: function() {
		//修复autoscroll为true时canvas显示不全的问题
		this.autoScroll = false;
		xds.Viewport.superclass.initComponent.call(this)
	},
	onShow: function() {
		xds.Viewport.superclass.onShow.call(this);
		this.onCanvasResize();
		xds.canvas.on("resize", this.onCanvasResize, this)
	},
	onHide: function() {
		xds.Viewport.superclass.onHide.call(this);
		xds.canvas.un("resize", this.onCanvasResize, this)
	},
	onCanvasResize: function() {
		//mafei 20180412
		if(xds.canvas.overflowScroll && (_canvasbody = xds.canvas.bwrap)) {
			_canvasbody.first().dom.scrollLeft = xds.canvas.overflowScroll.left;
			_canvasbody.first().dom.scrollTop = xds.canvas.overflowScroll.top;
		}
		var me = this;
		//用于区分是分隔条split拖拽（浏览器窗口拖拽）还是组件拖放
		var isflag = false;
		var rootNode = xds.inspector.root.childNodes[0];
		if(!this.el.dom) {
			// return false
			var activeCmpId = this.viewerNode.component.activeCmpId;
			activeCmpId = rootNode.component.activeCmpId
			me = Ext.getCmp(activeCmpId);
			isflag = true;

		}

		var resizeObj = xds.canvas.body.getStyleSize();
		var pageWidth = Ext.getDom(me.el.id).parentNode.scrollWidth;
		var pageHeight = Ext.getDom(me.el.id).parentNode.scrollHeight;
		if(rootNode.childNodes && rootNode.childNodes.length > 0 && (resizeObj.width < pageWidth - 10)) {
			resizeObj.width = pageWidth;
		}
		if(rootNode.childNodes && rootNode.childNodes.length > 0 && (resizeObj.height < pageHeight - 10)) {
			resizeObj.height = pageHeight;
		}

		me.setSize(resizeObj);

		//if (isflag) {
		Ext.lib.Event.resume();
		xds.canvas.syncAll.defer(50, xds.canvas)
		// };
		//修复浏览器窗口改变n次加载的bug
		return false
		////mafei 修复layout split引起的拖拽报错
		//if (this.el && !this.el.dom) {

		//    this.el = xds.canvas.body.child("div:first");
		//    if (this.el) {
		//        this.bwrap = this.el.select("div[class='page-bwrap']", true).elements[0];
		//        this.ft = this.el.select("div[class*=page-bl]", true).elements[0];;
		//        this.mc = this.el.select("div[class='page-mc']", true).elements[0];
		//        this.body = this.el.select("div[class*=page-body]", true).elements[0];
		//    }

		//}

		//this.el && this.body && this.setSize(xds.canvas.body.getStyleSize());

	}
});
Ext.reg("xdviewport", xds.Viewport);

xds.types.Window = Ext.extend(xds.PanelBase, {
	cid: "window",
	defaultName: "&lt;window&gt;",
	text: "Window(窗口)",
	dtype: "xdwindow",
	xtype: "window",
	xcls: "Ext.Window",
	iconCls: "icon-window",
	naming: "MyWindow",
    hide:true,
	isValidParent: function(a) {
		return !a || a.cid == "viewport"
	},
	isResizable: function(a, b) {
		return true
	},
	defaultConfig: {
		title: "Window",
		width: 400,
		height: 250
	},
	initConfig: function(opts, parent, comp) {
		//修复默认窗体不显示的问题
		opts.hidden = false;
	},
	configs: [{
		name: "closable",
		group: "Ext.Window",
		ctype: "boolean",
		defaultValue: true
	}, {
		name: "closeAction",
		group: "Ext.Window",
		ctype: "string",
		editor: "options",
		options: ["close", "hide"],
		defaultValue: "close"
	}, {
		name: "constrain",
		group: "Ext.Window",
		ctype: "boolean"
	}, {
		name: "constrainHeader",
		group: "Ext.Window",
		ctype: "boolean"
	}, {
		name: "draggable",
		group: "Ext.Window",
		ctype: "boolean",
		defaultValue: true
	}, {
		name: "maximizable",
		group: "Ext.Window",
		ctype: "boolean"
	}, {
		name: "minHeight",
		group: "Ext.Window",
		ctype: "number",
		defaultValue: 100
	}, {
		name: "minimizable",
		group: "Ext.Window",
		ctype: "boolean"
	}, {
		name: "minWidth",
		group: "Ext.Window",
		ctype: "number",
		defaultValue: 200
	}, {
		name: "modal",
		group: "Ext.Window",
		ctype: "boolean"
	}, {
		name: "plain",
		group: "Ext.Window",
		ctype: "boolean"
	}, {
		name: "resizable",
		group: "Ext.Window",
		ctype: "boolean",
		defaultValue: true
	}, {
		name: "autoScroll",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "bodyBorder",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "bodyStyle",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "border",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "buttonAlign",
		group: "Ext.Panel",
		ctype: "string",
		editor: "options",
		options: ["center", "left", "right"],
		defaultValue: "right"
	}, {
		name: "collapsedCls",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "collapsible",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "disabled",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "elements",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "footer",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "hideCollapseTool",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "html",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "iconCls",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "maskDisabled",
		group: "Ext.Panel",
		ctype: "boolean",
		defaultValue: true
	}, {
		name: "minButtonWidth",
		group: "Ext.Panel",
		ctype: "number"
	}, {
		name: "padding",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "shadow",
		group: "Ext.Panel",
		ctype: "string",
		editor: "options",
		options: ["sides", "drop", "frame"]
	}, {
		name: "shadowOffset",
		group: "Ext.Panel",
		ctype: "number"
	}, {
		name: "tabTip",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "title",
		group: "Ext.Panel",
		ctype: "string"
	}, {
		name: "titleCollapse",
		group: "Ext.Panel",
		ctype: "boolean"
	}, {
		name: "activeItem",
		group: "Ext.Container",
		ctype: "string"
	}, {
		name: "autoDestroy",
		group: "Ext.Container",
		ctype: "boolean"
	}, {
		name: "defaultType",
		group: "Ext.Container",
		ctype: "string"
	}, {
		name: "hideBorders",
		group: "Ext.Container",
		ctype: "boolean"
	}, {
		name: "layout",
		group: "Ext.Container",
		ctype: "string",
		editor: "options",
		options: xds.layouts
	}, {
		name: "autoHeight",
		group: "Ext.BoxComponent",
		ctype: "boolean"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "pageX",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "pageY",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "itemId",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "overCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}]
});
xds.Registry.register(xds.types.Window);
xds.Window = Ext.extend(Ext.Panel, {
	baseCls: "x-window",
	closable: true,
	elements: "header,body",
	frame: true,
	initEvents: function() {
		xds.Window.superclass.initEvents.call(this);
		if(this.minimizable) {
			this.addTool({
				id: "minimize"
			})
		}
		if(this.maximizable) {
			this.addTool({
				id: "maximize"
			})
		}
		if(this.closable) {
			this.addTool({
				id: "close"
			})
		}
	},
	onRender: function() {
		xds.Window.superclass.onRender.apply(this, arguments);
		if(this.plain) {
			this.el.addClass("x-window-plain")
		}
	}
});
Ext.reg("xdwindow", xds.Window);

xds.types.FieldSet = Ext.extend(xds.Component, {
	cid: "fieldset",
	category: "Containers",
	defaultName: "&lt;fieldset&gt;",
	text: "FieldSet",
	dtype: "xdfieldset",
	xtype: "fieldset",
	xcls: "Ext.form.FieldSet",
	iconCls: "icon-fieldset",
	naming: "hwFieldSet",
	enableFlyout: true,
	isContainer: true,
    hide:true,
	defaultConfig: {
		title: "My Fields",
		layout: "absolute",
		checkboxToggle: true
	},
	isResizable: function(a, b) {
		return true
	},
	initConfig: function(b, a) {
		if(!a) {
			b.width = 400
		}
	},
	onFlyout: function() {
		return new xds.Flyout({
			title: this.getNode().text,
			component: this,
			items: [{
				xtype: "flyoutselect",
				fieldLabel: "选择一种布局方式",
				data: xds.layouts,
				bindTo: {
					component: this,
					name: "layout",
					event: "select",
					defaultValue: "auto"
				}
			}]
		})
	},
	onFilmDblClick: function(b) {
		var a = this.getExtComponent();
		if(a.header && a.header.getRegion().contains(b.getPoint())) {
			xds.canvas.startEdit(this, a.header, this
				.getConfigObject("title"))
		} else {
			xds.types.Fieldset.superclass.onFilmDblClick.call(this, b)
		}
	},
	configs: [{
			name: "checkboxToggle",
			group: "Ext.form.FieldSet",
			ctype: "boolean"
		}, {
			name: "title",
			group: "Ext.form.FieldSet",
			ctype: "string"
		}, {
			name: "autoScroll",
			group: "Ext.Panel",
			ctype: "boolean"
		}, {
			name: "baseCls",
			group: "Ext.Panel",
			ctype: "string"
		}, {
			name: "bodyStyle",
			group: "Ext.Panel",
			ctype: "string"
		}, {
			name: "collapsedCls",
			group: "Ext.Panel",
			ctype: "string"
		},
		{
			name: "collapsible",
			group: "Ext.Panel",
			ctype: "boolean"
		},
		{
			name: "collapsed",
			group: "Ext.Panel",
			ctype: "boolean"
		}, {
			name: "html",
			group: "Ext.Panel",
			ctype: "string",
			editor: 'html'
		}, {
			name: "padding",
			group: "Ext.Panel",
			ctype: "string"
		}, {
			name: "autoDestroy",
			group: "Ext.Container",
			ctype: "boolean"
		}, {
			name: "layout",
			group: "Ext.Container",
			ctype: "string",
			editor: "options",
			options: xds.layouts
		}, {
			name: "autoHeight",
			group: "Ext.BoxComponent",
			ctype: "boolean"
		}, {
			name: "autoWidth",
			group: "Ext.BoxComponent",
			ctype: "boolean"
		}, {
			name: "height",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "width",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "x",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "y",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "cls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "ctCls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "disabled",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "disabledClass",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "hideMode",
			group: "Ext.Component",
			ctype: "string",
			editor: "options",
			options: ["display", "offsets", "visibility"]
		}, {
			name: "id",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "itemId",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "overCls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "style",
			group: "Ext.Component",
			ctype: "string",
			editor: 'css'
		}
	]
});
xds.Registry.register(xds.types.FieldSet);
xds.FieldSet = Ext.extend(Ext.form.FieldSet, {});
Ext.reg("xdfieldset", xds.FieldSet);

xds.types.Label = Ext.extend(xds.Component, {
	cid: "label",
	category: "Standard",
	defaultName: "&lt;label&gt;",
	text: "Label(标签)",
	dtype: "xdlabel",
	xtype: "label",
	xcls: "Ext.form.Label",
	iconCls: "icon-label",
	naming: "label",
	filmCls: "el-film-nolabel",
	defaultConfig: {
		text: "lable:"
	},
	isResizable: function(a, b) {
		//return a == "Right"
		//		&& !this.getConfigValue("anchor")
		//		&& (!this.owner || this.owner.getConfigValue("layout") != "form")
		return true;
	},
	onFilmDblClick: function(b) {
		var a = this.getExtComponent();
		xds.canvas.startEdit(this, a.el, this.getConfigObject("text"))
	},
	configs: [{
		name: "forId",
		group: "Ext.form.Labl",
		ctype: "string"
	}, {
		name: "html",
		group: "Ext.form.Labl",
		ctype: "string"
	}, {
		name: "text",
		group: "Ext.form.Labl",
		ctype: "string"
	}, {
		name: "autoHeight",
		group: "Ext.BoxComponent",
		ctype: "boolean"
	}, {
		name: "autoWidth",
		group: "Ext.BoxComponent",
		ctype: "boolean"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "overCls",
		group: "Ext.Component",
		ctype: "string"
	}]
});
xds.Registry.register(xds.types.Label);
xds.Label = Ext.extend(Ext.form.Label, {});
Ext.reg("xdlabel", xds.Label);

xds.types.Toolbar = Ext.extend(xds.Component, {
	cid: "toolbar",
	category: "Toolbar",
	defaultName: "&lt;toolbar&gt;",
	text: "Toolbar",
	dtype: "xdtoolbar",
	xtype: "toolbar",
	xcls: "Ext.Toolbar",
	iconCls: "icon-toolbar",
	naming: "MyToolbar",
	enableFlyout: true,
	isContainer: true,
	hide: true,
	dock: "tbar",
	defaultConfig: {},
	initConfig: function(b, a) {
		if(!a) {
			b.width = 400
		}
	},
	configs: [{
		name: "autoDestroy",
		group: "Ext.Container",
		ctype: "boolean"
	}, {
		name: "defaultType",
		group: "Ext.Container",
		ctype: "string"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "pageX",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "pageY",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "hideMode",
		group: "Ext.Component",
		ctype: "string",
		editor: "options",
		options: ["display", "offsets", "visibility"]
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "itemId",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "overCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "stateful",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}],
	getEditorConfigs: function() {
		if(!this.owner) {
			return xds.types.Toolbar.superclass.getEditorConfigs
				.call(this)
		}
		return xds.dockConfigs
	},
	onFlyout: function() {
		return new xds.Flyout({
			title: this.getNode().text,
			component: this,
			items: [{
				xtype: "flyoutselect",
				fieldLabel: "Dock in parent",
				data: ["(none)", "tbar", "bbar",
					"fbar"
				],
				bindTo: {
					component: this,
					name: "dock",
					event: "select",
					defaultValue: "(none)",
					clear: "(none)"
				}
			}]
		})
	},
	isValidParent: function(a) {

		return !a || a.cid == "panel" || a.cid == "grid" || a.cid == "window";
	}
});
xds.Registry.register(xds.types.Toolbar);
xds.Toolbar = Ext.extend(Ext.Toolbar, {
	afterRender: function() {
		if(!this.items || this.items.length < 1) {
			this.height = 27
		}
		xds.Toolbar.superclass.afterRender.call(this)
	}
});
Ext.reg("xdtoolbar", xds.Toolbar);
xds.types.ToolbarFill = Ext.extend(xds.Component, {
	cid: "tbfill",
	category: "Toolbar",
	defaultName: "&lt;fill&gt;",
	text: "Fill",
	dtype: "xdtbfill",
	xtype: "tbfill",
	xcls: "Ext.Toolbar.Fill",
	iconCls: "icon-cmp",
	naming: "MyFill",
	filmCls: "el-film-nolabel",
	hide: true,
	isContainer: false,
	defaultConfig: {},
	configs: [{
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "hideMode",
		group: "Ext.Component",
		ctype: "string",
		editor: "options",
		options: ["display", "offsets", "visibility"]
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "itemId",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}]
});
xds.Registry.register(xds.types.ToolbarFill);
xds.ToolbarFill = Ext.extend(Ext.Toolbar.Fill, {});
Ext.reg("xdtbfill", xds.ToolbarFill);
/*ext grid集成*/
xds.types.GridPanel = Ext.extend(xds.PanelBase, {
	cid: "grid",
	category: "Grid",
	defaultName: "&lt;grid&gt;",
	text: "Grid Panel",
	dtype: "xdgrid",
	xtype: "grid",
	xcls: "Ext.grid.GridPanel",
	iconCls: "icon-grid",
	naming: "MyGrid",
	isContainer: true,
	autoScrollable: false,
	layoutable: false,
	enableFlyout: false,
	validChildTypes: ["gridcolumn", "booleancolumn", "checkcolumn", "numbercolumn",
		"datecolumn", "templatecolumn", "jsonstore", "arraystore",
		"xmlstore", "toolbar", "pagingtoolbar"
	],
	defaultConfig: {
		title: "Grid Panel",
		loadMask: true

	},
	initConfig: function(b, a) {
		if(!a) {
			b.width = 400;
			b.height = 250
		}
	},
	isResizable: function(a, b) {
		return !this.isFit() && !this.isAnchored()
	},
	isValidChild: function(a) {

		return this.superclass.isValidChild.apply(this, arguments)
	},
	configs: [{
			name: "enableHdMenu",
			group: "Ext.grid.GridPanel",
			ctype: "boolean",
			defaultValue: true
		}, {
			name: "disableHeaderClick",
			group: "Ext.grid.GridPanel",
			ctype: "boolean",
			defaultValue: false
		}, {
			name: "hideHeaders",
			group: "Ext.grid.GridPanel",
			ctype: "boolean"
		}, {
			name: "border",
			group: "Ext.Panel",
			ctype: "boolean",
			defaultValue: true
		}, {
			name: "header",
			group: "Ext.Panel",
			ctype: "boolean",
			defaultValue: true
		}, {
			name: "title",
			group: "Ext.Panel",
			ctype: "string"
		}, {
			name: "height",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "width",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "x",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "y",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "cls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "ctCls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "disabled",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "disabledClass",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "id",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "style",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "store",
			group: "数据",
			ctype: "string",
			editor: "options",
			edConfig: {
				type: "store"
			}
		},
		{
			name: "rowcontextmenu",
			group: "事件",
			editor: "ace",
			ctype: "string",
			params: "rowIndex,e"
		},
		{
			name: "cellclick",
			group: "事件",
			editor: "ace",
			ctype: "string",
			params: "rowIndex,columnIndex,e"
		},
		{
			name: "celldblclick",
			group: "事件",
			editor: "ace",
			ctype: "string",
			params: "rowIndex,columnIndex,e"
		},
		{
			name: "keydown",
			group: "事件",
			editor: "ace",
			ctype: "string",
			params: ""
		},
		{
			name: "keypress",
			group: "事件",
			editor: "ace",
			ctype: "string",
			params: ""
		},
		{
		    name: "checked",
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "field,val,record,rowIndex,columnIndex,e"
		}
	],
	createCanvasConfig: function(h) {
		var g = Ext.apply({}, this.getConfig());
		g.xtype = this.dtype;
		g.stateful = false;
		g.viewerNode = h;
		this.activeCmpId = g.id = Ext.id();
		g.cls = "x-panel-animated";
		g.columns = [];
		for(var e = 0, a = h.childNodes.length, b, f; e < a; e++) {
			f = h.childNodes[e].component;
			if(f.isStore) {
				g.store = f.createCanvasConfig(h.childNodes[e])
			} else {
				if(!this.assignDocked(g, f) && f.xtype != "toolbar") {
					var d = f.getConfig();
					d.xtype = f.xtype;
					g.columns.push(d)
				}
			}
		}
		return g
	},
	getTargetColumnIndex: function(h) {
		var a = this.getExtComponent();
		if(a) {
			var n = h.getPoint();
			var l = a.view.mainHd.getRegion();
			if(!l.contains(n)) {
				return false
			}
			var m = n.left;
			var b = l.left;
			var j = a.colModel.config;
			var d = 0,
				f = false;
			for(var d = 0, g = j.length, k; k = j[d]; d++) {
				if(!k.hidden) {
					b += k.width;
					if(m <= b) {
						f = d;
						break
					}
				}
			}
			return f
		}
		return false
	},
	getTargetColumn: function(a) {
		if(typeof a == "object") {
			a = this.getTargetColumnIndex(a)
		}
		if(a === false) {
			return null
		}
		var b = this.getColumnNodes();
		return b[a].component
	},
	onFilmClick: function(b) {
		var a = this.getTargetColumn(b);
		if(a) {
			a.getNode().select();
			return false
		}
	},
	onFilmDblClick: function(d) {
		var a = this.getTargetColumnIndex(d);
		if(a !== false) {
			var c = this.getExtComponent().view.getHeaderCell(a);
			var b = this.getTargetColumn(a);
			xds.canvas.startEdit(b, c, b.getConfigObject("header"))
		} else {
			xds.types.GridPanel.superclass.onFilmDblClick.call(this, d)
		}
	},
	getDefaultInternals: function() {
		return {
			cid: this.cid,
			cn: [{
				cid: "gridcolumn",
				userConfig: {
					header: "Column 1",
					dataIndex: "data1"
				}
			}, {
				cid: "gridcolumn",
				userConfig: {
					header: "Column 2",
					dataIndex: "data2"
				}
			}, {
				cid: "gridcolumn",
				userConfig: {
					header: "Column 3",
					dataIndex: "data3"
				}
			}]
		}
	},
	getActions: function() {
		if(!this.actions) {
			this.actions = [new Ext.Action({
				itemId: "auto-columns",
				text: "列自动调整",
				iconCls: "icon-auto-columns",
				handler: this.doAutoColumns,
				scope: this
			})]
		}
		return this.actions
	},
	getColumnNodes: function() {
		var f = this.getNode(),
			c = f.childNodes,
			d = [];
		for(var b = 0, a = c.length, e; e = c[b]; b++) {
			if(!e.component.dock && !e.component.isStore) {
				d.push(e)
			}
		}
		return d
	},
	getStoreNode: function() {
		var a = this.getNode().firstChild;
		while(a) {
			if(a.component.isStore) {
				return a
			}
			a = a.nextSibling
		}
		return null
	},
	doAutoColumns: function() {

		var k = this.getStoreNode(),
			b = this.getNode();

		if(!k && this.userConfig.store) {
			k = xds.inspector.nodeHash[this.userConfig.store];
		}
		if(!k) {
			Ext.Msg
				.alert("警告",
					"不能读取列(字段信息)- 数据源(Store)没有定义.");
			return
		}
		xds.canvas.beginUpdate();

		var h = this.getColumnNodes();
		for(var d = 0, f; f = h[d]; d++) {
			if(f.component && f.component.cid != "templatecolumn") {
				f.parentNode.removeChild(f);
			}
		}
		var e = k.childNodes;
		for(var d = 0, f; f = e[d]; d++) {
			var j = f.component,
				g = j.getConfigValue("type"),
				a = j
				.getConfigValue("name");

			// a = j.getConfigValue("id");
			switch(g) {
				case "int":
				case "float":
					xds.inspector.restore({
						cid: "numbercolumn",
						name: a,
						userConfig: {
							header: a,
							dataIndex: a
						}
					}, b);
					break;
				case "date":
					xds.inspector.restore({
						cid: "datecolumn",
						name: a,
						userConfig: {
							header: a,
							dataIndex: a
						}
					}, b);
					break;
				case "boolean":
					xds.inspector.restore({
						cid: "checkcolumn",
						name: a,
						userConfig: {
							header: a,
							dataIndex: a
						}
					}, b);
					break;
				default:
					xds.inspector.restore({
						cid: "gridcolumn",
						name: a,
						userConfig: {
							header: a,
							dataIndex: a
						}
					}, b);
					break
			}
		}
		xds.canvas.endUpdate();
		xds.fireEvent("componentchanged")
	}
});
xds.Registry.register(xds.types.GridPanel);
xds.GridPanel = Ext.extend(Ext.grid.GridPanel, {
	//20171122
	initComponent: function() {

		//this.store = this.store || new Ext.data.JsonStore();
		if(typeof this.store == "string" || typeof this.store == "undefined") {
			var store = xds.inspector.nodeHash[this.store]
			//if (store) {
			//   // this.createStore(b, true)
			//    this.store = store;
			//} else {
			//    this.store = new Ext.data.JsonStore();
			//}
			this.store = new Ext.data.JsonStore();
		}
		this.callParent(arguments)
	},
	afterRender: function() {
		xds.GridPanel.superclass.afterRender.call(this);
		if(false && this.store && this.store.viewerNode) {
			this.createFloater(this.store.viewerNode.id,
				this.store.storeId, this.store.iconCls)
		}
	}
});
Ext.reg("xdgrid", xds.GridPanel);
xds.GridPanel.DefaultStore = new Ext.data.JsonStore({
	storeId: "(none)",
	fields: ["data1", "data2", "data3"],
	data: [{
		data1: "cell",
		data2: "cell",
		data3: "cell"
	}, {
		data1: "cell",
		data2: "cell",
		data3: "cell"
	}, {
		data1: "cell",
		data2: "cell",
		data3: "cell"
	}]
});
Ext.onReady(function() {
	xds.Config.editors.columns = new Ext.grid.GridEditor(new xds.MoreField({
		value: "(Collection)",
		setRawValue: function(a) {
			this.value = a
		},
		onMoreClick: function(b) {
			var a = new xds.ColumnWindow();
			a.component = xds.active.component;
			a.show(b.target)
		}
	}))
});
xds.StoreBase = Ext.extend(xds.Component, {
	category: "Grid",
	defaultName: "&lt;store&gt;",
	naming: "MyStore",
	isVisual: false,
	isContainer: true,
	isStore: true,
	validChildTypes: ["datafield"],
	isInvisible: true,
	defaultConfig: {},
	initConfig: function(b, a) {
		b.storeId = this.id
	},
	setConfig: function(a, b) {
		xds.StoreBase.superclass.setConfig.call(this, a, b);
		this.reconfigure();
		if(a == "url" && this.actions) {
			this.actions[0][b ? "enable" : "disable"]();
			this.actions[0].initialConfig.disabled = !b
		}
	},
	reconfigure: function(d) {
		var b = xds.StoreCache.get(this.owner.id);
		var e = this.processConfig(b.viewerNode);
		e.cache = false;
		var a = this.createStore(e, false);
		b.reader = a.reader;
		b.proxy = a.proxy;
		if(b.proxy) {
			b.proxy.on("loadexception", this.onLoadException, this)
		}
		b.remoteSort = a.remoteSort;
		b.sortDir = a.sortDir;
		b.sortField = a.sortField;
		b.url = a.url;
		if(d !== false && b.dataCache) {
			b.loadData(b.dataCache)
		}
	},
	createCanvasConfig: function(d) {
		var a = xds.StoreCache.get(this.owner.id);
		if(!a) {
			var b = this.processConfig(d);
			b.viewerNode = d;
			b.component = this.owner;
			a = this.createStore(b, true)
		}
		return a
	},
	onLoadException: function() {
		xds.status.el.update("");
		Ext.Msg
			.alert("Error",
				"Unable to load data using the supplied configuration.");
		this.setSuffix("load error", "error")
	},
	processConfig: function(e) {
		var d = Ext.apply({}, this.getConfig());
		d.xtype = this.xtype;
		d.fields = [];
		d.autoLoad = false;
		d.iconCls = this.iconCls;
		if(e.hasChildNodes()) {
			for(var b = 0, a = e.childNodes.length; b < a; b++) {
				d.fields.push(e.childNodes[b].component.getConfig())
			}
		}
		return d
	},
	getActions: function() {
		if(!this.actions) {
			var a = function(c) {
				var b = [];
				for(var d = 0; d < c; d++) {
					xds.inspector.restore({
						cid: "datafield"
					}, this.getNode())
				}
			};
			this.actions = [new Ext.Action({
				itemId: "store-load",
				text: "加载数据",
				iconCls: "icon-load",
				handler: function() {
					var b = xds.StoreCache
						.get(this.owner.id);
					delete b.dataCache;
					b.reload()
				},
				scope: this,
				disabled: !this.getConfigValue("url")
			}), new Ext.Action({
				itemId: "quick-add",
				text: designer.ContextMenu.QuickAdd,
				hideOnClick: false,
				menu: {
					zIndex: 80001,
					items: [{
						text: "1 field",
						handler: a.createDelegate(
							this, [1])
					}, {
						text: "2 field",
						handler: a.createDelegate(
							this, [2])
					}, {
						text: "3 field",
						handler: a.createDelegate(
							this, [3])
					}, {
						text: "4 field",
						handler: a.createDelegate(
							this, [4])
					}, {
						text: "5 field",
						handler: a.createDelegate(
							this, [5])
					}]
				}
			})]
		}
		return this.actions
	},
	isValidParent: function(a) {
		if(a && a.getStoreNode) {
			return !a.getStoreNode()
		}
		return true
	}
});
xds.types.JsonStore = Ext.extend(xds.StoreBase, {
	cid: "jsonstore",
	text: "Data",
	xtype: "jsonstore",
	dtype: "jsonstore",
	xcls: "Ext.data.JsonStore",
	iconCls: "icon-json",
	createStore: function(a, c) {
		a = a || {};
		a.proxy = a.proxy || new Ext.data.HttpProxy(a);
		var b = new Ext.data.JsonStore(a);

		// var _data = "var data={0};return data;"
		// config.data = String.format(_data, Ext.encode(data));
		if(c) {
			b.on("beforeload", function() {
				if(!b.proxy.conn.url) {
					Ext.Msg
						.alert("Warning",
							'Could not load JsonStore, "url" has not been set.');
					return false
				}
				if(b.dataCache) {
					b.loadData(b.dataCache);
					return false
				} else {
					xds.status.el.update("Loading store...")
				}
			});
			b.on("load", function(d) {
				d.dataCache = d.reader.jsonData;
				xds.status.el.update("");
				this.setSuffix((d.data.length) + " records loaded",
					"loaded")
			}, this);
			b.proxy.on("loadexception", this.onLoadException, this)
		}
		return b
	},
	defaultConfig: {
		autoLoad: false
	},
	configs: [{
			name: "idProperty",
			group: "Ext.data.JsonStore",
			ctype: "string"
		}, {
			name: "root",
			group: "Ext.data.JsonStore",
			ctype: "string"
		}, {
			name: "totalProperty",
			group: "Ext.data.JsonStore",
			ctype: "string"
		}, {
			name: "autoLoad",
			group: "Ext.data.Store",
			ctype: "boolean"
		}, {
			name: "remoteSort",
			group: "Ext.data.Store",
			ctype: "boolean"
		}, {
			name: "sortDir",
			group: "Ext.data.Store",
			ctype: "string",
			editor: "options",
			options: ["ASC", "DESC"]
		}, {
			name: "sortField",
			group: "Ext.data.Store",
			ctype: "string"
		}, {
			name: "storeId",
			group: "Ext.data.Store",
			ctype: "string"
		}, {
			name: "url",
			group: "Ext.data.Store",
			ctype: "string"
		}

	]
});
xds.Registry.register(xds.types.JsonStore);

xds.ColumnBase = Ext.extend(xds.Component, {
	category: "Grid",
	defaultName: "&lt;column&gt;",
	naming: "MyColumn",
	isVisual: false,
	setConfig: function(a, b) {
		xds.ColumnBase.superclass.setConfig.call(this, a, b);
		if(a == "dataIndex") {
			var c = this.getConfigValue("id");
			//this.setName(c ? c : (b || this.defaultName))
			this.setName((b || this.defaultName))
		}
	},
	defaultConfig: {
		header: "column",
		sortable: true,
		resizable: true,
		dataIndex: "",
		width: 100
	},
	initConfig: function(b, a) {}
});
xds.types.GridColumn = Ext.extend(xds.ColumnBase, {
	cid: "gridcolumn",
	text: "Grid Column",
	xtype: "gridcolumn",
	dtype: "xdgridcolumn",
	xcls: "Ext.grid.Column",
	iconCls: "icon-grid-column",
	configs: [{
			name: "align",
			group: "Ext.grid.Column",
			ctype: "string",
			editor: "options",
			options: ["center", "left", "right"]
		}, {
			name: "css",
			group: "Ext.grid.Column",
			ctype: "string",
			editor:"style"
		}, {
			name: "dataIndex",
			group: "Ext.grid.Column",
			ctype: "string",
			editor: "options",
			edConfig: {
			    editable: true,
			    forceSelection: false,
			    type: "storeField",
			    cname: "store",
			    storeFromParent: true
			}
		}, {
			name: "fixed",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "header",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.grid.Column",
			ctype: "boolean"
		},
		//{
		//    name: "id",
		//    group: "Ext.grid.Column",
		//    ctype: "string"
		//},
		{
			name: "menuDisabled",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "resizable",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "tooltip",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "width",
			group: "Ext.grid.Column",
			ctype: "number"
		}
	]
});
xds.Registry.register(xds.types.GridColumn);
/*xds.types.BooleanColumn = Ext.extend(xds.ColumnBase, {
	cid: "booleancolumn",
	defaultName: "&lt;booleanColumn&gt;",
	text: "Boolean Column",
	xtype: "booleancolumn",
	dtype: "xdbooleancolumn",
	xcls: "Ext.grid.BooleanColumn",
	iconCls: "icon-grid-bool",
	configs: [{
			name: "align",
			group: "Ext.grid.Column",
			ctype: "string",
			editor: "options",
			options: ["center", "left", "right"]
		}, {
			name: "css",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "dataIndex",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "fixed",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "header",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.grid.Column",
			ctype: "boolean"
		},
		//{
		//    name: "id",
		//    group: "Ext.grid.Column",
		//    ctype: "string"
		//},
		{
			name: "menuDisabled",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "resizable",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "tooltip",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "width",
			group: "Ext.grid.Column",
			ctype: "number"
		}
	]
});
xds.Registry.register(xds.types.BooleanColumn);
*/
xds.types.CheckColumn = Ext.extend(xds.ColumnBase, {
    cid: "checkcolumn",
    defaultName: "&lt;checkcolumn&gt;",
    text: "Check Column",
    xtype: "checkcolumn",
    dtype: "xdcheckcolumn",
    xcls: "Ext.grid.CheckColumn",
    iconCls: "icon-grid-bool",
    configs: [{
        name: "align",
        group: "Ext.grid.Column",
        ctype: "string",
        editor: "options",
        options: ["center", "left", "right"]
    }, {
        name: "css",
        group: "Ext.grid.Column",
        ctype: "string"
    }, {
        name: "dataIndex",
        group: "Ext.grid.Column",
        ctype: "string",
        editor: "options",
        edConfig: {
            editable: true,
            forceSelection: false,
            type: "storeField",
            cname: "store",
            storeFromParent:true
        }
    }, {
        name: "fixed",
        group: "Ext.grid.Column",
        ctype: "boolean"
    }, {
        name: "header",
        group: "Ext.grid.Column",
        ctype: "string"
    }, {
        name: "hidden",
        group: "Ext.grid.Column",
        ctype: "boolean"
    },
		//{
		//    name: "id",
		//    group: "Ext.grid.Column",
		//    ctype: "string"
		//},
		{
		    name: "menuDisabled",
		    group: "Ext.grid.Column",
		    ctype: "boolean"
		}, {
		    name: "resizable",
		    group: "Ext.grid.Column",
		    ctype: "boolean"
		}, {
		    name: "tooltip",
		    group: "Ext.grid.Column",
		    ctype: "string"
		}, {
		    name: "width",
		    group: "Ext.grid.Column",
		    ctype: "number"
		}
    ]
});
xds.Registry.register(xds.types.CheckColumn);
xds.types.NumberColumn = Ext.extend(xds.ColumnBase, {
	cid: "numbercolumn",
	defaultName: "&lt;numberColumn&gt;",
	text: "Number Column",
	xtype: "numbercolumn",
	dtype: "xdnumbercolumn",
	xcls: "Ext.grid.NumberColumn",
	iconCls: "icon-grid-num",
	defaultConfig: {
		header: "column",
		sortable: true,
		resizable: true,
		dataIndex: "",
		width: 100,
		format: "0,000.00"
	},
	configs: [{
			name: "align",
			group: "Ext.grid.Column",
			ctype: "string",
			editor: "options",
			options: ["center", "left", "right"]
		}, {
			name: "css",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "dataIndex",
			group: "Ext.grid.Column",
			ctype: "string",
			editor: "options",
			edConfig: {
			    editable: true,
			    forceSelection: false,
			    type: "storeField",
			    cname: "store",
			    storeFromParent: true
			}
		}, {
			name: "fixed",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "format",
			group: "Ext.grid.NumberColumn",
			ctype: "string"
		}, {
			name: "header",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.grid.Column",
			ctype: "boolean"
		},
		//{
		//    name: "id",
		//    group: "Ext.grid.Column",
		//    ctype: "string"
		//},
		{
			name: "menuDisabled",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "resizable",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "tooltip",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "width",
			group: "Ext.grid.Column",
			ctype: "number"
		}
	]
});
xds.Registry.register(xds.types.NumberColumn);
xds.types.DateColumn = Ext.extend(xds.ColumnBase, {
	cid: "datecolumn",
	defaultName: "&lt;dateColumn&gt;",
	text: "Date Column",
	xtype: "datecolumn",
	dtype: "xddatecolumn",
	xcls: "Ext.grid.DateColumn",
	iconCls: "icon-grid-date",
	defaultConfig: {
		header: "column",
		sortable: true,
		resizable: true,
		dataIndex: "",
		width: 100,
		format: "m/d/Y"
	},
	configs: [{
			name: "align",
			group: "Ext.grid.Column",
			ctype: "string",
			editor: "options",
			options: ["center", "left", "right"]
		}, {
			name: "css",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "dataIndex",
			group: "Ext.grid.Column",
			ctype: "string",
			editor: "options",
			edConfig: {
			    editable: true,
			    forceSelection: false,
			    type: "storeField",
			    cname: "store",
			    storeFromParent: true
			}
		}, {
			name: "fixed",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "format",
			group: "Ext.grid.DateColumn",
			ctype: "string"
		}, {
			name: "header",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.grid.Column",
			ctype: "boolean"
		},
		//{
		//    name: "id",
		//    group: "Ext.grid.Column",
		//    ctype: "string"
		//},
		{
			name: "menuDisabled",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "resizable",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "tooltip",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "width",
			group: "Ext.grid.Column",
			ctype: "number"
		}
	]
});
xds.Registry.register(xds.types.DateColumn);
xds.types.TemplateColumn = Ext.extend(xds.ColumnBase, {
	cid: "templatecolumn",
	defaultName: "&lt;templateColumn&gt;",
	text: "Template Column",
	xtype: "templatecolumn",
	dtype: "xdtemplatecolumn",
	xcls: "Ext.grid.TemplateColumn",
	iconCls: "icon-grid-tpl",
	defaultConfig: {
		header: "column",
		sortable: true,
		resizable: true,
		dataIndex: "",
		width: 100,
		tpl: ""
	},
	configs: [{
			name: "align",
			group: "Ext.grid.Column",
			ctype: "string",
			editor: "options",
			options: ["center", "left", "right"]
		}, {
			name: "css",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "dataIndex",
			group: "Ext.grid.Column",
			ctype: "string",
			editor: "options",
			edConfig: {
			    editable: true,
			    forceSelection: false,
			    type: "storeField",
			    cname: "store",
			    storeFromParent: true
			}
		}, {
			name: "fixed",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "tpl",
			group: "Ext.grid.TemplateColumn",
			ctype: "string",
			editor: "html"
		}, {
			name: "header",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}
		//,
		//{
		//    name: "id",
		//    group: "Ext.grid.Column",
		//    ctype: "string"
		//}
		, {
			name: "menuDisabled",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "resizable",
			group: "Ext.grid.Column",
			ctype: "boolean"
		}, {
			name: "tooltip",
			group: "Ext.grid.Column",
			ctype: "string"
		}, {
			name: "width",
			group: "Ext.grid.Column",
			ctype: "number"
		}
	]
});
xds.Registry.register(xds.types.TemplateColumn);
xds.types.DataField = Ext.extend(xds.Component, {
	cid: "datafield",
	category: "Grid",
	name: "Field",
	text: "Field",
	xtype: "datafield",
	dtype: "xddatafield",
	xcls: "Ext.data.DataField",
	iconCls: "icon-data-field",
	naming: "Field",
	isVisual: false,
	isNotComponent: true,
	isInvisible: true,
	defaultConfig: {
		name: "field",
		type: "auto"
	},
	initConfig: function(b, a) {
		b.storeId = this.id
	},
	setConfig: function(a, b) {
		this.superclass.setConfig.call(this, a, b);
		this.owner.reconfigure && this.owner.reconfigure()
	},
	configs: [{
		name: "dateFormat",
		group: "Ext.data.DataField",
		ctype: "string"
	}, {
		name: "mapping",
		group: "Ext.data.DataField",
		ctype: "string"
	}, {
		name: "name",
		group: "Ext.data.DataField",
		ctype: "string"
	}, {
		name: "sortDir",
		group: "Ext.data.DataField",
		ctype: "string",
		editor: "options",
		options: ["ASC", "DESC"]
	}, {
		name: "sortType",
		group: "Ext.data.DataField",
		ctype: "string"
	}, {
		name: "type",
		group: "Ext.data.DataField",
		ctype: "string",
		editor: "options",
		options: ["auto", "boolean", "date", "float", "int",
			"string"
		]
	}]
});
xds.Registry.register(xds.types.DataField);

/*ext grid集成*/

xds.FieldBase = Ext.extend(xds.Component, {
	category: "Form Fields",
	naming: "MyField",
	defaultConfig: {
		fieldLabel: "Form Fields"
	},
	isResizable: function(a, b) {
		return a == "Right" &&
			!this.isAnchored() &&
			!this.isFit() &&
			(!this.owner || this.owner.getConfigValue("layout") != "form")
	},
	initConfig: function(c, a) {
		var b = this.owner ? this.owner.getConfigValue("layout") : "";
		if(!a) {
			c.width = 200
		} else {
			//mafei去除绝对定位下的100%扩展b == "absolute"
			if(b == "form" || b == "anchor") {
				c.anchor = "100%"
			}
		}
	}
});
xds.types.Checkbox = Ext.extend(xds.FieldBase, {
	cid: "checkbox",
	defaultName: "&lt;checkbox&gt;",
	text: "Checkbox(复选框)",
	dtype: "xdcheckbox",
	xtype: "checkbox",
	xcls: "Ext.form.Checkbox",
	iconCls: "icon-checkbox",
	naming: "hwCheckbox",
	filmCls: "el-film-nolabel",
	defaultConfig: {
		fieldLabel: "Checkbox",
		boxLabel: "boxLabel"

	},
	configs: [{
		name: "boxLabel",
		group: "Ext.form.Checkbox",
		ctype: "string"
	}, {
		name: "checked",
		group: "Ext.form.Checkbox",
		ctype: "boolean"
	},{
		name: "inputValue",
		group: "Ext.form.Checkbox",
		ctype: "string"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "fieldLabel",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "overCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "check",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "checked"
	}]
});
xds.Registry.register(xds.types.Checkbox);
xds.Checkbox = Ext.extend(Ext.form.Checkbox, {
	getFilmEl: xds.Component.getFilmEl
});
Ext.reg("xdcheckbox", xds.Checkbox);

//复选框组
xds.types.CheckboxGroup = Ext.extend(xds.Component, {
	category: "Form Fields",
	cid: "checkboxgroup",
	defaultName: "&lt;checkboxgroup&gt;",
	text: "Checkboxgroup(复选框组)",
	dtype: "xdcheckboxgroup",
	xtype: "checkboxstoregroup",
	xcls: "vmd.comp.checkboxstoregroup",
	iconCls: "icon-checkbox",
	naming: "hwCheckboxGroup",
	validChildTypes: ["checkbox"],
	isContainer: true,
	isResizable: function(a, b) {
		return true;
	},
	defaultConfig: {

		width: 200,
		height: 40,

		labelField: 'label',
		valueField: 'value',
		checkedField: 'checked',
		boxFieldName: 'mycheckbox'
	},
	getDefaultInternals: function() {

		return {
			cid: this.cid,
			cn: [{
				cid: "checkbox",
				userConfig: {
					boxLabel: "boxLabel",
					fieldLabel: ''
				}
			}, {
				cid: "checkbox",
				userConfig: {
					fieldLabel: '',
					boxLabel: "boxLabel"
				}
			}]
		}
	},
	configs: [{
			name: "height",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "width",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "x",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "y",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "cls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "ctCls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "disabled",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "disabledClass",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "id",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "style",
			group: "Ext.Component",
			ctype: "string"
		}, {
		    name: "autoScroll",
		    group: "Ext.Container",
		    ctype: "boolean"
		}, {
			name: "columns",
			group: "设计",
			ctype: "number"
		}, {
			name: "vertical",
			group: "设计",
			ctype: "boolean"
		}, {
			name: "boxFieldName",
			group: "设计",
			ctype: "string"
		},
		{
			name: "valueField",
			group: "数据",
			ctype: "string",
			editor: "options",
			edConfig: {
			    type: "storeField",
			    cname: "store",
			    editable: true,
			    forceSelection: false
			}
		}, {
			name: "labelField",
			group: "数据",
			ctype: "string",
			editor: "options",
			edConfig: {
			    type: "storeField",
			    cname: "store",
			    editable: true,
                forceSelection:false
			}
		}, {
			name: "checkedField",
			group: "数据",
			ctype: "string",
			editor: "options",
            edConfig: {
		        type: "storeField",
		        cname: "store",
		        editable: true,
		        forceSelection: false
		    }
		}, {
			name: "store",
			group: "数据",
			ctype: "string",
			editor: "options",
			edConfig: {
			    type: "store",
			    editable: true,
			    forceSelection: false
			}
		}
        , {
            name: "change",
            group: "事件",
            editor: "ace",
            ctype: "string",
            params: "checked"
        }
	]

});
xds.Registry.register(xds.types.CheckboxGroup);
xds.CheckboxGroup = Ext.extend(Ext.form.CheckboxGroup, {

});
Ext.reg("xdcheckboxgroup", xds.CheckboxGroup);

//20171223 修改日期增加日期diff
xds.types.DateField = Ext.extend(xds.FieldBase, {
	cid: "datefield",
	defaultName: "&lt;dateField&gt;",
	text: "Date Field(日期)",
	//dtype: "xddatefield",
	dtype: "datefield",
	xtype: "datefield",
	//xcls: "Ext.form.DateField",
	xcls: "Ext.ux.DateField",
	iconCls: "icon-datefield",
	naming: "hwDate",
	defaultConfig: {
		format: 'Y-m-d',
		showToday: true,
		allowBlank: true,
		defaultValue: ''
	},
	configs: [{
			name: "change",
			group: "事件",
			editor: "ace",
			ctype: "string",
            params:"newValue,oldValue"

		}, {
			name: "select",
			group: "事件",
			editor: "ace",
			ctype: "string",
            params:"date"

		},
		{
			name: "format",
			group: "Ext.form.DateField",
			ctype: "string"
		}, {
			name: "maxText",
			group: "Ext.form.DateField",
			ctype: "string"
		}, {
			name: "maxValue",
			group: "Ext.form.DateField",
			ctype: "string"
		}, {
			name: "minText",
			group: "Ext.form.DateField",
			ctype: "string"
		}, {
			name: "minValue",
			group: "Ext.form.DateField",
			ctype: "string"
		}, {
			name: "showToday",
			group: "Ext.form.DateField",
			ctype: "boolean"
		},
        {
            name: "hideTrigger",
            group: "Ext.form.DateField",
            ctype: "boolean"
        }, {
			name: "defaultValue",
			group: "Ext.form.DateField",
			ctype: "string",
			editor: "combo",
			options: [
				['(none)', ''],
				["今天", "today"],
				["上一天", "prevDay"],
				["下一天", "nextDay"],
				["上一周", "prevWeek"],
				["下一周", "nextWeek"],
                ["上一月", "prevMonth"],
				["下一月", "nextMonth"],
				["上一季度", "prev3Month"],
				["下一季度", "next3Month"],
				["上一年", "prevYear"],
				["下一年", "nextYear"]
			]
		}, {
			name: "allowBlank",
			group: "Ext.form.TextField",
			ctype: "boolean"
		}, {
			name: "blankText",
			group: "Ext.form.TextField",
			ctype: "string"
		}, {
			name: "disableKeyFilter",
			group: "Ext.form.TextField",
			ctype: "boolean"
		}, {
			name: "emptyClass",
			group: "Ext.form.TextField",
			ctype: "string"
		}, {
			name: "emptyText",
			group: "Ext.form.TextField",
			ctype: "string"
		}, {
			name: "maxLength",
			group: "Ext.form.TextField",
			ctype: "number"
		}, {
			name: "maxLengthText",
			group: "Ext.form.TextField",
			ctype: "string"
		}, {
			name: "invalidClass",
			group: "Ext.form.Field",
			ctype: "string"
		}, {
			name: "invalidText",
			group: "Ext.form.Field",
			ctype: "string"
		}, {
			name: "msgTarget",
			group: "Ext.form.Field",
			ctype: "string",
			editor: "options",
			options: ["qtip", "side", "title", "under"]
		}, {
			name: "name",
			group: "Ext.form.Field",
			ctype: "string"
		}, {
			name: "readOnly",
			group: "Ext.form.Field",
			ctype: "boolean"
		}, {
			name: "height",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "width",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "x",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "y",
			group: "Ext.BoxComponent",
			ctype: "number"
		}, {
			name: "cls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "ctCls",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "disabled",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "disabledClass",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "hidden",
			group: "Ext.Component",
			ctype: "boolean"
		}, {
			name: "id",
			group: "Ext.Component",
			ctype: "string"
		}, {
			name: "style",
			group: "Ext.Component",
			ctype: "string"
		}
	]
});
xds.Registry.register(xds.types.DateField);
xds.DateField = Ext.extend(Ext.form.DateField, {
	getFilmEl: xds.Component.getFilmEl
});

Ext.reg("xddatefield", xds.DateField);
xds.types.HtmlEditor = Ext.extend(xds.FieldBase, {
	cid: "htmleditor",
	defaultName: "&lt;htmlEditor&gt;",
	text: "Html Editor(HTML编辑器)",
	dtype: "xdhtmleditor",
	xtype: "htmleditor",
	xcls: "Ext.form.HtmlEditor",
	iconCls: "icon-html",
	naming: "hwEditor",
	defaultConfig: {
		fieldLabel: "Html Editor",
		height: 150,
		width: 300,
		enableAlignments: true,
		enableColors: true,
		enableFont: true,
		enableFontSize: true,
		enableFormat: true,
		enableLinks: true,
		enableLists: true,
	    enableSourceEdit:true
	},
	isResizable: function(a, b) {
		return !this.getConfigValue("anchor") &&
			(!this.owner || this.owner.getConfigValue("layout") != "form")
	},
	configs: [{
		name: "enableAlignments",
		group: "Ext.form.HtmlEditor",
		ctype: "boolean"
	}, {
		name: "enableColors",
		group: "Ext.form.HtmlEditor",
		ctype: "boolean"
	}, {
		name: "enableFont",
		group: "Ext.form.HtmlEditor",
		ctype: "boolean"
	}, {
		name: "enableFontSize",
		group: "Ext.form.HtmlEditor",
		ctype: "boolean"
	}, {
		name: "enableFormat",
		group: "Ext.form.HtmlEditor",
		ctype: "boolean"
	}, {
		name: "enableLinks",
		group: "Ext.form.HtmlEditor",
		ctype: "boolean"
	}, {
		name: "enableLists",
		group: "Ext.form.HtmlEditor",
		ctype: "boolean"
	}, {
		name: "enableSourceEdit",
		group: "Ext.form.HtmlEditor",
		ctype: "boolean"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}]
});
xds.Registry.register(xds.types.HtmlEditor);
xds.HtmlEditor = Ext.extend(Ext.form.HtmlEditor, {
	getFilmEl: xds.Component.getFilmEl

});
Ext.reg("xdhtmleditor", xds.HtmlEditor);
xds.types.NumberField = Ext.extend(xds.FieldBase, {
	cid: "numberfield",
	defaultName: "&lt;numberField&gt;",
	text: "Number Field(数字框)",
	dtype: "xdnumberfield",
	xtype: "numberfield",
	xcls: "Ext.form.NumberField",
	iconCls: "icon-numfield",
	naming: "hwNumber",
	filmCls: "el-film-nolabel",
	defaultConfig: {
	    allowDecimals: true,
	    allowNegative: true,
	    decimalPrecision: 2,
	    allowBlank:true
	},
	configs: [{
		name: "allowDecimals",
		group: "Ext.form.NumberField",
		ctype: "boolean"
	}, {
		name: "allowNegative",
		group: "Ext.form.NumberField",
		ctype: "boolean"
	}, {
		name: "decimalPrecision",
		group: "Ext.form.NumberField",
		ctype: "number"
	}, {
		name: "maxText",
		group: "Ext.form.NumberField",
		ctype: "string"
	}, {
		name: "maxValue",
		group: "Ext.form.NumberField",
		ctype: "number"
	}, {
		name: "minText",
		group: "Ext.form.NumberField",
		ctype: "string"
	}, {
		name: "minValue",
		group: "Ext.form.NumberField",
		ctype: "number"
	}, {
		name: "nanText",
		group: "Ext.form.NumberField",
		ctype: "string"
	}, {
		name: "allowBlank",
		group: "Ext.form.TextField",
		ctype: "boolean"
	}, {
		name: "blankText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "emptyClass",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "emptyText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "grow",
		group: "Ext.form.TextField",
		ctype: "boolean"
	}, {
		name: "growMax",
		group: "Ext.form.TextField",
		ctype: "number"
	}, {
		name: "growMin",
		group: "Ext.form.TextField",
		ctype: "number"
	}, {
		name: "maxLength",
		group: "Ext.form.TextField",
		ctype: "number"
	}, {
		name: "maxLengthText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "invalidClass",
		group: "Ext.form.Field",
		ctype: "string"
	}, {
		name: "invalidText",
		group: "Ext.form.Field",
		ctype: "string"
	}, {
		name: "msgTarget",
		group: "Ext.form.Field",
		ctype: "string",
		editor: "options",
		options: ["qtip", "side", "title", "under"]
	}, {
		name: "readOnly",
		group: "Ext.form.Field",
		ctype: "boolean"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}, {
	    name: "keydown",
	    group: "事件",
	    editor: "ace",
	    ctype: "string",
	    params: "e"

	},
     {
         name: "keypress",
         group: "事件",
         editor: "ace",
         ctype: "string",
         params: "e"

     },
      {
          name: "keyup",
          group: "事件",
          editor: "ace",
          ctype: "string",
          params: "e"

      }
	]
});
xds.Registry.register(xds.types.NumberField);
xds.NumberField = Ext.extend(Ext.form.NumberField, {
	getFilmEl: xds.Component.getFilmEl
});
Ext.reg("xdnumberfield", xds.NumberField);
xds.types.Radio = Ext.extend(xds.FieldBase, {
	cid: "radio",
	defaultName: "&lt;radio&gt;",
	text: "Radio(单选框)",
	dtype: "xdradio",
	xtype: "radio",
	xcls: "Ext.form.Radio",
	iconCls: "icon-radio",
	naming: "hwRadio",
	filmCls: "el-film-nolabel",
	defaultConfig: {
		fieldLabel: "Radio",
		boxLabel: "boxLabel"
	},
	configs: [{
		name: "boxLabel",
		group: "Ext.form.Checkbox",
		ctype: "string"
	}, {
		name: "checked",
		group: "Ext.form.Checkbox",
		ctype: "boolean"
	},  {
		name: "inputValue",
		group: "Ext.form.Checkbox",
		ctype: "string"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
	    name: "fieldLabel",
	    group: "Ext.Component",
	    ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}]
});
xds.Registry.register(xds.types.Radio);
xds.Radio = Ext.extend(Ext.form.Radio, {
	getFilmEl: xds.Component.getFilmEl
});
Ext.reg("xdradio", xds.Radio);
//复选框组
xds.types.RadioGroup = Ext.extend(xds.Component, {
    category: "Form Fields",
    cid: "radiogroup",
    defaultName: "&lt;radiogroup&gt;",
    text: "radiogroup(单选框组)",
    dtype: "xdradiogroup",
    xtype: "radiostoregroup",
    xcls: "vmd.comp.radiostoregroup",
    iconCls: "icon-radio",
    naming: "hwRadioGroup",
    validChildTypes: ["radio"],
    isContainer: true,
    isResizable: function (a, b) {
        return true;
    },
    defaultConfig: {

        width: 200,
        height: 40,

        labelField: 'label',
        valueField: 'value',
        checkedField: 'checked',
        boxFieldName: 'myRadio'
    },
    getDefaultInternals: function () {

        return {
            cid: this.cid,
            cn: [{
                cid: "radio",
                userConfig: {
                    boxLabel: "boxLabel",
                    fieldLabel: ''
                }
            }, {
                cid: "radio",
                userConfig: {
                    fieldLabel: '',
                    boxLabel: "boxLabel"
                }
            }]
        }
    },
    configs: [{
        name: "height",
        group: "Ext.BoxComponent",
        ctype: "number"
    }, {
        name: "width",
        group: "Ext.BoxComponent",
        ctype: "number"
    }, {
        name: "x",
        group: "Ext.BoxComponent",
        ctype: "number"
    }, {
        name: "y",
        group: "Ext.BoxComponent",
        ctype: "number"
    }, {
        name: "cls",
        group: "Ext.Component",
        ctype: "string"
    }, {
        name: "ctCls",
        group: "Ext.Component",
        ctype: "string"
    }, {
        name: "disabled",
        group: "Ext.Component",
        ctype: "boolean"
    }, {
        name: "disabledClass",
        group: "Ext.Component",
        ctype: "string"
    }, {
        name: "hidden",
        group: "Ext.Component",
        ctype: "boolean"
    }, {
        name: "id",
        group: "Ext.Component",
        ctype: "string"
    }, {
        name: "style",
        group: "Ext.Component",
        ctype: "string"
    }, {
        name: "autoScroll",
        group: "Ext.Container",
        ctype: "boolean"
    }, {
        name: "columns",
        group: "设计",
        ctype: "number"
    }, {
        name: "vertical",
        group: "设计",
        ctype: "boolean"
    }, {
        name: "boxFieldName",
        group: "设计",
        ctype: "string"
    },
		{
		    name: "valueField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "store",
		        editable: true,
		        forceSelection: false
		    }
		}, {
		    name: "labelField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "store",
		        editable: true,
		        forceSelection: false
		    }
		}, {
		    name: "checkedField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "store",
		        editable:true,
                forceSelection:false
		    }
		}, {
		    name: "store",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
            edConfig: {
                type: "store",
                editable: true,
                forceSelection: false
			}
		},
        {
            name: 'change',
            group: '事件',
            ctype: 'string',
            editor: 'ace',
            params:'checked'
        }
    ]

});
xds.Registry.register(xds.types.RadioGroup);
xds.RadioGroup = Ext.extend(Ext.form.RadioGroup, {

});
Ext.reg("xdradiogroup", xds.RadioGroup);
xds.types.TextField = Ext.extend(xds.FieldBase, {
	cid: "textfield",
	defaultName: "&lt;textField&gt;",
	text: "Text Field(文本框)",
	dtype: "xdtextfield",
	xtype: "textfield",
	xcls: "Ext.form.TextField",
	iconCls: "icon-textfield",
	naming: "hwText",
	defaultConfig: {
		allowBlank: true

	},
	configs: [{
		name: "allowBlank",
		group: "Ext.form.TextField",
		ctype: "boolean"
	}, {
		name: "blankText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "emptyClass",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "emptyText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "grow",
		group: "Ext.form.TextField",
		ctype: "boolean"
	}, {
		name: "growMax",
		group: "Ext.form.TextField",
		ctype: "number"
	}, {
		name: "growMin",
		group: "Ext.form.TextField",
		ctype: "number"
	}, {
		name: "maxLength",
		group: "Ext.form.TextField",
		ctype: "number"
	}, {
		name: "maxLengthText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "vtype",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "vtypeText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "focusClass",
		group: "Ext.form.Field",
		ctype: "string"
	}, {
		name: "inputType",
		group: "Ext.form.Field",
		ctype: "string"
	}, {
		name: "invalidClass",
		group: "Ext.form.Field",
		ctype: "string"
	}, {
		name: "invalidText",
		group: "Ext.form.Field",
		ctype: "string"
	}, {
		name: "msgTarget",
		group: "Ext.form.Field",
		ctype: "string",
		editor: "options",
		options: ["qtip", "side", "title", "under"]
	},{
		name: "readOnly",
		group: "Ext.form.Field",
		ctype: "boolean"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}, {
	    name: "keydown",
	    group: "事件",
	    editor: "ace",
	    ctype: "string",
	    params: "e"

	},
     {
         name: "keypress",
         group: "事件",
         editor: "ace",
         ctype: "string",
         params: "e"

     },
      {
          name: "keyup",
          group: "事件",
          editor: "ace",
          ctype: "string",
          params: "e"

      }

	]
});
xds.Registry.register(xds.types.TextField);
xds.TextField = Ext.extend(Ext.form.TextField, {
	getFilmEl: xds.Component.getFilmEl
});
Ext.reg("xdtextfield", xds.TextField);
xds.types.TextArea = Ext.extend(xds.FieldBase, {
	cid: "textarea",
	defaultName: "&lt;textArea&gt;",
	text: "Text Area(多行文本框)",
	dtype: "xdtextarea",
	xtype: "textarea",
	xcls: "Ext.form.TextArea",
	iconCls: "icon-textarea",
	naming: "hwTextArea",
	isResizable: function(a, b) {
		return !this.getConfigValue("anchor") &&
			(!this.owner || this.owner.getConfigValue("layout") != "form")
	},
	defaultConfig: {
		allowBlank: true

	},
	configs: [{
		name: "allowBlank",
		group: "Ext.form.TextField",
		ctype: "boolean"
	}, {
		name: "blankText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "emptyClass",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "emptyText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "grow",
		group: "Ext.form.TextField",
		ctype: "boolean"
	}, {
		name: "growMax",
		group: "Ext.form.TextField",
		ctype: "number"
	}, {
		name: "growMin",
		group: "Ext.form.TextField",
		ctype: "number"
	}, {
		name: "maxLength",
		group: "Ext.form.TextField",
		ctype: "number"
	}, {
		name: "maxLengthText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "vtype",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "vtypeText",
		group: "Ext.form.TextField",
		ctype: "string"
	}, {
		name: "focusClass",
		group: "Ext.form.Field",
		ctype: "string"
	}, {
		name: "invalidClass",
		group: "Ext.form.Field",
		ctype: "string"
	}, {
		name: "invalidText",
		group: "Ext.form.Field",
		ctype: "string"
	}, {
		name: "msgTarget",
		group: "Ext.form.Field",
		ctype: "string",
		editor: "options",
		options: ["qtip", "side", "title", "under"]
	},{
		name: "readOnly",
		group: "Ext.form.Field",
		ctype: "boolean"
	}, {
		name: "height",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "width",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "x",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "y",
		group: "Ext.BoxComponent",
		ctype: "number"
	}, {
		name: "cls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "ctCls",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "disabled",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "disabledClass",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "hidden",
		group: "Ext.Component",
		ctype: "boolean"
	}, {
		name: "id",
		group: "Ext.Component",
		ctype: "string"
	}, {
		name: "style",
		group: "Ext.Component",
		ctype: "string"
	}]
});
xds.Registry.register(xds.types.TextArea);
xds.TextArea = Ext.extend(Ext.form.TextArea, {
	getFilmEl: xds.Component.getFilmEl
});
Ext.reg("xdtextarea", xds.TextArea);


xds.File = function() {
	return {
		saveProject: function(c, a, b) {
			var sfile = window.parentSandboxBridge;
			sfile.save({
				fullPath: xds.Project.file,
				contents: Ext.util.JSON.encode(c)
			})

			if(a) {
				var scope = a.scope || this;
				if(a.callback)
					Ext.callback(a.callback, scope);
			}
		},
		serializeUxInterface: function(obj) {
			//直接修改obj
		    if (xds.vmd.isUx()) {
		        var interfaceObj = xds.project.getData2();
		        obj.vmdinterface = Ext.encode(interfaceObj);
		    } else {
		        //增加资源
		        var vmdresource = xds.project.getResourceData();
		        obj.vmdresource = Ext.encode(vmdresource);
		    }

		},
		saveProjectAs: function(c, a, b) {

			if(Ext.isFunction(a)) {
				a = {
					callback: a,
					isShow: true
				}
			}
			var callback = a && a.callback
			var obj = {
                vmdversion:vmd.vmdVersion||'2.0',
				vmdlayout: Ext.util.JSON.encode(c),
				vmdevents: xds.vmd.events,
				vmdcss: xds.vmd.css || '',
				vmdprops: Ext.encode(xds.vmd.props),
				vmdcss: xds.vmd.css || '',
				type: designer.mode
                
			};

			//序列化复合组件
			this.serializeUxInterface(obj);
			//return;
			var bodyStr = Ext.util.JSON.encode(obj);

			xds.project.saveVmdFile(xds.vmd.params.savePath() || xds.vmd.params.path(), bodyStr, callback, a);

			var sfile = window.parentSandboxBridge;
			sfile && sfile.saveAs({
				contents: Ext.util.JSON.encode(c)
			}, function(target) {
				xds.Project.file = target; //save the file
				xds.File.setTitle(target.nativePath)
				if(a) {
					var scope = a.scope || this;
					if(a.callback)
						Ext.callback(a.callback, scope, target.nativePath);
				}
			});

		},
		openProject: function(a, b) {

			var sfile = window.parentSandboxBridge;
			if(!sfile) {
				//mafei 模拟打开文件，读取json格式的配置 
				var filename = "modules/login/login.vmd";
				if(designer.mode == "ux") filename = "components/login/login.vmd";
				Ext.Ajax.request({
					url: vmd.vmdUploadPath + 'FileService?FileName=' + filename,
					timeout: 5000,
					success: function(result) {

						var res = Ext.util.JSON.decode(result.responseText);
						if(res.errMsg) {
							Ext.Msg.alert('错误', res.errMsg);
							return
						}
						var vmd;
						try {
							vmd = Ext.util.JSON.decode(res.data);
							//事件
							xds.vmd.events = vmd.vmdevents;
							if(vmd.type) designer.mode = vmd.type;
						} catch(ex) {
							Ext.Msg.alert('反序列化失败', ex.message)
						}

						//结构
						var layout = {
							"components": [{
								"cid": "viewport",
								"name": "MyViewport",
								"layoutConfig": {},
								"userConfig": {
									"layout": "absolute"
								}
							}]
						}
						if(vmd && vmd.vmdlayout) {
							layout = Ext.util.JSON.decode(vmd.vmdlayout);

						}
						var a = new xds.Project(layout);
						a.open()

					},
					failure: function(result) {
						Ext.Msg.alert('错误', '网络超时，反序列化失败！')
					}

				})

				//var content = { "components": [{ "cid": "viewport", "name": "MyViewport", "layoutConfig": {}, "userConfig": { "layout": "absolute" } }] }
				//var a = new xds.Project(content);
				//a.open()
				return
			}
			sfile.browse({
				filterText: 'Ext Designer Project File',
				filter: '*.epj',
				scope: this
			}, function(f) {
				xds.File.setTitle(f.nativePath);
				var content = sfile.getContents(f.nativePath);
				var o = Ext.decode(content);
				xds.Project.file = f;
				a(o);
			});

		},
		getComponents: function(a, b) {},
		saveUserComponent: function(b, a, c) {},
		removeUserComponent: function(b, a, c) {},
		setTitle: function(a) {
			var psb = window.parentSandboxBridge && window.parentSandboxBridge.setTitle(a);
		}
	}
}();

function SourceX() {}

Ext.apply(SourceX, {

	cfg: {
		NOID: false,
		CLASS: true
	},

	isArray: function(o) {
		return Object.prototype.toString.call(o) === '[object Array]';
	},

	FieldToStr: function(obj, lpad) {
		var bString = true;
		for(var p in obj) {
			switch(p) {
				case 'name':
				case 'xcls':
				case 'xtype':
				case 'storeId':
				case 'id':
				case 'dock':
				case 'layoutConfig':
					break;
				case 'type':
					if(obj[p] != 'auto') bString = false;
					break;
				default:
					alert(p);
					bString = false;
			}
		}
		if(bString) {
			//mafei 20171121 处理转换
			//if (obj.xtype == "datafield") {
			//    return "'" + obj.id + "'";
			//}
			return "'" + obj.name + "'";
		}
		var arr = []
		for(var p in obj) {
			switch(p) {
				case 'xtype':
				case 'xcls':
				case 'storeId':
					//case 'id':
				case 'layoutConfig':
					break;
				case 'type':
					if(obj[p] != 'auto')
						arr.push(p + ':"' + obj[p] + '"');
					break;
				default:
					switch(typeof(obj[p])) {
						case 'string':
							arr.push(p + ':"' + obj[p] + '"');
							break;
					}
					break;
			}
		}
		return '{\n' + lpad + '\t' + arr.join(',\n' + lpad + '\t') + '\n' + lpad + '}';
	},

	fieldsToString: function(obj, lpad) {
		if(this.isArray(obj)) {
			var l = obj.length;
			var arr = [];
			for(var i = 0; i < l; i++) {
				arr.push(this.FieldToStr(obj[i], lpad));
			}

			return '[' + '\n' + lpad + arr.join(",\n" + lpad) + "\n" + lpad + ']';
		}
		return '[]';
	},
	//序列化
	objToCls: function(obj, dt, lpad) {
		// obj.name;
		var mode = designer.mode;
		var out = '';
		var s = obj.name.split('.');
		if(s.length > 2) // Ext.ux.component ...
		{
			out = 'Ext.ns("';
			var ns = [];
			for(var i = 0; i < s.length - 1; i++) //namespa
				ns.push(s[i]);
			out += ns.join('.') + '");\n';
		}
		// if (s.length == 1) obj.name = 'Ext.' + obj.name;//Ext.component
		if(s.length == 1) {
			if(mode == "ux") obj.name = designer.prefix.cmp + obj.name; //复合组件
			else
				obj.name = designer.prefix.module + obj.name; //模块
		}
		// out += obj.name + '=Ext.extend(' + obj.xcls + ' ,{\n';

		out += 'Ext.define("' + obj.name + '" ,{\n';
		var arr = [];
		arr.push('\textend:"' + obj.xcls + '"');
		arr.push('requires:vmd.getCmpDeps(' + xds.vmd.getCmpDeps() + ')');
		if(mode == "ux") {
			//增加版本号
			var ver = xds.vmd.params.ver();
			arr.push('version:"' + ver + '"');
		}

		this.initUxProp(obj);

		for(var p in obj) {
			switch(p) {
				case 'name':
					break;
				case 'xcls':
					break;
				case 'userXType':
					break;
				case 'id':
					if(this.cfg.NOID) break;
				case 'items':
				case 'tbar':
				case 'fbar':
				case 'bbar':
					break;
					break;
				case 'xtype': //xtype instead of Ext.reg
					arr.push(p + ':"' + obj.name + '"');
					break;
				default:
					switch(typeof(obj[p])) {
						case 'string':
							//arr.push(p + ':"' + obj[p].replace('"', '\\\"') + '"');
							//去掉回车换行
							arr.push(p + ':"' + obj[p].replace(/"/g, '\\\"').replace(/[\r\n]/g, '') + '"');

							break;
						case 'number':
							arr.push(p + ':' + obj[p]);
							break;
						case 'boolean':
							arr.push(p + ':' + (obj[p] ? 'true' : 'false'));
							break;
						case 'object':
							arr.push(p + ':' + this.objToString(obj[p], null, lpad + '\t', false, false, obj));
							break;
					}
			}
		}
		out += arr.join(',\n' + lpad);
		if(arr.length > 0) out += ',\n' + lpad;
		out += 'initComponent: function(){\n';

		
	    //复合组件增加作用域修改功能
		if (mode == "ux") {
		    out += '\t' + lpad + this.resetCmpScope(lpad) + '\n' + lpad;
		}
	    //事件代码块
		out += '\t' + lpad + (xds.vmd.events ? xds.vmd.events : '') + '\n' + lpad;
	    
		//公共事件(afterrend\beforerender)单独处理,此方法废掉改用initPublicEvents
		out += this.publicEvents(lpad, obj, xds.vmd.events);

		out += this.preInit(mode, lpad);
		////数据初始化
		//out += this.initStore(lpad, 'dataset') + "\n";
		////变量初始化
		//out += this.initVariable(lpad, 'variable') + "\n";
		////工作流初始化
		//out += this.initWorkflow(lpad, 'workflow') + "\n";
		// initComponent

		if(typeof(obj.tbar) != 'undefined') {
			out += lpad + '\tthis.tbar=' + this.objToString(obj.tbar, 'button', lpad + '\t\t', false) + '\n';
		}
		if(typeof(obj.fbar) != 'undefined') {
			out += lpad + '\tthis.fbar=' + this.objToString(obj.fbar, 'button', lpad + '\t\t', false) + '\n';
		}
		if(typeof(obj.bbar) != 'undefined') {
			out += lpad + '\tthis.bbar=' + this.objToString(obj.bbar, 'button', lpad + '\t\t', false) + '\n';
		}
		if(typeof(obj.items) != 'undefined') {
			if(typeof(obj['defaultType']) == 'string') {
				out += lpad + '\tthis.items=' + this.objToString(obj.items, obj['defaultType'], lpad + '\t\t', false) + '\n';
			} else {
				switch(obj['xtype']) {
					case 'viewport':
						//out += lpad + '\tthis.items=' + this.objToString(obj.items, 'panel', lpad + '\t\t', false) + '\n';
						out += lpad + '\tthis.items=' + this.objToString(obj.items, null, lpad + '\t\t', false) + '\n';
						break;
					default:
						out += lpad + '\tthis.items=' + this.objToString(obj.items, null, lpad + '\t\t', false) + '\n';
						break;
				}
			}
		}
		
	   
		out += '\t' + lpad + 'this.callParent();\n' + lpad;
		if(designer.mode == "ux") {

			out += lpad + 'vmd.core.compositeCmpInit(this.items, this);\n' + lpad;
			out += lpad + 'var me = this;eval(me.defineVars);\n' + lpad;
			out += lpad + 'resetCmpScope();\n' + lpad;
			out += this.initUxMethod(lpad);
            out += lpad + 'Ext.util.CSS.removeStyleSheet("' + obj.name + '");\n' + lpad;
			out += lpad + 'this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "' + obj.name + '");\n' + lpad;
		} else {
		    out += lpad + 'var me = this;vmd.core.moduleInit(this.items, this);\n' + lpad;

		}
	    //统一处理afterrender和beforerender事件
		//out += this.initPublicEvents(lpad);


		/*
        //事件代码块
      
        out += '\t' + lpad + (xds.vmd.events ? xds.vmd.events : '') + '\n' + lpad;
        
        //公共事件(afterrend\beforerender)单独处理
        out += this.publicEvents(lpad,obj,xds.vmd.events);
        */

		//最外层结束
		out += '}\n})';

		if(typeof(obj.userXType) == 'string') {
			// out += '\nExt.reg("' + obj.userXType + '",' + obj.name + ');';
		} else {
			//if(mode=="ux")
			// out += '\nExt.reg("' + obj.name + '",' + obj.name + ');';
		}
		return out;
	},
	initModule: function(lpad) {
		var out = '';
		
		//变量初始化
		out += this.initVariable(lpad, 'variable') + "\n";
	    //数据初始化
		out += this.initStore(lpad, 'dataset') + "\n";
		//工作流初始化
		out += this.initWorkflow(lpad, 'workflow') + "\n";
		return out
	},
	resetCmpScope: function () {
	    var out = '';
	    out += "function resetCmpScope() {\n" +
"                    var cmpList = me._reloadCmpList;\n" +
"                    Ext.each(cmpList, function (name) {\n" +
"                        var cmpObj = eval(name);\n" +
"                        cmpObj && (cmpObj._beforeRender = function (_cmp) {\n" +
"                            var id = vmd.core.getCmpId(_cmp);\n" +
"                            id&&eval(id + \"= _cmp\")\n" +
"                        })\n" +
"                    })\n" +
"                }";
	    return out;
	},
	initUx: function() {

		return '';
	},
	preInit: function(mode, lpad) {
		var out = '';
		if(mode == "ux") out = this.initUx(lpad);
		else out = this.initModule(lpad)
		return out;
	},
	publicEvents: function(lpad, item, events) {
		events = events || "";
		var out = '';
		var aftervents = item.id + "_afterrender";
		if(events.indexOf(aftervents) != -1) {
			out += '\t' + lpad + 'this.' + aftervents + "=" + aftervents + ';\n';
		}
		var beforevents = item.id + "_beforerender";
		if(events.indexOf(beforevents) != -1) {
			out += '\t' + lpad + 'this.' + beforevents + "=" + beforevents + ';\n';
		}
		return out;
	},
	getEventList: function(cid) {
		var configs = xds.Registry.get('vmdJsonStore').configs;
		var arr = [];
		Ext.each(configs.items, function(obj) {
			if(obj.group == "事件") {
				arr.push(obj.name);
			}
		})
		return arr;

	},
	_findById: function(obj, conf) {
		var me = this;
		Ext.each(obj.items, function(item) {
			if(item.id == conf.bindCmp) {
				me.rootObj[conf.prop] = item[conf.bindValue];
				item[conf.bindValue] = "this." + conf.prop;
				return false
			} else me._findById(item, conf)
		})

	},
	restrctObj: function(obj, conf) {
		var me = this;
		this.rootObj = obj;
		//if (obj.id == conf.id) {
		//    obj[conf.prop] = "me." + conf.id;
		//    return false
		//} else
		//复合组件新增属性构造
		me._findById(obj, conf);
	},
	initUxProp: function (obj, lpad) {
	    if (!this.rootObj) this.rootObj = obj;
	    if (!xds.vmd.isUx()) return;
		var out = '';
		var me = this;
		me.uxprops = {};
		var propdata = xds.vmd.getPropsData();
		Ext.each(propdata, function(item) {
			if(!me.uxprops[item.bindCmp]) me.uxprops[item.bindCmp] = {};
			//if (item.uxcid.indexOf('.ux')==-1) return false
			me.uxprops[item.bindCmp][item.bindValue] = item.id;
			me.restrctObj(obj, {
				bindCmp: item.bindCmp,
				bindValue: item.bindValue,
				prop: item.id
			})
			// var cmpKV = item.bindCmp + '.' + item.bindValue;
			//  out += '\t' + lpad + cmpKV + '= this.' + item.id + '||' + cmpKV + '\n';
		})
		// if (!this.rootObj) this.rootObj = obj;
		//构造css样式
		if(xds.vmd.css) obj.uxCss = xds.vmd.css.replace(/[\r\n]/g, '');
		return out;
	},
	initUxMethod: function(lpad) {
		if(!xds.vmd.isUx()) return;
		var out = '';
		var me = this;
		var data = xds.vmd.getMethodsData();
		Ext.each(data, function(item) {
			out += '\t' + lpad + 'this.' + item.id + "= function(" + item.params + "){\n" + item.code + '\n\t}\n';
		})
		return out;
	},
	_loadPublicEvent: function (listMap, lpad, pref) {
	    var out = '';
	    var that = this;
	    var cmps = listMap.keys();
	    pref = pref||'';
	    Ext.each(cmps, function (cmpId) {
	        var _pref = pref;
	        if (!cmpId) return false;
	        var event = listMap.get(cmpId);
	        var scope = 'me.' + cmpId;
	        if (that.rootObj && that.rootObj.id == cmpId) {
                //如果是模块且是viewport根节点
	            scope = 'me';
	            if (designer.mode != 'ux') _pref = '';
	        } else {
	            if (designer.mode != 'ux') {
	                //如果是模块，模块的组件是public可访问的
	                scope = cmpId;
	            }
	        }
	      //  out += '\t' + lpad + scope + '.on(\'' + _pref + event.eventName + '\',function(){ ' + event.eventMethod + '(' + scope + ')})\n';
	        out += '\t' + lpad + scope + '.on(\'' + _pref + event.eventName + '\',function(){ ' + event.eventMethod + '.call(' + scope + ',' + scope + ')})\n';
	    })
	    return out;
	},
	initPublicEvents: function (lpad) {
	    var out = '';
	    //afterrender装配
	    var afterList = xds.vmd.eventDict.afterrender;
	    var beforeList = xds.vmd.eventDict.beforerender;
	    out += this._loadPublicEvent(beforeList, lpad);
	    out += this._loadPublicEvent(afterList, lpad,'vmd');
        return out;
	},
	initStore: function(lpad, vmdType) {

		var me = this;
		var root = xds.vmd.getRootNode(vmdType);
		var node = root && root.childNodes;
		var out = '';
		node && Ext.each(node, function(item, i) {
			//id,storeConfig
			// var configs = item.component.userConfig;
			var configs = item.component.config;
			var opts = "{{0}}";
			var str = "";
			var temp = [];
			if(configs) {
				//str = "storeConfig:" + configs.storeConfig + "";
				//属性序列化
				str = Ext.encode(configs).replace(/^{(.+)\}$/, '$1');
				if(!configs.storeConfig) {
					var fields = []
					Ext.each(item.childNodes, function(obj) {
						if(obj.component.name)
							fields.push(obj.component.name);
					})
					if(fields.length > 0)
						str = "fields:['" + fields.join("','") + "']"

				}
			}

			//增加事件
			var eventArr = me.getEventList(item.component.cid);
			//遍历事件方法构造完整事件

			for(var key in configs) {
				if(eventArr.indexOf(key) != -1) {
					var eventName = configs[key];
					if(!eventName) continue;
					//if (!listeners) listeners = {};
					// listeners[key] = "function(){" + eventName + ".apply(this,arguments);}";
					var evetMethod = "function(){" + eventName + ".apply(this,arguments);}";
					temp.push(key + ":" + evetMethod);
				}
			}

			if(temp.length > 0) {
				str = "listeners:{" + temp.join(',') + "}," + str;

			}
			//对于未选中直接预览报错
			if(str == "{}") str = "";

			opts = String.format(opts, str);
			out += '\t' + lpad + item.id + "=new " + item.component.xcls + '(' + opts + ');\n';
		})

		return out;
	},
	initVariable: function(lpad, vmdType) {
		var root = xds.vmd.getRootNode(vmdType);
		var node = root && root.childNodes;
		var out = '';
		node && Ext.each(node, function(item, i) {
			//value
			var opts = "{}";
			var value = item.component.userConfig.value;
			if(value) opts = '{value' + ':"' + value.replace(/"/g, '\\\"').replace(/[\r\n]/g, '') + '"}';
			out += '\t' + lpad + item.id + "=new " + item.component.xcls + '(' + opts + ');\n';
		})

		return out;
	},
	initWorkflow: function(lpad, vmdType) {

		var root = xds.vmd.getRootNode(vmdType);

		if(!root) return '';
		var node = root && root.childNodes;
		var configs = root.component.userConfig;
		var out = '';
		var opts = "{{0}}";
		var str = "";
		var temp = [];

		//if (configs.configInfo) {

		//    str = Ext.encode(configs)
		//}
		if(configs.configInfo) str = "configInfo:" + configs.configInfo + "";
		//afterLoad
		if(configs.afterLoad) str += ",afterLoad:" + configs.afterLoad + "";
		opts = String.format(opts, str);
		out += '\t' + lpad + root.id + "=new " + root.component.xcls + '(' + opts + ');\n';
		return out;
	},
	listerToString: function(lpad) {
		var out = '';
		var deserialize = xds.project.getJson()[0];
		var ite = function(items) {
			Ext.each(items, function(item) {
				item.mapevents && Ext.each(item.mapevents, function(list) {
					for(var name in list) {
						out += '\t' + lpad + 'me.' + item.id + '.on(\'' + name + '\',' + list[name] + ');\n';
					}
				})
				ite(item.items);
			})

		}
		//递归
		ite(deserialize.items);
		return out;
	},
	//根节点
	objToString: function(obj, dt, lpad, isW, isClass, cmp) { // dt = defaulttype

		var me = this;
		if(!lpad) {
			lpad = '';
		}
		var out = '';
		var isArr = this.isArray(obj);
		if(!isArr && isClass && typeof(obj['name']) == 'string') { // generate class code;
			return this.objToCls(obj, dt, lpad, false);
		}
		if(isW) {
			if(isArr) {
				out = '[' + '\n' + lpad;
			} else {
				out = 'var ' + obj.name + '=new ' + obj.xcls + '({' + '\n' + lpad;

			}
		} else {
			if(isArr) {
				out = '[' + '\n' + lpad;
			} else {
				out = '{' + '\n' + lpad;
			}
		}
		var arr = [];
		if(isArr) {
			var len = obj.length;
			for(var i = 0; i < len; i++) {
				switch(typeof(obj[i])) {
					case 'string':
						arr.push('"' + obj[i].replace('"', '\\\"') + '"');
						break;
					case 'number':
						arr.push(obj[i]);
						break;
					case 'boolean':
						arr.push(obj[i] ? 'true' : 'false');
						break;
					case 'object':
						arr.push(this.objToString(obj[i], dt, lpad + '\t', false));
						break;
				}
			}
		} else {
			for(var p in obj) {
				switch(p) {
					case 'xcls':
						break;
						//case 'id':
					case 'storeId':
						if(this.cfg.NOID) break;
					case 'name':
						break;
					case 'xtype':
						if(!isW) {
							switch(obj[p]) {
								case 'tbfill':
									return '"->"';
								case 'tbseparator':
									return '"-"';
								case 'tbspacer':
									return '" "';
							}
						}
						if(typeof(dt) == 'string' && dt == obj[p]) {
							break;
						}
						if(isW) break;
					default:
						switch(typeof(obj[p])) {

							case 'string':
							   // if (obj[p].indexOf('_vmdlisteners') != -1 && p != "afterrender" && p != "beforerender") {
							    if(obj[p].indexOf('_vmdlisteners') != -1) {
									if(designer.mode == "module" && cmp && cmp.xtype == "viewport") {
										var func = "function(){\n\tthis." + obj[p].replace('_vmdlisteners', '') + "(this)" + "\n}"
										arr.push(p + ':' + func + '');
									} else if(designer.mode == "ux" && cmp && cmp.xtype == "panel") {
										//复合组件也需要单独处理，要放到afterlayout等函数内（后面再改）
										var func = "function(){\n\tthis." + obj[p].replace('_vmdlisteners', '') + "(this)" + "\n}"
										arr.push(p + ':' + func + '');

									} else {
										arr.push(p + ':' + obj[p].replace('_vmdlisteners', '') + '');
									}
									break;
								}

								//复合组件自定义属性添加(基础组件不参与序列化)
								if(designer.mode == 'ux') {
									if(me.uxprops[obj.id] != undefined && me.uxprops[obj.id][p] != undefined) {
										arr.push(p + ':' + obj[p] + '');
										break;
									}

								}

								switch(p) {
									//case 'tpl'://mafei 设计模式下预览用 不然转为对象会报错
									//    if (obj[p]) {
									//        var tpl = xds.vmd.props[obj.id] && xds.vmd.props[obj.id][p];
									//        //tpl && arr.push(p + ':' + tpl)
									//        tpl && arr.push(p + ':"' + tpl.replace(/"/g, '\\\"').replace(/[\r\n]/g,'') + '"')
									//    }
									//    break
									case 'store':
										arr.push(p + ':' + obj[p] + '');
										break;
									default:
										//去掉回车换行
										arr.push(p + ':"' + obj[p].replace(/"/g, '\\\"').replace(/[\r\n]/g, '') + '"');

										break;
								}
								break;
								// arr.push(p + ':"' + obj[p].replace('"', '\\\"') + '"'); break;
							case 'number':
								arr.push(p + ':' + obj[p]);
								break;
							case 'boolean':
								arr.push(p + ':' + (obj[p] ? 'true' : 'false'));
								break;
							case 'object':
								switch(p) {
									case 'items':
									case 'mapevents':
									case 'listeners': //mafei 201709
										if(typeof(obj['defaultType']) == 'string') {
											arr.push(p + ':' + this.objToString(obj[p], obj['defaultType'], lpad + '\t', false));
											break;
										}
										switch(obj['xtype']) {
											case 'buttongroup':
												arr.push(p + ':' + this.objToString(obj[p], 'button', lpad + '\t', false));
												break;
											case 'viewport':
												arr.push(p + ':' + this.objToString(obj[p], 'panel', lpad + '\t', false));
												break;
											default:
												arr.push(p + ':' + this.objToString(obj[p], null, lpad + '\t', false));
												break;
										}
										break;
									case 'bbar':
									case 'tbar':
									case 'fbar': //
										arr.push(p + ':' + this.objToString(obj[p], 'button', lpad + '\t', false));
										break;
									case 'fields':
										arr.push(p + ':' + this.fieldsToString(obj[p], lpad + '\t'));
										break;
									default:
										arr.push(p + ':' + this.objToString(obj[p], null, lpad + '\t', false));
								}
								break;
						}
						break;
				}
			}
		}
		if(isW) {
			if(isArr) {
				out += arr.join(',\n' + lpad) + '\n' + lpad.substring(0, lpad.length - 1) + ']'
			} else {
				out += arr.join(',\n' + lpad) + '\n' + lpad.substring(0, lpad.length - 1) + '})'
			}
		} else {
			if(isArr) {
				out += arr.join(',\n' + lpad) + '\n' + lpad.substring(0, lpad.length - 1) + ']'
			} else {
				out += arr.join(',\n' + lpad) + '\n' + lpad.substring(0, lpad.length - 1) + '}'
			}
		}
		return out;
	},
	Test: function() {
		alert("SourceX")
	},

	JonsScript: function(ctrl) {

		if(ctrl) {
			return this.objToString(ctrl, null, '\t', true, this.cfg.CLASS);
		}
	}
})
//窗体初始化
Ext.onReady(function() {

	//快速提示，用于右侧属性
	Ext.QuickTips.init();
	Ext.QuickTips.getQuickTip().el.setZIndex(70000);
	xds.project = new xds.Project();

	xds.vmd.setDesigerMode();

	//顶部工具栏
	//var d = new Ext.Toolbar({
	//    items: [xds.actions.newAction, xds.actions.openAction, '-',
	//            xds.actions.saveAction, xds.actions.saveAsAction,
	//            xds.actions.openAction, '-',
	//            xds.actions.newCmpAction,
	//            '-', xds.actions.preview, {
	//                id: "csep",
	//                xtype: "tbseparator",
	//                hidden: true
	//            }]
	//});

	var isDebugger = xds.vmd.params.debug();
	var d = new Ext.Toolbar({
		items: [{
				itemId: 'new',
				text: "新建",
				menu: [
					xds.actions.newAction,
					xds.actions.newUxCmpAction

				],
				iconCls: "icon-project-new"

			}, xds.actions.openAction, '-',
			xds.actions.saveAction,
			xds.actions.openAction, '-',
			xds.actions.newCmpAction,
			'-', xds.actions.preview, {
				id: "csep",
				xtype: "tbseparator",
				hidden: true
			}
		]
	});

	//最左侧工具箱
	var c = new xds.Toolbox();
	//右侧顶部组件层次树
	var inspector_view = new xds.Inspector();

	var inspector_interface = new xds.Interface();
	var inspector;
	if (designer.mode == "ux")
	    inspector = new Ext.Panel({
	        border: false,
	        header: false,
	        layout: 'fit',
	        region: 'center',
	        items: [{
	            xtype: 'tabpanel',
	            activeTab: 0,
	            items: [{
	                title: '界面',
	                border: false,
	                header: false,
	                layout: 'fit',
	                items: [inspector_view]
	            },
					{
					    title: '接口',
					    border: false,
					    header: false,
					    layout: 'fit',
					    items: [inspector_interface]
					}

	            ]
	        }]

	    })
	else {

	    //inspector = inspector_view;

	    var inspector_res = new xds.Resource();
	    //模块支持资源中心
	    inspector = new Ext.Panel({
	        border: false,
	        header: false,
	        layout: 'fit',
	        region: 'center',
	        items: [{
	            xtype: 'tabpanel',
	            activeTab: 0,
                id:'inspector_module',
	            items: [{
	                title: '界面',
	                border: false,
	                header: false,
	                layout: 'fit',
	                items: [inspector_view]
	            },
					{
					    title: '资源',
					    border: false,
					    header: false,
					    layout: 'fit',
					    items: [inspector_res]
					}

	            ]
	        }]

	    })

	} 

	//右侧底部组件属性设置
	xds.props = new xds.ConfigEditor();
	//整个右侧
	xds.east = new Ext.Panel({
		id: "east",
		width: 240,
		region: "east",
		minWidth: 150,
		split: true,
		margins: "0",
		cmargins: "2 1 1 5",
		baseCls: "x-plain",
		layout: "border",
		items: [inspector, xds.props]
	});
	//中间设计窗体
	var e = new xds.Canvas();
	Ext.MyViewport = Ext.extend(Ext.Viewport, {
		xtype: "viewport",
		initComponent: function() {
			Ext.MyViewport.superclass.initComponent.call(this);
		}
	})

	//e.setComponent(new Ext.MyViewport())
	//最底部banner
	var g = new Ext.Toolbar({
		id: "status",
		region: "south",
		height: 0,
		items: [{
			id: "xdstatus",
			xtype: "tbtext",
			text: "&nbsp;版权@东营汉威"

		}]
	});

	var htmls = new Ext.form.HtmlEditor({
		id: 'dhtml',
		name: 'description',
		allowBlank: true,
		width: "100%",
		height: "100%"
	});

	xds.TextAreajosnCode = new Ext.form.TextArea({
		fieldLabel: "备注",
		id: "memo",
		labelSepartor: "：",
		labelWidth: 60,
		width: 230,
		readOnly: false

	});
	//中间区域（设计和脚本）
	var tpl;
	if(isDebugger)
		tpl = new Ext.TabPanel({
			id: "TBL",
			region: "center",
			activeTab: 0,
			items: [e, {
				title: designer.Source.JosCodeTitle,
				id: "DM",
				region: "center",
				baseCls: "x-plain",
				layout: "fit",
				bodyStyle: "padding:5px;position:relative;left:0;top:0",
				autoScroll: true,
				items: [xds.TextAreajosnCode]
			}],

			listeners: {
				'tabchange': function(tab) {
					if(tab.activeTab.id == "DM") {

						xds.TextAreajosnCode.setValue(SourceX.JonsScript(xds.project.getJson()[0]))
					}
				}
			}

		});
	//正常模式下
	if(!isDebugger) {
		var name = xds.vmd.params.name() || '';

		var cpanel = new Ext.Panel({
			height: 36,
			layout: "border",
			border: false,
			bodyStyle: "background:#20a0ff",

			items: [{
				region: 'west',
				width: 200,
				xtype: 'container'
			}, {
				region: 'center',
				xtype: 'container',
				layout: "hbox",
				layoutConfig: {
					align: "middle",
					pack: "center"
				},
				items: [{
					xtype: "label",
					id: "MyLabel",
					html: name,
					style: 'font-size:20px;font-weight:bold;color:#fff'
				}]
			}, {
				region: 'east',
				width: 250,
				xtype: 'container',
				style: "padding-left:5px",
				items: [{
						xtype: 'vmd.button',
						icon: 'document',
						text: '保存',
						width: 70,
						type: 'primary',
						style: 'margin-right:10px',
						handler: function() {

							xds.project.save()
						}
					},
					{
						xtype: 'vmd.button',
						icon: 'view',
						text: '预览',
						width: 70,
						type: 'primary',
						style: 'margin-right:10px',
						handler: function() {
							xds.project.preview()
						}
					},
					{
						xtype: 'vmd.button',
						icon: 'close',
						text: '关闭',
						width: 70,
						type: 'primary',
						style: 'margin-right:10px',
						handler: function() {
							xds.project.close()
						}
					}
				]
			}]
		})

		d = new Ext.Panel({
			height: 36,
			layout: "border",
			border: false,
			bodyStyle: "background:#20a0ff;padding-left:10px",
			items: [{
					header: false,
					border: false,
					region: 'west',
					xtype: 'container',
					width: 100,
					items: [
                            {
                                xtype: 'vmd.button',
                              
                                id: 'btn_ux',
                                text: '',
                                width: 120,
                                type: 'primary',
                                handler: function (btn, e) {
                                   window.open(vmd.virtualPath + "/system/modules/eQ9ULgcVb1/hw61499a5d/hwvl41einK.html","复合组件管理");
                                }
                            }
					]

				},
				{
					header: false,
					border: false,
					xtype: 'container',
					region: 'center',
					items: [cpanel]
				},
				{
					header: false,
					border: false,
					region: 'east',
					xtype: 'container',
					layout: 'hbox',
					layoutConfig:{
					    align: 'middle',
                        pack:'center'
					},
					width: 250,
					items: [
                        {
                            xtype: 'vmd.button',
                            cls: 'design-icon-resource',
                            id:'btn_res',
                            text: '资源选择',
                            width: 100,
                            type: 'primary',
                            handler: function (btn,e) {
                                //右键菜单
                                var region = btn.el.getRegion();
                                var _top = region.top + btn.getHeight();
                                var _left = region.left;
                                res_menu.showAt([_left, _top]);
                            }
                        },
                         {
                             xtype: 'vmd.combo',
                             id: 'combo_lang',
                             width: 60,
                            
                             listeners: {
                                 beforerender:function(){
                                      
                                     this.items=[
					                    { value: "zh", text: "中文" },
					                    { value: "en", text: "英文"}
					                  
                                     ]
                                     if (vmd.enableChinesize) this.value = 'zh';
                                     var lang = LocalData.get('language');
                                     this.value = lang || this.value|| 'zh';

                                 },
                                 
                                 change: function (combo,value,text) {
                                     
                                     //利用localstorage进行本地存储
                                     LocalData.set('language', value);
                                     //汉化转换
                                     if (value == 'zh') vmd.enableChinesize = true
                                     else if (value == 'en') vmd.enableChinesize = false
                                     xds.props.refresh();

                                 }
                             }
                         }
					]
				}
			]

		})
	    //创建右键菜单
	    //从配置的服务里获取默认资源
		var res_menu = new Ext.menu.Menu({
		    id: 'res_menu',
		    style: 'z-index:88888',
		    items: []
		})
		var moduleId = xds.vmd.params.id();
		vmd.core.getModuleResourceServices(moduleId, function (data) {
		//var data = [];
        //    data.push({
		//    id: "000000-00000000-000000-000000-000000",
		//    name: "默认资源中心",
		//    address: "www.hanweikeji.com:8050",
		//    children: [
        //           {
        //               id: "000000-00000000-000000-000000-000000_server",
        //               name: "资源中心",
        //               address: "www.hanweikeji.com:8050",
        //               virtualPath: "resource",
        //           }
		//    ]
        //   });
		    xds.vmd.resource.loadComplete = true;
		    xds.vmd.resource.serverList = data||[];
		    var resmenudata = [];
		    res_menu.removeAll();
		    xds.vmd.resource.serverList.forEach(function (item, index) {
                
                var getServerList = function () {
                    var list = [];
                    var serverInfo = item.children;
                    if (serverInfo) {
                        serverInfo.forEach(function (_item) {
                            var obj = {
                                text: _item.name,
                                name: _item.name,
                                resName: item.name,
                                resId: item.id,
                                servId: _item.id,
                                virtualPath: xds.vmd._getVirtualPath(_item.address, _item.virtualPath),
                                id: item.id+_item.id,
                                iconCls: 'ion-server'
                            }
                            list.push(obj);
                        })
                    }
                    return list;
                }
		        var obj = {
		            text: item.name,
		            name: item.name,
		            virtualPath: xds.vmd._getVirtualPath(item.address,item.virtualPath),
		            id: item.id,
                    iconCls:'ion-res',
		            menu: new Ext.menu.Menu({
		                items: getServerList(),
		                listeners: {
		                    click: function (menu, item, e) {
		                        itemclick(menu, item, e)
		                    }
		                }
		            })
		        }


		        resmenudata.push(obj);

		    })
		    res_menu.add(resmenudata);
		    res_menu.doLayout();
		   
		    var itemclick = function (menu, item, e) {
		        var win = new vmd.window({
		            url: vmdSettings.resourcePath + "?moduleid=" + moduleId + "&serviceid=" + item.servId + "&resourceid=" + item.resId + "&servername=" + item.name,
		            title: '<span style="color:blue">'+item.name+'</span>——文件选择（温馨提示：shift多选资源，只支持js、css、图片的选择）',
		            auto: true,
		            enableLoading: true,
		            offset: [100, 100],
		            fbar: [{
		                text: '确定',
		                handler: function () {

		                    //利用postMessage进行跨域通讯
		                    //拿到选中的资源，添加到资源列表中
		                    //alert(win.postdata)
		                    var selectFiles = Ext.decode(win.postdata);
		                    if (!selectFiles || (Ext.isArray(selectFiles) && selectFiles.length == 0)) {
		                        win.close();
		                        return;
		                    }
		                    //加载资源树
		                    //激活当前资源tab
		                    Ext.getCmp('inspector_module').setActiveTab(1);
		                    //梳理进行分组调用资源树接口进行添加
		                    var _cssData = [], _jsData = [], _imgData = [];
		                    selectFiles.forEach(function (data) {
                                var ext = data.ext;
		                        var serName = data.servName;
		                        var resName = item.resName;
		                        var path = data.path;
		                        var absolutePath = data.ip + "/" + path;
		                        var obj = {
		                            id: serName + "/" + path,
		                            servName: resName+"&&"+serName,
		                            path: path,
		                            absolutePath: absolutePath,
		                            ext: data.ext
		                        };
		                        var node = xds.resource.getNodeById(obj.id);
		                        if (node) return false;
		                        if (ext == 'js') {
		                            _jsData.push(obj);
		                        } else if (ext == 'css') {
		                            _cssData.push(obj);
		                        } else if (ext == 'jpg' || ext == 'png' || ext == 'gif') {
		                            _imgData.push(obj);
		                        }

		                    })

		                    xds.resource.addCssNodes(_cssData);
		                    xds.resource.addJsNodes(_jsData);
		                    xds.resource.addImgNodes(_imgData);
		                    win.close();
		                }

		            }, {

		                text: '取消',
		                handler: function () {
		                    win.close()
		                }

		            }]
		        })
		        win.show();
		        win.postdata = null;
		        //test
		        window.addEventListener('message', function (messageEvent) {
		            var data = messageEvent.data;// messageEvent: {source, currentTarget, data}
		            //console.info('message from child:', data);
		            win.postdata = data;
		        }, false);
		    }

		    //res_menu.on('click', function (menu,item, e) {
                
		    //})



		}, function () {
		    xds.vmd.resource.loadComplete = true;
		    vmd.tip('资源加载失败！', 'error');
		})

        //
		tpl = new Ext.TabPanel({
			id: "TBL",
			//layout: "border",
			region: "center",
			activeTab: 0,
			hideTabHeader: true,
			items: [{
				title: "Tab1",
				layout: "border",
				border: false,
				header: false,
				items: [e]
			}]

		});
	}

	var a = new Ext.Viewport({
		layout: "border",
		items: [{
			id: "tools",
			baseCls: "x-plain",
			region: "north",
			height: isDebugger ? 26 : 36,
			items: [d]
		}, xds.east,new Ext.Panel({
	        border: false,
	        header: false,
	        layout: 'fit',
			width:180,
	        region: 'west',
			split:true,
	        items: [{
	            xtype: 'tabpanel',
	            activeTab: 1,
	            items: [{
	                title: '指标分类',
	                border: false,
	                header: false,
	                layout: 'fit',
	                items: []
	            },
					{
					    title: '条件',
					    border: false,
					    header: false,
					    layout: 'fit',
					    items: [c]
					}

	            ]
	        }]

	    }) , tpl, g]
	});

	xds.on("componentselect", function(j) {

		if(j.component) {

			var i = xds.active;
			xds.props.enable();
			xds.active = j;
			xds.props.refresh();
			if(!i || j.topNode != i.topNode) {
				e.setComponent(j.topNode);
				//20180404 修复页面初始化后 数据集及变量节点未序列化的问题（config）
				if(!i) {
					var _root = j.node.parentNode;
					if(_root.id == 'croot') {
						_rootNodes = _root.childNodes;
						_rootNodes.forEach(function(node, index) {
							if(j.topNode.id == node.id) return;
							e.setComponent(node);
						})
					}

				}
			}
		} else {
			xds.props.disable();
			xds.active = null;
			xds.props.refresh()
		}

	});

	xds.on("componentchanged", function() {
		if(xds.active) {

			e.setComponent(xds.active.topNode)
		}

	});

	xds.status = Ext.getCmp("xdstatus");

	xds.fireEvent("init");

	var f;
	var h = function() {
		if(f) {
			for(var k = 0, j = f.length; k < j; k++) {
				d.remove(f[k].itemId)
			}
			f = null
		}
	};

	xds.on("componentselect", function(m) {

		var k = d.items.get("csep");
		if(m.component) {
			xds.actions.deleteCmpAction.enable();
			h();
			var n = m.component.getActions();
			if(n) {
				// k.show();
				for(var l = 0, j = n.length; l < j; l++) {
					d.add(n[l])
				}
				d.doLayout()
			} else {
				// k.hide()
			}
			f = n
		} else {
			xds.actions.deleteCmpAction.disable();
			// k.hide();
			h()
		}
	})

	//初始化设置
	xds.vmd.init();

	//保存模块测试
	//vmd.core.saveAsCmp('', '1.0', '')
	// vmd.core.cmpVerUpdate('MyComptest','1.0','1.1')
});