var def_platformControl = {
	"!name": "control",
	"ee": {

		"!doc": "我是一按钮的文本",
		"!type": "+__control_button2"
	},
	"ee1": {

		"!doc": "我是一按钮的文本",
		"!type": "+__control_button2"
	},
	"__control_button2": {
		"!type": "fn()",
		prototype: {
			getText: {
				"!doc": "<div class='funInfo'>" +
				"<h3 class='funInfo-title' onclick='onMore(\"获取显示文本\")' title='查看详细介绍'>获取显示文本</h3>" +
				"<div  class='funInfo-comment' ><p>原型：string GetText()</p>" +
				"<p>返回值：字符串</p>" +
				"</div></div>",
				"name":"",
                "pro":"",
				"!type": ""
			}
		}
	}
};

def_platformExtjs = {
	"!name": "Ext",
	"Ext": {

		"!doc": "Ext",
		"!type": "+__Ext_button2"
	},
	"__Ext_button2": {
		"!type": "fn()",
		prototype: {
			getText: {
				"!doc": "<div class='funInfo'><h3 class='funInfo-title' onclick='onMore(\"获取显示文本\")' title='查看详细介绍'>获取显示文本</h3><div  class='funInfo-comment' ><p>原型：string GetText()</p><p>返回值：字符串</p></div></div>",
                "name":"",
                "pro":"",
				"type": ""
			}
		}
	}
};

var init_def_platformExtjs = function() {

	var pref = '__Ext';
	def_platformExtjs = {
		"!name": "Ext",
		"Ext": {

			"!doc": "Ext",
			"!type": "+__Ext"
		},
		"__Ext": {
			"!type": "fn()",
			prototype: {}
		}
	};
	var deep = 0;

	function getParameterNames(fn) {
		if(typeof fn !== 'function') return [];
		var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
		var code = fn.toString().replace(COMMENTS, '');
		var result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
			.match(/([^\s,]+)/g);
		return result === null ?
			[] :
			result;
	}

	var itemFor = function(obj,pref, _obj) {
		for(var i in obj) {

			var name = "";
			var params;
			var isObect = false;
			if(typeof obj[i] == "function") {

				params = getParameterNames(obj[i]);
				name = "Ext方法: \n<b>" + i + "(" + params.join(',') + "</b>)";
				if(obj[i].$isClass) {
					var _cls = pref.replace('__', '').replace(/_/g, '.') + '.' + i;
					name = "Ext " + i + "类: \n<b> new " + _cls + "(" + params.join(',') + "</b>)";
				}

			} else if(typeof obj[i] == "object") {
				name = "Ext对象:  <b>" + i + "</b>";
				isObect = true;
			} else {
				name = "Ext属性:  <b>" + i + "</b>";
			}
			if(i.indexOf('_') == 0 || i == 'frames' || i == 'global' || obj == window) continue;

			_obj[i] = {
				"!doc": name,
				"!type": ""

			}
			deep++;
			//递归循环ext子对象
			if(isObect) {
				var _pref = pref + "_" + i;
				/*b[i] = {
					"!doc": name,
					"!type": "+" + _pref

				}
				def_platformExtjs[_pref] = {
					"!type": "fn()",
					prototype: {}
				}

				//console.log(_pref + ':' + i+',count:'+deep)
               */
				if(_pref.split('_').length > 5) continue
				itemFor(obj[i], _pref,_obj[i])

			}
		}
	}
    //mafei 20181112 优化ext自动识别功能，释放内存
	itemFor(Ext,pref,def_platformExtjs[pref].prototype)

}
//Ext框架 自动识别
init_def_platformExtjs();

var ControlsDataManage = {
	_add: function(a) {
		this[a.Type] = a
	},
	_getTreeChildNodes: function(f, g, b, d) {
		var a = [];
		for(var i in g) {
			var h = g[i];
			var name = '';
            var pro="";
			if(h.Name){
				name=h.Name;
			}
			if(h.Prototype){
                pro=h.Prototype
            }
			if(!h || d && d.hasOwnProperty(i)) {
				continue
			}
			var e = 1;
			switch(h.DataType || b) {
				case "Property":
					e = 1;
					break;
				case "Method":
					e = 2;
					break;
				case "Event":
					e = 3;
					break
			}
			var c = {
				text: i + " " + h.Description,
				id: i,
				iconUrl: e,
				type: b,
				name:name,
                pro:pro,
				data: h,
				parentNode: f
			};
			var j = [];
			if(h.Items) {
				j = this._getTreeChildNodes(c, h.Items, b)
			}
			c.nodes = j;
			c.async = j.length > 0;
			a.push(c)
		}
		return a
	},
	_getTreeNodes: function(d, g, e, b) {
		var f = this[d],
			c = [];
		if(!f) {
			return null
		}
		var a = f[g];
		if(f.BaseType) {
			c = c.concat(this._getTreeNodes(f.BaseType, g, a, b))
		}
		c = c.concat(this._getTreeChildNodes(b, a, g, e));
		return c || []
	},
	_replaceLinkType: function(b, a) {
		if(a) {
			b = b.replace(a, "<a href='javascript:;' onmousedown='window.showLinkTypeDataDlg && showLinkTypeDataDlg.show({Type: this.type, relativeLinkEl: this})' class='linkType' type='" + a + "' >" + a + "</a>")
		}
		return b
	},

	getTreeRootNodes: function(e) {
		var b = [],
			c = this._getTreeNodes(e, "Property"),
			a = this._getTreeNodes(e, "Method"),
			d = this._getTreeNodes(e, "Event");
		if(c && c.length > 0) {
			b.push({
				text: "属性",
				id: "Property",
				iconUrl: 0,
				type: "",
				nodes: c
			})
		}
		if(a && a.length > 0) {
			b.push({
				text: "方法",
				id: "Method",
				iconUrl: 0,
				type: "",
				nodes: a
			})
		}
		if(d && d.length > 0) {
			b.push({
				text: "事件",
				id: "Event",
				iconUrl: 0,
				type: "",
				nodes: d
			})
		}
		return b
	},

	showDescript: function(b) {

		var e = this;
		var k = b.text,
			name = b.name,
            pro=b.pro,
			g = "";
		if(b.data) {
			var d = b.data;
			k = d.Description;
			var c = function() {
				var o = "";
				if(d.Args) {
					o = "<p>参数：</p>";
					var m = 0;
					for(var l in d.Args) {
						if(l == "_Return_") {
							continue
						}
						var n = d.Args[l];
						if(n) {
							o += "<p>" + l + "&nbsp;&nbsp;" + d.Args[l] + "</p>";
							m++
						}
					}
					if(m == 0) {
						o = ""
					}
				}
				return e._replaceLinkType(o, d.LinkType)
			};
			var j = this._replaceLinkType(d.Prototype, d.LinkType);
			var h = c();
			var f = "";
			if(d.Example) {
				f = "<p>示例：</p><pre>" + d.Example + "</pre>"
			}
			var a = "";
			var i = this._replaceLinkType(d.Args._Return_, d.LinkType);
			if(i) {
				a = "<p>返回值：" + i + "</p>"
			}
			g = "<p>原型：" + j + "</p>" + a + h + f
		}

		return {
			text: k,
			name:name,
            pro:pro,
			comment: g
		}
	}

};

function getFuncInfo(b) {
	if(!b) {
		return ""
	}
	var a = ["<div class='funInfo'>", "<h3 class='funInfo-title' onclick='onMore(\"" + b.text + "\")' title='查看详细介绍'>" + (b.text || "") + "</h3>", "<div  class='funInfo-comment' >" + (b.comment || "") + "</div>", "</div>"].join("");
	return a
}

function init_def_platformControlData() {

	def_platformControl = {
		"!name": "control"
	};
	var treeRootNodes = xds.inspector.root.childNodes;

	for(var i = 0; i < treeRootNodes.length; i++) {
		var rootNode = treeRootNodes[i];
		init_def_platformControlData2(rootNode);
	}
	//mafei 20181109 自定义对象模型
   if(xds.defineNodes){
	   for(var i = 0; i < xds.defineNodes.length; i++) {
		 rootNode = xds.defineNodes[i];
		 init_def_platformControlData3(rootNode);
	  }
   } 

}

//自定义对象模型
function init_def_platformControlData3(rootNode) {

	//activeCmpId
	var f = rootNode;
	if(!f) {
		return
	}
	var c = {},
		b = "__control__";
	var e = function(h, j) {
		var g = j && j.length,
			l, m;
		if(!g) {
			return
		}
		for(var k = 0; k < g; k++) {
			l = j[k].component;

		
			c[l.cid] = true;
			h[l.id] = {
				"!type": "+" + b + l.cid,
				"!doc": l.text || l.id || l.name
			};
			
			e(h, j[k].childNodes)
		}
	};
	e(def_platformControl, f.childNodes);

	var a = function(l) {

		//这里是进行汉化的关键步骤
		//数据结构为array 分为属性、方法和事件[{text:'属性',id:'property',nodes:[{}]}]
		//var compClass = Ext.ComponentMgr.types[l.toLowerCase().replace('vmd', 'vmd.')];
		var h = ControlsDataManage.getTreeRootNodes(l);
		if(!h) {
			return
		}
		var n = h[0] || {
				nodes: []
			},
			g = h[1] || {
				nodes: []
			},
			j = h[2] || {
				nodes: []
			},
			k = g.nodes.concat(n.nodes.concat(j.nodes)),
			i = {};
		var m = function(o, p) {
			if(!p || !p.length) {
				return
			}
			Ext.each(p,
				function(q, r) {
					var tp = function(q){
						var type = '';
						if(q.iconUrl=='3'){
							type = 'event'
						}else if(q.iconUrl=='2'){
							type = 'fn()'
						}else {
							type = ''
						}
						return type;
					}
					//r index
					//q attributes
					var s = ControlsDataManage.showDescript(q);
					o[q.id] = {
						"!doc": getFuncInfo(s),
						"name":s.name,
                        pro:s.pro,
						// "!type": q.iconUrl == "2" ? "fn()" : ""
                        "type": tp(q)
					};
					m(o[q.id], q.nodes)
				})
		};
		m(i, k);
		return i
	};

	for(var g in c) {
		def_platformControl[b + g] = {
			"!type": "fn()",
			prototype: a(g)
		}
	}
}


function init_def_platformControlData2(rootNode) {

	//activeCmpId
	var f = rootNode || xds.inspector.root.childNodes[0];
	if(!f) {
		return
	}
	var c = {},
		b = "__control__";
	var e = function(h, j) {
		var g = j && j.length,
			l, m;
		if(!g) {
			return
		}
		for(var k = 0; k < g; k++) {
			l = j[k].component;

			if(l.cid.indexOf("vmd.ux.") >= 0) //兼容复合组件定义中待.的问题
			{
				c[(l.cid.replace(/\./g, '_'))] = true;
				h[l.id] = {
					"!type": "+" + b + (l.cid.replace(/\./g, '_')),
					"!doc": l.text || l.id || l.name
				};
			} else {
				c[l.cid] = true;
				h[l.id] = {
					"!type": "+" + b + l.cid,
					"!doc": l.text || l.id || l.name
				};
			}
			e(h, j[k].childNodes)
		}
	};
	//成兵 20180102 对工作流进行特殊判断，添加到ace中，原因为 工作流组件自身为根节点，不同于变量等，为变量节点的子节点
	if(xds.vmd.getRootNodeCmpList().indexOf(f.component.cid)>=0)
		e(def_platformControl, [f]);
	else
		e(def_platformControl, f.childNodes);

	var a = function(l) {

		//这里是进行汉化的关键步骤
		//数据结构为array 分为属性、方法和事件[{text:'属性',id:'property',nodes:[{}]}]
		//var compClass = Ext.ComponentMgr.types[l.toLowerCase().replace('vmd', 'vmd.')];
		var h = ControlsDataManage.getTreeRootNodes(l);
		if(!h) {
			return
		}
		var n = h[0] || {
				nodes: []
			},
			g = h[1] || {
				nodes: []
			},
			j = h[2] || {
				nodes: []
			},
			k = g.nodes.concat(n.nodes.concat(j.nodes)),
			i = {};
		var m = function(o, p) {
			if(!p || !p.length) {
				return
			}
			Ext.each(p,
				function(q, r) {
					var tp = function(q){
						var type = '';
						if(q.iconUrl=='3'){
							type = 'event'
						}else if(q.iconUrl=='2'){
							type = 'fn()'
						}else {
							type = ''
						}
						return type;
					}
					//r index
					//q attributes
					var s = ControlsDataManage.showDescript(q);
					o[q.id] = {
						"!doc": getFuncInfo(s),
						"name":s.name,
                        pro:s.pro,
						// "!type": q.iconUrl == "2" ? "fn()" : ""
                        "type": tp(q)
					};
					m(o[q.id], q.nodes)
				})
		};
		m(i, k);
		return i
	};

	for(var g in c) {
		def_platformControl[b + g] = {
			"!type": "fn()",
			prototype: a(g)
		}
	}
}

//20180110 chengbing

var def_platformWidget = {
	"!name": "widget"
};
//20180110 chengbing
function init_def_platformFun(a) {
	var d = {
		"function": function(i) {
			return "fn()"
		},
		array: function(i) {
			return "[array]"
		}
	};
	var g = function(o, k, p) {
		var j, t, m, u, s, l, r;
		for(var n in k) {
			m = k[n];
			j = m.name;
			t = m.value;
			l = m.items;
			c=m.Class;
			if(t == null && !l) {
				continue
			}
			r = m.comment || m.text;
			s = typeof(t);
			if(c) {
				u = o[c] = {
					"!doc": r
				};
			} else {
				u = o;
			}			
			s = d[s] && d[s](t);
			if(t && s) {
				u["!type"] = s
			}
			if(l) {
				g(u, l)
			}
		}
	};
	g(def_platformWidget, a);
	var e = def_platformWidget.Global;
	if(e) {
		var f, b = [],
			h;
		for(var c in e) {
			if(!e.hasOwnProperty(c)) {
				continue
			}
			b = c.split(".");
			f = e[c];
			if(b.length == 2) {
				h = def_platformWidget[b[0]];
				if(h) {
					h[b[1]] = f
				}
			} else {
				def_platformWidget[c] = f
			}
		}
	}
	delete def_platformWidget.Global
}

function init_def_platformVmd() {
	init_def_platformPro({
		vmd: vmd
	})
}

function init_def_platformExt() {
	init_def_platformPro(Ext)
}

function init_def_platformPro(a) {
	var d = {
		"function": function(i) {
			return "fn()"
		},
		array: function(i) {
			return "[array]"
		}
	};
	var g = function(o, k, p) {
		var j, t, m, u, s, l, r;
		if(typeof k != "object")
			return
		for(var n in k) {
			m = k[n];
			j = m.name || n;
			//t = m.value;
			l = m.items || m;
			if(!l) {
				continue
			}
			r = m.comment || m.text;
			s = typeof(m);
			u = o[j] || (o[j] = {
				"!doc": r
			})
			s = d[s] && d[s]('');
			if(m && s) {
				u["!type"] = s
			}
			if(n == "parent" || typeof m != "object" || !m)
				continue
			if((p + "_" + r).split('_').length > 5)
				continue
			if(l) {
				g(u, l, p + "_" + r)
			}
		}
	};
	g(def_platformWidget, a, "_");
	var e = def_platformWidget.Global;
	if(e) {
		var f, b = [],
			h;
		for(var c in e) {
			if(!e.hasOwnProperty(c)) {
				continue
			}
			b = c.split(".");
			f = e[c];
			if(b.length == 2) {
				h = def_platformWidget[b[0]];
				if(h) {
					h[b[1]] = f
				}
			} else {
				def_platformWidget[c] = f
			}
		}
	}
	delete def_platformWidget.Global
}

function initScriptEdit() {
	var d = getdlg(),
		a = "";
	if(d) {
		a = d.script
	}
	if(!d && parent._getScriptValue) {
		a = parent._getScriptValue()
	}
	var c = d && d.ongotoline && d.ongotoline();
	var b = new AceEditor({
		el: "divEditor",
		value: a,
		language: "javascript",
		onsave: function() {
			save()
		}
	});
	mygp.editor = b;
	if(typeof c == "number") {
		b.gotoLine(c)
	}
	return a
}

////////////////////////动态添加方法
function addUxControlFun(UxControl) {
	var c_methods = {};
	var c_pros = {};
	var c_events = {};

	Ext.each(UxControl.prop, function(item, index) {
		c_pros[item.id] = {

			Description: item.zhname || item.desc || item.id,
			Prototype: "",
			Args: {
				_Return_: item.returnType || ""
			},
			Example: item.desc || "",
			Name:item.zhname
		}
	})
	Ext.each(UxControl.method, function(item, index) {
		c_methods[item.id] = {

			Description: item.zhname || item.desc || item.id,
			Prototype: item.id + "(" + item.params + ")",
			Args: {
				_Return_: item.returnType || "void",
				Args: item.params
			},
			Example: item.desc || ""
		}
	})
	Ext.each(UxControl.event, function(item, index) {
		c_events[item.id] = {

			Description: item.zhname,
			Prototype: "",
			Args: {
				_Return_: ""
			},
			Example: item.desc || ""
		}
	})

	var ControlsData = {
		BaseType: "Control",
		Type: (UxControl.cid.indexOf("vmd.ux.") >= 0) ? (UxControl.cid.replace(/\./g, '_')) : UxControl.cid, //兼容复合组件定义中待.的问题
		Property: c_pros,
		Method: c_methods,
		Event: c_events
	};

	//ControlsDataManage._add(ControlsData);
	return ControlsData;
}