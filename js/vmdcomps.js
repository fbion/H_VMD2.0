/*
filename：vmdcomps.js
creater：mafei
date created：2016.12.09
description：组件运行类
date modified：20181228
modifier：成兵
version：2.2.4.20181228
others：
copyright：Copyright © 1999-2016, hwkj, All Rights Reserved
*/

Ext.namespace('vmd.comp');
//#region div
Ext.define("vmd.comp.div", {
	extend: "Ext.Container",
	xtype: "div",
	onRender: function(ct, position) {
		var me = this;

		this.callParent(arguments);

		//注册事件
		this.mon(this.el, 'click', function(e) {
			this.fireEvent('click', this, e);
		}, this)

	}

})
//#endregion

//#region vmdbutton
Ext.define("vmd.comp.button", {
	extend: "Ext.BoxComponent",
	xtype: "vmd.button",
	hidden: false,
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
	buttonSelector: 'button:first-child',
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
	iconAlign: 'left',
	icon: '',
	initComponent: function() {
		this.callParent();

		this.addEvents(
			/**
			 * @event click
			 * Fires when this button is clicked
			 * @param {Button} this
			 * @param {EventObject} e The click event
			 */
			'click',

			'mouseover',
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
			type: this.type,
			size: this.size,
			icon: this.icon ? (this.icon.indexOf('icon-') > -1 ? this.icon : 'vmd-icon-' + this.icon) : '',
			id: this.id,
			iconcls: this.iconcls
		}
	},
	// private
	onRender: function(ct, position) {
		if(!this.template) {
			if(!this.buttonTemplate) {

				this.buttonTemplate = new Ext.XTemplate(
					'<button   class="vmd-button vmd-button--{type} "',
					' type="button"  id="{id}">',
					'<tpl if="icon">',
					'<i class="{icon}"></i>',
					'</tpl>',
					'<tpl if="iconcls">',
					'<i class="{iconcls}"></i>',
					'</tpl>',
					'<span></span>',
					'</button>');

				this.buttonTemplate.compile();
			}
			this.template = this.buttonTemplate;
		}

		var btn, targs = this.getTemplateArgs();

		if(position) {
			btn = this.template.insertBefore(position, targs, true);
		} else {

			btn = this.template.append(ct, targs, true);
		}
		/**
		 * An {@link Ext.Element Element} encapsulating the Button's clickable element. By default,
		 * this references a <tt>&lt;button&gt;</tt> element. Read only.
		 * @type Ext.Element
		 * @property btnEl
		 */
		//this.btnEl = btn.child(this.buttonSelector);
		this.btnEl = btn;
		this.mon(this.btnEl, {
			scope: this,
			focus: this.onFocus,
			blur: this.onBlur
		});

		this.initButtonEl(btn, this.btnEl);

	},
	// private
	initButtonEl: function(btn, btnEl) {

		this.el = btn;

		this.overCls = this.overCls || 'vmd-button-over';
		this.selectedCls = this.selectedCls || 'vmd-button-selected';
		this.setText(this.text);
		//禁用
		if(this.disabled) this.btnEl.addClass('is-disabled');
		//扁平
		if(this.plain) this.btnEl.addClass('is-plain');
		//大小
		if(this.size) this.btnEl.addClass('vmd-button--' + this.size);

		if(Ext.isDefined(this.tabIndex)) {
			btnEl.dom.tabIndex = this.tabIndex;
		}

		if(this.handleMouseEvents) {
			this.mon(btn, {
				scope: this,
				mouseover: this.onMouseOver
			});
		}
		this.mon(btn, this.clickEvent, this.onClick, this);

	},
	// private
	afterRender: function() {
		this.callParent();

		this.doc = Ext.getDoc();
		// this.doAutoWidth();
	},

	// private
	onDestroy: function() {
		//基类自动会调用此方法销毁
		if(this.rendered) {
			this.doc.un('mouseover', this.monitorMouseOver, this);

			//this.doc.un('mouseup', this.onMouseUp, this);
			delete this.doc;
			delete this.btnEl;
		}
		this.callParent();

	},

	/**
	 * Sets this Button's text
	 * @param {String} text The button text
	 * @return {Ext.Button} this
	 */
	setText: function(text) {
		this.text = text;
		if(this.el) {
			// this.btnEl.update(text || '&#160;');
			this.btnEl.child('span:last').update(text || '&#160;');
		}
		return this;
	},
	setIcon: function(icon) {
		this.icon = icon;
		this.btnEl.first().dom.className = '';
		this.btnEl.first().addClass('vmd-icon-' + icon);
	},

	/**
	 * Gets the text for this Button
	 * @return {String} The button text
	 */
	getText: function() {
		return this.text;
	},
	// private
	onDisable: function() {
		this.onDisableChange(true);
	},

	//基类接口，具体实现
	// private
	onEnable: function() {
		this.onDisableChange(false);
	},

	onDisableChange: function(disabled) {
		if(this.btnEl) {
			// if (!Ext.isIE6 || !this.text) {
			this.btnEl[disabled ? 'addClass' : 'removeClass']('is-disabled');
			// }
			this.btnEl.dom.disabled = disabled;
		}
		this.disabled = disabled;
	},
	// private
	onClick: function(e) {
		
		if(e) {
			e.preventDefault();
		}
		if(e.button !== 0) {
			return;
		}
		this.el.addClass(this.selectedCls);
		this.el.removeClass(this.overCls);
		if(!this.disabled) {

			this.fireEvent('click', this, e);
			if(this.handler) {
				//this.el.removeClass('x-btn-over');
				this.handler.call(this.scope || this, this, e);
			}
		}

	},
	// private
	onMouseOver: function(e) {

		if(!this.disabled) {
			var internal = e.within(this.el, true);
			if(!internal) {
				this.el.addClass(this.overCls);
				if(!this.monitoringMouseOver) {
					this.doc.on('mouseover', this.monitorMouseOver, this);
					this.monitoringMouseOver = true;
				}
				this.fireEvent('mouseover', this, e);
			}

		}
	},

	// private
	monitorMouseOver: function(e) {
		if(e.target != this.el.dom && !e.within(this.el)) {
			if(this.monitoringMouseOver) {
				this.doc.un('mouseover', this.monitorMouseOver, this);
				this.monitoringMouseOver = false;
			}
			this.onMouseOut(e);
		}
	},

	// private
	onMouseOut: function(e) {
		//var internal = e.within(this.el) && e.target != this.el.dom;
		this.el.removeClass(this.overCls);
		this.fireEvent('mouseout', this, e);

	},

	focus: function() {

		this.btnEl.focus();
	},

	blur: function() {
		this.btnEl.blur();
	},

	// private
	onFocus: function(e) {
		if(!this.disabled) {
			this.el.addClass('x-btn-focus');
		}
	},
	// private
	onBlur: function(e) {
		this.el.removeClass('x-btn-focus');
	}
})

//Ext.reg('vmd.button', vmd.button);
//#endregion

//#region vmdcombo
Ext.define("vmd.comp.Combo", {
	extend: "Ext.form.Field",
	xtype: 'vmd.combo',
	//默认是否选中第一项
	firstSelected: false,
	initComponent: function() {
		this.callParent();
		//定义store属性
		this.store = Ext.StoreMgr.lookup(this.store);

	},
	
	onRender: function(ct, position) {

		var me = this;

		if(!this.el) {

			this.el = document.createElement("div");
			var defaultConfig = {
				parent: this.el,
				filter: true
			};
			if(me.name) defaultConfig.name = me.name;
			if(me.width) defaultConfig.width = me.width;
			if(me.items) defaultConfig.items = me.items;
			if(me.readOnly) defaultConfig.readonly = me.readOnly;
			//设置在多选模式下禁止手动编辑，设为只读
			if(me.Multi) {
				defaultConfig.mode = "checkbox";
				defaultConfig.readonly = true;
			}						
			me.combo = new dhtmlXCombo(defaultConfig);
			me.combo.enableFilteringMode('between');
			//属性赋值
			Ext.applyIf(me, me.combo);
			//重改指向，保证dhx的原生态
			this.el = this.el.children[0];
			//务必要填写id
			this.el.id = this.id;
			Ext.fly(this.el).addClass('vmd-combo');
			//调整多选模式下 dh下拉输入框补考做的问题
			if(me.Multi) {
				me.combo.getInput().style.width = (me.width - 26) + "px";
				me.combo.getInput().style.marginLeft = "0px";
				dhtmlXCombo.prototype.modes.checkbox.optionClick=function(item, ev, combo) {
					var r = true;
					var t = (ev.target||ev.srcElement);
					while (r == true && t != null && t != item && t.className != null) {
						if (t.className) {
							var args = [item._conf.value, !item._conf.checked,item];
							if (combo.callEvent("onBeforeCheck", args) === true) {
								this.setChecked(item, !this.isChecked(item));
								combo.callEvent("onCheck", args);
							};
							r = false;
							args = null;
						} else {
							t = t.parentNode;
						}
					}
					t = combo = item = null;
					return r;
				}
				
				dhtmlXCombo.prototype.getCheckedText = function (index, mode) {
					// return checked values
					var t = [];
					for (var q = 0; q < this.list.childNodes.length; q++) {
						if (this.isChecked(q)) t.push(this._getOptionProp(this.list.childNodes[q]._optId, "text", ""));
					}
					return t;
				};				
				 me.combo.attachEvent("onCheck", function (value,state,item) {				   
					//this._getOption(item._optId)
					this.setChecked(this._getOption(item._optId).index, state);				   
					var value = this.getChecked();				   
					var text = this.getCheckedText();					
					me.combo.setComboText(text)					
					this.DOMelem_input.value = text; 					
					me.combo.openSelect();
					me.fireEvent('change', me, value.join(','),text)					
				})
			}else{
				me.combo.attachEvent("onChange", function(value, text) {					
					me.fireEvent('change', me, value, text)
				});
			}
			
			me.combo.attachEvent("onOpen",function(){
				if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&me.compatibleOCX))
				{	
					vmd.enableIframe(me.combo.list)
					Ext.defer(function(){
						vmd.iframeResize(me.combo.list,true)
					},50)   
				}
			})				
			me.combo.attachEvent("onClose",function(){				
				if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&me.compatibleOCX))
				{	
					vmd.enableIframe(me.combo.list,true)
				}
			})		
		}
		this.callParent(arguments);
	},
	onResize:function()
	{
		var me=this;				
		//
		if(me.getWidth())
			me.combo.setSize(me.getWidth())
		me.combo.setOptionWidth(me.getWidth())
	},
	onDestroy: function() {
		if(this.rendered) {
			//bug修复，清除dhx组件拖拽就在body中累加的combo的dom结构
		    // Ext.select('body>div[class*=dhxcombolist]').remove();
		    this.DOMlist && this.DOMlist.parentNode.removeChild(this.DOMlist);
		}
	},
	//private
	afterRender: function() {
		this.callParent();
		//绑定store
		if(this.store) {
			this.bindStore(this.store, true);
		}
	},

	//private
	onBeforeLoad: function() {
		//数据加载前 一般用于放置进度条
	},
	//private store数据发生变化调用该接口
	onDataChanged: function() {

		this.storeRefresh.apply(this, arguments);

	},
	// private 更新记录调用此接口
	onUpdate: function(ds, record) {
		var index = this.store.indexOf(record);
		if(index > -1) {
			this.storeRefresh();
		}
	},

	// private 添加记录调用该接口
	onAdd: function(ds, records, index) {
		this.storeRefresh();

	},

	// private 删除数据调用该接口
	onRemove: function(ds, record, index) {

		this.storeRefresh();

	},
	storeRefresh: function() {

		var el = this.el,combo = this.combo,records = this.store.getRange(),me=this;
		var oldvalue=combo.getActualValue();
		if(records.length < 1) {
			me.combo.clearAll();
		} else {

			//返回dhx组件数据的格式，将dhxcombostore的源码放到此处
			var dhxdata = [];
			for(var i = 0; i < records.length; i++) {
				var item = Ext.apply(records[i].data, {
					value: records[i].data[this.valueField],
					text: records[i].data[this.displayField]?records[i].data[this.displayField].toString():""
				})
				//dhxdata.push(records[i]);
				dhxdata.push(item);
			}

			me.combo.clearAll();
			me.combo.addOption(dhxdata);
			me.combo.callEvent("onSyncApply", []);

			if(this.store.find(this.valueField,oldvalue)!=-1){
				me.combo.setComboValue(oldvalue);
			}else{
				me.combo.setComboValue('');
				me.combo.setComboText('');
			}
			if(this.firstSelected) {
				this.setValue(dhxdata[0][this.valueField]);				
				this.combo.closeAll();
			}
		}

	},
	bindStore: function(store, initial) {
		if(!initial && this.store) {
			if(store !== this.store && this.store.autoDestroy) {
				this.store.destroy();
			} else {
				this.store.un("beforeload", this.onBeforeLoad, this);
				this.store.un("datachanged", this.onDataChanged, this);
				this.store.un("add", this.onAdd, this);
				this.store.un("remove", this.onRemove, this);
				this.store.un("update", this.onUpdate, this);
				this.store.un("clear", this.storeRefresh, this);
				this.store.un("load", this.storeRefresh, this);
			}
			if(!store) {
				this.store = null;
			}
		}
		if(store) {

			store = Ext.StoreMgr.lookup(store);
			store.on({
				scope: this,
				beforeload: this.onBeforeLoad,
				datachanged: this.onDataChanged,
				add: this.onAdd,
				remove: this.onRemove,
				update: this.onUpdate,
				clear: this.storeRefresh //store.removeAll清空所有数据调用此接口
				// load: this.storeRefresh//store.removeAll清空所有数据调用此接口
			});
		}
		this.store = store;
		if(store) {
			this.storeRefresh();
		}
	},
	setValue: function(value) {
		var me = this;
		var combo = this.combo
		if(me.combo&&me.rendered)
		{me.combo.setComboValue(value);
		var text = value;
		if(me.Multi ) {
		  if(this.valueField) {
			text = "";
			if(this.store.getCount() > 0) {
			  this.store.each(function(r) {
				if(value.split(",").indexOf(r.data[me.valueField]) >= 0) {
				  if(!text) text = r.data[me.displayField] ||  r.data[me.valueField];
				  else text += ',' + r.data[me.displayField] || r.data[me.valueField];
				  me.combo.setChecked(me.store.indexOf(r), true)
				} else
				  me.combo.setChecked(me.store.indexOf(r), false)
			  });
			}
		  }
		  //if(this.readOnly) text = "";
		  me.combo.setComboText(text)
		} else {
		  if(this.valueField) {
			var r = this.findRecord(this.valueField, value);
			if(r) {
			  text = r.data[this.displayField];
			} 
			else
			{
			  //if(this.readOnly) text = "";
			  me.combo.setComboText(text)		}	
		  }
		}
		me.combo.closeAll();
		}else return ;		
	},
	getValue: function() {
		var me=this;
		var combo = this.combo
		if(me.combo&&me.rendered)
		{if(this.Multi) {
			var cvalues = me.combo.getChecked();			
			return cvalues.join(',');
		} else 
			return me.combo.getActualValue();
		}else return "";
	},
	setText: function(value) {
		var me=this;
		var combo = this.combo
		if(me.combo&&me.rendered)			
			me.combo.setComboText(value)
		else
			return ;
	},
	getText: function() {
		var me=this;
		var combo = this.combo
		if(me.combo&&me.rendered)			
			return me.combo.getComboText();
		else
			return "";
	},
	findRecord: function(prop, value) {
		var record;
		if(this.store.getCount() > 0) {
			this.store.each(function(r) {
				if(r.data[prop] == value) {
					record = r;
					return false;
				}
			});
		}
		return record;
	},
	show: function() {
		this.callParent();
		//与extjs方法兼容
		this.el.removeClass('x-hide-display');
	},
	disable: function() {
		this.callParent();
		this.combo.conf.enabled=false;
		this.combo._hideList();
		this.addClass("dhxcombo_disabled")   
        this.combo.base.firstChild.setAttribute("disabled", "true");
	},
	enable: function() {
		this.callParent();
		this.combo.conf.enabled=true;
		this.removeClass("dhxcombo_disabled")
        this.combo.base.firstChild.removeAttribute("disabled");
	},
	setWidth:function(width)
	{
		this.callParent();
		this.combo.setSize(width)
	}
})

//Ext.reg('vmd.combo', vmd.comp.Combo);
//#endregion

Ext.define("vmd.comp.dateTime", {
	extend: "Ext.BoxComponent",
	xtype: "vmd.dateTime",
	hidden: false,
	disabled: false,
	clickEvent: 'click',
	handleMouseEvents: true,
	format: "HH:mm:ss",
	initComponent: function() {
		this.callParent();
		this.addEvents(
			'click',
			'mouseover',
			'mouseout'
		);
	},
	// private
	onRender: function(ct, position) {
		var me = this;				
		//this.callParent(arguments);
		if(!this.template) {
			if(!this.dateTimeTemplate) {
				this.dateTimeTemplate = new Ext.XTemplate(
					'<div class="x-form-field-wrap x-form-field-trigger-wrap x-form-text " id="{id}" >' +
					'<input type="text" size="12" autocomplete="off"  class=" x-form-field" style="height:100%;width:100%; border: 0 none">' +
					'<img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" class="x-form-trigger x-form-date-trigger" style="margin-left:-25px" >' +
					'</div>'
				);
				this.dateTimeTemplate.compile();
			}
			this.template = this.dateTimeTemplate;
		}
		var datet, targs = this.getTemplateArgs();
		if(position) {
			datet = this.template.insertBefore(position, targs, true);
		} else {
			datet = this.template.append(ct, targs, true);
		}
		this.datetime = datet;
		
		this.el=datet;
	},
	getTemplateArgs: function() {
		return {
			format: this.format,
			id: this.id,
		}
	},
	// private
	afterRender: function() {
		var me = this;
		this.callParent();		
		this.doc = Ext.getDoc();
		this.datatime_input = this.datetime.dom.firstChild;
		this.datatime_icon = this.datetime.dom.lastChild;
		//年选择器
		var getType = function() {
			var type = "date"
			if(me.format.indexOf('y') >= 0)
				type = 'year'
			if(me.format.indexOf('M') >= 0)
				type = 'month'
			if(me.format.indexOf('d') >= 0)
				type = 'date'
			if(me.format.indexOf('H') >= 0 && me.format.indexOf('d') >= 0)
				type = 'datetime'
			if(me.format.indexOf('H') >= 0 && me.format.indexOf('d') < 0)
				type = 'time'
			return type;
		}
		this._layDate = laydate.render({
			elem: this.datetime.dom.firstChild,
			format: this.format,
			type: getType(),
			done: function(value, date, endDate) {
				 Ext.defer(function(){
					if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&me.compatibleOCX))
						{
						vmd.iframeResize(me._layDate.elem,false)
						}
				},50)  
				me.fireEvent('change', me, value, date, endDate);
			},
			beforeRemove:function(){
					 Ext.defer(function(){
					if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&me.compatibleOCX))
						{
							if(me._layDate.elem)
								vmd.iframeResize(me._layDate.elem,false)
						}
				},50)  
			}
		}).laydate;
		me.datatime_input.onfocus=function(e){
				 Ext.defer(function(){
					if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&me.compatibleOCX))
						{
						vmd.enableIframe(me._layDate.elem)
						}
				},50)  
				
		}	
		
		this.datatime_icon.onclick = function(e) {
			if(!e) e = event;
			e.cancelBubble = true;
			me.datatime_input.focus()
		}
		this.setDefaultValue()
	},
	setDefaultValue: function() {
		if(this.defaultValue) {
			var thisDate = new Date(defaultValue);
		}
	},
	setValue: function(value) {
		if(this.el) {
			var thisDate = new Date(value);
			var valueDate = {
				year: thisDate.getFullYear() //年
					,
				month: thisDate.getMonth() //月
					,
				date: thisDate.getDate() //日
					,
				hours: thisDate ? thisDate.getHours() : 0 //时
					,
				minutes: thisDate ? thisDate.getMinutes() : 0 //分
					,
				seconds: thisDate ? thisDate.getSeconds() : 0 //秒
			}
			this.value = value;
			this.text = this._layDate.parse(0,
				valueDate);
			this.datatime_input.value = this.text;
		}
	},
	getValue: function() {
		return this.datatime_input.value;
	},
	getText: function() {
		return this.datatime_input.value;
	},
	// private
	onDisable: function() {
		this.onDisableChange(true);
	},
	//基类接口，具体实现
	// private
	onEnable: function() {
		this.onDisableChange(false);
	},
	// private
	onClick: function(e) {},
	onDisableChange: function(disabled) {
		if(this.datetime) {
			this.datetime[disabled ? 'addClass' : 'removeClass']('is-disabled');
			this.datatime_input.disabled = disabled;
		}
		this.disabled = disabled;
	}
})

Ext.define("vmd.comp.RichTextEditor", {
	extend: "Ext.BoxComponent",
	xtype: "vmd.richTextEditor",
	value: '',
	toolbar: true,
	onRender: function(ct, position) {
		var me = this;	
		if(!this.el) {
			this.el = document.createElement("div");
			this.el.id=this.id+'_editor';
			this.el.style.width = me.width ? (me.width + 'px') : "100%";
			this.el.style.height = me.height ? (me.height + 'px') : "100%";
		}
		this.callParent(arguments);
	},
	focus: function() {
		this.editor.focus();
	},
	afterRender: function(ct) {
		var me = this;
		this.callParent(arguments);
		
		//增加对图片和附件的上传		
		var dataHost = vmdSettings.vmdFileServiceIp||vmd.MicService.getReportIp();
		var wdkHost = (vmd.projectInfo && vmd.projectInfo.docIp) || "";
		var isWdk = this.isWdk;
		var hwFao = !isWdk?(new HwFao(dataHost, "vmd")):(new HwFao(wdkHost, "wdk"));//地址:端口和存储标识(服务管理员分配)
		var filepath ="";
		if(vmd.projectInfo&&vmd.projectInfo.projectId)
			filepath = (vmd.previewMode ? "modules/" : "release/") + vmd.projectInfo.projectId + "/editorfile"
		else
			filepath = (vmd.previewMode ? "modules/" : "release/")  + "editorfile"
		
		var uploadUrl = hwFao.getUploadUrl(filepath);	
		var URL = vmdSettings.bootPATH + "/lib/ueditor/";
		var editor = UE.getEditor(this.el.id, {
			UEDITOR_HOME_URL: URL,
			theme: 'default',
			serverUrl: uploadUrl,
			themePath: URL + "themes/",
			dialogPath: vmdSettings.bootPATH + "/lib/ueditor/themes/",
			listiconpath: URL + 'themes/ueditor-list/',
			"zIndex":me.zIndex
		});
		this.editor = editor;
		editor.addListener( 'ready', function( editor ) {
			me.	fireEvent('aftershow', editor)
		} );
		//扩展方法
		editor.filepath=filepath;
		editor.getBasePath=function(){
			if(isWdk){
				return 'http://'+wdkHost+'/wdk/'
			}else{
				return vmd.virtualPath+'/'
			}			
		}		
		editor.getDirs=function(allowfiles,succcallback,erorcallback){
			hwFao.getDirs(filepath,allowfiles,succcallback,erorcallback);
		}
	},
	
	destroy: function() {
		this.callParent();
	},
	doLayout: function(flag) {
		if(!this.el) return;
		var height = this.getHeight();
		this.setHeight(height)
	},
	onResize: function(w, h) {
		//if(w) this.setWidth(w);
		if(h) this.setHeight(h);
	},
	setHeight: function(h) {
		var _height = h;
		if(this.editor&&this.editor.container) {
			this.editor.container.style.height = _height + "px";
		}
	},
	
	getFocus: function() {
		var a = this.editor;
		if(!a) {
			return
		}
		a.focus()
	},
	setValue: function(value) {
		if(this.editor)
			this.editor.setContent(value)
	},
	getContentText: function() {
		if(this.editor)
			return this.editor.getContentTxt()
		return ""
	},
	getPlainText: function() {
		if(this.editor)
			return this.editor.getPlainTxt()
		return ""
	},
	getContent: function() {
		if(this.editor)
			return this.editor.getContent()
		return ""
	},
	getHtml: function() {
		if(this.editor)
			return this.editor.getAllHtml()
		return ""
	},
	setContent: function(value) {
		if(this.editor)
			this.editor.setContent(value)
	},
	setEnabled: function() {
		if(this.editor) 
			this.editor.setEnabled()
	},
	setDisabled: function() {
		if(this.editor)
			this.editor.setDisabled()
	}
	
})
//#region vmdAce
Ext.define("vmd.comp.Ace", {
	//extend: "Ext.BoxComponent",
	extend: "Ext.form.Field",
	xtype: 'vmd.ace',
	value: '',
	language: 'javascript',
	theme: 'xcode',
	toolbar: true,
	fontSize: 16,
	toolbarHeight: 27,

	onRender: function(ct, position) {
		var me = this;
		if(!this.el) {
			this.el = document.createElement("div");
			this.el.style.width = me.width ? (me.width + 'px') : "100%";
			this.el.style.height = me.height ? (me.height + 'px') : "100%";
			// this.el.innerHTML = ct.dom.innerHTML;
			//this.el.innerHTML = me.value;
			// this.el.id = this.id;
			//ct.update();//置空
			var __id = this.id;
			//扩展

			var editor_div = document.createElement('div');
			// editor_div.style.width = me.width ? (me.width + 'px') : "100%";
			//if (me.height) {
			//    if (this.toolbar) {
			//        editor_div.style.height = (me.height - me.toolbarHeight) + 'px';
			//    } else {
			//        editor_div.style.height = me.height + 'px';
			//    }
			//} else {
			//    if (this.toolbar) {
			//        editor_div.style.height = (ct.getHeight && (ct.getHeight() - me.toolbarHeight)) + 'px';
			//    } else {
			//        editor_div.style.height = '100%';
			//    }
			//}
			// editor_div.style.height = me.height ? (me.height + 'px') : this.toolbar ? (ct.getHeight && (ct.getHeight() - me.toolbarHeight-5)) + 'px' : '100%';
			editor_div.innerHTML = this.escapeHtml(me.value);

			var toolbar_div = document.createElement('div');
			this.el.appendChild(editor_div);
			this.el.appendChild(toolbar_div);


		    //加载主题及字体设置
			this.loadUserSettings();

			var conf = {
				fontSize: this.fontSize
			};
			// var editor = ace.edit(this.el);
			var editor = ace.edit(editor_div);

			try {
				var JavaScriptMode = ace.require("ace/mode/" + this.language).Mode;
			} catch(ex) {
				Ext.Msg.alert('错误', "ace/mode-" + this.language + "脚本未找到！")
				return
			}

			editor.setTheme("ace/theme/" + this.theme);

			editor.$blockScrolling = Infinity;

			ace.config.loadModule("ace/ext/tern", function() {
				editor.setOptions({
					enableTern: {
						defs: ["platformExtjs", "platformControl", "platformWidget", "browser", "ecma5"],
						plugins: {
							doc_comment: {
								fullDocs: true
							}
						},
						useWorker: false
					},
					enableBasicAutocompletion: true,
					//enableSnippets: true,
					enableLiveAutocompletion: false
				});

			})

			//editor.setOptions({
			//    enableBasicAutocompletion: true,
			//    //enableSnippets: true,
			//    enableLiveAutocompletion: true
			//});
			editor.session.setMode(new JavaScriptMode());
			editor.setFontSize(me.fontSize || conf.fontSize);
			//editor.focus();
			//editor.focus();
			me.editor = me.ace = editor;
			//增加格式化快捷键
			editor.commands.addCommand({
				name: 'format',
				bindKey: {
					win: 'Ctrl-Q',
					mac: 'Command-Q'
				},
				exec: function(editor) {
					me.formatJsCss();
				}
			});

			//toolbar
			this.fontSize_menu = new Ext.menu.Menu({
				items: [{
						text: "12px",
						handler: function() {
							me._setFontSize(this.text, this.value)
						},
						value: 12
					},
					{
						text: "13px",
						handler: function() {
							me._setFontSize(this.text, this.value)
						},
						value: 13
					},
					{
						text: "14px",
						handler: function() {
							me._setFontSize(this.text, this.value)
						},
						value: 14
					},
					{
						text: "16px",
						handler: function() {
							me._setFontSize(this.text, this.value)
						},
						value: 16
					},
					{
						text: "18px",
						handler: function() {
							me._setFontSize(this.text, this.value)
						},
						value: 18
					},
					{
						text: "20px",
						handler: function() {
							me._setFontSize(this.text, this.value)
						},
						value: 20
					},
					{
						text: "24px",
						handler: function() {
							me._setFontSize(this.text, this.value)
						},
						value: 24
					}
				]
			})
			this.theme_menu = new Ext.menu.Menu({
				items: [{
						text: "XCode",
						handler: function() {
							me._setTheme(this.text, this.value)
						},
						value: "xcode"
					},
					{
						text: "Chrome",
						handler: function() {

							me._setTheme(this.text, this.value)
						},
						value: "chrome"
					},
					{
						text: "Monokai",
						handler: function() {
							me._setTheme(this.text, this.value)
						},
						value: "monokai"
					},
					{
						text: "tomorrowNightBlue",
						handler: function() {
							me._setTheme(this.text, this.value)
						},
						value: "tomorrow_night_blue"
					},
					{
						text: "github",
						handler: function() {
							me._setTheme(this.text, this.value)
						},
						value: "github"
					},
					{
						text: "eclipse",
						handler: function() {
							me._setTheme(this.text, this.value)
						},
						value: "eclipse"
					},
					{
						text: "clouds",
						handler: function() {
							me._setTheme(this.text, this.value)
						},
						value: "clouds"
					}
				]

			})

			this.toolbox_menu = new Ext.menu.Menu({
			    items: [{
			        text: "HTML代码转JavaScript字符串",
			        handler: function () {
			          //  me._setTheme(this.text, this.value)
			            var win = new vmd.window({
			                url: vmd.virtualPath + '/system/modules/eQ9ULgcVb1/hwtVCPcB83/hw6aae0980.html',
			                height: 560,
			                width: 750,
			                title: 'HTML代码转JavaScript字符串',
			                auto: false
			            })

			            win.show()
			        },
			        value: ""
			    }
			  ]

			})

			if(me.toolbar) {
				var toolbar = new Ext.Toolbar({
					renderTo: toolbar_div,
					height: me.toolbarHeight,
					items: [{
							iconCls: "icon-ace-format",
							tooltip: '格式化',
							text: "格式化(Ctrl+Q)",
							handler: function() {

								me.formatJsCss();
							}
						},
						'-', {
							xtype: 'tbspacer'
						},
						{
							iconCls: "icon-ace-preview",
							tooltip: '查找',
							text: "查找(Ctrl+F)",
							handler: function() {
								me.showSearchBox();
							}
						},
						'-', {
							iconCls: "icon-ace-replace",
							tooltip: '替换',
							text: "替换(Ctrl+Q)",
							handler: function() {
								me.showReplaceBox();
							}
						},
						'-', {
							iconCls: "icon-ace-undo",
							tooltip: '撤销',
							text: "撤销(Ctrl+Z)",
							handler: function() {
								me.unDo();
							}

						},
						'-', {
							iconCls: "icon-ace-redo",
							tooltip: '重做',
							text: "重做(Ctrl+Y)",
							handler: function() {
								me.reDo();
							}
						},
						'-', {
							iconCls: "icon-ace-fontsize",
							tooltip: '字体',
							text: this.fontSize + "px",
							itemId: "ace_fontsize",
							handler: function() {
								//菜单位置
								me.fontSize_menu.el.setStyle('z-index', '70000');
							},
							menu: this.fontSize_menu
						}, '-', {
							iconCls: "icon-ace-theme",
							tooltip: '主题',
							text: this.theme,
							itemId: 'ace_theme',
							// id: "ace_theme",
							handler: function() {
								//菜单位置
								me.theme_menu.el.setStyle('z-index', '70000');
							},
							menu: this.theme_menu
						}, {
							iconCls: "icon-ace-keyboard",
							tooltip: '快捷键',
							text: '&nbsp;快捷键',
							itemId: 'ace_shortcut',
							// id: "ace_theme",
							handler: function() {
								//菜单位置

								var win = new vmd.window({
									url: bootPATH + 'js/plugins/ace/index.html',
									height: 500,
									width: 600,
									frameScroll: true,
									title: '使用帮助',
									auto: false
								})

								win.show()
							}
						},
                         {
                            iconCls: "icon-ace-toolbox",
                            tooltip: '常用工具',
                            text: '&nbsp;常用工具',
                            itemId: 'ace_toolbox',
                            handler: function () {
                                //菜单位置
                                me.toolbox_menu.el.setStyle('z-index', '70000');
                            },
                            menu: this.toolbox_menu
                        }

					]

				})
				me.toolbar = toolbar;
			}

			//属性赋值
			//ace有on方法与ext冲突
			me._on = me.on;
			//destroy方法与ext冲突，因此需要建立副本
			var des = me.destroy;
			Ext.apply(me, me.ace);
			//建立ace的副本
			me.ace_on = me.on;
			//重写destroy方法
			me.destroy = des;
			//if (me.text)
			//    editor.setValue(me.text)
			Ext.fly(this.el).addClass('vmd-ace');
			this.el.id = __id;
		}
		// vmd.comp.Ace.superclass.onRender.call(this, ct, position);
		this.callParent(arguments);

	},
	loadUserSettings:function(){
	    var fontsize = LocalData.get('aceFont');
	    var theme = LocalData.get('aceTheme') || this.theme;
	    this.fontSize = parseInt(fontsize|| this.fontSize);
	    this.theme = theme || this.theme;
	},
	formatJsCss: function() {
		var me = this;
		me.initCodeFormatJs(me.language,
			function() {
				me.formatting();
			})
	},
	focus: function() {
		this.editor.focus();
	},
	afterRender: function(ct) {

		var me = this;
		//借用ext on方法添加设计时的动作
		me.on = me._on;
		this.callParent(arguments);
		//为了不影响ace功能副本还原
		me.on = me.ace_on;
	},
	destroy: function() {
		this.callParent();
		this.editor&&this.editor.destroy();

	},
	doLayout: function(flag) {
		//if (flag) {
		if(!this.el) return;
		var height = this.getHeight();
		this.setHeight(height)
		//}

	},
	onResize: function(w, h) {
		if(h) this.setHeight(h);
	},
	setHeight: function(h) {

		
        var _height = h - this.toolbarHeight - 5;
        if (!this.toolbar) _height = h;

        this.editor.container.style.height = _height + "px";
        //重置宽度
        //this.el.setWidth(this.el.getWidth()-2)
        this.editor.resize()

	},
	onDestroy: function() {

		if(this.rendered) {

			// Ext.select('body>div[class*=vmd-ace]').remove();
		}
	},
	escapeHtml: function(c) {
		if(!c || typeof c != "string") {
			return c
		}
		var e = [/&/g, /</g, />/g],
			d = ["&amp;", "&lt;", "&gt;"];
		for(var a = 0; a < e.length; a++) {
			var b = e[a];
			c = c.replace(b, d[a])
		}
		return c
	},
	initCodeFormatJs: function(f, g) {
		var c = {
			javascript: window.js_beautify,
			html: window.html_beautify,
			css: window.css_beautify
		};
		var b = c[f];
		if(b) {
			g();
			return
		}
		var e = {
			 javascript: "/lib/beautify/beautifier.min.js",
            html: "/lib/beautify/beautifier.min.js",
            css: "/lib/beautify/beautifier.min.js"
		};
		var a = vmd.vmdVersion;
		var d = e[f];
		if(!d) {
			return
		}
		if(a) {
			d += "?v=" + a
		}

		$LAB.script(d)
			.wait(function() {
				if(g) {
					g()
				}
			})

	},
	formatting: function() {
		var a = this.editor.getValue();
		if(!a) {
			return
		}

		switch(this.language) {
			 case "javascript":
                a = beautifier.js(a);
                break;
            case "css":
                a = beautifier.css(a);
                break;
            case "html":
                a = beautifier.html(a);
                //a = html_beautify2(a, '1', '    ', 80);
                break;
            default:
                return
		}
		this.editor.setValue(a)
	},
	showSearchBox: function() {
		if(!this.editor) {
			return
		}
		this.editor.execCommand("find", this.editor, {})
	},
	showReplaceBox: function() {
		if(!this.editor) {
			return
		}
		this.editor.execCommand("replace", this.editor, {})
	},
	unDo: function() {
		var a = this.editor;
		if(!a) {
			return
		}
		a.undo();
		this.value = a.getValue();
		this.getFocus()
	},
	reDo: function() {
		var a = this.editor;
		if(!a) {
			return
		}
		a.redo();
		this.value = a.getValue();
		this.getFocus()
	},
	getFocus: function() {
		var a = this.editor;
		if(!a) {
			return
		}

		a.focus()

	},

	_setFontSize: function(text, value) {

		this.toolbar.getComponent('ace_fontsize').setText(text);
		var a = value;

		var b = this.editor;
		if(!b || a == this.fontSize) {
			return
		}
		this.fontSize = a;
		b.setFontSize(a);
		this.getFocus();
	    //记忆主题
		LocalData.set('aceFont', value)
	},

	_setTheme: function(text, value) {

		var y = value;
		// Ext.getCmp('ace_theme').setText(text);
		this.toolbar.getComponent('ace_theme').setText(text)
		var a = this.editor;
		if(!a || value == this.theme) {
			return
		}
		this.theme = value;
		a.setTheme("ace/theme/" + value);
		this.getFocus();

	    //记忆主题
		LocalData.set('aceTheme', value)
	}
})

//Ext.reg('vmd.ace', vmd.comp.Ace);

//#endregion

//#region  vmdAceEx 20180321扩展新增函数列表
Ext.define("vmd.comp.AceEx", {
	extend: "Ext.Panel",
	xtype: "vmd.ace2",
	header: false,
	border: true,
	height: 200,
	layout: "border",
	listeners: {
		afterrender: function() {},
		afterlayout: function() {
			//子组件都已初始化完成
			var me = this;
		}
	},

	initComponent: function() {

		var me = this;
		this.items = [{
				xtype: "panel",
				itemId: "leftframe",
				title: "Panel",
				header: false,
				border: true,
				height: me.height,
				region: "center",
				layout: "fit",
				items: [{
					xtype: "vmd.ace",
					itemId: "ace",
					id: me.id,
					language: me.language || 'javascript',
					value: me.value || '',
					theme: me.theme || 'xcode',
					region: "center"
				}]
			},
			{
				xtype: "panel",
				itemId: "rightframe",
				title: "函数列表",
				header: true,
				border: true,
				height: 100,
				width: 200,
				split: true,
				layout: "fit",
				collapseMode: "mini",
				region: "east"
			}
		]
		this.callParent(arguments);

		this.leftFrame = this.getComponent('leftframe');
		this.ace = this.leftFrame.getComponent('ace');
		this.rightFrame = this.getComponent('rightframe');
		this.ace.on('afterrender', function() {
			//函数列表dom结构
			me.ace.funcListEl = me.rightFrame.el
			//扩展函数列表funlist
			var tpl = new Ext.Template( //定义模板  
				'<div class="edit-right-frame ">\n',
				'<div class="right-main">\n	',
				'<div class="function-list-frame">\n	',
				'<div class="function-list-tool">\n',
				'<div class="function-search">\n	<input type="text" placeholder="输入函数名">\n<i class="font-icon icon-remove-sign search-reset hidden"> </i>\n</div>\n</div>\n',
				'<div class="function-list-parent">\n<div class="function-list-box"></div>\n</div>\n</div>\n'
			)
			//模板值和模板进行组合并将新生成的节点插入到id为'rightFrame'的元素中  
			var funclist = tpl.overwrite(me.rightFrame.body, {}, true);
			me.funcList = funclist;
			me.ace.funcList = funclist;
			var l;

			var d = vmd.virtualPath + '/js/ext/functionList.js'
			$LAB.script(d)
				.wait(function() {
					var flist = vmd.ext.functionList.init();
					var fuc = flist(me.ace);
					fuc.refresh();
					me.ace.on('change', function() {
						clearTimeout(l);
						l = !l;
						l = setTimeout(function() {
							try {
								fuc.refresh();

							} catch(t) {}
						}, 300)
					})
				})
		})

	}

})
//#endregion

//#region vmdGrid
Ext.define("vmd.comp.Grid", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.grid',
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
	onRender: function(ct, position) {
		var me = this;

		if(!this.el) {
			this.el = document.createElement("div");
			this.el.style.height = "200px";
			this.el.style.width = "300px";
			//
			var defaultConfig = {
				parent: this.el,
				filter: true
			};
			//绑定属性面板中的size到网格中
			if(me.height) defaultConfig.height = me.height;
			if(me.width) defaultConfig.width = me.width;
			//创建网格对象到网格中
			me.grid = new dhtmlXGridObject(this.el);

			this.el.id = this.id;

			//设置网格列、
			me.headstr = me.headstr || "井号, 单元代码, 单元名称";
			me.colType = me.colType || "ed,ed,ed";
			me.headerWidth = me.headerWidth || "100,100,100";
			me.colId = me.colId || "";
			////me.colSorting=me.colSorting||"str,str,str";

			me.grid.setHeader(me.headstr);
			me.grid.setInitWidths(me.headerWidth)
			me.grid.setColTypes(me.colType);
			//me.grid.setColSorting(me.colSorting);
			if(me.colId != "") {
				me.grid.setColumnIds(me.colId)
			}

			if(me.skin) {
				me.grid.setSkin(me.skin)
			} else {
				me.grid.setSkin("material")
			}
			me.grid.init();
			me.grid.enableEditEvents(true)
			data = {
				rows: [{
						id: 1001,
						data: [
							"CQC-001",
							"ZXCQ5F",
							"草4-5"
						]
					},
					{
						id: 1002,
						data: [
							"CQC-002",
							"ZXCQ5E",
							"草4-12"
						]
					},
					{
						id: 1003,
						data: [
							"CQC-003",
							"ZXCQ5C",
							"草4-6"
						]
					}
				]
			};
			me.grid.parse(data, "json");
			//me.grid.getPosition=null;
			//属性赋值
			Ext.applyIf(me, me.grid);
			//重改指向，保证dhx的原生态
			//this.el = this.el.children[0];
			Ext.fly(this.el).addClass('vmd-grid');

			//注册事件           
			this.onEventsReg(me, me.grid);
			window[me.id] = this;
		}
		//vmd.comp.Grid.superclass.onRender.call(this, ct, position);

		this.callParent(arguments);
	},
	onEventsReg: function(My, Mygrid) {
		Mygrid.attachEvent("onRowSelect", function(id) {
			My.fireEvent('rowSelect', My, id)
		});
		Mygrid.attachEvent("onBeforeRowDeleted", function(rowId) {
			My.fireEvent('beforeRowDeleted', My, rowId)
		});
		Mygrid.attachEvent("onCheckbox", function(rowId, cellInd, state) {
			My.fireEvent('checkbox', My, rowId, cellInd, state)
		});
		Mygrid.attachEvent("onEnter", function(rowId, cellInd) {
			My.fireEvent('enter', My, rowId, cellInd)
		});
		/* 
		        Mygrid.attachEvent("onRowDblClicked", function (rowId) {
		            My.fireEvent('rowDblClicked', Mygrid, rowId)
		        });*/
		Mygrid.attachEvent("onEditCell", function(stage, rowId, cellInd) {
			//debugger
			My.fireEvent('editCell', My, stage, rowId, cellInd)
			return true
		});
		Mygrid.attachEvent("onBeforeSelect", function(new_row, old_row, new_col_index) {
			//debugger
			My.fireEvent('beforeSelect', My, new_row, old_row, new_col_index)
			return true
		});
	},

	onDestroy: function() {

		if(this.rendered) {
			//bug修复，清除dhx组件拖拽就在body中累加的combo的dom结构
			Ext.select('body>div[class*=dhxgridlist]').remove();
		}
	}

})

//Ext.reg('vmd.grid', vmd.comp.Grid);

//#endregion vmdGrid


//#region SimpleGrid
Ext.define("vmd.comp.SimpleGrid", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.simplegrid',
	disabled: false,
	type: 'default',
	handleMouseEvents: true,
	size: '',
	initComponent: function() {
		var me =this;
		this.callParent();
		//vmd.comp.Grid.superclass.initComponent.call(this);
		this.addEvents(
			'rowSelect'
		);
		if(vmd.isDesignMode())
		{
			!xds.temp.simplegridevents_vmdpreview && xds.on('vmdpreview', function() {
				me.updateJson()
			});
			!xds.temp.simplegridevents_vmdsave && xds.on('vmdsave', function() {
				me.updateJson()
			});
			xds.temp.simplegridevents_vmdpreview=true
			xds.temp.simplegridevents_vmdsave = true;
		}
	},
	updateJson:function(){
		var me =this;
		
		var bucket = [];
		var list = xds.inspector.nodeHash;
		//处理采集录入生成预览所需json串，遍历组件树摘出采集录入
		for (var key in list) {
			if (list[key].component && list[key].component.cid == "vmdSimpleGrid") {
				bucket.push(list[key]);
			}
		}
		if (bucket.length > 0) {
			
			for (var k = 0; k < bucket.length; k++) {
				var comp=bucket[k].component			
				var files=comp.config.gridConfig||comp.userConfig.gridConfig
				for(var i=0;i<files.fieldsInfo.length;i++)
				{
					var events=files.fieldsInfo[i].events
					if(events)
					{
						for (var key in events) {
							var list = events[key];
							if (typeof(list) != 'object') {
								var _name = events[key]
								_name && xds.vmd.addEventForDesignerCmp(comp, _name, _name)
							} else {
								for (var name in list) {
									var _name = list[name];
									_name && xds.vmd.addEventForDesignerCmp(comp, _name, _name)
								}
							}
						}
					}			
				}
			}
		}
	},
	getTemplateArgs: function() {
		return {
			width: this.width,
			height: this.height
		}
	},
	onRender: function(ct, position) {
		this.defaultGridConfig = {
			storeName: "Dt1",
			fieldsInfo: [{
				colId: "column1",
				title: "column1",
				width: 100,
				fileInfo: {
					type: "txt"
				}
			}, {
				colId: "column2",
				title: "column2",
				width: 100,
				fileInfo: {
					type: "ed"
				}
			}]
		}
		var gc = this.gridConfig || this.defaultGridConfig
		var me = this;
		if(gc.storeName)
			me.vmdStore = Ext.StoreMgr.lookup(gc.storeName);
		if(!this.el) {
			this.el = document.createElement("div");
			this.el.style.height = "200px";
			this.el.style.width = "300px";
			var defaultConfig = {
				parent: this.el,
				filter: true
			};
			//绑定属性面板中的size到网格中
			if(me.height) defaultConfig.height = me.height;
			if(me.width) defaultConfig.width = me.width;
			//创建网格对象到网格中
			me.grid = new dhtmlXGridObject(this.el);
			this.el.id = this.id;
			//获取配置中网格的信息
			var header = [],
				colType = [],
				headerWidth = [],
				colId = [],
				align = [],
				sort = [],
				filter = [],
				allowFilter = false;
			gc.fieldsInfo = gc.fieldsInfo || []
			me.flaStore = {};
			for(var i = 0; i < gc.fieldsInfo.length; i++) {
				header.push(gc.fieldsInfo[i].title);
				colId.push(gc.fieldsInfo[i].colId);
				headerWidth.push(gc.fieldsInfo[i].hide ? "0" : gc.fieldsInfo[i].width);
				colType.push(me._getDhType(gc.fieldsInfo[i].fileInfo.type));
				align.push(gc.fieldsInfo[i].align || me._getDhAlign(gc.fieldsInfo[i].fileInfo.type));
				sort.push(gc.fieldsInfo[i].allowSort ? me._getDhSort(gc.fieldsInfo[i].fileInfo.type) : "");
				filter.push(gc.fieldsInfo[i].allowFilt ? "#text_filter" : "&nbsp;");
				if(gc.fieldsInfo[i].allowFilt)
					allowFilter = true;
				if(gc.fieldsInfo[i].fileInfo.type == "link") {
					me.grid.setLinkValue(i, gc.fieldsInfo[i].fileInfo.title)
					me.grid.setLinkFunction(i, (gc.fieldsInfo[i].events && gc.fieldsInfo[i].events['click']) || "")
				}
				if(gc.fieldsInfo[i].defaultValue != "")
					me.grid.setSimpleGridShowValue(i, gc.fieldsInfo[i])
				//处理代码转换数据集信息
				if(me.vmdStore && me.vmdStore.fields) {
					var storeField = me.vmdStore.fields.items[me.vmdStore.fields.keys.indexOf(gc.fieldsInfo[i].colId)]
					if(storeField && storeField.flaStore)
						me.flaStore[gc.fieldsInfo[i].colId] = {
							store: storeField.flaStore,
							valueField: storeField.flaValueField,
							displayField: storeField.flaDisplayField
						}
				}
			}
			//设置网格列、			
			me.headstr = (header && header.join(',')) || "column1, column2";
			me.colType = (colType && colType.join(',')) || "ed,ed"; //me.colType || "ed,ed,ed";
			me.filter = (filter && filter.join(',')); //me.headerWidth || "100,100,100";
			me.align = (align && align.join(','));
			me.colId = (colId && colId.join(','));
			me.headerWidth = (headerWidth && headerWidth.join(','));
			me.sort = (sort && sort.join(','));
			me.grid.setImagePath(vmd.util.CreateJSPath("vmdcomps.js", -1) + "/lib/dhtmlx/skins/material/imgs/");
			me.grid.setHeader(me.headstr);
			if(allowFilter)
				me.grid.attachHeader(me.filter);
			if(gc.displayMode == "1") {
				var p_width = [];
				var allWidth = 0;
				for(var k = 0; k < headerWidth.length; k++) {
					allWidth += Number(headerWidth[k])
				}
				for(var k = 0; k < headerWidth.length; k++) {
					p_width.push((Number(headerWidth[k]) / allWidth) * 100)
				}
				me.grid.setInitWidthsP(p_width.join(','));
			} else
				me.grid.setInitWidths(me.headerWidth);
			me.grid.setColTypes(me.colType);
			me.grid.setColAlign(me.align);
			me.grid.setColSorting(me.sort);
			if(me.colId != "") {
				me.grid.setColumnIds(me.colId)
			}
			me.grid.setStyle('border-right: 1px solid #efecec', 'border-right: 1px solid #efecec', '', '');
			me.grid.setSkin("material");
			me.grid.init();
			me.grid.attachEvent("onSimpleGridLinkClick", function(func, inCell, idd, cellIndex, val) {
				me.fireEvent(func, me.grid, inCell, idd, cellIndex, val);
			});
			me.grid._getSimpleGridShowValue = function(colIndex, rowIndex,showValue, val,cell) {
				if(me.hasStat&&rowIndex==me.vmdStore.getCount()){
					cell.cell.bgColor="#ececec"
					return ""
				} 
				return me._getShowValue(colIndex, showValue, val)
			};
			//属性赋值
			Ext.applyIf(me, me.grid);
			//重改指向，保证dhx的原生态
			Ext.fly(this.el).addClass('vmd-grid');
			//注册事件           
			this.onEventsReg(me, me.grid);
			window[me.id] = this;
		}
		this.callParent(arguments);
	},
	_getDhType: function(_type) {
		switch(_type) {
			case "txt":
				return "hwSimpleGridTxt";
			case "num":
				return "hwSimpleGridTxt";
			case "date":
				return "hwSimpleGridTxt";
			case "link":
				return "hwSimpleGridLink";
			default:
				return "hwSimpleGridTxt";
		}
	},
	_getDhAlign: function(_type) {
		switch(_type) {
			case "txt":
				return "left";
			case "num":
				return "right";
			case "date":
				return "center";
			default:
				return "left";
		}
	},
	_getDhSort: function(_type) {
		switch(_type) {
			case "txt":
				return "str";
			case "num":
				return "int";
			case "date":
				return "date";
			default:
				return "str";
		}
	},
	_getDhFilter: function(_type) {
		switch(_type) {
			case "txt":
				return "#text_filter";
			case "num":
				return "#text_filter";
			case "date":
				return "center";
			default:
				return "left";
		}
	},
	_getShowValue: function(colIndex, fieldInfo, val) {
		var fieldInfo = this.gridConfig.fieldsInfo[colIndex]
		if(fieldInfo && fieldInfo.showValue)
			return this._runCustomCode(colIndex, fieldInfo, val)
		else
			return this._codeConversion(colIndex, fieldInfo, val)
	},
	_runCustomCode: function(colIndex, fieldInfo, val) {
		var me = this
		//动态执行代码段
		var objValue = JSON.parse(fieldInfo.showValue)
		if(objValue.type == "0")//0为代码
			return new Function("value", objValue.value + ';\nreturn value')("") // eval("(function(){" + valueExp + "\r\n})()");								
		//表达式解析
		else if(objValue.type == "1") {//1为表达式，后期需要做词法 解析
			if(objValue.value.toLowerCase().indexOf("avg") >= 0) {
				return me.vmdStore.getAvg(fieldInfo.colId)
			} else if(objValue.value.toLowerCase().indexOf("max") >= 0) {
				return me.vmdStore.getMax(fieldInfo.colId)
			} else if(objValue.value.toLowerCase().indexOf("min") >= 0) {
				return me.vmdStore.getMin(fieldInfo.colId)
			} else if(objValue.value.toLowerCase().indexOf("count") >= 0) {
				return me.vmdStore.getCount(fieldInfo.colId)
			} else if(objValue.value.toLowerCase().indexOf("sum") >= 0) {
				return me.vmdStore.getSum(fieldInfo.colId)
			}
			alert("目前表达式暂不支持其他表达式")
			return "";
		}
	},
	_runStatCode: function(colIndex, fieldInfo) {
		var me = this
		//动态执行代码段
		var objValue = JSON.parse(fieldInfo.statValue)
		if(objValue.type == "0")
			return new Function("value", objValue.value + ';\nreturn value')("") // eval("(function(){" + valueExp + "\r\n})()");								
		//表达式解析
		else if(objValue.type == "1") {
			if(objValue.value.toLowerCase().indexOf("avg") >= 0) {
				return me.vmdStore.getAvg(fieldInfo.colId)
			} else if(objValue.value.toLowerCase().indexOf("max") >= 0) {
				return me.vmdStore.getMax(fieldInfo.colId)
			} else if(objValue.value.toLowerCase().indexOf("min") >= 0) {
				return me.vmdStore.getMin(fieldInfo.colId)
			} else if(objValue.value.toLowerCase().indexOf("count") >= 0) {
				return me.vmdStore.getCount(fieldInfo.colId)
			} else if(objValue.value.toLowerCase().indexOf("sum") >= 0) {
				return me.vmdStore.getSum(fieldInfo.colId)
			}
			alert("目前表达式暂不支持其他表达式")
			return "";
		}
	},
	_codeConversion: function(colIndex, fieldsInfo, val) { //代码转换
		var values = this.flaStore[fieldsInfo.colId]
		if(values && values.store) {
			var _flastore = Ext.StoreMgr.lookup(values.store);
			var recIndex = _flastore.find(values.valueField, val)
			if(recIndex >= 0)
				return _flastore.getAt(recIndex).get(values.displayField)
			else
				return val||""
		} else return val||""
	},
	onEventsReg: function(My, Mygrid) {
		Mygrid.attachEvent("onRowSelect", function(id) {
			My.fireEvent('rowSelect', My, id)
		});

	},
	onResize: function(w, h) {
		
		this.callParent(arguments);
		var me = this;
		me.grid.setSizes();

	},
	onDestroy: function() {
		if(this.rendered) {
			//bug修复，清除dhx组件拖拽就在body中累加的combo的dom结构
			Ext.select('body>div[class*=dhxgridlist]').remove();
		}
	},
	afterRender: function() {
		var me = this;
		this.callParent(arguments);
		if(!me.gridConfig)
			return;
		if(vmd.isDesignMode())
			return;
		//绑定数据集
		me.grid.dhtmlxDatastore = new dhtmlXDataStore();
		me.grid.enableEditEvents(true);
		me.grid.sync(me.grid.dhtmlxDatastore);
		me.grid.setEditable(false)
		var storeName = me.gridConfig.storeName;
		me.vmdStore = Ext.StoreMgr.lookup(storeName);
		if(me.vmdStore) {
			me.vmdStore.on({
				scope: this,
				datachanged: this.onDataChanged,
				add: this.onAdd,
				remove: this.onRemove,
				update: this.onUpdate
			});
		} else {
			Ext.Msg.show({
				title: "提示",
				msg: "基础网格组件未绑定数据集！",
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.INFO
			});
		}
	},
	onUpdate: function(ds, record) {
		var vmdGrid = this;
		var item = vmdGrid.grid.dhtmlxDatastore.item(record.id);
		if(!item) return;
				vmdGrid.grid.update(record.id, record.data)
	},
	onAdd: function(ds, record) {
		var vmdGrid = this;
		for(var i = 0; i < record.length; i++) {
			if(vmdGrid.grid.dhtmlxDatastore.data.order.indexOf(record[0].id) < 0) {
				var index = ds.indexOf(record[i])
				var newData = record[i].data
				newData.id = newData.id || record[i].id
				vmdGrid.grid.dhtmlxDatastore.add(newData, index)
			}
		}
	},
	onRemove: function(ds, record) {
		var vmdGrid = this;
		for(var i = 0; i < record.length; i++) {
			vmdGrid.grid.dhtmlxDatastore.remove(record[i].id)
		}
	},
	onDataChanged: function(store) {
		var vmdGrid = this;
		vmdGrid.grid.dhtmlxDatastore.clearAll();
		if(vmdGrid.gridConfig.columns && vmdGrid.gridConfig.columns > 0) {
			vmdGrid.grid.splitAt(2)
		}
		var jsonDate = vmdGrid.vmdStore.getJson(true)
		var statJson = {};
		vmdGrid.hasStat = false;
		if(vmdGrid.gridConfig.fieldsInfo) {
			for(var h = 0; h < vmdGrid.gridConfig.fieldsInfo.length; h++) {
				if(vmdGrid.gridConfig.fieldsInfo[h].statValue) {
					statJson[vmdGrid.gridConfig.fieldsInfo[h].colId] = vmdGrid._runStatCode(h, vmdGrid.gridConfig.fieldsInfo[h])
					vmdGrid.hasStat = true;
				}
			}
			if(vmdGrid.hasStat)
				jsonDate.push(statJson)
		}
		vmdGrid.grid.dhtmlxDatastore.parse(jsonDate);
		vmdGrid.grid.dhtmlxDatastore.data.dpull = {};
		vmdGrid.grid.dhtmlxDatastore.data.opull = {};

	}
})
//Ext.reg('vmd.simplegrid', vmd.comp.SimpleGrid);
//#endregion SimpleGrid


//#region vmdTree
Ext.define("vmd.comp.Tree", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.tree',
	/**
	 * Read-only. True if this button is disabled
	 * @type Boolean
	 */
	disabled: false,
	/*
	 *type 种类有
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
		//定义store属性
		this.store = Ext.StoreMgr.lookup(this.store);

		//vmd.comp.Grid.superclass.initComponent.call(this);
		this.addEvents(
			/**
			 * @event click
			 * Fires when this button is clicked
			 * @param {Button} this
			 * @param {EventObject} e The click event
			 */
			'click',

			'nodeSelected',
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

		if(!this.el) {
			this.el = document.createElement("div");
			this.el.style.height = "200px";
			this.el.style.width = "300px";
			this.el.id = this.id;
			//
			var defaultConfig = {
				parent: this.el,
				filter: true
			};
			//绑定属性面板中的size到网格中
			if(me.height) defaultConfig.height = me.height;
			if(me.width) defaultConfig.width = me.width;
			if(me.name) defaultConfig.name = me.name;
			//创建网格对象到网格中
			me.tree = new dhtmlXTreeObject(defaultConfig);

			if(me.skin) {
				me.tree.setSkin(me.skin)
				//me.tree.setImagePath("../lib/dhtmlx/imgs/dhxtree_" + me.skin + "/");
			} else {
				me.tree.setSkin("material")
			}
			if(me.CheckBox) {
				me.tree.enableCheckBoxes(1);
			}
			me.tree.setImagePath("/lib/dhtmlx/imgs/dhxtree_material/");
			//me.tree.enableDragAndDrop(true);
			treeJson = {
				id: 0,
				text: "我的模块",
				item: [{
						id: 1,
						text: "开发动态"
					},
					{
						id: 2,
						text: "月度分析",
						item: [{
							id: "21",
							text: "油井月度产量分析"
						}]
					},
					{
						id: 3,
						text: "源头采集"
					}
				]
			};

			//绑定右键菜单
			var menu = new dhtmlXMenuObject();
			//menu.setIconsPath("../common/images/menu/");
			//  menu.renderAsContextMenu();
			// menu.attachEvent("onClick", onMenuClick);
			//menu.addNewChild(menu.topId, 0, "newFord", "新建目录", false);
			//menu.addNewChild(menu.topId, 1, "newMode", "新建模块", false);
			//menu.addNewChild(menu.topId, 2, "delete", "删除", false);
			//me.tree.enableDragAndDrop(true);
			// me.tree.enableContextMenu(menu);

			//me.tree.parse(treeJson, "json");
			me.tree.loadJSONObject(treeJson);
			//属性赋值
			Ext.applyIf(me, me.tree);
			//重改指向，保证dhx的原生态
			this.el = this.el.children[0];
			Ext.fly(this.el).addClass('vmd-tree');

			//注册事件           
			this.onEventsReg(me, me.tree);
			window[me.id] = this;
		}
		//vmd.comp.Grid.superclass.onRender.call(this, ct, position);

		this.callParent(arguments);
	},
	onEventsReg: function(My, Mytree) {
		Mytree.attachEvent("onSelect", function(id) {
			My.fireEvent('nodeSelected', My, id)
		});
		Mytree.attachEvent("onClick", function(id) {
			My.fireEvent('nodeClick', My, id)
		});
		//注册后 点击节点的加号 无法展开
		//Mytree.attachEvent("onOpenStart", function (id, state) {
		//    My.fireEvent('onOpenStart', Mytree, id, state)
		//});
		Mytree.attachEvent("onOpenEnd", function(id, state) {
			My.fireEvent('onOpenEnd', My, id, state)
		});
		Mytree.attachEvent("onDblClick", function(id) {
			My.fireEvent('doubleClick', My, id)
		});;
		Mytree.attachEvent("onCheck", function(id, state) {
			My.fireEvent('Check', My, id, state)
		});
	},

	onEditCell: function(e) {
	},
	onEnter: function(e) {
	},
	onDestroy: function() {

		if(this.rendered) {
			//bug修复，清除dhx组件拖拽就在body中累加的combo的dom结构
			// Ext.select('body>div[class*=dhxgridlist]').remove();
		}
	},
	//private
	afterRender: function() {

		this.callParent();
		//绑定store
		if(!Ext.isdesign) {
			//20171023 增加默认设置获取到的数据信息

			if(this.dataStore) {
				this.store = Ext.getCmp(this.dataStore);
				if(this.store) {
					this.bindStore(this.store, true);
				}
			}

		}
	},
	enableContextMenu: function(menu) {

		this.tree.enableContextMenu(menu)
	},
	//private
	onBeforeLoad: function() {
		//数据加载前 一般用于放置进度条
	},
	//private store数据发生变化调用该接口
	onDataChanged: function() {

		this.refresh.apply(this, arguments);

	},
	// private 更新记录调用此接口
	onUpdate: function(ds, record) {
		var index = this.store.indexOf(record);
		if(index > -1) {
			this.refresh();
		}
	},

	// private 添加记录调用该接口
	onAdd: function(ds, records, index) {
		this.refresh();

	},

	// private 删除数据调用该接口
	onRemove: function(ds, record, index) {

		this.refresh();

	},
	refresh: function() {
		var el = this.el,
			tree = this.tree,
			records = this.store.getRange();
		if(records.length < 1) {
			tree.loadJSONObject({});
		} else {

			//返回dhx组件数据的格式，将dhxcombostore的源码放到此处
			var dhxdata = {};
			for(var i = 0; i < records.length; i++) {
				var item = Ext.apply(records[i].data, {
					value: records[i].data[this.valueField],
					text: records[i].data[this.displayField]
				})
				//dhxdata.push(records[i]);
				dhxdata.push(item);
			}
			tree.loadJSONObject(dhxdata);
		}

	},
	bindStore: function(store, initial) {
		if(!initial && this.store) {
			if(store !== this.store && this.store.autoDestroy) {
				this.store.destroy();
			} else {
				this.store.un("beforeload", this.onBeforeLoad, this);
				this.store.un("datachanged", this.onDataChanged, this);
				this.store.un("add", this.onAdd, this);
				this.store.un("remove", this.onRemove, this);
				this.store.un("update", this.onUpdate, this);
				this.store.un("clear", this.refresh, this);
			}
			if(!store) {
				this.store = null;
			}
		}
		if(store) {

			store = Ext.StoreMgr.lookup(store);
			store.on({
				scope: this,
				beforeload: this.onBeforeLoad,
				datachanged: this.onDataChanged,
				add: this.onAdd,
				remove: this.onRemove,
				update: this.onUpdate,
				clear: this.refresh //store.removeAll清空所有数据调用此接口
			});
		}
		this.store = store;
		if(store) {
			this.refresh();
		}
	}

})
//Ext.reg('vmd.tree', vmd.comp.Tree);
//#endregion vmdTree

//#region dataview
Ext.define('vmd.comp.dataview', {
	extend: 'Ext.DataView',
	xtype: 'vmd.dataview',
	itemSelector: '',
	singleSelect: true,
	multiSelect: true,
	autoScroll: true,
	overClass: '',

	initComponent: function() {

		if(this.data && typeof this.data == "string") {
			try {
				if(this.data.indexOf(';return') == -1) this.data = this.data.replace('return', ';return');
				var joinData = "(function () {" + this.data + "\r\n})()";
				this.data = eval(joinData);
			} catch(ex) {
				console.log('返回的模版静态数据有错误！')
			}

		}
		var fields = ['tplpath', 'url', 'id', 'picname', 'name', 'desc'];
		//20171204要进行兼容修复
		if(this.data instanceof Array && this.data.length > 1) {
			var _rec = this.data[0];
			for(var key in _rec) {
				if(fields.indexOf(key) == -1) {
					fields.push(key);
				}
			}
		}
		//store.fields.add(new Ext.data.Field('test'));
		var store = new Ext.data.JsonStore({
			proxy: new Ext.data.MemoryProxy(),
			idProperty: 'id',
			fields: fields
		});

		store.loadData(this.data || []);
		if(this.store && typeof this.store == "string") {
			//特殊处理
			this.store = "";
		}
		this.store = this.store || store;

		var tpl = new Ext.XTemplate(
			'<ul>',
			'<tpl for=".">',
			'<li class="phone" tplpath={tplpath}>',
			'<h4>{name}</h4>',
			'<img  src="/system/img/dataview/layout/{picname}" />',
			'<h4>{desc}</h4>',
			'</li>',
			'</tpl>',
			'</ul>'
		)
		//异常处理
		var r = this.tpl.match(/for="\w*"/g);
		var flag = true;
		if(r) {
			Ext.each(r, function(item) {
				item = item.replace(/for="/, "").replace(/"/, "");
				if(fields.indexOf(item) == -1) {
					flag = false;
					alert('字段：' + item + "不存在")
					return false;
				}
			})
			if(!flag) this.tpl = "";

		} else {
			this.tpl = this.tpl || tpl;
		}

		this.callParent();
	},
	onRender: function(ct, position) {

		this.callParent(arguments);
		this.el.addClass('vmd-dataview');
	}

})
//#endregion
Ext.data.JsonReader.prototype.buildExtractors=function() {
        if(this.ef){
            return;
        }
        var s = this.meta, Record = this.recordType,
            f = Record.prototype.fields, fi = f.items, fl = f.length;

        if(s.totalProperty) {
            this.getTotal = this.createAccessor(s.totalProperty);
        }
        if(s.successProperty) {
            this.getSuccess = this.createAccessor(s.successProperty);
        }
        if (s.messageProperty) {
            this.getMessage = this.createAccessor(s.messageProperty);
        }
        this.getRoot = s.root ? this.createAccessor(s.root) : function(p){return p;};
        if (s.id || s.idProperty) {
            var g = this.createAccessor(s.idProperty||s.id);
            this.getId = function(rec) {
                var r = g(rec);
                return (r === undefined || r === '') ? null : r;
            };
        } else {
            this.getId = function(){return null;};
        }
        var ef = [];
        for(var i = 0; i < fl; i++){
            f = fi[i];
            var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
            ef.push(this.createAccessor(map));
        }
        this.ef = ef;
    }
//#region jsonstore 
//#region jsonstore 
Ext.define("vmd.store.jsonStore", {
	extend: "Ext.data.JsonStore",
	xtype: "vmd.jsonStore",
	alternateClassName: 'vmd.store.JsonStore',
	resultObject: null,
	storeId: "",
	storeConfigInfo: {},
	loaded:false,
	constructor: function(config) {
		var me = this;
		if(!config) {
			this.callParent(arguments);
			return;
		}
		if(typeof config.storeConfig == "string") {
			config.storeConfig = Ext.decode(config.storeConfig);
		}
		me.storeConfigInfo = config.storeConfig;
		if(!config) return;
		me.storeId = config.id;
		if(!me.storeConfigInfo) {
			//Ext.Msg.alert("提示", config.id + "，未配置数据集!")
			if(config.fields)
			{
			this.callParent(arguments);
			}
			return;
		}
		if(me.storeConfigInfo&&me.storeConfigInfo.tableName)
			me.trueTables=me.storeConfigInfo.tableName;		
		me.deleteRecords = [];	
		me.addRecords = [];
		if(config.autoLoad == undefined && me.storeConfigInfo) {
			me.storeConfigInfo.autoLoad = true
		} else {
			me.storeConfigInfo.autoLoad = config.autoLoad;
			this.load && (config.load = this.load)
		}
		if(me.storeConfigInfo.fields == null || me.storeConfigInfo.url == "") {
			if(!config.fields) {
				//Ext.Msg.alert("提示", config.id + "，配置信息不完整！")
				this.callParent(arguments);
				return;
			}
		}
		//处理检测构造函数的基础信息 
		var  filesInfo	;	
		if(config) {
			filesInfo = config.fields || me.storeConfigInfo.fields;			
			me.rules=config.rules||me.storeConfigInfo.rules;
		} else {
			config = {};
			filesInfo = me.storeConfigInfo.fields;
			me.rules=me.storeConfigInfo.rules;
		}
		var storefilesInfo=[]
		for (var i=0;i<filesInfo.length;i++)
		{	
			filesInfo[i].useNull=true;
			filesInfo[i].dtype=filesInfo[i].type.toLowerCase();
			if(filesInfo[i].type=="DATE")
				filesInfo[i].type="DATETIME"
			storefilesInfo.push(filesInfo[i])	
		}		
		config.fields=storefilesInfo
		config.proxy = new Ext.data.MemoryProxy()
		//调用父类的构造函数  创建数据集对象
		this.callParent(arguments);
		
		//处理hwtoken默认为login时，无cookie的弹框
		if(me.storeConfigInfo.getMethods)
			for(var i = 0; i < me.storeConfigInfo.getMethods.length; i++) {
				if(me.storeConfigInfo.getMethods[i].defaultvalue == "@login") {
					if(hwDas && hwDas.runMode == "test") {} else {
						vmd.core.checkCookieInfo("hwToken")
					}
				}
			}	
		me.useNull=true;
		//判断是否自动加载
		if(!me.storeConfigInfo.autoLoad)
			return;
		//绑定数据
		if(!me.virtualStore)
			this.toRefresh();
		else {
			setTimeout(function() {
				me.loadData([]);
				me.loaded = true;
			}, 20);
		}
	},
	//获取处理数据服务的参数
	_getParams: function() {
		var me = this;
		var selectConfigInfo = me.storeConfigInfo.getMethods;; //configInfo.getMethods;
		var selectParams = {};
		for(var i = 0; i < selectConfigInfo.length; i++) {
			if(selectParams[selectConfigInfo[i].id]) {} else {
				//解析变量 将变量放到参数列表中
				var paramValue = "";
				try {
					//如果启用调试，设置默认值
					if(hwDas && hwDas.runMode == "test") {
						if(selectConfigInfo[i].defaultvalue == "@login") {
							paramValue = getUrlParam("username")
						} else if(selectConfigInfo[i].defaultvalue == "@now") {
							paramValue = getUrlParam("sysdate")
						} else if(selectConfigInfo[i].defaultvalue == "@ip") {
							paramValue = getUrlParam("ip")
						} else if(selectConfigInfo[i].defaultvalue == "@userid") {
							paramValue = getUrlParam("userid")
						} else {	
							var valueExp = selectConfigInfo[i].value1.trim()||selectConfigInfo[i].value2.trim();
							if(valueExp!=""){
								paramValue =new Function("value", valueExp + ';\nreturn value')("")// eval("(function(){" + valueExp + "\r\n})()");								
								selectParams[selectConfigInfo[i].id] = paramValue;
							}
						}
					} else {
						var valueExp = selectConfigInfo[i].value1.trim()||selectConfigInfo[i].value2.trim();
						if(valueExp!=""){
							paramValue =new Function("value", valueExp + ';\nreturn value')("")// eval("(function(){" + valueExp + "\r\n})()");							
							selectParams[selectConfigInfo[i].id] = paramValue;
						}
					}
				} catch(error) {}
			}
		}
		return selectParams;
	},
	//重新创建store	
	//该方法用于创建datastore  包含字段信息
	reCreatStore: function(fun) {
		var me = this;
		this.resultObject = {};
		var selectParams = me._getParams(); //;		
		
		var storehost=hwDas.host;
		if(vmd.workspace && vmd.workspace.dataServiceIp) {
			storehost=vmd.workspace.dataServiceIp;
		}
		var hwstore=new HwDao(storehost,'vmdcode',true,this.timeout);
		var successCallback=function(result) {
			me.resultObject = result;
			me.constructor({
				proxy: new Ext.data.MemoryProxy(),
				id: "test",
				fields: me.getFields()
			});
			if(result.data.length > 0 && result.data[0].datas) {
				me.load(result.data[0].datas);
				me.FileInfo = result.data[0].fields
				if(fun != null) {
					fun(result);
				}
			}
		}
		var errCallback=function(msg) {
			Ext.Msg.alert("提示", "获取”" + me.storeId + "“数据失败\n" + msg,
				function() {})
		}
		hwstore.get(configInfo.url,{},selectParams,successCallback,errCallback )
	},
	//加载数据
	toLoadData: function(data) {
		var me = this;
		if(data)
			me.load(data)
	},
	//该方法用于刷新数据  不做数据集字段信息的调整
	toRefresh: function(fun, host, url) {
		var me = this;
		me.loaded=false;
		this.resultObject = {};
		var configInfo = me.storeConfigInfo;
		if(!configInfo) return;
		var selectParams = me._getParams();	
		var configurl;
		me.deleteRecords = [];
		me.addRecords=[];
		var storehost=hwDas.host;
		if(host) {
			storehost=host;
			configurl = {
				host: host || vmd.workspace.dataServiceIp,
				url: url || configInfo.url
			}
		} else if(vmd.projectInfo && vmd.projectInfo.dataServiceIp) {
			storehost=vmd.projectInfo.dataServiceIp;
			configurl = {
				host: vmd.projectInfo.dataServiceIp,
				url: url || configInfo.url
			}
		} else if(vmd.workspace && vmd.workspace.dataServiceIp) {
			storehost=vmd.workspace.dataServiceIp;
			configurl = {
				host: vmd.workspace.dataServiceIp,
				url: url || configInfo.url
			}
		} else
			configurl = url || configInfo.url;
		
		var hwstore=new HwDao(storehost,'vmdcode',true,this.timeout);
		var successCallback=function(result) {
			me.resultObject = result;
			if(result.data.length > 0 && result.data[0].datas) {
				me.loadData(result.data[0].datas);
				me.FileInfo = result.data[0].fields
				me.loaded=true;
				if(fun != null) {
					fun(result);
				}
			}
		}
		var errCallback=function(msg) {
			Ext.Msg.alert("提示", "获取”" + me.storeId + "“数据失败\n" + msg,
				function() {})
		}
		hwstore.get(configInfo.url,{},selectParams,successCallback,errCallback )
	},
	//该方法用于加载分页数据
	loadPageData: function(fun) {
		var me = this;
		this.resultObject = {};
		var configInfo = me.storeConfigInfo;
		if(!configInfo) return;
		var selectParams =me._getParams();// [];
		var configurl;
		if(vmd.workspace && vmd.workspace.dataServiceIp) {
			configurl = {
				host: vmd.workspace.dataServiceIp,
				url: configInfo.url
			}
		} else
			configurl = configInfo.url;

		hwDas.get(configurl, {
			Ecylogin: Ext.util.Cookies.get('EcyLogin') || Ext.util.Cookies.get('ecyLogin')
		}, selectParams, function(result) {
			me.resultObject = result;
			if(result.data.length > 0 && result.data[0].datas) {
				me.loadData(result.data[0].datas, true);
				me.FileInfo = result.data[0].fields
				if(fun != null) {
					fun(result);
				}
			}
		}, function(msg) {
			Ext.Msg.alert("提示", "获取”" + me.storeId + "“数据失败\n" + msg,
				function() {})
		})		
	},
	toSelect: function() {
		var me = this;
		me.reCreatStore(function() {
			me.load(me.resultObject.data[0].datas);
		});
	},
	toSave: function(fun, success, error) {
		var me = this;
		var configInfo = me.storeConfigInfo;
		var configurl;
		if(vmd.workspace && vmd.workspace.dataServiceIp) {
			configurl = {
				host: vmd.workspace.dataServiceIp,
				url: configInfo.url
			}
		} else
			configurl = configInfo.url;
		hwDas.save(configurl, {}, {}, me.getJson(), success || function(result) {
			if(fun)
				fun(result)
			else
				Ext.Msg.alert("提示", "数据保存成功")
		}, error || function(msg) {
			if(fun)
				fun(msg)
			else
				Ext.Msg.alert("提示", "保存”" + me.storeId + "“数据失败\n" + msg,
					function() {})
		})
	},
	//添加记录到store中  添加的记录；是否更新数据库，是否触发事件
	toAdd: function(rowRecords, upDateDB, success, error) {
		var record = Ext.data.Record.create(this.getFields()); //(rowRecords);    
		var newrecords = [];
		for(var i = 0; i < rowRecords.length; i++) {
			var newRecord = new record(rowRecords[i]);
			newrecords.push(newRecord)
		}
		var jsonstore = this;
		//var p = new Ext.data.Record.create()(rowRecord);
		jsonstore.add(newrecords)
		if(upDateDB) {
			var me = this;
			var configInfo = me.storeConfigInfo;
			var configurl;
			if(vmd.workspace && vmd.workspace.dataServiceIp) {
				configurl = {
					host: vmd.workspace.dataServiceIp,
					url: configInfo.url
				}
			} else
				configurl = configInfo.url;
			hwDas.add(configurl, {}, {}, rowRecords, success, error); //= function (parturl, headers, params, datas, successback, errorback) {		
		} else {
			if(success)
				success(newrecords)
		}
	},
	addData: function(id, data) {
		data._rowState="add"
		var record = this.getById(id)
		if(record)
			return
		else record = vmd.data.Record.create(Ext.clone(data), id);
		this.add(record);
	},
	removeAll(a,b,c)
	{
		var me = this;
		 Array.prototype.push.apply(this.deleteRecords, me.getJson())
		return this.callParent(arguments);
	},
	updateData: function(id, data) {		
		var urecord = this.getById(id);		
		if(urecord) {
			for(var key in data) {
				if(data[key]!=urecord.data[key]&&key!='id')
				{
					//urecord.editing=true
					urecord.set(key, data[key]);
					if(this.modified.indexOf(urecord) == -1){
						this.modified.push(urecord);
					}
					//urecord.editing=false
				}
			}
		}
	},
	//插入记录到store中
	toInsert: function(rowRecord, rowIndex, upDateDB, success, error) {
		var record = Ext.data.Record.create(this.getFields()); //(rowRecords);    
		var newRecord = new record(rowRecord);
		var jsonstore = this;
		jsonstore.insert(rowIndex, newRecord)
		if(upDateDB) {
			var me = this;
			var configInfo = me.storeConfigInfo;
			var configurl;
			if(vmd.workspace && vmd.workspace.dataServiceIp) {
				configurl = {
					host: vmd.workspace.dataServiceIp,
					url: configInfo.url
				}
			} else
				configurl = configInfo.url;
			hwDas.add(configurl, {}, {}, rowRecords, success, error); //= function (parturl, headers, params, datas, successback, errorback) {		
		}
	},
	insertData: function(id, data, index) {
		data._rowState="add"
		var record = this.getById(id)
		if(record)
			return
		else record = vmd.data.Record.create(Ext.clone(data), id);
		this.insert(index, record);
		this.addRecords.push()
	},
	deleteData: function(id,notFireRemoveEvent) {
		var me = this;
		var dataRecord = me.getById(id);
		if(dataRecord) {
			dataRecord.notFireRemoveEvent=notFireRemoveEvent;
			me.remove(dataRecord)
			if(dataRecord.modified&&dataRecord.modified._rowState == 'add') {} else
				this.deleteRecords.push(dataRecord.json)
		}
	},
	//删除store中的数据
	toDeleteByValue: function(value, filename, upDateDB, success, error) {
		var me = this;
		if(me.data.items.length > 0) {
			for(var i = me.data.items.length - 1; i >= 0; i--) {
				if(me.data.items[i].data[filename] && me.data.items[i].data[filename] == value) {
					if(upDateDB) {
						var me = this;
						var configInfo = me.storeConfigInfo;
						var configurl;
						if(vmd.workspace && vmd.workspace.dataServiceIp) {
							configurl = {
								host: vmd.workspace.dataServiceIp,
								url: configInfo.url
							}
						} else
							configurl = configInfo.url;
						hwDas.del(configurl, {}, {}, me.data.items[i].data, success, error); //= function (parturl, headers, params, datas, successback, errorback) {		
					}
					me.removeAt(i)
				}
			}
		}
	}, //删除store中的数据
	toDeleteById: function(recordId, upDateDB, success, error) {
		var me = this;
		var dataRecord = me.getById(recordId);
		if(dataRecord) {
			if(upDateDB) {
				var configInfo = me.storeConfigInfo;
				var configurl;
				if(vmd.workspace && vmd.workspace.dataServiceIp) {
					configurl = {
						host: vmd.workspace.dataServiceIp,
						url: configInfo.url
					}
				} else
					configurl = configInfo.url;
				hwDas.del(configurl, {}, {}, dataRecord.data, success, error); //= function (parturl, headers, params, datas, successback, errorback) {		
			}
			me.remove(dataRecord)
		}
	}, //删除store中的数据
	toDeleteByRecords: function(Records, upDateDB, success, error) {
		var me = this;
		if(Records) {
			if(upDateDB) {
				var configInfo = me.storeConfigInfo;
				var delDatas = [];
				for(var i = 0; i < Records.length; i++) {
					Records[i].data["RowState"] = "delete";
					delDatas.push(Records[i].data);
				}
				var configurl;
				if(vmd.workspace && vmd.workspace.dataServiceIp) {
					configurl = {
						host: vmd.workspace.dataServiceIp,
						url: configInfo.url
					}
				} else
					configurl = configInfo.url;
				hwDas.save(configurl, {}, {}, delDatas, success, error); //= function (parturl, headers, params, datas, successback, errorback) {		
			}
			me.remove(Records)
		}
	},
	//删除store中的数据
	toEdit: function(recordId, newRecord, upDateDB, success, error) {
		var me = this;
		var dataRecord = me.getById(recordId);
		if(dataRecord) {
			for(var p in dataRecord.data) {
				// fields
				if(typeof(dataRecord.data[p]) == "function") {} else {
					if(newRecord[p])
						dataRecord.data[p] = newRecord[p]
				}
			}
			if(upDateDB) {
				var me = this;
				var configInfo = me.storeConfigInfo;
				var configurl;
				if(vmd.workspace && vmd.workspace.dataServiceIp) {
					configurl = {
						host: vmd.workspace.dataServiceIp,
						url: configInfo.url
					}
				} else
					configurl = configInfo.url;
				hwDas.edit(configurl, {}, {}, newRecord, success, error); //= function (parturl, headers, params, datas, successback, errorback) {		
			}
		}
	},
	//获取数据服务返回数据的datas节点   即行数据的数组
	getJson: function(creatId) {
		var me = this;
		var dataJson = [];
		if(me.data.items.length > 0) {
			if(creatId) {
				for(var i = 0; i < me.data.items.length; i++) {
					var rd = {};
					if(JSON.stringify(me.data.items[i].data) != "{}")
						rd = Ext.clone(me.data.items[i].data)
					else
						rd = Ext.clone(me.data.items[i].json)
					rd.id = rd.id || me.data.items[i].id;
					dataJson.push(rd);
				}
			} else {
				for(var i = 0; i < me.data.items.length; i++) {
					if(JSON.stringify(me.data.items[i].data) != "{}")
						dataJson.push(me.data.items[i].data)
					else
						dataJson.push(me.data.items[i].json)
				}
			}
		}
		return dataJson;
	},
	//获取数据服务返回的字段信息   格式为[{name:"",type:""},{}]
	//参数  回调传递参数 参数格式[{name:"",type:""},{}]
	getFields: function(fun) {
		var me = this;
		if(me.fields && me.fields.items) {
			if(fun != null) {
				fun(me.fields.items);
			} else {
				return me.fields.items
			}
		}
		//定义转换的方法  将数据服务返回的格式转换为可视化数据集个字段格式
		var filearray = function(resultDataFields) {
			var dataFields = [];
			for(var p in resultDataFields) {
				// fields
				if(typeof(resultDataFields[p]) == "function") {} else {
					var fields = {
						name: p,
						type: resultDataFields[p].toLowerCase()
					}
					dataFields.push(fields);
				}
			}
			return dataFields;
		};
		//判断是否有rest返回的对象 有则直接取数据服务的信息并转换，如没有则调用创建接口创建数据服务数据
		if(me.resultObject == null) {
			me.toRefresh(function() {
				var resultDataFields = me.resultObject.data[0].fields;
				if(fun != null) {
					fun(filearray(resultDataFields));
				}
			})
		} else
		if(fun != null) {
			fun(filearray(me.resultObject.data[0].fields));
		} else {
			return filearray(me.resultObject.data[0].fields)
		}
	},
	//获取行记录
	getById: function(id) {
		var record = this.callParent(arguments);
		if(record)
			return record;
		else
			return this.getAt(this.find("id", id))
	},
	getDeleteDatas: function() {
		return this.deleteRecords;
	},
	getAddDatas: function() {
		var addDatas = [];
		var changeDatas = this.getModifiedRecords();
		for(var i = 0; i < changeDatas.length; i++) {
			if(changeDatas[i].modified&&changeDatas[i].modified._rowState == 'add')
				addDatas.push(changeDatas[i].json||changeDatas[i].data)
		}
		return addDatas;
	},
	getEditDatas: function() {
		var editDatas = [];
		var changeDatas = this.getModifiedRecords();
		for(var i = 0; i < changeDatas.length; i++) {
			if(changeDatas[i].modified&&!changeDatas[i].modified._rowState)
				editDatas.push({
					newValue: changeDatas[i].data,
					oldValue:changeDatas[i].json||changeDatas[i].data
				})
		}
		return editDatas;
	},
	getChangeDatas: function() {
		return this.getRange();
	},
	commitChanges: function() {
		this.deleteRecords = [];
		this.callParent(arguments);
	},
	//设置数据集的字段值，通过查询字段和查询值找到记录进行修改对应的字段值
	setValue: function(sField, sValue, cField, cValue) {
		for(var index = 0; index < this.data.items.length; index++) {
			var dataJson = this.data.items[index].data;
			if(sField) {
				if(dataJson[sField] == sValue) {
					dataJson[cField] = cValue;
				}
			} else {
				dataJson[cField] = cValue;
			}
		}
	},
	getCount: function() {
		if(this.rptStore)
			return this.rptStore.count()
		else
			return this.callParent(arguments);
	},
	getCurrowValue: function(fieldname) {
		if(this.rptStore) {
			var index = this.rptStore.getCursor()
			return this.rptStore.getValue(fieldname, index)
		}
		return "";
	},
	getSum: function(fieldname) {
		if(this.rptStore) {
			return this.rptStore.sum(fieldname)
		}
		return this.sum(fieldname)
	},
	getAvg: function(fieldname) {
		if(this.rptStore) {
			return this.rptStore.avg(fieldname)
		}
		return this.sum(fieldname) / this.getCount()
		//return "";
	},
	getMax: function(fieldname) {
		if(this.rptStore) {
			return this.rptStore.max(fieldname)
		}
		var maxVal;
		var index = 0;
		this.each(function(rec) {
			if(index == 0)
				maxVal = rec.get(fieldname)
			else if(maxVal < rec.get(fieldname))
				maxVal = rec.get(fieldname)
			index++
		})
		return maxVal;
	},
	getMin: function(fieldname) {
		if(this.rptStore) {
			return this.rptStore.min(fieldname)
		}
		var minVal;
		var index = 0;
		this.each(function(rec) {
			if(index == 0)
				minVal = rec.get(fieldname)
			else if(rec.get(fieldname) && minVal > rec.get(fieldname))
				minVal = rec.get(fieldname)
			index++
		})
		return minVal;
	}
})
Ext.define("vmd.store.MSStore", {
	extend: "vmd.store.jsonStore",
	constructor: function(config) {
		var me = this;
		me.master=null;
		if(config&&config.master)
			me.master = Ext.StoreMgr.lookup(config.master);
		 me.slaves=[]
		if(config&&config.slave){
			for(var i = 0; i < config.slave.length; i++) {
				me.slaves.push(Ext.StoreMgr.lookup(config.slave[i]));
			}
		}
		me.relation=[]
		if(config&&config.relation)
			me.relation = config.relation;		
		this.callParent(arguments);		
	},
	getMaster: function() {
		if(this.master)
			return this.master;
		return null;
	},
	getSlave: function(name) {
		if(!name)
			return this.slave;
		if(this.slave.length > 0) {
			for(var i = 0; i < this.slave.length; i++) {
				if(this.slave[i].id == name)
					return this.slave[i];
			}
		}
	},
	_getParams:function(){
		var me =this;
		var params=this.callParent(arguments);	
		var mstore=Ext.StoreMgr.lookup(me.master);		
		if(!mstore)		
			return params;
		var srelation	=this.relation;
		if(srelation)
		{
			for(var j=0;j<srelation.length;j++)
			{
				if(srelation[j].mField&&srelation[j].sField)
				{
				var svalue=mstore.getCurrowValue(srelation[j].mField)
				if(svalue)
					params[srelation[j].sField]=params[srelation[j].sField]||svalue	;	
				}
			}	
		}
		return params;		
	},
	_getTopStore: function() {
		if(this.master&&Ext.StoreMgr.lookup(this.master))
			return Ext.StoreMgr.lookup(this.master)._getTopStore();
		else return this;
	},
	_getMSDeleteDatas: function() {
		var delDatas = [];
		var topstore = this._getTopStore();
		var _getStoresDeleteDatas = function(stores) {
			var storesDatas = []
			var storesSlave = [];
			for(var i = 0; i < stores.length; i++) {
				mmstore=Ext.StoreMgr.lookup(stores[i].master)				
				var patableName=''
				if(mmstore)patableName=mmstore.trueTables;
				var primary=[];
				if(stores[i].fields&&stores[i].fields.items&&stores[i].fields.items.length>0){
					for(var j=0;j<stores[i].fields.items.length;j++){
						if(stores[i].fields.items[j].primary=='Y')
							primary.push(stores[i].fields.items[j].name)
					}
				}			
					var deldatas=stores[i].getDeleteDatas()
				if( deldatas.length>0){	
					storesDatas.push({
						datas: deldatas,
						tableName: stores[i].trueTables,
						relation: stores[i].relation,
						ptableName:patableName,
						primary:primary,
						cascadeDel:stores[i].cascadeDel||false
					});
				}
				if(stores[i].slave && stores[i].slave.length > 0) {
					for(var j = 0; j < stores[i].slave.length; j++) {
						storesSlave.push( Ext.StoreMgr.lookup(stores[i].slave[j]));
					}
				}
			}
			if(storesSlave.length > 0) {
				var slaveStoresDatas = _getStoresDeleteDatas(storesSlave)
				if(slaveStoresDatas.length > 0)
					for(var i = 0; i < slaveStoresDatas.length; i++)
						if( slaveStoresDatas[i].datas.length>0){	
							storesDatas.push(slaveStoresDatas[i])
						}
			}
			return storesDatas;
		}
		delDatas = _getStoresDeleteDatas([topstore])
		return delDatas.reverse()
	},
	_getMSAddDatas: function() {
		var addDatas = [];
		var topstore = this._getTopStore();
		var _getStoresAddDatas = function(stores) {
			var storesDatas = []
			var storesSlave = [];
			for(var i = 0; i < stores.length; i++) {
				var adddatas= stores[i].getAddDatas()
				if(adddatas.length>0){	
					storesDatas.push({
						datas: adddatas,
						tableName: stores[i].trueTables,
						relation: stores[i].relation
					});
				}				
				if(stores[i].slave && stores[i].slave.length > 0) {
					for(var j = 0; j < stores[i].slave.length; j++) {
						storesSlave.push(Ext.StoreMgr.lookup(stores[i].slave[j]));
					}
				}
			}
			if(storesSlave.length > 0) {
				var slaveStoresDatas = _getStoresAddDatas(storesSlave)
				if(slaveStoresDatas.length > 0)
					for(var i = 0; i < slaveStoresDatas.length; i++)
						if( slaveStoresDatas[i].datas.length>0){						
							storesDatas.push(slaveStoresDatas[i])
						}
			}
			return storesDatas;
		}
		addDatas = _getStoresAddDatas([topstore])
		return addDatas
	},
	_getMSEditDatas: function() {
		var editDatas = [];
		var topstore = this._getTopStore();
		var _getStoresEditDatas = function(stores) {
			var storesDatas = []
			var storesSlave = [];
			for(var i = 0; i < stores.length; i++) {
				var primary=[];
				if(stores[i].fields&&stores[i].fields.items&&stores[i].fields.items.length>0){
					for(var j=0;j<stores[i].fields.items.length;j++){
						if(stores[i].fields.items[j].primary=='Y')
							primary.push(stores[i].fields.items[j].name)
					}
				}				
				var editdatas=stores[i].getEditDatas()
				if( editdatas.length>0){	
					storesDatas.push({
						datas: editdatas,
						tableName: stores[i].trueTables,
						relation: stores[i].relation,
						primary:primary
					});
				}
				if(stores[i].slave && stores[i].slave.length > 0) {
					for(var j = 0; j < stores[i].slave.length; j++) {
						storesSlave.push(Ext.StoreMgr.lookup(stores[i].slave[j]));
					}
				}
			}
			if(storesSlave.length > 0) {
				var slaveStoresDatas = _getStoresEditDatas(storesSlave)
				if(slaveStoresDatas.length > 0)
					for(var i = 0; i < slaveStoresDatas.length; i++)						
						if( slaveStoresDatas[i].datas.length>0){	
							storesDatas.push(slaveStoresDatas[i])
						}
			}
			return storesDatas;
		}
		editDatas = _getStoresEditDatas([topstore])
		return editDatas
	},
	getMSChangeDatas: function() {
		return {
			datas:{
			deleteDatas: this._getMSDeleteDatas(),
			addDatas: this._getMSAddDatas(),
			editDatas: this._getMSEditDatas()},
			tableDic:this.getMsDictionary()
		}
	},
	getMsDictionary:function()
	{	var tabDic=[];
		var tabList = [];
		var topstore = this._getTopStore();
		var _getStoresDic = function(stores) {
			var storesDic = []
			var storesSlave = [];			
			for(var i = 0; i < stores.length; i++) {				
			if(tabList.indexOf(stores[i].storeId)<0)
			{tabList.push(stores[i].storeId)}			
				if(stores[i].slave && stores[i].slave.length > 0) {
					for(var j = 0; j < stores[i].slave.length; j++) {
						storesSlave.push(Ext.StoreMgr.lookup(stores[i].slave[j]));
					}
				}
			}
			if(storesSlave.length > 0) {
				var slaveStoresList = _getStoresDic(storesSlave)
				if(slaveStoresList.length > 0)
					for(var i = 0; i < slaveStoresList.length; i++)
						if(tabList.indexOf(slaveStoresList[i])<0)
						tabList.push(slaveStoresList[i])
			}
			return tabList;
		}
		_getStoresDic([topstore])
		for(var i=0;i<tabList.length;i++)
		{
			_store=Ext.StoreMgr.lookup(tabList[i])
			var dic=[];
			if(_store.fields&&_store.fields.items&&_store.fields.items.length>0){
					for(var j=0;j<_store.fields.items.length;j++){
						item=_store.fields.items[j]
						dic.push({name:item.name,primary:item.primary,nullable:item.nullable,type:item.dtype})						
					}
				}	
			tabDic.push({tablename:_store.trueTables,dic:dic})
		}
		return tabDic	
	},
	slaveHasChangeDatas: function() {
		var me =this;
		var slaves=me.slave||[];
		var hasChange=false;
	   for(var i=0;i<slaves.length;i++)
	   {
			sstore= Ext.StoreMgr.lookup(slaves[i]);
			if(sstore.getDeleteDatas()>0||sstore.getEditDatas()>0|| sstore.getAddDatas()>0){
				hasChange=true;
				break;
			} 
	   }	   
	   return hasChange;	   
	},
	submitMSChangeDatas: function() {		
		var topstore = this._getTopStore();
		var _submitChangeDatas = function(stores) {
			var storesSlave = [];
			for(var i = 0; i < stores.length; i++) {
				stores[i].commitChanges();				
				if(stores[i].slave && stores[i].slave.length > 0) {
					for(var j = 0; j < stores[i].slave.length; j++) {
						storesSlave.push(Ext.StoreMgr.lookup(stores[i].slave[j]));
					}
				}
			}
			if(storesSlave.length > 0) {
				_submitChangeDatas(storesSlave)
			}
		}
		_submitChangeDatas([topstore])
	},
	refreshSlaveStore:function(){
		var me =this;
		var slaves=me.slave||[];
	   for(var i=0;i<slaves.length;i++)
	   {
		   Ext.StoreMgr.lookup(slaves[i]).toRefresh();	
	   }	   
	}
})

//#region variable
Ext.define("vmd.var.variable", {
	//extend: "Ext.data.JsonStore",
	xtype: "vmd.variable",
	resultObject: null,
	value: null,
	valueExp: "",
	_userdefined:false,
	constructor: function(config) {
		this.valueExp = config.value;
		//value = valueExp == "" ? "" : eval("(function(){" + valueExp + "})()");
	},
	getValue: function() {
		if(this._userdefined)
		{
			if(this.value != null)
				return this.value;		
		}
		this.value = (this.valueExp == "" ? "" : eval("(function(){" + this.valueExp + "\r\n})()")) || "";		
		return this.value;
	},
	setValue: function(a) {
		this._userdefined=true;
		this.value = a
		this.valueExp="return '"+ a +"'"
	},
	getValueExp: function() {
		return this.valueExp
	},
	refresh: function() {		
		this._userdefined=false;
		this.value = (this.valueExp == "" ? "" : eval("(function(){" + this.valueExp + "\r\n})()")) || "";
	}
})

//兼容ie8派生变量类
Ext.define("vmd.Variable", {
         extend:'vmd.var.variable',
		 xtype:'vmd.variablex'
})

/*extgrid*/
Ext.define('vmd.comp.extgrid', {
	extend: 'Ext.grid.GridPanel',
	alternateClassName: 'vmd.comp.ExtGrid',
	xtype: 'grid',
	initComponent: function() {

		this.store = this.store || new Ext.data.JsonStore();
		this.callParent(arguments)
	}
})

Ext.define('vmd.comp.viewport', {
	extend: 'Ext.Viewport',
	xtype: 'viewport',
	listeners: {
		afterLayout: function() {

			if(this.autoScroll) {
				this.el && this.el.select('.x-box-inner', true).setStyle('overflow', 'auto');
			}
		}
	}
})

Ext.define("vmd.service.HwMSC", {
	xtype: "vmd.hwMSC",
	constructor: function(host, appid, appkey) {
		var myHwMSC = this;
		var pMsgIp=(vmd&&vmd.projectInfo&&vmd.projectInfo.msgIp)?vmd.projectInfo.msgIp:""
		var wMsgIp=(vmd&&vmd.workspace&&vmd.workspace.msgIp)?vmd.workspace.msgIp:""	
		
		var newHwMSC = new HwMSC("","",host || pMsgIp || wMsgIp,
			appid || "24cced61-8580-4603-b6a2-1684b233d1b4",
			appkey || "7e0a84cd-cdf6-42d4-9762-798d6628d36c")
		Ext.apply(myHwMSC, newHwMSC)
		this.callParent(arguments)
	}
})

//待办中心
Ext.define("vmd.service.HwTDC", {
	xtype: "vmd.hwTDC",
	constructor: function(host, appid, appkey) {
		var myHwTDC = this;
		var ptdcIp = (vmd && vmd.projectInfo && vmd.projectInfo.todoIp) ? vmd.projectInfo.todoIp : ""
		//对以前的消息中心进行兼容，如果为老的模式，会动态加载消息中心脚本；新的模式不糊动态加载		
		var newHwTDC = new HwTDC(host || ptdcIp,
			appid || "24cced61-8580-4603-b6a2-1684b233d1b4",
			appkey || "7e0a84cd-cdf6-42d4-9762-798d6628d36c")
		Ext.apply(myHwTDC, newHwTDC)
		this.callParent(arguments)
	}
})


//日志中心
Ext.define("vmd.service.HwLGC", {
	xtype: "vmd.hwLGC",
	constructor: function(host, appid, appkey) {
		var myHwLGC = this;
		var ptdcIp = (vmd && vmd.projectInfo && vmd.projectInfo.logIp) ? vmd.projectInfo.logIp : ""
		//对以前的消息中心进行兼容，如果为老的模式，会动态加载消息中心脚本；新的模式不糊动态加载		
		var newHwLGC = new HwLGC(host || ptdcIp,
			appid || "24cced61-8580-4603-b6a2-1684b233d1b4",
			appkey || "7e0a84cd-cdf6-42d4-9762-798d6628d36c")
		Ext.apply(myHwLGC, newHwLGC)
		this.callParent(arguments)
	}
})

//文档中心
Ext.define("vmd.service.HwDMC", {
	xtype: "vmd.hwDMC",
	constructor: function(host, appid, appkey) {
		var myHwDmC = this;
		var ptdcIp = (vmd && vmd.projectInfo && vmd.projectInfo.docIp) ? vmd.projectInfo.docIp : ""
		//对以前的消息中心进行兼容，如果为老的模式，会动态加载消息中心脚本；新的模式不糊动态加载		
		var newHwDMC = new HwDMC(host || ptdcIp)
		Ext.apply(myHwDmC, newHwDMC)
		this.callParent(arguments)
	}
})

//应用中心
Ext.define("vmd.service.HwAMC", {
	xtype: "vmd.hwAMC",
	constructor: function(host, appid, appkey) {
		var myHwAMC = this;
		var ptdcIp = (vmd && vmd.projectInfo && vmd.projectInfo.amcIp) ? vmd.projectInfo.amcIp : ""
		//对以前的消息中心进行兼容，如果为老的模式，会动态加载消息中心脚本；新的模式不糊动态加载		
		var newHwAMC = new HwAMC(host || ptdcIp)
		Ext.apply(myHwAMC, newHwAMC)
		this.callParent(arguments)
	}
})

//用户中心
Ext.define("vmd.service.HwUMC", {
	xtype: "vmd.hwUMC",
	constructor: function(host, appid, appkey) {
		var myHwUMC = this;
		var ptdcIp = (vmd && vmd.projectInfo && vmd.projectInfo.umcIp) ? vmd.projectInfo.umcIp : ""
		//对以前的消息中心进行兼容，如果为老的模式，会动态加载消息中心脚本；新的模式不糊动态加载		
		var newHwUMC = new HwUMC(host || ptdcIp)
		Ext.apply(myHwUMC, newHwUMC)
		this.callParent(arguments)
	}
})

//权限中心
Ext.define("vmd.service.HwEMC", {
	xtype: "vmd.hwEMC",
	constructor: function(host, appid, appkey) {
		var myHwEMC = this;
		var ptdcIp = (vmd && vmd.projectInfo && vmd.projectInfo.emcIp) ? vmd.projectInfo.emcIp : ""
		//对以前的消息中心进行兼容，如果为老的模式，会动态加载消息中心脚本；新的模式不糊动态加载		
		var newHwEMC = new HwEMC(host || ptdcIp)
		Ext.apply(myHwEMC, newHwEMC)
		this.callParent(arguments)
	}
})

Ext.define("vmd.workFlow", {
	xtype: "vmd.workflow",
	alternateClassName: ['vmd.service.HwWorkFlow'],
	/*
	 **工作流构造函数 
	 * @params  {object}config  工作流初始化时的参数对象，如绑定工作流，则直接使用框架进行创建；如未绑定，单独创建，则需要传递工作流信息
	 * { taskId:"125852", processInstanceId:"sd-23189", modelId:"254866",modelName:"请假", startNodeId:"u1"}
	 * @params  {Function}afterloader  工作流加载完后执行的回调
	 * @return  void 
	 */
	constructor: function(config, afterloader) {
		var page = this;
		 if(vmd.loadHwWorkFlow) {
			vmd.loadHwWorkFlow(page, config, afterloader)
			setTimeout(function(){
				page.beforeInit();
			}, 20);
			}
		 else {
			 $LAB
			.script(bootPATH+'/js/hwWorkFlow.js').wait(function() {
				vmd.loadHwWorkFlow(page, config, afterloader)
				setTimeout(function(){
					page.beforeInit();
				}, 20);
			})
			}		
		this.callParent(arguments)
	}
})

//#region checkboxgroup组件
Ext.define('vmd.comp.checkboxstoregroup', {
	extend: 'Ext.form.CheckboxGroup',
	alias: 'widget.checkboxstoregroup',
	xtype: 'checkboxgroup',
	items: [],
	config: {
		labelField: 'label',
		valueField: 'value',
		checkedField: 'checked',
		//columns: 'auto',
		boxFieldName: 'mycheckbox'
	},

	bindStore: function(store, initial) {
		if(!initial && this.store) {
			if(store !== this.store && this.store.autoDestroy) {
				this.store.destroy();
			} else {
				// this.store.un("beforeload", this.onBeforeLoad, this);
				this.store.un("datachanged", this.onDataChanged, this);
				// this.store.un("add", this.onAdd, this);
				this.store.un("remove", this.onRemove, this);
				//this.store.un("update", this.onUpdate, this);
				//this.store.un("clear", this.storeRefresh, this);
				//this.store.un("load", this.updateStore, this);
			}
			if(!store) {
				this.store = null;
			}
		}
		if(store) {

			store = Ext.StoreMgr.lookup(store);
			store.on({
				scope: this,
				//beforeload: this.onBeforeLoad,
				datachanged: this.onDataChanged,
				// add: this.onAdd,
				remove: this.onRemove
				// update: this.onUpdate,
				// clear: this.storeRefresh,//store.removeAll清空所有数据调用此接口
				//load: this.updateStore//store.removeAll清空所有数据调用此接口
			});
		}
		this.store = store;
		if(store) {
			this.updateStore();
		}
	},

	//private store数据发生变化调用该接口
	onDataChanged: function() {
		this.updateStore.apply(this, arguments);
	},
	//private store数据发生变化调用该接口
	onRemove: function() {
		this.updateStore.apply(this);
	},
	updateStore: function(name, type) {

		var vField = this.getValueField();
		var lField = this.getLabelField();
		var cField = this.getCheckedField();
		var fName = this.getBoxFieldName() || name;
		var rec = null;
		var s = this.store;
		var me = this;
		//清空
		//this.update('')
		var flag = false;
		var items = [];

		for(var i = 0; i < s.getCount(); i++) {
			rec = s.getAt(i);

			items.push({
				xtype: type || 'checkbox',
				inputValue: rec.get(vField),
				boxLabel: rec.get(lField),
				checked: rec.get(cField),
				name: fName
			});
			flag = true;
		}
		if(flag) {

			me.panel.removeAll();
			me.items = items;

			var colCfg = {
				xtype: 'container',
				defaultType: this.defaultType,
				layout: 'form',
				defaults: {
					hideLabel: true,
					anchor: '100%'
				}
			};
			var numCols, cols = [];
			if(Ext.isArray(this.columns)) this.columns = this.columns.length;
			if(!this.columns) {
				this.auto = true;
			}
			if(typeof this.columns == 'string') {
				this.columns = this.items.length;
			}
			if(this.auto) {
				numCols = this.items.length;

			} else {
				if(!Ext.isArray(this.columns)) {
					var cs = [];
					for(var i = 0; i < this.columns; i++) {
						cs.push((100 / this.columns) * .01);
					}
					this.columns = cs;
				}

				numCols = this.columns.length;
			}

			for(var i = 0; i < numCols; i++) {
				var cc = Ext.apply({
					items: []
				}, colCfg);
				if(!this.auto)
					cc[this.columns[i] <= 1 ? 'columnWidth' : 'width'] = this.columns[i];
				if(this.defaults) {
					cc.defaults = Ext.apply(cc.defaults || {}, this.defaults);
				}
				cols.push(cc);
			};

			if(this.vertical) {
				var rows = Math.ceil(this.items.length / numCols),
					ri = 0;
				for(var i = 0, len = this.items.length; i < len; i++) {
					if(i > 0 && i % rows == 0) {
						ri++;
					}
					if(this.items[i].fieldLabel) {
						this.items[i].hideLabel = false;
					}
					cols[ri].items.push(this.items[i]);
				};
			} else {
				for(var i = 0, len = this.items.length; i < len; i++) {
					var ci = i % numCols;
					if(this.items[i].fieldLabel) {
						this.items[i].hideLabel = false;
					}
					cols[ci].items.push(this.items[i]);
				};
			}

			// me.panel.add(items);

			//me.items = items;
			me.panel.add(cols);
			me.panel.doLayout();

			var fields = this.panel.findBy(function(c) {
				return c.isFormField;
			}, this);

			this.items = new Ext.util.MixedCollection();
			this.items.addAll(fields);
			//this.items = me.panel.items;

			this.eachItem(function(item) {

				item.on('check', this.fireChecked, this);
				item.inGroup = true;
			});

			/*	this.update('')
			      me.el = null;
			me.items = items;
			var dom = document.getElementById(me.id);
			dom && dom.parentElement.removeChild(dom);
			this.superclass.onRender.call(me, me.ct);
            
			this.lastSize = false
			this.superclass.afterRender.call(this);
			this.ownerCt.layout.configureItem(me)
			    */
		}

	},

	initComponent: function() {
		this.callParent(arguments);
	},

	afterRender: function(ct) {
		this.callParent();
		this.ct = ct;

		//绑定store
		if(this.store) {
			this.bindStore(this.store, true);
		}

	},

	getValue: function(isReturnArray, separator, wrapChar) {

		if(typeof isReturnArray == "string") {
			wrapChar = separator;
			separator = isReturnArray;
			isReturnArray = false;
		}

		separator = separator || ',';
		wrapChar = wrapChar || '';

		var value = [];
		var mixedValue = this.superclass.getValue.call(this);
		Ext.each(mixedValue, function(item) {
			if(isReturnArray == true) {
				var _item = {
					label: item.boxLabel,
					value: item.inputValue
				}
				value.push(_item);
			} else {
				if(item.inputValue == undefined && item.boxLabel) {
					value.push(item.boxLabel);
				} else
					value.push(item.inputValue);
			}

		})
		if(isReturnArray == true) return value;
		//默认返回str
		if(!isReturnArray) {
			if(value.length == 0) value = "";
			else {
				// separator = separator || ",";
				value = wrapChar + value.join(separator) + wrapChar;
			}
		}
		return value;
	},getText: function() {

		var value = [];
		var mixedValue = this.superclass.getValue.call(this);
		Ext.each(mixedValue, function(item) {
			value.push(item.boxLabel);
		})
		if(value.length == 0) value = "";
		else {
			// separator = separator || ",";
			value = value.join(",");
		}
		return value;
	},
	getChecked: function() {
		var value = [];
		var mixedValue = this.superclass.getValue.call(this);
		Ext.each(mixedValue, function(item) {
			value.push(item.checked);
		})

		return value;
	}
});
//#endregion
//#region checkboxgroup组件
Ext.define('vmd.comp.radiostoregroup', {
	extend: 'Ext.form.RadioGroup',
	alias: 'widget.radiostoregroup',
	xtype: 'radiostoregroup',
	items: [],
	config: {
		labelField: 'label',
		valueField: 'value',
		checkedField: 'checked',
		//columns: 'auto',
		boxFieldName: 'myRadio'
	},

	bindStore: function(store, initial) {
		vmd.comp.checkboxstoregroup.prototype.bindStore.apply(this, arguments);
	},

	//private store数据发生变化调用该接口
	onDataChanged: function() {
		this.updateStore.apply(this, arguments);
	},
	//private store数据发生变化调用该接口
	onRemove: function() {
		this.updateStore.apply(this);
	},
	updateStore: function() {
		//var fName, items
		var name = "radio_" + randomWord(false, 4);
		var type = "radio";

		vmd.comp.checkboxstoregroup.prototype.updateStore.call(this, name, type);

	},
	getValue: function() {

		var val;
		var item = this.superclass.getValue.call(this);
		if(!item) return "";
		if(item.inputValue == undefined && item.boxLabel) {
			val = item.boxLabel;
		} else
			val = item.inputValue;
		return val;
	},	getText: function() {
		var val;
		var item = this.superclass.getValue.call(this);
		if(!item) return "";
		val = item.boxLabel;
		return val;
	},
	initComponent: function() {

		var name = "radio_" + randomWord(false, 4);
		Ext.each(this.items, function(_item) {
			_item.name = name
		})
		this.callParent(arguments);

	},

	afterRender: function(ct) {
		this.callParent();
		this.ct = ct;
		//绑定store
		if(this.store) {
			this.bindStore(this.store, true);
		}

	},
	setValue: function(val) {
		if(!this.ct) this.value=val;
		this.setValueForItem(val)
		// this.superclass.setValue.call(this,'value',val);
	}
});
//#endregion
//#region 重新扩展 日期组件
Ext.define('Ext.ux.DateField', {
	extend: 'Ext.form.DateField',
	xtype: 'datefield',
	defaultValue: '',
	initComponent: function() {

		this.callParent(arguments);

		//默认值设置
		this.initDefaultValue(this.defaultValue);
	},
	afterRender:function(){
        this.callParent(arguments)
        var that = this;
			//文本输入的点击事件
			this.el.on('click', function (e) {
			   Ext.defer(function(){
				if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&that.compatibleOCX))
				 vmd.enableIframe(that.menu.el.dom)
			   },50)			   
			});
			//日期图标的点击事件
			vmd(this.trigger.dom).bind('click', function(e) {
				Ext.defer(function(){
				if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&that.compatibleOCX))
						vmd.enableIframe(that.menu.el.dom)
			   },50)
			});		
			this.on('select',function(){
				 Ext.defer(function(){
				if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&that.compatibleOCX))
						{
						vmd.iframeResize(that.menu.el.dom,false)
						}
				},50)   				
			});	
			this.on('blur', function(e) {
				if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&that.compatibleOCX))
						vmd.iframeResize(that.menu.el.dom,false)
			});		
			
			
			
    },
	
	/*
	 *override getValue
	 */
	getValue: function(state) {
		var value = this.callParent();
		if(state && value && Ext.isDate(value)) {
			return value.format(this.format);
		}
		return value;
	},

	initDefaultValue: function(diff) {

		var val = "";
		var now = new Date();
		switch(diff) {
			case '':
				break;
			case 'today':
				val = now;
				break;
			case 'prevDay':
				val = Ext.Date.add(now, Ext.Date.DAY, -1);
				break;
			case 'nextDay':
				val = Ext.Date.add(now, Ext.Date.DAY, 1);
				break;
			case 'prevWeek':
				val = Ext.Date.add(now, Ext.Date.DAY, -7);
				break;
			case 'nextWeek':
				val = Ext.Date.add(now, Ext.Date.DAY, 7);
				break;
			case 'prev3Month':
				val = Ext.Date.add(now, Ext.Date.MONTH, -3);
				break;
			case 'next3Month':
				val = Ext.Date.add(now, Ext.Date.MONTH, 3);
				break;
			case 'prevMonth':
				val = Ext.Date.add(now, Ext.Date.MONTH, -1);
				break;
			case 'nextMonth':
				val = Ext.Date.add(now, Ext.Date.MONTH, 1);
				break;
			case 'prevYear':
				val = Ext.Date.add(now, Ext.Date.YEAR, -1);
				break;
			case 'nextYear':
				val = Ext.Date.add(now, Ext.Date.YEAR, 1);
				break;

		}

		this.setValue(val);

	}

})
//#endregion 

//#region vmdcomlist
Ext.define("vmd.comp.ComList", {
	extend: "Ext.form.ComboBox",
	xtype: 'vmd.comlist',
	width: 245,
	initComponent: function() {
		//定义store属性
		this.store = Ext.StoreMgr.lookup(this.store);

		this.callParent()

		//点击时显示下拉所有的数据，如为query，则在输入值时才显示检索出来的数据

		this.triggerAction = "all";

	},
	onRender: function(ct, position) {

		this.superclass.onRender.call(this, ct, position);

		this.resizeEl.addClass('vmd-comlist');
        this.resizeEl.addClass(this.cls);
        this._cls = this.cls;
		
		this.mode = 'local';
		this.editable = this.editable;
		this.minChars = 1;
		this.displayField = this.displayField;
		this.valueField = this.valueField;

		this.queryInFields = this.query || false;
		if((this.queryInFields === true) && (this.mode == 'local') && this.queryField) { //默认在全部列中查询    
			if(this.queryField.split(",").length > 0) {
				this.queryFields = this.queryField.split(",");
			}
		}
		if(this.dropDownFields) {
			if(this.dropDownFields.split(",").length > 0) {
				this.displayFields = this.dropDownFields.split(",");
			}
		}
		this.mon(this, {
			scope: this,
			select: this.selChange
		})
		

	},
    afterRender:function(){
        this.callParent(arguments)
        this.el.removeClass(this._cls);
    },
	initList: function() {
		var cbW = this.listWidth || this.width;
		if((!this.tpl) && (this.displayFields)) { // 展示多列    
			var tplString = "";
			var cls = 'x-combo-list';
			//var cbW = this.width || 150;
			var dfLen = this.displayFields.length;
			var w = (cbW / dfLen).toFixed(2);
			var f = this.store.fields;
			Ext.each(this.displayFields, function(name) {
				name = f.containsKey(name) ? name : f.keys[name]; //列名或列号    
				tplString += '<td width=' + w + '>{' + name + '}</td>';
			}, this);
			this.tpl = new Ext.XTemplate(
				'<table><tpl for="."><tr class="' + cls + '-item" height="20px" >',
				tplString,
				'</tr></tpl></table>'
			);
		}
		this.superclass.initList.call(this);
		if(Ext.isSafari) {
			this.el.swallowEvent("mousedown", true)
		}
		this.el.unselectable();
		this.list.setWidth(cbW)
		this.innerList.setWidth(cbW)
		this.innerList.unselectable();
		this.trigger.unselectable();		
		
		this.innerList.on("mouseup", function(d, c, b) {
			if(c.id && c.id == this.innerList.id) {
				return
			}
			//this.onViewClick()
		}, this);
		this.innerList.on("mouseover", function(d, c, b) {
			if(c.id && c.id == this.innerList.id) {
				return
			}
			this.lastSelectedIndex = this.view.getSelectedIndexes()[0] + 1;
		}, this);
		this.trigger.un("click", this.onTriggerClick, this);
		this.trigger.on("mousedown", function(d, c, b) {
			d.preventDefault();
			this.onTriggerClick()
		}, this);
		this.on("collapse", function(d, c, b) {
			Ext.getDoc().un("mouseup", this.collapseIf, this)
				if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&this.compatibleOCX))
			{
				vmd.iframeResize(this.list.dom,false)
			}
		}, this, true);
		this.on("onblur", function() {
				if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&this.compatibleOCX))
			{	
		       Ext.defer(function(){
					 vmd.enableIframe(this.list.dom,false)
				},50)   
			}
		}, this, true);
		this.on("expand", function(d, c, b) {
			Ext.getDoc().on("mouseup", this.collapseIf, this)	
           var  me=this		
				if((vmd.isIE&&vmd.isOcx)||(vmd.isIE&&this.compatibleOCX))
			{	
		       Ext.defer(function(){
					 vmd.enableIframe(me.list.dom,true)
				},50)   
			}
		}, this, true)
	},
	selChange: function(combo, record, index) {
		if(this.Multi) {} else {
			this.fireEvent('selectChanged', this, combo, record, index)
		}
	},
	getText: function() {
		return this.getRawValue()
	},
	/**  
	 * @param {String} query  查询参数的值q    
	 * @param {Boolean} forceAll  如果forceAll为true 显示全部记录,为false时则通过query参数查询  
	 */
	doQuery: function(q, forceAll) {
		if(!this.store)
			return;
		if(this.Multi) {

		} else {
			this.superclass.doQuery.call(this, q, forceAll);

			q = Ext.isEmpty(q) ? '' : q;
			if(!forceAll && (q.length >= this.minChars)) {
				if((this.queryInFields === true) && (this.mode == 'local')) {
					var len = this.queryFields.length;
					this.selectedIndex = -1;
					var f = this.store.fields;
					this.store.filterBy(function(r, id) {
						for(var i = 0; i < len; i++) {
							var name = this.queryFields[i];
							name = f.containsKey(name) ? name : f.keys[name];
							// if(RegExp(q).test(r.get(name))) {
							// 	return true;
							// }
							if((r.get(name)).indexOf(q) != -1) {
								return true;
							}
						}
						return false;
					}, this);
					this.onLoad();
				};
			}
		}
	},
	/**  
	 *@param String/Json       增加对json的支持  
	 */
	setValue: function(obj) {
		if(Ext.isString(obj)) {
			this.superclass.setValue.call(this, obj);
		} else if(Ext.isObject(obj)) {
			this.setValue(obj[this.valueField || this.displayField]);
		}
	},
	/**  
	 *@param Ext.data.Record 把record作为combobox的选中值   
	 */
	setRecordValue: function(r) {
		this.setValue(r.data[this.valueField || this.displayField]);
		this.recordValue = r;
		return this;
	},
	/**  
	 *@return Ext.data.Record 拿到combobox当前选中的记录  
	 */
	getRecordValue: function() {
		return this.recordValue;
	},
	/**  
	 *@desc overwrite  
	 */
	select: function(index, scrollIntoView) {
		this.superclass.select.call(this, index, scrollIntoView);
		if(this.selectedIndex == -1) {
			this.recordValue = '';
		} else {
			this.recordValue = this.store.getAt(this.selectedIndex);
		}
	},
	/**  
	 *调用store的load方法  
	 */
	load: function(options) {
		this.store.load(options);
	},
	/**  
	 *调用store的loadData方法  
	 */
	loadData: function(data, append) {
		this.store.loadData(data, append);
	},
	  findRecord : function(prop, value){
		var record;
		if(this.store)
			record= this.callParent(arguments);
		return record;
	  }
})

//#region Div
Ext.define('vmd.comp.Div', {
	extend: 'Ext.Container',
	xtype: 'vmd.div',
	alternateClassName: 'vmd.comp.div',
	border: true,
	initComponent: function() {
		this.callParent();

	},
	onRender: function(ct) {
		this.callParent(arguments);
		if(this.backgroundImage && !this.disableImage) {
			if(this.backgroundImage.indexOf('icon-') == -1) {
				if(this.backgroundImage.indexOf('http://') ==-1) this.backgroundImage =  this.backgroundImage;
				this.backgroundImage = this.backgroundImage.format({ vmduxpath: vmd.virtualPath });
				var _url = 'url(' + this.backgroundImage + ')';
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
		//注册事件
		this.mon(this.el, 'click', function(e) {
			this.fireEvent('click', this, e);
		}, this)
	},
	afterRender: function() {
		this.el.addClass('vmd-div');
		this.border && this.el.addClass('vmd-div-border');
		this.callParent(arguments);
	}

})
//#endregion

//#region Img
Ext.define('vmd.comp.Img', {
	extend: Ext.BoxComponent,
	alias: ['widget.image'],
	xtype: 'vmd.img',
	autoEl: 'img',

	baseCls: 'vmd-img',

	src: '',

	alt: '',

	title: '',

	imgCls: '',

	ariaRole: 'img',

	initComponent: function() {

		this.callParent();

	},

	initImgEl: function() {
		var me = this,
			autoEl = me.autoEl,
			config,
			img;
		config = {
			tag: autoEl,
			cls: me.baseCls || me.cls
		};
		// It is sometimes helpful (like in a panel header icon) to have the img wrapped
		// by a div. If our autoEl is not 'img' then we just add an img child to the el.
		if(autoEl === 'img' || (Ext.isObject(autoEl) && autoEl.tag === 'img')) {
			img = config;
		} else {
			config.cn = [img = {
				tag: 'img',
				role: me.ariaRole,
				id: me.id + '-img'
			}];
		}

		if(img) {
			if(me.imgCls) {
				img.cls = (img.cls ? img.cls + ' ' : '') + me.imgCls;
			}

			img.src = me.src || Ext.BLANK_IMAGE_URL;
			img.src = img.src.format({ vmduxpath: vmd.virtualPath });
			if(me.width) img.width = me.width;
			if(me.height) img.height = me.height;

		}

		if(me.alt) {
			(img || config).alt = me.alt;
		}
		if(me.title) {
			(img || config).title = me.title;
		}
		me.autoEl = config;
	},

	onRender: function() {

		this.initImgEl();
		if(this.src && this.src.indexOf('icon-') == 0) {
			var fontSize = Math.max(this.width, this.height);
			// this.width = this.height = fontSize;
			this.autoEl = {
				tag: 'div',
				style: {
					'font-size': +this.height + 'px'
				},
				cls: "font " + this.src
			}
			var div = document.createElement('div');
			Ext.DomHelper.overwrite(div, this.autoEl);
			this.el = div.firstChild;

		}

		var me = this,
			autoEl = me.autoEl,
			el;

		me.callParent(arguments);

		el = me.el;

		if(autoEl === 'img' || (Ext.isObject(autoEl) && autoEl.tag === 'img')) {
			me.imgEl = el;
		} else {
			me.imgEl = Ext.get(me.id + '-img');
		}

		me.imgEl && me.imgEl.on('click', function(e) {
			me.fireEvent('click', me, e)
		})
	},

	onDestroy: function() {
		Ext.destroy(this.imgEl);
		this.imgEl = null;
		this.callParent();
	},
	setSrc: function(src) {
		var me = this,
			imgEl = me.imgEl;

		me.src = src;

		if(imgEl) {
			imgEl.dom.src = src || Ext.BLANK_IMAGE_URL;
		}
	}
});
//#endregion

Ext.define("vmd.comp.TreeEx", {
	extend: "Ext.tree.TreePanel",
	xtype: 'vmd.treeex',
	width: 245,
	height: 400,
	cls: "vmd-tree",
	initComponent: function() {
		this.callParent()
		//定义store属性
		this.store = Ext.StoreMgr.lookup(this.store);
		//设置是否启用三角作为展开图标
		this.useArrows = true;
		//设置树的线是否显示
		this.lines = false;
		//关闭动画 默认true
		this.animate = false;
		this.autoScroll = true;
		//设置根节点是够隐藏
		this.rootVisible = this.hideRoot ? false : true;
		this.enableDD = this.nodedraggable ? true : false;
		this.nodeIdList=[];
	},
	onRender: function(ct, position) {
		this.callParent(arguments);
		var rootNode = new Ext.tree.TreeNode({
			id: this.rootValue ? this.rootValue : "root",
			text: this.rootText ? this.rootText : "根节点",
			icon: this.rootImg,
			iconCls: this.rootImg,
			height: 50,
			cls: "vmd-tree-node",
			checked: this.checkBox ? false : null,
			draggable: this.nodedraggable ? true : false
		});

		if(this.loadType == "分级加载") {
			var childnode1 = new Ext.tree.TreeNode({
				text: "",
				id: (this.rootValue ? this.rootValue : "root") + "_temp",
				leaf: false,
				cls: "vmd-tree-node",
				icon: this.leafImg ? this.leafImg : null,
				checked: this.checkBox ? false : null,
				draggable: this.nodedraggable ? true : false
			});
			rootNode.appendChild(childnode1);
			childnode1.ui.hide();
			childnode1.hidden=true;
		}
		this.setRootNode(rootNode);
		//		//注册事件
		this.mon(this, {
			scope: this,
			click: this.onNodeClick,
			beforecollapsenode: this.onBeforeNodeCollapse,
			beforeexpandnode: this.onBeforeNodeExpand,
			checkchange: this.onCheckChange,
			collapsenode: this.onAfterNodeCollapse,
			expandnode: this.onAfterNodeExpand,
			contextmenu: this.onContextmenu,
			dblclick: this.onDoubleClick,
			beforemovenode: this.onbeforemovenode,
			movenode: this.onmovenode,
			beforenodedrop: this.onbeforenodedrop,
			nodedrop: this.onnodedrop,
			movenode: this.onmovenode
		});
		window[this.id] = this;
		// 创建一个树形过滤器
		this.filter = new Ext.tree.TreeFilter(this, {
			clearBlank: true, // 如果输入过滤条件为空，则执行clear()函数。
			autoClear: true // 每次执行过滤前，自动执行clear()函数，否则会从上次过滤的结果上执行查询。
		});
		this.iddenPkgs = []; // 保存没有过滤掉的节点
	},
	afterRender: function(ct) {		
		var me=this;
		this.callParent(arguments);
		//绑定store
		if(this.loadType == "全部加载") {
			if(this.store) {
				this.bindStore(this.store, true);
			}
		}
		if(this.loadType == "分级加载"&& this.hideRoot) {//如果是分级加载，且根节点隐藏，则默认展开第一级		
			if(this.store) {
				this.onAfterNodeExpand(this.root)
			}
		}
		 this.body.on('contextmenu', function(e) {
		 if(this.getSelNode()){
			if(Ext.get(e.target).dom==this.getSelNode().getUI().elNode) 
				return
			}
		  var isNode=Ext.get(e.target).parent(".vmd-tree-node")
		  if(!isNode){
				var ret=this.fireEvent('beforeBodyShowMenu', this, e);
				if(ret){
					
					this.fireEvent('afterBodyShowMenu', this, e)
				}				
		  }       
        },this)
	},
	bindStore: function(store, initial) {
		if(!initial && this.store) {
			if(store !== this.store && this.store.autoDestroy) {
				this.store.destroy();
			} else {
				this.store.un("beforeload", this.onBeforeLoad, this);
				this.store.un("datachanged", this.onDataChanged, this);
				this.store.un("add", this.onAdd, this);
				this.store.un("remove", this.onRemove, this);
				this.store.un("update", this.onUpdate, this);
				this.store.un("clear", this.refresh, this);
			}
			if(!store) {
				this.store = null;
			}
		}
		if(store) {
			store = Ext.StoreMgr.lookup(store);
			store.on({
				scope: this,
				beforeload: this.onBeforeLoad,
				datachanged: this.onDataChanged,
				add: this.onAdd,
				remove: this.onRemove,
				update: this.onUpdate,
				clear: this.refresh //store.removeAll清空所有数据调用此接口
			});
		}
		this.store = store;
		if(store) {
			this.refresh();
		}
	},
	CheckImgExists: function(imgurl) {
		var ImgObj = new Image(); //判断图片是否存在  
		ImgObj.src = imgurl;
		//没有图片，则返回-1  
		if(ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
			return true;
		} else {
			return false;
		}
	},
	//////////////////////////////////////////////////////
	//树的事件
	//////////////////////////////////////////////////////
	//借点点击时事件
	onNodeClick: function(node, e) {
		this.fireEvent('nodeClick', this, node, e)
	},
	//借点收缩前事件    Node node, Boolean deep, Boolean anim 
	onBeforeNodeCollapse: function(node, deep, anim) {
		this.fireEvent('beforeNodeCollapse', this, node, deep, anim)
	},
	//借点展开前事件Node node, Boolean deep, Boolean anim 
	onBeforeNodeExpand: function(node, deep, anim) {
			this.fireEvent('beforeNodeExpand', this, node, deep, anim)
	},
	//-------节点拖动的事件处理--------------
	onbeforemovenode: function(Tree ,  node,  oldParent,  newParent,  index) {
		this.fireEvent('beforeMove', this, Tree ,  node,  oldParent,  newParent,  index)
	},
	//借点展开前事件Node node, Boolean deep, Boolean anim 
	onbeforenodedrop: function(dropEvent ) {
		var resu=this.fireEvent('beforeDrop',this, dropEvent)		
		if(typeof(resu)==="boolean")
			return resu
		return true
	}, 
	onnodedrop: function(dropEvent) {
		this.fireEvent('afterDrop', this, dropEvent)
	}, //借点展开前事件Node node, Boolean deep, Boolean anim 
	onnodedragover: function(dragOverEvent) {
		var resu=this.fireEvent('dragOver', this, dragOverEvent)
		if(typeof(resu)==="boolean")
			return resu
		return true
	},onmovenode: function(e) {},
	//-------------------
	//节点复选框改变事件  Node node, Boolean checked 
	onCheckChange: function(node, checked) {
		if(this.single) {
			var checkedNodes = this.getChecked();
			for(var i = 0; i < checkedNodes.length; i++) {
				var n = checkedNodes[i];
				if(node.id != n.id) {
					n.ui.checkbox.checked = false;
					n.attributes.checked = false;
				}
			}
		} else if(this.cascading && node)
			this._setCascading(node, checked);
		this._setStoreCheck(node.id, checked);
		this.fireEvent('checkChanged', this, node, checked)
	},
	//节点收缩后事件  Node node 
	onAfterNodeCollapse: function(node) {
		this.fireEvent('afterNodeCollapse', this, node)
	},
	//节点展开后事件  Node node 
	onAfterNodeExpand: function(node) {		
		if(this.loadType == "分级加载") {
			var me = this;
			if(this.queryVar)
				eval(this.queryVar || "").setValue(node.id)
			if(node.isLoader) {} else {
				if(!this.valueField || !this.textField || !this.parentField || !this.store || !this.rootValue) {
					Ext.Msg.alert('警告', "树组件属性未设置！");
					return
				}
				this.store.loadPageData(function() {
					me.bindNodeChild(node)
					node.isLoader = true;					
					me.fireEvent('afterNodeExpand', me, node)
				});
			}
		}
		else
			this.fireEvent('afterNodeExpand', this, node)
	},
	//节点双击事件  Node node ,Ext.EventObject e
	onDoubleClick: function(node, e) {
		this.fireEvent('nodeDblClick', this, node, e)
	},
	onContextmenu: function(node, e) {
		node.select();
		this.fireEvent('beforeShowMenu', this, node, e)
		if(this.contentMenu) {
			var rightMenu = Ext.getCmp(this.contentMenu);
			if(rightMenu)
				rightMenu.showAt(e.xy)
		}
		this.fireEvent('afterShowMenu', this, node, e)
	},
	///////////////////////////////////////////////////////////////////////////
	//数据集的事件监听
	/////////////////////////////////////////////////////////////////////////////
	//private
	onBeforeLoad: function() {
		//数据加载前 一般用于放置进度条
	},
	//private store数据发生变化调用该接口
	onDataChanged: function() {
		this.refresh.apply(this, arguments);
	},
	// private 更新记录调用此接口
	onUpdate: function(ds, record) {
		if(record) {
			var recordJson = record.data;
			var unode = this.getNodeById(recordJson[this.textField]);
			if(unode)
				unode.setText(recordJson[this.textField])
		}
	},
	// private 添加记录调用该接口
	onAdd: function(ds, records, index) {
		if(records.length > 0) {
			for(var index = 0; index < records.length; index++) {
				var recordJson = records[index].data;
				var anode = this.getNodeById(recordJson[this.valueField]);
				if(!anode)
					this.addNode(recordJson[this.parentField], recordJson[this.valueField], recordJson[this.textField], false, false)
			}
		}
	},
	// private 删除数据调用该接口
	onRemove: function(ds, record, index) {
		if(record) {
			var recordJson = record.data;
			var rnode = this.getNodeById(recordJson[this.textField]);
			if(rnode)
				this.removeNodeById(recordJson[this.valueField], false)
		}
	},
	refresh: function() {
		this.nodeIdList=[]
		if(this.loadType == "全部加载") {
			this.loadTreeNode();
		} else this.bindNodeChild(this.getRootNode())

	},
	loadTreeNode: function() {
		var rootNode = new Ext.tree.TreeNode({
			id: this.rootValue ? this.rootValue : "root",
			text: this.rootText ? this.rootText : "根节点",
			cls: "vmd-tree-node",
			checked: this.checkBox ? false : null,
			draggable: this.nodedraggable ? true : false
		});
		if(this.store.data.items.length > 0) {
			if(!this.valueField || !this.textField || !this.parentField || !this.store || !this.rootValue) {
				Ext.Msg.alert('警告', "树组件属性未设置！");
				return;
			}
			this._loadTreeNodes(rootNode,this.store.data.items,this.valueField,this.parentField,this.textField,rootNode.id)
		}
		rootNode.setIcon(this.rootImg ? this.rootImg : null);
		this.setRootNode(rootNode);
		this.fireEvent('afterBindData', this)
	},
	_loadTreeNodes:function(node,datajson,vField,pField,tField,startid)
	{
		if(datajson.length > 0) {			
			var id = vField,
				text = tField,
				pid = pField,
				i = 0,
				len = datajson.length;
			var me = this;
			function insertChildren(pValue, pnode) {
				//处理叶子节点不允许添加子节点的逻辑
				if(me.nodeMarkFiled&&pnode.nodeDataJson)
				{
					if(me.leafValue)
					{
						if(pnode.nodeDataJson[me.nodeMarkFiled]===me.leafValue)
							return						
					}
					else if(pnode.nodeDataJson[me.nodeMarkFiled]&&pnode.nodeDataJson[me.nodeMarkFiled]!=="0")
					{
						return
					}
				}
				var childList = [];
				var rootcheck = false;
				//根据parentId父节点，查找出子节点  
				for(var index = 0; index < len; index++) {
					var treeNode = datajson[index].data||datajson[index];
					if(treeNode[pid] == pValue) {	
						var customNodeId=treeNode[pid]+"-"+treeNode[id];//允许相同id节点的处理，将节点id设置为父节点id-子节点id
						var cnode = new Ext.tree.TreeNode({
							id: me.allowSameNode?customNodeId:treeNode[id],
							checked: me.checkBox ? (me.checkBoxFiled ? (treeNode[me.checkBoxFiled] == me.checkedValue ? true : false) : false) : null,
							icon: me.leafImg ? me.leafImg : null,
							cls: "vmd-tree-node",
							text: treeNode[text],
							draggable: me.nodedraggable ? true : false
						});
						cnode.nodeDataJson = treeNode;
						cnode.recordId = datajson[index].id||datajson[index][id];
						if(me.nodeIdList.indexOf(cnode.id)>=0)
							continue;
						me.nodeIdList.push(cnode.id);
						pnode.appendChild(cnode);
						insertChildren(treeNode[id], cnode)						
						if(treeNode[me.nodeMarkFiled] && treeNode[me.nodeMarkFiled] == me.folderValue) {
								nImg = me.folderImg ? me.folderImg : null;
								cnode.setIcon(nImg);
								if(cnode.hasChildNodes()) 
									isLeaf = false;
						} else if(treeNode[me.nodeMarkFiled] && treeNode[me.nodeMarkFiled] == me.leafValue) {
								nImg = me.leafImg ? me.leafImg : null;
								cnode.setIcon(nImg);
								if(cnode.hasChildNodes()) 
									isLeaf = false;
						} else{
							if(cnode.hasChildNodes()) {
								cnode.setIcon(me.folderImg ? me.folderImg : null);
							}
						}
						if(cnode.attributes.checked && me.cascading) {
							pnode.attributes.checked = cnode.attributes.checked
						}
					}
				}
			}
			insertChildren(startid, node);
		}		
	},
	bindNodeChild: function(node) {
		var nImg = null;
		var isLeaf = false;
		if(this.store.data.items.length > 0) {
			//node.removeAll()
			var j = 0,
				len = this.store.data.items.length;
			var rootcheck = false;
			for(; j < len; j++) {
				var aVal = this.store.data.items[j].data;
				rootcheck = rootcheck ? rootcheck : (this.checkBox ? (this.checkBoxFiled ? (aVal[this.checkBoxFiled] == this.checkedValue ? true : false) : false) : false);
				if(node.id == aVal[this.parentField]) {
					if(aVal[this.nodeMarkFiled] && aVal[this.nodeMarkFiled] == this.folderValue) {
						nImg = this.folderImg ? this.folderImg : null;
						isLeaf = false;
					} else if(aVal[this.nodeMarkFiled] && aVal[this.nodeMarkFiled] == this.leafValue) {
						nImg = this.leafImg ? this.leafImg : null;
						isLeaf = true;
					} else
						nImg = this.folderImg ? this.folderImg : null;
					var customNodeId=treeNode[this.parentField]+"-"+treeNode[this.valueField];//允许相同id节点的处理，将节点id设置为父节点id-子节点id
					var cnode = new Ext.tree.TreeNode({
						id: this.allowSameNode?customNodeId:[this.valueField],
						checked: this.checkBox ? (this.checkBoxFiled ? (aVal[this.checkBoxFiled] == this.checkedValue ? true : false) : false) : null,
						icon: nImg,
						leaf: isLeaf,
						cls: "vmd-tree-node",
						text: aVal[this.textField],
						draggable: this.nodedraggable ? true : false
					});
						if(me.nodeIdList.indexOf(cnode.id)>=0)
							continue;
						me.nodeIdList.push(cnode.id);
					cnode.nodeDataJson = aVal;
					cnode.recordId = this.store.data.items[j].id;									
					if(this.leafValue&& aVal[this.nodeMarkFiled] === this.leafValue) {} 
					else if(aVal[me.nodeMarkFiled]&&pnode.nodeDataJson[me.nodeMarkFiled]!=="0"){}else {
						var childnode1 = new Ext.tree.TreeNode({
							text: "",
							id: aVal[this.valueField] + "_temp",
							leaf: false,
							cls: "vmd-tree-node",
							icon: this.leafImg ? this.leafImg : null,
							checked: this.checkBox ? false : null,
							draggable: this.nodedraggable ? true : false
						});
						cnode.appendChild(childnode1);
						childnode1.ui.hide();
						childnode1.hidden = true;
					}
						node.appendChild(cnode);
				}
				if(rootcheck && this.cascading) {
					node.attributes.checked = rootcheck;
					me._setStoreCheck(node.id, me.checkedValue || "1");
				}
			}
		}
		var dNode = this.getNodeById(node.id + "_temp");
		if(dNode) {
			dNode.remove()
		}
		if(node != this.root && !node.hasChildNodes()) {
			node.setIcon(this.leafImg ? this.leafImg : null);
		}
	},
	removeNodeById: function(nodeId, changeStore, onlyDelChild, delParentNode, upDateDB, success, error) {
		var me = this;
		var index = me.nodeIdList.indexOf(nodeId);
		if (index > -1) {
			me.nodeIdList.splice(index, 1);
		}
		if(changeStore && this.store)
			changeStore = true;
		var isRoot = false;
		var idList = [];
		var delNode = this.getNodeById(nodeId);
		//获取不到删除的节点 退出
		if(!delNode)
			return;
		if(delNode == this.getRootNode())
			isRoot = true
		if(delParentNode && !isRoot) {
			onlyDelChild = false;
			var getParentListId = function(iNode) {
				var pnod = iNode.parentNode;
				if(pnod && pnod != me.getRootNode()) {
					if(pnod.childNodes.length <= 0) { //如果记录树《=0  则该节点删除》				
						getParentListId(pnod);
						nodeId = pnod.id;
					} else {
						var count = 0;
						for(var j = 0; j < pnod.childNodes.length; j++) {
							if(pnod.childNodes[j].id != iNode.id)
								count++;
						}
						if(count <= 0) {
							getParentListId(pnod);
							nodeId = pnod.id;
						}
					}
				} else {}
			}
			getParentListId(delNode);
			delNode = this.getNodeById(nodeId);
		}
		//获取删除的节点id列表  递归获取
		var getRemoveListId = function(iNode) {
			var index = me.nodeIdList.indexOf(iNode.id);
			if (index > -1) {
				me.nodeIdList.splice(index, 1);
			}
			idList.push(iNode.id);
			if(iNode.childNodes.length > 0) {
				for(var j = 0; j < iNode.childNodes.length; j++) {
					var cNode = iNode.childNodes[j];
					getRemoveListId(cNode)
				}
			}
		}
		getRemoveListId(delNode);
		//删除节点的子节点
		if(onlyDelChild) {
			idList.remove(nodeId); //删除的节点id列表中移除当前节点
		}
		//删除子节点
		//渲染了 则删除当前节点
		if(delNode) {
			if(onlyDelChild)
				delNode.removeAll();
			else {
				delNode.remove();
				this.root.removeChild(delNode);
			}
		}
		//从节点的数据中删除节点
		var findCNode = function(iNode) {
			if(iNode.childNodes.length > 0) {
				for(var j = 0; j < iNode.childNodes.length; j++) {
					if(iNode.childNodes[j].id == nodeId) {
						if(onlyDelChild) {
							iNode.childNodes[j].childNodes = [];
						} else {
							iNode.childNodes.remove(iNode.childNodes[j]);
						}
						return;
					} else findCNode(iNode.childNodes[j])
				}
			}
		}

		var spnode = delNode.parentNode;
		if(delNode) {
			findCNode(delNode);
		}
		//从数据集中删除对应的节点数据
		if(this.store && changeStore) {
			var removeRecords = [];
			for(var index = this.store.data.items.length - 1; index >= 0; index--) {
				var dataJson = this.store.data.items[index].data;
				for(var j = 0; j < idList.length; j++) {
					if(idList[j] == dataJson[this.valueField]) {
						removeRecords.push(this.store.data.items[index])
						break;
					}
				}
			}
			this.store.toDeleteByRecords(removeRecords, upDateDB, success, error);
		}
	},
	getSelNode: function() {
		var selModel = this.getSelectionModel()
		if(selModel&&selModel.selNode) {
			return selModel.selNode;
		} else {
			return null;
		}
	},
	getSelNodeId: function() {		
		var selModel = this.getSelectionModel()
		if(selModel&&selModel.selNode) {
			if(this.allowSameNode&&selModel.selNode.nodeDataJson)
				return selModel.selNode.nodeDataJson[this.valueField];
			else
				return selModel.selNode.id;
		} else {
			return "";
		}
	},
	getChecked: function(attribute, startNode, onlyLeaf) {
		if(onlyLeaf) {
			var allchecked = this.callParent(null, startNode)
			var leafNode = [];
			for(var i = 0; i < allchecked.length; i++) {
				if(allchecked[i].childNodes.length <= 0) {
					if(attribute && allchecked[i][attribute])
						leafNode.push(allchecked[i][attribute])
					else
						leafNode.push(allchecked[i])
				}
			}
			return leafNode;
		} else
			return this.callParent(arguments);
	},
	expandNode: function(nodeId) {
		var expNode = tree.getNodeById(nodeId)
		if(expNode) {
			tree.expandPath(expNode.getPath());
			expNode.select()
		}
	},
	expandDeep:function(deep)
	{ 
		var ExpNode=function(node)
		{
			if(node.getDepth()>=deep)
				return ;
			node.expand();
			if(node.childNodes.length>0)
			{
				for(var i=0;i<node.childNodes.length;i++)
				{
					ExpNode(node.childNodes[i])
				}
			}
		}
		var rootNode=this.getRootNode();
		ExpNode(rootNode)		
	},
	addNode: function(pid, cid, cname, isleaf, changeStore, upDateDB, dataRecord) //父节点、子节点、子节点名称、是否叶子节点,是否修改数据集，是否提交入库
	{
		if(this.nodeIdList.indexOf(cid)>=0)
			return;
		this.nodeIdList.push(cid);
		var parid = pid;
		var successFun;
		var errFun;
		if(typeof(pid) == "object") {
			parid = pid.pid;
			cid = pid.cid;
			cname = pid.cname;
			isleaf = pid.isleaf;
			changeStore = pid.changeStore;
			upDateDB = pid.upDateDB;
			dataRecord = pid.dataRecord;
			successFun = pid.success;
			errFun = pid.error
		}
		if(changeStore && this.store)
			changeStore = true;
		var pNode = this.getNodeById(parid);
		if(pNode) {
			var childnode1 = new Ext.tree.TreeNode({
				text: cname,
				id: cid,
				//leaf: isleaf ? true : false,
				cls: "vmd-tree-node",
				icon: isleaf ? (this.leafImg ? this.leafImg : null) : (this.folderImg ? this.folderImg : null),
				checked: this.checkBox ? false : null,
				draggable: this.nodedraggable ? true : false
			});
			childnode1.nodeDataJson = {};
			if(dataRecord)
				childnode1.nodeDataJson = dataRecord;
			else {
				childnode1.nodeDataJson[this.valueField] = cid;
				childnode1.nodeDataJson[this.textField] = cname;
				childnode1.nodeDataJson[this.parentField] = parid;
			}
			pNode.appendChild(childnode1);
			if(this.store && changeStore) {
				var recordId = this.store.toAdd([dataRecord], upDateDB, successFun, errFun);
			} else {
				if(successFun)
					successFun(childnode1);
			}
		}
	},	
	addTree:function(node,datajson,id,pid,name,startid)
	{
		this._loadTreeNodes(node,datajson,id,pid,name,startid)		
	},
	getNodeById: function(nodeId) {
		//先调用积累的获取节点
		var tNode = this.callParent(arguments);
		var findCNode = function(iNode) {
			if(iNode.childNodes.length > 0) {
				for(var j = 0; j < iNode.childNodes.length; j++) {
					if(iNode.childNodes[j].id == nodeId) {
						tNode = iNode.childNodes[j];
						break;
					} else findCNode(iNode.childNodes[j])
				}
			}
		}
		//获取不到则遍历节点的子来进行查找
		if(!tNode) {
			if(this.getRootNode().id == nodeId) {
				tNode = this.getRootNode();
			} else findCNode(this.getRootNode());
		}
		return tNode;
	},
	//设置节点选中， 不触发事件
	setNodeCheckById: function(nodeId, state, cascading) {
		//获取节点
		var tNode = this.getNodeById(nodeId);
		//获取到直接设置选中
		if(tNode && tNode.rendered) {
			tNode.ui.checkbox.checked = state;
			tNode.attributes.checked = state;
		} else if(tNode && !tNode.rendered) {
			tNode.attributes.checked = state || false;
		}
		if(tNode)
			this._setStoreCheck(tNode.id, state);
		//级联操作
		if(cascading && tNode)
			this._setCascading(tNode, state);
	},
	_setCascading: function(node, state) {
		//向下级联
		var me = this;
		var setChildCheck = function(iNode, state) {
			if(iNode.childNodes.length > 0) {
				for(var j = 0; j < iNode.childNodes.length; j++) {
					var cNode = iNode.childNodes[j];
					if(!cNode.hidden) {
						if(cNode && cNode.rendered) {				
							cNode.ui.checkbox.checked = state
							cNode.attributes.checked = state;
						} else if(cNode && !cNode.rendered) {
							cNode.attributes.checked = state || false;
						}
						setChildCheck(cNode, state)
						me._setStoreCheck(cNode.id, state);
					}
				}
			}
		};
		//向上级联
		var setParentCheck = function(iNode, state) {
			var pn = iNode.parentNode;
			if(pn==me.getRootNode()&& me.hideRoot)
			{return;}
			if(!pn || !Ext.isBoolean(iNode.attributes.checked))
				return;
			if(iNode.attributes.checked) { //级联选中
				if(pn==me.getRootNode()&& me.hideRoot)
					return;
				pn.ui.checkbox.checked = true
				pn.attributes.checked = true;
			} else { //级联未选中
				var b = true;
				Ext.each(pn.childNodes, function(n) {
					if(n.getUI().isChecked())
						return b = false;
				});
				if(b) {
					pn.ui.checkbox.checked = false
					pn.attributes.checked = false;
				}
			}
			setParentCheck(pn, state);
			me._setStoreCheck(pn.id, pn.attributes.checked);
		};
		setChildCheck(node, state);
		setParentCheck(node, state)
	},
	_setParentCheck: function(iNode, state) {
		var pn = iNode.parentNode;
		if(pn==me.getRootNode()&& me.hideRoot)
			{return;}
		if(!pn || !Ext.isBoolean(iNode.attributes.checked))
			return;
		if(iNode.attributes.checked) { //级联选中
			pn.ui.checkbox.checked = true
			pn.attributes.checked = true;
		} else { //级联未选中
			var b = true;
			Ext.each(pn.childNodes, function(n) {
				if(n.getUI().isChecked())
					return b = false;
			});
			if(b) {
				pn.ui.checkbox.checked = false
				pn.attributes.checked = false;
			}
		}
		this._setParentCheck(pn, state);
		me._setStoreCheck(pn.id, pn.attributes.checked);
	},
	//复制节点   将节点复制为对象  其中信息不变（节点的基础信息） 
	nodeCopy: function(node) {
		if(!node)
			return null;
		//创建节点副本
		var pnode = new Ext.tree.TreeNode({
			id: node.attributes.id,
			checked: node.attributes.checked,
			icon: node.attributes.icon,
			leaf: node.leaf,
			cls: "vmd-tree-node",
			text: node.attributes.text,
			draggable: node.draggable ? true : false
		});
		//创建节点的数据
		pnode.nodeDataJson = node.nodeDataJson;
		//创建节点副本的子节点   递归
		var creatCopyNode = function(iNode, pnode) {
			if(iNode.childNodes.length > 0) {
				for(var j = 0; j < iNode.childNodes.length; j++) {
					var cnode = new Ext.tree.TreeNode({
						id: iNode.childNodes[j].attributes.id,
						checked: iNode.childNodes[j].attributes.checked,
						icon: iNode.childNodes[j].attributes.icon,
						leaf: iNode.childNodes[j].leaf,
						cls: "vmd-tree-node",
						text: iNode.childNodes[j].attributes.text,
						draggable: iNode.childNodes[j].draggable ? true : false
					});
					cnode.nodeDataJson = iNode.childNodes[j].nodeDataJson;
					if(iNode.childNodes[j].childNodes.length > 0) {
						creatCopyNode(iNode.childNodes[j], cnode)
					}
					pnode.appendChild(cnode)
				}
			}
		}
		creatCopyNode(node, pnode);
		return pnode;
	},
	nodeCopyTo: function(node, tree, nodeId, copyParentNode, changeStore) {
		var me = this;
		if(changeStore && tree.store)
			changeStore = true;
		if(!node || !tree || !nodeId)
			return null;
		//目标节点
		var trgNode = tree.getNodeById(nodeId)
		var checkBox = tree.checkBox ? tree.checkBox : null;
		//数据转换
		var addDataArray = [];
		//设置复制的节点的图标，以目标树的图标为准
		var icon = tree.leafImg ? tree.leafImg : null;
		if(node.childNodes.length > 0) {
			icon = tree.folderImg ? tree.folderImg : null;
		}
		//目标表是否启用checkbox
		//创建节点
		var pnode = new Ext.tree.TreeNode({
			id: node.attributes.id,
			checked: tree.checkbox ? tree.checkbox : null,
			icon: icon,
			leaf: node.leaf,
			cls: "vmd-tree-node",
			text: node.attributes.text,
			draggable: node.draggable ? true : false
		});

		//地鬼，实现节点的递归创建（复制）
		var creatCopyNode = function(iNode, pnode) {
			if(iNode.childNodes.length > 0) {
				for(var j = 0; j < iNode.childNodes.length; j++) {
					//从目标树获取图标信息
					var cicon = tree.leafImg ? tree.leafImg : null;
					if(iNode.childNodes[j].childNodes.length > 0) {
						cicon = tree.folderImg ? tree.folderImg : null;
					}
					//递归创建节点
					var cnode = new Ext.tree.TreeNode({
						id: iNode.childNodes[j].attributes.id,
						checked: checkBox ? iNode.childNodes[j].attributes.checked : null,
						icon: cicon,
						leaf: iNode.childNodes[j].leaf,
						cls: "vmd-tree-node",
						text: iNode.childNodes[j].attributes.text,
						draggable: iNode.childNodes[j].draggable ? true : false
					});
					//设置节点的数据
					if(changeStore) {
						cnode.nodeDataJson = me._changeData(iNode.childNodes[j], tree);
						if(cnode.nodeDataJson) {
							if(cnode.nodeDataJson[tree.parentField] == pnode.id)
								cnode.nodeDataJson[tree.parentField] = tree.getRootNode().id;
							addDataArray.push(cnode.nodeDataJson)
						}
					}
					//递归
					if(iNode.childNodes[j].childNodes.length > 0) {
						creatCopyNode(iNode.childNodes[j], cnode)
					}
					pnode.appendChild(cnode)
				}
			}
		}
		//创建复制节点
		if(node == this.getRootNode()) {
			if(trgNode) {
				creatCopyNode(node, trgNode);
			}
		} else {
			creatCopyNode(node, pnode);
			pnode.nodeDataJson = this._changeData(node, tree);
			if(!trgNode) //处理父节点
			{
				if(copyParentNode) {
					this._getParentNode(node, pnode, tree, addDataArray, changeStore)
				} else {
					tree.getRootNode().appendChild(pnode);
					if(changeStore) {
						pnode.nodeDataJson[this.parentField] = tree.getRootNode().id;
						addDataArray.push(node.nodeDataJson);
					}
				}
			} else {
				//添加到目标节点
				trgNode.appendChild(pnode);
				if(changeStore) {
					addDataArray.push(node.nodeDataJson)
				}
			}
		}
		if(tree.store && changeStore) {
			tree.store.loadData(addDataArray, true);
		}
	},
	//创建数据副本，将当前节点的数据按照目标树的字段进行对应赋值
	_changeData: function(node, trgTree) {
		//将选中的节点数据转换为目标树的数据格式，
		if(trgTree.store && trgTree.store.FileInfo) {
			var oldDataJson = node.nodeDataJson;
			var newDataJson = {};
			var storeFile = trgTree.store.FileInfo;
			for(var p in storeFile) {
				if(typeof(storeFile[p]) == "function") {} else {
					newDataJson[p] = oldDataJson[p] || "";
				}
			}
			newDataJson[trgTree.valueField] = node.id;
			newDataJson[trgTree.textField] = node.text;
			newDataJson[trgTree.parentField] = node.parentNode.id;
			return newDataJson;
		}
	},
	//获取父节点，获取节点的父节点，同步到目标书上，内部私有方法。
	_getParentNode: function(node, cnode, trgtree, addDataArray, changeStore) {
		//设置目标树的图标  向上找 必为分类图标
		var icon = trgtree.folderImg ? trgtree.folderImg : null;
		//设置目标树的checkbox是否启用
		var checkBox = trgtree.checkBox ? trgtree.checkBox : null;
		//判断当前复制的节点的父节点是否为根节点
		if(node.parentNode && node.parentNode.id != this.getRootNode().id) {
			//不是根节点，则创建父节点，
			var pnode = new Ext.tree.TreeNode({
				id: node.parentNode.id,
				checked: checkBox ? node.parentNode.attributes.checked : null,
				icon: icon,
				leaf: node.parentNode.leaf,
				cls: "vmd-tree-node",
				text: node.parentNode.attributes.text,
				draggable: node.parentNode.draggable ? true : false
			});
			if(changeStore) {
				cnode.nodeDataJson[this.parentField] = node.parentNode.id; //修改选中节点的数据信息
				addDataArray.push(cnode.nodeDataJson); //将数据信息添加到数组  修改数据集用到
			}
			//父节点的父节点是够为根或 id在目标表中存在
			if(node.parentNode.parentNode) {
				if(changeStore)
					pnode.nodeDataJson = this._changeData(node.parentNode, trgtree); //复制父节点的数据信息
				pnode.appendChild(cnode); //将节点添加到父节点下
				//如果存在与父节点相同的节点，则添加到该节点下
				var tnode = trgtree.getNodeById(node.parentNode.parentNode.id);
				if(tnode) {
					if(changeStore)
						addDataArray.push(pnode.nodeDataJson);
					tnode.appendChild(pnode);
				} else {
					this._getParentNode(node.parentNode, pnode, trgtree, addDataArray, changeStore)
				}
			} else {
				if(changeStore) {
					cnode.nodeDataJson[this.parentField] = trgtree.getRootNode().id;
					addDataArray.push(cnode.nodeDataJson);
				}
				trgtree.getRootNode().appendChild(cnode);
			}
		} else { //判断当前复制的节点的父节点是根节点，则将该节点直接添加到目标树的根节点上，
			if(changeStore) {
				cnode.nodeDataJson[this.parentField] = trgtree.getRootNode().id;
				addDataArray.push(cnode.nodeDataJson);
			}
			trgtree.getRootNode().appendChild(cnode);
		}
	},
	_setStoreCheck: function(nodeId, state) {
		if(this.store && this.checkBox && this.checkBoxFiled) {
			this.store.setValue(this.valueField, nodeId, this.checkBoxFiled, state ? (this.checkedValue ? this.checkedValue : "1") : "0")
		}
	},
	filterBy: function(txt) {		
		var me = this;
		var allNpath=[]
		// 过滤条件
		var text = txt;		
		// 未输入，则执行clear()，显示所有节点。
		if(!vmd.trim(text)) {
			me.filter.clear();
			me.getRootNode().expand();
			var children = me.getRootNode().childNodes;
			for(var i = 0; i < children.length; i++) {
				var child = children[i];
				child.collapse();
			}
			return;
		}
		// 展开所有节点（未被过滤掉的节点）
		me.expandAll();
		// 根据输入构建正则表达式，过滤不区分大小写。
		var re = new RegExp(Ext.escapeRe(text), 'i');
		// 使用filterBy()函数过滤
		var count = 0;
		me.filter.filterBy(function(n) {
			var nvisible =  re.test(n.text)
			if(nvisible )
			{
				var npath=n.getPath();
				var npaths=npath.split('/');
				var spath=""
				for(var i=0;i<npaths.length;i++)
				{	
					if(i==0)
						spath+=npaths[i];
					else
						spath+='/'+npaths[i];	
					if(allNpath.indexOf(spath)<0)					
						allNpath.push(spath)}
				}
				return true
		});
		me.filter.filterBy(function(n) {
			var npath=n.getPath();
			if(allNpath.indexOf(npath)>=0)
			{
				count++;
				return true
			}				
			else 
				return false;			
		});
		if(count > 0)
			return true
		else
			return false		
	}
})

//vmd.menu
Ext.define('vmd.cmp.Menu', {
	extend: 'Ext.menu.Menu',
	xtype: 'vmd.menu',
	alternateClassName: ['vmd.comp.Menu'],
	cls: 'vmd-menu',
	onHide: function() {
		//this.callParent();
		Ext.menu.Menu.superclass.onHide.call(this);
		this.deactivateActive();
		//mafei 20180503
		if(this.el) {
			this.el.hide();
		}
		var pm = this.parentMenu;
		if(this.deepHide === true && pm) {
			if(pm.floating) {
				pm.hide(true);
			} else {
				pm.deactivateActive();
			}
		}
	},

	initComponent: function() {
		var me = this;
		var getXtype = function(xtype) {
			if(xtype) return xtype = xtype.replace('xds', '');
			return null
		}
		if(this.items) {
			var items = {
				items: []
			};
			var pushItems = function(_item, pItem) {

				var obj = {
					id: _item.viewerNode && _item.viewerNode.id || _item.id,
					text: _item.text || '',
					xtype: getXtype(_item.xtype) || 'menuitem'
				};
				Ext.applyIf(obj, _item);
				if(!_item.items) {

					pItem.items.push(obj);

				} else {
					if(_item.text != undefined) {
						//obj.menu = [];
						//pItem.push(obj)
						//pItem = obj.menu

						//构造子菜单对象
						var id;
						if(_item.items && _item.items.length > 0) {
							id = _item.items[0].id;
						}
						obj.menu = {
							items: []
						};
						if(id) obj.menu.id = id;
						pItem.items.push(obj);
						pItem = obj.menu;

					} else {

						if(_item.listeners) {
							pItem.listeners = _item.listeners
						}
					}

					Ext.each(_item.items, function(item) {
						pushItems(item, pItem)

					})

				}
			}

			pushItems(this, items)
			this.items = items.items;

		}
		//this.items = [{
		//    xtype: 'menuitem', text: 'aa', menu: [{xtype:'menuitem',text:'aaa'}]
		//}
		//]
		this.callParent(arguments);
	},
	onRender: function() {
		this.callParent(arguments);
		this.el.addClass(this.cls);

	},
	showAt: function(xy, parentMenu) {
		this.callParent(arguments);
		//需要特殊处理对于宽度小于160px
		var shadow = this.el.shadow;
		if(this.width < 160 && shadow) {
			var shadowDom = shadow.el && shadow.el.dom;
			//同步阴影
			vmd(shadowDom).css("width", this.width);
		}
		vmd(this.el.dom).css('width', "").css('min-width', this.width);
		if(this.el.visible && this.el.getStyle('visibility') == 'hidden') {
			this.el.setStyle('visibility', 'visible');
		}
	}
})


//#region subview（内联div弹窗）
Ext.define('vmd.comp.SubView', {
    extend: 'Ext.Panel',
    xtype: 'vmd.subview',
    cmpList:[],
    initComponent: function () {
        var me = this;
        this.createWindow();
        this.callParent(arguments);
    },
    createWindow: function () {
        var me = this;
        if (!this.view) return;
        var closeAction = this.view.closeAction;
        //close模式每次关闭清楚dom结构，hide模式是改变display的显示和隐藏
        if (closeAction == 'close') {
            if (this.win) this.win.destroy();
            this.win = new vmd.window(this.getWinConfig());
            this.createDefinedCmp();
            

        } else {

            if (!this.win) {
                this.win = new vmd.window(this.getWinConfig());
                this.createDefinedCmp();
            }
        }

        this.win.on('hide', function () {
            if (me.isModule) {
                //清空对象
                /*Ext.each(me.cmpList, function (id) {
                    delete window[id];
                })*/
                //增加回调函数
				if(me.view.listeners&&me.view.listeners['hide'])
				    me.view.listeners['hide'].call(me.win.items.items[0]);
                //me.fireEvent('hide',me.win);
            }

        })
    },
    createDefinedCmp:function(){
        if (this.isModule) {
            //rootscope 是解析后的模块作用域
            vmd.core.moduleInit(this.win.items, this.rootScope,null,this);
        } else {
            //复合组件构造(暂不处理)
        }
         
    },
    show: function () {
        var me = this;
        if (this.win.items.length == 0) this.createWindow();
        this.win.show();
       
    },
    hide:function(){
        //关闭的时候清理内存
        this.win.hide();
    },
    close: function () {
        //关闭的时候清理内存
        this.win.close();
    },
    _getFixedHeight:function(){
        var view = this.view;
        var height = view.fixedHeight || view.height;
        return height+40;
    },
    _getFixedWidth: function () {
        var view = this.view;

        return view.fixedWidth || view.width;
    },
    getWinConfig: function () {
        var me = this;
        var item = me.view;
        var getoffset = function (offset) {
            var arr = [], returnArr = [];

            if (offset) {
                arr = offset.split(',') || offset.split(' ');
                if (arr.length >= 2) {
                    returnArr = [Number(arr[0])||50, Number(arr[1])||50];
                } else{
                    returnArr = [Number(arr[0])||50, Number(arr[0])||50];
                }
            } else returnArr = [0,0];
            return returnArr;
               
        }
        var config = {
            closeAction: item.closeAction,
            layout: 'fit',
            width: me._getFixedWidth(),
            height: me._getFixedHeight(),
            title: item.title,
            modal: item.modal,
            auto: !item.autoAdjust? false : true,
            offset: getoffset(item.offset),
            closable: item.closable,
            draggable: item.draggable,
            maximizable: item.maximizable,
            resizable: item.resizable,
            items: [me.view]
        }

        //当固定高度和宽度超过屏幕可视高度自动处理
        var bodyH = Ext.getBody().getHeight(), bodyW = Ext.getBody().getWidth(),
            winH = config.height, winW = config.width;
		//兼容自适应问题
		//if(winH < bodyH - 40 || winW < bodyW) config.auto=false;
        if (winH > bodyH - 40) config.height = bodyH ;
        if (winW > bodyW) config.width = bodyW;
        if (winW > bodyW || (winH > bodyH - 40)) config.autoScroll = true;
        if (winW > bodyW && (winH > bodyH - 40)) this.isMaxMode = true;


        return config;
    }
  

})
//#end region

//#region subview（独立窗口）

Ext.define("vmd.comp.SubWindow", {
    xtype: 'vmd.subwindow',
    extend: 'Ext.Panel',
    initComponent: function () {
        this.callParent(arguments);
    },
    createWindow: function () {
        
        var me = this;
        if (!this.view) return;
        var closeAction = this.view.closeAction;
        //只支持close模式
        if (closeAction == 'close') {
            if (this.win) this.win.destroy();
            this.win = new vmd.window(this.getWinConfig());;
            window[this.view.id] = this.win;

        }
        this.win.on('hide', function () {
            me.fireEvent('hide', me.win);
        })
    },
    show: function (params) {
        var me = this;
        if (!this.params) this.params = {};
        Ext.apply(this.params, params);
        this.createWindow();
        this.win.show();
    },
    getReleasePath: function () {
        var path = this.view.path;
        
        var moduleId = this.view.moduleId;
        path = path.substr(0, path.lastIndexOf('/') + 1);
        path = path + moduleId + ".html";

        path = this.view.url || path;
        if (!vmd.previewMode) {
            path = path.replace(/^\/?modules/, "/release");
        }
        
       
        var _pref = '';
        //test
        if (window.location.href.indexOf('localhost') != -1) {
            _pref = vmdSettings.resourcePath.substr(0, vmdSettings.resourcePath.lastIndexOf('/modules') + 1);
        }
        path = _pref + path;
        return path;
    },
    getWinConfig: function () {
        var me = this;
        var item = me.view;
        var getoffset = function (offset) {
            var arr = [], returnArr = [];

            if (offset) {
                arr = offset.split(',') || offset.split(' ');
                if (arr.length >= 2) {
                    returnArr = [Number(arr[0]) || 50, Number(arr[1]) || 50];
                } else {
                    returnArr = [Number(arr[0]) || 50, Number(arr[0]) || 50];
                }
            } else returnArr = [0, 0];
            return returnArr;

        }
       
        var config = {
            closeAction: item.closeAction,
            width: item.width,
            height: item.height + 40,
            title: item.title,
            modal: item.modal,
            auto: !item.autoAdjust ? false : true,
            offset: getoffset(item.offset),
            closable: item.closable,
            draggable: item.draggable,
            maximizable: item.maximizable,
            resizable: item.resizable,
            enableLoading: item.url ? false : true,
            params:me.params
        }
        
        config.url = this.getReleasePath();
       
        //当固定高度和宽度超过屏幕可视高度自动处理
        var bodyH = Ext.getBody().getHeight(), bodyW = Ext.getBody().getWidth(),
            winH = config.height, winW = config.width;
        if (winH > bodyH - 40) config.height = bodyH;
        if (winW > bodyW) config.width = bodyW;
        if (winW > bodyW && (winH > bodyH - 40)) this.isMaxMode = true;

        return config;
    }
})

//#end region

Ext.define('vmd.InputNumber', {
    extend: 'Ext.BoxComponent',
    xtyle: 'vmd.inputnumber',
    baseChars: "0123456789",

    initComponent: function () {

        //this.addEvents('okcallback')
        this.callParent();
    },
    getTemplateArgs: function () {
        return {
            id: this.id,
            value: this.value,
            maxLength: this.maxLength || 10,
            unit: this.unit

        };
    },
    onRender: function (container, position) {

        if (!this.template) {
            this.template = new Ext.XTemplate(
                '<div class="vmd-input-number">' +
                '<input type="text" class="input-value" value="{value}" maxlength="{maxLength}">' +
                '<div class="input-btns-wrap">' +
                '<i class="unit">{unit}</i>' +
                '<span class="input-btn add"></span>' +
                '<span class="input-btn minus"></span></div></div>'
         )
        }
        var args = this.getTemplateArgs();
        this.el = position ? this.template.insertBefore(position, args, true) : this.template.append(container, args, true);
        this.addEl = this.el.child('.add');
        this.minusEl = this.el.child('.minus');
        this.inputEl = this.el.child('.input-value')


        this.mon(this.addEl, 'click', this.addNumber, this);
        this.mon(this.minusEl, 'click', this.minusNumber, this);
        this.mon(this.inputEl, {
            focus: this._inputfoucs,
            blur: this._inputblur,
            keypress: this.filterKeys,
            scope: this
        });



        this.init();
    },
    init: function () {
        this.disabledAdd();
        this.disabledMinus();
    },
    filterKeys: function (e) {
        var allowed = this.baseChars + '';
        this.maskRe = new RegExp('[' + allowed + ']');
        if (e.ctrlKey) {
            return;
        }
        var k = e.getKey();
        if (Ext.isGecko && (e.isNavKeyPress() || k == e.BACKSPACE || (k == e.DELETE && e.button == -1))) {
            return;
        }
        var cc = String.fromCharCode(e.getCharCode());
        if (!Ext.isGecko && e.isSpecialKey() && !cc) {
            return;
        }
        if (!this.maskRe.test(cc)) {
            e.stopEvent();
        }
    },
    _inputfoucs: function () {
        this._addOk();
        this.fireEvent('focus', this);
    },
    _inputblur: function () {
        var val = this.getValue();
        if (this.maxValue && val >= this.maxValue) {
            val = this.maxValue;
        }
        if (this.minValue && val <= this.minValue) {
            val = this.minValue;
        }
        this.setValue(val);

        this.disabledAdd();
        this.disabledMinus();

        this.fireEvent('blur', this);
    },
    disabledAdd: function () {
        var val = this.getValue();
        if (this.maxValue && val >= this.maxValue) {
            this.addEl.addClass('disabled');
            return true
        } else {
            if (this.addEl.hasClass('disabled')) this.addEl.removeClass('disabled');
        }
        return false
    },
    disabledMinus: function () {
        var val = this.getValue();
        if (this.minValue && val <= this.minValue) {
            this.minusEl.addClass('disabled');
            return true;
        } else {
            if (this.minusEl.hasClass('disabled')) this.minusEl.removeClass('disabled');
        }
        return false
    },
    _showOk: function (e) {

        var t = e.target || e.srcElement;
        if (vmd(t).hasClass('numselected')) {
            this.fireEvent('ok', this, this.getValue())
        }
    },
    _addOk: function () {
        if (this.isShowOk) {
            this.el.addClass('numselected');
            this.el.un('click', this._showOk, this)
            this.mon(this.el, 'click', this._showOk, this);
        }
    },
    addNumber: function () {

        this._addOk();
        var val = this.getValue() || 0;
        var newval = val + 1;
        if (!this.disabledAdd()) this.setValue(newval);
        this.disabledMinus()


    },
    minusNumber: function () {
        var val = this.getValue() || 0;
        var newval = val - 1;
        if (!this.disabledMinus()) this.setValue(newval);
        this.disabledAdd();
    },
    onClick: function (e) {

    },
    disable: function () {
        this.el.addClass('disabled');
    },
    enable: function () {
        this.el.removeClass('disabled');
    },
    getValue: function () {
        return parseInt(this.inputEl.getValue());
    },
    setValue: function (val) {

        this.inputEl.dom.value = isNaN(val) ? '' : val;
    },

    afterRender: function () {
        this.callParent(arguments);

    },
    onDestroy: function () {

    }
})



//#region vmdbutton
Ext.define("vmd.comp.datapre", {
	extend: "vmd.comp.button",
	xtype: "vmd.dataPre",
	hidden: false,
	disabled: false,
	type: 'default',
	clickEvent: 'click',
	handleMouseEvents: true,
	size: '',
	iconAlign: 'left',
	icon: '',
	initComponent: function() {
		this.callParent();
		if(this.dataConfig)
			this.dataConfig=this.dataConfig.replace(/\r\n/g,"\\r\\n")
	},
	onClick: function(e) {	
		var dpObj
		if(this.dateInput)
		{ 
            var dpObj= eval(this.dateInput);
		}
		else
			return 		
		var dataPreinfoStr=this.dataConfig||"{}"
		var dataPreinfoObj= JSON.parse(dataPreinfoStr);		
		var sparamconfigArr=dataPreinfoObj.params||[];
		var sfielsconfigArr=dataPreinfoObj.values||[];		
		var sparamconfigObj={};
		var sfielsconfigObj={};		
		for(var i=0;i<sparamconfigArr.length;i++)
		{sparamconfigObj[sparamconfigArr[i].id]=sparamconfigArr[i].value}	
		for(var i=0;i<sfielsconfigArr.length;i++)
		{sfielsconfigObj[sfielsconfigArr[i].id]=sfielsconfigArr[i].value}
		
		var dataPreinfo={store:this.store,
			query:sparamconfigObj,
			dValue:sfielsconfigObj
		}		
		this.fireEvent('beforeDataPre', this, e);
        dpObj.dataPrepare(dataPreinfo);
		this.fireEvent('afterDataPre', this, e);
	}
})