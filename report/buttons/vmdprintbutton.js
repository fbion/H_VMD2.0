/**
 * Created by Administrator on 2019/4/25.
 */
if (typeof xds != "undefined")
xds.vmdPrintButton = Ext.extend(xds.Component, {
    cid: "vmdPrintButton",
    category: "vmdReport组件",
    defaultName: "&lt;printbutton&gt;",
    text: "printbutton(打印)",
    dtype: "vmd.vmdPrintButton",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.vmdPrintButton",
    xcls: "vmd.comp.vmdPrintButton",
    iconCls: "icon-vmdbutton",
    //控制是否可以拖拽
    isResizable: function (a, b) {
        //a为上下左右的位置方向
        //return a == "Right"
        //		&& !this.getConfigValue("anchor")
        return true;
    },
    naming: "printbutton",
    isContainer: false,
    //是否显示右下角的组件说明
    filmCls: "el-film-nolabel",
    //默认属性设置
    defaultConfig: {
        text: "打印",
        type: "(none)",
        size: "small"

    },
    //属性设置
    configs: [
//        {
//        name: "click",
//        group: "事件",
//        editor: "ace",
//        ctype: "string",
//        params: "e"
//
//    },
        {
            name: "text",
            group: "外观",
            ctype: "string"
        },
        {
            name: "report",
            group: "外观",
            ctype: "string",
            editor: "options",
            edConfig: {
                cid: 'vmdReport'
            }
        },
        {
            name: "cls",
            group: "外观",
            ctype: "string"
        }, {
            name: "iconcls",
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
            name: "size",
            group: "外观",
            ctype: "string",
            editor: "options",
            options: ["(none)", "mini", "small", "large"]
        }, {
            name: "type",
            group: "外观",
            ctype: "string",
            editor: "options",
            options: ["(none)", "primary", "success", "warning", "danger", "info", "text"]
        },
        {
            name: "icon",
            group: "外观",
            ctype: "string",
            editor: "options",
            options: ["(none)", "search", "success", "plus", "picture", "star-off", "close", "loading", "setting", "delete", "edit", "edit-outline"],
            edConfig: {
                editable: true,
                forceSelection: false
            }
        }
        //,
        // {
        //     name: "test",
        //     group: "设计",
        //     ctype: "frame",
        //     edConfig: {
        //         url: '/file.html',
        //         height:50

        //     }
        // }
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
    },
    onFilmDblClick: function (b) {
        //双击值编辑功能
        var a = this.getExtComponent();
        xds.canvas.startEdit(this, a.el, this
            .getConfigObject("text"), 80)
    }

});
if (typeof xds != "undefined") {
    xds.Registry.register(xds.vmdPrintButton)
}
//#region vmdbutton
Ext.define("vmd.comp.vmdPrintButton", {
    extend: "Ext.BoxComponent",
    xtype: "vmd.vmdPrintButton",
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
		var that = this;
        this.el.addClass(this.selectedCls);
        this.el.removeClass(this.overCls);
        if(!this.disabled) {
            if(this.report){
               var rptObj= eval(this.report);
			   rptObj.print({setWindow: true});
			   return;
                window.selectRptPrint=rptObj;
				var win = that.win;
				if(!win){
					win=that.win=new vmd.window({
						url:' /system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hw9979bf03.html?reportp='+this.report,
						auto:false,
						width:330,
						height:370,
						closeAction:'hide',
						maximizable:false,
						title:'打印设置'
					})
				}
                
                window.closePrintWindow=function(){
                    win.hide();
                }
                win.show()

                //rptObj.print();
            }
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
