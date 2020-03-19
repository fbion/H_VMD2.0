///底层基类  基于Ext.BoxComponent 
var Data_Control = {
	BaseType: "",
	Type: "Control",
	Property: {		
        autoScroll: {
            Description: "True表示为在面板body元素上，设置overflow：'auto'和出现滚动条false表示为裁剪所有溢出的内容（默认为false）。",
            Prototype: "autoScroll : Boolean ",
            Name:"滚动条",
            Args: {
                _Return_: "Boolean "
            },
            Example: ""
        },
		autoHeight: {
			Description: "True表示为使用height:'auto'，false表示为使用固定高度（缺省为false）。",
			Prototype: "Boolean  autoHeight   ",
            Name:"自动高度",
			Args: {
				_Return_: "Boolean   "
			},
			Example: ""
		},
		autoWidth: {
			Description: "True表示为使用width:'auto'，false表示为使用固定宽度（缺省为false）。",
			Prototype: "Boolean   autoWidth",
            Name:"自动宽度",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		clearCls: {
			Description: "关于field的清除样式（默认为'x-form-clear-left'）。此组件只有在FormLayout布局管理器控制的容器下渲染才有用。",
			Prototype: "String  clearCls",
            Name:"清除样式类名",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		cls: {
			Description: "一个可选添加的CSS样式类，加入到组件的元素上（默认为''）。",
			Prototype: "String  cls ",
            Name:"样式类名",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
        html: {
            Description: " 一段HTML片段，或DomHelper配置项作为面板body内容（默认为 ''）",
            Prototype: " String/Object html ",
            Args: {
                _Return_: " String/Object "
            },
            Example: ""
        },
		ctCls: {
			Description: " 一个可选添加的CSS样式类，加入到组件的容器上（默认为''）",
			Prototype: " String ctCls ",
            Name:"容器样式名",
			Args: {
				_Return_: " String "
			},
			Example: ""
		},
		disabled: {
			Description: "渲染该组件为禁用状态的（默认为false）。",
			Prototype: "Boolean disabled ",
            Name:"禁用",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		disabledClass: {
			Description: " 当组件被禁用时作用的CSS样式类（默认为”x-item-disabled”） ",
			Prototype: " String disabledClass ",
            Name:"禁用样式类名",
			Args: {
				_Return_: " String "
			},
			Example: ""
		},
		fieldLabel: {
			Description: " 在组件旁边那里显示的label文本（默认为''）。 此组件只有在FormLayout布局管理器控制的容器下渲染才有用。",
			Prototype: " String fieldLabel ",
            Name:"标签名",
			Args: {
				_Return_: " String "
			},
			Example: "new Ext.FormPanel({   \n" +
				"height: 100, \n" +
				"renderTo: Ext.getBody(), \n" +
				"items: [{   \n" +
				"    xtype: 'textfield', \n" +
				"    fieldLabel: 'Name'   \n" +
				"}]   \n" +
				"});"
		},
		height: {
			Description: " 此组件的高度（单位象素）（缺省为auto）。",
			Prototype: " Number height ",
            Name:"高度",
			Args: {
				_Return_: " Number "
			},
			Example: ""
		},
		hidden: {
			Description: " 渲染该组件为隐藏状态的（默认为false）。",
			Prototype: "Boolean hidden ",
            Name:"隐藏",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		hideLabel: {
			Description: " True表示为完全隐藏label元素",
			Prototype: "Boolean hideLabel ",
            Name:"显示标签",
			Args: {
				_Return_: "Boolean"
			},
			Example: "Example use:    \n" +
				"new Ext.FormPanel({    \n" +
				"height: 100,  \n" +
				"renderTo: Ext.getBody(),  \n" +
				"items: [{    \n" +
				"    xtype: 'textfield'    \n" +
				"    hideLabel: true    \n" +
				"}]    \n" +
				"});"
		},
		hideMode: {
			Description: " 这个组件是怎么隐藏的。可支持的值有”visibility” （css中的visibility），”offsets”（负偏移位置）和”display”（css中的display）－默认为“display”。容器可能是card layout或TabPanel中的一员，会有隐藏/显未的情形，这种情形下最好将其hideMode模式设为”offsets”。这保证了计算布局时，组件仍有正确的高度和宽度，组件管理器才能顺利地测量。",
			Prototype: " String hideMode ",
            Name:"隐藏方式",
			Args: {
				_Return_: " String "
			},
			Example: ""
		},
		hideParent: {
			Description: " True表示为当隐藏/显示组件时对组件的父容器亦一同隐藏/显示,false就只会隐藏/显示组件本身（默认为false）",
			Prototype: "Boolean hideParent ",
            Name:"隐藏父容器",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		id: {
			Description: " 唯一的组件id（默认为自动分配的id）",
			Prototype: " String id ",
			Args: {
				_Return_: " String "
			},
			Example: ""
		},
		itemCls: {
			Description: " 关于容器的表单项元素的额外的CSS样式，该样式是作用于整个条目容器的",
			Prototype: " String itemCls ",
            Name:"子项样式类名",
			Args: {
				_Return_: " String "
			},
			Example: "// 对表单字段的lable有效   \n" +
				"<style>   \n" +
				"    .required .x-form-item-label {font-weight:bold;color:red;}   \n" +
				"</style>   \n" +
				"new Ext.FormPanel({   \n" +
				"	height: 100, \n" +
				"	renderTo: Ext.getBody(), \n" +
				"	items: [{   \n" +
				"		xtype: 'textfield', \n" +
				"		fieldLabel: 'Name',  \n" +
				"		itemCls: 'required' //该label就会有效果 sender label will be styled   \n" +
				"	},{   \n" +
				"		xtype: 'textfield',  \n" +
				"		fieldLabel: 'Favorite Color'   \n" +
				"	}]   \n" +
				"});"
		},
		itemId: {
			Description: "可以用这个itemId的索引来获取这个组件",
			Prototype: " String itemId ",
            // Name:"面板id",
			Args: {
				_Return_: " String "
			},
			Example: "var c = new Ext.Panel({ //   \n" +
				"    height: 300,  \n" +
				"    renderTo: document.body,  \n" +
				"    layout: 'auto',  \n" +
				"    items: [   \n" +
				"        {   \n" +
				"            itemId: 'p1',  \n" +
				"            title: 'Panel 1',  \n" +
				"            height: 150   \n" +
				"        },  \n" +
				"        {   \n" +
				"            itemId: 'p2',  \n" +
				"            title: 'Panel 2',  \n" +
				"            height: 150   \n" +
				"        }   \n" +
				"    ]   \n" +
				"})   \n" +
				"p1 = c.getComponent('p1'); // not the same as {@link Ext#getCmp \n" +
				"Ext.getCmp()  \n" +
				"}\n" +
				"p2 = p1.ownerCt.getComponent('p2'); // reference via a sibling "
		},
		labelSeparator: {
			Description: " 分隔符，就是每行表单中的label文本显示后面紧接着的那个分隔符",
            Name:"分隔符",
			Args: {
				_Return_: " String "
			},
			Example: "new Ext.FormPanel({    \n" +
				"   height: 100,  \n" +
				"   renderTo: Ext.getBody(),  \n" +
				"   items: [{   \n" +
				"       xtype: 'textfield',  \n" +
				"       fieldLabel: 'Name',  \n" +
				"       labelSeparator: '...'   \n" +
				"   }]  \n" +
				"});"
		},
		labelStyle: {
			Description: " 关于表单字段的label提示文本的CSS样式的“完全表达式（CSS style specification）",
			Prototype: " String labelStyle ",
            Name:"文本样式",
			Args: {
				_Return_: " String "
			},
			Example: "new Ext.FormPanel({\n " +
				"height: 100,\n " +
				"renderTo: Ext.getBody(),				\n " +
				"items: [{\n " +
				"	xtype: 'textfield',\n " +
				"	fieldLabel: 'Name',					\n " +
				"	labelStyle: 'font-weight:bold;'\n " +
				"}]\ n " +
				"});"
		},
		overCls: {
			Description: " 关于鼠标上移至该组件元素的CSS样式类，移出时撤销该样式的效果（默认为''）",
			Prototype: " String overCls ",
            Name:"鼠标移入样式名",
			Args: {
				_Return_: " String "
        },
			Example: ""
		},
		pageX: {
			Description: " 如果该组件是在一个定位的组件之中，可通过该属性返回组件的x页面坐标。",
			Prototype: " Number pageX ",
            Name:"X坐标",
			Args: {
				_Return_: " Number "
			},
			Example: ""
		},
		pageY: {
			Description: " 如果该组件是在一个定位的组件之中，可通过该属性返回组件的y页面坐标。",
			Prototype: " Number pageY ",
            Name:"Y坐标",
			Args: {
				_Return_: " Number "
			},
			Example: ""
		},
		// plugins: {
		// 	Description: " 针对该组件自定义的功能，是对象或这些对象组成的数组",
		// 	Prototype: " Object/Array plugins ",
		// 	Args: {
		// 		_Return_: " Object/Array "
		// 	},
		// 	Example: ""
		// },
		// ref: {
		// 	Description: " 一种路径的规范，可获取位于该容器下某一子组件的ownerCt。该路径依靠此组件本身为引用根据。",
		// 	Prototype: " String ref ",
		// 	Args: {
		// 		_Return_: " String "
		// 	},
		// 	Example: "var myGrid = new Ext.grid.EditorGridPanel({   \n" +
		// 		" title: '我的EditorGridPanel',  \n" +
		// 		" store: myStore,  \n" +
		// 		" colModel: myColModel,  \n" +
		// 		" tbar: [{   \n" +
		// 		"     text: '保存',  \n" +
		// 		"     handler: saveChanges,  \n" +
		// 		"     disabled: true,  \n" +
		// 		"     ref: '../saveButton'   \n" +
		// 		" }],  \n" +
		// 		" listeners: {   \n" +
		// 		"     afteredit: function() {   \n" +
		// 		"//          GridPanel（myGrid）就有了这个savaButton的引用。The button reference is in the GridPanel   \n" +
		// 		"           myGrid.saveButton.enable();   \n" +
		// 		"       }   \n" +
		// 		"   }   \n" +
		// 		"});   \n" +
		// 		"以上代码中，ref: '../saveButton'就是配置项的按钮其标识为saveButton，“../”相对为该组件，即目标组件的ownerCt的上一层组件。"
		// },
		// renderTo: {
		// 	Description: "容器渲染的那个节点的id，或是DOM节点，又或者是与DIV相当的现有元素。使用了这项配置后，不需要执行render()的方法。",
		// 	Prototype: " Mixed renderTo ",
		// 	Args: {
		// 		_Return_: " Mixed "
		// 	},
		// 	Example: ""
		// },
		// stateId: {
		// 	Description: " 出于状态管理目的id，（默认是人为设置过的组件id，如果组件是自动生成的id那种那么该项是null。",
		// 	Prototype: " String stateId ",
		// 	Args: {
		// 		_Return_: " String "
		// 	},
		// 	Example: ""
		// },
		stateful: {
			Description: "组件记忆了一个状态信息，启动时候就根据这个标记获取状态信息",
            Name:"状态信息标记",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		style: {
			Description: " 作用在组件元素上特定的样式",
			Prototype: " String style ",
            Name:"内联样式",
			Args: {
				_Return_: " String "
			},
			Example: ""
		},
		width: {
			Description: " 此组件的宽度（单位象素）（缺省为auto）。 ",
			Prototype: " Number width ",
            Name:"宽度",
			Args: {
				_Return_: " Number "
			},
			Example: ""
		},
		x: {
			Description: " 如果该组件是在一个定位的组件之中，可通过该属性返回组件的x本地（左边）坐标。 ",
			Prototype: " Number x",
			Args: {
				_Return_: " Number "
			},
			Example: ""
		},
		xtype: {
			Description: " 用于登记一个xtype。 ",
			Prototype: " String xtype ",
            Name:"简称",
			Args: {
				_Return_: " String "
			},
			Example: ""
		},
		y: {
			Description: " 如果该组件是在一个定位的组件之中，可通过该属性返回组件的y本地（顶部）坐标。 ",
			Prototype: " Number ｙ",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
        anchor: {
            Description: "anchor属性为一组字符串，可以使用百分比或者是-数字来表示，水平相对值和垂直相对值(例如'100% 50%')。配置字符串使用空格隔开，此属性告知布局子项应该如何放置",
            Prototype: " String anchor ",
            Name:"百分比",
            Args: {
                _Return_: " String "
            },
            Example: ""
        },
        store: {
            Description: "数据集",
            Prototype: "string store",
            Name:"数据集",
            Args: {
                _Return_: "数据集"
            },
            Example: ""
        }
	},
	Event: {
		OnLoadCompleted: {
		    Description: "加载完成事件",
		    Prototype: "OnLoadCompleted(sender)",
            Name:"加载完成事件",
		    Args: {
		        _Return_: "",
		        sender: "控件本身"
		    },
		    Example: ""
		},
		beforerender: {
		    Description: "当组件渲染之前触发。如返回false则阻止渲染",
		    Prototype: "beforerender(sender)",
            Name:"渲染之前触发",
		    Args: {
		        _Return_: "",
		        sender: "控件本身"
		    },
		    Example: ""
		},
		afterrender: {
		    Description: "组件渲染之后触发。如返回false则停止触发。",
		    Prototype: "afterrender(sender)",
            Name:"渲染之后触发",
		    Args: {
		        _Return_: "",
		        sender: "控件本身"
		    },
		    Example: ""
		},
		click: {
            Description: "组件的点击事件",
            Prototype: "click(sender)",
            Name:"点击事件",
            Args: {
                _Return_: "",
                sender: "控件本身"
            },
            Example: ""
        }
	},
	Method: {
		addClass: {
			Description: "加入CSS样式类到组件所在的元素。",
			Prototype: "addClass(cls)",
            Name:"添加class",
			Args: {
				_Return_: "组件本身",
				cls: "要加入的CSS样式类"
			},
			Example: ""
		},
		addEvents: {
			Description: "定义观察者的事件。",
			Prototype: "addEvents(o)",
            Name:"定义观察者的事件",
			Args: {
				_Return_: "void ",
				o: "定义的事件对象"
			},
			Example: "button1.SetVisible(true)"
		},
		getValue: {
			Description: "获取变量值",
			Prototype: "getValue()",
            Name:"获取变量值",
			Args: {
				_Return_: "string  返回变量值"
			},
			Example: ""
		},
		setValue: {
			Description: "设置变量值",
			Prototype: "setValue(value)",
            Name:"设置变量值",
			Args: {
				_Return_: "void",
				value: "string  要设置的变量值"
			},
			Example: ""
		},
		addListener: {
			Description: "加入一个事件处理函数。on是其简写方式。",
			Prototype: "addListener(eventName,fn,[scope],[options]) ",
            Name:"添加事件处理函数",
			Args: {
				eventName: "String 事件处理函数的名称。",
				fn: "Function 事件处理函数。",
				scope: "Object 事件处理函数执行时所在的作用域。处理函数“this”的上下文。",
				options: "Object 包含句柄配置属性的一个对象。",
				_Return_: "void "
			},
			Example: "el.on('click',this.onClick,this,{ \n" +
				"    single: true,\n" +
				"    delay: 100,\n" +
				"    stopEvent : true,\n" +
				"    forumId: 4 \n" +
				"}); \n" +
				"多个处理函数一次性登记。Attaching multiple handlers in 1 call \n" +
				"这样的话，可允许多个事件处理函数都共享一个配置事件的配置项对象。\n" +
				"代码：Code: \n" +
				"el.on({\n" +
				"    'click' : { \n" +
				"        fn: this.onClick,\n" +
				"        scope: this,\n" +
				"        delay: 100 \n" +
				"    },\n" +
				"    'mouseover' : { \n" +
				"        fn: this.onMouseOver,\n" +
				"        scope: this \n" +
				"    },\n" +
				"    'mouseout' : { \n" +
				"        fn: this.onMouseOut,\n" +
				"        scope: this \n" +
				"    } \n" +
				"}); \n" +
				"或者是简写的语法：Or a shorthand syntax: \n" +
				"Code: \n" +
				"el.on({\n" +
				"    'click' : this.onClick,\n" +
				"    'mouseover' : this.onMouseOver,\n" +
				"    'mouseout' : this.onMouseOut,\n" +
				"    scope: this \n" +
				"}); "
		},
		// applyToMarkup: {
		// 	Description: "把这个组件应用到当前有效的markup。执行该函数后，无须调用render()。",
		// 	Prototype: "applyToMarkup(String/HTMLElement el) : void ",
		// 	Args: {
		// 		el: "String/HTMLElement ",
		// 		_Return_: "void "
		// 	},
		// 	Example: ""
		// },
		// capture: {
		// 	Description: "开始捕捉特定的观察者。在事件触发之前，所有的事件会以“事件名称+标准签名”的形式传入到函数（传入的参数是function类型）。如果传入的函数执行后返回false，则接下的事件将不会触发。",
		// 	Prototype: "capture(Observable o,Function fn,[Object scope]) : void ",
		// 	Args: {
		// 		o: "Observable 要捕捉的观察者 ",
		// 		fn: "Function 要调用的函数 ",
		// 		scope: "Object 函数作用域(optional) ",
		// 		_Return_: "void "
		// 	},
		// 	Example: ""
		// },
		// cloneConfig: {
		// 	Description: "根据原始传入到该实例的配置项值，克隆一份组件。",
		// 	Prototype: "cloneConfig(Object overrides) : Ext.Component ",
		// 	Args: {
		// 		overrides: "Object 一个新配置项对象，用于对克隆版本的属性进行重写。属性id应要重写，避免重复生成一个。",
		// 		_Return_: "Ext.Component clone 克隆该组件的copy。 "
		// 	},
		// 	Example: ""
		// },
		// destroy: {
		// 	Description: "清除任何的事件的句柄",
		// 	Prototype: "void   destroy()  ",
		// 	Args: {
		// 		_Return_: "void"
		// 	},
		// 	Example: ""
		// },
		disable: {
			Description: "禁用该组件",
			Prototype: "disable() ",
            Name:"禁用该组件",
			Args: {
				_Return_: "组件本身"
			},
			Example: ""
		},
		enable: {
			Description: "启用该组件",
			Prototype: "enable()",
            Name:"启用该组件",
			Args: {
				_Return_: "组件本身"
			},
			Example: ""
		},
		findParentBy: {
			Description: "在此组件之下由自定义的函数作搜索依据查找容器。如函数返回true返回容器的结果。",
			Prototype: "findParentBy(fun,[scope])",
            Name:"查找组件",
			Args: {
				_Return_: "首次匹配的容器。",
				fcn: "Function 调用的函数",
				scope: "Object 函数作用域，可选"
			},
			Example: ""
		},
		findParentByType: {
			Description: "根据xtype或class查找该容器下任意层次中某个容器",
			Prototype: "findParentByType(xtype)",
            Name:"查找父组件",
			Args: {
				_Return_: "首次匹配的容器。",
				xtype: "String/Class 组件的xtype字符串，或直接就是组件的类本身。"
			},
			Example: ""
		},
		fireEvent: {
			Description: "触发指定的事件,并在这里把处理函数的参数传入（应该至少要有事件的名称）。",
			Prototype: "fireEvent(eventName,args) ",
            Name:"触发指定事件",
			Args: {
				_Return_: "Boolean 从处理函数返回true或者false 。",
				eventName: "String/Class  事件名称,如果这个事件是要在Observable父类上逐层上报，那么第一个参数一定是true，然后第二个参数是事件名称。",
				args: "Object 传入事件处理函数的参数Variable "
			},
			Example: ""
		},
		focus: {
			Description: "试着将焦点放到此项",
			Prototype: "focus([selectText],[delay]) ",
            Name:"获取焦点",
			Args: {
				_Return_: "组件本身",
				selectText: "Boolean   true的话同时亦选中组件中的文本（尽可能)",
				delay: " Boolean/Number   延时聚焦行为的毫秒数（true表示为10毫秒）。"
			},
			Example: ""
		},
		getBox: {
			Description: "返回对组件所在元素的测量矩形大小",
			Prototype: "getBox([local]) ",
            Name:"测量尺寸",
			Args: {
				_Return_: "Object ",
				local: "Boolean   如为真返回的是元素的left和top而非XY（默认为false）。"
			},
			Example: ""
		},
		// getBubbleTarget: {
		// 	Description: "为Observable对象的fireEvent方法，方便对该组件的父级组件进行冒泡操作。",
		// 	Prototype: "getBubbleTarget() : the ",
		// 	Args: {
		// 		_Return_: "the 包含该组件的容器。 "
		// 	},
		// 	Example: ""
		// },
		// getEl: {
		// 	Description: "返回所属的Ext.Element",
		// 	Prototype: "Ext.Element getBox() ",
		// 	Args: {
		// 		_Return_: "Ext.Element \r\n" +
		// 			"   包含该组件的元素对象"
		// 	},
		// 	Example: "p.getEl().on('click',handlePanelClick.createDelegate(null,[p],true));"
		// },
		getHeight: {
			Description: "返回当前组件所在的HTML元素的高度",
			Prototype: "getHeight() ",
            Name:"获取高度",
			Args: {
				_Return_: "Number "
			},
			Example: ""
		},
		getId: {
			Description: "返回该组件的id",
			Prototype: "getId() ",
            Name:"获取id",
			Args: {
				_Return_: "String "
			},
			Example: ""
		},
		getItemId: {
			Description: "返回该组件的item id",
			Prototype: "getItemId() ",
            Name:"获取itemId",
			Args: {
				_Return_: "String "
			},
			Example: ""
		},
		getOuterSize: {
			Description: "返回当前组件所在元素的尺寸大小",
			Prototype: "getOuterSize() ",
            Name:"获取尺寸大小",
			Args: {
				_Return_: "Object 尺寸大小的对象 "
			},
			Example: ""
		},
		getPosition: {
			Description: "返回当前组件的坐标",
			Prototype: "getPosition(local) ",
            Name:"获取坐标位置",
			Args: {
				_Return_: "Array   元素的XY位置（如[100,200]）。",
				local: "Boolean  如为真返回的是元素的left和top而非XY（默认为false）。"
			},
			Example: ""
		},
		getSize: {
			Description: "返回当前组件所属元素的大小",
			Prototype: "getSize() ",
            Name:"获取元素大小",
			Args: {
				_Return_: "Object 尺寸大小的对象  "
			},
			Example: ""
		},
		getWidth: {
			Description: "返回当前组件所在的HTML元素的宽度。 ",
			Prototype: "getWidth()",
            Name:"获取宽度",
			Args: {
				_Return_: "Number "
			},
			Example: ""
		},
		// getXType: {
		// 	Description: "获取Ext.ComponentMgr在已登记组件的xtypes。全部可用的xtypes列表，可参考Ext.Component开头",
		// 	Prototype: "getXType() : String ",
		// 	Args: {
		// 		_Return_: "String The xtype "
		// 	},
		// 	Example: "var t = new Ext.form.TextField();\n" +
		// 		"alert(t.getXType());  // 提示alerts 'textfield'"
		// },
		// getXTypes: {
		// 	Description: "返回以斜杠分割的字符串，表示组件的xtype层次。如果你创建了子类，要注意必须登记一个新的xtype，让xtype的层次性发挥作用。",
		// 	Prototype: "getXTypes() : String ",
		// 	Args: {
		// 		_Return_: "String 层次的字符串。 "
		// 	},
		// 	Example: "var t = new Ext.form.TextField();\n" +
		// 		"alert(t.getXTypes());  // 提示alerts 'component/box/field/textfield'"
		// },
		hasListener: {
			Description: "检测当前对象是否有指定的事件",
			Prototype: "hasListener(eventName)",
            Name:"事件检测",
			Args: {
				_Return_: "Boolean   True表示有事件正在被监听，否则为false。",
				eventName: "String   要检查的事件名称"
			},
			Example: ""
		},
		hide: {
			Description: "隐藏该组件",
			Prototype: "hide()",
            Name:"隐藏该组件",
			Args: {
				_Return_: "this"
			},
			Example: ""
		},
		isVisible: {
			Description: "该组件可见时返回true",
			Prototype: "isVisible()",
            Name:"是否可见",
			Args: {
				_Return_: "Boolean  为True时显示/false时隐藏。"
			},
			Example: ""
		},
		isXType: {
			Description: "测试这个组件是否属于某个指定的xtype。这个方法既可测试该组件是否为某个xtype的子类",
			Prototype: "isXType(xtype,[shallow]) ",
            Name:"类型判断",
			Args: {
				xtype: "String 测试该组件的xtype。 ",
				shallow: " Boolean False表示为测试该组件是否为某个xtype的子类（缺省）。 ",
				_Return_: "Boolean true就表示为测试该组件是否这个xtype本身的实例。 "
			},
			Example: "var t = new Ext.form.TextField();\n" +
				"var isText = t.isXType('textfield');        // true\n" +
				"var isBoxSubclass = t.isXType('box');       // true，textfield继承自BoxComponent  true,descended from BoxComponent\n" +
				"var isBoxInstance = t.isXType('box',true); // false，非BoxComponent本身的实例 false,not a direct BoxComponent instance"

		},
		nextSibling: {
			Description: "在所属的容器范围中范围该组件的下一个的组件。 ",
			Prototype: "nextSibling()",
            Name:"下一兄弟组件",
			Args: {
				_Return_: "组件对象"
			},
			Example: ""
		},
		on: {
			Description: "为该元素添加事件处理函数（addListener的简写方式）。 ",
			Prototype: "on(eventName,handler,[scope],options)",
			Args: {
				eventName: "String 事件名称 ",
				handler: " Function 处理函数 ",
				scope: "Object 执行处理函数的作用域。 ",
				options: "Object （可选的） ",
				_Return_: "void "
			},
			Example: ""
		},
		previousSibling: {
			Description: "在所属的容器范围中该组件的上一个的组件。 ",
			Prototype: "previousSibling()",
            Name:"上一兄弟组件",
			Args: {
				_Return_: "组件对象"
			},
			Example: ""
		},
		// purgeListeners: {
		// 	Description: "该组件可见时返回true",
		// 	Prototype: "void purgeListeners()",
		// 	Args: {
		// 		_Return_: "void "
		// 	},
		// 	Example: ""
		// },
		// relayEvents: {
		// 	Description: " Relays selected events from the specified Observable as if the events were fired by this. ",
		// 	Prototype: "relayEvents(Object o,Array events) : void ",
		// 	Args: {
		// 		o: "Object The Observable whose events this object is to relay. ",
		// 		events: " Array Array of event names to relay. ",
		// 		_Return_: "void "
		// 	},
		// 	Example: ""
		// },
		// releaseCapture: {
		// 	Description: "从Observable身上移除所有已加入的捕捉captures。",
		// 	Prototype: "releaseCapture(Observable o) : void ",
		// 	Args: {
		// 		o: " Observable 要释放的观察者 ",
		// 		_Return_: "void "
		// 	},
		// 	Example: ""
		// },
		removeClass: {
			Description: "移除CSS样式类",
			Prototype: "removeClass(cls)",
            Name:"移除class",
			Args: {
				_Return_: "void ",
				cls: "string 要移除的CSS样式类"
			},
			Example: ""
		},
		removeListener: {
			Description: "移除侦听器",
			Prototype: "removeListener(eventName,handler,scope) ",
            Name:"移除侦听器",
			Args: {
				_Return_: "void ",
				eventName: "String  侦听事件的类型",
				handler: "Function  移除的处理函数",
				scope: "Object  （可选的） 处理函数之作用域"
			},
			Example: ""
		},
		render: {
			Description: "执行容器的渲染，可以将渲染执行在送入的HTML元素上面",
            Name:"执行容器的渲染",
			Prototype: "render([container],[position]) ",
			Args: {
				_Return_: "void ",
				container: "Element/HTMLElement/String   组件准备渲染到的元素，如果基于现有的元素，那该项就应有略",
				position: "String/Number  元素ID或Dom节点索引，说明该组件在容器中的哪一个子组件之前插入（默认加在容器中最后的位置）。"
			},
			Example: ""
		},
		// resumeEvents: {
		// 	Description: "重新触发事件 ",
		// 	Prototype: "resumeEvents() : void ",
		// 	Args: {
		// 		_Return_: "void "
		// 	},
		// 	Example: ""
		// },
		setDisabled: {
			Description: "启用或者禁用当前组件.",
			Prototype: "setDisabled(disabled)",
            Name:"启用或者禁用当前组件",
			Args: {
				disabled: "Boolean ",
				_Return_: "this "
			},
			Example: ""
		},
		setHeight: {
			Description: "设置组件的高度。此方法会触发resize事件",
			Prototype: "setHeight(height)  ",
            Name:"设置高度",
			Args: {
				_Return_: "this ",
				height: "Number  要设置的新高度"
			},
			Example: ""
		},
		setPagePosition: {
			Description: "设置组件页面上的left和top值。要设置left、top的位置，可使用setPosition。此方法触发move事件。",
			Prototype: "setPagePosition(x,y)  ",
            Name:"设置位置",
			Args: {
				_Return_: "this ",
				x: "Number   新x位置。",
				y: "Number   新y位置。"
			},
			Example: ""
		},
		setPosition: {
			Description: "设置组件的left和top值。要设置基于页面的XY位置，可使用setPagePosition。此方法触发move事件。",
			Prototype: "setPagePsetPositionosition(left,top)",
            Name:"设置位置",
			Args: {
				_Return_: "this ",
				left: "Number   新left位置。",
				top: "Number   新top位置。"
			},
			Example: ""
		},
		setSize: {
			Description: "设置组件的宽度和高度。此方法会触发resize事件。",
			Prototype: "setSize(width,height) ",
            Name:"设置大小",
			Args: {
				_Return_: "Ext.BoxComponent  this ",
				width: "Number/Object   要设置的宽度，或一个size对象，格式是{width,height}。",
				height: "Number 要设置的高度（如第一参数是size对象的那第二个参数经不需要了）。"
			},
			Example: ""
		},
		setVisible: {
			Description: "通过使用布尔值隐藏或者显示当前组件.",
			Prototype: "setVisible(visible) ",
            Name:"设置状态",
			Args: {
				_Return_: "Ext.Component this ",
				visible: "Boolean  为True时显示/false时隐藏。"
			},
			Example: ""
		},
		setWidth: {
			Description: "设置组件的宽度。此方法会触发resize事件。",
			Prototype: "setWidth(width) ",
            Name:"设置宽度",
			Args: {
				_Return_: " this ",
				width: "Number   要设置的新宽度"
			},
			Example: ""
		},
		show: {
			Description: "显示该组件。",
            Name:"显示该组件",
			Prototype: "show() ",
			Args: {
				_Return_: "this "
			},
			Example: ""
		},
		// suspendEvents: {
		// 	Description: "暂停触发所有的事件",
		// 	Prototype: "suspendEvents(queueSuspended) ",
		// 	Args: {
		// 		_Return_: "void   ",
		// 		queueSuspended: "Boolean 传递为true以对在resumeEvents调用之后触发的挂起事件进行排队，而不是丢弃所有被挂起的事件"
		// 	},
		// 	Example: ""
		// },
		syncSize: {
			Description: "强制重新计算组件的大小尺寸，这个尺寸是基于所属元素当前的高度和宽度",
			Prototype: "syncSize()",
            Name:"重新计算尺寸",
			Args: {
				_Return_: "this "
			},
			Example: ""
		},
		un: {
			Description: "移除侦听器（removeListener的快捷方式）",
			Prototype: "un(eventName,handler,[scope]) ",
            Name:"移除侦听器",
			Args: {
				_Return_: "void  ",
				eventName: "Boolean      侦听事件的类型",
				handler: "Boolean     事件涉及的方法",
				scope: "Boolean  （可选的） 处理函数的作用域(optional) "
			},
			Example: ""
		},
		updateBox: {
			Description: "对组件所在元素的测量矩形大小，然后根据此值设置组件的大小。 ",
			Prototype: "updateBox(box) ",
            Name:"更该组件大小",
			Args: {
				box: "Object 格式为{x,y,width,height}的对象。 ",
				_Return_: "this "
			},
			Example: ""
		},
        update:{
            Description: "刷新组件的内部区域 ",
            Prototype: "update(htmlOrData)",
            Name:"刷新组件的内部区域",
            Args: {
                htmlOrData: "String/Object 如果已经通过tpl为当前组件配置了一个模板,那么将会使用此参数来装配模板. 如果没有为当前组件配置模板,组件的内容区域将会通过 Ext.Element 进行刷新",
                _Return_: "this "
            },
            Example: ""
        }
	}
};
ControlsDataManage._add(Data_Control);

///容器类  基于Ext.Container  继承Ext.BoxComponent （Control）
var Data_vmdContainer = {
	BaseType: "Control",
	Type: "Container",
	Property: {
		activeItem: {
			Description: "组件id的字符串，或组件的索引，用于在容器布局渲染时候的设置为活动",
			Prototype: "String/Number  activeItem",
            Name:"活动项索引",
			Args: {
				_Return_: "String/Number "
			},
			Example: "activeItem: 'item-1'或activeItem: 0 index 0 = 容器集合中的第一项）。"
		},
		autoDestroy: {
			Description: "若为true容器会自动销毁容器下面全部的组件，否则的话必须手动执行销毁过程（默认为true）。",
			Prototype: "Boolean  autoDestroy  ",
            Name:"自动销毁子组件",
			Args: {
				_Return_: "Boolean   "
			},
			Example: ""
		},
		// 新添加属性
		autoScroll: {
			Description: "True表示为在面板body元素上，设置overflow：'auto'和出现滚动条false表示为裁剪所有溢出的内容（默认为false）。",
			Prototype: "autoScroll : Boolean ",
            Name:"滚动条",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		// bufferResize: {
		// 	Description: "当设置为true（100毫秒）或输入一个毫秒数，为此容器所分配的布局会缓冲其计算的频率和缓冲组件的重新布局。如容器包含大量的子组件或这样重型容器，在频繁进行高开销的布局时，该项尤为有用。",
		// 	Prototype: "Boolean/Number  bufferResize",
		// 	Args: {
		// 		_Return_: "Boolean/Number"
		// 	},
		// 	Example: ""
		// },
		defaultType: {
			Description: " 容器的默认类型（默认为'panel'）",
			Prototype: " String defaultType ",
            Name:"容器类型",
			Args: {
				_Return_: " String "
			},
			Example: ""
		},

		defaults: {
			Description: " 应用在全体组件上的配置项对象，无论组件是由items指定，抑或是通过add、insert的方法加入，都可支持。",
			Prototype: " Object defaults ",
            Name:"配置对象",
			Args: {
				_Return_: " Object "
			},
			Example: " defaults: {bodyStyle:'padding:15px'}."
		},
		hideBorders: {
			Description: " True表示为隐藏容器下每个组件的边框，false表示保留组件现有的边框设置（默认为false）。 ",
			Prototype: "Boolean hideBorders ",
            Name:"隐藏边框",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		items: {
			Description: " 一个单独项，或子组件组成的数组，加入到此容器中",
			Prototype: " Mixed items ",
            Name:"子项",
			Args: {
				_Return_: " Mixed "
			},
			Example: ""
		},
		layout: {
			Description: "此容器所使用的布局类型。 当中有效的值可以是： accordion、 anchor、 border、 cavd、 column、 fit、 form和table。 针对所选择布局类型， 可指定layoutConfig进一步配置。 ",
			Prototype: " String layout ",
            Name:"布局类型",
			Args: {
				_Return_: " String "
			},
			Example: ""
		},
		layoutConfig: {
			Description: " 选定好layout布局后，其相应的配置属性就在这个对象上进行设置。（即与layout配置联合使用）有关不同类型布局有效的完整配置信息",
            Name:"布局配置",
			Args: {
				_Return_: " Object "
			},
			Example: ""
		},
		// monitorResize: {
		// 	Description: " Ture表示为自动监视window resize的事件，以处理接下来一切的事情，包括对视见区（viewport）当前大小的感知，一般情况该值由layout调控，而无须手动设置。 ",
		// 	Prototype: "Boolean monitorResize ",
		// 	Args: {
		// 		_Return_: "Boolean"
		// 	},
		// 	Example: ""
		// },
        anchor: {
            Description: "anchor属性为一组字符串，可以使用百分比或者是-数字来表示，水平相对值和垂直相对值(例如'100% 50%')。配置字符串使用空格隔开，此属性告知布局子项应该如何放置",
            Prototype: " String anchor ",
            Name:"百分比",
            Args: {
                _Return_: " String "
            },
            Example: ""
        },
        // scrollOffset: {
        //     Description: "",
        //     Prototype: " String anchor ",
        //     Name:"",
        //     Args: {
        //         _Return_: " String "
        //     },
        //     Example: ""
        // },
        split: {
            Description: "在此区域与其邻居之间显示5px宽的SplitBar并允许手动调整面板大小.",
            Prototype: " split : Boolean",
            Name:"分割栏",
            Args: {
                _Return_: " Boolean "
            },
            Example: ""
        },
        align: {
            Description: "控制子组件在容器中的对齐方式，hbox布局下为垂直对齐方式，vbox布局下为水平对齐方式",
            Prototype: " align : String",
            Name:"对齐方式",
            Args: {
                _Return_: " String "
            },
            Example: ""
        },
        flex: {
            Description: "此配置项将被应用到布局管理的容器的子项中. 每个含有flex属性的子项将会被根据当前子项的flex值与所有其他含flex值子项的值的和的相对比例进行伸缩('hbox'中横向,'vbox'中纵向). 任何'flex=0'或'flex=undefined'的子项将不被伸缩(即组件原始尺寸不会被修改).",
            Prototype: "flex : Number",
            Name:"收缩比例值",
            Args: {
                _Return_: " Number "
            },
            Example: ""
        },
        minHeight: {
            Description: "此区域的最小允许高度（以像素为单位）（默认为50）",
            Prototype: "minHeight : Number",
            Name:"最小高度",
            Args: {
                _Return_: " Number "
            },
            Example: ""
        },
        minWidth: {
            Description: "此区域的最小允许宽度（以像素为单位）（默认为50）",
            Prototype: "minWidth : Number",
            Name:"最小宽度",
            Args: {
                _Return_: " Number "
            },
            Example: ""
        },
        pack: {
            Description: "控制子组件在容器中的对齐方式，hbox布局下为水平对齐方式，vbox布局下为垂直对齐方式",
            Prototype: "pack : String",
            Name:"对齐方式",
            Args: {
                _Return_: "  "
            },
            Example: ""
        },
        collapseMode: {
            Description: "当split为true时，collapseMode设置为 “mini”时，区域的分割栏会在条形图的中心显示一个小的折叠按钮，设置为'standard'则没有",
            Prototype: "collapseMode：String",
            Name:"伸缩按钮",
            Args: {
                _Return_: " String "
            },
            Example: ""
        },
        margins: {
            Description: "包含空格分隔的数字边距值的字符串。与每个值关联的边的顺序与CSS处理边距值的方式相匹配",
            Prototype: "margins : Number",
            Name:"外边距",
            Args: {
                _Return_: " Number "
            },
            Example: ""
        },
        labelAlign : {
            Description: "有效值为'left','top' 和 'right' (默认为'left')。该属性级联于没有设定此属性的子容器",
            Prototype: "String",
            Name:"对齐方式",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        labelWidth : {
            Description: "标签的宽度。该属性级联于子容器",
            Prototype: "Number",
            Name:"标签宽度",
            Args: {
                _Return_: "Number"
            },
            Example: ""
        },
        labelPad : {
            Description: "字段标签的默认填充（以像素为单位）（默认为5）",
            Prototype: "labelPad : Number",
            Name:"标签内边距",
            Args: {
                _Return_: "Number"
            },
            Example: ""
        },
        labelSeparator: {
            Description: "要在每个fieldLabel的文本后显示的分隔 符。可以在各种级别配置此属性。优先顺序是：\n" +
            "\n" +
            "字段/组件级别\n" +
            "容器级别\n" +
            "布局级别（默认为冒号'：'）\n" +
            "要为此字段的标签不显示分隔符，请指定空字符串''。\n",
            Prototype: "labelSeparator：String ",
            Name:"分隔符",
            Args: {
                _Return_: "Number"
            },
            Example: ""
        }
	},
	Method: {
		add: {
			Description: "将组件添加到此Container",
			Prototype: "add(component) ",
			Name:"添加组件",
			Args: {
				component: "Object 欲加入的组件。",
				_Return_: "Ext.Component component 包含容器缺省配置值的组件（或配置项对象）。"
			},
			Example: "var myNewGrid = new Ext.grid.GridPanel({  \n" +
				"store: myStore,		\n " +
				"colModel: myColModel\n " +
				"});\n " +
				"myTabPanel.add(myNewGrid);\n " +
				"myTabPanel.setActiveTab(myNewGrid);"
		},

		// bubble: {
		// 	Description: "逐层上报（Bubbles up）组件/容器，上报过程中对组件执行指定的函数。函数的作用域（this）既可是参数传入或是当前组件(默认)函数的参数可经由args指定或当前组件提供， 如果函数在某一个层次上返回false，上升将会停止。",
		// 	Prototype: "bubble(Function fn,[Object scope],[Array args]) : Ext.Container ",
		// 	Args: {
		// 		fn: "Function 调用的函数。 ",
		// 		scope: "Object 函数的作用域（默认当前的点） ",
		// 		args: "Array 函数将会传入的参数（默认为当前组件）。 ",
		// 		_Return_: "Ext.Container this "
		// 	},
		// 	Example: ""
		// },
		// cascade: {
		// 	Description: "逐层下报（Cascades down）组件/容器（从它开始），下报过程中对组件执行指定的函数。函数的作用域（this）既可是参数传入或是当前组件（默认）函数的参数可经由args指定或当前组件提供， 如果函数在某一个层次上返回false，下降将会停止。",
		// 	Prototype: "cascade(Function fn,[Object scope],[Array args]) : Ext.Container ",
		// 	Args: {
		// 		fn: "Function 调用的函数。 ",
		// 		scope: "Object 函数的作用域（默认当前的点）。 ",
		// 		args: " Array 函数将会传入的参数（默认为当前组件）。 ",
		// 		_Return_: "Ext.Container this "
		// 	},
		// 	Example: ""
		// },
		doLayout: {
			Description: "重新计算容器的布局尺寸。当有新组件加入到已渲染容器或改变子组件的大小/位置之后，就需要执行此函数。",
			Prototype: "doLayout([shallow])",
            Name:"重新计算容器的布局尺寸",
			Args: {
				shallow: "Boolean True表示只是计算该组件的布局，而子组件则有需要才自动计算（默认为false每个子容器就调用doLayout）。 ",
				_Return_: "组件本身"
			},
			Example: ""
		},
		find: {
			Description: "按属性在任何级别查找此容器下的组件 ",
			Prototype: "find(prop,value)",
            Name:"按属性查找子组件",
			Args: {
				prop: "String 要查找组建的属性",
				value: " String 要查找组建的属性值",
				_Return_: "Array 查找到的组件的集合"
			},
			Example: ""
		},
		findBy: {
			Description: "在此容器之下由自定义的函数作搜索依据查找子组件。如函数返回true返回组件的结果。传入的函数会有(component,this container)的参数。",
			Prototype: "findBy(fun,[scope]) ",
            Name:"自定义查找子组件",
			Args: {
				fcn: "Function 调用的函数",
				scope: "Object  函数作用域，可选 ",
				_Return_: "Array 查找到的组件的集合"
			},
			Example: ""
		},
		findById: {
			Description: "在此容器之下由id查找任意层次的组件。",
			Prototype: "findById(id)",
            Name:"按id查找子组件",
			Args: {
				id: "String  要查找的id ",
				_Return_: "查找到的组件"
			},
			Example: ""
		},
		findByType: {
			Description: "根据xtype或class查找该容器下任意层次中某个组件。",
			Prototype: "findByType(xtype,[shallow])",
            Name:"根据xtype查找子组件",
			Args: {
				xtype: "String/Class 组件的xtype字符串，或直接就是组件的类本身。 ",
				shallow: "Boolean False表示xtype可兼容组件的父类（这里缺省的），或true就表示xtype压根就是这个组件，没有继承上的泛指。 ",
				_Return_: "Array 组件的集合"
			},
			Example: ""
		},
		get: {
			Description: "返回该容器下辖的某个组件（是items.get(key)的简写方式）。",
			Prototype: "get(key)",
            Name:"根据索引查找子组件",
			Args: {
				key: "String/Number 组件的索引或id。 ",
				_Return_: "组件对象"
			},
			Example: ""
		},
		getComponent: {
			Description: "由id或索引直接返回容器的子组件。",
			Prototype: "getComponent(comp) ",
            Name:"根据id或index查找子组件",
			Args: {
				comp: "String / Number 子组件的id或index。 ",
				_Return_: "子组件 "
			},
			Example: ""
		},
		getLayout: {
			Description: "返回容器在使用的布局。如没设置，会创建默认的Ext.layout.ContainerLayout作为容器的布局。 ",
			Prototype: "getLayout()",
            Name:"获取布局方式",
			Args: {
				_Return_: "容器的布局。 "
			},
			Example: ""
		},
		// getLayoutTarget: {
		// 	Description: " Returns the Element to be used to contain the child Components of this Container.",
		// 	Prototype: "getLayoutTarget() : Ext.Element ",
		// 	Args: {
		// 		_Return_: "Ext.Element The Element to render child Components into. "
		// 	},
		// 	Example: ""
		// },
		insert: {
			Description: "把插件(Component)插入到容器指定的位置（按索引）。执行插入之前触发beforeadd事件，插入完毕触发add事件。 ",
			Prototype: "insert(index,component)  ",
            Name:"插入子组件",
			Args: {
				index: " Number 组件插入到容器collection集合的索引。 ",
				component: "欲加入的组件。",
				_Return_: "包含容器缺省配置值的组件（或配置项对象）。"
			},
			Example: ""
		},
		remove: {
			Description: "从此容器中移除某个组件。执行之前触发beforeremove事件，移除完毕后触发remove事件。 ",
			Prototype: "remove(component,[autoDestroy]) ",
            Name:"移除子组件",
			Args: {
				component: " Component/String 组件的引用或其id。 ",
				autoDestroy: "Boolean True表示为自动执行组件Ext.Componentdestroy 的函数。 ",
				_Return_: "Ext.Component component 被移除的Component对象。 "
			},
			Example: ""
		},
		removeAll: {
			Description: "从此容器中移除所有组件。 ",
			Prototype: "removeAll([autoDestroy])",
            Name:"移除所有子组件",
			Args: {
				autoDestroy: "Boolean True表示为自动执行组件Ext.Componentdestroy 的函数。 ",
				_Return_: "Array"
			},
			Example: ""
		}
	},
	Event: {
		
	}
};
ControlsDataManage._add(Data_vmdContainer);

var Data_vmdButton = {
	BaseType: "Control",
	Type: "vmdButton",
	Property: {
		text: {
			Description: "显示文本",
			Prototype: "string text",
            Name:"文本",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		disabled: {
            Description: "按钮是否可用",
            Prototype: "bool disabled",
            Name:"禁用",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        iconcls: {
            Description: "图标的样式类名称",
            Prototype: "String iconcls",
            Name:"图标样式类名",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
		hidden: {
			Description: "按钮是否隐藏",
			Prototype: "bool hidden",
            Name:"隐藏",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		id: {
			Description: "按钮标识",
			Prototype: "string id",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		style: {
			Description: "按钮样式",
			Prototype: "string style",
            Name:"内联样式",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		width: {
			Description: "按钮宽度",
			Prototype: "number width",
            Name:"宽度",
			Args: {
				_Return_: "数字"
			},
			Example: ""
		},
		size: {
			Description: "按钮尺寸",
			Prototype: "string size",
            Name:"尺寸",
			Args: {
				_Return_: "字符串（none,mini,small,large）"
			},
			Example: ""
		},
		type: {
			Description: "按钮类型",
			Prototype: "string type",
            Name:"类型",
			Args: {
				_Return_: "字符串（none,primary,success,warning,danger,info,text）"
			},
			Example: ""
		},
		icon: {
			Description: "按钮图标",
			Prototype: "string icon",
            Name:"图标",
			Args: {
				_Return_: "字符串（none,search,success,plus,picture,star-off,close,loading,setting）"
			},
			Example: ""
		},
		iconCls : {
			Description: "用来指定背景图片的样式类",
			Prototype: "string icon",
            Name:"图标样式类",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		}
	},
	Method: {
		getText: {
			Description: "获取按钮文本",
			Prototype: "getText()",
            Name:"获取按钮文本",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		setText: {
			Description: "设置按钮文本",
			Prototype: "setText(text)",
            Name:"设置按钮文本",
			Args: {
				_Return_: "",
				text: "String  文本值"
			},
			Example: ""
		},
		setIcon: {
			Description: "设置按钮图标",
			Prototype: "setIcon()",
            Name:"设置按钮图标",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		}
	},
	Event: {
		//click: {
		//    Description: "点击事件",
		//    Prototype: "void click(sender)",
		//    Args: {
		//        _Return_: "",
		//        sender: "控件本身"
		//    },
		//    Example: ""
		//},dbclick: {
		//    Description: "双击事件",
		//    Prototype: "void dbclick(sender)",
		//    Args: {
		//        _Return_: "",
		//        sender: "控件本身"
		//    },
		//    Example: ""
		//}
	}
};
ControlsDataManage._add(Data_vmdButton);

var Data_vmdComlist = {
	BaseType: "vmdCombo",
	Type: "vmdComlist",
	Property: {
		valueField: {
			Description: "值字段",
			Prototype: "string valueField",
            Name:"值字段",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		displayField: {
			Description: "显示字段",
			Prototype: "bool displayField",
            Name:"显示字段",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		readOnly: {
			Description: "只读",
			Prototype: "boolean readOnly",
            Name:"只读",
			Args: {
				_Return_: "布尔型"
			},
			Example: ""
		},
		store: {
			Description: "数据集",
			Prototype: "string store",
            Name:"数据集",
			Args: {
				_Return_: "数据集"
			},
			Example: ""
		},
		// 新添加属性
		forceSelection: {
			Description: "值为true时将限定选中的值为列表中的值，值为false则允许用户将任意文本设置到字段",
			Prototype: "boolean forceSelection",
			Args: {
				_Return_: "布尔值"
			},
			Example: ""
		},
		lazyRender: {
			Description: "值为true时阻止ComboBox渲染直到该对象被请求（默认为 false）",
			Prototype: "boolean lazyRender",
			Args: {
				_Return_: "布尔值"
			},
			Example: ""
		},
		listClass: {
			Description: "下拉列表元素应用的CSS类（默认为''）",
			Prototype: "String listClass",
            Name:"下拉列表样式类",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		selectedClass: {
            Description: "下拉列表中选中项应用的CSS类（默认为 'x-combo-selected'）",
            Prototype: "String selectedClass",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        firstSelected: {
            Description: "true时默认显示数据的第一项",
            Prototype: "boolean firstSelected",
            Name:"显示第一项",
            Args: {
                _Return_: "布尔值"
            },
            Example: ""
        },
        editable: {
            Description: "列表是否可编辑",
            Prototype: "boolean editable",
            Name:"可编辑",
            Args: {
                _Return_: "布尔型"
            },
            Example: ""
        },
        query: {
            Description: "是否可根据输入的文本在下拉列表项进行查询",
            Prototype: "boolean query",
            Name:"可查询",
            Args: {
                _Return_: "布尔型"
            },
            Example: ""
        },
        listWidth: {
            Description: "下拉列表列宽",
            Prototype: "number listWidth",
            Name:"列宽",
            Args: {
                _Return_: "number"
            },
            Example: ""
        },
        queryField: {
            Description: "当query为true时，查询的字段",
            Prototype: "string queryField",
            Name:"查询字段",
            Args: {
                _Return_: "string"
            },
            Example: ""
        },
        dropDownFields: {
            Description: "下拉框列表的显示字段",
            Prototype: "string dropDownFields",
            Name:"列表显示字段",
            Args: {
                _Return_: "string"
            },
            Example: ""
        },
	},
	Method: {
		getText: {
			Description: "获取显示文本",
			Prototype: "getText()",
            Name:"获取显示文本",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		setText: {
			Description: "设置文本",
			Prototype: "setText(text)",
            Name:"设置文本",
			Args: {
				_Return_: "",
				text: "文本值"
			},
			Example: ""
		},
		// 新添加方法
		getStore: {
			Description: "返回Combo关联的Store对象",
			Prototype: "getStore()",
            Name:"获取关联数据",
			Args: {
				_Return_: "Store对象"
			},
			Example: ""
		}
	},
	Event: {
		click: {
			Description: "点击事件",
			Prototype: "click(sender)",
            Name:"单击事件",
			Args: {
				_Return_: "",
				sender: "控件本身"
			},
			Example: ""
		},
		dbclick: {
			Description: "双击事件",
			Prototype: "dbclick(sender)",
            Name:"双击事件",
			Args: {
				_Return_: "",
				sender: "控件本身"
			},
			Example: ""
		}
	}
};
ControlsDataManage._add(Data_vmdComlist);

var Data_vmdCombo = {
    BaseType: "Control",
    Type: "vmdCombo",
    Property: {
        valueField: {
            Description: "值字段",
            Prototype: "string valueField",
            Name:"值字段",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        displayField: {
            Description: "显示字段",
            Prototype: "bool displayField",
            Name:"显示字段",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        readOnly: {
            Description: "只读",
            Prototype: "boolean readOnly",
            Name:"只读",
            Args: {
                _Return_: "布尔型"
            },
            Example: ""
        },
        store: {
            Description: "数据集",
            Prototype: "string store",
            Name:"数据集",
            Args: {
                _Return_: "数据集"
            },
            Example: ""
        },
        // 新添加属性
        forceSelection: {
            Description: "值为true时将限定选中的值为列表中的值，值为false则允许用户将任意文本设置到字段",
            Prototype: "boolean forceSelection",
            Args: {
                _Return_: "布尔值"
            },
            Example: ""
        },
        lazyRender: {
            Description: "值为true时阻止ComboBox渲染直到该对象被请求（默认为 false）",
            Prototype: "boolean lazyRender",
            Args: {
                _Return_: "布尔值"
            },
            Example: ""
        },
        listClass: {
            Description: "下拉列表元素应用的CSS类（默认为''）",
            Prototype: "String listClass",
            Name:"下拉列表样式类",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        selectedClass: {
            Description: "下拉列表中选中项应用的CSS类（默认为 'x-combo-selected'）",
            Prototype: "String selectedClass",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        firstSelected: {
            Description: "true时默认显示数据的第一项",
            Prototype: "boolean firstSelected",
            Name:"显示第一项",
            Args: {
                _Return_: "布尔值"
            },
            Example: ""
        }
    },
    Method: {
        getText: {
            Description: "获取显示文本",
            Prototype: "getText()",
            Name:"获取显示文本",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        setText: {
            Description: "设置文本",
            Prototype: "setText(text)",
            Name:"设置文本",
            Args: {
                _Return_: "",
                text: "文本值"
            },
            Example: ""
        },
        // 新添加方法
        getStore: {
            Description: "返回Combo关联的Store对象",
            Prototype: "getStore()",
            Name:"获取关联数据",
            Args: {
                _Return_: "Store对象"
            },
            Example: ""
        }
    },
    Event: {
        click: {
            Description: "点击事件",
            Prototype: "click(sender)",
            Name:"单击事件",
            Args: {
                _Return_: "",
                sender: "控件本身"
            },
            Example: ""
        },
        dbclick: {
            Description: "双击事件",
            Prototype: "dbclick(sender)",
            Name:"双击事件",
            Args: {
                _Return_: "",
                sender: "控件本身"
            },
            Example: ""
        }
    }
};
ControlsDataManage._add(Data_vmdCombo);

// var Data_vmdGrid = {
// 	BaseType: "Control",
// 	Type: "vmdGrid",
// 	Property: {
// 		dataStore: {
// 			Description: "数据集",
// 			Prototype: "string dataStore",
//             Name:"数据集",
// 			Args: {
// 				_Return_: "字符串"
// 			},
// 			Example: ""
// 		},
// 		colunms: {
// 			Description: "列信息",
// 			Prototype: "object colunms",
//             Name:"列信息",
// 			Args: {
// 				_Return_: "object"
// 			},
// 			Example: ""
// 		},
// 		readOnly: {
// 			Description: "只读",
// 			Prototype: "boolean readOnly",
//             Name:"只读",
// 			Args: {
// 				_Return_: "布尔型"
// 			},
// 			Example: ""
// 		},
// 		skin: {
// 			Description: "网格样式",
// 			Prototype: "string skin",
//             Name:"网格样式",
// 			Args: {
// 				_Return_: "string"
// 			},
// 			Example: ""
// 		}
// 	},
// 	Method: {
// 		cellById: {
// 			Description: "通过ID获取单元格",
// 			Prototype: "object cellById(number/string row_id,number col_ind)",
// 			Args: {
// 				_Return_: "object  cell对象",
// 				row_id: "number/string \r\n" +
// 					"   row id",
// 				col_ind: "number \r\n" +
// 					"   column index"
// 			},
// 			Example: "var cellObj = myGrid.cellById(row_id,col_ind);"
// 		},
// 		cellByIndex: {
// 			Description: "通过索引获取单元格",
// 			Prototype: "object cellByIndex(number row_ind,number col_ind)",
// 			Args: {
// 				_Return_: "object  cell对象",
// 				row_ind: "number \r\n" +
// 					"   row index",
// 				col_ind: "number \r\n" +
// 					"   column index"
// 			},
// 			Example: "var cellObj = myGrid.cellByIndex(row_ind,col_ind);"
// 		},
// 		cells: {
// 			Description: "获取单元格",
// 			Prototype: "object cells(number/string row_id,number col);",
// 			Args: {
// 				_Return_: "object  cell对象",
// 				row_id: "number/string \r\n" +
// 					"   row id",
// 				col: "number \r\n" +
// 					"   column index"
// 			},
// 			Example: "var cellObj = myGrid.cells(row_id,col);"
// 		},
// 		cells2: {
// 			Description: "获取单元格",
// 			Prototype: "object cells2(number row_index,number col);",
// 			Args: {
// 				_Return_: "object  cell对象",
// 				row_index: "number \r\n" +
// 					"   row index",
// 				col: "number \r\n" +
// 					"   column index"
// 			},
// 			Example: "var cellObj = myGrid.cells(row_id,col);"
// 		},
// 		checkAll: {
// 			Description: "checkbox列全选",
// 			Prototype: "void checkAll(boolean mode);",
// 			Args: {
// 				_Return_: "void",
// 				mode: "boolean \r\n" +
// 					"   {true/false} check"
// 			},
// 			Example: "//check all checkboxes in grid \r\n" +
// 				"myGrid.checkAll(true); \r\n" +
// 				"//uncheck all checkboxes in grid \r\n" +
// 				"myGrid.checkAll(false);"
// 		},
// 		clearAll: {
// 			Description: "清除所有行",
// 			Prototype: "void clearAll(boolean header);",
// 			Args: {
// 				_Return_: "void",
// 				header: "boolean \r\n" +
// 					"   enable/disable cleaning header"
// 			},
// 			Example: "//delete all rows from the grid" +
// 				"myGrid.clearAll(); \r\n" +
// 				"//delete all rows from the grid,clear header \r\n" +
// 				"myGrid.clearAll(true);"
// 		},
// 		clearSelection: {
// 			Description: "移除选中行",
// 			Prototype: "void clearSelection();",
// 			Args: {
// 				_Return_: "void"
// 			},
// 			Example: "myGrid.clearSelection();"
// 		},
// 		deleteColumn: {
// 			Description: "移除列",
// 			Prototype: "void deleteColumn(number ind);",
// 			Args: {
// 				_Return_: "void",
// 				ind: "number \r\n" +
// 					"   index of column"
// 			},
// 			Example: "//delete first column \r\n" +
// 				"   myGrid.deleteColumn(0);"
// 		},
// 		deleteRow: {
// 			Description: "移除行",
// 			Prototype: "void deleteRow(number/string row_id);",
// 			Args: {
// 				_Return_: "void",
// 				row_id: "number/string \r\n" +
// 					"   row ID"
// 			},
// 			Example: "//delete row with id 'row1' \r\n" +
// 				"   myGrid.deleteRow('row1');"
// 		},
// 		deleteSelectedRows: {
// 			Description: "移除选中行",
// 			Prototype: "void deleteSelectedRows();",
// 			Args: {
// 				_Return_: "void"
// 			},
// 			Example: "myGrid.deleteSelectedRows();"
// 		},
// 		editCell: {
// 			Description: "编辑单元格",
// 			Prototype: "void editCell();",
// 			Args: {
// 				_Return_: "void"
// 			},
// 			Example: "myGrid.selectCell(rowIndex,cellIndex); \r\n" +
// 				"   myGrid.editCell();"
// 		},
// 		editStop: {
// 			Description: "结束编辑单元格",
// 			Prototype: "void editStop(boolean ode);",
// 			Args: {
// 				_Return_: "void",
// 				ode: "boolean \r\n" +
// 					"   if true - current edit value will be reverted to the previous one"
// 			},
// 			Example: "//close opened editor and return value from editor to the cell \r\n" +
// 				"myGrid.editStop(); \r\n" +
// 				"//close opened editor and revert cell value to the previous one \r\n" +
// 				"myGrid.editStop(true);"
// 		},
// 		editStop: {
// 			findCell: "查找单元格",
// 			Prototype: "void findCell(string value,number c_ind,boolean first);",
// 			Args: {
// 				_Return_: "object  cell对象",
// 				value: "string \r\n" +
// 					"   search string",
// 				c_ind: "number \r\n" +
// 					"   index of the column to search in (optional,if not specified,search everywhere)",
// 				first: "boolean \r\n" +
// 					"   find only the first occurence (optional,false by default)"
// 			},
// 			Example: "//search 'alf' value in all grid cells \r\n" +
// 				"var searchResult=myGrid.findCell('alf'); \r\n" +
// 				"//search 'alf' value at the second column,find only the first occurence \r\n" +
// 				"var searchResult=myGrid.findCell('alf',1,true);"
// 		},
// 		getAllRowIds: {
// 			findCell: "获取所有行id",
// 			Prototype: "string getAllRowIds(string separator);",
// 			Args: {
// 				_Return_: "string   ",
// 				separator: "string \r\n" +
// 					"   delimiter to be used in the list (optional,comma by default)"
// 			},
// 			Example: "//return the list of row ids with comma delimiter \r\n" +
// 				"var ids=myGrid.getAllRowIds(); \r\n" +
// 				"//return the list of row ids with dot delimiter \r\n" +
// 				"var ids=myGrid.getAllRowIds('.');"
// 		},
// 		getChangedRows: {
// 			findCell: "获取值改变的行",
// 			Prototype: "string getChangedRows(boolean nd_added);",
// 			Args: {
// 				_Return_: "string   ",
// 				nd_added: "boolean \r\n" +
// 					"   the list of IDs of the changed rows)"
// 			},
// 			Example: "//get the list of changed rows \r\n" +
// 				"var ids = myGrid.getChangedRows(); \r\n" +
// 				"//get the list of changed rows including added rows \r\n" +
// 				"var ids = myGrid.getChangedRows(true);"
// 		},
// 		getCheckedRows: {
// 			findCell: "获取checkbox列选中的行",
// 			Prototype: "string getCheckedRows(number col_ind);",
// 			Args: {
// 				_Return_: "string   \r\n" +
// 					"   the list of ids of all the rows with checked exCell in the specified column",
// 				col_ind: "number \r\n" +
// 					"   column index"
// 			},
// 			Example: "//get the list of ids of checked rows from the first column \r\n" +
// 				"var checked=myGrid.getCheckedRows(0); "
// 		},
// 		getColIndexById: {
// 			findCell: "获取列索引",
// 			Prototype: "number getColIndexById(number id);",
// 			Args: {
// 				_Return_: "number   \r\n" +
// 					"   the index of a column",
// 				id: "number \r\n" +
// 					"   column id"
// 			},
// 			Example: "//get index of the column with id 'col1' \r\n" +
// 				"var colIndex=myGrid.getColIndexById('col1'); "
// 		},
// 		getColLabel: {
// 			findCell: "获取列标题",
// 			Prototype: "string getColLabel(number cin,number ind);",
// 			Args: {
// 				_Return_: "string   \r\n" +
// 					"   the label of the column specified by index",
// 				cin: "number \r\n" +
// 					"   column index",
// 				ind: "number \r\n" +
// 					"   header row index (optional,0 by default,makes sense only for a multiline header)"
// 			},
// 			Example: "//get label of the first column \r\n" +
// 				"var colLabel=myGrid.getColLabel(0); \r\n" +
// 				"//get label of the second line of the first column \r\n" +
// 				"var colLabel=myGrid.getColLabel(0,1); "
// 		},
// 		getColumnId: {
// 			findCell: "获取列id",
// 			Prototype: "mixed getColumnId(number cin);",
// 			Args: {
// 				_Return_: "mixed    \r\n" +
// 					"   the id of the column specified by index",
// 				cin: "number \r\n" +
// 					"   column index"
// 			},
// 			Example: "//get id of the first column  \r\n" +
// 				"var colId=myGrid.getColumnId(0);  "
// 		},
// 		getRowId: {
// 			findCell: "获取列id",
// 			Prototype: "mixed getRowId(number ind);",
// 			Args: {
// 				_Return_: "mixed    \r\n" +
// 					"   the id of the row",
// 				ind: "number \r\n" +
// 					"   row index"
// 			},
// 			Example: "//get ID of the first row  \r\n" +
// 				"var rowID=myGrid.getRowId(0); "
// 		},
// 		getRowIndex: {
// 			findCell: "获取行索引",
// 			Prototype: "number getRowIndex(mixed row_id);",
// 			Args: {
// 				_Return_: "number    \r\n" +
// 					"   the row index",
// 				row_id: "mixed \r\n" +
// 					"   row id"
// 			},
// 			Example: "//get the index of the row with the id 'row1'  \r\n" +
// 				"var rowIndex=myGrid.getRowIndex('row1'); "
// 		},
// 		getRowsNum: {
// 			findCell: "获取行数",
// 			Prototype: "number getRowsNum();",
// 			Args: {
// 				_Return_: "number    \r\n" +
// 					"   the number of rows in the grid"
// 			},
// 			Example: "var count=myGrid.getRowsNum(); "
// 		},
// 		getSelectedCellIndex: {
// 			findCell: "获取单元格的索引",
// 			Prototype: "number getSelectedCellIndex();",
// 			Args: {
// 				_Return_: "number    \r\n" +
// 					"   the index of the selected cell or -1"
// 			},
// 			Example: "var ind=myGrid.getSelectedCellIndex();"
// 		},
// 		getSelectedCellIndex: {
// 			findCell: "获取单元格的索引",
// 			Prototype: "number getSelectedCellIndex();",
// 			Args: {
// 				_Return_: "number    \r\n" +
// 					"   the index of the selected cell or -1"
// 			},
// 			Example: "var ind=myGrid.getSelectedCellIndex();"
// 		},
// 		getSelectedRowId: {
// 			findCell: "获取选中行rowid",
// 			Prototype: "mixed getSelectedRowId();",
// 			Args: {
// 				_Return_: "mixed    \r\n" +
// 					"   the id of the selected row"
// 			},
// 			Example: "var selectedId=myGrid.getSelectedRowId();"
// 		},
// 		init: {
// 			findCell: "网格初始化",
// 			Prototype: "void init();",
// 			Args: {
// 				_Return_: "void   "
// 			},
// 			Example: "myGrid.init();"
// 		},
// 		lockRow: {
// 			findCell: "锁定行",
// 			Prototype: "void lockRow(mixed rowId,boolean mode);",
// 			Args: {
// 				_Return_: "void ",
// 				rowId: "mixed \r\n" +
// 					"   id of a row",
// 				mode: "boolean \r\n" +
// 					"   true/false to lock/unlock"
// 			},
// 			Example: "//lock row with id 'row1' for editing \r\n" +
// 				"myGrid.lockRow('row1',true); \r\n" +
// 				"//unlock row with id 'row1' for editing  \r\n" +
// 				"myGrid.lockRow('row1',false); "
// 		},
// 		selectAll: {
// 			findCell: "全选",
// 			Prototype: "void selectAll();",
// 			Args: {
// 				_Return_: "void "
// 			},
// 			Example: "myGrid.selectAll();"
// 		},
// 		setColSorting: {
// 			findCell: "设置列的排序方式",
// 			Prototype: "void setColSorting(string sortStr);",
// 			Args: {
// 				_Return_: "void ",
// 				sortStr: "string \r\n" +
// 					"   a list of sort codes with the default delimiter"
// 			},
// 			Example: "mygrid.setColSorting('int,str,date,na,sortingFunction')"
// 		},
// 		setColWidth: {
// 			findCell: "设置列宽",
// 			Prototype: "void setColWidth(number ind,string value);",
// 			Args: {
// 				_Return_: "void ",
// 				ind: "number \r\n" +
// 					"   the index of a column",
// 				value: "string \r\n" +
// 					"   a new width value"
// 			},
// 			Example: "//set width of the first column \r\n" +
// 				"mygrid.setColWidth(0,'150');"
// 		},
// 		setColumnColor: {
// 			findCell: "设置列颜色",
// 			Prototype: "void setColumnColor(string clr);",
// 			Args: {
// 				_Return_: "void ",
// 				clr: "string \r\n" +
// 					"  a comma-delimited list of colors"
// 			},
// 			Example: "//set colors for the first 3 columns \r\n" +
// 				"mygrid.setColumnColor('white,#d5f1ff,#d5f1ff');"
// 		},
// 		setColumnId: {
// 			findCell: "设置列id",
// 			Prototype: "void setColumnId(number ind,mixed id);",
// 			Args: {
// 				_Return_: "void ",
// 				ind: "number \r\n" +
// 					"  the index of a column",
// 				id: "mixed \r\n" +
// 					"  the id to set for a column"
// 			},
// 			Example: "//set id for the first column \r\n" +
// 				"mygrid.setColumnId(0,‘column1’);"
// 		},
// 		setColumnIds: {
// 			findCell: "设置所有列id",
// 			Prototype: "void setColumnIds(string ids);",
// 			Args: {
// 				_Return_: "void ",
// 				ids: "string \r\n" +
// 					"  a comma-delimited list of ids or an empty one,if the values to use have been set earlier"
// 			},
// 			Example: "mygrid.setColumnIds('sales,book,author,price,store,shipping,best,date');"
// 		},
// 		setHeader: {
// 			findCell: "设置标题",
// 			Prototype: "void setHeader(string hdrStr,string splitSign,array styles);",
// 			Args: {
// 				_Return_: "void ",
// 				hdrStr: "string \r\n" +
// 					"  a header string with delimiters",
// 				splitSign: "string \r\n" +
// 					"  a string used as a split marker,optional. Default is '#cspan'",
// 				styles: "array \r\n" +
// 					"  an array of header styles"
// 			},
// 			Example: "//setting columns' labels  \r\n" +
// 				"mygrid.setHeader('A,B,C'); \r\n" +
// 				"//setting columns' labels and their styles \r\n" +
// 				"mygrid.setHeader(\r\n" +
// 				"    'A,B,C',\r\n" +
// 				"    null,\r\n" +
// 				"    ['text-align:right;','text-align:left;','text-align:center'] \r\n" +
// 				");"
// 		},
// 		setRowColor: {
// 			findCell: "设置行颜色",
// 			Prototype: "void setRowColor(mixed row_id,string color);",
// 			Args: {
// 				_Return_: "void ",
// 				row_id: "mixed \r\n" +
// 					"  the id of a row",
// 				color: "string \r\n" +
// 					"  a color value"
// 			},
// 			Example: "mygrid.setRowColor('row1','red');"
// 		},
// 		setRowHidden: {
// 			findCell: "设置行隐藏",
// 			Prototype: "void setRowHidden(mixed id,boolean state);",
// 			Args: {
// 				_Return_: "void ",
// 				id: "mixed \r\n" +
// 					"  the id of a row",
// 				state: "boolean \r\n" +
// 					"  true/false to hide/show a row"
// 			},
// 			Example: "//hide row with the id 'row1'  \r\n" +
// 				"mygrid.setRowHidden('row1',true); \r\n" +
// 				"//show row with the id 'row1' \r\n" +
// 				"mygrid.setRowHidden('row1',false);"
// 		}
// 	},
// 	Event: {
//
// 	}
// };
// ControlsDataManage._add(Data_vmdGrid);
//
// /////////////////////////////////////////////////////////////////////////////////////////
// //树
// /////////////////////////////////////////////////////////////////////////////////////////
// var Data_vmdTreeview = {
// 	BaseType: "Control",
// 	Type: "vmdTreeview",
// 	Property: {
// 		disabled: {
// 			Description: "是否可用",
// 			Prototype: "bool disabled",
//             Name:"是否可用",
// 			Args: {
// 				_Return_: "字符串"
// 			},
// 			Example: ""
// 		},
// 		id: {
// 			Description: "标识",
// 			Prototype: "string id",
// 			Args: {
// 				_Return_: "字符串"
// 			},
// 			Example: ""
// 		},
// 		style: {
// 			Description: "样式",
// 			Prototype: "string style",
//             Name:"内联样式",
// 			Args: {
// 				_Return_: "字符串"
// 			},
// 			Example: ""
// 		},
// 		width: {
// 			Description: "宽度",
// 			Prototype: "number width",
//             Name:"宽度",
// 			Args: {
// 				_Return_: "数字"
// 			},
// 			Example: ""
// 		},
// 		height: {
// 			Description: "高度",
// 			Prototype: "number height",
//             Name:"高度",
// 			Args: {
// 				_Return_: "数字"
// 			},
// 			Example: ""
// 		},
// 		checkBox: {
//             Description: "是否显示复选框",
//             Prototype: "bool CheckBox",
//             Name:"复选框",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         CheckBox: {
//             Description: "是否显示复选框",
//             Prototype: "bool CheckBox",
//             Name:"复选框",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
// 		dataStore: {
// 			Description: "绑定数据集",
// 			Prototype: "string dataStore",
//             Name:"数据集",
// 			Args: {
// 				_Return_: "字符串"
// 			},
// 			Example: ""
// 		},
// 		childNode: {
//             Description: "子节点字段",
//             Prototype: "string childNode",
//             Name:"子节点",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         childField: {
//             Description: "子节点字段",
//             Prototype: "string childField",
//             Name:"子节点",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         parentField: {
//             Description: "父节点值，例如id",
//             Prototype: "string parentField",
//             Name:"父节点",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
// 		rootValue: {
// 			Description: "根节点值，例如id",
// 			Prototype: "string rootValue",
//             Name:"根节点值",
// 			Args: {
// 				_Return_: "字符串"
// 			},
// 			Example: ""
// 		},
//         RootValue: {
//             Description: "根节点值，例如id",
//             Prototype: "string RootValue",
//             Name:"根节点值",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         rootText: {
//             Description: "根节点的显示文本",
//             Prototype: "string rootValue",
//             Name:"根节点文本",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         textField: {
// 			Description: "树节点上显示的文本",
// 			Prototype: "string textField",
//             Name:"显示文本",
// 			Args: {
// 				_Return_: "字符串"
// 			},
// 			Example: ""
// 		},
//         valueField: {
// 			Description: "树节点的值字段，例如id",
// 			Prototype: "string valueField",
//             Name:"值",
// 			Args: {
// 				_Return_: "字符串"
// 			},
// 			Example: ""
// 		},
//         loadType: {
//             Description: "加载方式",
//             Prototype: "string loadType",
//             Name:"加载方式",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         LodeType: {
//             Description: "加载方式",
//             Prototype: "string LodeType",
//             Name:"加载方式",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         hideRoot: {
//             Description: "隐藏根节点，不显示",
//             Prototype: "Boolean loadType",
//             Name:"隐藏根节点",
//             Args: {
//                 _Return_: "Boolean"
//             },
//             Example: ""
//         },
//         checkBoxFiled: {
//             Description: "当checkBox为ture时，设置复选框选中的字段",
//             Prototype: "string checkBoxFiled",
//             Name:"选中字段",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         checkedValue: {
//             Description: "当checkBox为ture时，设置复选框选中的字段的值",
//             Prototype: "string checkedValue",
//             Name:"选中值",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         queryVar: {
//             Description: "分级加载时的查询字段",
//             Prototype: "string queryVar",
//             Name:"查询字段",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         contentMenu: {
//             Description: "节点上的右键菜单",
//             Prototype: "string queryVar",
//             Name:"右键菜单",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         rootImg: {
//             Description: "根节点的图标源文件地址",
//             Prototype: "string rootImg",
//             Name:"根节点图标",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         folderImg: {
//             Description: "分类节点的图标源文件地址",
//             Prototype: "string folderImg",
//             Name:"分类节点图标",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         leafImg: {
//             Description: "叶子节点（没有子节点的节点）的图标源文件地址",
//             Prototype: "string leafImg",
//             Name:"叶子节点图标",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         nodeMarkFiled: {
//             Description: "节点图标类型关联的字段",
//             Prototype: "string nodeMarkFiled",
//             Name:"图标关联字段",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         folderValue: {
//             Description: "分类节点图标类型关联的字段的值",
//             Prototype: "string folderValue",
//             Name:"分类节点图标值",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         leafValue: {
//             Description: "叶子节点图标类型关联的字段的值",
//             Prototype: "string leafValue",
//             Name:"叶子节点图标值",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         },
//         skin: {
//             Description: "树的皮肤样式",
//             Prototype: "string leafValue",
//             Name:"皮肤",
//             Args: {
//                 _Return_: "字符串"
//             },
//             Example: ""
//         }
//
// 	},
// 	Method: {
// 		addItem: {
// 			Description: "添加节点",
// 			Prototype: "void  addItem(string/number id,string text,string/number parentId,[number index])",
//             Name:"添加节点",
// 			Args: {
// 				_Return_: "void  ",
// 				id: "string/number \r\n" +
// 					"   the item's id",
// 				text: "string \r\n" +
// 					"   the item's text",
// 				parentId: "string/number \r\n" +
// 					"   the parent's id",
// 				index: "number \r\n" +
// 					"   the item's index"
// 			},
// 			Example: 'myTreeView.addItem("2","Turned at Dark","1"); '
// 		},
// 		attachEvent: {
// 			Description: "添加事件",
// 			Prototype: "number attachEvent(string name,function handler);",
//             Name:"添加事件",
// 			Args: {
// 				_Return_: "",
// 				name: "String \r\n" +
// 					" 方法名",
// 				handler: "function \r\n" +
// 					" 方法"
// 			},
// 			Example: 'var evId = myComponent.attachEvent("eventName",function(){ \r\n' +
// 				'}); \r\n' +
// 				'myComponent.detachEvent(evId);'
// 		},
// 		checkItem: {
// 			Description: "设置选中节点",
// 			Prototype: "void checkItem(string/number id);",
//             Name:"设置选中节点",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number \r\n" +
// 					"节点id"
// 			},
// 			Example: 'myTreeView.checkItem("1");'
// 		},
// 		clearAll: {
// 			Description: "删除所有树节点",
// 			Prototype: "void clearAll();",
//             Name:"删除所有树节点",
// 			Args: {
// 				_Return_: "void"
// 			},
// 			Example: "myTreeView.clearAll();"
// 		},
// 		closeItem: {
// 			Description: "折叠节点",
// 			Prototype: "void closeItem(string/number id);",
//             Name:"折叠节点",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'myTreeView.closeItem("3");'
// 		},
// 		deleteItem: {
// 			Description: "删除节点",
// 			Prototype: "void deleteItem(string/number id);",
//             Name:"删除节点",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'myTreeView.deleteItem("3");'
// 		},
// 		detachEvent: {
// 			Description: "卸载事件",
// 			Prototype: "void detachEvent(int id);",
//             Name:"卸载事件",
// 			Args: {
// 				_Return_: "void",
// 				id: "int \r\n" +
// 					"   internal event id,returned by attachEvent()"
// 			},
// 			Example: 'var evId = myComponent.attachEvent("eventName",function(){ \r\n' +
// 				'}); \r\n' +
// 				'myComponent.detachEvent(evId);'
// 		},
// 		disableCheckbox: {
// 			Description: "禁用指定节点复选框",
// 			Prototype: "void disableCheckbox(string/number id);",
//             Name:"禁用指定节点复选框",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number \r\n" +
// 					"   复选框节点id"
// 			},
// 			Example: 'myTreeView.disableCheckbox(id);'
// 		},
// 		enableCheckbox: {
// 			Description: "启用指定节点复选框",
// 			Prototype: "void enableCheckbox(string/number id);",
//             Name:"启用指定节点复选框",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number \r\n" +
// 					"   复选框节点id"
// 			},
// 			Example: 'myTreeView.enableCheckbox(id);'
// 		},
// 		enableCheckboxes: {
// 			Description: "设置复选框是否可用",
// 			Prototype: "void enableCheckboxes(boolean mode);",
//             Name:"设置复选框是否可用",
// 			Args: {
// 				_Return_: "void",
// 				mode: "boolean \r\n" +
// 					"   true/false"
// 			},
// 			Example: 'myTreeView.enableCheckboxes(true);'
// 		},
// 		enableContextMenu: {
// 			Description: "设置右键菜单是否可用",
// 			Prototype: "void enableContextMenu(boolean mode);",
//             Name:"设置右键菜单是否可用",
// 			Args: {
// 				_Return_: "void",
// 				mode: "boolean \r\n" +
// 					"   true/false，true to enable context menu,false to disable it"
// 			},
// 			Example: 'var myTreeView = new dhtmlXTreeView("parentId"); \r\n' +
// 				'myTreeView.enableContextMenu(true); \r\n' +
// 				'var myContextMenu = new dhtmlXMenuObject({  \r\n' +
// 				'context: true // render it as context menu  \r\n' +
// 				'}); \r\n' +
// 				'myTreeView.attachEvent("onContextMenu",function(id,x,y,ev){  \r\n' +
// 				'myContextMenu.showContextMenu(x,y);  \r\n' +
// 				'myTreeView.selectItem(id); \r\n' +
// 				'return false;  \r\n' +
// 				'});  '
// 		},
// 		enableDragAndDrop: {
// 			Description: "是否允许拖动节点",
// 			Prototype: "void enableDragAndDrop(boolean mode);",
//             Name:"是否允许拖动节点",
// 			Args: {
// 				_Return_: "void",
// 				mode: "boolean \r\n" +
// 					"   true/false to enable/disable drag-n-drop"
// 			},
// 			Example: 'myTreeView.enableDragAndDrop(true);'
// 		},
// 		enableMultiselect: {
// 			Description: "是否允许多选",
// 			Prototype: "void enableMultiselect(boolean mode);",
//             Name:"是否允许多选",
// 			Args: {
// 				_Return_: "void",
// 				mode: "boolean \r\n" +
// 					"   true/false to enable/disable multiple selection of items"
// 			},
// 			Example: 'myTreeView.enableMultiselect(true);'
// 		},
// 		getAllChecked: {
// 			Description: "获取所有选中的节点id",
// 			Prototype: "array getAllChecked();",
//             Name:"获取所有选中的节点id",
// 			Args: {
// 				_Return_: "array  所有选中节点id的数组队列"
// 			},
// 			Example: 'myTreeView.getAllChecked();'
// 		},
// 		getAllUnchecked: {
// 			Description: "获取所有未选中的节点id",
// 			Prototype: "array getAllUnchecked();",
//             Name:"获取所有未选中的节点id",
// 			Args: {
// 				_Return_: "array  所有未选中节点id的数组队列"
// 			},
// 			Example: 'myTreeView.getAllUnchecked();'
// 		},
// 		getItemText: {
// 			Description: "获取指定节点的显示文本",
// 			Prototype: "string getItemText(string/number id);",
//             Name:"获取显示文本",
// 			Args: {
// 				_Return_: "string   节点文本",
// 				id: "string/number \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'var text = myTreeView.getItemText(id);'
// 		},
// 		getParentId: {
// 			Description: "获取指定节点的父节点id",
// 			Prototype: "string/number getParentId(string/number id);",
//             Name:"获取父节点id",
// 			Args: {
// 				_Return_: "string/number   父节点id",
// 				id: "string/number \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'var parentId = myTreeView.getParentId(id);'
// 		},
// 		getSelectedId: {
// 			Description: "获取选中的节点id",
// 			Prototype: "string/number getSelectedId();",
//             Name:"获取选中的节点id",
// 			Args: {
// 				_Return_: "string/number   选中节点的id（如果启用多选，返回的为数组array）"
// 			},
// 			Example: 'var id = myTreeView.getSelectedId();'
// 		},
// 		getSubItems: {
// 			Description: "获取指定节点的所有子节点",
// 			Prototype: "array getSubItems(string/number id);",
//             Name:"获取所有子节点",
// 			Args: {
// 				_Return_: "array   选中节点的所有子节点数组array"
// 			},
// 			Example: 'myTreeView.getSubItems(id);'
// 		},
// 		// getUserData: {
// 		// 	Description: "获取指定节点的所有子节点",
// 		// 	Prototype: "string/number/boolean getUserData(string/number id,string name);",
// 		// 	Args: {
// 		// 		_Return_: "string/number/boolean   user data from the target item",
// 		// 		id: "string/number \r\n" +
// 		// 			"   the target item's id",
// 		// 		id: "string \r\n" +
// 		// 			"   the key for user data"
// 		// 	},
// 		// 	Example: 'var type = myTreeView.getUserData(id,"type");'
// 		// },
// 		hideCheckbox: {
// 			Description: "隐藏复选框",
// 			Prototype: "void hideCheckbox(string/number id);",
//             Name:"隐藏复选框",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'myTreeView.hideCheckbox(id);'
// 		},
// 		isCheckboxEnabled: {
// 			Description: "指定节点是否启用了复选框",
// 			Prototype: "isCheckboxEnabled(id);",
//             Name:"是否启用了复选框",
// 			Args: {
// 				_Return_: "boolean  true,if the checkbox is enabled",
// 				id: "string/number \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'var isEnabled = myTreeView.isCheckboxEnabled(id);'
// 		},
// 		isCheckboxVisible: {
// 			Description: "指定节点是否显示复选框",
// 			Prototype: "isCheckboxVisible(id);",
//             Name:"是否显示复选框",
// 			Args: {
// 				_Return_: "boolean  true,if the checkbox is visible",
// 				id: "string/number \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'var isVisible  = myTreeView.isCheckboxVisible(id);'
// 		},
// 		isItemChecked: {
// 			Description: "指定节点的复选框是否选中",
// 			Prototype: "isItemChecked(id);",
//             Name:"复选框是否选中",
// 			Args: {
// 				_Return_: "boolean  true,if the checkbox is checked",
// 				id: "string/number \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'var isChecked = myTreeView.isItemChecked(id);'
// 		},
// 		// loadStruct: {
// 		// 	Description: "loads data to the component via xml or json,usually component config",
// 		// 	Prototype: "void loadStruct(mixed data,function doOnLoad);",
// 		// 	Args: {
// 		// 		_Return_: "void",
// 		// 		data: "mixed  xml/json url/string/object\r\n" +
// 		// 			"   节点id",
// 		// 		doOnLoad: "function  (optional) calls user-defined handler after data is loaded and rendered \r\n" +
// 		// 			"   方法"
// 		// 	},
// 		// 	Example: 'var myComponent = new dhtmlXComponent(); \r\n' +
// 		// 		'myComponent.loadStruct({data:[{id:"a1",..},{id:"a2",..}]}); \r\n' +
// 		// 		'myComponent.loadStruct(' + '< data > < node id = "a1".../></data >' + '); \r\n' +
// 		// 		'myComponent.loadStruct("server/data.xml"); \r\n' +
// 		// 		'myComponent.loadStruct({data:[{id:"a1",..},{id:"a2",..}]},function(){ \r\n' +
// 		// 		'}); \r\n' +
// 		// 		'myComponent.loadStruct(' + '< data > < node id = "a1".../></data > ' + ',function(){ \r\n' +
// 		// 		'}); \r\n' +
// 		// 		'myComponent.loadStruct("server/data.xml",function(){ \r\n' +
// 		// 		'}); '
// 		// },
// 		openItem: {
// 			Description: "展开指定节点",
// 			Prototype: " openItem(id);",
//             Name:"展开节点",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'myTreeView.openItem("1");'
// 		},
// 		selectItem: {
// 			Description: "设置选中节点",
// 			Prototype: "selectItem(id);",
//             Name:"设置选中节点",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number   如果设置多个节点选中，需要设置为多选并传array数组\r\n" +
// 					"   节点id"
// 			},
// 			Example: 'myTreeView.selectItem("2"); \r\n' +
// 				'myTreeView.selectItem(["2","3","5"]);'
// 		},
// 		setIconColor: {
// 			Description: "设置节点的图标颜色",
// 			Prototype: "setIconColorid,color);",
//             Name:"设置节点图标颜色",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number  \r\n" +
// 					"   节点id",
// 				color: "string  \r\n" +
// 					"   色值"
// 			},
// 			Example: 'myTreeView.setIconColor("2","#abcdef");'
// 		},
// 		// setIconset: {
// 		// 	Description: "enables the font-awesome iconset",
// 		// 	Prototype: "void setIconset(string name);",
// 		// 	Args: {
// 		// 		_Return_: "void",
// 		// 		name: "string  \r\n" +
// 		// 			"   'font_awesome'"
// 		// 	},
// 		// 	Example: 'myTreeView.setIconset("font_awesome");'
// 		// },
// 		// setItemIcons: {
// 		// 	Description: "sets custom icons for an item",
// 		// 	Prototype: "void setItemIcons(string/number id,object icons);",
// 		// 	Args: {
// 		// 		_Return_: "void",
// 		// 		id: "string  \r\n" +
// 		// 			"   节点id",
// 		// 		icons: "object  \r\n" +
// 		// 			"   an object with custom icon/icons for the item"
// 		// 	},
// 		// 	Example: 'myTreeView.setItemIcons(id,{  \r\n' +
// 		// 		'file:           "icon_file",   // css for a file \r\n' +
// 		// 		'folder_opened:  "icon_opened", // css for an opened folder \r\n' +
// 		// 		'folder_closed:  "icon_closed"   // css for a closed folder \r\n' +
// 		// 		'});'
// 		// },
// 		setItemText: {
// 			Description: "设置节点的文本",
// 			Prototype: "setItemText(id,text);",
//             Name:"设置节点文本",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number  \r\n" +
// 					"   节点id",
// 				text: "string  \r\n" +
// 					"   要设置的节点文本"
// 			},
// 			Example: 'myTreeView.setItemText("2","New Text");'
// 		},
// 		setSizes: {
// 			Description: "设置组件自适应大小",
// 			Prototype: "void setSizes();",
//             Name:"自适应尺寸",
// 			Args: {
// 				_Return_: "void"
// 			},
// 			Example: 'myTreeView.setSizes();'
// 		},
// 		// setSkin: {
// 		// 	Description: "设置皮肤",
// 		// 	Prototype: "void setSkin(string skin);",
// 		// 	Args: {
// 		// 		_Return_: "void",
// 		// 		skin: "string  \r\n" +
// 		// 			'    "dhx_skyblue","dhx_web","dhx_terrace","dhx_material" '
// 		// 	},
// 		// 	Example: 'myTreeView.setSkin("dhx_web");'
// 		// },
// 		setUserData: {
// 			Description: "允许在不修改DOM的情况下将用户数据附加到treeview",
// 			Prototype: "setUserData(id,name,value);",
// 			Args: {
// 				_Return_: "void",
// 				id: "mixed  \r\n" +
// 					"   节点id",
// 				name: "string  \r\n" +
// 					"   the name of the userdata",
// 				value: "string  \r\n" +
// 					"   the value of the userdata"
// 			},
// 			Example: 'myTreeView.setUserData(id,"type","folder");'
// 		},
// 		showCheckbox: {
// 			Description: "显示节点的复选框",
// 			Prototype: "showCheckbox(id);",
//             Name:"显示复选框",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number  \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'myTreeView.showCheckbox(id);'
// 		},
// 		// silent: {
// 		// 	Description: "calls treeview function w/o triggering events",
// 		// 	Prototype: "void silent(function callback);",
// 		// 	Args: {
// 		// 		_Return_: "void",
// 		// 		callback: "string/number  \r\n" +
// 		// 			"   user-defined function"
// 		// 	},
// 		// 	Example: 'myTreeView.attachEvent("onSelect",function(id,state){ \r\n' +
// 		// 		'console.log(id,state);\r\n' +
// 		// 		'});\r\n' +
//         //
// 		// 		'myTreeView.selectItem("1"); // trigger event\r\n' +
// 		// 		'myTreeView.selectItem("2"); // trigger event\r\n' +
//         //
// 		// 		'myTreeView.silent(function(){ \r\n' +
// 		// 		'    myTreeView.selectItem("3"); // do not trigger event \r\n' +
// 		// 		'    myTreeView.selectItem("4"); // do not trigger event \r\n' +
// 		// 		'}); \r\n' +
// 		// 		'myTreeView.selectItem("5"); // trigger event \r\n' +
//         //
// 		// 		'// console output \r\n' +
// 		// 		'1 true \r\n' +
// 		// 		'1 false \r\n' +
// 		// 		'2 true \r\n' +
// 		// 		'4 false \r\n' +
// 		// 		'5 true'
// 		// },
// 		uncheckItem: {
// 			Description: "取消指定节点的选中状态",
// 			Prototype: " uncheckItem(id);",
//             Name:"取消选中状态",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number  \r\n" +
// 					"   节点id"
// 			},
// 			Example: 'myTreeView.uncheckItem(id);'
// 		},
// 		unload: {
// 			Description: "取消加载",
// 			Prototype: " unload();",
//             Name:"取消加载",
// 			Args: {
// 				_Return_: "void"
// 			},
// 			Example: 'myTreeView.unload();'
// 		},
// 		unselectItem: {
// 			Description: "取消选中的节点",
// 			Prototype: "unselectItem(id);",
//             Name:"取消选中节点",
// 			Args: {
// 				_Return_: "void",
// 				id: "string/number  \r\n" +
// 					"   节点id，多个节点为array数组"
// 			},
// 			Example: 'myTreeView.unselectItem("2");  \r\n' +
// 				'// if multiselect is enabled  \r\n' +
// 				'myTreeView.unselectItem(["2","3","5"]);  '
// 		}
// 	},
// 	Event: {
//         nodeclick: {
//             Description: "点击树节点时触发",
//             Prototype: "nodeclick(sender,node,e)",
//             Name:"节点单击事件",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身",
//                 e: "事件对象"
//             },
//             Example: ""
//         },
//         beforeNodeCollapse: {
//             Description: "节点被被闭合之前触发",
//             Prototype: "beforeNodeCollapse(sender,node,deep,anim)",
//             Name:"节点闭合前触发",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身",
//                 deep: "该节点当前是否也闭合所有子节点的状态",
//                 anim: "该节点当前是否启用动画效果的状态"
//             },
//             Example: ""
//         },
//         beforeNodeExpand: {
//             Description: "节点被被展开之前触发",
//             Prototype: "beforeNodeExpand(sender,node,deep,anim)",
//             Name:"节点展开前触发",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身",
//                 deep: "该节点当前是否也展开所有子节点的状态",
//                 anim: "该节点当前是否启用动画效果的状态"
//             },
//             Example: ""
//         },
//         checkChanged: {
//             Description: "当节点的checkbox的状态被改变时触发",
//             Prototype: "checkChanged(sender,node,checked)",
//             Name:"复选框状态改变时触发",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身",
//                 checked: "当前节点checkbox的状态"
//             },
//             Example: ""
//         },
//         afterNodeCollapse: {
//             Description: "节点被被闭合之后触发",
//             Prototype: "afterNodeCollapse(sender,node)",
//             Name:"节点闭合后触发",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身"
//             },
//             Example: ""
//         },
//         afterNodeExpand: {
//             Description: "节点被被展开之后触发",
//             Prototype: "afterNodeExpand(sender,node)",
//             Name:"节点展开后触发",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身"
//             },
//             Example: ""
//         },
//         nodeDblClick: {
//             Description: "当节点被双点击时触发",
//             Prototype: "nodeDblClick(sender,nodee)",
//             Name:"节点双击事件",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身",
//                 e: "事件对象"
//             },
//             Example: ""
//         },
//         beforeShowMenu: {
//             Description: "右键菜单显示之前触发",
//             Prototype: "beforeShowMenu(sender,node,e)",
//             Name:"右键菜单显示前触发",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身",
//                 e: "事件对象"
//             },
//             Example: ""
//         },
//         afterShowMenu: {
//             Description: "右键菜单显示之后触发",
//             Prototype: "afterShowMenu(sender,node,e)",
//             Name:"右键菜单显示后触发",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身",
//                 e: "事件对象"
//             },
//             Example: ""
//         },
//         nodeover: {
//             Description: "鼠标移入节点时触发",
//             Prototype: "nodeover(sender,node,e)",
//             Name:"鼠标移入节点时触发",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身",
//                 e: "事件对象"
//             },
//             Example: ""
//         },
//         nodeout: {
//             Description: "鼠标移出节点时触发",
//             Prototype: "nodeout(sender,node,e)",
//             Name:"鼠标移出节点时触发",
//             Args: {
//                 _Return_: "",
//                 sender: "控件本身",
//                 node: "节点本身",
//                 e: "事件对象"
//             },
//             Example: ""
//         }
// 	}
// };
// ControlsDataManage._add(Data_vmdTreeview);

/////////////////////////////////////////////////////////////////////////////////////////
//树view
/////////////////////////////////////////////////////////////////////////////////////////
var Data_vmdTree = {
	BaseType: "panel",
	Type: "vmdTree",
	Property: {
        disabled: {
            Description: "是否可用",
                Prototype: "bool disabled",
                Name:"禁用",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        id: {
            Description: "标识",
                Prototype: "string id",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        style: {
            Description: "样式",
                Prototype: "string style",
                Name:"内联样式",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        width: {
            Description: "宽度",
                Prototype: "number width",
                Name:"宽度",
                Args: {
                _Return_: "数字"
            },
            Example: ""
        },
        height: {
            Description: "高度",
                Prototype: "number height",
                Name:"高度",
                Args: {
                _Return_: "数字"
            },
            Example: ""
        },
        checkBox: {
            Description: "是否显示复选框",
                Prototype: "bool CheckBox",
                Name:"复选框",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        CheckBox: {
            Description: "是否显示复选框",
                Prototype: "bool CheckBox",
                Name:"复选框",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        dataStore: {
            Description: "绑定数据集",
                Prototype: "string dataStore",
                Name:"数据集",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        childNode: {
            Description: "子节点字段",
                Prototype: "string childNode",
                Name:"子节点",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        childField: {
            Description: "子节点字段",
                Prototype: "string childField",
                Name:"子节点",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        parentField: {
            Description: "父节点值，例如id",
                Prototype: "string parentField",
                Name:"父节点",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        rootValue: {
            Description: "根节点值，例如id",
                Prototype: "string rootValue",
                Name:"根节点值",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        RootValue: {
            Description: "根节点值，例如id",
                Prototype: "string RootValue",
                Name:"根节点值",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        rootText: {
            Description: "根节点的显示文本",
                Prototype: "string rootValue",
                Name:"根节点文本",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        textField: {
            Description: "树节点上显示的文本",
                Prototype: "string textField",
                Name:"显示文本",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        valueField: {
            Description: "树节点的值字段，例如id",
                Prototype: "string valueField",
                Name:"值",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        loadType: {
            Description: "加载方式",
                Prototype: "string loadType",
                Name:"加载方式",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        LodeType: {
            Description: "加载方式",
                Prototype: "string LodeType",
                Name:"加载方式",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        hideRoot: {
            Description: "隐藏根节点，不显示",
                Prototype: "Boolean loadType",
                Name:"隐藏根节点",
                Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        checkBoxFiled: {
            Description: "当checkBox为ture时，设置复选框选中的字段",
                Prototype: "string checkBoxFiled",
                Name:"选中字段",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        checkedValue: {
            Description: "当checkBox为ture时，设置复选框选中的字段的值",
                Prototype: "string checkedValue",
                Name:"选中值",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        queryVar: {
            Description: "分级加载时的查询字段",
                Prototype: "string queryVar",
                Name:"查询字段",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        contentMenu: {
            Description: "节点上的右键菜单",
                Prototype: "string queryVar",
                Name:"右键菜单",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        rootImg: {
            Description: "根节点的图标源文件地址",
                Prototype: "string rootImg",
                Name:"根节点图标",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        folderImg: {
            Description: "分类节点的图标源文件地址",
                Prototype: "string folderImg",
                Name:"分类节点图标",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        leafImg: {
            Description: "叶子节点的值，当叶子节点字段值对应时作为叶子节点",
                Prototype: "string leafImg",
                Name:"叶子节点图标",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        nodeMarkFiled: {
            Description: "叶子节点字段，用于识别该节点是否为叶子节点，0/空 为非叶子节点，1或其它为叶子节点",
                Prototype: "string nodeMarkFiled",
                Name:"叶子节点字段",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        }, 
        folderValue: {
            Description: "与叶子节点字段（nodeMarkFiled）属性关联，当字段为分类节点值时，认为该节点为分类，如不设置，默认为0",
                Prototype: "string folderValue",
                Name:"分类节点值",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        leafValue: {
            Description: "与叶子节点字段（nodeMarkFiled）属性关联，当字段为叶子节点值时，认为该节点为叶子节点；如不设置，默认为1",
                Prototype: "string leafValue",
                Name:"叶子节点值",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        skin: {
            Description: "树的皮肤样式",
                Prototype: "string leafValue",
                Name:"皮肤",
                Args: {
                _Return_: "字符串"
            },
            Example: ""
        }
    },
	Method: { 
		setRootNode:{
			Description: "在初始化过程中设置该树的根节点 ",
			Prototype: "setRootNode(node) ",
            Name:"设置根节点",
			Args: {
                node:"要设置为根节点的节点对象",
				_Return_: "Node"
			},
			Example: ''
		},
		getNodeById:{
			Description:"根据ID查找节点",
			Prototype:'getNodeById(id) ',
            Name:"查找节点",
			Args: {
				_Return_: "Node",
				id:'string 节点id'
			},
			Example: ''
		},
		getRootNode:{
			Description:"返回树的根节点",
			Prototype:'getNodeById() ',
            Name:"获取根节点",
			Args: {
				_Return_: "Node"
			},
			Example: ''
		}
	},
	Event: {
        nodeclick: {
            Description: "点击树节点时触发",
            Prototype: "nodeclick(sender,node,e)",
            Name:"节点单击事件",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身",
                e: "事件对象"
            },
            Example: ""
        },
        beforeNodeCollapse: {
            Description: "节点被被闭合之前触发",
            Prototype: "beforeNodeCollapse(sender,node,deep,anim)",
            Name:"节点闭合前触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身",
                deep: "该节点当前是否也闭合所有子节点的状态",
                anim: "该节点当前是否启用动画效果的状态"
            },
            Example: ""
        },
        beforeNodeExpand: {
            Description: "节点被被展开之前触发",
            Prototype: "beforeNodeExpand(sender,node,deep,anim)",
            Name:"节点展开前触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身",
                deep: "该节点当前是否也展开所有子节点的状态",
                anim: "该节点当前是否启用动画效果的状态"
            },
            Example: ""
        },
        checkChanged: {
            Description: "当节点的checkbox的状态被改变时触发",
            Prototype: "checkChanged(sender,node,checked)",
            Name:"复选框状态改变时触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身",
                checked: "当前节点checkbox的状态"
            },
            Example: ""
        },
        afterNodeCollapse: {
            Description: "节点被被闭合之后触发",
            Prototype: "afterNodeCollapse(sender,node)",
            Name:"节点闭合后触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身"
            },
            Example: ""
        },
        afterNodeExpand: {
            Description: "节点被被展开之后触发",
            Prototype: "afterNodeExpand(sender,node)",
            Name:"节点展开后触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身"
            },
            Example: ""
        },
        nodeDblClick: {
            Description: "当节点被双点击时触发",
            Prototype: "nodeDblClick(sender,nodee)",
            Name:"节点双击事件",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身",
                e: "事件对象"
            },
            Example: ""
        },
        beforeShowMenu: {
            Description: "右键菜单显示之前触发",
            Prototype: "beforeShowMenu(sender,node,e)",
            Name:"右键菜单显示前触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身",
                e: "事件对象"
            },
            Example: ""
        },
        afterShowMenu: {
            Description: "右键菜单显示之后触发",
            Prototype: "afterShowMenu(sender,node,e)",
            Name:"右键菜单显示后触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身",
                e: "事件对象"
            },
            Example: ""
        },
        nodeover: {
            Description: "鼠标移入节点时触发",
            Prototype: "nodeover(sender,node,e)",
            Name:"鼠标移入节点时触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身",
                e: "事件对象"
            },
            Example: ""
        },
        nodeout: {
            Description: "鼠标移出节点时触发",
            Prototype: "nodeout(sender,node,e)",
            Name:"鼠标移出节点时触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                node: "节点本身",
                e: "事件对象"
            },
            Example: ""
        }
	}
};
ControlsDataManage._add(Data_vmdTree);



//扩展树
var Data_vmdTreeEx = {
	BaseType: "vmdTree",
	Type: "vmdTreeEx",
	Property: {
		id: {
			Description: "组件标识",
			Prototype: "string id",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		// animCollapse: {
		// 	Description: "True 表示为面板闭合过程附有动画效果（默认为true）。",
		// 	Prototype: "animCollapse : Boolean ",
		// 	Args: {
		// 		_Return_: "Boolean "
		// 	},
		// 	Example: ""
		// },
		autoHeight: {
			Description: "True表示为使用height:'auto'，false表示为使用固定高度（缺省为false）。",
			Prototype: "autoHeight : Boolean ",
            Name:"自动高度",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		autoScroll: {
			Description: "True表示为在面板body元素上，设置overflow：'auto'和出现滚动条false表示为裁剪所有溢出的内容（默认为false）。",
			Prototype: "autoScroll : Boolean ",
            Name:"滚动条",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		autoWidth: {
			Description: "True表示为使用height:'auto'，false表示为使用固定高度（缺省为false）。",
			Prototype: "autoWidth : Boolean ",
            Name:"自动宽度",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		// collapsed: {
		// 	Description: "True 表示为渲染面板后即闭合（默认为false）。",
		// 	Prototype: "collapsed : Boolean ",
		// 	Args: {
		// 		_Return_: "Boolean "
		// 	},
		// 	Example: ""
		// },
		height: {
			Description: "此组件的高度（单位象素）（缺省为auto）。",
            Name:"高度",
			Prototype: "height : Number ",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		hidden: {
			Description: "渲染该组件为隐藏状态的（默认为false）。",
            Name:"隐藏",
			Prototype: "hidden : Boolean  ",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		hideMode: {
			Description: "True表示为完全隐藏label元素。",
			Prototype: "hideMode  : String  ",
            Name:"隐藏元素",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		cascading: {
			Description: "是否支持节点的级联选择。",
			Prototype: "cascading  : boolean  ",
            Name:"级联",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		}
	},
	Method: {
		collapseAll: {
			Description: "闭合所有节点 ",
			Prototype: "collapseAll()",
            Name:"闭合所有节点",
			Args: {
				_Return_: "void   "
			},
			Example: ""
		},
		expandAll: {
			Description: "展开所有节点 ",
			Prototype: "expandAll() ",
            Name:"展开所有节点",
			Args: {
				_Return_: "void   "
			},
			Example: ""
		},
		expandPath: {
			Description: "展开指定的路径。路径可以从Ext.data.NodegetPath对象上获取",
			Prototype: "expandPath(path,[attr],[callback])",
            Name:"展开指定的路径",
			Args: {
				_Return_: "path : String      ",
				path : "rowRecord  路径",
				attr: "attr : String   要插入的行记录",
				callback : "callback : 当展开完成时执行的回调"
			},
			Example: ""
		},
		getChecked: {
			Description: "返回选中的节点，或已选中的节点的特定的属性（例如：“id”） ",
			Prototype: "getChecked([attribute],[startNode])",
            Name:"获取选中节点",
			Args: {
				_Return_: "Array ",
				attribute : "attribute : String   默认为null（返回实际节点） ",
				startNode  : "startNode : TreeNode  开始的节点对象 to start from，默认为根节点 "
			},
			Example: ""
		},
		getNodeById: {
			Description: "根据id查找结点 ",
			Prototype: "getNodeById() ",
            Name:"查找结点",
			Args: {
				_Return_: "Node    ",
				id :  "String 要查找节点的id "
			},
			Example: ""
		},
		getRootNode: {
			Description: "返回树的根节点  ",
			Prototype: "getRootNode()",
            Name:"获取根节点",
			Args: {
				_Return_: "Node"
			},
			Example: ""
		},
		setRootNode: {
			Description: "在初始化过程中设置该树的根节点 ",
			Prototype: "setRootNode(node)",
            Name:"设置根节点",
			Args: {
				_Return_: "Node",
				node : "node  将要设置为根节点的节点"
			},
			Example: ""
		},
		getSelectionModel: {
			Description: "返回这个treePanel所用的选区模型   ",
			Prototype: "getSelectionModel() ",
            Name:"选区模型",
			Args: {
				_Return_: "TreeSelectionModel TreePanel用着的选区模型"
			},
			Example: ""
		},
		removeNodeById: {
			Description: "移除制定id对应的节点  ",
			Prototype: "removeNodeById(nodeId,changeStore,onlyDelChild)",
            Name:"移除节点",
			Args: {
				_Return_: "void",
				nodeId: "string nodeId  删除的节点id",
				changeStore: "boolean  changeStore  是否修改绑定的数据集，无数据集则不绑定",
				onlyDelChild: "boolean  onlyDelChild  只删除子节点"
			},
			Example: ""
		},
		getSelNode: {
			Description: "获取选中节点  ",
			Prototype: "getSelNode()",
            Name:"获取选中节点",
			Args: {
				_Return_: "Node"
			},
			Example: ""
		},
		getSelNodeId: {
			Description: "获取选中节点id  ",
			Prototype: "getSelNodeId()",
            Name:"获取选中节点id",
			Args: {
				_Return_: "string "
			},
			Example: ""
		},
		addNode: {
			Description: "指定节点下添加子节点  ",
			Prototype: "addNode(pid,cid,cnameisleaf,changeStore)",
            Name:"添加子节点",
			Args: {
				_Return_: "void",
				pid: "string pid  父节点id",
				cid: "string cid  节点id",
				cname: "string cname  节点名称",
				isleaf: "boolean isleaf  是否为叶子节点",
				changeStore: "boolean changeStore  是否修改绑定的数据集，无数据集则不绑定"
			},
			Example: ""
		},
		setNodeCheckById: {
			Description: "设置节点复选框是否选中",
			Prototype: "setNodeCheckById(id,checkstate)",
            Name:"设置复选框状态",
			Args: {
				_Return_: "void",
				id: "string id  节点id",
				checkstate: "boolean checkstate  节点选中状态",
				cascading:"boolean cascading  是否出发级联操作"
			},
			Example: ""
		},
		nodeCopy: {
			Description: "对指定节点进行复制",
			Prototype: "nodeCopy(node) ",
            Name:"复制节点",
			Args: {
				_Return_: "treenode",
				node: "node  要复制的节点"
			},
			Example: ""
		},
		nodeCopyTo: {
			Description: "将节点复制到目标树的某个节点下",
			Prototype: "nodeCopyTo(node,tree,nodeId,copyParentNode,changeStore)",
            Name:"复制到",
			Args: {
				_Return_: "void",
				node: "treenode node  要复制的原节点",
				tree: "treeex tree  目标树",
				nodeId:"string nodeId  目标节点的id",
				copyParentNode:"boolean copyParentNode  是否对父节点进行拷贝",
				changeStore:"boolean changeStore  是否修改目标树的数据集"
			},
			Example: ""
		},
        filterBy: {
            Description: "过滤树节点",
            Prototype: "filterBy(txt)",
            Name:"节点过滤",
            Args: {
                _Return_: "",
                txt: "过滤条件（节点文本)"
            },
            Example: ""
        }

	},
	Event: {}
};
ControlsDataManage._add(Data_vmdTreeEx);



var Data_vmdRichTextEditor = {
	BaseType: "Control",
	Type: "vmdRichTextEditor",
	Property: {},
	Method: {
		setValue: {
			Description: "设置值",
			Prototype: "setValue(value)",
			Args: {
				_Return_: "void  ",
				value: "string  \r\n" +
					"   值"
			},
			Example: ""
		},
		getContent: {
			Description: "获取编辑器的内容",
			Prototype: "getContent()",
			Args: {
				_Return_: "string 编辑器的内容字符串, 如果编辑器的内容为空，或者是空的标签内容（如:”&lt;p&gt;&lt;br/&gt;&lt;/p&gt;“）， 则返回空字符串  "
			},
			Example: ""
		},
		setContent: {
			Description: "设置编辑器的内容，可修改编辑器当前的html内容",
			Prototype: "setContent(html)",
			Args: {
				_Return_: "void",
				html:"string 编辑器的内容字符串, 如果编辑器的内容为空，或者是空的标签内容（如:”&lt;p&gt;&lt;br/&gt;&lt;/p&gt;“）， 则返回空字符串  "
			},
			Example: ""
		},
		getContentText: {
			Description: "获取编辑器的纯文本内容",
			Prototype: "getContentText()",
			Args: {
				_Return_: "string 编辑器的内容字符串, 纯文本格式"
			},
			Example: ""
		},
		getPlainText: {
			Description: "获取编辑器的带格式的纯文本内容",
			Prototype: "getPlainText()",
			Args: {
				_Return_: "string 获取编辑器的带格式的纯文本内容"
			},
			Example: ""
		}
	},
	Event: {
	}
}
ControlsDataManage._add(Data_vmdRichTextEditor);
/////////////////////////////////////////////////////////////////////////////////////////
//变量
/////////////////////////////////////////////////////////////////////////////////////////
var Data_vmdVariable = {
	BaseType: "",
	Type: "vmdVariable",
	Property: {
		id: {
			Description: "按钮标识",
			Prototype: "string id",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
        value: {
            Description: "赋给变量的值",
            Name:"变量值",
            Prototype: "string value",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        name: {
            Description: "变量名",
            Prototype: "string name",
            Name:"变量名",
            Args: {
                _Return_: ""
            },
            Example: ""
        },
        type: {
            Description: "变量类型",
            Prototype: "string type",
            Name:"变量类型",
            Args: {
                _Return_: ""
            },
            Example: ""
        },
        formVar: {
            Description: "赋给变量的值",
            Prototype: "string formVar",
            Name:"变量值",
            Args: {
                _Return_: ""
            },
            Example: ""
        }
	},
	Method: {
		getValue: {
			Description: "获取变量值",
			Prototype: "getValue()",
			Args: {
				_Return_: "string  返回值"
			},
			Example: ""
		},
		setValue: {
			Description: "设置变量值",
			Prototype: "setValue(value)",
			Args: {
				_Return_: "void",
				value: "string  \r\n" +
					"   变量值"
			},
			Example: ""
		},
		getValueExp: {
			Description: "获取变量表达式",
			Prototype: "getValueExp()",
			Args: {
				_Return_: "string  表达式内容"
			},
			Example: ""
		},
		refresh: {
			Description: "刷新变量",
			Prototype: "refresh()",
			Args: {
				_Return_: "void"
			},
			Example: ""
		}

	},
	Event: {

	}
};
ControlsDataManage._add(Data_vmdVariable);

/////////////////////////////////////////////////////////////////////////////////////////
//数据集
/////////////////////////////////////////////////////////////////////////////////////////
var Data_vmdJsonStore = {
	BaseType: "",
	Type: "vmdJsonStore",
	Property: {
		id: {
			Description: "按钮标识",
			Prototype: "string id",
			Args: {
				_Return_: "字符串"
			},
			Example: ""
		},
		autoLoad: {
			Description: "初始化是否加载数据集",
			Prototype: "boolean autoLoad",
            Name:"自动加载",
			Args: {
				_Return_: "布尔值"
			},
			Example: ""
		},
        storeConfig: {
            Description: "数据集配置",
            Prototype: "Object storeConfig",
            Name:"数据配置",
            Args: {
                _Return_: ""
            },
            Example: ""
        }
    },
	Method: {
		getFields: {
			Description: "获取数据集的字段信息",
			Prototype: "getFields()",
            Name:"获取字段信息",
			Args: {
				_Return_: "array  返回值"
			},
			Example: ""
		},
		getJson: {
			Description: "获取数据集的json数据对象",
			Prototype: "getJson()",
            Name:"获取json数据对象",
			Args: {
				_Return_: "array 返回值"
			},
			Example: ""
		},
		// toInsert: {
		// 	Description: "删除并保存数据",
		// 	Prototype: "toInsert(rowRecord)",
         //    Name:"获取json数据对象",
		// 	Args: {
		// 		_Return_: "void",
		// 		rowRecord: "rowRecord  要插入的行记录"
		// 	},
		// 	Example: ""
		// },
		toDelete: {
			Description: "删除指定行",
			Prototype: "toDelete(rowRecord)",
            Name:"删除行",
			Args: {
				_Return_: "void  返回值",
				rowRecord: "rowRecord  要删除的行记录"
			},
			Example: ""
		},
		toAdd: {
			Description: "添加行",
			Prototype: "toAdd(rowRecord)",
            Name:"添加行",
			Args: {
				_Return_: "void  返回值",
				rowRecord: "rowRecord  要添加的行记录"
			},
			Example: ""
		},
		toSave: {
			Description: "保存数据（通过数据服务的save方法）",
			Prototype: "toSave()",
            Name:"保存数据",
			Args: {
				_Return_: "void  返回值"
			},
			Example: ""
		},
		toSelect: {
			Description: "重新查询数据（通过数据服务的select方法）",
			Prototype: "toSelect()",
            Name:"查询数据",
			Args: {
				_Return_: "void  返回值"
			},
			Example: ""
		},
		toRefresh: {
			Description: "重新刷新数据",
			Prototype: "toRefresh(fun)",
            Name:"刷新数据集",
			Args: {
				_Return_: "void  返回值",
				callback: "function 回调函数"
			},
			Example: ""
		},
		toLoadData: {
			Description: "加载数据",
			Prototype: "toLoadData(LoadData)",
            Name:"加载数据",
			Args: {
				_Return_: "void  返回值",
				LoadData: "json 加载的数据"
			},
			Example: ""
		},
        add: {
            Description: "往Store对象添加Records，并触发add事件",
            Prototype: "add(records)  ",
            Name:"添加行记录",
            Args: {
                _Return_: "void  返回值",
                records: "Array  添加的数据"
            },
            Example: ""
        },
        // addSorted: {
        //     Description: "（只限本地排序） 传入一个Record，按照队列（以固定的排序顺序）插入到Store对象中",
        //     Prototype: "addSorted(record)  ",
        //     Name:"添加行记录",
        //     Args: {
        //         _Return_: "void  返回值",
        //         records: "Array  添加的数据"
        //     },
        //     Example: ""
        // },
        each: {
            Description: "为 Store中的每条记录 record 调用指定的函数.如果store有过滤器,则只对过滤后的数据进行调用.",
            Prototype: "each(fn,[scope])",
            Name:"遍历行数据",
            Args: {
                _Return_: "",
                fn: "要调用的函数. 传给此函数的第一个参数是 Record. 返回 false 则取消,并退出整个迭代过程.",
                scope:"函数执行的作用域(即this 引用). 默认是迭代之中的当前记录 record ."
            },
            Example: ""
        },
        filter: {
            Description: "根据给定的过滤器集合，对已加载的记录进行过滤.",
            Prototype: "filter(filters,[value])",
            Name:"过滤数据集",
            Args: {
                filters:" Object[]/Ext.util.Filter[]/String 要过滤的字段或者过滤集合 ",
                value:"可以是字段开头的字符串，也可以是针对该字段的正则表达式",
                _Return_: ""
            },
            Example: "store.filter([\n" +
            "    {property: \"email\",value: /\\.com$/},\n" +
            "    {filterFn: function(item) { return item.get(\"age\") > 10; }}\n" +
            "]);"
        },
        clearFilter: {
            Description: "清空过滤器,将 Record cache 恢复到没有过滤的情况.",
            Prototype: "clearFilter(suppressEvent)",
            Name:"清空过滤器",
            Args: {
                _Return_: "",
                suppressEvent:"Boolean 如果设置为 true,则会静默清除(对于使用本地过滤的 Store,意味着清空 filter 集合,却不触发任何 datachanged 事件.对于使用服务端过滤的 Store,意味着清空 filter,却不重新从服务端加载数据.)"
            },
            Example: "// 清除过滤器而不更新界面(UI)\n" +
            "store.clearFilter(true);"
        },
        filterBy: {
            Description: "由函数来执行过滤. 指定的函数将由Store 中的每一条记录调用",
            Prototype: "filterBy(fn,[scope])",
            Name:"自定义过滤",
            Args: {
                _Return_: "",
                fn: "要调用的函数. 传给此函数的第一个参数是 Record. 返回 false 则取消,并退出整个迭代过程.",
                scope:"函数执行的作用域(即this 引用). 默认是迭代之中的当前记录 record ."
            },
            Example: ""
        },
        find: {
            Description: "根据指定的属性域,以及指定的值,找出第一条匹配的记录的索引 index.",
            Prototype: "find(fieldName,value,[startIndex],[anyMatch],[caseSensitive],[exactMatch])",
            Name:"获取索引",
            Args: {
                _Return_: "",
                fieldName : "String 要查找的属性域 名字",
                value : "String/RegExp可以是需要匹配的string,或者是正则表达式. 如果是字符串,则需要以此string开始 才会匹配.",
                startIndex : "Number (optional)起始搜索位置的索引 默认 0 ",
                anyMatch : "Boolean  设置为 true，则只要匹配一部分就行,不再强制必须以 value 参数开头.Defaults to: false",
                caseSensitive : "Boolean (optional)如果设置为 true,则进行区分大小写的对比 Defaults to: false",
                exactMatch : "Boolean (optional)设置为 true 则强制完全匹配 (会在正则表达式中 添加^ and $ 字符) Defaults to: false"
            },
            Example: ""
        },
        findBy: {
            Description: "在 Store中根据一个函数来找出第一条匹配的记录. 如果函数返回 true 则被认为有匹配记录.",
            Prototype: "findBy(fn,[scope],[startIndex])",
            Name:"自定义查找",
            Args: {
                _Return_: "",
                fn: "要调用的函数. 传给此函数的第一个参数是 Record. 返回 false 则取消,并退出整个迭代过程.",
                scope:"函数执行的作用域(即this 引用). 默认是迭代之中的当前记录 record .",
                startIndex : "Number (optional)起始搜索位置的索引 默认 0 "
            },
            Example: ""
        },
        first: {
            Description: "获取store中第一条记录的快捷方法.",
            Prototype: "first()",
            Name:"第一条记录",
            Args: {
                _Return_: "data/undefined",
            },
            Example: ""
        },
        getAt: {
            Description: "获取指定index处的记录.",
            Prototype: "getAt(index)",
            Name:"根据索引获取记录",
            Args: {
                _Return_: "data",
                index:"Number"
            },
            Example: ""
        },
        getById: {
            Description: "获取指定id处的记录.",
            Prototype: "getById(id)",
            Name:"根据id获取记录",
            Args: {
                _Return_: "data",
                id:"Mixed 指定id"
            },
            Example: ""
        },
        getCount: {
            Description: "获取store中记录的数量.",
            Prototype: "getCount() ",
            Name:"数据总数",
            Args: {
                _Return_: "Number"
            },
            Example: ""
        },
        indexOf: {
            Description: "查找记录在store中的 index.",
            Prototype: "indexOf(record)",
            Name:"数据对象的索引",
            Args: {
                _Return_: "Number",
                record:"要查找的数据对象"
            },
            Example: ""
        },
        indexOfId: {
            Description: "根据传入的 id,取得store中记录的索引 index.",
            Prototype: "indexOfId(id)",
            Name:"根据id获取索引",
            Args: {
                _Return_: "Number",
                id:"String"
            },
            Example: ""
        },
        insert: {
            Description: "从给定的索引处开始,插入 Model 实例;并触发 add 事件. 也可以参考 add.",
            Prototype: "insert(index,records)",
            Name:"插入数据",
            Args: {
                _Return_: "",
                index:"要插入的位置索引",
                records:"要添加到 store的 Ext.data.Model 组成的数组."
            },
            Example: ""
        },
        loadData: {
            Description: "直接加载一个数组的数据到 Store 中.",
            Prototype: "loadData(data,[append])",
            Name:"加载数据到数据集",
            Args: {
                _Return_: "",
                data:"要加载的数据",
                append : "Boolean 如果设置为 true 则将这些记录添加到已存在的记录中,如果为 false 则会先删除原来的记录."
            },
            Example: ""
        },
        max: {
            Description: "获取 store 中Model的某个域的最大值.",
            Prototype: "max(field)",
            Name:"最大值",
            Args: {
                _Return_: "Object",
                field:"要进行统计的每条记录里的域(字段)"
            },
            Example: ""
        },
        min: {
            Description: "获取 store 中Model的某个域的最小值.",
            Prototype: "min(field)",
            Name:"最小值",
            Args: {
                _Return_: "Object",
                field:"要进行统计的每条记录里的域(字段)"
            },
            Example: ""
        },
        // queryBy: {
        //     Description: "获取 store 中Model的某个域的最小值.",
        //     Prototype: "queryBy(fn)",
        //     Name:"清空过滤器",
        //     Args: {
        //         _Return_: "匹配的所有数据",
        //         fn:"要被回调的函数. 调用时将会传入以下参数:record : Ext.data.Model\n" +
        //         "用来进行过滤测试的记录. 通过使用 Ext.data.Model.get 来访问属性域的值.\n" +
        //         "\n" +
        //         "id : Object\n" +
        //         "传入记录的ID."
        //     },
        //     Example: ""
        // },
        remove: {
            Description: "从 Store 中删除给定的记录,对每条删除的记录都会触发一次 'remove' 事件. 在此次的所有数据删除完成后,会触发一次 'datachanged' 事件",
            Prototype: "remove(records)",
            Name:"删除记录",
            Args: {
                _Return_: "匹配的所有数据",
                records:"要删除的 Model 实例(或实例数组)."
            },
            Example: ""
        },
        removeAll: {
            Description: "从 store 中移除所有的条目.",
            Prototype: "removeAll()",
            Name:"删除所有记录",
            Args: {
                _Return_: ""
            },
            Example: ""
        },
        sort: {
            Description: "使用一个或多个排序Store中的数据",
            Prototype: "sort(sorters,direction) ",
            Name:"排序",
            Args: {
                _Return_: "",
                sorters:"本Store的配置的Model的一个字段的字符串名字， 或者排序器配置数组",
                direction:'数据排序方向。默认为"ASC"'
            },
            Example: "//sort by a single field\n" +
            "myStore.sort('myField','DESC');\n" +
            "\n" +
            "//sorting by multiple fields\n" +
            "myStore.sort([\n" +
            "    {\n" +
            "        property : 'age',\n" +
            "        direction: 'ASC'\n" +
            "    },\n" +
            "    {\n" +
            "        property : 'name',\n" +
            "        direction: 'DESC'\n" +
            "    }\n" +
            "]);"
        },
        getCount: {
            Description: "获取数据集记录数",
            Prototype: "getCount() ",
            Name:"获取数据集记录数",
            Args: {
                _Return_: "int"
            },
            Example: "var count=store.getCount()"
        },
        getCurrowValue: {
            Description: "获取当前行字段值(绑定通用录入组件时有效)",
            Prototype: "getCurrowValue(string Field) ",
            Name:"获取当前行字段值",
            Args: {
                _Return_: "int",
                Field:'字段名'
            },
            Example: "var value=store.getCurrowValue(‘jh’)"
        },
        getSum: {
            Description: "对数据集指定列求和（绑定通用录入组件时有效)",
            Prototype: "getSum(string Field) ",
            Name:"对数据集指定列求和",
            Args: {
                _Return_: "int",
                Field:'字段名'
            },
            Example: "var sunValue=store.getSum(‘cyl’)"
        },
        getAvg: {
            Description: "对数据集指定列求平均（绑定通用录入组件时有效)",
            Prototype: "getAvg(string Field) ",
            Name:"对数据集指定列求平均",
            Args: {
                _Return_: "int",
                Field:'字段名'
            },
            Example: "var avgValue=store.getAvg(‘cyl’)"
        },
        getMax: {
            Description: "获取数据集指定列最大值（绑定通用录入组件时有效)",
            Prototype: "getMax(string Field) ",
            Name:"获取数据集指定列最大值",
            Args: {
                _Return_: "int",
                Field:'字段名'
            },
            Example: "var maxValue=store.getMax(‘cyl’)"
        },
        getMin: {
            Description: "获取数据集指定列最小值（绑定通用录入组件时有效)",
            Prototype: "getSum(string Field) ",
            Name:"获取数据集指定列最小值",
            Args: {
                _Return_: "int",
                Field:'字段名'
            },
            Example: "var count=store.getMin(‘cyl’)"
        },
	},
	Event: {
        load: {
            Description: "数据集加载完成后触发",
            Prototype: "load(sender,records,options)",
            Name:"加载完成后触发",
            Args: {
                _Return_: "",
                sender:"数据集本身",
                records:"加载好的records",
                options:"所指定的laoding操作"
            },
            Example: ""
        }
	}
};
ControlsDataManage._add(Data_vmdJsonStore);

/////////////////////////////////////////////////////////////////////////////////////////
//工作流
/////////////////////////////////////////////////////////////////////////////////////////
var Data_vmdWorkFlow = {
	BaseType: "",
	Type: "vmdWorkFlow",
	Property: {
		modelId: {
			Description: "流程图id",
			Prototype: "string modelId",
            Name:"流程图id",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		modelName: {
			Description: "流程图名称",
			Prototype: "string  modelName",
            Name:"名称",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		taskNodeKey: {
			Description: "当前任务节点id",
			Prototype: "string  taskNodeKey",
            Name:"任务节点id",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		taskNodeName: {
			Description: "当前任务节点名称",
			Prototype: "string  taskNodeName",
            Name:"任务节点名称",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		startNodeId: {
			Description: "开始节点id",
			Prototype: "string  startNodeId",
            Name:"开始节点id",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		assignee: {
			Description: "关系人",
			Prototype: "string  assignee",
            Name:"关系人",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		processInstanceId: {
			Description: "流程实例id",
			Prototype: "string  processInstanceId",
            Name:"流程实例id",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		taskId: {
			Description: "当前任务id",
			Prototype: "string  taskId",
            Name:"当前任务id",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		taskVars: {
			Description: "当前任务变量",
			Prototype: "array taskVars",
            Name:"当前任务变量",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		formVars: {
			Description: "当前表单变量",
			Prototype: "array formVars",
            Name:"表单变量",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		processDefinitionInfo: {
			Description: "流程定义信息",
			Prototype: "object processDefinitionInfo",
            Name:"流程定义信息",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
		processDefinitionId: {
			Description: "流程定义id",
			Prototype: "string processDefinitionId",
            Name:"流程定义id",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
        flowInfo: {
			Description: "点击选择该界面绑定的工作流流程",
			Prototype: "object flowInfo",
            Name:"流程",
			Args: {
				_Return_: ""
			},
			Example: ""
		},
        configInfo: {
            Description: "点击选择该界面绑定的工作流的具体节点",
            Prototype: "object configInf",
            Name:"节点",
            Args: {
                _Return_: ""
            },
            Example: ""
        },
        creatTime: {
            Description: "任务时间",
            Prototype: "date creatTime",
            Name:"任务时间",
            Args: {
                _Return_: ""
            },
            Example: ""
        }
	},
	Method: {
		getAllNodesInfo: {
			Description: "获取表单绑定的所有节点信息",
			Prototype: "getAllNodesInfo()",
            Name:"所有节点信息",
			Args: {
				_Return_: "array[object]  返回值"
			},
			Example: ""
		},
		getNodeInfo: {
			Description: "获取指定节点的信息",
			Prototype: "getNodeInfo(nodeId)",
            Name:"指定节点信息",
			Args: {
				_Return_: "object 节点信息",
				nodeId: "string 节点id"
			},
			Example: ""
		},
		getNodeVar: {
			Description: "获取指定节点的节点变量",
			Prototype: "getNodeVar(nodeId)",
            Name:"获取节点变量",
			Args: {
				_Return_: "array  节点变量",
				nodeId: "string  节点id"
			},
			Example: ""
		},
		getNodeVarValue: {
			Description: "获取节点变量值",
			Prototype: "getNodeVarValue(nodeId,Varname)",
            Name:"获取节点变量值",
			Args: {
				_Return_: "string  返回值",
				nodeId: "string  节点id",
				Varname: "string 变量名"
			},
			Example: ""
		},
		getNodeAllVarValue: {
			Description: "获取节点的所有变量值",
			Prototype: "getNodeAllVarValue(nodeId)",
            Name:"节点的所有变量值",
			Args: {
				_Return_: "array  返回值",
				nodeId: "string  节点id"
			},
			Example: ""
		},
		getGlobalVar: {
			Description: "获取全局变量",
			Prototype: "getGlobalVar()",
            Name:"获取全局变量",
			Args: {
				_Return_: "array  返回值"
			},
			Example: ""
		},
		// getGlobalVarValue: {
		// 	Description: "获取全局变量和值",
		// 	Prototype: "getGlobalVarValue(varName)",
         //    Name:"获取全局变量和值",
		// 	Args: {
		// 		_Return_: "string  返回值"
		// 	},
		// 	Example: ""
		// },
		submit: {
			Description: "提交工作流",
			Prototype: "submit(callback)",
            Name:"提交工作流",
			Args: {
				_Return_: "void  ",
				callback: "function 回调函数"
			},
			Example: "hwWorkFlow.submit(function(){alert('提交成功')})"
		},
		getTaskId: {
			Description: "通过任务id获取节点信息",
			Prototype: "getTaskId(taskId,callBack)",
            Name:"获取节点信息",
			Args: {
				_Return_: "void  ",
				taskId: "string 当前任务id",
				callBack: "function 成功回调，参数返回节点信息"
			},
			Example: ""
		},
		getFormVars: {
			Description: "通过任务id获取表单变量",
			Prototype: "getTaskId(taskId,callBack)",
            Name:"获取表单变量",
			Args: {
				_Return_: "void  ",
				taskId: "string 当前任务id",
				callBack: "function 成功回调，参数返回表单变量信息"
			},
			Example: ""
		},
		getTaskVars: {
			Description: "通过任务id获取节点变量",
			Prototype: "getTaskVars(taskId,callBack)",
            Name:"获取节点变量",
			Args: {
				_Return_: "void  ",
				taskId: "string 当前任务id",
				callBack: "function 成功回调，参数返回节点变量信息"
			},
			Example: ""
		},
		getProcessDefinitio: {
			Description: "获取表单绑定工作流的流程定义信息",
			Prototype: "getTaskVars(callBack)",
            Name:"获取流程定义信息",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，参数流程定义信息"
			},
			Example: ""
		},
		getProcessDefinitioByModelId: {
			Description: "通过模型id获取流程定义的信息",
			Prototype: "getProcessDefinitioByModelId(callBack，modelId)",
            Name:"获取流程定义信息",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，返回流程定义信息",
				modelId: "string 工作流id"
			},
			Example: ""
		},
		startProcess: {
			Description: "启动流程 通过回调返回流程实例信息",
			Prototype: "startProcess(callBack)",
            Name:"启动流程",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，返回启动成功信息"
			},
			Example: ""
		},
		startProcess2: {
			Description: "启动流程 通过回调，返回下个节点信息",
			Prototype: "startProcess2(callBack)",
            Name:"启动流程2",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，返回下个节点信息"
			},
			Example: ""
		},
		startProcessByProcessDefinition: {
			Description: "通过流程定义信息启动流程 返回流程实例信息",
			Prototype: "startProcessByProcessDefinition(callBack，ProcessDefinitio)",
            Name:"启动流程",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，返回启动成功信息",
				ProcessDefinitio: "string 流程定义id"
			},
			Example: ""
		},
		startProcessByProcessDefinition2: {
			Description: "通过流程定义信息启动流程 返回下个节点信息",
			Prototype: "startProcessByProcessDefinition2(callBack，ProcessDefinitio)",
            Name:"启动流程",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，返回下个节点信息",
				ProcessDefinitio: "string 流程定义id"
			},
			Example: ""
		},
		startProcessByModelId: {
			Description: "根据模型ID,参数启动流程，返回流程实例信息",
			Prototype: " startProcessByModelId(callBack，modelId，startuser)",
            Name:"启动流程",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，返回启动成功信息",
				modelId: "string 工作流模型id",
				startuser: "array 参数列表 [{name:'',value:''}]"
			},
			Example: ""
		},
		startProcessByModelId2: {
			Description: "根据模型ID,参数启动流程，返回下个节点信息",
			Prototype: "startProcessByModelId2(callBack，modelId，startuser)",
            Name:"启动流程",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，返回下个节点信息",
				modelId: "string 工作流模型id",
				startuser: "array 参数列表 [{name:'',value:''}]"
			},
			Example: ""
		},
		SubmitTask: {
			Description: "提交任务 返回提交状态信息（自动判断启动还是提交）",
			Prototype: "SubmitTask(callBack)",
            Name:"提交任务",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，返回下个节点信息"
			},
			Example: ""
		},
		SubmitTask2: {
			Description: "提交任务 返回下个节点信息（自动判断启动还是提交）",
			Prototype: "SubmitTask2(callBack)",
            Name:"提交任务2",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，并返回下一个节点的任务信息"
			},
			Example: ""
		},
		SubmitTaskById: {
			Description: "通过任务id、参数  提交任务，并返回下一个节点的任务信息",
			Prototype: "SubmitTaskById(callBack，taskid，params)",
            Name:"提交任务",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，并返回下一个节点的任务信息",
				taskid: "string 工作流任务id",
				params: "array 参数列表 [{name:'',value:'']"
			},
			Example: ""
		},
		getTaskIdByProcessInstanceId: {
			Description: "通过流程实例id获取任务id等信息（根据用户和用户组进行提取）",
			Prototype: "getTaskIdByProcessInstanceId(callBack，processInstanceId)",
            Name:"获取任务id等信息",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，并返回当前任务信息",
				processInstanceId: "string 工作流流程实例id"
			},
			Example: ""
		},
		getTaskInfoByProcessInstanceId: {
			Description: "通过流程实例id获取任务信息，返回流程对象信息",
			Prototype: "getTaskInfoByProcessInstanceId(callBack，processInstanceId)",
            Name:"获取任务信息",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，并返回当前任务信息",
				processInstanceId: "string 工作流流程实例id"
			},
			Example: ""
		},
		allotAssignee: {
			Description: "指定会签人员",
			Prototype: "allotAssignee(callBack，assigneeList，assigneelistName)",
            Name:"人员会签",
			Args: {
				_Return_: "void  ",
				callBack: "function 成功回调，并返回会签信息",
				assigneeList: "array 会签人员数组",
				assigneelistName: "string  参数名"
			},
			Example: ""
		},
		startProcess_StandbyCenter: {
			Description: "启动流程,并写入消息中心待办；通过模型id",
			Prototype: "startProcess_StandbyCenter(startConfig)",
            Name:"启动流程",
			Args: {
				_Return_: "void  ",
				startConfig: "{object} startConfig-启动流程时设置的参数；格式 { \n" +
				"	modelId:30057,//选填 如以绑定模版，则可不填，否则需要传递 \n" +
				"	variables:[{'name': '', 'value': ''}],//list 选填，提交的变量，为空会自己组织参数 {'name': '', 'value': ''} \n" +
				"	assigneeListId:'assigneeList',//string 选填，在启用会签时需要，此名称与流程图中要一致 \n" +
				"	assigneeList:['kermit','dbadmin','ceshi02'],//lsit 选填，在启用会签时需要，设置会签人员 \n" +
				"	msgData:'',//string 选填，消息体内容,消息推送用 \n" +
				"	isSendMsg:'',//bool 选填，是否发消息,默认true \n" +
				"	isGtask:'',//bool 选填，是否保存待办，默认true \n" +
				"	title:'',//string 选填，流程启动后待办名称，不传内部写入流程实例名称 \n" +
				"	content:'',//string 选填，流程启动后待办内容 \n" +
				"	remark:'',// 选填，备注\n" +
				"	tasklink:'',// 选填，任务链接，用于查询已办使用\n" +
				"	formusername:'',// 选填，表单处理人名称\n" +
				"	business:'',// 必填，业务键值,建立流程与业务对应关系\n" +
				"	effectivedate:'',//选填，生效时间，格式必须为yyyy-MM-dd HH:mm:ss \n" +
				"	type:'',//选填，为‘1’时，审批历程记录流程启动信息 \n" +
				"	success:function(){},//function 选填，成功回调 \n" +
				"	error:function(){}//function 选填，失败回调 \n" +
				"}"
			},
			Example: ""
		},
		submitTask_StandbyCenter: {
			Description: "提交任务流程  并将待办信息写入到待办中心，无需再单独写待办",
			Prototype: "submitTask_StandbyCenter(submitConfig)",
            Name:"提交任务",
			Args: {
				_Return_: "void  ",
				submitConfig: "{object} submitConfig-启动流程时设置的参数；格式 { \n" +
				"	taskId:30057,//必填  通过任务id启动 ，如url中传递taskid 则可不填 \n" +
				"	properties:[{'id': '', 'value': ''}],//list 选填，提交的变量，为空会内部自动组织参数 {'id': '', 'value': ''} \n" +
				"	assigneeListId:'assigneeList',//string 选填，在启用会签时需要，此名称与流程图中要一致 \n" +
				"	assigneeList:['kermit','dbadmin','ceshi02'],//lsit 选填，在启用会签时需要，设置会签人员 \n" +
				"	msgData:'',//string 选填，消息体内容,消息推送用 \n" +
				"	isSendMsg:'',//bool 选填，是否发消息,默认true \n" +
				"	isGtask:'',//bool 选填，是否保存待办，默认true \n" +
				"	title:'',//string 选填，流程启动后待办名称，不传内部写入流程实例名称 \n" +
				"	content:'',//string 选填，流程启动后待办内容 \n" +
				"	auditresult:'',//string 选填，审批结果   1 同意 2 拒绝 3 退回 4 发起 5 中止  \n" +
				"	auditsug:'',//string 选填，审批意见 \n" +
				"	remark:'',// 选填，备注\n" +
				"	business:'',// 业务键值,建立流程与业务对应关系\n" +
				"	tasklink:'',// 选填，任务链接，用于查询已办使用\n" +
				"	formusername:'',// 选填，表单处理人名称\n" +
				"	effectivedate:'',//选填，生效时间，格式必须为yyyy-MM-dd HH:mm:ss \n" +
				"	success:function(){},//function 选填，成功回调 \n" +
				"	error:function(){}//function 选填，失败回调 \n" +
				"}"
			},
			Example: ""
		},
		deleteinstance_StandbyCenter: {
			Description: "通过流程实例id或任务id关闭流程，并写入待办中心",
			Prototype: "deleteinstance_StandbyCenter(deleteinstanceConfig)",
            Name:"关闭流程",
			Args: {
				_Return_: "void  ",
				deleteinstanceConfig: "{object} deleteinstanceConfig-启动流程时设置的参数；object格式{ \n" +
				"	taskId:30057,//string 选填，任务id, \n" +
				"	processInstanceId:'',//string 选填，流程实例id \n" +
				"	deleteReason:'',//string 选填，中断原因 \n" +
				"	formusername:'',// 表单处理人名称 \n" +
				"	title:'',//string 选填，流程启动后待办名称，不传内部写入流程实例名称 \n" +
				"	content:'',//string 选填，流程启动后待办内容			 \n" +
				"	remark:'',//string 选填，备注 \n" +
				"	business:'',//string 选填，修改业务主键 \n" +
				"	msgData:'',//string 选填，消息体内容,消息推送用 \n" +
				"	isSendMsg:'',//bool 选填，是否发消息,默认true \n" +
				"	isGtask:'',//bool 选填，是否保存待办，默认true \n" +
				"	success:function(result){},//function 选填，成功回调 \n" +
				"	error:function(result){}//function 选填，失败回调 \n" +
				"}"
			},
			Example: ""
		}
	},
	Event: {

	}
};
ControlsDataManage._add(Data_vmdWorkFlow);


//微服务插件化  api
var Data_hwMSC = {
	BaseType: "",
	Type: "vmdHwMSC",
	Property: {},
	Method: {
		getMsg: {
			Description: "get请求",
			Prototype: "getMsg(func, successback, errorback)",
			Name: "get请求",
			Args: {
				_Return_: "Ext.Button 已添加的按钮",
				func: "{String} func-要执行的方法路径",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} successback-失败回调"
			},
			Example: ""
		},
		postMsg: {
			Description: "post请求",
			Prototype: "postMsg (func, args, successback, errorback)",
			Name: "post请求",
			Args: {
				_Return_: "void",
				func: "{String} func-要执行的方法名",
				args: "{String} args-方法需要的参数，字符串形式",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} successback-失败回调"
			},
			Example: "hwMSC.postMsg('topic_query?con=10&page=1&appId=5263',{\n" +
				"        appName: \"12\",\n" +
				"        unit: \"34\",\n" +
				"        contact: \"23\",\n" +
				"        phone: \"23\",\n" +
				"        appNote: \"345\"\n" +
				"    },\n" +
				"    function(result) {},\n" +
				"    function(mgs) {})"
		},
		MQTTInitHost: {
			Description: "初始化MQTT连接对象",
			Prototype: "MQTTInitHost (clientId, ip, mqtt_port)",
			Name: "初始化MQTT连接对象",
			Args: {
				_Return_: "void",
				clientId: "{String} clientId-用户终端ID",
				ip: "{String} ip-连接地址",
				mqtt_port: "{String} mqtt_port-端口号"
			},
			Example: "hwMSC.MQTTInitHost('4562','http//:192.168.1.123','8000')"
		},
		MQTTInit: {
			Description: "MQTT客户端初始化",
			Prototype: "MQTTInit (clientId)",
			Name: "MQTT客户端初始化",
			Args: {
				_Return_: "{object} hwMqttClient 返回消息对象",
				clientId: "{string/number} clientId-用户终端ID"
			},
			Example: "hwMSC.MQTTInit('4562')"
		},
		MQTTConnect: {
			Description: "MQTT客户端连接",
			Prototype: "MQTTConnect(hwMqttClient,timeout,keepAliveInterval,onConnect,onFailure,onMessageArrived,nConnectionLost)",
			Name: "MQTT客户端连接",
			Args: {
				_Return_: "{void} ",
				hwMqttClient: "{Object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient",
				timeout: "{number} timeout-连接超时时间 默认为30秒",
				keepAliveInterval: "{number} keepAliveInterval-心跳连接时间 默认为60秒  这里默认设置为10",
				onConnect: "{function} onConnect-连接成功回调",
				onFailure: "{function} onFailure-连接失败回调",
				onMessageArrived: "{function} onMessageArrived-接收消息回调",
				nConnectionLost: "{function} nConnectionLost-连接断开回调"
			},
			Example: "hwMSC.MQTTConnect(hwMqttClient,'40','20',\n function(){},\n function(){},\n function(){},\n function(){}"
		},
		MQTTDisconnect: {
			Description: "MQTT客户端连接断开",
			Prototype: "MQTTDisconnect(hwMqttClient)",
			Name: "MQTT客户端连接断开",
			Args: {
				_Return_: "{void} ",
				hwMqttClient:"{object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient"
			},
			Example: "hwMSC.MQTTDisconnect(hwMqttClient)"
		},
		MQTTSubscribe: {
			Description: "MQTT订阅主题",
			Prototype: "MQTTSubscribe(hwMqttClient,topicId,qos,onSubSuccess,onSubError)",
			Name: "MQTT订阅主题",
			Args: {
				_Return_: "{void} ",
				hwMqttClient: "{object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient",
				topicName: "{String} topicName-订阅主题ID  --不可为空",
				qos: "{number} qos-消息发送等级   不传设置为2  通常采用 2 \n" +
					" 		0 --  发送者只发送一次消息，不进行重试\n" +
					"      1--   发送者最少发送一次消息，确保消息到达Broker，Broker需要返回确认消息PUBACK\n" +
					"      2--   使用两阶段确认来保证消息的不丢失和不重复。",
				onSubSuccess: "{Function} onSubSuccess-订阅成功回调",
				onSubSuccess: "{Function} onSubSuccess-订阅失败回调"
			},
			Example: "hwMSC.MQTTSubscribe(hwMqttClient,'4144','2',\n function(result){},\n function(mgs){})"
		},
		MQTTUnSubscribe: {
			Description: "MQTT取消订阅主题",
			Prototype: "MQTTUnSubscribe(clientId,subscriberName,function(result){},function(mgs){})",
			Name: "MQTT取消订阅主题",
			Args: {
				_Return_: "{void} ",
				hwMqttClient: "{object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient",
				topicId: "{String} topicId -要取消的主题",
				unSubSuccess: "{Function} unSubSuccess-成功回调",
				unSubError: "{Function} unSubError-失败回调"
			},
			Example: "hwMSC.cancelSub('4562','user',\n function(result){},\n function(mgs){})"
		},
		MQTTSendMsg: {
			Description: "消息发送",
			Prototype: "MQTTSendMsg(hwMqttClient,topicId,msgStr)",
			Name: "消息发送",
			Args: {
				_Return_: "{void} ",
				hwMqttClient: "{Object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient  --不可为空",
				topicId: "{String} topicId -订阅主题ID  发送的主题--不可为空",
				msgStr: "{String} msgStr-要发送的消息  字符串"
			},
			Example: "hwMSC.MQTTSendMsg(hwMqttClient,'3643','发送的新消息')"
		},
		subTopic: {
			Description: "订阅主题",
			Prototype: "subTopic(clientId,subscriberName,topicName,selector,function(result){},function(mgs){})",
			Name: "订阅主题",
			Args: {
				_Return_: "{void} ",
				clientId: "{String} clientId-客户端id",
				subscriberName: "{String} subscriberName-订阅者名称",
				topicName: "{String} topicName-订阅主题名称",
				selector: "{Function} selector-选择器，用来过滤消息,可传空值",
				successback: "{Function} successback-成功回调",
				successback: "{Function} successback-失败回调"
			},
			Example: "hwMSC.subTopic('4562','user','新主题','',\n function(result){},\n function(mgs){})"
		},
		cancelSub: {
			Description: "取消订阅主题",
			Prototype: "cancelSub(clientId,subscriberName,function(result){},function(mgs){})",
			Name: "取消订阅主题",
			Args: {
				_Return_: "{void} ",
				clientId: "{String} clientId-客户端id",
				subscriberName: "{String} subscriberName-订阅者名称",
				successback: "{Function} successback-成功回调",
				successback: "{Function} successback-失败回调"
			},
			Example: "hwMSC.cancelSub('4562','user',\n function(result){},\n function(mgs){})"
		},
		getTopicInfo: {
			Description: "主题详情查看",
			Prototype: "getTopicInfo(topicId,function(result){},function(mgs){})",
			Name: "主题详情查看",
			Args: {
				_Return_: "{void} ",
				topicId: "{String} topicId-主题id",
				successback: "{Function} successback-成功回调",
				successback: "{Function} successback-失败回调"
			},
			Example: "hwMSC.getTopicInfo('51156654',\n function(result){},\n" +
				"function(mgs){})"
		},
		taskTodoGet: {
			Description: "获取待办",
			Prototype: "taskTodoGet(user,userSentry,page,pageSize,successback,errorback)",
			Name: "获取待办",
			Args: {
				_Return_: "{void} ",
				user: "{String} user-当前用户",
				userSentry: "{String} userSentry-当前用户岗位",
				page: "{int} page-第几页",
				pageSize: "{int} pageSize-每页条数",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "hwMSC.taskTodoGet('','',1,0, function(result){},\n" +
				"function(mgs){})"
		},
		taskDoGet: {
			Description: "获取已办",
			Prototype: "taskDoGet(user,page,pageSize,successback,errorback)",
			Name: "获取已办",
			Args: {
				_Return_: "{void} ",
				user: "{String} user-当前用户",
				page: "{int} page-第几页",
				pageSize: "{int} pageSize-每页条数",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "hwMSC.taskDoGet('',1,0, function(result){},\n" +
				"function(mgs){})"
		}
	}
}
ControlsDataManage._add(Data_hwMSC);

var Data_hwLGC = {
	BaseType: "",
	Type: "vmdHwLGC",
	Property: {},
	Method: {
		init: {
			Description: "初始化日志中心",
			Prototype: "init(ip, mqtt_port, host,appid,appkey)",
			Name: "初始化日志中心",
			Args: {
				_Return_: "return {void}",
				ip: "{String} ip-日志中心地址ip",
				port: "{String} port-日志中心地址端口",
				host: "{String} host-日志中心地址",
				appid: "{String} appid-应用id",
				appkey: "{String} appkey-应用key"
			},
			Example: "init('192.168.1.188','8888','192.168.1.188:8888','appid','appkey')"
		},
		postMsgJson: {
			Description: "post形式的请求",
			Prototype: "postMsgJson (func, args, successback, errorback) ",
			Name: "post形式的请求",
			Args: {
				_Return_: "return {void}",
				func: "{Function} func-要执行的方法名",
				args: "{string} args-方法需要的参数，字符串形式",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "postMsgJson('funcname','funcargs',function(){},function(){})"
		},
		logPush: {
			Description: "写入日志",
			Prototype: "logPush (obj, successback, errorback) ",
			Name: "写入日志",
			Args: {
				_Return_: "return {void}",
				obj: "{object} obj-日志数据对象",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "logPush('日志信息','function(){},function(){})"
		}
	}
}
ControlsDataManage._add(Data_hwLGC);

var Data_hwDMC = {
	BaseType: "",
	Type: "vmdHwDMC",
	Property: {},
	Method: {
		'docinfo.get': {
			Description: "获取文档信息",
			Prototype: "docinfo.get(docid, successback, errorback)",
			Name: "获取文档信息",
			Args: {
				_Return_: "return {void}",
				docid: "{String} docid-文档id",
				successback: "{function} successback-成功回调",
				errorback: "{function} errorback-失败回调"
			},
			Example: 'hwDMC.docinfo.get(\'文档id\', function(){}, function(){})'
		},
		'docinfo.add': {
			Description: "添加文档信息",
			Prototype: "docinfo.add(datas, successback, errorback)",
			Name: "添加文档信息",
			Args: {
				_Return_: "return {void}",
				datas:"{object} datas-文档信息",
				successback:"{function} successback-成功回调",
				errorback:"{function} errorback-失败回调"
			},
			Example: 'docinfo.add(\'文档信息\', function(){}, function(){})'
		},
		'docinfo.edit': {
			Description: "添加文档信息",
			Prototype: "docinfo.edit(datas, successback, errorback)",
			Name: "添加文档信息",
			Args: {
				_Return_: "return {void}",
				datas:"{object} datas-文档信息",
				successback:"{function} successback-成功回调",
				errorback:"{function} errorback-失败回调"
			},
			Example: 'docinfo.edit(\'文档信息\', function(){}, function(){})'
		},
		'docinfo.del': {
			Description: "删除文档信息",
			Prototype: "docinfo.del(docid, successback, errorback)",
			Name: "删除文档信息",
			Args: {
				_Return_: "return {void}",
				docid:"{object} docid-文档id",
				successback:"{function} successback-成功回调",
				errorback:"{function} errorback-失败回调"
			},
			Example: 'hwDMC.docinfo.del(\'文档id\', function(){}, function(){})'
		},
		'docinfo.getdocinfobyidandname': {
			Description: "根据文档名称和id得到相关信息",
			Prototype: "docinfo.getdocinfobyidandname(nodeid, docname, successback, errorback)",
			Name: "根据文档名称和id得到相关信息",
			Args: {
				_Return_: "return {void}",
				nodeid:"{object} nodeid-文档id",
			docname:"{object} docname-文档name",
			successback:"{function} successback-成功回调",
			errorback:"{function} errorback-失败回调"
			},
			Example: 'hwDMC.docinfo.getdocinfobyidandname(\'文档id\', \'文档name\',function(){}, function(){})'
		},
		'docinfo.getdocparentpath': {
			Description: "获取文档的上级路径",
			Prototype: "docinfo.getdocparentpath(nodeid, successback, errorback)",
			Name: "获取文档的上级路径",
			Args: {
				_Return_: "return {void}",
				nodeid:"{object} nodeid-文档id",
			successback:"{function} successback-成功回调",
			errorback:"{function} errorback-失败回调"
			},
			Example: 'hwDMC.docinfo.getdocparentpath(\'文档id\', function(){}, function(){})'
		},
		'docinfo.getdocNodeid': {
			Description: "获取文档的目录",
			Prototype: "docinfo.getdocNodeid(docid, successback, errorback)",
			Name: "获取文档的目录",
			Args: {
				_Return_: "return {void}",
				nodeid:"{object} docid-文档id",
			successback:"{function} successback-成功回调",
			errorback:"{function} errorback-失败回调"
			},
			Example: 'hwDMC.docinfo.getdocNodeid(\'文档id\', function(){}, function(){})'
		}
	}
}
ControlsDataManage._add(Data_hwDMC);

var Data_hwAMC = {
	BaseType: "",
	Type: "vmdHwAMC",
	Property: {},
	Method: {
		getappinfo: {
			Description: "获取应用信息",
			Prototype: "getappinfo(sw_application_id, successback, errorback)",
			Name: "获取应用信息",
			Args: {
				_Return_: "return {void}",
				sw_application_id: "{String} sw_application_id-用户id",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "getappinfo('用户id','function(){},function(){})"
		}
	}
}
ControlsDataManage._add(Data_hwAMC);

var Data_hwEMC = {
	BaseType: "",
	Type: "vmdHwEMC",
	Property: {},
	Method: {
		getentitlementinfo: {
			Description: "获取权限信息",
			Prototype: "getentitlementinfo (entitlement_id, successback, errorback)",
			Name: "获取权限信息",
			Args: {
				_Return_: "return {void}",
				entitlement_id: "{String} entitlement_id-权限id",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "getappinfo('权限id','function(){},function(){})"
		},
		getentitlement_comp_app: {
			Description: "获取权限下模块列表",
			Prototype: "getentitlement_comp_app (entitlement_id, successback, errorback)",
			Name: "获取权限下模块列表",
			Args: {
				_Return_: "return {void}",
				entitlement_id: "{String} entitlement_id-权限id",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "getentitlement_comp_app('权限id','function(){},function(){})"
		},
		getentitlementbyuser: {
			Description: "获取权限列表",
			Prototype: "getentitlementbyuser ( successback, errorback)",
			Name: "获取权限列表",
			Args: {
				_Return_: "return {void}",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "getentitlementbyuser('function(){},function(){})"
		},
		checkentitlement: {
			Description: "核实权限是否存在",
			Prototype: "checkentitlement (entitlement_id， successback, errorback)",
			Name: "核实权限是否存在",
			Args: {
				_Return_: "return {void}",
				entitlement_id: "{string} entitlement_id-权限id",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "checkentitlement('权限id','function(){},function(){})"
		},
		getentitlementcompfuc: {
			Description: "获取应用权限",
			Prototype: "getentitlementcompfuc (sw_application_id， successback, errorback)",
			Name: "获取应用权限",
			Args: {
				_Return_: "return {void}",
				sw_application_id: "{string} sw_application_id-应用id",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "getentitlementcompfuc('应用id','function(){},function(){})"
		}
	}
}
ControlsDataManage._add(Data_hwEMC);

var Data_hwTDC = {
	BaseType: "",
	Type: "vmdHwTDC",
	Property: {},
	Method: {
		taskTodoGet: {
			Description: "获取待办",
			Prototype: "taskTodoGet(user,userSentry,page,pageSize,successback,errorback)",
			Name: "获取待办",
			Args: {
				_Return_: "{void} ",
				user: "{String} user-当前用户",
				userSentry: "{String} userSentry-当前用户岗位",
				page: "{int} page-第几页",
				pageSize: "{int} pageSize-每页条数",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "taskTodoGet('','',1,0, function(result){},\n" +
				"function(mgs){})"
		},
		taskDoGet: {
			Description: "获取已办",
			Prototype: "taskDoGet(user,page,pageSize,successback,errorback)",
			Name: "获取已办",
			Args: {
				_Return_: "{void} ",
				user: "{String} user-当前用户",
				page: "{int} page-第几页",
				pageSize: "{int} pageSize-每页条数",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "taskDoGet('',1,0, function(result){},\n" +
				"function(mgs){})"
		},
		taskHistoryGet: {
			Description: "查询审批历程",
			Prototype: "taskHistoryGet(flow_inst_id, business_key, successback, errorback)",
		Name: "查询审批历程",
		Args: {
			_Return_: "{void} ",
			flow_inst_id: "{String} flow_inst_id-工作流实例Id",
			business_key: "{String} business_key-业务主键",
			successback: "{Function} successback-成功回调",
			errorback: "{Function} errorback-失败回调"
		},
		Example: "taskHistoryGet('工作流实例Id','业务主键',successback,errorback)"
	},
	taskInfoGet: {
		Description: "查询待办详情",
		Prototype: "taskInfoGet(task_id, flow_task_id, successback, errorback)",
		Name: "查询待办详情",
		Args: {
			_Return_: "return {void}",
			task_id: "{String} task_id-任务id",
			flow_task_id: "{String} flow_task_id-工作流实例Id",
			successback: "{Function} successback-成功回调",
			errorback: "{Function} errorback-失败回调"
		},
		Example: "taskInfoGet('任务id','工作流实例Id',successback,errorback)"
	}
}
}
ControlsDataManage._add(Data_hwTDC);

var Data_hwUMC = {
	BaseType: "",
	Type: "vmdHwUMC",
	Property: {},
	Method: {
		getuserinfo: {
			Description: "获取用户信息",
			Prototype: "getuserinfo(employee_ba_id, successback, errorback)",
			Name: "获取用户信息",
			Args: {
				_Return_: "{void} ",
				employee_ba_id: "{String} employee_ba_id-用户id",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "hwUMC.getuserinfo('用户id',successback,errorback)"
		},
		getuserinfobyunit: {
			Description: "获取单位下用户信息",
			Prototype: "getuserinfobyunit(org_ba_id, name, successback, errorback)",
			Name: "获取单位下用户信息",
			Args: {
				_Return_: "{void} ",
				org_ba_id: "{String} org_ba_id-单位id",
				name: "{String} name-用户名称（模糊查询用）",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: " hwUMC.getuserinfobyunit('单位id','用户名称',successback,errorback)"
		},
		getuserposition: {
			Description: "查询用户岗位",
			Prototype: "getuserposition(successback,errorback)",
			Name: "查询用户岗位",
			Args: {
				_Return_: "{void} ",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "hwUMC.getuserposition(successback,errorback)"
		},
		getuserunit: {
			Description: "查询用户所属单位",
			Prototype: "getuserunit( successback, errorback)",
			Name: "查询用户所属单位",
			Args: {
				_Return_: "return {void}",
				successback: "{Function} successback-成功回调",
				errorback: "{Function} errorback-失败回调"
			},
			Example: "hwUMC.getuserunit(successback,errorback)"
		}
	}
}
ControlsDataManage._add(Data_hwUMC);



/////////////////////////////////////////////////////////////////////////////////////////
//Panel
/////////////////////////////////////////////////////////////////////////////////////////
var Data_vmdPanel = {
	BaseType: "Container",
	Type: "panel",
	Property: {
        autoLoad: {
            Description: "若autoLoad非null，面板会尝试在渲染后立即加载内容。同时该面板body元素的默认URL属性就是这URL，所以可随时调用refresh的方法。",
            Prototype: "Object/String/Function  autoLoad",
            Name:"自动加载",
            Args: {
                _Return_: "Object/String/Function   "
            },
            Example: ""
        },
        autoScroll: {
            Description: "True表示为在面板body元素上，设置overflow：'auto'和出现滚动条false表示为裁剪所有溢出的内容（默认为false）。",
            Prototype: "Boolean  autoScroll",
            Name:"滚动条",
            Args: {
                _Return_: "Boolean "
            },
            Example: ""
        },
        baseCls: {
            Description: "作用在面板元素上的CSS样式类 （默认为 'x-panel'）。",
            Prototype: "String  baseCls",
            Name:"通用样式类名",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        bbar: {
            Description: "作用在面板元素上的CSS样式类 （默认为 'x-panel'）。",
            Prototype: "String  baseCls",
            Name:"样式类名",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        bodyBorder: {
            Description: "True表示为显示出面板body元素的边框，false则隐藏（缺省为true），只有border == true时有效。若border == true and bodyBorder == false，边框则为1px宽，可指定整个body元素的内置外观。",
            Prototype: "Boolean   bodyBorder",
            Name:"body边框",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        bodyStyle: {
            Description: "制定body元素的CSS样式",
            Prototype: "String/Object/Function    bodyStyle",
            Name:"body样式",
            Args: {
                _Return_: "String/Object/Function "
            },
            Example: ""
        },
        border: {
            Description: "True表示为显示出面板body元素的边框，false则隐藏（缺省为true），默认下，边框是一套2px宽的内边框，但可在bodyBorder中进一步设置。",
            Prototype: "Boolean  border",
            Name:"边框",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        padding: {
            Description: "容器填充的内边距",
            Prototype: "String  padding",
            Name:"内边距",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        margins: {
            Description: "容器与容器之间的距离（外边距）",
            Prototype: " String  margin",
            Name:"外边距",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        region: {
            Description: "面板所处位置，值为'north'，'south'，'west'，'east'，'center'",
            Prototype: "String region",
            Name:"位置",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        buttonAlign: {
            Description: "在此面板上的按钮的对齐方式,有效值是'right,' 'left' and 'center'（默认为 'right'）。",
            Prototype: "String   buttonAlign",
            Name:"按钮对齐方式",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
        buttons: {
            Description: "在面板底部加入按钮",
            Prototype: "Array buttons",
            Name:"按钮",
            Args: {
                _Return_: "Array"
            },
            Example: ""
        },
        // collapseFirst: {
        //     Description: "True 表示为展开/闭合的轮换按钮出现在面板头部的左方,false表示为在右方（默认为true）。",
        //     Prototype: "Boolean   collapseFirst",
        //     Args: {
        //         _Return_: "Boolean "
        //     },
        //     Example: ""
        // },
        collapsed: {
            Description: "True 表示为渲染面板后即闭合（默认为false）。",
            Prototype: "Boolean   collapsed",
            Name:"闭合",
            Args: {
                _Return_: "Boolean "
            },
            Example: ""
        },
        collapsedCls: {
            Description: "当面板闭合时，面板元素的CSS样式类 （默认为 'x-panel-collapsed'）。",
            Prototype: "String collapsedCls ",
            Name:"闭合样式类",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        collapsible: {
            Description: "True表示为面板是可收缩的，并自动渲染一个展开/收缩的轮换按钮在头部工具条。false表示为保持面板为一个静止的尺寸（缺省为false）。",
            Prototype: "Boolean collapsible",
            Name:"可收缩",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        // contentEl: {
        //     Description: "用现有HTML节点的内容作为面板body的内容（缺省为''）。面板的afterRender方法负责了此HTML元素的加入到面板body中去。该部分的内容又比HTML的显示位置而居后，所以render事件触发的时刻document还没有所说的HTML内容。",
        //     Prototype: "String  contentEl ",
        //     Args: {
        //         _Return_: "String "
        //     },
        //     Example: ""
        // },
        // draggable: {
        //     Description: " True表示为激活此面板的拖动（默认为false）。 ",
        //     Prototype: "Boolean draggable ",
        //     Args: {
        //         _Return_: "Boolean"
        //     },
        //     Example: "new Ext.Panel({   \n" +
        //     "    title: 'Drag me',  \n" +
        //     "    x: 100,  \n" +
        //     "    y: 100,  \n" +
        //     "    renderTo: Ext.getBody(),  \n" +
        //     "    floating: true,  \n" +
        //     "    frame: true,  \n" +
        //     "    width: 400,  \n" +
        //     "    height: 200,  \n" +
        //     "    draggable: {   \n" +
        //     "//      类Ext.Panel.DD的配置。Config option of Ext.Panel.DD class.  \n" +
        //     "//      如果是浮动的面板， 原始位置上不显示容器的代理元素。It's a floating Panel,so do not show a placeholder proxy in the original position.   \n" +
        //     "        insertProxy: false,  \n" +
        //     "//      当拖动DD对象时mousemove事件均会调用。Called for each mousemove event while dragging the DD object.   \n" +
        //     "        onDrag : function(e){   \n" +
        //     "//          记录拖动代理的x、y位置，好让Panel最终能定位。Record the x,y position of the drag proxy so that we can   \n" +
        //     "//          position the Panel at end of drag.   \n" +
        //     "            var pel = this.proxy.getEl();   \n" +
        //     "            this.x = pel.getLeft(true);   \n" +
        //     "            this.y = pel.getTop(true);   \n" +
        //     "//          出现投影的话一定保证其对其。Keep the Shadow aligned if there is one.   \n" +
        //     "            var s = this.panel.getEl().shadow;   \n" +
        //     "            if (s) {   \n" +
        //     "                s.realign(this.x,this.y,pel.getWidth(),pel.getHeight());   \n" +
        //     "            }   \n" +
        //     "        },  \n" +
        //     "//       mouseup事件触发时发生。Called on the mouseup event.   \n" +
        //     "        endDrag : function(e){   \n" +
        //     "            this.panel.setPosition(this.x,this.y);   \n" +
        //     "        }   \n" +
        //     "    }   \n" +
        //     "}).show();"
        // },

        // elements: {
        //     Description: "面板渲染后，要初始化面板元素的列表，用逗号分隔开。正常情况下，该列表会在面板读取配置的时候就自动生成，假设没有进行配置，但结构元素有更新渲染的情况下， 就可根据指值得知结构元素是否已渲染的（例如，你打算在面板完成渲染后动态加入按钮或工具条）。加入此列表中的这些元素后就在渲染好的面板中分配所需的载体（placeholders）。有效值是：   \n" +
        //     "header    \n" +
        //     "tbar (top bar)   \n" +
        //     "body    \n" +
        //     "bbar (bottom bar)   \n" +
        //     "footer    \n" +
        //     "缺省为'body'. Defaults to 'body'. ",
        //     Prototype: " String elements ",
        //     Args: {
        //         _Return_: " String "
        //     },
        //     Example: ""
        // },
        floating: {
            Description: " True表示为浮动此面板（带有自动填充和投影的绝对定位），false表示为在其渲染的位置就近 显示（默认为false）",
            Prototype: "Boolean floating ",
            Name:"浮动",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        footer: {
            Description: " True表示为显式建立底部元素，false则是跳过创建。缺省下，就算不声明创建底部，若有一个或一个以上的按钮加入到面板的话，也创建底部，不指定按钮就不会生成。",
            Prototype: "Boolean footer ",
            Name:"显示页脚",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        footerCfg: {
            Description: "面板footer元素的结构，符合DomHelper配置的格式。",
            Prototype: " Object footerCfg ",
            Name:"页脚结构",
            Args: {
                _Return_: " Object "
            },
            Example: ""
        },
        frame: {
            Description: " True表示为面板的边框外框可自定义的，false表示为边框可1px的点线（默认为false）。 ",
            Prototype: "Boolean frame ",
            Name:"自定义边框",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        header: {
            Description: " True表示为显式建立头部元素，false则是跳过创建。缺省下，如不创建头部，将使用title的内容设置到头部去，如没指定title则不会。如果设置好title，但头部设置为false，那么头部亦不会生成。 ",
            Prototype: "Boolean header ",
            Name:"显示头部",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        headerAsText: {
            Description: " True表示为显示面板头部的标题（默认为 true）。",
            Prototype: "Boolean headerAsText ",
            Name:"头部标题",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        headerCfg: {
            Description: " 面板header元素的结构，符合DomHelper配置的格式。",
            Prototype: " Object headerCfg ",
            Name:"头部结构",
            Args: {
                _Return_: " Object "
            },
            Example: ""
        },
        hideCollapseTool: {
            Description: " True表示为不显示 展开/收缩的轮换按钮，当collapsible = true，false就显示（默认为false）。 ",
            Prototype: "Boolean hideCollapseTool ",
            Name:"隐藏收缩按钮",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        html: {
            Description: " 一段HTML片段，或DomHelper配置项作为面板body内容（默认为 ''）。面板的afterRender方法负责HTML内容的加入这一过程，所以render事件触发的时刻document还没有所说的HTML内容。该部分的内容又比contentEl的显示位置而居前。 ",
            Prototype: " String/Object html ",
            Args: {
                _Return_: " String/Object "
            },
            Example: ""
        },
        iconCls: {
            Description: " 一个能提供背景图片的CSS样式类，用于面板头部的图标：（默认为''）。",
            Prototype: " String iconCls ",
            Name:"背景图片样式类",
            Args: {
                _Return_: " String "
            },
            Example: " 自定义图标的样式的示例：   \n" +
            "     iconCls: 'my-icon'   \n" +
            "// 利用css背景图说明图标文件是哪一个。   \n" +
            ".my-icon { background-image: url(../images/my-icon.gif) 0 6px no-repeat !important; }"
        },

        // keys: {
        //     Description: " KeyMap的配置项对象,可用于将key分配到此面板（缺省为null）。",
        //     Prototype: " Object/Array keys ",
        //     Args: {
        //         _Return_: " Object/Array "
        //     },
        //     Example: ""
        // },
        maskDisabled: {
            Description: " True表示为当面板不可用时进行遮罩（默认为true）。当面板禁用时，总是会告知下面的元素亦要禁用，但遮罩是另外一种方式同样达到禁用的效果。",
            Prototype: "Boolean maskDisabled ",
            Name:"遮罩",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        minButtonWidth: {
            Description: " 此面板上按钮的最小宽度（默认为75）。 ",
            Prototype: " Number minButtonWidth ",
            Name:"按钮最小宽度",
            Args: {
                _Return_: " Number "
            },
            Example: ""
        },
        // shadow: {
        //     Description: " True 表示为在面板后显示投影效果（默认为'sides'四边）。注意此项只当floating = true时有效。 ",
        //     Prototype: " Boolean/String shadow ",
        //     Args: {
        //         _Return_: " Boolean/String "
        //     },
        //     Example: ""
        // },
        shadowOffset: {
            Description: " 投影偏移的象素值（默认为4）。注意此项只当floating = true时有效。",
            Prototype: " Number shadowOffset ",
            Name:"投影偏移量",
            Args: {
                _Return_: " Number "
            },
            Example: ""
        },
        // shim: {
        //     Description: " False表示为禁止用iframe填充，有些浏览器可能需要设置（默认为true）。注意此项只当floating = true时有效。 ",
        //     Prototype: "Boolean shim ",
        //     Args: {
        //         _Return_: "Boolean"
        //     },
        //     Example: ""
        // },
        tabTip: {
            Description: " tooltip的innerHTML字符串（也可以html标签），当鼠标移至tab时会显示 ",
            Prototype: " String tabTip ",
            Name:"鼠标移入提示",
            Args: {
                _Return_: " String "
            },
            Example: ""
        },
        // tbar: {
        //     Description: " 面板顶部的工具条。此项可以是Ext.Toolbar的实例、工具条的配置对象，或由按钮配置项对象构成的数组，以加入到工具条中。注意，此项属性渲染过后就不可用了，应使用getTopToolbar的方法代替。 ",
        //     Prototype: " Object/Array tbar ",
        //     Args: {
        //         _Return_: " Object/Array "
        //     },
        //     Example: ""
        // },

        title: {
            Description: " 显示在面板头部的文本标题(默认为'')。如有指定了titile那么头部元素header会自动生成和显示，除非header强制设为false。如果你不想在写配置时指定好title， 不过想在后面才加入的话，你必须先指定一个非空的标题（具体说是空白字符''亦可或header：true），这样才保证容器元素生成出来。",
            Prototype: " String title ",
            Name:"标题",
            Args: {
                _Return_: " String "
            },
            Example: ""
        },
        titleCollapse: {
            Description: "True表示为允许单击头部区域任何一个位置都可收缩面板（当collapsible = true）反之只允许单击工具按钮（默认为false）。 ",
            Prototype: "Boolean titleCollapse ",
            Name:"点击头部收缩",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        toolTemplate: {
            Description: " 位于header中的tools其模板是什么。new Ext.Template('<div class=”x-tool x-tool-{id}”>&#160;</div>')重写时，或者这是一个复杂的XTemplate。模板数据就是一给单独的配置对象而不会是一个数组，这点要与tools比较。",
            Prototype: " Ext.Template/Ext.XTemplate toolTemplate ",
            Name:"tool模板",
            Args: {
                _Return_: " Ext.Template/Ext.XTemplate "
            },
            Example: "var win = new Ext.Window({   \n" +
            "   tools: [{   \n" +
            "      id: 'download',  \n" +
            "       href: '/MyPdfDoc.pdf'   \n" +
            "   }],  \n" +
            "   toolTemplate: new Ext.XTemplate(  \n" +
            "       '<tpl if=”id==\'download\'”>',  \n" +
            "           '<a class=”x-tool x-tool-pdf” href=”{href}”></a>',  \n" +
            "       '</tpl>',  \n" +
            "       '<tpl if=”id!=\'download\'”>',  \n" +
            "           '<div class=”x-tool x-tool-{id}”>&#160;</div>',  \n" +
            "       '</tpl>'   \n" +
            " ),  \n" +
            "   width:500,  \n" +
            "   height:300,  \n" +
            "   closeAction:'hide'   \n" +
            "});   \n" +
            "注意 \n" +
            "x - tool - pdf 样式必须要对应好样式的定义，提供合适背景图片。"
        },
        tools: {
            Description: "一个按钮配置组成的数组，加入到头部的工具条区域。渲染过程中，每一项工具都保存为Element对象，都集中保存在属性tools.<tool-type>之中。",
            Prototype: " Array tools ",
            Name:"按钮配置",
            Args: {
                _Return_: " Array "
            },
            Example: " tools:[{   \n" +
            "    id:'refresh',  \n" +
            "    qtip: 'Refresh form Data',  \n" +
            "    // hidden:true,  \n" +
            "    handler: function(event,toolEl,panel){   \n" +
            "        // refresh logic   \n" +
            "    }   \n" +
            "},  \n" +
            "{   \n" +
            "    id:'help',  \n" +
            "    qtip: 'Get Help',  \n" +
            "    handler: function(event,toolEl,panel){   \n" +
            "        // whatever   \n" +
            "    }   \n" +
            "}]   \n" +
            "注意面板关闭时的轮换按钮（toggle tool）的实现是分离出去，这些工具按钮只提供视觉上的按钮。所需的功能必须由事件处理器提供以实现相应的行为。"
        },
        unstyled: {
            Description: " 不带样式渲染面板。 ",
            Prototype: "Boolean unstyled ",
            Name:"携带样式",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        labelAlign : {
            Description: "有效值为'left','top' 和 'right' (默认为'left')。该属性级联于没有设定此属性的子容器",
            Prototype: "String",
            Name:"对齐方式",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        labelWidth : {
            Description: "标签的宽度。该属性级联于子容器",
            Prototype: "Number",
            Name:"标签宽度",
            Args: {
                _Return_: "Number"
            },
            Example: ""
        },
        labelPad : {
            Description: "字段标签的默认填充（以像素为单位）（默认为5）",
            Prototype: "labelPad : Number",
            Name:"标签内边距",
            Args: {
                _Return_: "Number"
            },
            Example: ""
        },
        labelSeparator: {
            Description: "要在每个fieldLabel的文本后显示的分隔 符。可以在各种级别配置此属性。优先顺序是：\n" +
            "\n" +
            "字段/组件级别\n" +
            "容器级别\n" +
            "布局级别（默认为冒号'：'）\n" +
            "要为此字段的标签不显示分隔符，请指定空字符串''。\n",
            Prototype: "labelSeparator：String ",
            Name:"分隔符",
            Args: {
                _Return_: "Number"
            },
            Example: ""
        }

	},
	Method: {
		addButton: {
			Description: "为面板添加按钮。注意必须在渲染之前才可以调用该方法。最佳的方法是通过buttons的配置项添加按钮",
			Prototype: "addButton(config,handler,[scope]) ",
            Name:"添加按钮",
			Args: {
				_Return_: "Ext.Button 已添加的按钮",
				config: "String/Object 合法的Ext.Button配置项对象。若字符类型就表示这是按钮的提示文字",
				handler: "Function 按钮被按下时执行的函数，等同Ext.Buttonclick",
				scope: "Object 按钮触发时的事件处理函数所在作用域"
			},
			Example: ""
		},
		collapse: {
			Description: "闭合面板body隐藏其内容。触发beforecollapse事件，如返回false则取消展开的动作",
			Prototype: "collapse(animate) ",
            Name:"闭合面板",
			Args: {
				_Return_: "Ext.Panel  this ",
				animate: "Boolean True表示为转换状态时出现动画，（默认为面板animCollapse的配置值）"
			},
			Example: ""
		},
		expand: {
			Description: "展开面板的主体部分，显示全部。这会触发beforeexpand的事件，若事件处理函数返回false那么这个方法将失效。",
			Prototype: "expand(animate)",
            Name:"展开面板",
			Args: {
				_Return_: "Ext.Panel  this ",
				animate: "Boolean True 表示为转换状态时出现动画（默认为面板animCollapse的配置值）"
			},
			Example: ""
		},
		getBottomToolbar: {
			Description: "返回面板底部区域的工具条",
			Prototype: "getBottomToolbar() ",
            Name:"获取工具条",
			Args: {
				_Return_: "Ext.Toolbar The toolbar对象",
				animate: "Boolean True 表示为转换状态时出现动画（默认为面板animCollapse的配置值）"
			},
			Example: ""
		},
		getFrameHeight: {
			Description: "返回面板框架元素的高度（包括顶部/底部工具条的高度）",
			Prototype: "getFrameHeight() ",
            Name:"获取框架高度",
			Args: {
				_Return_: "Number 框架高度"
			},
			Example: ""
		},
		getFrameWidth: {
			Description: "返回面板框架元素的宽度（不含body宽度）",
			Prototype: "getFrameWidth() ",
            Name:"获取宽度",
			Args: {
				_Return_: "Number 框架宽度"
			},
			Example: ""
		},
		getInnerHeight: {
			Description: "返回面板body元素的高度（不含任何框架元素）",
			Prototype: "getInnerHeight()  ",
            Name:"获取body元素高度",
			Args: {
				_Return_: "Number 高度"
			},
			Example: ""
		},
		getInnerWidth: {
			Description: "返回面板body元素的宽度（不含任何框架元素）",
			Prototype: "getInnerWidth() ",
            Name:"获取body元素宽度",
			Args: {
				_Return_: "Number 宽度"
			},
			Example: ""
		},
		getTool: {
			Description: "获取某个工具项的id",
			Prototype: "getTool(id) ",
            Name:"获取某个工具项的id",
			Args: {
				_Return_: "Object tool",
				id: "String "
			},
			Example: ""
		},
		getTopToolbar: {
			Description: "返回面板顶部区域的工具条",
			Prototype: "getTopToolbar() ",
            Name:"获取顶部工具条",
			Args: {
				_Return_: "Ext.Toolbar The toolbar对象"
			},
			Example: ""
		},
		// getUpdater: {
		// 	Description: "获取该面板的Ext.Updater",
		// 	Prototype: "getUpdater() ",
		// 	Args: {
		// 		_Return_: "Ext.Updater 对象。The Updater"
		// 	},
		// 	Example: ""
		// },
		// load: {
		// 	Description: "利用XHR的访问加载远程的内容，立即显示在面板中",
		// 	Prototype: "load(config)",
		// 	Args: {
		// 		_Return_: "Ext.Panel this",
		// 		config: "Object/String/Function  特定的配置项对象"
		// 	},
		// 	Example: "panel.load({   \n" +
		// 		"url: 'your - url.php ',  \n" +
		// 		"params: {param1: 'foo'',param2: 'bar'},// 或URL字符串，要已编码的。or a URL encoded string   \n" +
		// 		"callback: yourFunction,  \n" +
		// 		"scope: yourObject,// 回调函数的可选作用域 optional scope for the callback   \n" +
		// 		"discardUrl: false,  \n" +
		// 		"nocache: false,  \n" +
		// 		"text: 'Loading...',  \n" +
		// 		"timeout: 30,  \n" +
		// 		"scripts: false   \n" +
		// 		"});"
		// },
		setIconClass: {
			Description: "为该面板设置图标的样式类。此方法会覆盖当前现有的图标。",
			Prototype: "setIconClass(cls) ",
            Name:"设置图标样式类",
			Args: {
				_Return_: "void",
				cls: "String  新CSS样式类的名称"
			},
			Example: ""
		},
		setTitle: {
			Description: "设置面板的标题文本，你也可以在这里指定面板的图片（透过CSS样式类）",
			Prototype: "setTitle(title,[iconCls])",
            Name:"设置标题",
			Args: {
				_Return_: "void",
				title: "String 要设置的标题",
				iconCls: "String 定义该面板用户自定义的图标，这是一个CSS样式类的字符串。"
			},
			Example: ""
		},
		toggleCollapse: {
			Description: "根据面板的当前状态，采取相应的expand或collapse",
			Prototype: "toggleCollapse(animate) ",
            Name:"更改状态",
			Args: {
				_Return_: "•	Ext.Panel this",
				animate: "Boolean True 表示为转换状态时出现动画（默认为面板animCollapse的配置值）"
			},
			Example: ""
		}
	},
	Event: {
		titlechange: {
		    Description: "面板的 Name:\"获取某个工具项的id\",",
		    Prototype: "titlechange(p,t) ",
            Name:"获取某个工具项的id",
		    Args: {
		        _Return_: "",
		        p: "标题被改动的那个面板",
		        t:'新标题'
		    },
		    Example: ""
		}
	}
};
ControlsDataManage._add(Data_vmdPanel);

///////////////////////////////////////////////
//FormPanel
///////////////////////////////////////////////
var Data_vmdFormPanel={
	BaseType: "panel",
	Type: "form",
	Property: {
		formId : {
			Description: "FORM标签的id（默认是自动生成的）",
			Prototype: "String",
            Name:"表单id",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		labelAlign : {
			Description: "有效值为'left','top' 和 'right' (默认为'left')。该属性级联于没有设定此属性的子容器",
			Prototype: "String",
            Name:"对齐方式",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		labelWidth : {
			Description: "标签的宽度。该属性级联于子容器",
			Prototype: "Number",
            Name:"标签宽度",
			Args: {
				_Return_: "Number"
			},
			Example: ""
		},
		monitorPoll : {
			Description: "检验valid state的间隔毫秒数，如monitorValid非真则忽略该项（默认为200）",
			Prototype: "Number",
			Args: {
				_Return_: "Number"
			},
			Example: ""
		},
		monitorValid : {
			Description: "true表示为通过不断触发一个事件，来监视有效值的状态（在客户端进行）",
			Prototype: "Boolean ",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
        animCollapse: {
            Description: "True 表示为面板闭合过程附有动画效果（默认为true，在类 Ext.Fx 可用的情况下）。",
            Prototype: "Boolean  animCollapse",
            Name:"闭合动画",
            Args: {
                _Return_: "Boolean "
            },
            Example: ""
        }
	},
	Method: {
		getForm: {
			Description: "返回该面板包含的Form",
			Prototype: "getForm()",
            Name:"面板包含的Form",
			Args: {
				_Return_: "表单本身"
			},
			Example: ""
		},
		stopMonitoring: {
			Description: "停止监视该form的验证状态",
			Prototype: "stopMonitoring()",
            Name:"停止监视该form的验证状态",
			Args: {
				_Return_: "void"
			},
			Example: ""
		}
	},
	Event: {
		// clientvalidation: {
		//     Description: "如果配置项monitorValid为true，那么为通知验证的状态（valid state）该事件将不断地触发",
		//     Prototype: "vclientvalidation(sender,valid) ",
		//     Args: {
		//         _Return_: "",
		//         sender: "表单本身",
		//         valid:'Boolean'
		//     },
		//     Example: ""
		// }
	}
}
ControlsDataManage._add(Data_vmdFormPanel);

///////////////////////////////////////////////
//DIV
///////////////////////////////////////////////
var Data_vmdDiv = {
	BaseType: "Container",
	Type: "container",
	Property: {
        backgroundImage : {
            Description: "设置上传背景图片",
                Prototype: "backgroundImage String",
                Name:"背景图片",
                Args: {
                _Return_: ""
            },
            Example: ""
        },
        disableImage: {
            Description: "显示背景图片",
            Prototype: "disableImage  Boolean",
            Name:"限制背景图",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        backgroundRepeat: {
            Description: "图片是否重复，在X方向重复或者在Y方向重复",
            Prototype: "backgroundRepeat String",
            Name:"图片重复方式",
            Args: {
                _Return_: ""
            },
            Example: ""
        },
        backgroundPosition: {
            Description: "背景图片位置",
            Prototype: "backgroundPosition String",
            Name:"图片位置",
            Args: {
                _Return_: ""
            },
            Example: ""
        },
        border: {
            Description: "True表示为显示出容器的边框，false则隐藏（缺省为true）",
            Prototype: "Boolean  border",
            Name:"边框",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
    },
	Method: {},
	Event: {}
};
ControlsDataManage._add(Data_vmdDiv);

///////////////////////////////////////////////
//TabPanel
///////////////////////////////////////////////
var Data_vmdTabPanel = {
	BaseType: "panel",
	Type: "tabpanel",
	Property: {
		activeTab: {
			Description: "一个字符串或数字(索引)表示，渲染后就活动的那个tab（默认为没有）",
			Prototype: "String/Number",
            Name:"活动tab",
			Args: {
				_Return_: "String/Number"
			},
			Example: ""
		},
		animScroll: {
			Description: "True 表示为tab滚动时出现动画效果以使tab在视图中消失得更平滑（缺省为true）。只当 enableTabScroll = true时有效。",
			Prototype: "Boolean  ",
            Name:"滚动动画效果",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		// autoTabSelector: {
		// 	Description: "用于搜索tab的那个CSS选择符，当autoTabs时有效（默认为 'div.x-tab'）。此值可以是Ext.DomQueryselect的任意有效值。注意： 选择过程只会在tab的范围内进行（这样独立的话同一页面内多个tab就不会相冲突了）。",
		// 	Prototype: "String   ",
         //    Name:"活动tab",
		// 	Args: {
		// 		_Return_: "String  "
		// 	},
		// 	Example: ""
		// },
		autoTabs: {
			Description: "True 表示为查询DOM中任何带,'x-tab'样式类的div元素,转化为tab加入到此面板中（默认为false）。",
			Prototype: "Boolean  ",
            Name:"自动转换",
			Args: {
				_Return_: "Boolean "
			},
			Example: "var tabs = new Ext.TabPanel({ \n" +
				"applyTo: 'my-tabs',\n" +
				"activeTab: 0,\n" +
				"deferredRender: false,\n" +
				"autoTabs: true\n" +
				"});\n" +
				"// 这些装饰元素会按照以上的代码转换为TabPanel对象。This markup will be converted to a TabPanel from the code above\n" +
				"<div id=\"my-tabs\">\n" +
				"    <div class=\"x-tab\" title=\"Tab 1\">A simple tab</div>\n" +
				"    <div class=\"x-tab\" title=\"Tab 2\">Another one</div>\n" +
				"</div>\n"
		},
		// deferredRender: {
		// 	Description: "内置地，Tab面板是采用Ext.layout.CardLayout的方法管理tabs。此属性的值将会传递到布局的Ext.layout.CardLayoutdeferredRender配置值中， 以决定tab面板是否只有在第一次访问时才渲染（缺省为true）。",
		// 	Prototype: "Boolean  ",
		// 	Args: {
		// 		_Return_: "Boolean "
		// 	},
		// 	Example: ""
		// },
		enableTabScroll: {
			Description: "有时标签页会超出TabPanel的整体宽度。为防止此情况下溢出的标签页不可见，就需要将此项设为true以出现标签页可滚动的功能。只当标签页位于上方的位置时有效（默认为false）。",
			Prototype: "Boolean  ",
            Name:"标签页滚动条",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		itemTpl: {
			Description: "（可选的） 要处理候选栏上可点击的那些元素，应该在getTemplateArgs返回一个数据对像，",
			Prototype: "Template/XTemplate ",
			Args: {
				_Return_: " Template/XTemplate "
			},
			Example: ["new Ext.TabPanel({",
				"    renderTo: document.body,",
				"    minTabWidth: 115,",
				"    tabWidth: 135,",
				"    enableTabScroll: true,",
				"    width: 600,",
				"    height: 250,",
				"    defaults: {autoScroll:true},",
				"    itemTpl: new Ext.XTemplate(",
				"    \'&ltli class=\"{cls}\" id=\"{id}\" style=\"overflow:hidden\"&gt\',",
				"         \'&lttpl if=\"closable\"&gt\',",
				"            \'&lta class=\"x-tab-strip-close\" onclick=\"return false;\"&gt&lt/a&gt\',",
				"         \'&lt/tpl&gt\',",
				"         \'&lta class=\"x-tab-right\" href=\"#\" onclick=\"return false;\" style=\"padding-left:6px\"&gt\',",
				"            \'&ltem class=\"x-tab-left\"&gt\',",
				"                \'&ltspan class=\"x-tab-strip-inner\"&gt\',",
				"                    \'&ltimg src=\"{src}\" style=\"float:left;margin:3px 3px 0 0\"&gt\',",
				"                    \'&ltspan style=\"margin-left:20px\" class=\"x-tab-strip-text {iconCls}\"&gt{text} {extra}&lt/span&gt\',",
				"                \'&lt/span&gt\',",
				"            \'&lt/em&gt\',",
				"        \'&lt/a&gt\',",
				"    \'&lt/li&gt\'",
				"   ),",
				"    getTemplateArgs: function(item) {",
				"//      Call the native method to collect the base data. Like the ID!",
				"        var result = Ext.TabPanel.prototype.getTemplateArgs.call(this,item);",
				"//      Add stuff used in our template",
				"        return Ext.apply(result,{",
				"            closable: item.closable,",
				"            src: item.iconSrc,",
				"            extra: item.extraText || \'\'",
				"        });",
				"    },",
				"    items: [{",
				"        title: \'New Tab 1\',",
				"        iconSrc: \'../shared/icons/fam/grid.png\',",
				"        html: \'Tab Body 1\',",
				"        closable: true",
				"    },{",
				"        title: \'New Tab 2\',",
				"        iconSrc: \'../shared/icons/fam/grid.png\',",
				"        html: \'Tab Body 2\',",
				"        extraText: \'Extra stuff in the tab button\'",
				"    }]",
				"});"
			].join("\n")

		},
		// layoutOnTabChange: {
		// 	Description: "True表示为每当Tab切换时就绘制一次布局",
		// 	Prototype: "Boolean  ",
		// 	Args: {
		// 		_Return_: "Boolean "
		// 	},
		// 	Example: ""
		// },
		minTabWidth: {
			Description: "每张tab宽度的最小值，仅当resizeTabs = true有效（缺省为30）。",
			Prototype: "Number   ",
            Name:"最小宽度",
			Args: {
				_Return_: "Number  "
			},
			Example: ""
		},
		plain: {
			Description: "True表示为不渲染tab候选栏上背景容器图片（默认为false）。",
			Prototype: "Boolean  ",
            Name:"tab候选栏背景图片渲染",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		resizeTabs: {
			Description: "True表示为自动调整各个标签页的宽度，以便适应当前TabPanel的候选栏的宽度（默认为false）。",
			Prototype: "Boolean  ",
            Name:"自适应标签页宽度",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		// scrollDuration: {
		// 	Description: "每次滚动所产生动画会持续多久（单位毫秒，默认为0.35）。",
		// 	Prototype: "Float   ",
		// 	Args: {
		// 		_Return_: "Float  "
		// 	},
		// 	Example: ""
		// },
		// scrollIncrement: {
		// 	Description: "每次滚动按钮按下时，被滚动的标签页所移动的距离 （单位是像素，默认为100，若resizeTabs=true，那么默认值将是计算好的标签页宽度）。仅当enableTabScroll = true时有效。",
		// 	Prototype: "Number ",
		// 	Args: {
		// 		_Return_: "Number  "
		// 	},
		// 	Example: ""
		// },
		// scrollRepeatInterval: {
		// 	Description: "当标签页滚动按钮不停地被按下时，两次执行滚动的间隔的毫秒数（默认为400）。",
		// 	Prototype: "Number   ",
		// 	Args: {
		// 		_Return_: "Number  "
		// 	},
		// 	Example: ""
		// },
		tabCls: {
			Description: "此配置项应用于该Tab子组件的样式。 赋予各个候选栏的CSS样式，表示这是子组件。",
			Prototype: "String",
            Name:"子组件样式名",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		tabMargin: {
			Description: "此象素值参与大小调整和卷动时的运算，以计算空隙的象素值。如果你在CSS中改变了margin，那么这个值也要随着更改，才能正确地计算值（默认为2）。",
			Prototype: "Number   ",
            Name:"外边距",
			Args: {
				_Return_: "Number  "
			},
			Example: ""
		},
		tabPosition: {
			Description: "Tab候选栏渲染的位置（默认为 'top'）。其它可支持值是'bottom'。注意tab滚动（tab scrolling）只支持'top'的位置。",
			Prototype: "String    ",
            Name:"位置",
			Args: {
				_Return_: "String   "
			},
			Example: ""
		},
		tabWidth: {
			Description: "每一张新tab的初始宽度，单位为象素（缺省为120）。",
			Prototype: "Number   ",
            Name:"初始宽度",
			Args: {
				_Return_: "Number  "
			},
			Example: ""
		},
		// wheelIncrement: {
		// 	Description: "对于可滚动的tabs，鼠标滚轮翻页一下的步长值，单位为象素（缺省为20）。",
		// 	Prototype: "Number   ",
		// 	Args: {
		// 		_Return_: "Number  "
		// 	},
		// 	Example: ""
		// }
	},
	Method: {
		activate: {
			Description: "设置特定的tab为活动面板。此方法触发beforetabchange事件若返回false则取消tab切换。",
			Prototype: "activate(tab) ",
            Name:"设置活动面板",
			Args: {
				_Return_: "void",
				tab: "String/Panel " +
					"活动面板或其id。"
			},
			Example: ""
		},
		// beginUpdate: {
		// 	Description: "暂停一切内置的运算或卷动好让扩充操作（bulk operation）进行。",
		// 	Prototype: "beginUpdate()",
		// 	Args: {
		// 		_Return_: "void"
		// 	},
		// 	Example: ""
		// },
		// endUpdate: {
		// 	Description: "结束扩充操作（bulk operation）后，重新开始一切内置的运算或滚动效果。",
		// 	Prototype: "endUpdate()",
		// 	Args: {
		// 		_Return_: "void"
		// 	},
		// 	Example: ""
		// },
		getActiveTab: {
			Description: "返回当前活动的Tab。",
			Prototype: "getActiveTab() ",
            Name:"获取活动tab",
			Args: {
				_Return_: "Panel  活动的Tab。"
			},
			Example: ""
		},
		getItem: {
			Description: "根据id获取指定tab。",
			Prototype: "getItem(id) ",
            Name:"根据id获取指定tab",
			Args: {
				_Return_: "Panel  活动的Tab。",
				id: "String " +
					"Tab的ID。"
			},
			Example: ""
		},
		getTabEl: {
			Description: "指定一个子面板，返回此面板在tab候选栏上的DOM元素。",
			Prototype: "getTabEl(tab)",
            Name:"获取子面板元素",
			Args: {
				_Return_: "HTMLElement  DOM节点。",
				tab: "Panel/Number tab对象。"
			},
			Example: ""
		},
		// getTemplateArgs: {
		// 	Description: "为在tab候选栏中渲染tab选择符，产生模板参数。",
		// 	Prototype: "getTemplateArgs(item) : Object ",
		// 	Args: {
		// 		_Return_: "Object   包含要进行渲染的选择符元素的对象。",
		// 		item: "BoxComponent  产生tab候选栏中的选择元素BoxComponent"
		// 	},
		// 	Example: ""
		// },
		// hideTabStripItem: {
		// 	Description: "隐藏Tab候选栏以传入tab。",
		// 	Prototype: "hideTabStripItem(item) : void ",
		// 	Args: {
		// 		_Return_: "void ",
		// 		item: "Number/String/Panel  tab索引、id或item对象。"
		// 	},
		// 	Example: ""
		// },
		// readTabs: {
		// 	Description: "True表示为使用autoTabSelector选择符来扫描此tab面板内的markup，以准备autoTabs的特性。",
		// 	Prototype: "readTabs(removeExisting) : void ",
		// 	Args: {
		// 		_Return_: "void ",
		// 		removeExisting: " Boolean True表示为移除现有的tabs。"
		// 	},
		// 	Example: ""
		// },
		scrollToTab: {
			Description: "滚动到指定的TAB（前提是scrolling要激活）。",
			Prototype: "scrollToTab(item,animate) : void ",
            Name:"滚动到指定的TAB",
			Args: {
				_Return_: "void ",
				item: " Panel 要滚动到项。",
				animate :"Boolean True表示有动画效果。"
			},
			Example: ""
		},
		setActiveTab: {
			Description: "设置特定的tab为活动面板。此方法触发beforetabchange事件，若处理函数返回false则取消tab切换。",
			Prototype: "setActiveTab(tab)",
            Name:"设置活动面板",
			Args: {
				_Return_: "void ",
				tab: "String/Panel 活动面板或其id。"
			},
			Example: ""
		},
		// unhideTabStripItem: {
		// 	Description: "取消Tab候选栏隐藏的状态以传入tab。",
		// 	Prototype: "unhideTabStripItem(item) : void ",
		// 	Args: {
		// 		_Return_: "void ",
		// 		item : "Number/String/Panel item tab索引、id或item对象。"
		// 	},
		// 	Example: ""
		// }
	},
	Event: {
		beforetabchange: {
			Description: "当活动tab改变时触发。若句柄返回false则取消tab的切换",
			Prototype: " beforetabchange(sender,newTab,currentTab)",
            Name:"活动tab改变时触发",
			Args: {
				_Return_: "",
				sender: "控件本身",
				newTab :'将要活动的tab对象',
				currentTab:'当前活动tab对象'
			},
			Example: ""
		},
		contextmenu: {
			Description: "当原始浏览器的右键事件在tab元素上触发时，连动到此事件",
			Prototype: "contextmenu(sender,tab,e)",
            Name:"右键事件",
			Args: {
				_Return_: "",
				sender: "控件本身",
				tab :'目标tab对象',
				 e:'元素对象'
			},
			Example: ""
		},
		tabchange: {
			Description: "当活动tab改变后触发",
			Prototype: "contextmenu(sender,tab )",
            Name:"活动tab改变后触发",
			Args: {
				_Return_: "",
				sender: "控件本身",
				tab :'新的活动tab对象'
			},
			Example: ""
		}
	}
};
ControlsDataManage._add(Data_vmdTabPanel);

///////////////////////////////////////////////
//window
///////////////////////////////////////////////
var Data_vmdwindow = {
	BaseType: "panel",
	Type: "window",
	Property: {},
	Method: {},
	Event: {}
};
ControlsDataManage._add(Data_vmdwindow);

///////////////////////////////////////////////
//Viewport
///////////////////////////////////////////////
var Data_vmdViewport = {
	BaseType: "Container",
	Type: "viewport",
	Property: {
	},
	Method: {},
	Event: {}
};
ControlsDataManage._add(Data_vmdViewport);

///////////////////////////////////////////////
//label
///////////////////////////////////////////////
var Data_vmdlabel = {
	BaseType: "Control",
	Type: "label",
	Property: {
		forId: {
			Description: "该Label将要通过标准的HTML'for'属性绑定到的页面元素(element)的ID，如果没有指定，那么该属性不会被加到label上",
			Prototype: "String",
            Name:"标签id",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		html: {
			Description: "Label的内部 HTML片段。如果指定了text，将优先使用text属性，html属性将被忽略",
			Prototype: "String",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		text: {
			Description: "Label内显示的普通文本，默认为''",
			Prototype: "String",
            Name:"标签文本",
			Args: {
				_Return_: "String"
			},
			Example: ""
		}
	},
	Method: {
	    setText: {
	        Description: "设置文本显示。",
	        Prototype: "setText(text)",
            Name:"设置文本显示",
	        Args: {
	            _Return_: "",
	            text: " 要设置的label显示文本"
	           
	        },
	        Example: ""
	    }
	},
	Event: {}
};
ControlsDataManage._add(Data_vmdlabel);

///////////////////////////////////////////////
//Toolbar
///////////////////////////////////////////////
var Data_vmdToolbar = {
	BaseType: "Container",
	Type: "toolbar",
	Property: {},
	Method: {},
	Event: {}
};
ControlsDataManage._add(Data_vmdToolbar);

///////////////////////////////////////////////
//Toolbar
///////////////////////////////////////////////
var Data_vmdToolbarFill = {
	BaseType: "Container",
	Type: "tbfill",
	Property: {},
	Method: {},
	Event: {}
};
ControlsDataManage._add(Data_vmdToolbarFill);


///////////////////////////////////////////////
//GridPanel
///////////////////////////////////////////////
var Data_vmdGridPanel = {
	BaseType: "panel",
	Type: "grid",
	Property: {
		autoExpandColumn: {
			Description: "指定某个列之id,grid就会在这一列自动扩展宽度，以填满空白的位置，该id不能为0",
			Prototype: "autoExpandColumn: String ",
            Name:"宽度扩展",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		autoExpandMax: {
			Description: "autoExpandColumn可允许最大之宽度（有激活的话）。默认为 1000",
			Prototype: "autoExpandMax: Number  ",
            Name:"最大宽度",
			Args: {
				_Return_: "Number "
			},
			Example: ""
		},
		autoExpandMin : {
			Description: "autoExpandColumn可允许最小之宽度（有激活的话）。默认为 50",
			Prototype: "autoExpandMin: Number  ",
            Name:"最小宽度",
			Args: {
				_Return_: "Number "
			},
			Example: ""
		},
		// colModel: {
		// 	Description: "渲染Grid所使用的Ext.grid.ColumnModel（必须的）",
		// 	Prototype: "colModel: Object   ",
		// 	Args: {
		// 		_Return_: "Object  "
		// 	},
		// 	Example: ""
		// },
		columns: {
			Description: "自动创建列模型（ColumnModel）的数组",
			Prototype: "columns : Array ",
            Name:"列数组",
			Args: {
				_Return_: "Array  "
			},
			Example: ""
		},
		disableSelection: {
			Description: "True表示为禁止grid的选区功能（默认为false）——若指定了SelectionModel则忽略",
			Prototype: "disableSelection : Boolean  ",
            Name:"禁止选区功能",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		enableColumnHide: {
			Description: "True表示为隐藏每列头部的邮件菜单（默认为true）",
			Prototype: "enableColumnHide : Boolean",
            Name:"隐藏邮件菜单",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		enableColumnMove: {
			Description: "True表示为激活列的拖动（默认为true）",
			Prototype: "enableColumnMove : Boolean ",
            Name:"激活列拖动",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		enableColumnResize: {
			Description: "False 表示为关闭列的大小调节功能（默认为true）",
			Prototype: "enableColumnResize : Boolean ",
            Name:"禁止大小调节",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		enableHdMenu: {
			Description: "True表示为在头部出现下拉按钮，以激活头部菜单",
			Prototype: "enableHdMenu : Boolean",
            Name:"头部下拉按钮",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		hideHeaders: {
			Description: "True表示为隐藏Grid的头部（默认为false）",
			Prototype: "hideHeaders : Boolean ",
            Name:"隐藏头部",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		loadMask: {
			Description: "True表示为当grid加载过程中，会有一个Ext.LoadMask的遮罩效果。默认为false",
			Prototype: "loadMask : Object ",
            Name:"加载遮罩层",
			Args: {
				_Return_: "Object"
			},
			Example: "loadMask:true,/n"+
				      "loadMask:{ /n"+
				            "msg:'loading...' /n" +
				      "}"
		},
		maxHeight: {
			Description: "设置Grid的高度最大值（若autoHeight关闭则忽略）",
			Prototype: "maxHeight : Number",
            Name:"最大高度",
			Args: {
				_Return_: "Number"
			},
			Example: ""
		},
		minColumnWidth: {
			Description: "列的宽度的调整下限。默认为25",
			Prototype: "minColumnWidth : Number ",
            Name:"最小宽度",
			Args: {
				_Return_: "Number"
			},
			Example: ""
		},
		// selModel: {
		// 	Description: "AbstractSelectionModel的子类，以为Grid提供选区模型（selection model）",
		// 	Prototype: "selModel : Object ",
		// 	Args: {
		// 		_Return_: "Object"
		// 	},
		// 	Example: ""
		// },
		// stateEvents: {
		// 	Description: "事件名称组成的数组。",
		// 	Prototype: "stateEvents : Array",
		// 	Args: {
		// 		_Return_: "Array"
		// 	},
		// 	Example: "这些事件触发时会导致该组件进行状态记忆（默认为['columnmove','columnresize','sortchange']）。可支持该组件身上的任意事件类型，包括浏览器原生的或自定义的，如['click','customerchange']"
		// },
		store: {
			Description: "Grid应使用的数据源（必须的）",
			Prototype: "store : Ext.data.Store  ",
            Name:"数据集",
			Args: {
				_Return_: "Ext.data.Store"
			},
			Example: ""
		},
		stripeRows: {
			Description: "True表示为显示行的分隔符（默认为true）",
			Prototype: "stripeRows : Boolean ",
            Name:"行分隔符",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		trackMouseOver: {
			Description: "True表示为鼠标移动时高亮显示（默认为true）",
			Prototype: "trackMouseOver : Boolean ",
            Name:"鼠标移入高亮",
			Args: {
				_Return_: "Boolean"
			},
			Example: ""
		},
		// view: {
		// 	Description: "Grid所使用的Ext.grid.GridView。该项可在render()调用之前设置",
		// 	Prototype: "view : Object ",
		// 	Args: {
		// 		_Return_: "Object"
		// 	},
		// 	Example: ""
		// },
		// viewConfig: {
		// 	Description: "作用在grid's UI试图上的配置项对象， 任何Ext.grid.GridView可用的配置选项都可在这里指定。若view已指定则此项无效",
		// 	Prototype: "viewConfig : Object ",
		// 	Args: {
		// 		_Return_: "Object"
		// 	},
		// 	Example: ""
		// }
	},
	Method: {
		// getDragDropText: {
		// 	Description: "获取GRID拖动的代理文本（drag proxy text），默认返回this.ddText",
		// 	Prototype: "getDragDropText() ",
		// 	Args: {
		// 		_Return_: "String"
		// 	},
		// 	Example: ""
		// },
		getGridEl: {
			Description: "返回Grid的元素",
			Prototype: "getGridEl()  ",
            Name:"返回Grid的元素",
			Args: {
				_Return_: "Element"
			},
			Example: ""
		},
		// getSelectionModel: {
		// 	Description: "返回grid的SelectionModel",
		// 	Prototype: "getSelectionModel() ",
		// 	Args: {
		// 		_Return_: "link(其实就是配置项的(@link #selModel}选区模型)"
		// 	},
		// 	Example: ""
		// },
		getStore: {
			Description: "返回Grid的Data store",
			Prototype: "getStore() ",
            Name:"获取关联数据集",
			Args: {
				_Return_: "Store"
			},
			Example: ""
		},
		// getView: {
		// 	Description: "返回Grid的GridView对象",
		// 	Prototype: "getView()",
		// 	Args: {
		// 		_Return_: "Ext.grid.GridView对象"
		// 	},
		// 	Example: ""
		// },
		reconfigure: {
			Description: "重新配置Grid的Store和Column Model（列模型）。视图会重新绑定对象并刷新",
			Prototype: "reconfigure(store,colModel)",
            Name:"重新配置",
			Args: {
				_Return_: "void",
				store:"新配置的数据store对象",
				colModelcolModel:"新配置的列模型对象"
			},
			Example: ""
		}
	},
	Event: {
		bodyscroll: {
			Description: "当body元素被滚动后触发",
			Prototype: "bodyscroll(scrollLeft,scrollTop)  ",
            Name:"body元素被滚动后触发",
			Args: {
				_Return_: "",
				scrollLeft:"Number",
				scrollTop:"Number"
			},
			Example: ""
		},
		cellclick: {
			Description: "当单元格被点击时触发",
			Prototype: "cellclick(sender,rowIndex,columnIndex,e) ",
            Name:"点击单元格触发",
			Args: {
				_Return_: "",
				sender:"Grid",
				rowIndex:"Number（行索引）",
				columnIndex:"Number（列索引）",
				e:"Ext.EventObject"
			},
			Example: "// 单击格的数据保存在Record。要在侦听器函数内访问数据，可按照以下的办法: /n" +
				"function(grid,rowIndex,columnIndex,e) { /n"+
				    "var record = grid.getStore().getAt(rowIndex);  // 返回Record对象 Get the Record /n"+
				    "var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // 返回字段名称 Get field name /n"+
				    "var data = record.get(fieldName);"+
				"}"
		},
		cellcontextmenu: {
			Description: "单元格（cell）被右击时触发",
			Prototype: "cellcontextmenu(sender,rowIndex,cellIndex,e)",
            Name:"右击单元格触发",
			Args: {
				_Return_: "",
				sender:"Grid",
				rowIndex:"Number（行索引）",
				columnIndex:"Number（列索引）",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		celldblclick: {
			Description: "单元格（cell）被双击时触发",
			Prototype: "celldblclick(sender,rowIndex,columnIndex,e) ",
            Name:"双击单元格触发",
			Args: {
				_Return_: "",
				sender:"Grid",
				rowIndex:"Number（行索引）",
				columnIndex:"Number（列索引）",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		// cellmousedown: {
		// 	Description: "鼠标移入单元格",
		// 	Prototype: "cellmousedown(Grid sender,Number rowIndex,Number columnIndex,Ext.EventObject e) ",
         //    Name:"",
		// 	Args: {
		// 		_Return_: "",
		// 		this:"Grid",
		// 		rowIndex:"Number（行索引）",
		// 		columnIndex:"Number（列索引）",
		// 		e:"Ext.EventObject"
		// 	},
		// 	Example: ""
		// },
		click: {
			Description: "整个Grid被单击的原始事件",
			Prototype: "click(e) ",
            Name:"Grid单击事件",
			Args: {
				_Return_: "",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		columnmove: {
			Description: "当用户移动某个列（column）时触发",
			Prototype: "columnmove(oldIndex,newIndex)  ",
            Name:"鼠标移入",
			Args: {
				_Return_: "",
				eoldIndex:"Number",
				newIndex:"Number"
			},
			Example: ""
		},
		columnresize: {
			Description: "当用户调整某个列（column）大小时触发",
			Prototype: "columnresize(columnIndex,newSize) ",
            Name:"列调整大小时触发",
			Args: {
				_Return_: "",
				columnIndex:"Number",
				newSize:"Number"
			},
			Example: ""
		},
		contextmenu: {
			Description: "整个Grid被右击的原始事件",
			Prototype: "contextmenu(e)",
            Name:"Grid右击事件",
			Args: {
				_Return_: "",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		dblclick: {
			Description: "整个Grid被双击的原始事件",
			Prototype: "dblclick(e) ",
            Name:"Grid双击事件",
			Args: {
				_Return_: "",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		headerclick: {
			Description: "头部（header）被单击时触发",
			Prototype: "headerclick(sender,columnIndex,e)",
            Name:"头部单击事件",
			Args: {
				_Return_: "",
				sender:"Grid",
				columnIndex:"Number（列索引）",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		// headercontextmenu: {
		// 	Description: "头部（header）被右击时触发",
		// 	Prototype: "headercontextmenu(Grid sender,Number columnIndex,Ext.EventObject e) ",
		// 	Args: {
		// 		_Return_: "",
		// 		sender:"Grid",
		// 		columnIndex:"Number（列索引）",
		// 		e:"Ext.EventObject"
		// 	},
		// 	Example: ""
		// },
		// headerdblclick: {
		// 	Description: "头部（header）被双击时触发",
		// 	Prototype: "headerdblclick(Grid sender,Number columnIndex,Ext.EventObject e)",
		// 	Args: {
		// 		_Return_: "",
		// 		sender:"Grid",
		// 		columnIndex:"Number（列索引）",
		// 		e:"Ext.EventObject"
		// 	},
		// 	Example: ""
		// },
		// headermousedown: {
		// 	Description: "头部（header）被单击之前触发",
		// 	Prototype: "headermousedown(Grid sender,Number columnIndex,Ext.EventObject e)",
		// 	Args: {
		// 		_Return_: "",
		// 		this:"Grid",
		// 		columnIndex:"Number（列索引）",
		// 		e:"Ext.EventObject"
		// 	},
		// 	Example: ""
		// },
		keydown: {
			Description: "整个Grid的keydown的原始事件",
			Prototype: "keydown(e) ",
			Args: {
				_Return_: "",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		keypress: {
			Description: "整个Grid的keypress的原始事件",
			Prototype: "keypress(e) ",
			Args: {
				_Return_: "",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		// mousedown: {
		// 	Description: "整个Grid的mousedown的原始事件",
		// 	Prototype: "mousedown(Ext.EventObject e) ",
		// 	Args: {
		// 		_Return_: "",
		// 		e:"Ext.EventObject"
		// 	},
		// 	Example: ""
		// },
		// mouseout: {
		// 	Description: "整个Grid的mouseout的原始事件",
		// 	Prototype: "mouseout(Ext.EventObject e) ",
		// 	Args: {
		// 		_Return_: "",
		// 		e:"Ext.EventObject"
		// 	},
		// 	Example: ""
		// },
		// mouseover: {
		// 	Description: "整个Grid的mouseover的原始事件",
		// 	Prototype: "mouseover(Ext.EventObject e) ",
		// 	Args: {
		// 		_Return_: "",
		// 		e:"Ext.EventObject"
		// 	},
		// 	Example: ""
		// },
		// mouseup: {
		// 	Description: "整个Grid的mouseup的原始事件",
		// 	Prototype: "mouseup(Ext.EventObject e) ",
		// 	Args: {
		// 		_Return_: "",
		// 		e:"Ext.EventObject"
		// 	},
		// 	Example: ""
		// },
		rowclick: {
			Description: "行（row）被单击时触发",
			Prototype: "rowclick(sender,rowIndex,e)",
            Name:"行单击事件",
			Args: {
				_Return_: "",
				sender:"Grid",
				rowIndex:"Number（行索引）",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		rowcontextmenu: {
			Description: "行（row）被右击时触发",
			Prototype: "rowcontextmenu(sender,rowIndex,e)",
            Name:"行右击事件",
			Args: {
				_Return_: "",
				sender:"Grid",
				rowIndex:"Number（行索引）",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		rowdblclick: {
			Description: "行（row）被双击时触发",
			Prototype: "rowdblclick(sender,rowIndex,e)",
            Name:"行双击事件",
			Args: {
				_Return_: "",
				sender:"Grid",
				rowIndex:"Number（行索引）",
				e:"Ext.EventObject"
			},
			Example: ""
		},
		// rowmousedown: {
		// 	Description: "行（row）被单击之前触发",
		// 	Prototype: "rowmousedown(Grid sender,Number rowIndex,Ext.EventObject e)",
		// 	Args: {
		// 		_Return_: "",
		// 		this:"Grid",
		// 		rowIndex:"Number（行索引）",
		// 		e:"Ext.EventObject"
		// 	},
		// 	Example: ""
		// },
		// sortchange: {
		// 	Description: "当行（row）开始被拖动时触发",
		// 	Prototype: "sortchange(Grid sender,Object sortInfo) ",
		// 	Args: {
		// 		_Return_: "",
		// 		sender:"Grid",
		// 		sortInfo:"Object（包含键子段和方向的对象）"
		// 	},
		// 	Example: ""
		// },
        checked: {
            Description: "当选中状态发生变化时触发",
            Prototype: "checked(sender,field,val,record,rowIndex,columnIndex,e) ",
            Name:"选中状态发生变化时触发",
            Args: {
                _Return_: "",
                sender:"组件本身",
                field:"作为选中状态判断的字段",
                val:"true 为选中状态，false 为为选中状态",
                record:"选中行的数据对象",
                rowIndex:"行数",
                columnIndex:"列数",
                e:"元素对象"
            },
            Example: ""
        }
	}
};
ControlsDataManage._add(Data_vmdGridPanel);

///////////////////////////////////////////////
//vmdGridColumn
///////////////////////////////////////////////

var Data_vmdGridColumn = {
    BaseType: "Control",
    Type: "gridcolumn",
    Property: {
        align: {
            Description: "设置列的CSS text-align属性",
            Prototype: "align : String ",
            Name:"对齐方式",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        css: {
            Description: "设置表格中全体单元格的CSS样式（包括头部）",
            Prototype: "css : String ",
            Name:"单元格样式类名",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        dataIndex: {
            Description: "数据索引，相当于Grid记录集中的字段名称，字段的值用于展示列里面的值",
            Prototype: "dataIndex : String ",
            Name:"数据索引",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        fixed: {
            Description: "True表示为列的宽度不能够改变",
            Prototype: "fixed : Boolean ",
            Name:"固定列宽",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        header: {
            Description: "在Grid头部视图中显示的文字",
            Prototype: "header : String ",
            Name:"头标题",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        hidden: {
            Description: "True表示隐藏列",
            Prototype: "hidden : Boolean  ",
            Name:"列隐藏",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        menuDisabled: {
            Description: "True表示禁止列菜单，默认为fasle",
            Prototype: "menuDisabled : Boolean ",
            Name:"禁止列",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        resizable: {
            Description: "False禁止列可变动大小，默认为true",
            Prototype: "resizable : Boolean ",
            Name:"列变动",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        tooltip: {
            Description: "在列头部显示的提示文字，鼠标移入后显示",
            Prototype: "tooltip : String ",
            Name:"鼠标移入提示",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        width: {
            Description: "列的初始宽度（像素）",
            Prototype: "width : Number ",
            Name:"宽度",
            Args: {
                _Return_: "Number"
            },
            Example: ""
        },
        style: {
            Description: "列的样式",
            Prototype: "style : String ",
            Name:"内联样式",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        xtype: {
            Description: " 用于登记一个xtype。 ",
            Prototype: " String xtype ",
            Name:"简称",
            Args: {
                _Return_: " String "
            },
            Example: ""
        },
        store: {
            Description: " 数据集。 ",
            Prototype: " object store ",
            Name:"数据集",
            Args: {
                _Return_: " object "
            },
            Example: ""
        }

    },
    Method: {

    },
    Event: {}
};
ControlsDataManage._add(Data_vmdGridColumn);

///////////////////////////////////////////////
//vmdGridNumberColumn
///////////////////////////////////////////////

var Data_vmdGridNumberColumn = {
    BaseType: "gridcolumn",
    Type: "gridnumbercolumn",
    Property: {
        format: {
            Description: " 用以覆盖本地化的默认数字格式化字串",
            Prototype: " String format ",
            Name:"数字格式",
            Args: {
                _Return_: " String "
            },
            Example: ""
        }
    },
    Method: {
    },
    Event: {}
};
ControlsDataManage._add(Data_vmdGridNumberColumn);

///////////////////////////////////////////////
//vmdGridNumberColumn
///////////////////////////////////////////////

var Data_vmdGridCheckColumn = {
    BaseType: "gridcolumn",
    Type: "checkcolumn",
    Property: {

    },
    Method: {
    },
    Event: {}
};
ControlsDataManage._add(Data_vmdGridCheckColumn);


///////////////////////////////////////////////
//GridDateColumn
///////////////////////////////////////////////
var Data_vmdGridDateColumn = {
    BaseType: "gridcolumn",
    Type: "griddatecolumn",
    Property: {
        format: {
            Description: "用以覆盖本地化的默认日期格式化字串。字串必须为符合指定日期形式(默认为 'm/d/y')",
            Prototype: "  format : String  ",
            Name:"日期格式",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
    },
    Method: {
    },
    Event: {}
};
ControlsDataManage._add(Data_vmdGridDateColumn);

///////////////////////////////////////////////
//GridTemplateColumn
///////////////////////////////////////////////
var Data_vmdGridTemplateColumn = {
    BaseType: "gridcolumn",
    Type: "gridtemplatecolumn",
    Property: {
        tpl: {
            Description: "一个模版或模版定义字符串用来处理一个记录的数据，以产生一个列的呈现值。",
            Prototype: "  tpl : String  ",
            Name:"模版格式",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
    },
    Method: {
    },
    Event: {}
};
ControlsDataManage._add(Data_vmdGridTemplateColumn);


///////////////////////////////////////////////
//checkbox
///////////////////////////////////////////////
var Data_vmdcheckbox = {
	BaseType: "field",
	Type: "checkbox",
	Property: {
        checked: {
            Description: "如果checkbox需要呈现选中状态，设置checked为True（默认为false）",
            Prototype: "checked : Boolean ",
            Name:"选中",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        inputValue: {
            Description: "应该显示在元素value处的值",
            Prototype: "inputValue : String ",
            Name:"值",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        boxLabel: {
            Description: "checkbox旁边显示的文字",
            Prototype: "boxLabel : String  ",
            Name:"名称",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        // checkedCls: {
        //     Description: "被选中后的样式class名",
        //     Prototype: "checkedCls : String  ",
        //     Name:"选中样式类名",
        //     Args: {
        //         // _Return_: "Boolean"
        //     },
        //     Example: ""
        // },
	},
	Method: {
	},
	Event: {
        check: {
            Description: "checkbox选中状态发生变化时触发",
            Prototype: "check(sender,checked) ",
            Name:"选中状态发生变化时触发",
            Args: {
                _Return_: "",
                sender:"控件本身",
                checked:'Boolean'
            },
            Example: ""
        },
	}
};
ControlsDataManage._add(Data_vmdcheckbox);

///////////////////////////////////////////////
//checkboxgroup
///////////////////////////////////////////////
var Data_vmdcheckboxgroup = {
	BaseType: "field",
	Type: "checkboxgroup",
	Property: {
        allowBlank: {
            Description: "是否允许为空。false则至少要有一个选项被选中,如果没有被选中的选项，会显示{@link @blankText}的错误信息（默认为true）",
            Prototype: "allowBlank : Boolean ",
            Name:"允许为空",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        },
        blankText: {
            Description: "allowBlank 验证失败显示的错误信息",
            Prototype: "blankText : String ",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        columns: {
            Description: "使用自动布局显示 checkbox/radio 组的时候使用的列的数目，这个配置选项可以有多种不同的类型的值。",
            Prototype: "columns : String/Number/Array ",
            Name:"列数",
            Args: {
                _Return_: "String/Number/Array ",
            },
            Example: "'auto' : \n" +
                "渲染的时候，组件会一列挨着一列，每一列的宽度按照整行的宽度均分。默认的是auto \n" +
                "\n" +
                "Number : \n" +
                "如果你指定了一个像 3 这样的数字，那么将会创建指定的数目的列，包含的组建将会根据vertical的值 自动的分发。\n" +
                "\n" +
                "Array : Object \n" +
                "你也可以指定一个整形和浮点型的数字组成的数组来表示各个列的宽度，比如[100,.25,.75]。Any integer values will be rendered first,所有的整数型值会被先用来渲染，然后剩下的浮点型值将会被当做剩下的空间的百分比来计算。虽然不用使数据里的浮点型的值的和为一(100%)， 但是如果你想要让组件填充满容器，你应该是他们的和为一。\n" +
                "\n"
        },
        items: {
            Description: "一个Checkbox的数组，或者配置选项",
            Prototype: "items : Array ",
            Name:"子项",
            Args: {
                _Return_: "Array",
            },
            Example: ""
        },
        vertical: {
            Description: "如果设置为 true，将包含的组件跨列分发，每一行从头到底完全填充。自动计算每一列的组件的数量以使每一列尽量平衡。默认为 false,每次每一列仅添加一个组件。每一行从头到尾完全填充",
            Prototype: "vertical : Boolean ",
            Name:"垂直对齐",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        },
        boxFieldName: {
            Description: "复选框组的名称",
            Prototype: "boxFieldName : String ",
            Name:"名称",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        store: {
            Description: "数据集",
            Prototype: "Object store ",
            Name:"数据集",
            Args: {
                _Return_: "数据集"
            },
            Example: ""
        },
        valueField: {
            Description: "值字段",
            Prototype: "string valueField",
            Name:"值字段",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        labelField: {
            Description: "显示字段",
            Prototype: "string labelField",
            Name:"显示字段",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        },
        checkedField: {
            Description: "选中字段",
            Prototype: "string checkedField",
            Name:"选中字段",
            Args: {
                _Return_: "字符串"
            },
            Example: ""
        }
    },
	Method: {

    },
	Event: {
        change: {
            Description: "当组件按钮checked状态被改变时触发",
            Prototype: "void change(sender,checked)",
            Name:"选中状态发生变化时触发",
            Args: {
                _Return_: "",
                sender: "控件本身",
                checked:"当前组件被选中的按钮"
            },
            Example: ""
        }
    }
};
ControlsDataManage._add(Data_vmdcheckboxgroup);

///////////////////////////////////////////////
//datefield
///////////////////////////////////////////////
var Data_vmddatefield = {
	BaseType: "textfield",
	Type: "datefield",
	Property: {
        daltFormats: {
            Description: "用 \"|\" 符号分隔的多个日期格式化字串，当输入的日期与默认的格式不符时用来尝试格式化输入值(默认为 'm/d/Y|m-d-y|m-d-Y|m/d|m-d|d')。",
            Prototype: "daltFormats : String ",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        disabledDates: {
            Description: "一个以字串形式表示的禁用的日期数组",
            Prototype: "disabledDates : Array ",
            Name:"禁用日期",
            Args: {
                _Return_: "Array"
            },
            Example: "[\"03/08/2003\",\"09/16/2003\"] 将会禁用那些确切的日期 \n" +
            "[\"03/08\",\"09/16\"] 将会禁用每年中的那些日子  \n" +
            "[\"^03/08\"]将会只匹配开头(当使用短年份时非常有用) \n" +
            "[\"03/../2006\"]将会禁用 2006 年 三月 的每一天  \n" +
            "[\"^03\"]将会禁用每年三月的每一天  \n" +
            "注意日期的格式必须一定要符合format的配置格式。为了提供正则表达式的支持,如果你使用一个包含 \".\" 的日期格式，你就得将小数点转义使用。例如: [\"03\\\\.08\\\\.03\"]。"
        },
        disabledDatesText: {
            Description: "选择禁选日期时显示的提示信息(默认为 'Disabled')",
            Prototype: "disabledDatesText : String ",

            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        disabledDays: {
            Description: "禁用星期的数组，从0开始。[0,6]禁止了从星期日到星期六（默认为null）",
            Prototype: "disabledDays : Array ",
            Name:"禁用星期",
            Args: {
                _Return_: "Array"
            },
            Example: ""
        },
        disabledDaysText: {
            Description: "选择禁选星期时显示的提示信息",
            Prototype: "disabledDaysText : String ",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        defaultValue: {
            Description: "当前显示的默认日期",
            Prototype: "defaultValue : String ",
            Name:"默认日期",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        maxValue: {
            Description: "允许最晚的日期。可以是JavaScript日期对象或者是一个符合日期格式要求的字符串（默认为null）",
            Prototype: "maxValue : Date/String ",
            Name:"最大日期",
            Args: {
                _Return_: "Date/String"
            },
            Example: ""
        },
        maxText: {
            Description: "当字段的日期晚于 maxValue 属性指定值时显示的文本提示",
            Prototype: "maxText : String ",
            Name:"超出最大日期提示",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        minValue: {
            Description: "允许最早的日期。可以是JavaScript日期对象或者是一个符合日期格式要求的字符串（默认为null）",
            Prototype: "minValue : Date/String ",
            Name:"最小日期",
            Args: {
                _Return_: "Date/String"
            },
            Example: ""
        },
        minText: {
            Description: "当字段的日期早于 maxValue 属性指定值时显示的文本提示",
            Prototype: "minText : String ",
            Name:"小于最小日期提示",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        showToday: {
            Description: "False表示隐藏底部的Today按钮并禁止空格的快捷键来选择当日日期（默认为true）",
            Prototype: "showToday : Boolean ",
            Name:"显示'今天'",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        format: {
            Description: "用以覆盖本地化的默认日期格式化字串。字串必须为符合指定日期形式(默认为 'm/d/y')",
            Prototype: "  format : String  ",
            Name:"日期格式",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        hideTrigger: {
            Description: "为true时隐藏触发元素，只显示基本文本域（默认为false）",
            Prototype: "hideTrigger : Boolean ",
            Name:"隐藏日期图标",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        }

    },
	Method: {
		getValue: {
			Description: "获取日期值,参数isReturnString为true返回字符串，默认false",
			Prototype: "getValue(isReturnString)",
            Name:"获取日期值",
			Args: {
				_Return_: "date  返回值"
			},
			Example: ""
		},
        setDisabledDates: {
            Description: "更换当前禁用的日期，并刷新日期拾取器",
            Prototype: "setDisabledDates(disabledDates)",
            Name:"设置禁用日期",
            Args: {
                _Return_: "void",
                disabledDates:"Array 禁用日期的数组。参阅disabledDates的配置了解可支持值的详细内容"
            },
            Example: ""
        },
        setDisabledDays: {
            Description: "更换当前禁用的星期，并刷新日期拾取器",
            Prototype: "setDisabledDays(disabledDays)",
            Name:"设置禁用星期",
            Args: {
                _Return_: "void",
                disabledDays:"Array 禁用星期的数组。参阅disabledDates的配置了解可支持值的详细内容"
            },
            Example: ""
        },
        setMaxValue: {
            Description: "更换现有的maxValue，并刷新日期拾取器",
            Prototype: "setMaxValue(value) ",
            Name:"设置最大日期",
            Args: {
                _Return_: "void",
                value:"Date"
            },
            Example: ""
        },
        setMixValue: {
            Description: "更换现有的mixValue，并刷新日期拾取器",
            Prototype: "setMixValue(value) ",
            Name:"设置最小日期",
            Args: {
                _Return_: "void",
                value:"Date"
            },
            Example: ""
        },
        setValue: {
            Description: "设置日期字段的值",
            Prototype: "setValue(date)",
            Name:"设置日期字段值",
            Args: {
                _Return_: "void",
                value:"String/Date"
            },
            Example: "//所有的调用均设置同样的日期(May 4,2006) \n" +
                "\n" +
                "//传递一个日期对象: \n" +
                "var dt = new Date('5/4/2006');\n" +
                "dateField.setValue(dt);\n" +
                "\n" +
                "//传递一个日期字串(采用默认的格式化字串): \n" +
                "dateField.setValue('05/04/2006');\n" +
                "\n" +
                "//转换一个日期字串(自定义的格式化字串): \n" +
                "dateField.format = 'Y-m-d';\n" +
                "dateField.setValue('2006-05-04');\n"
        }
	},
	Event: {
        select: {
            Description: "当日期选择器选取日期后触发的事件",
            Prototype: "select(sender,date)",
            Name:"选取日期后触发",
            Args: {
                _Return_: "",
                sender:"控件本身",
                date:"Date 当前选择的日期"
            },
            Example: ""
        }
    }
};
ControlsDataManage._add(Data_vmddatefield);
///////////////////////////////////////////////
//datefield
///////////////////////////////////////////////
var Data_vmddatetime = {
	BaseType: "Control",
	Type: "vmdDateTime",
	Property: {
        format: {
            Description: "日期格式，支持常用的年月日时分秒",
            Prototype: "format : String ",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        compatibleOCX: {
            Description: "ie下对ocx遮挡下拉的兼容",
            Prototype: "compatibleOCX : boolean ",
            Name:"兼容ocx遮挡",
            Args: {
                _Return_: "boolean"
            },
            Example: ""
        }
    },
	Method: {
		getValue: {
			Description: "获取日期值,返回标准日期格式",
			Prototype: "getValue()",
            Name:"获取日期值",
			Args: {
				_Return_: "date  返回值"
			},
			Example: ""
		},
        setValue: {
            Description: "设置日期字段的值",
            Prototype: "setValue(date)",
            Name:"设置日期字段值",
            Args: {
                _Return_: "void",
                value:"String/Date"
            },
            Example: "//传递一个日期字串(采用默认的格式化字串): \n" +
                "dateTime.setValue('2018-01-01');\n" 
        }
	},
	Event: {
        change: {
            Description: "当日期选择器选取日期后触发的事件",
            Prototype: "select(sender,value,date,endDate)",
            Name:"选取日期后触发",
            Args: {
                _Return_: "",
                sender:"控件本身",
				value:"选择的日期值",
                date:"Date 当前选择的日期对象,结构｛date:16,hours:0,minutes:0,month:8,seconds:0,year:2019｝"
            },
            Example: ""
        }
    }
};
ControlsDataManage._add(Data_vmddatetime);
///////////////////////////////////////////////
//htmleditor
///////////////////////////////////////////////
var Data_vmdhtmleditor = {
	BaseType: "Control",
	Type: "htmleditor",
	Property: {
        createLinkText: {
            Description: "创建链接时提示的默认文本",
            Prototype: "createLinkText : String ",
            Name:"链接文本",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        defaultLinkValue: {
            Description: "创建链接时提示的默认值",
            Prototype: "defaultLinkValue : String ",
            Name:"链接值",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        enableAlignments: {
            Description: "允许居左、居中、居右按钮(默认为 true)",
            Prototype: "enableAlignments : Boolean ",
            Name:"显示对齐按钮",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        enableColors: {
            Description: "允许前景/高亮颜色按钮(默认为 true)",
            Prototype: "enableColors : Boolean ",
            Name:"显示颜色按钮",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        enableFont: {
            Description: "允许字体选项。Safari 中无效(默认为 true)",
            Prototype: "enableFont : Boolean ",
            Name:"显示字体选项",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        enableFontSize: {
            Description: "允许增大/缩小字号按钮(默认为 true)",
            Prototype: "enableFontSize : Boolean ",
            Name:"字体设置按钮",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        enableFormat: {
            Description: "允许粗体、斜体和下划线按钮(默认为 true)",
            Prototype: "enableFormat : Boolean ",
            Name:"字形设置按钮",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        enableLinks: {
            Description: "允许创建链接按钮。Safari 中无效。(默认为 true)",
            Prototype: "enableLinks : Boolean ",
            Name:"创建链接按钮",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        enableLists: {
            Description: "允许项目和列表符号按钮。Safari 中无效。(默认为 true)",
            Prototype: "enableLists : Boolean ",
            Name:"列表符号按钮",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        enableSourceEdit: {
            Description: "允许切换到源码编辑按钮。Safari 中无效。(默认为 true)",
            Prototype: "enableSourceEdit : Boolean ",
            Name:"源码编辑按钮",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        buttonTips: {
            Description: "编辑器中工具栏上按钮的工具提示对象的集合",
            Prototype: "buttonTips : Object ",
            Args: {
                _Return_: "Object"
            },
            Example: "// 对象ID必须与按钮相同且值应为一个有效的QuickTips对象 /n"+
                "buttonTips:{   \n" +
                    "bold: {title:'Bold(Ctrl+B)',  \n" +
                    "       text:'粗体'},  \n" +
                    "italic:{title:'Italic(Ctrl+I)',text:'斜体'},  \n" +
                    "underline:{title:'Underline(Ctrl+U)',text:'下划线'},  \n" +
                    "increasefontsize:{title:'Grow Text',text:'增大字体'},  \n" +
                    "decreasefontsize:{title:'Shrink Text',text:'缩小字体'},  \n" +
                    "backcolor:{title:'Text Highlight',text:'背景色'},  \n" +
                    "forecolor:{title:'Font color',text:'前景色'},  \n" +
                    "justifyleft:{title:'Align Text Left',text:'左对齐'},  \n" +
                    "justifycenter:{title:'Center Text',text:'居中对齐'},  \n" +
                    "justifyright:{title:'Align Text Right',text:'右对齐'},  \n" +
                    "insertunorderedlist:{title:'Bullet List',text:'项目符号'},  \n" +
                    "insertorderedlist:{title:'Numbered List',text:'数字编号'},  \n" +
                    "createlink:{title:'Hyperlink',text:'超链接'},  \n" +
                    "sourceedit:{title:'Source Edit',text:'切换源代码编辑模式'}   \n" +
                "}   "
        },
        fontFamilies: {
            Description: "一个有效的字体列表数组",
            Prototype: "fontFamilies : Array ",
            Args: {
                _Return_: "Array"
            },
            Example: ""
        }
    },
	Method: {
        insertAtCursor: {
            Description: "在光标当前所在位置插入给定的文本。注意:编辑器必须已经初始化且处于活动状态才能插入本文",
            Prototype: "insertAtCursor(text)",
            Name:"插入文本",
            Args: {
                _Return_: "void",
                text:'String'
            },
            Example: ""
        },
        toggleSourceEdit: {
            Description: "在标准模式与源码模式下切换 True表示源码模式，false表示标准模式",
            Prototype: "toggleSourceEdit([sourceEdit]) ",
            Name:"切换编辑模式",
            Args: {
                _Return_: "void",
                sourceEdit:'Boolean'
            },
            Example: ""
        }
    },
	Event: {
        // activate: {
        //     Description: "当编辑器首次获取焦点时触发。所有的插入操作都必须等待此事件完成",
        //     Prototype: "activate(sender)",
        //     Args: {
        //         _Return_: "",
        //         sender:'控件本身'
        //     },
        //     Example: ""
        // },
        // editmodechange: {
        //     Description: "当编辑器首次获取焦点时触发。所有的插入操作都必须等待此事件完成",
        //     Prototype: "editmodechange(sender,sourceEdit) ",
        //     Args: {
        //         _Return_: "",
        //         sender:'控件本身',
        //         sourceEdit:'Boolean 值为true时表示源码编辑模式，false 表示常规编辑模式'
        //     },
        //     Example: ""
        // }
    }
};
ControlsDataManage._add(Data_vmdhtmleditor);

///////////////////////////////////////////////
//numberfield
///////////////////////////////////////////////
var Data_vmdnumberfield = {
	BaseType: "textfield",
	Type: "numberfield",
	Property: {
        allowDecimals: {
            Description: "值为 False时将不接受十进制值 (默认为true)",
            Prototype: "allowDecimals : Boolean ",
            Name:"十进制",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        },
        allowNegative: {
            Description: "值为 False时只允许为正数(默认为 true，即默认允许为负数)",
            Prototype: "allowNegative : Boolean ",
            Name:"仅正数",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        },
        baseChars: {
            Description: "接受有效数字的一组基础字符（默认为0123456789）",
            Prototype: "baseChars : String ",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        decimalPrecision: {
            Description: "设置小数点后最大精确位数(默认为 2)",
            Prototype: "decimalPrecision : Number ",
            Name:"小数点后位数",
            Args: {
                _Return_: "Number",
            },
            Example: ""
        },
        maxValue: {
            Description: "允许输入的最大值(默认为Number.MAX_VALUE)",
            Prototype: "maxValue : Number ",
            Name:"最大值",
            Args: {
                _Return_: "Number",
            },
            Example: ""
        },
        maxText: {
            Description: "输入超出最大值时的提示文本",
            Prototype: "maxText : String ",
            Name:"上溢出提醒",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        minValue : {
            Description: "允许输入的最小值(默认为Number.NEGATIVE_INFINITY)",
            Prototype: "minValue : Number ",
            Name:"最小值",
            Args: {
                _Return_: "Number",
            },
            Example: ""
        },
        minText: {
            Description: "输入小于最小值时的提示文本",
            Prototype: "minText : String ",
            Name:"下溢出提醒",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        nanText: {
            Description: "输入非数字时的提示文本",
            Prototype: "nanText : String ",
            Name:"非数字提醒",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
    },
	Method: {},
	Event: {
        keydown: {
            Description: "输入栏的keydown事件",
            Prototype: "keydown()",
            Args: {
                _Return_: ""
				},
            Example: ""
        },
        keypress: {
            Description: "输入栏的keypress事件",
            Prototype: "keypress()",
            Args: {
                _Return_: ""
            },
            Example: ""
        },
        keyup: {
            Description: "输入栏的keyup事件",
            Prototype: "keyup()",
            Args: {
                _Return_: ""
            },
            Example: ""
        },
	}
};
ControlsDataManage._add(Data_vmdnumberfield);

///////////////////////////////////////////////
//vmdradiogroup
///////////////////////////////////////////////
var Data_vmdradiogroup = {
	BaseType: "checkboxgroup",
	Type: "radiogroup",
	Property: {},
	Method: {},
	Event: {}
};
ControlsDataManage._add(Data_vmdradiogroup);

///////////////////////////////////////////////
//vmdradio
///////////////////////////////////////////////
var Data_vmdradio = {
    BaseType: "checkbox",
    Type: "radio",
    Property: {},
    Method: {
        getGroupValue: {
            Description: "如果该radio是组的一部分，将返回已选中的值",
            Prototype: "getGroupValue()",
            Args: {
                _Return_: "String",
            },
            Example: ""
        }
    },
    Event: {}
};
ControlsDataManage._add(Data_vmdradio);


///////////////////////////////////////////////
//vmddatafield
///////////////////////////////////////////////
var Data_vmddatafield = {
    Type: "datafield",
    Property: {
        dateFormat: {
            Description: "将字符串转化成日期格式",
            Prototype: "dateFormat : String ",
            Name:"日期格式",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        mapping: {
            Description: "使用的路径表达式，该实现创建Record以从数据对象中提取Field值。如果路径表达式与字段名称相同，则可以省略映射。",
            Prototype: "mapping：String / Number",
            // Name:"映射",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        name: {
            Description: "在Record中引用字段的名称",
            Prototype: "name：String",
            Name:"名称",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        sortDir: {
            Description: "排序（\"ASC\"或 \"DESC\"）的初始方向。默认为 \"ASC\"（升序）",
            Prototype: "sortDir：String",
            Name:"排序",
            Args: {
                _Return_: "Function",
            },
            Example: ""
        },
        sortType: {
            Description: "将Field的值转换为可比较值的函数，以确保正确的排序顺序",
            Prototype: "sortType：Function",
            Name:"排序",
            Args: {
                _Return_: "Function",
            },
            Example: ""
        },
        type: {
            Description: "如果 尚未指定，则从接收数据自动转换为存储值的数据类型",
            Prototype: "type：Mixed",
            Name:"数据类型",
            Args: {
                _Return_: "Mixed",
            },
            Example: ""
        }
    },
    Method: {},
    Event: {}
};
ControlsDataManage._add(Data_vmddatafield);

///////////////////////////////////////////////
//GridDateColumn
///////////////////////////////////////////////
var Data_vmdGridTemplateColumn = {
    BaseType: "gridcolumn",
    Type: "gridtemplatecolumn",
    Property: {
        tpl: {
            Description: "一个模版或模版定义字符串用来处理一个记录的数据，以产生一个列的呈现值。",
            Prototype: "  tpl : String  ",
            Name:"模版格式",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
    },
    Method: {
    },
    Event: {}
};
ControlsDataManage._add(Data_vmdGridTemplateColumn);

///////////////////////////////////////////////
//field
///////////////////////////////////////////////
var Data_vmdfield = {
    BaseType: "Control",
    Type: "field",
    Property: {
        fieldClass: {
            Description: "表单元素一般状态CSS样式（默认为\"x-form-field\"）",
            Prototype: "fieldClass : String ",
            Name:"样式类名",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        focusClass: {
            Description: "当表单元素获取焦点时的CSS样式（默认为\"x-form-focus\"）",
            Prototype: "focusClass : String ",
            Name:"焦点样式类名",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        inputType: {
            Description: "input字段的type属性，诸如 radio、text、password、file等的元素都有type属性",
            Prototype: "inputType : String ",
            Name:"输入类型",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        invalidClass: {
            Description: "当出现无效字段所使用上的CSS样式（默认为\"x-form-invalid）",
            Prototype: "invalidClass : String ",
            Name:"无效样式类名",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        invalidText: {
            Description: "表单元素无效时标在上面的文本信息（默认为\"The value in this field is invalid\"）",
            Prototype: "invalidText : String ",
            Name:"无效提醒",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        msgFx: {
            Description: "表单元素无效提示显示的动画效果（默认为\"normal\"）",
            Prototype: "msgFx : String ",
            Name:"无效显示动画",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        msgTarget: {
            Description: "错误提示的显示位置。可以是以下列表中的任意一项（默认为\"qtip\"）",
            Prototype: "msgTarget : String ",
            Name:"提醒位置",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        name: {
            Description: "字段的name属性，HTML的name属性",
            Prototype: "name : String ",
            Name:"名称",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        readOnly: {
            Description: "如果为真，则在HTML时标明此表单元素为只读",
            Prototype: "readOnly : Boolean ",
            Name:"只读",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        },
        value: {
            Description: "字段初始化的值（默认为undefined）",
            Prototype: "value : Mixed ",
            Name:"值",
            Args: {
                _Return_: "Mixed",
            },
            Example: ""
        }
    },
    Method: {
        // clearInvalid: {
        //     Description: "清除元素任何无效标志样式与信息",
        //     Prototype: "clearInvalid() : void ",
        //     Args: {
        //         _Return_: "void",
        //     },
        //     Example: ""
        // },
        getName: {
            Description: "获取元素的名称",
            Prototype: "getName()",
            Name:"获取元素名称",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        getValue: {
            Description: "返回格式化后的数据",
            Prototype: "getValue()",
            Name:"格式化后的数据",
            Args: {
                _Return_: "Mixed",
            },
            Example: ""
        },
        getRawValue: {
            Description: "返回原始值",
            Prototype: "getRawValue() ",
            Name:"返回原始值",
            Args: {
                _Return_: "Mixed",
            },
            Example: ""
        }
    },
    Event: {

    }
};
ControlsDataManage._add(Data_vmdfield);

///////////////////////////////////////////////
//textfield
///////////////////////////////////////////////
var Data_vmdtextfield = {
	BaseType: "field",
	Type: "textfield",
	Property: {
        allowBlank: {
            Description: "值为 false 时将效验输入字符个数大于0(默认为 true) ",
            Prototype: "allowBlank : Boolean ",
            Name:"可为空",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        },
        blankText: {
            Description: "当允许为空效验失败时显示的错误文本",
            Prototype: "blankText : String ",
            Name:"为空提示",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        emptyClass: {
            Description: "占位符使用的CSS样式类名(默认为 'x-form-empty-field')。此类的添加与移除均由当前字段是否有值来自动处理",
            Prototype: "emptyClass : String ",
            Name:"占位符样式类名",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        emptyText: {
            Description: "初始空字段中显示的文本(默认为 null)",
            Prototype: "emptyText : String ",
            Name:"占位符",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        grow: {
            Description: "当值为 true 时表示字段可以根据内容自动伸缩",
            Prototype: "grow : Boolean ",
            Name:"宽度自适应",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        },
        growMax: {
            Description: "当 grow = true 时允许的字段最大宽度(默认为 800)",
            Prototype: "growMax : Number ",
            Name:"最大宽度",
            Args: {
                _Return_: "Number",
            },
            Example: ""
        },
        growMin: {
            Description: "当 grow = true 时允许的字段最小宽度(默认为 30)",
            Prototype: "growMin : Number ",
            Name:"最小宽度",
            Args: {
                _Return_: "Number",
            },
            Example: ""
        },
        maxLength: {
            Description: "输入字段允许的最大字符数(默认为 Number.MAX_VALUE)",
            Prototype: "maxLength : Number ",
            Name:"最大长度",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        maxLengthText: {
            Description: "输入字符数大于最大字符数时显示的文本",
            Prototype: "maxLengthText : String ",
            Name:"溢出提醒",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        vtype: {
            Description: "定义的效验类型名(默认为 null) ",
            Prototype: "vtype : String ",
            Name:"校验类型名",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        vtypeText: {
            Description: "定义的效验提醒文本",
            Prototype: "vtypeText : String ",
            Name:"效验提醒",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        disableKeyFilter: {
            Description: "值为 true 时禁用输入按键过滤(默认为 false) ",
            Prototype: "disableKeyFilter : Boolean ",
            Name:"输入键过滤",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        }

    },
	Method: {},
	Event: {}
};
ControlsDataManage._add(Data_vmdtextfield);

///////////////////////////////////////////////
//textarea
///////////////////////////////////////////////
var Data_vmdtextarea = {
	BaseType: "textfield",
	Type: "textarea",
	Property: {
        preventScrollbars: {
            Description: "为True时在为本域中将禁止滑动条，（相当于设置overflow为hidden，默认值为false）。",
            Prototype: "preventScrollbars : Boolean ",
            Name:"滚动条",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        }
    },
	Method: {},
	Event: {}
};
ControlsDataManage._add(Data_vmdtextarea);

///////////////////////////////////////////////
//AceEditor
///////////////////////////////////////////////
var Data_vmdAceEditor = {
	BaseType: "Control",
	Type: "vmdAceEditor",
	Property: {
        language: {
            Description: "编辑器的语言形式",
            Prototype: "language:String",
            Name:"语言",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        value: {
            Description: "编辑器的初始显示内容",
            Prototype: "value:String ",
            Name:"值",
            Args: {
                _Return_: "String"
            },
            Example: ""
        }
    },
	Method: {},
	Event: {}
};
ControlsDataManage._add(Data_vmdAceEditor);

///////////////////////////////////////////////
//vmdDataView
///////////////////////////////////////////////
var Data_vmdDataView = {
	BaseType: "Control",
	Type: "vmdDataView",
	Property: {
        tpl: {
            Description: "构成这个DataView的HTML片断，或片断的数组",
            Prototype: "tpl:String/Array ",
            Name:"html片段",
            Args: {
                _Return_: "String/Array ",
            },
            Example: ""
        },
        store: {
            Description: "数据集",
            Prototype: "store:store ",
            Name:"数据集",
            Args: {
                _Return_: "store",
            },
            Example: ""
        },
        data: {
            Description: "要应用于tpl更新Component的内容区域的初始数据集",
            Prototype: "data:Mixed",
            Name:"数据",
            Args: {
                _Return_: "Mixed",
            },
            Example: ""
        },
        itemSelector: {
            Description: "此项是必须的设置，一个CSS选择器（例如div.some-class或 span：first-child），用于确定此DataView将使用的节点",
            Prototype: "itemSelector:String ",
            Name:"节点选择器",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        overClass: {
            Description: "鼠标悬停时应用于视图中每个项目的CSS类",
            Prototype: "overClass：String",
            Name:"悬停样式类名",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        selectedClass: {
            Description: "要应用于视图中每个选定项的CSS类",
            Prototype: "selectedClass：String",
            Name:"选中样式类名",
            Args: {
                _Return_: "String",
            },
            Example: ""
        },
        singleSelect: {
            Description: "True表示为同一时间只允许选取一个对象项，false表示没有选区也是可以的（默认为false）。",
            Prototype: "singleSelect：Boolean",
            Name:"单选",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        },
        multiSelect: {
            Description: "如果为True，则允许一次选择多个项目，false表示允许一次只选择一个项目或根本不选择任何选项，具体取决于singleSelect的值（默认为false）",
            Prototype: "multiSelect：Boolean",
            Name:"允许选择多项",
            Args: {
                _Return_: "Boolean",
            },
            Example: ""
        }
    },
	Method: {},
	Event: {
        contextmenu: {
            Description: "右击的原始事件",
            Prototype: "contextmenu(e)",
            Name:"右击事件",
            Args: {
                _Return_: "",
                s:"EventObject"
            },
            Example: ""
        },
        dblclick: {
            Description: "双击的原始事件",
            Prototype: "dblclick(e) ",
            Name:"双击事件",
            Args: {
                _Return_: "",
                e:"EventObject"
            },
            Example: ""
        },
        click: {
            Description: "点击的原始事件",
            Prototype: "click(e) ",
            Name:"单击事件",
            Args: {
                _Return_: "",
                e:"EventObject"
            },
            Example: ""
        }
    }
};
ControlsDataManage._add(Data_vmdDataView);
////////////////////////////////////////////
///菜单项 vmdMenu
////////////////////////////////////////////
var Data_vmdMenu = {
	BaseType: "Control",
	Type: "vmdMenu",
	Property: {
		allowOtherMenus: {
			Description: "值为 True 时允许同时显示多个菜单（默认为 false）",
			Prototype: "allowOtherMenus : Boolean ",
            Name:"多个菜单",
			Args: {
				_Return_: "Boolean "
			},
			Example: ""
		},
		defaultAlign: {
			Description: "该菜单相对于它的原始元素的 ",
			Prototype: "defaultAlign : String ",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		defaults: {
			Description: "作用到全体item的配置项对象，无论是通过items定义的抑或是add方法加入的。默认配置项可以是任意数量的name/value组合，只要是能够被菜单使用的项就可以。 ",
			Prototype: "defaults : Object ",
			Args: {
				_Return_: "Object"
			},
			Example: ""
		},
		items: {
			Description: "添加到菜单的Item，类型为Array",
			Prototype: "items : Mixed",
			Args: {
				_Return_: "Mixed"
			},
			Example: ""
		},
		minWidth: {
			Description: "以象素为单位设置的菜单最小宽度值（默认为 120）",
			Prototype: "minWidth : Number ",
			Args: {
				_Return_: "Number"
			},
			Example: ""
		},
		shadow: {
			Description: '当值为 True 或者 "sides" 时为默认效果，"frame" 时为4方向有阴影，"drop" 时为右下角有阴影（默认为 "sides"） ',
			Prototype: "shadow : Boolean/String ",
			Args: {
				_Return_: "Boolean/String "
			},
			Example: ""
		},
		subMenuAlign: {
			Description: "该菜单中子菜单的 Ext.ElementalignTo 定位锚点的值（默认为'tl - tr ? '） ",
			Prototype : "subMenuAlign : String ",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		isVisible: {
			Description: "只读",
			Prototype: "isVisible boolean",
			Args: {
				_Return_: "boolean"
			},
			Example: ""
		},
        floating: {
            Description: "一个被配置为floating: true (默认的)的菜单将呈现为一个绝对定位， 如果配置为floating: false， 菜单也许被用来作为其他Container的一个子项目",
            Prototype: "floating : Boolean",
            Name:"绝对定位",
            Args: {
                _Return_: "boolean"
            },
            Example: ""
        },
	},
	Method: {
		add: {
			Description: ["添加一个或多个 Menu 类支持的菜单项，或者可以被转换为菜单项的对象。满足下列任一条件即可： ",
				"任何基于 Ext.menu.Item 的菜单项对象 ",
				"可以被转换为菜单项的 HTML 元素对象 ",
				"可以被创建为一个菜单项对象的菜单项配置选项对象 ",
				"任意字符串对象，值为 \'-\' 或 \'separator\' 时会在菜单中添加一个分隔栏，其他的情况下会被转换成为一个 Ext.menu.TextItem 对象并被添加到菜单中 "
			].join("\n"),
			Prototype: "add(args)  ",
            Name:"添加菜单项",
			Args: {
				_Return_: "object  被添加的菜单项，或者多个被添加的菜单项中的最后一个",
				args: "Mixed  一个或多个菜单项，菜单项配置选项或其他可以被转换为菜单项的对象"
			},
			Example: ["// 创建一个菜单",
				"var menu = new Ext.menu.Menu();",
				"// 通过构造方法创建一个菜单项",
				"var menuItem = new Ext.menu.Item({ text: \'New Item!\' });",
				"// 通过不同的方法一次添加一组菜单项。// 最后被添加的菜单项才会被返回。var item = menu.add(",
				"    menuItem,               // 添加一个已经定义过的菜单项",
				"    \'Dynamic Item\',         // 添加一个 TextItem 对象",
				"    \'-\',                    // 添加一个分隔栏",
				"    { text: \'Config Item\' }  // 由配置选项对象生成的菜单项",
				");"
			].join("\n")
		},
		addElement: {
			Description: "添加一个Element 对象到菜单 ",
			Prototype: "addElement(el) ",
            Name:"添加元素对象",
			Args: {
				_Return_: "object  被添加的菜单项 ",
				el: "Mixed \r\n" +
					"   被添加的元素或者 DOM 节点，或者它的ID "
			},
			Example: ""
		},
		addItem: {
			Description: "添加一个已经存在的基于 menu.Item 的对象到菜单 ",
			Prototype: "addItem(item) ",
            Name:"添加菜单项",
			Args: {
				_Return_: " object  被添加的菜单项 ",
				item: "object 被添加的菜单项 "
			},
			Example: ""
		},
		addMenuItem: {
			Description: "根据给出的配置选项创建一个 Ext.menu.Item 对象并添加到菜单 ",
			Prototype: "addMenuItem(config)",
            Name:"创建并添加菜单项",
			Args: {
				_Return_: " 被添加的菜单项 ",
				config: "Object  菜单配置选项对象 "
			},
			Example: ""
		},
		addSeparator: {
			Description: "添加一个分隔栏到菜单",
			Prototype: "  addSeparator() ",
            Name:"添加分隔栏",
			Args: {
				_Return_: "Ext.menu.Item  被添加的菜单项 "
			},
			Example: ""
		},
		addText: {
			Description: "根据给出的文本创建一个 Ext.menu.Item 对象并添加到菜单 ",
			Prototype: "addText(text ]) ",
            Name:"创建并添加菜单项",
			Args: {
				_Return_: "Ext.menu.Item  被添加的菜单项 ",
				text: "String  菜单项中显示的文本 "
			},
			Example: ""
		},
		// getEl: {
		// 	Description: "返回该菜单所基于的 Ext.Element 对象",
		// 	Prototype: "  getEl() ",
		// 	Args: {
		// 		_Return_: "Ext.Element  元素对象  "
		// 	},
		// 	Example: ""
		// },
		hide: {
			Description: "隐藏该菜单及相关连的父级菜单 ",
			Prototype: "hide([deep])",
            Name:"隐藏菜单",
			Args: {
				_Return_: "void",
				deep: "Boolean  可选） 值为 True 时则递归隐藏所有父级菜单，如果有的话（默认为 false） "
			},
			Example: ""
		},
		insert: {
			Description: "在指定的位置插入一个已经存在的基于 Ext.menu.Item 的对象到菜单 ",
			Prototype: " insert(index,item)  ",
            Name:"插入菜单项",
			Args: {
				_Return_: " 要添加的菜单项  ",
				index: "Number  要插入的对象在菜单中菜单项列表的位置的索引值 ",
				item: "要添加的菜单项  "
			},
			Example: ""
		},
		remove: {
			Description: "从菜单中删除并销毁菜单项 ",
			Prototype: "remove(item)  ",
            Name:"删除项",
			Args: {
				_Return_: "void  ",
				item: "Ext.menu.Item  要删除的菜单项   "
			},
			Example: ""
		},
		removeAll: {
			Description: "从菜单中删除并销毁所有菜单项 ",
			Prototype: "removeAll() ",
            Name:"删除所有菜单项",
			Args: {
				_Return_: "void "
			},
			Example: ""
		},
		show: {
			Description: "相对于其他元素显示该菜单 ",
			Prototype: "show(element,[position],[parentMenu]) ",
            Name:"显示菜单",
			Args: {
				_Return_: "void",
				element: "Mixed  要对齐到的元素  ",
				position: "String  可选） 对齐元素时使用的Ext.ElementalignTo 定位锚点（默认为 this.defaultAlign） ",
				parentMenu: "可选） 该菜单的父级菜单，如果有的话（默认为 undefined）  "
			},
			Example: ""
		},
		showAt: {
			Description: "在指定位置显示菜单",
			Prototype: "showAt(xyPosition,[parentMenu ]) ",
            Name:"在指定位置显示菜单",
			Args: {
				_Return_: "void",
				xyPosition: "Array  显示菜单时所用的包含 X 和 Y [x,y] 的坐标值（坐标是基于页面的） ",
				parentMenu: "可选） 该菜单的父级菜单，如果有的话（默认为 undefined）  "
			},
			Example: ""
		}
	},
	Event: {}
};
ControlsDataManage._add(Data_vmdMenu);
////////////////////////////////////////////
///菜单项 vmdMenuItem
////////////////////////////////////////////
var Data_vmdMenuItem = {
	BaseType: "Control",
	Type: "vmdMenuItem",
	Property: {
		href: {
			Description: "要使用的那个链接的href属性 (默认为 '#'). ",
			Prototype: "href : String ",
            Name:"链接",
			Args: {
				_Return_: "String "
			},
			Example: ""
		},
		hrefTarget: {
			Description: "要使用的那个链接的target属性 (defaults to ''). ",
			Prototype: "hrefTarget : String ",
            Name:"链接锚点",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		icon: {
			Description: "指定该菜单项显示的图标的路径 ",
			Prototype: "icon : String ",
            Name:"图标",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		iconCls: {
			Description: "定义了背景图的CSS样式类，用于该项的图标显示。(默认为 '') ",
			Prototype: "iconCls : String ",
            Name:"图标样式类",
			Args: {
				_Return_: "String"
			},
			Example: ""
		},
		showDelay: {
			Description: "菜单项显示之前的延时时间（默认为200）",
			Prototype: "showDelay : Number ",
			Args: {
				_Return_: "Number"
			},
			Example: ""
		},
		text: {
			Description: "此项显示的文本 (默认为 '').",
			Prototype: "text : String  ",
            Name:"文本",
			Args: {
				_Return_: "String "
			},
			Example: ""
		}
	},
	Method: {
		setIconClass: {
			Description: "把CSS样式类得效果应用在items的图标元素上",
			Prototype: "setIconClass(cls) ",
            Name:"设置图标样式类",
			Args: {
				_Return_: "void",
				cls: "String  把CSS样式类得效果应用在items的图标元素上 "
			},
			Example: ""
		},
		setText: {
			Description: "设置该菜单项显示的文本",
			Prototype: "setText(text) ",
            Name:"设置显示文本",
			Args: {
				_Return_: "void  ",
				text: "String \r\n" +
					"   被添加的元素或者 DOM 节点，或者它的ID "
			},
			Example: ""
		}
	},
	Event: {}
};
ControlsDataManage._add(Data_vmdMenuItem);


var Data_vmdReport={
	BaseType: "Control",
	Type: "vmdReport",
	Property: {
        fillReport: {
            Description: "该报表是否是填报报表",
            Prototype: "Boolean  fillReport",
            Name:"填报",
            Args: {
                _Return_: "Boolean "
            },
            Example: ""
        },
        path: {
            Description: "点击上传本地的报表文件，显示报表文件名称",
            Prototype: "String path",
            Name:"名称",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
        relativepath: {
            Description: "该报表在服务器上的相对路径",
            Prototype: "String relativepath",
            Name:"相对路径",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
        dsnames: {
            Description: "该报表主表用到的数据id名称",
            Prototype: "String dsnames",
            Name:"数据集",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
        subrptds: {
            Description: "子表用到的数据集id名称",
            Prototype: "String subrptds",
            Name:"子表数据集",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
        nousedataset: {
            Description: "报表定制中是否添加了数据集，选中表示未添加，只做显示，不可设置",
            Prototype: "Boolean nousedataset",
            Name:"是否使用数据集",
            Args: {
                _Return_: "Boolean "
            },
            Example: ""
        },
        size: {
            Description: "报表定制中是否添加了数据集，选中表示未添加",
            Prototype: "String size",
            Name:"尺寸",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        align: {
            Description: "报表的位置",
            Prototype: "String size",
            Name:"位置",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        isSelectStates: {
            Description: "设置是否启用选中状态",
            Prototype: "String isSelectStates",
            Name: "选中状态",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        isServer: {
            Description: "设置是否是服务器端",
            Prototype: "String isServer",
            Name: "服务器端",
            Args: {
                _Return_: "Boolean"
            },
            Example: ""
        },
        ocx_version: {
            Description: "设置ocx版本",
            Prototype: "String ocx_version",
            Name: "ocx版本",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        loadMode: {
            Description: "设置数据加载方式",
            Prototype: "String loadMode",
            Name: "数据加载方式",
            Args: {
                _Return_: "String"
            },
            Example: ""
        },
        loadNumber: {
            Description: "设置每页加载条数",
            Prototype: "String loadNumber",
            Name: "每页加载条数",
            Args: {
                _Return_: "String"
            },
            Example: ""
        }
    },
	Method: {
		query: {
			Description: "查询方法",
			Prototype: "query() ",
            Name:"查询方法",
			Args: {
				_Return_: "void  "
			},
			Example: ""
		},
		save: {
			Description: "填报保存方法",
			Prototype: "save()",
            Name:"填报保存方法",
			Args: {
				_Return_: "void  "
			},
			Example: ""
		},
		print: {
			Description: "打印方法",
			Prototype: "print()",
            Name:"打印方法",
			Args: {
				_Return_: "void  "
			},
			Example: ""
		},
		getRerport: {
			Description: "获取填报对象，传入参数name时可以获取名称为name的子表",
			Prototype: "getRerport(name) ",
            Name:"获取填报对象",
			Args: {
				_Return_: "HwReport  ",
				name: "报表名称"
			},
			Example: ""
		},
		importExcel: {
			Description: "填报导入excel",
			Prototype: "importExcel()",
            Name:"填报导入excel",
			Args: {
				_Return_: "void  "
			},
			Example: ""
		},
		exportExcel: {
			Description: "报表导出或另存为excel",
			Prototype: "exportExcel()",
            Name:"报表导出或另存为excel",
			Args: {
				_Return_: "void  "
			},
			Example: ""
		},
		getValue: {
			Description: "获取报表中表达式的值，参数可以直接是单元格id（例：getValue('A1')）,也可以是行、列号（例：getValue(2,3)）,或者是表达式（列：getValue('A1+B1')）",
			Prototype: "getValue(param, context)",
            Name:"获取报表中的值",
			Args: {
				_Return_: "String  ",
				param: "要获取的单元格id,行号,或者表达式",
				context: "获取值的上下文单元格（主要用在扩展的单元格中）或列索引。"
			},
			Example: "report.getValue('A1')"
		},
		setValue: {
		    Description: "设置报表单元格的值，参数可以直接是单元格id（例：setValue('A1', '')）,也可以是行、列号（例：setValue(0,0,'')）",
		    Prototype: "setValue(param, value)",
		    Name: "获取报表中的值",
		    Args: {
		        _Return_: "String  ",
		        param: "要设置的单元格id",
		        value: "设置的值。"
		    },
		    Example: "report.setValue('A1','')"
		},
		refresh: {
			Description: "刷新报表",
			Prototype: "refresh()",
            Name:"刷新报表",
			Args: {
				_Return_: "void  "
			},
			Example: "report.refresh()"
		},
		addRow: {
			Description: "添加行",
			Prototype: "addRow(newId, srcRowIndex, insertInd, carrys)",
            Name:"添加行",
			Args: {
				_Return_: "void  ",
				newId: '插入新行的id，不传或为null时自动生成',
				srcRowIndex: '要拷贝的行索引，负数时从后面开始计数,如-1时拷贝倒数第一行数据',
				ind: '插入新行的位置，值为负值时从左后计数，如-1时插入到倒数第二行位置',
				carrys: "插入式要携带的数据，与srcRowIndex结合使用，格式是数组，如['0,1']"
			},
			Example: "report.addRow()"
		},
		addRows: {
			Description: "添加多行",
			Prototype: "addRows(startRowIndex, rowsNum)",
            Name:"添加多行",
			Args: {
				_Return_: "void  ",
				startRowIndex: '起始行索引',
				rowsNum: '要添加的行数'
			},
			Example: "report.addRows(1, 6)"
		},
		deleteRow: {
			Description: "删除行",
			Prototype: "deleteRow(rIndex)",
            Name:"删除行",
			Args: {
				_Return_: "void  ",
				rId: '要删除的行索引，可以为负值，负值时计数从最后一行开始，如果不传，则默认删除选中的行'
			},
			Example: "report.deleteRow()"
		},
		deleteGroupRow: {
		    Description: "删除一组数据，如果要删除的行中存在跨行合并单元格，则所有被合并的行全部删除",
		    Prototype: "deleteGroupRow(rIndex)",
		    Name: "删除多行",
		    Args: {
		        _Return_: "void  ",
		        rId: '要删除的行索引，如果不传，则默认删除选中的行'
		    },
		    Example: "report.deleteGroupRow()"
		},
		getCells: {
			Description: "获取模板单元格扩展出来的所有单元格对象",
			Prototype: "getCells(param, contextCell)",
            Name:"获取模板单元格",
			Args: {
				_Return_: "Array  ",
				param: "要获取的单元格id,如A1",
				contextCell: "获取值的上下文单元格（主要用在扩展的单元格中）。"	
			},
			Example: "report.getCells('A1')"
		},
		getCell: {
			Description: "获取单个单元格对象，如果报表是横向扩展或纵向扩展，则获取第一个单元格对象",
			Prototype: "getCells(param)",
            Name:"删除行",
			Args: {
				_Return_: "RptCell  ",
				param: "要获取的单元格id,如A1"
			},
			Example: "report.getCell('A1')"
		},
		setTitle: {
			Description: "设置报表标题",
			Prototype: "setTitle(title)",
            Name:"设置标题",
			Args: {
				_Return_: "void  ",
				title: "要设置的标题文本"
			},
			Example: "report.setTitle('报表标题')"
		},
		setColumnCheck: {
			Description: "设置某列复选框是否全部选中",
			Prototype: "setColumnCheck(col, bool)",
            Name:"设置某列复选框是否全部选中",
			Args: {
				_Return_: "void  ",
				col: "列索引",
				bool: "是否选中"
			},
			Example: "report.setColumnCheck(0,true)"
		},
		isCheckedAll: {
			Description: "检查某列复选框是否全部选中",
			Prototype: "isCheckedAll(col)",
            Name:"检查某列复选框是否全部选中",
			Args: {
				_Return_: "bool  ",
				col: "列索引"
			},
			Example: "report.isCheckedAll(0)"
		},
		copyToClipboard: {
		    Description: "复制报表到剪切板",
		    Prototype: "copyToClipboard()",
		    Name: "复制报表到剪切板",
		    Args: {
		        _Return_: "void  "
		    },
		    Example: "report.copyToClipboard()"
		}
	},
	Event: {}
}
ControlsDataManage._add(Data_vmdReport);

var Data_vmdDataInput={
	BaseType: "Control",
	Type: "vmdDataInput",
	Property: {
        simpleGrid: {
            Description: "网格组件对象",
            Prototype: "simpleGrid",
            Name:"网格格式",
            Args: {
                _Return_: "object "
            },
            Example: ""
        },
        freeGrid: {
            Description: "自由格式组件对象",
            Prototype: "freeGrid",
            Name:"自由格式",
            Args: {
                _Return_: "object "
            },
            Example: ""
        }
    },
	Method: {
		showOperateBar: {
			Description: "设置编辑按钮的展示,",
			Prototype: "showOperateBar() ",
            Name:"设置编辑按钮",
			Args: {
				_Return_: "void  ",
				name: "展示列表,['add','del','save','export','import']"
			},
			Example: ""
		},
		save: {
			Description: "填报保存方法",
			Prototype: "save()",
            Name:"填报保存方法",
			Args: {
				_Return_: "void",
				success: "成功回调",
				error:"失败回调",
				onlyReturnData:""
			},
			Example: ""
		},
		importExcel: {
			Description: "填报导入excel",
			Prototype: "importExcel()",
            Name:"填报导入excel",
			Args: {
				_Return_: "void  "
			},
			Example: ""
		},
		exportExcel: {
			Description: "报表导出或另存为excel",
			Prototype: "exportExcel()",
            Name:"报表导出或另存为excel",
			Args: {
				_Return_: "void  "
			},
			Example: ""
		},
		addRow: {
			Description: "添加行",
			Prototype: "addRow(newId, srcRowIndex, insertInd, carrys)",
            Name:"添加行",
			Args: {
				_Return_: "void  ",
				newId: '插入新行的id，不传或为null时自动生成',
				srcRowIndex: '要拷贝的行索引，负数时从后面开始计数,如-1时拷贝倒数第一行数据',
				ind: '插入新行的位置，值为负值时从左后计数，如-1时插入到倒数第二行位置',
				carrys: "插入式要携带的数据，与srcRowIndex结合使用，格式是数组，如['0,1']"
			},
			Example: "report.addRow()"
		},
		deleteRow: {
			Description: "删除行",
			Prototype: "deleteRow(rIndex)",
            Name:"删除行",
			Args: {
				_Return_: "void  ",
				rId: '要删除的行索引，可以为负值，负值时计数从最后一行开始，如果不传，则默认删除选中的行'
			},
			Example: "report.deleteRow()"
		}
	},
	Event: {}
}
ControlsDataManage._add(Data_vmdDataInput);


var Data_vmdChart={
	BaseType: "",
	Type: "vmdChart",
	Property: {
        title: {
            Description: "标题",
            Prototype: "String title",
            Name:"标题",
            Args: {
                _Return_: "String "
            },
            Example: ""
		},
		width: {
            Description: "宽度",
            Prototype: "String width",
            Name:"宽度",
            Args: {
                _Return_: "String "
            },
            Example: ""
		},
		height: {
            Description: "高度",
            Prototype: "String height",
            Name:"高度",
            Args: {
                _Return_: "String "
            },
            Example: ""
		},
		style: {
            Description: "样式",
            Prototype: "String style",
            Name:"样式",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
		toolbar: {
            Description: "曲线绑定的工具条",
            Prototype: "String path",
            Name:"工具条",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
        relativepath: {
            Description: "该曲线文件在服务器上的相对路径",
            Prototype: "String relativepath",
            Name:"相对路径",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
        dsnames: {
            Description: "该曲线文件用到的数据id名称",
            Prototype: "String dsnames",
            Name:"数据集",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
        subrptds: {
            Description: "子曲线用到的数据集id名称",
            Prototype: "String subrptds",
            Name:"子表数据集",
            Args: {
                _Return_: "String "
            },
            Example: ""
        },
        templateSelect: {
            Description: "曲线模板选择",
            Prototype: "String templateSelect",
            Name:"应用模板",
            Args: {
                _Return_: "String "
            },
            Example: ""
		},
		userTemplate: {
            Description: "用户模板",
            Prototype: "Boolean userTemplate",
            Name:"用户模板",
            Args: {
                _Return_: "Boolean "
            },
            Example: ""
        },
    },
	Method: {
		addXrangelable: {
			Description: "添加类储层标识",
			Prototype:"addXrangelable([{\n" +
            "\t\t\tx1:0, //@param x1 x轴起点位置\n" +
            "\t\t\tx2:2,  //x2 x轴终点位置\n" +
            "\t\t\ty:1,  // @param y  在顶部第一层(1)还是等二层(2)" +
            "\t\t\tcolor:'#fff',  //@param fillcolor 填充颜色\n" +
            "\t\t\tborderColor:'#000', // @param borderColor 边框颜色\n" +
            "\t\t}])",
            Name:"添加类储层标识",
			Args: {
				_Return_: "void  ",
			},
			Example: "addXrangelable()"
		},
		getCharts: {
			Description: "获取曲线对象数组",
			Prototype: "getCharts()",
            Name:"获取曲线对象数组",
			Args: {
				_Return_: "charts  ",
			},
			Example: ""
		},
		setTitle: {
            Description: "设置曲线标题",
            Prototype: "setTitle()",
            Name:"设置标题",
            Args: {
                _Return_: "charts",
            },
            Example: "setTitle('井日度产油量')"
        },
		setLinesStyle:{
			Description: "设置曲线线条样式",
			Prototype: "setLinesStyle(lWidth,lColor,sName)",
			Name:"设置曲线线条样式",
			Args: {
			    _Return_: "charts",
			},
			Example: "setLinesStyle(lWidth,lColor,sName)\n"+
			"/**\n" +
            "* 设置折线的颜色、宽度\n" +
            "* @param lColor 折线图中指线的颜色，柱状图中柱子的颜色\n" +
            "* @param lWidth 线宽\n" +
            "* @param sName  所属序列名称，不传默认是曲线所有序列\n" +
            "* @constructor\n" +
            "*/"
		},
        setPointStyle:{
            Description: "设置曲线点样式",
            Prototype: "setPointStyle(lWidth,fillColor,sName)",
            Name:"设置曲线点样式",
            Args: {
                _Return_: "charts",
            },
            Example: "setPointStyle(lWidth,fillColor,sName)\n"+
            "/**\n" +
            "* 设置点的颜色、半径\n" +
            "* @param lWidth 点半径\n" +
            "* @param fillColor 点的颜色\n" +
            "* @param sName  所属序列名称，不传默认是曲线所有序列\n" +
            "* @constructor\n" +
            "*/"
		},
		setSerierName:{
            Description: "设置序列名称",
            Prototype: "setSerierName()",
            Name:"设置序列列名称",
            Args: {
                _Return_: "charts",
            },
            Example: "//参数为各序列名称的数组\n" +
            "setSerierName(['序列1'，'序列2']);"
        },
		setPieColor:{
		    Description: "设置饼图及环形图颜色",
		    Prototype: "setPieColor()",
		    Name:"设置饼图及环形图颜色",
		    Args: {
		        _Return_: "charts",
		    },
		    Example: "//参数为各颜色的数组\n" +
		    "setPieColor(['#fffeee'，'rgb(254,254,74)']);"
		},
		setxAxisePlotLines:{
			Description: "设置X轴坐标标标示线",
			Prototype: "setxAxisePlotLines(AxiseIndex,width,color,value,textOption)",
			Name:"设置横坐标标示线",
			Args: {
			    _Return_: "charts",
			},
			Example: "//参数 AxiseIndex:X轴坐标轴的index值，传入空值或者null，默认为第一条轴\n" +
			"//参数 width:标示线宽度\n" +
			"//参数 color:标示线颜色\n" +
			"//参数 value:标示线对应坐标轴上的值\n" +
			"//参数 textOption:标示线便签对象 \n"+
			"//包含 text文本、color 文字颜色、align对齐方式（top,middle\bottom）\n" +
			"setxAxisePlotLines(0,2,'#fff000','2010-01-01',{text:'标示线'，color:'#333',align:'top'});"
		},
		setyAxisePlotLines:{
			Description: "设置Y轴坐标标示线",
			Prototype: "setyAxisePlotLines(AxiseIndex,width,color,value,textOption)",
			Name:"设置纵坐标标示线",
			Args: {
			    _Return_: "charts",
			},
			Example: "//参数 AxiseIndex:Y轴坐标轴的index值，传入空值或者null，默认为第一条轴\n" +
			"//参数 width:标示线宽度\n" +
			"//参数 color:标示线颜色\n" +
			"//参数 value:标示线对应坐标轴上的值\n" +
			"//参数 textOption:标示线便签对象 \n"+
			"//包含 text文本、color 文字颜色、align对齐方式（left,right\center）\n" +
			"setyAxisePlotLines(0,2,'#fff000','2010-01-01',{text:'标示线'，color:'#333',align:'left'});"
		},
		deleAxisePlotLines:{
			Description: "清除标示线",
			Prototype: "deleAxisePlotLines(axiseType,AxiseIndex)",
			Name:"清除标示线",
			Args: {
			    _Return_: "charts",
			},
			Example: "//参数 axiseType:坐标轴的类型，x/y 表示要删除的表示线属于X轴还是y轴\n" +
			"//参数 AxiseIndex:Y轴坐标轴的index值，传入空值或者null，默认为第一条轴\n" +
			"setyAxisePlotLines(0,2,'#fff000','2010-01-01');"
		},
		setAxiseTileName:{
			Description: "设置轴坐标轴名称",
			Prototype: "setyAxiseTileName(AxisType,AxiseIndex,newName)",
			Name:"设置轴坐标轴名称",
			Args: {
			    _Return_: "charts",
			},
			Example: "参数 AxisType: 轴类型 传入 'x'或者'y'区分设置的是X轴还是Y轴\n"+
			"//参数 AxiseIndex:轴坐标轴的index值，传入空值或者null，默认为第一条轴\n" +
			"//参数 newName:设置的名字\n" +
			"setyAxiseTileName(0,'日产油');"
		},
		renderRect:{
			Description: "绘制标注背景",
			Prototype: "renderRect(yAxisIndex,  // @param yAxisIndex 所属Y轴 \n"+
			"{\n" +
            "\t\t\tx1:0, //@param x1 x轴起点位置\n" +
            "\t\t\tx2:2,  //x2 x轴终点位置\n" +
            "\t\t\ty1:0,  // @param y1 y轴起点位置(从顶端开始算起)\n" +
            "\t\t\ty2:0,  //@param y2 y轴终点位置\n" +
            "\t\t\tfillcolor:'#fff',  //@param fillcolor 填充颜色\n" +
            "\t\t\tborderColor:'#000', // @param borderColor 边框颜色\n" +
            "\t\t\ttext:null, // @param text 文本\n" +
            "\t\t\tfontSize:'12px', //@param fontSize 文本字体\n" +
            "\t\t\ttextColor:'#333', // @param textColor 文本颜色\n" +
            "\t\t})",
			Name:"绘制标注背景",
			Args: {
			    _Return_: "charts",
			},
			Example: "renderRect(yAxisIndex,option);"
		},
		renderLabel:{
            Description: "绘制标签",
            Prototype: "renderLabel(seriesName, // @param seriesName 点所属的序列名称 \n"+
			"{\n" +
            "\t\t\tx:0, //@param x  点的X轴对应的值\n" +
            "\t\t\ty:0,  //@param y  点的Y轴对应的值\n" +
            "\t\t\ttext:'示例标注',  //@param text 文本内容\n" +
            "\t\t\tsize:'10px',  // @param size 文本字体\n" +
            "\t\t\ttextColor:\"#000\", //@param textColor 文本颜色\n" +
            "\t\t\tborderWidth:0, //@param borderWidth 边框宽度\n" +
            "\t\t\tborderColor:'#000', //@param borderColor 边框颜色\n" +
            "\t\t\tbgColor:'rgba(255,255,255,0)', // @param borderColor 边框颜色\n" +
            "\t\t\tcallback:null // @param callback 回调函数\n" +
            "\t\t})",
			Name:"绘制标注标签",
			Args: {
			    _Return_: "charts",
			},
			Example: "renderLabel(seriesName,option);"
		},
		setSeriesShow:{
			Description: "设置序列显示/隐藏",
			Prototype: "setSeriesShow(seriesName,isShow)",
            Name:"设置序列显示/隐藏",
            Args: {
				seriesName:'string 序列名称',
				isShow:'是否显示 true/false',
                _Return_: "charts",
            },
            Example: "//参数为序列名称、是否现实\n" +
            "setSerierName(seriesName,isShow);"
		},
		deleSeries:{
			Description: "删除序列",
			Prototype: "deleSeries(seriesName)",
            Name:"删除序列",
            Args: {
				seriesName:'string 要删除的序列名称',
                _Return_: "被删除的序列及所属Y轴的数组对象",
            },
            Example: "//要删除的序列名称\n" +
            "deleSeries(seriesName)"
		},
		restoreSeries:{
			Description: "恢复被删除序列",
			Prototype: "restoreSeries(seriesName)",
            Name:"恢复被删除序列",
            Args: {
				seriesName:'string 要恢复的序列名称'
            },
            Example: "//要恢复的序列名称\n" +
            "restoreSeries(seriesName)"
		},
		setChartBackgroundColor:{
			Description: "设置图表背景色",
			Prototype: "setChartBackgroundColor(color)",
            Name:"设置图表背景色",
            Args: {
				color:'string 颜色',
                _Return_: "charts",
            },
            Example: "//参数为颜色\n" +
            "setChartBackgroundColor(color)"
		},
		setChartMagin:{
			Description: "设置图表边距",
			Prototype: "setChartMagin(type,value)",
            Name:"设置图表边距",
            Args: {
				type:'string 边距类型  top/left/right/bottom',
				value:'number  边距值',
                _Return_: "charts",
            },
            Example: "//参数为 边距类型及设置的值\n" +
            "setChartMagin(type,value)"
		},
		addToolBarConfig:{
			Description: "顶部工具条图标配置",
			Prototype: "addToolBarConfig(imgUrl, jsonUrl)",
            Name:"顶部工具条图标配置",
            Args: {
				imgUrl:'string 图标文件路径',
				jsonUrl:'string  json配置文件路径',
                _Return_: "charts",
            },
            Example: "//参数为 图标文件路径及json配置文件路径\n" +
            "addToolBarConfig(imgUrl, jsonUrl)"
		},
		setToolBarIsLoad:{
			Description: "顶部工具条是否初始加载",
			Prototype: "addToolBarConfig(bool)",
            Name:"顶部工具条是否初始加载",
            Args: {
				bool:'string 顶部工具条是否初始加载 默认false',
                _Return_: "charts",
            },
            Example: "//参数为 顶部工具条是否初始加载 默认false\n" +
            "addToolBarConfig(true)"
		},
        getChartMagin:{
            Description: "获取图表边距",
            Prototype: "getChartMagin(type)",
            Name:"获取图表边距",
            Args: {
                type:'string 边距类型  top/left/right/bottom',
                _Return_: "获取到的边界值",
            },
            Example: "//参数为 边距类型\n" +
            "getChartMagin(type)"
		},
		getChartSize:{
            Description: "获取图表宽高",
            Prototype: "getChartSize(type)",
            Name:"获取图表宽高",
            Args: {
                type:'string    width/height',
                _Return_: "获取到的宽度或者高度值",
            },
            Example: "//参数为 width或者height\n" +
            "getChartSize(type)"
		},
		setChartWidth:{
            Description: "设置图表宽度",
            Prototype: "setChartWidth(500)",
            Name:"设置图表宽度",
            Args: {
                type:'number  ',
                _Return_: "",
            },
            Example: "//参数为 width\n" +
            "setChartWidth(500)"
		},
		setChartHeight:{
            Description: "设置图表高度",
            Prototype: "setChartHeight(500)",
            Name:"设置图表高度",
            Args: {
                type:'number  ',
                _Return_: "",
            },
            Example: "//参数为 height\n" +
            "setChartHeight(500)"
		},
        getSeriesConfig:{
            Description: "获取序列相关参数",
            Prototype: "getSeriesConfig(name)",
            Name:"获取序列颜色",
            Args: {
                json:'Object 序列的相关参数集合  color-颜色，isShow-是否显示，type-类型 style-线型（type为曲线图时才返回）',
                _Return_: "获取到的数据   不传参数怎返回所有序列的相关数据的集合",
            },
            Example: "//参数为 序列的名称\n" +
            "getSeriesConfig(name)"
        },
        getChartTitle:{
            Description: "获取标题名称",
            Prototype: "getChartTitle()",
            Name:"获取标题名称",
            Args: {
                _Return_: "标题名称",
            },
            Example: "getChartTitle(name)"
        },
        getChartBackgroundColor:{
            Description: "获取曲线背景色",
            Prototype: "getChartBackgroundColor()",
            Name:"获取曲线背景色",
            Args: {
                _Return_: "获取到的色值",
            },
            Example: "getChartBackgroundColor()"
		},
		getSelectSeriesData:{
			Description: "获取曲线数据",
			Prototype: "getSelectSeriesData()",
			Name:"获取曲线数据",
			Args: {
				_Return_: "获取到的数据数组",
			},
			Example: "getSelectSeriesData()"
		},
        loadUserTemplate: {
            Description: "加载模板",
            Prototype: "loadUserTemplate(url)",
            Name:"加载模板",
            Args: {
                name:'url 模板加载路径',
            },
            Example: "loadUserTemplate(url)"
        },
        setUserTemplate: {
            Description: "设置模板下载路径",
            Prototype: "setUserTemplate(url)",
            Name:"设置模板下载路径",
            Args: {
                name:'url 模板下载路径',
            },
            Example: "setUserTemplate(url)"
		},
		setxAxisLablesFormatter:{
			Description: "设置X轴标签格式",
            Prototype: "setxAxisLablesFormatter(fun)",
            Name:"设置X轴标签格式",
            Args: {
				fun:'处理逻辑函数   通过函数返回的this获取相关信息: \n' +
				"this.axis（坐标轴）、this.chart（曲线）、this.isFirst（是否是第一个标签）\n"+
				"this.isLast、this.value(当前标签的值)",
            },
            Example: "chart.setxAxisLablesFormatter(function(){\n"+
				"if(this.isFirst){ \n"+
					"return chart.date_getFormatDate(this.value,'mm-dd')\n"+
				"}else{"+
					"return chart.date_getFormatDate(this.value,'dd') \n"+
				"} \n"+
			"})"
		},
		ISetTooltipFormatter:{
			Description: "设置数据提示框格式",
            Prototype: "ISetTooltipFormatter(fun)",
            Name:"设置数据提示框格式",
            Args: {
				fun:'处理逻辑函数   通过函数返回的this获取相关信息: \n' +
				"可通过this获取this.points，this.series，this.x，this.y 等属性 ",
            },
            Example: "chart.ISetTooltipFormatter(function(){ \n"+
					"return this.x +':'+this.y  \n"+
			"})"
		},
		date_getFormatDate:{
			Description: "utc时间戳转指定格式日期",
            Prototype: "date_getFormatDate(millisecond, format)",
            Name:"utc时间戳转指定格式日期",
            Args: {
				millisecond:'utc时间戳',
				format:'时间格式  YYYY-mm-dd hh:mi:ss.ms ',
            },
            Example: "chart.date_getFormatDate(value,'mm-dd'))"
		}
	},
	Event: {
        click: {
            Description: "点击曲线图表区触发",
            Prototype: "click(sender,chart,e) ",
            Name:"单击事件",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                chart:'曲线图表对象',
                e:"常见事件信息"
            },
            Example: ""
        },
        load: {
            Description: "图表加载完成时触发",
            Prototype: "load(sender,chart) ",
            Name:"",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                chart:'曲线图表对象'
            },
            Example: ""
        },
        SeriesClick: {
            Description: "点击曲线序列时触发",
            Prototype: "SeriesClick(sender,series,e) ",
            Name:"单击事件",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                series:'点击的序列对象',
                e:"常见事件信息"
            },
            Example: ""
        },
        legendItemClick: {
            Description: "当数据列对应的图例项被点击时触发的事件回调函数",
            Prototype: "legendItemClick(sender,series,e) ",
            Name:"单击事件",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                series:'点击图例独营的数据列对象',
                e:"常见事件信息"
            },
            Example: "关闭图例点自身的点击行为 \n" +
            "function chart_legendItemClick(sender,series,e){\n" +
            "   return false;\n" +
            "}"
        },
        SeriesMouseOver: {
            Description: "当鼠标进入数据列所在范围时触发的事件回调函数",
            Prototype: "SeriesMouseOver(sender,series,e) ",
            Name:"鼠标移入",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                series:'序列对象',
                e:"常见事件信息"
            },
            Example: ""
        },
        SeriesMouseOut: {
            Description: "当鼠标划出数据列时触发的事件回调函数",
            Prototype: "SeriesMouseOut(sender,series,e) ",
            Name:"鼠标移出",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                series:'序列对象',
                e:"常见事件信息"
            },
            Example: ""
        },
		afterChartRender:{
            Description: "当运行模式下曲线绘制完成后触发",
            Prototype: "afterChartRender(sender,e) ",
            Name:"曲线绘制完成",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                e:"常见事件信息"
            },
            Example: ""
        },
        xAisAfterSetExtremes:{
            Description: "曲线坐标轴发生变化时触发\n" +
            "包括zoom缩放后，曲线底部滚动条拖动后",
            Prototype: "xAisAfterSetExtremes(sender) ",
            Name:"曲线坐标轴发生变化时触发",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                e:"常见事件信息"
            },
            Example: ""
        },
        saveTemplate:{
            Description: "点击运行模式下顶部工具条导出模板时触发",
            Prototype: "saveTemplate(sender,params) ",
            Name:"模板导出",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                params:"参数对象 包含模板json传及曲线base64格式地址"
            },
            Example: ""
        },
        loadTemplate:{
            Description: "点击运行模式下顶部工具条导入模板时触发",
            Prototype: "loadTemplate(sender,userTemplateUrl) ",
            Name:"模板导入",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                userTemplateUrl:"如果设置了默认的模板下载地址则返回下载地址，如果没有设置，则返回空"
            },
            Example: ""
		},
		getSelectData:{
			Description: "框选曲线时触发（选择了框选模块后才能使用）",
			Prototype: "getSelectData(sender,exportData) ",
			Name:"框选曲线获取数据",
			Args: {
				_Return_: "",
				sender:'整个曲线对象',
				exportData:"框选范围内的数据"
			},
			Example: ""
		},
        chartChanged:{
            Description: "运行模式下曲线属性被修改后触发",
            Prototype: "chartChanged(sender,params) ",
            Name:"模板导出",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                params:" Array 参数对象 包含被修改项的一个对象数组\n" +
                "被修改的属性项包含：chartTitle-标题,seriesColor-序列的颜色,seriesType-序列类型,seriesStyle-线型,seriesDele-曲线删除，seriesAdd-曲线添加" +
                "backgroundColor-曲线背景色,marginTop-上边距，marginBottom-下边距，marginLeft-左边距，marginRight-右边距，" +
                "例如：[{\n" +
                "   changeType:'seriesColor',//被修改的属性项,\n" +
                "   name:'含水', //当被改变的是序列时 此项存在，其他属性则不存在改字段 \n" +
                "   oldValue:'#fff', //原来的值\n" +
                "   newValue:'#ffeedd' // 被修改后的值\n" +
                "   }]"
            },
            Example: ""
        },
        afterrender:{
            Description: "曲线组件加载完成时触发（曲线还未绘制，曲线自定义属性设置通常在这里）",
            Prototype: "afterrender(sender,e) ",
            Name:"组件加载后",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                e:"常见事件信息"
            },
            Example: ""
        },
        beforerender:{
            Description: "曲线组件加载前触发",
            Prototype: "afterrender(sender,e) ",
            Name:"组件加载前",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                e:"常见事件信息"
            },
            Example: ""
        },
	}
}
ControlsDataManage._add(Data_vmdChart);

var vmdChartToolBar={
	BaseType: "",
	Type: "vmdChartToolBar",
	Property: {
        jsonPath: {
            Description: "配置文件路径",
            Prototype: "String title",
            Name:"配置路径",
            Args: {
                _Return_: "String "
            },
            Example: ""
		},
		imgPath: {
            Description: "图标文件配置路径",
            Prototype: "String width",
            Name:"图标路径",
            Args: {
                _Return_: "String "
            },
            Example: ""
		},
		chart: {
            Description: "默认状态下的关联曲线",
            Prototype: "String height",
            Name:"关联组件",
            Args: {
                _Return_: "String "
            },
            Example: ""
		}
    },
	Method: {
		
	},
	Event: {
        afterrender:{
            Description: "组件加载完成时触发",
            Prototype: "afterrender(sender,e) ",
            Name:"组件加载后",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                e:"常见事件信息"
            },
            Example: ""
        },
        beforerender:{
            Description: "组件加载前触发",
            Prototype: "beforerender(sender,e) ",
            Name:"组件加载前",
            Args: {
                _Return_: "",
                sender:'整个曲线对象',
                e:"常见事件信息"
            },
            Example: ""
		},
		toolBarClick:{
			Description: " 点击工具条按钮触发",
            Prototype: "toolBarClick(sender,com,id) ",
            Name:"组件加载前",
            Args: {
                _Return_: "",
				sender:'工具条组件对象本身',
				com:'相关联的组件对象',
                id:"按钮的id"
            },
            Example: ""
		}
	}
}
ControlsDataManage._add(vmdChartToolBar);

var Data_vmdImg={
    BaseType: "Control",
    Type: "vmdImg",
    Property: {
        src: {
            Description: "源文件",
            Prototype: "String",
            Name:"源文件",
            Args: {
                _Return_: "String  ",
            },
            Example: ""
        }
    },
    Method: {},
    Event: {}
}
ControlsDataManage._add(Data_vmdImg);

//subview
var Data_vmdSubView = {
    BaseType: "panel",
    Type: 'vmdSubView',
    Method: {
        close: {
            Description: "关闭窗口,该方法会直接将dom对象清空，该窗口对象将置为null",
            Prototype: "close()",
            Name: "关闭窗口",
            Args: {
                _Return_: "void  ",
            },
            Example: ""
        },
        hide: {
            Description: "隐藏窗口,该方法会直接将dom对象隐藏",
            Prototype: "close()",
            Name: "隐藏窗口",
            Args: {
                _Return_: "void  ",
            },
            Example: ""
        }
    }

}
ControlsDataManage._add(Data_vmdSubView);
//subwindow
var Data_vmdSubWindow = {
    BaseType: "panel",
    Type: 'vmdSubWindow',
    Method: {
        show: {
            Description: "显示窗口",
            Prototype: "show(params)",
            Name: "显示窗口",
            Args: {
                
                params: "传递的url参数，格式为json结构，如{id:'test',name:'test'}",
                _Return_: "void ",
            },
            Example: ""
        }
    }

}
ControlsDataManage._add(Data_vmdSubWindow);

var Data_vmdDataPre = {
    BaseType: "vmdButton",
    Type: 'vmdDataPre',
	Property: {
        dateInput: {
            Description: "通用录入组件",
            Prototype: "String dateInput",
            Name:"通用录入组件",
            Args: {
                _Return_: "String "
            },
            Example: ""
		},
        store: {
            Description: "数据集",
            Prototype: "String store",
            Name:"数据集",
            Args: {
                _Return_: "String "
            },
            Example: ""
		},
        dataConfig: {
            Description: "数据准备配置",
            Prototype: "String dataConfig",
            Name:"数据准备配置",
            Args: {
                _Return_: "String "
            },
            Example: ""
		}
	},
    Event: {
        beforeDataPre: {
            Description: "数据准备前",
            Prototype: "beforeDataPre(sender) ",
            Name:"单击事件",
            Args: {
                _Return_: "",
                sender:'数据准备对象'
            },
            Example: ""
        },
		afterDataPre: {
            Description: "数据准备后",
            Prototype: "afterDataPre(sender) ",
            Name:"单击事件",
            Args: {
                _Return_: "",
                sender:'数据准备对象'
            },
            Example: ""
        }
    }

}
ControlsDataManage._add(Data_vmdDataPre);





