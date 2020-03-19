//#region Report 报表组件   原先写在ide-ext.js中
Ext.define("vmd.comp.DataInput", {
    extend: "Ext.BoxComponent",
    xtype: 'vmd.datainput',
    requires: vmd.getCmpDeps(["vmd.ux.DataInputOperateBar$1.0$DataInputOperateBar", "vmd.ux.DataInputNavBar$1.0$DataInputNavBar"]),
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
        this.parentLayout = this.ownerCt.layout;
        this.statusBarHeight = 45;
        this.toolBarHeight = 45;
        this.inputConfig = vmd.decode(this.inputConfig);
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

    //获取主键字段
    getPrimaryItems: function () {
        var vmdreport = this;
        var fields = vmdreport.rptStore.fields;
        var primaryItems = [];
        for (var i = 0; i < fields.items.length; i++) {
            var item = fields.items[i];
            if (item.primary == "Y") {
                primaryItems.push(item);
            }
        }
        return primaryItems;
    },

    //获取非空字段
    getNonNullItems: function () {
        var vmdreport = this;
        var fields = vmdreport.rptStore.fields;
        var nonNullItems = [];
        for (var i = 0; i < fields.items.length; i++) {
            var item = fields.items[i];
            if (item.nullable != "Y") {
                nonNullItems.push(item);
            }
        }
        return nonNullItems;
    },

    updateRptData: function (record, dataId) {
		var vmdreport = this;		
            var item = vmdreport.rptStore.dhtmlxDatastore.item(dataId);			
            if (!item) return;			
			 for (var key in record.data) {
                if (record.data.hasOwnProperty(key) && key != "id") {
                    vmdreport.rptStore.updateValue(dataId,key,record.data[key],item[key])
                }
            }
    },
    updateRptStore: function (store, type) {
        var vmdreport = this;

        vmdreport.rptStore.cache = {};
        vmdreport.rptStore._lastParams = null;
        vmdreport.rptStore.validateFieldErrRules = {}; //字段校验失败的规则
        vmdreport.rptStore.validateRowErrRules = {}; //字段校验失败的规则

        vmdreport.rptStore.dhtmlxDatastore.clearAll();
        vmdreport.rptStore.dhtmlxDatastore.parse("json" == type ? store : store.getJson(true));
        vmdreport.rptStore.dhtmlxDatastore.data.dpull = {};
        vmdreport.rptStore.dhtmlxDatastore.data.opull = {};
        var dataCount = vmdreport.rptStore.dhtmlxDatastore.dataCount();

        //存储旧值
        for (var i = 0; i < dataCount; i++) {
            var dataId = vmdreport.rptStore.dhtmlxDatastore.idByIndex(i);
            var item = vmdreport.rptStore.dhtmlxDatastore.item(dataId);
            //拷贝
            var oldItem = {};
            for (var key in item) {
                if (item.hasOwnProperty(key) && key != "id") {
                    oldItem[key] = item[key];
                }
            }
            vmdreport.rptStore.dhtmlxDatastore.data.opull[dataId] = oldItem;
        }

        if (vmdreport.navBar) {
            vmdreport.navBar.setPageCount(dataCount, 1);
        }
        if (vmdreport.simpleGrid) {
            vmdreport.simpleGrid.totalcount = dataCount;
            vmdreport.simpleGrid.dataCursor = undefined;
        }
        if (vmdreport.freeGrid) {
            vmdreport.freeGrid.totalcount = dataCount;
            vmdreport.freeGrid.dataCursor = undefined;
            if (vmdreport.freeGrid.grid && dataCount > 0 && vmdreport.freeGrid.jumpToItem) {
                vmdreport.freeGrid.jumpToItem(0);
            }
        }
        vmdreport.computeStatistics();
        vmdreport.myMask.hide();
    },

    validateStoreRule: function () {
        var vmdreport = this;
        var rules = vmdreport.rptStore.rules;
        if (!rules || rules.length == 0) {
            return {
                result: true
            };
        }
        for (var i = 0; i < rules.length; i++) {
            var result = rules[i].code && new Function("value", rules[i].code + ';\nreturn value')(""); //eval("(function(){" + rules[i].code + "\n})()");
            if (result && result.status == false) {
                return {
                    result: result.status,
                    errMsg: result.msg
                };
            }
        }
        return {
            result: true
        };
    },

    //校验字段规则
    validateFieldRule: function (field, value) {
        var vmdreport = this;
        var fields = vmdreport.rptStore.fields;

        //校验字段长度
        if (value !== null && value !== undefined && value !== "") {
            var type = fields.map[field] && fields.map[field].dtype;
            var len = fields.map[field] && fields.map[field].length; //总长度
            var precision = fields.map[field] && fields.map[field].precision; //小数位数
            var interger = parseInt(len) - parseInt(precision); //整数位数
            if (type == "number") {
                if ((value + "").split(".")[0] && ((value + "").split(".")[0].length > interger)) {
                    return {
                        result: false,
                        errMsg: fields.map[field].cname + "字段最大整数位数为" + interger + "，当前整数位为" + (value + "").split(".")[0].length
                    }
                }
                if ((value + "").split(".")[1] && ((value + "").split(".")[1].length > precision)) {
                    return {
                        result: false,
                        errMsg: fields.map[field].cname + "字段最大小数位数为" + precision + "，当前小数位为" + (value + "").split(".")[1].length
                    }
                }
            }
            if (type == "varchar2" || type == "char") {
                if ((value + "").length > len) {
                    return {
                        result: false,
                        errMsg: fields.map[field].cname + "字段字符长度数为" + len + "，当前字符长度为" + (value + "").length
                    }
                }
            }
        }
        
        var rules = fields.map[field] && fields.map[field].rules;
        if (!rules || rules.length == 0) {
            return {
                result: true
            };
        }
        for (var i = 0; i < rules.length; i++) {
            var result = rules[i].code && new Function("value", rules[i].code + ';\nreturn value')(""); //eval("(function(){" + rules[i].code + "\n})()");
            if (result && result.status == false) {
                return {
                    result: result.status,
                    errMsg: result.msg
                };
            }
        }
        return {
            result: true
        };
    },

    //计算统计栏表达式
    computeStatistics: function () {
        var vmdreport = this;
        if (!vmdreport.el_status || !vmdreport.inputConfig.statistics || !vmdreport.inputConfig.statistics.expression) {
            return;
        }
        var expression = vmdreport.inputConfig.statistics.expression;
        var result = new Function("value", expression + ';\nreturn value')(""); //eval("(function(){" + expression + "\n})()");
        vmdreport.el_status.innerHTML = result;
    },
    onResize: function (w, h) {
	    this.reLayout(w, h);
	},
	onRemove:function(ds, record,index)
	{	if(record.notFireRemoveEvent)
			return
		var vmdreport = this;
		vmdreport.deleteRow(index)		
	},
	onAdd:function(ds, record)
	{
		var vmdreport = this;	
		//if(vmdreport.isReportAdd)
		//	return
		for(var i=0;i<record.length;i++)
		{
			var index=ds.indexOf(record[i])
			if(vmdreport.rptStore.dhtmlxDatastore.data.order.indexOf(record[i].id)<0)
				vmdreport.addRow(record[0].id, null, index, null, 1, record[i].data,true) 
		}
	},

	onUpdate: function (ds, record) {
		
		var vmdreport = this;
	    if (vmdreport.rptStore) {
	        vmdreport.updateRptData(record,record.id);
	    }
	    else {
	        vmdreport.load();
			vmdreport.load(vmdreport._afterBindDate||function(){});
	    }
	},

	onDataChanged: function (store) {
	    var vmdreport = this;

	    if (vmdreport.freeGrid) {
	        if (store.superclass.getCount.call(store, []) == 0) {
	            vmdreport.freeGrid.setDisabled(true);
	        } else {
	            vmdreport.freeGrid.setDisabled(false);
	        }
	        vmdreport.freeGrid.validateErrorCells = [];
	    }
	    if (vmdreport.simpleGrid) {
	        vmdreport.simpleGrid.validateErrorCells = [];
	    }
	    if (vmdreport.rptStore) {
	        vmdreport.updateRptStore(store);
	        vmdreport.rptStore.validateFieldErrRules = {};
	        vmdreport.rptStore.validateRowErrRules = {};
	    }
	    else {
	        vmdreport.myMask.show();
	        vmdreport.load(vmdreport._afterBindDate||function(){});
	    }
	},
	_afterBindDate:function(){		
	    var vmdreport = this;
		 vmdreport.fireEvent("afterBindDate", vmdreport);
		
	},
	onRender: function(ct, position) {
		var vmdreport = this;
		vmdreport.myMask.show();

		if (!vmdreport.el) {
		    vmdreport.el = document.createElement("div");
		    vmdreport.el.className += " datainput";
		    vmdreport.el.style.position = "relative";

		    //显示网格
		    if (this.inputConfig.layout.isShowGrid) {
		        vmdreport.el_simple = document.createElement("div");
		        vmdreport.el_simple.className += " simple-grid";
		        vmdreport.el_simple.style = vmdreport.style;
		        vmdreport.el_simple.style.position = "absolute";
		        vmdreport.el.appendChild(vmdreport.el_simple);

		        vmdreport.subel_simple = document.createElement("div");
		        vmdreport.subel_simple.id = vmdreport.id + "_simple";
		        vmdreport.subel_simple.style.position = "absolute";
		        vmdreport.el_simple.appendChild(vmdreport.subel_simple);
		    }

		    //显示状态栏
		    if (this.inputConfig.layout.isShowStatistics) {
		        vmdreport.el_status = document.createElement("div");
		        vmdreport.el_status.className += " status";
		        vmdreport.el_status.style.position = "absolute";
		        vmdreport.el_status.style.height = (this.statusBarHeight - 2) + "px";
		        vmdreport.el_status.style.lineHeight = (this.statusBarHeight - 2) + "px";
		        vmdreport.el_status.style.paddingLeft = "4px";
		        vmdreport.el_status.style.border = "1px solid #dfdfdf";
		        vmdreport.el_status.innerHTML = "统计栏：";
		        vmdreport.el.appendChild(vmdreport.el_status);
		    }

		    //显示表单
		    if (this.inputConfig.layout.isShowForm) {
		        vmdreport.el_free = document.createElement("div");
		        vmdreport.el_free.className += " form-grid";
		        vmdreport.el_free.style = vmdreport.style;
		        vmdreport.el_free.style.position = "absolute";
		        vmdreport.el.appendChild(vmdreport.el_free);

		        vmdreport.subel_free = document.createElement("div");
		        vmdreport.subel_free.id = vmdreport.id + "_free";
		        vmdreport.subel_free.style.position = "absolute";
		        vmdreport.el_free.appendChild(vmdreport.subel_free);
		    }

		    //显示导航按钮或操作按钮
		    if (this.inputConfig.layout.isShowNavigation || this.inputConfig.layout.isShowOperation) {
		        vmdreport.el_toolbar = document.createElement("div");
		        vmdreport.el_toolbar.className += " toolbar";
		        vmdreport.el_toolbar.style.position = "absolute";
		        vmdreport.el_toolbar.style.height = this.toolBarHeight + "px";
		        vmdreport.el.appendChild(vmdreport.el_toolbar);
		    }
		}

		//属性赋值
		//Ext.applyIf(vmdreport, vmdreport.simpleGrid);
		//重改指向，保证dhx的原生态
		//this.el = this.el.children[0];
		// Ext.fly(this.el).addClass('vmd-Report');
		//注册事件
		window[vmdreport.id] = this;
		//vmd.comp.Grid.superclass.onRender.call(this, ct, position);
		this.callParent(arguments);
	},

	afterRender: function() {
	    var vmdreport = this;
		this.callParent(arguments);

		vmdreport.reLayout(vmdreport.width, vmdreport.height);

		var dataSetName = vmdreport.inputConfig.layout.dataSet;
		var vmdStore = Ext.StoreMgr.lookup(dataSetName);
		if (vmdStore) {
		    vmdStore.on({
		        scope: this,
		        //beforeload: this.onBeforeLoad,
		        datachanged: this.onDataChanged,
		        add: this.onAdd,
		        remove: this.onRemove,
		        update: this.onUpdate
		        //clear: this.refresh //store.removeAll清空所有数据调用此接口
		    });
		}
		else {
		    vmdreport.myMask.hide();
		    Ext.Msg.show({
		        title: "提示",
		        msg: "通用录入组件未绑定数据集！",
		        buttons: Ext.Msg.OK,
		        icon: Ext.Msg.INFO
		    });
		}
		
	    //显示网格
		if (!vmdreport.simpleGrid && this.inputConfig.layout.isShowGrid) {
		    vmdreport.simpleGrid = new HwSimpleReport(vmdreport, vmdreport.el_simple, vmdreport.subel_simple, null, null, false, vmdreport.autoWidth, vmdreport.autoHeight,"embed");
		    vmdreport.simpleGrid.setAlign("left");
		    vmdreport.simpleGrid.setTitle(this.title);
		    vmdreport.simpleGrid.setLoadMode("smart");
		    vmdreport.simpleGrid.enabledHeaderLabelAutoEscape(false);
		    if (this.inputConfig.grid.settings.displayMode == "1") {
		        vmdreport.simpleGrid.setPatchMode("scale");
		    }
		    else {
		        vmdreport.simpleGrid.setPatchMode("addcol");
		    }
		    vmdreport.simpleGrid.enableMultiselect(true);

		    // 非常规模式设置加载条数
		    if (vmdreport.loadMode && vmdreport.loadMode != "nomal") {
		        // 设置加载模式（nomal:常规；smart:滚动加载；paging：分页）
		        vmdreport.simpleGrid.setLoadMode(vmdreport.loadMode);
		        if (vmdreport.loadNumber && vmdreport.loadNumber > 0) {
		            vmdreport.simpleGrid.setPageSize(vmdreport.loadNumber);
		        } else {
		            vmdreport.simpleGrid.setPageSize(0);
		        }
		    }
		}

	    //显示表单
		if (!vmdreport.freeGrid && this.inputConfig.layout.isShowForm) {
		    vmdreport.freeGrid = new HwFreeReport(vmdreport, vmdreport.el_free, vmdreport.subel_free, null, null, false, vmdreport.autoWidth, vmdreport.autoHeight);
		    vmdreport.freeGrid.setAlign("left");
		    vmdreport.freeGrid.setTitle(this.title);
		    vmdreport.freeGrid.setPatchMode("scale");
		    vmdreport.freeGrid.setNoBorder(true);
		}

		if (!vmdreport.navBar && this.inputConfig.layout.isShowNavigation && vmd.ux.DataInputNavBar) {
		    var config = {
		        renderTo: vmdreport.el_toolbar,
		        style: "float: left;",
		        startDisplay: !this.inputConfig.navigation.first,
		        forwardDisplay: !this.inputConfig.navigation.prev,
		        nextDisplay: !this.inputConfig.navigation.next,
		        endDisplay: !this.inputConfig.navigation.last,
		        countDisplay: !this.inputConfig.navigation.pageNum
		    };
		    if (this.inputConfig.navigation.firstName) {
		        config.startText = this.inputConfig.navigation.firstName;
		    }
		    if (this.inputConfig.navigation.lastName) {
		        config.endText = this.inputConfig.navigation.lastName;
		    }
		    if (this.inputConfig.navigation.nextName) {
		        config.nextText = this.inputConfig.navigation.nextName;
		    }
		    if (this.inputConfig.navigation.prevName) {
		        config.forwardText = this.inputConfig.navigation.prevName;
		    }
		    
		    vmdreport.navBar = new vmd.ux.DataInputNavBar(config)
		    vmdreport.navBar.on("nav_click",
                function (obj, e, flag) {
                    switch (flag) {
                        case 'start':
                            if (vmdreport.inputConfig.navigation.firstEvent && vmdreport.fireEvent(vmdreport.inputConfig.navigation.firstEvent, vmdreport) === false) {
                                return false;
                            }
                            vmdreport.jumpToItem(0);
                            break;
                        case 'forward':
                            if (vmdreport.inputConfig.navigation.prevEvent && vmdreport.fireEvent(vmdreport.inputConfig.navigation.prevEvent, vmdreport) === false) {
                                return false;
                            }
                            vmdreport.preItem();
                            break;
                        case 'next':
                            if (vmdreport.inputConfig.navigation.nextEvent && vmdreport.fireEvent(vmdreport.inputConfig.navigation.nextEvent, vmdreport) === false) {
                                return false;
                            }
                            vmdreport.nextItem();
                            break;
                        case 'end':
                            if (vmdreport.inputConfig.navigation.lastEvent && vmdreport.fireEvent(vmdreport.inputConfig.navigation.lastEvent, vmdreport) === false) {
                                return false;
                            }
                            var dataCount = vmdreport.rptStore.dhtmlxDatastore.dataCount();
                            vmdreport.jumpToItem(dataCount - 1);
                            break;
                    }
                });

		    vmdreport.navBar.on("pageJump",
                function (number) {
                    vmdreport.jumpToItem(number - 1);
                });
		}

		if (!vmdreport.editBar && this.inputConfig.layout.isShowOperation && vmd.ux.DataInputOperateBar) {
		    var config = {
		        renderTo: vmdreport.el_toolbar,
		        style: "float: right;",
		        addDisplay: !this.inputConfig.operation.addbar,
		        deleteDisplay: !this.inputConfig.operation.deletebar,
		        saveDisplay: !this.inputConfig.operation.savebar,
		        printDisplay: !this.inputConfig.operation.printbar,
		        importDisplay: !this.inputConfig.operation.exData
		    };

		    if (this.inputConfig.operation.addName) {
		        config.addButtonName = this.inputConfig.operation.addName;
		    }
		    if (this.inputConfig.operation.deleteName) {
		        config.deleteButtonName = this.inputConfig.operation.deleteName;
		    }
		    if (this.inputConfig.operation.saveName) {
		       config.saveButtonName = this.inputConfig.operation.saveName;
		    }
		    if (this.inputConfig.operation.exDataName) {
		        config.imButtonName = this.inputConfig.operation.exDataName;
		    }

		    vmdreport.editBar = new vmd.ux.DataInputOperateBar(config);
		    if (this.inputConfig.operation.exType) {
		        vmdreport.editBar.disableMenu(this.inputConfig.operation.exType);
		    }
		    vmdreport.editBar.on("addclick", function (obj, e, flag) {
		        if (vmdreport.inputConfig.operation.addEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.addEvent, vmdreport) === false) {
		            return false;
		        };
		        vmdreport.addRow(null, null, null, false, 1);
		    });
		    vmdreport.editBar.on("addmenuclick",
                function (obj, e, flag) {
                    if (!vmdreport.simpleGrid) {
                        return;
                    }
                    var selectId = vmdreport.simpleGrid.grid.getSelectedRowId();
                    if (selectId) {
                        selectId = selectId.split(",")[0];
                        var selectRowIndex = vmdreport.simpleGrid.grid.getRowIndex(selectId);
                        switch (flag) {
                            case 'front':
                                if (vmdreport.inputConfig.operation.addEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.addEvent, vmdreport, 'front') === false) {
                                    return false;
                                };
                                vmdreport.addRow(null, selectRowIndex, selectRowIndex, false, 2);
                                break;
                            case 'after':
                                if (vmdreport.inputConfig.operation.addEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.addEvent, vmdreport, 'after') === false) {
                                    return false;
                                }
                                vmdreport.addRow(null, selectRowIndex, selectRowIndex + 1, false, 0);
                                break;
                            case 'copy':
                                if (vmdreport.inputConfig.operation.addEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.addEvent, vmdreport, 'copy') === false) {
                                    return false;
                                }
                                vmdreport.addRow(null, selectRowIndex, selectRowIndex, true, 2);
                                break;
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: "提示",
                            msg: "追加行前首先选中行！",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                });
		    vmdreport.editBar.on("deleteclick", function (obj, e, flag) {
		        if (vmdreport.inputConfig.operation.delEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.delEvent, vmdreport) === false) {
		            return false;
		        };
		        var selectId = vmdreport.simpleGrid.grid.getSelectedRowId();
		        if (selectId) {
		            selectId = selectId.split(",")[0];
		            var selectRowIndex = vmdreport.simpleGrid.grid.getRowIndex(selectId);
		            vmdreport.deleteRow(selectRowIndex);
		        }
		        else {
		            Ext.Msg.show({
		                title: "提示",
		                msg: "请选择要删除的行！",
		                buttons: Ext.Msg.OK,
		                icon: Ext.Msg.INFO
		            });
		        }
		    });

		    vmdreport.editBar.on("deletemenuclick", function (obj, e, flag) {
		        switch (flag) {
		            case 'all':
		                if (vmdreport.inputConfig.operation.delEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.delEvent, vmdreport, 'all') === false) {
		                    return false;
		                };
		                vmdreport.rptStore.validateFieldErrRules = {}; //字段校验失败的规则
		                vmdreport.rptStore.validateRowErrRules = {}; //字段校验失败的规则

		                var dhtmlxStoredata = vmdreport.rptStore.dhtmlxDatastore.data;
		                dhtmlxStoredata.dpull = dhtmlxStoredata.dpull || {};
		                var ids = dhtmlxStoredata.order;
		                for (var i = 0; i < ids.length; i++) {
		                    var item = dhtmlxStoredata.pull[ids[i]];
		                    if (!item._rowState || item._rowState == "nochange" || item._rowState == "update") {
		                        dhtmlxStoredata.dpull[ids[i]] = item;
		                    }
		                }

		                if (vmdreport.freeGrid) {
		                    vmdreport.freeGrid.setDisabled(true);
		                }
		                vmdreport.rptStore.dhtmlxDatastore.clearAll();
		                if (vmdreport.navBar) {
		                    vmdreport.navBar.setPageCount(0, 0);
		                }
		                vmdStore.removeAll();
		                break;
		            case 'multi':
		                if (vmdreport.inputConfig.operation.delEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.delEvent, vmdreport, 'multi') === false) {
		                    return false;
		                };
		                var selectId = vmdreport.simpleGrid.grid.getSelectedRowId();
		                if (selectId) {
		                    var selectIds = selectId.split(",");
		                    var selectRowIndexs = selectIds.map(function (v) { return vmdreport.simpleGrid.grid.getRowIndex(v) });
		                    selectRowIndexs.sort(function (v1, v2) { return v2 - v1 });
		                    for (var i = 0; i < selectRowIndexs.length; i++) {
		                        vmdreport.deleteRow(selectRowIndexs[i]);
		                    }
		                }
		                else {
		                    Ext.Msg.show({
		                        title: "提示",
		                        msg: "请选择要删除的行！",
		                        buttons: Ext.Msg.OK,
		                        icon: Ext.Msg.INFO
		                    });
		                }
		                break;
		        }
		    });

		    vmdreport.editBar.on("saveclick", function (obj, e, flag) {
		        if (vmdreport.inputConfig.operation.saveEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.saveEvent, vmdreport) === false) {
		            return false;
		        };
		        vmdreport.save(function () {
		            vmdreport.submitMask.hide();
		            Ext.Msg.show({
		                title: "提示！",
		                msg: "保存成功",
		                buttons: Ext.Msg.OK,
		                icon: Ext.Msg.INFO
		            });
		        }, function (msg) {
		            vmdreport.submitMask.hide();
		            Ext.Msg.show({
		                title: "保存失败！",
		                msg: msg,
		                buttons: Ext.Msg.OK,
		                icon: Ext.Msg.INFO
		            });
		        });
		    });

		    vmdreport.editBar.on("importclick", function (obj, e, flag) {
		        if (vmdreport.inputConfig.operation.imEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.imEvent, vmdreport) === false) {
		            return false;
		        };
				if(vmdreport.inputConfig.operation.exType=="justIm")
					vmdreport.importExcel();
				else
					vmdreport.exportExcel();
		    });
		    vmdreport.editBar.on("importmenuclick", function (obj, e, flag) {
		        switch (flag) {
		            case 'exportExcel':
		                if (vmdreport.inputConfig.operation.imEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.imEvent, vmdreport, "exportExcel") === false) {
		                    return false;
		                };
		                vmdreport.exportExcel();
		                break;
		            case 'importExcel':
		                if (vmdreport.inputConfig.operation.imEvent && vmdreport.fireEvent(vmdreport.inputConfig.operation.imEvent, vmdreport, "importExcel") === false) {
		                    return false;
		                };
		                vmdreport.importExcel();
                        break;
		        }
		    });

		    vmdreport.editBar.on("printclick", function (obj, e, flag) {
		        vmdreport.print();
		    });
		}

		vmdreport.on("onSectionPaste", function (report) {
		    if (!vmdreport.simpleGrid) {
		        return;
		    }

		    function pasteFromData(selectionArea, data) {
		        var LeftTopRow = selectionArea.LeftTopRow;
		        var RightBottomRow = selectionArea.RightBottomRow;
		        var LeftTopCol = selectionArea.LeftTopCol;
		        var RightBottomCol = selectionArea.RightBottomCol;

		        var gridRowsNums = report.grid.getRowsNum();
		        var gridColsNums = report.grid.getColumnsNum();

		        var rptStore = vmdreport.rptStore;
		        for (var i = LeftTopRow; i <= RightBottomRow; i++) {
		            for (var j = LeftTopCol; j < Math.min(LeftTopCol + data[i - LeftTopRow].length, gridColsNums) ; j++) {
		                var cellObj = report.grid.cells2(i, j);
		                var oCell = report.getOriginCellById(cellObj.cell._attrs.sid);

		                var _field = oCell.dsField && oCell.dsField[0];
		                var _dsName = oCell.dsName && oCell.dsName[0];
		                if (rptStore && _field && _dsName && rptStore.name == _dsName) {
		                    var dataId = rptStore.idByIndex(i);
		                    var d = data[i - LeftTopRow][j - LeftTopCol];
		                    if (d != undefined && d != null) {
		                        rptStore.updateValue(dataId, _field, d);
		                    }
		                }
		            }
		        }
		    }

		    var pasteWindow = new PasteWindow({
		        confirm: function (type, param, data) {
		            if (!data) return;
		            var copyRowsNum = data.length;
		            //替换
		            if (type == "replace") {
		                if (param == "patch") { //界面行数不足时插入行
		                    var startRow = report.grid._selectionArea.LeftTopRow;
		                    var gridRowsNums = report.grid.getRowsNum();

		                    //多出来的行
		                    var modRows = (startRow + copyRowsNum) - gridRowsNums;
		                    if (modRows > 0) {
		                        var _selectionArea = report.grid._selectionArea;
		                        _selectionArea.RightBottomRow = _selectionArea.RightBottomRow + modRows;
		                        for (var i = 0; i < modRows; i++) {
		                            vmdreport.addRow(null, null, null, false, 1);
		                        }
		                        //report.addRows(_selectionArea.RightBottomRow, modRows, _selectionArea.RightBottomRow + 1, true);
		                        report.grid._selectionArea = _selectionArea;
		                    }
		                    else {
		                        report.grid._selectionArea.RightBottomRow = report.grid._selectionArea.LeftTopRow + copyRowsNum - 1;
		                    }
		                }
		                else {
		                    var gridRowsNums = report.grid.getRowsNum();
		                    if ((report.grid._selectionArea.LeftTopRow + copyRowsNum) > gridRowsNums) {
		                        report.grid._selectionArea.RightBottomRow = gridRowsNums - 1;
		                    }
		                    else {
		                        report.grid._selectionArea.RightBottomRow = report.grid._selectionArea.LeftTopRow + copyRowsNum - 1;
		                    }
		                }
		                pasteFromData(report.grid._selectionArea, data);
		                report.grid.selectBlock(report.grid._selectionArea.LeftTopCol, report.grid.getRowId(report.grid._selectionArea.LeftTopRow), report.grid._selectionArea.RightBottomCol, report.grid.getRowId(report.grid._selectionArea.RightBottomRow));
		            }
		                //插入
		            else if (type == "insert") {
		                var _selectionArea = report.grid._selectionArea;
		                if (param == "bellow") {
		                    for (var i = 0; i < copyRowsNum; i++) {
		                        vmdreport.addRow(null, _selectionArea.RightBottomRow, _selectionArea.RightBottomRow + 1, false, 0);
		                    }
		                    _selectionArea.LeftTopRow = _selectionArea.RightBottomRow + 1;
		                    _selectionArea.RightBottomRow = _selectionArea.RightBottomRow + copyRowsNum;
		                }
		                else if (param == "above") {
		                    for (var i = 0; i < copyRowsNum; i++) {
		                        vmdreport.addRow(null, _selectionArea.LeftTopRow, _selectionArea.LeftTopRow, false, 2);
		                    }
		                    _selectionArea.RightBottomRow = _selectionArea.LeftTopRow + copyRowsNum - 1;
		                }
		                report.grid._selectionArea = _selectionArea;
		                pasteFromData(report.grid._selectionArea, data);
		                report.grid.selectBlock(report.grid._selectionArea.LeftTopCol, report.grid.getRowId(report.grid._selectionArea.LeftTopRow), report.grid._selectionArea.RightBottomCol, report.grid.getRowId(report.grid._selectionArea.RightBottomRow));
		            }
		        }
		    });
		    pasteWindow.show();
		    return false;
		});
		//window.setTimeout(function () {
		//    if (!vmdreport._hasCalled) {
		//        vmdreport.query();
		//    }
		//},100);
	},

	reLayout: function (w, h) {
	    var vmdreport = this;
	    var panel = (vmdreport.ownerCt.body || vmdreport.ownerCt.el).dom;
	    var statusBarHeight = vmdreport.el_status ? this.statusBarHeight : 0;
	    var toolBarHeight = vmdreport.el_toolbar ? this.toolBarHeight : 0;
	    var panelHeight;
	    var panelWidth;
	    switch (vmdreport.parentLayout) {
	        case "fit":
	        case "border":
	            vmdreport.el.dom.style.top = "0px";
	            vmdreport.el.dom.style.left = "0px";
	            panelWidth = panel.clientWidth;
	            panelHeight = panel.clientHeight;
	            break;
	        case "auto":
	            vmdreport.el.dom.style.top = "0px";
	            vmdreport.el.dom.style.left = "0px";
	            panelHeight = h || panel.clientHeight;
	            panelWidth = w || panel.clientWidth;
	            break;
	        default:
	            panelHeight = h || panel.clientHeight;
	            panelWidth = w || panel.clientWidth;
	            break;
	    }
	    this.setSize(panelWidth, panelHeight);

	    var simpleGridWidth = panelWidth;
	    var freeGridWidth = panelWidth;

	    var simpleGridHeight = 0;
	    var freeGridHeight = 0;
	    if (vmdreport.el_simple && vmdreport.el_free) {
	        switch (vmdreport.inputConfig.layout.displayMode) {
	            case "style1":
	                simpleGridHeight = Math.floor((panelHeight - statusBarHeight - toolBarHeight) / 2) - 6;
	                freeGridHeight = Math.floor((panelHeight - statusBarHeight - toolBarHeight) / 2) - 6;

	                vmdreport.el_simple.style.height = simpleGridHeight + "px";
	                vmdreport.el_simple.style.width = simpleGridWidth + "px";
	                vmdreport.subel_simple.style.height = simpleGridHeight + "px";
	                vmdreport.subel_simple.style.width = simpleGridWidth + "px";

	                vmdreport.el_free.style.height = freeGridHeight + "px";
	                vmdreport.el_free.style.width = freeGridWidth + "px";
	                vmdreport.subel_free.style.height = freeGridHeight + "px";
	                vmdreport.subel_free.style.width = freeGridWidth + "px";

	                vmdreport.el_simple.style.top = "0px";
	                vmdreport.el_free.style.top = (simpleGridHeight + statusBarHeight + 4) + "px";
	                vmdreport.el_free.style.boxShadow = "2px 2px 6px #cccccc";
	                vmdreport.el_simple.style.boxShadow = "2px 2px 6px #cccccc";
	                break;
	            case "style2":
	                simpleGridHeight = Math.floor((panelHeight - statusBarHeight - toolBarHeight) / 2) - 6;
	                freeGridHeight = Math.floor((panelHeight - statusBarHeight - toolBarHeight) / 2) - 6;

	                vmdreport.el_simple.style.height = simpleGridHeight + "px";
	                vmdreport.el_simple.style.width = simpleGridWidth + "px";
	                vmdreport.subel_simple.style.height = simpleGridHeight + "px";
	                vmdreport.subel_simple.style.width = simpleGridWidth + "px";
	                
	                vmdreport.el_free.style.height = freeGridHeight + "px";
	                vmdreport.el_free.style.width = freeGridWidth + "px";
	                vmdreport.subel_free.style.height = freeGridHeight + "px";
	                vmdreport.subel_free.style.width = freeGridWidth + "px";

	                vmdreport.el_free.style.top = "0px";
	                vmdreport.el_simple.style.top = (simpleGridHeight + statusBarHeight + 4) + "px";
	                vmdreport.el_simple.style.boxShadow = "2px 2px 6px #cccccc";
	                vmdreport.el_free.style.boxShadow = "2px 2px 6px #cccccc";
	                break;
	        }

	        if (vmdreport.el_status) {
	            vmdreport.el_status.style.width = (panelWidth - 2) + "px";
	            vmdreport.el_status.style.top = (simpleGridHeight + 2) + "px";
	        }

	        if (vmdreport.el_toolbar) {
	            vmdreport.el_toolbar.style.height = toolBarHeight + "px";
	            vmdreport.el_toolbar.style.width = "100%";
	            vmdreport.el_toolbar.style.top = (simpleGridHeight + statusBarHeight + freeGridHeight + 8) + "px";
	        }
	    }
	    else if (vmdreport.el_simple) {
	        simpleGridHeight = Math.floor((panelHeight - statusBarHeight - toolBarHeight));
	        vmdreport.el_simple.style.height = simpleGridHeight + "px";
	        vmdreport.el_simple.style.width = simpleGridWidth + "px";
	        vmdreport.subel_simple.style.height = simpleGridHeight + "px";
	        vmdreport.subel_simple.style.width = simpleGridWidth + "px";

	        if (vmdreport.el_status) {
	            vmdreport.el_status.style.width = (panelWidth - 2) + "px";
	            vmdreport.el_status.style.top = simpleGridHeight + "px";
	        }

	        if (vmdreport.el_toolbar) {
	            vmdreport.el_toolbar.style.height = toolBarHeight + "px";
	            vmdreport.el_toolbar.style.width = "100%";
	            vmdreport.el_toolbar.style.top = (simpleGridHeight + statusBarHeight + freeGridHeight) + "px";
	        }
	    }
	    else if (vmdreport.el_free) {
	        freeGridHeight = Math.floor((panelHeight - statusBarHeight - toolBarHeight));
	        vmdreport.el_free.style.height = freeGridHeight + "px";
	        vmdreport.el_free.style.width = freeGridWidth + "px";
	        vmdreport.subel_free.style.height = freeGridHeight + "px";
	        vmdreport.subel_free.style.width = freeGridWidth + "px";
	        if (vmdreport.el_status) {
	            vmdreport.el_status.style.width = (panelWidth - 2) + "px";
	            vmdreport.el_status.style.top = freeGridHeight + "px";
	        }

	        if (vmdreport.el_toolbar) {
	            vmdreport.el_toolbar.style.height = toolBarHeight + "px";
	            vmdreport.el_toolbar.style.width = "100%";
	            vmdreport.el_toolbar.style.top = (simpleGridHeight + statusBarHeight + freeGridHeight + 6) + "px";
	        }
	    }

	    if (this.simpleGrid) {
	        this.simpleGrid.setSize(simpleGridWidth, simpleGridHeight - (this.diff || 0));
	        this.simpleGrid.setPosition();
	    }
	    if (this.freeGrid) {
	        this.freeGrid.setSize(freeGridWidth, freeGridHeight - (this.diff || 0));
	        this.freeGrid.setPosition();
	    }
	},

	getSimpleFirstCell: function(rId){
	    if (!this.simpleGrid) {
	        return null;
	    }
	    var firstCellIndex = 0;
	    for (var i = 0; i < this.simpleGrid.colWidths.length; i++) {
	        if (this.simpleGrid.colWidths[i] > 0) {
	            firstCellIndex = i;
	            break;
	        }
	    }
	    return this.simpleGrid.grid.cells(rId, firstCellIndex);
	},

	//简单网格填报
	load: function(callBack) {
	    var vmdreport = this;
	    this._hasCalled = true;
	    if (vmdreport.simpleLoading || vmdreport.freeLoading) {
			return;
	    }

	    var dataSetName = vmdreport.inputConfig.layout.dataSet;
	    var vmdStore = Ext.StoreMgr.lookup(dataSetName);
	    var saveserver = {
	        explain: "",
	        host: "",
	        id: vmdStore.storeConfig.id,
	        method: "Save",
	        name: vmdStore.storeConfig.name,
	        params: {},
	        path: vmdStore.storeConfig.url
	    };
	    vmdStore.rptStore = vmdreport.rptStore = new HwRptStore(null, "submit");
	    vmdreport.rptStore.parse({
	        name: dataSetName,
	        factname: dataSetName,
	        updatemode: true,
	        saveserver: saveserver
	    });
	    vmdreport.rptStore.fields = vmdStore.fields;
	    vmdreport.rptStore.rules = vmdStore.rules;
	    vmdreport.rptStore.primaryItems = this.getPrimaryItems();
	    vmdreport.rptStore.nonNullItems = this.getNonNullItems();
	    vmdreport.rptStore.validateFieldErrRules = {}; //字段上的校验失败规则
	    vmdreport.rptStore.validateRowErrRules = {}; //行上的校验失败规则

	    vmdreport.rptStore.dhtmlxDatastore.data.attachEvent("onAfterAdd", function (id, pos) {
	        this.opull = this.opull || {};
	        var oldItem = this.opull[id];
	        var item = this.pull[id];
	        if (!oldItem) {
	            oldItem = this.opull[id] = {};
	            for (var key in item) {
	                if (!item.hasOwnProperty(key) || key == "id") {
	                    continue;
	                }
	                oldItem[key] = item[key];
	            }
	        }
			//if(!vmdreport.isVmdstoreAdd)
			//{
			//	vmdreport.isReportAdd=true
			if(vmdStore.getById(id))
				return;
				vmdStore.insertData(id, item, pos);
			//	vmdreport.isReportAdd=false
				this.pull[id]._rowState = "add";
			//}
	    });
	    vmdreport.rptStore.dhtmlxDatastore.data.attachEvent("onBeforeDelete", function (id, pos) {
	        this.dpull = this.dpull || {};
	        var item = this.pull[id];
	        if (!item._rowState || item._rowState == "nochange" || item._rowState == "update") {
	            this.dpull[id] = item;
	        }
	        vmdStore.deleteData(id,true);
	        return true;
	    });
	    
	    vmdreport.rptStore.dhtmlxDatastore.data.attachEvent("onStoreUpdated", function (id, data, mode) {
	        if (mode == "update") {
	            data._rowState = "update";
	        }
	        vmdStore.updateData(id, data);
	        vmdreport._changingId = id;
	        return true;
	    });
	    //vmdreport.rptStore.setPaging(-1, 50);

	    if (vmdreport.simpleGrid) {
	        if (!vmdreport.inputConfig.gridJson) {
	            vmdreport.myMask.hide();
	            Ext.Msg.show({
	                title: "提示！",
	                msg: "网格属性未进行配置，请先在网格属性界面进行配置！",
	                buttons: Ext.Msg.OK,
	                icon: Ext.Msg.ERROR
	            });
	            return;
	        }
		    vmdreport.simpleLoading = true;
		    vmdreport.simpleGrid.bindExtraDatastore(vmdreport.rptStore);
		    vmdreport.simpleGrid.loadJSON(vmdreport.inputConfig.gridJson, function () {
		        vmdreport.simpleLoading = false;
                
		        vmdreport.simpleGrid.grid.attachEvent("onBeforeSelect", function (newRid, oldRid, ind) {
		            if (newRid != oldRid) {
		                if (oldRid) {//校验数据集规则
		                    var validateResult = vmdreport.validateStoreRule();
		                    var firstCellObj = vmdreport.getSimpleFirstCell(oldRid);
		                    //校验失败
		                    if (!validateResult.result) {
		                        vmdreport.rptStore.validateRowErrRules[oldRid] = validateResult;
		                        if (firstCellObj) {
		                            firstCellObj.cell.style.borderLeft = "3px solid red";
		                        }
		                        Ext.Msg.show({
		                            title: "校验失败！",
		                            msg: validateResult.errMsg,
		                            buttons: Ext.Msg.OK,
		                            icon: Ext.Msg.ERROR
		                        });
		                    }
		                    else if (vmdreport.rptStore.validateRowErrRules[oldRid]) {
		                        if (firstCellObj) {
		                            firstCellObj.cell.style.borderLeft = "";
		                        }
		                        delete vmdreport.rptStore.validateRowErrRules[oldRid];
		                    }
		                }
		                vmdreport.fireEvent("gridrowidchange", vmdreport, newRid, oldRid);
		            }
		            return true;
		        });

		        vmdreport.simpleGrid.grid.attachEvent("onRowSelect", function (rId, ind) {
					if(vmdreport.upSelRowId&&vmdreport.upSelRowId==rId)
						return;					
					vmdreport.upSelRowId=rId;
		            var selectRowIndex = this.getRowIndex(rId);
		            var dataCount = vmdreport.rptStore.dhtmlxDatastore.dataCount();
		            if (selectRowIndex < 0 || selectRowIndex >= dataCount) {
		                return;
		            }
		            if (vmdreport.navBar) {
		                vmdreport.navBar.setPageCount(dataCount, selectRowIndex + 1);
		            }
		            if (vmdreport.simpleGrid) {
		                vmdreport.simpleGrid.dataCursor = selectRowIndex;
		            }
		            if (vmdreport.freeGrid) {
		                vmdreport.freeGrid.jumpToItem(selectRowIndex);
		            }
		            vmdreport.rptStore.setCursor(selectRowIndex);
		            //会触发两次onRowSelect事件
		            //vmdreport.jumpToItem(selectRowIndex);
		            if (vmdStore.refreshSlaveStore) {
		                vmdStore.refreshSlaveStore();
		            }
		            vmdreport.fireEvent("gridrowselect", vmdreport, rId);
		        });

		        vmdreport.simpleGrid.grid.attachEvent("onCellChanged", function (rId, cInd, nValue) {
					if(!cInd)
						return;
		            var primaryKeys = vmdreport.rptStore.primaryItems.map(function (v) { return v.name });
		            var nonNullableKeys = vmdreport.rptStore.nonNullItems.map(function (v) { return v.name });
		            var cellObj = vmdreport.simpleGrid.grid.cells(rId, cInd);
		            var fields = vmdreport.rptStore.fields;
		            var validateField = vmdreport.simpleGrid.columnIds[cInd];
					vmdStore

		            //值改变时重新计算统计栏表达式
		            vmdreport.computeStatistics();

		            //其他校验
		            if (vmdreport._changingId == rId) {

		                var validateResult = vmdreport.validateFieldRule(validateField, nValue);
		                //校验失败
		                if (!validateResult.result) {
		                    cellObj.cell.className += " dhtmlx_validation_error1";
		                    vmdreport.simpleGrid.grid.callEvent("onValidationError", [rId, cInd, nValue, validateResult, ""]);
		                    vmdreport.rptStore.validateFieldErrRules[validateField] = vmdreport.rptStore.validateFieldErrRules[validateField] || {};
		                    vmdreport.rptStore.validateFieldErrRules[validateField][rId + "_" + cInd] = cellObj;
		                    vmdreport._FieldErrMsg = validateResult.errMsg;
		                }
		                    //校验成功
		                else {
		                    if (validateResult.result && vmdreport.rptStore.validateFieldErrRules[validateField]) {
		                        var tmp_cellObj = vmdreport.rptStore.validateFieldErrRules[validateField][rId + "_" + cInd];
		                        if (tmp_cellObj) {
		                            tmp_cellObj.cell.className = tmp_cellObj.cell.className.replace(/dhtmlx_validation_error1/g, "");
		                            vmdreport.simpleGrid.grid.callEvent("onValidationCorrect", [rId, cInd, nValue]);
		                            delete vmdreport.rptStore.validateFieldErrRules[validateField][rId + "_" + cInd];
		                        }
		                        if (Ext.isEmptyObject(vmdreport.rptStore.validateFieldErrRules[validateField])) {
		                            delete vmdreport.rptStore.validateFieldErrRules[validateField];
		                        }
		                    }
		                }
		            }

		            if (nonNullableKeys.indexOf(validateField) == -1) {
		                return true;
		            }

                    //非空校验
		            var validataResult = vmdreport.simpleGrid.grid.validateCell(rId, cInd, "NotEmpty", nValue + "", "", fields.map[validateField].cname + "不允许为空！");
		            return true;
		        });
		        if (callBack) {
		            callBack.apply(vmdreport, []);
		        }
				
				
				
		    });
		}
		
	    if (vmdreport.freeGrid) {
	        if (!vmdreport.inputConfig.formJson) {
	            vmdreport.myMask.hide();
	            Ext.Msg.show({
	                title: "提示！",
	                msg: "表单属性未进行配置，请先在表单属性界面进行配置！",
	                buttons: Ext.Msg.OK,
	                icon: Ext.Msg.ERROR
	            });
	            return;
	        }
		    vmdreport.freeLoading = true;
		    vmdreport.freeGrid.bindExtraDatastore(vmdreport.rptStore);
		    vmdreport.freeGrid.loadJSON(vmdreport.inputConfig.formJson, function () {
		        vmdreport.freeLoading = false;
		        if (callBack) {
		            callBack.apply(vmdreport, []);
		        }
		    });
		}

		vmdreport.updateRptStore(vmdStore);
	},

	dataPrepare: function (params) {
	    var vmdreport = this;
	    params = params || {};
	    var dataSetName = params.store || vmdreport.inputConfig.layout.dataSet;
	    var vmdStore = Ext.StoreMgr.lookup(dataSetName);
	    if (!vmdStore) {
	        Ext.Msg.show({
	            title: "提示",
	            msg: "通用录入组件未绑定数据集！",
	            buttons: Ext.Msg.OK,
	            icon: Ext.Msg.INFO
	        });
	        return;
	    }
	    var primaryItems = vmdreport.rptStore.primaryItems;
	    var primaryKeys = primaryItems.map(function (v) { return v.name });
	    //修改字段
	    var modifiedFields = params.dValue || {};
	    //数据准备查询参数
	    var preParams = {};
	    //当前查询参数
	    var curParams = {};

	    var varNameValueHash = vmdStore.storeConfig.getMethods;
	    for (var i = 0; i < varNameValueHash.length; i++) {
	        var param = varNameValueHash[i].id;
	        var value = varNameValueHash[i].value1 || varNameValueHash[i].value2;
	        try {
	            value = value == "" ? "" : new Function("value", value + ';\nreturn value')("");
	            //eval("(function(){" + value + "\n})()")
	            curParams[param] = value;
	            if (params.query[param]) {
	                preParams[param] = new Function("value", params.query[param] + ';\nreturn value')("");//eval("(function(){" + params.query[param] + "\n})()");
	            }
	            else {
	                preParams[param] = value;
	            }
	        } catch (e) {
	            vmd.error("错误提示", "获取数据集'" + dataSetName + "'参数时出错！错误信息：" + e.message);
	            return;
	        }
	    }

	    var urlConfig = {
	        host: vmd.MicService.getDasIp(),
	        url: vmdStore.storeConfig.url
	    };
	    if (!urlConfig.url) {
	        Ext.Msg.show({
	            title: "错误",
	            msg: "数据集'" + this.factName + "'信息未配置！",
	            buttons: Ext.Msg.OK,
	            icon: Ext.Msg.ERROR
	        });
	        return;
	    }

	    var curDataRequestCompleted = false;
	    var preDataRequestCompleted = false;
	    var curDatas = [];
	    var preDatas = [];

	    hwDas.get(urlConfig, {}, curParams,
            function (result) {
                curDatas = result.data[0].datas;
                curDataRequestCompleted = true;
                //全部查询完成
                if (preDataRequestCompleted) {
                    requestSuccess();
                }
            },
            function (msg) {
                curDataRequestCompleted = true;
                Ext.Msg.show({
                    title: "错误",
                    msg: "获取'" + dataSetName + "'数据失败！错误信息：" + msg,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        );

	    hwDas.get(urlConfig, {}, preParams,
           function (result) {
               preDatas = result.data[0].datas;
               preDataRequestCompleted = true;
               //全部查询完成
               if (curDataRequestCompleted) {
                   requestSuccess();
               }
           },
           function (msg) {
               preDataRequestCompleted = true;
               Ext.Msg.show({
                   title: "错误",
                   msg: "获取'" + dataSetName + "'数据失败！错误信息：" + msg,
                   buttons: Ext.Msg.OK,
                   icon: Ext.Msg.ERROR
               });
           }
       );

	    function requestSuccess() {
	        //拼接去重
	        var tmpObj = {};
	        var datas = [];
	        for (var i = 0; i < curDatas.length; i++) {
	            //先修改值
	            for (var key in params.dValue) {
	                if (params.dValue.hasOwnProperty(key) && params.dValue[key]) {
	                    curDatas[i][key] = new Function("value", params.dValue[key] + ';\nreturn value')("");//eval("(function(){" + params.dValue[key] + "\n})()");
	                }
	            }
	            tmpObj[primaryKeys.map(function (v) { return curDatas[i][v] }).join("_")] = true;
	            curDatas[i]._rowState = "update";
	            datas.push(curDatas[i]);
	        }
            
	        for (var i = 0; i < preDatas.length; i++) {
	            //先修改值
	            for (var key in params.dValue) {
	                if (params.dValue.hasOwnProperty(key) && params.dValue[key]) {
	                    preDatas[i][key] = new Function("value", params.dValue[key] + ';\nreturn value')(""); //eval("(function(){" + params.dValue[key] + "\n})()");
	                }
	            }
	            if (!tmpObj[primaryKeys.map(function (v) { return preDatas[i][v] }).join("_")]) {
	                preDatas[i]._rowState = "update";
	                datas.push(preDatas[i]);
	            }
	        }
	        vmdreport.updateRptStore(datas, "json");
	    }
	},

	getSaveDatas: function () {
	    return this.save(null, null, true);
	},

    //保存表
	save: function (success, error, onlyReturnData) {
	    var vmdreport = this;
	    if (vmdreport.simpleGrid) {
	        vmdreport.simpleGrid.grid.editStop();
	    }
	    if (vmdreport.freeGrid) {
	        vmdreport.freeGrid.grid.editStop();
	    }

	    //字段校验失败
	    if (!Ext.isEmptyObject(vmdreport.rptStore.validateFieldErrRules)) {
	        Ext.Msg.show({
	            title: "提示！",
	            msg: vmdreport._FieldErrMsg || "字段校验规则校验失败！",
	            buttons: Ext.Msg.OK,
	            icon: Ext.Msg.INFO
	        });
	        return;
	    }

	    if (vmdreport.simpleGrid && vmdreport.simpleGrid.validateErrorCells.length > 0) {
	        Ext.Msg.show({
	            title: "提示",
	            msg: vmdreport.simpleGrid._CellErrMsg || "校验失败！",
	            buttons: Ext.Msg.OK,
	            icon: Ext.Msg.ERROR
	        });
	        return;
	    }

	    if (vmdreport.freeGrid && vmdreport.freeGrid.validateErrorCells.length > 0) {
	        Ext.Msg.show({
	            title: "提示",
	            msg: vmdreport.freeGrid._CellErrMsg || "校验失败！",
	            buttons: Ext.Msg.OK,
	            icon: Ext.Msg.ERROR
	        });
	        return;
	    }

	    var selectedId = vmdreport.simpleGrid && vmdreport.simpleGrid.grid.getSelectedRowId();
	    //最后选中的行没有进行校验直接点击保存
	    if (selectedId) {
	        var firstCellObj = vmdreport.getSimpleFirstCell(selectedId);
	        var validateResult = vmdreport.validateStoreRule();
	        //校验失败
	        if (!validateResult.result) {
	            vmdreport.rptStore.validateRowErrRules[selectedId] = validateResult;
	            if (firstCellObj) {
	                firstCellObj.cell.style.borderLeft = "3px solid red";
	            }
	            Ext.Msg.show({
	                title: "校验失败！",
	                msg: validateResult.errMsg,
	                buttons: Ext.Msg.OK,
	                icon: Ext.Msg.ERROR
	            });
	            return;
	        }
	        else if (vmdreport.rptStore.validateRowErrRules[selectedId]) {
	            if (firstCellObj) {
	                firstCellObj.cell.style.borderLeft = "";
	            }
	            delete vmdreport.rptStore.validateRowErrRules[selectedId];
	        }
	    }

	    //行校验失败
	    if (!Ext.isEmptyObject(vmdreport.rptStore.validateRowErrRules)) {
	        for (var key in vmdreport.rptStore.validateRowErrRules) {
	            Ext.Msg.show({
	                title: "提示！",
	                msg: "数据集校验规则校验失败！原因：" + vmdreport.rptStore.validateRowErrRules[key].errMsg,
	                buttons: Ext.Msg.OK,
	                icon: Ext.Msg.INFO
	            });
	            return;
	        }
	    }

	    var fields = vmdreport.rptStore.fields;
	    var primaryKeys = vmdreport.rptStore.primaryItems.map(function (v) { return v.name });
	    var nonNullableKeys = vmdreport.rptStore.nonNullItems.map(function (v) { return v.name });

	    var validateResult = vmdreport.rptStore.validateUniqueAndNonNull(primaryKeys, nonNullableKeys);
	    if (validateResult.nullValue && validateResult.nullValue.length > 0) {
	        vmdreport.submitMask.hide();
	        if (vmdreport.simpleGrid) {
	            for (var i = 0; i < validateResult.nullValue.length; i++) {
	                var tmpNullValue = validateResult.nullValue[i];
	                var rowId = vmdreport.simpleGrid.grid.getRowId(tmpNullValue.pos[0]);
	                for (var j = 0; j < tmpNullValue.keys.length; j++) {
	                    var cInd = vmdreport.simpleGrid.columnIds.indexOf(tmpNullValue.keys[j]);
	                    if (cInd != -1 && (tmpNullValue.value[j] == "" || tmpNullValue.value[j] == null)) {
	                        vmdreport.simpleGrid.grid.validateCell(rowId, cInd, "NotEmpty", "", "", fields.map[tmpNullValue.keys[j]].cname + "不允许为空！");
	                    }
	                }
	            }
	        }
	        var infos = "存在空值的行索引：" + validateResult.nullValue.map(function (v) { return v.pos[0] }).join(",");
	        Ext.Msg.show({
	            title: "校验失败！",
	            msg: "非空列'" + vmdreport.rptStore.nonNullItems.map(function (v) { return v.cname || v.name }).join(",") + "'存在空值！",
	            buttons: Ext.Msg.OK,
	            icon: Ext.Msg.INFO
	        });
	        return;
	    }
	    if (validateResult.repeat && validateResult.repeat.length > 0) {
	        vmdreport.submitMask.hide();
	        var infos = "";
	        for (var i = 0; i < validateResult.repeat.length; i++) {
	            infos += "<br/>重复的行索引：" + validateResult.repeat[i].pos.join(",") + "；重复的数据：" + validateResult.repeat[i].value.join(",");
	        }
	        Ext.Msg.show({
	            title: "校验失败！",
	            msg: "主键列'" + vmdreport.rptStore.primaryItems.map(function (v) { return v.cname }).join(",") + "'存在重复！" + infos,
	            buttons: Ext.Msg.OK,
	            icon: Ext.Msg.INFO
	        });
	        return;
	    }

	    if (onlyReturnData) {
	        return vmdreport.rptStore.submit(success, error, true);
	    }
	    var dataSetName = vmdreport.inputConfig.layout.dataSet;
	    var vmdStore = Ext.StoreMgr.lookup(dataSetName);
	    if (vmdStore.getMSChangeDatas) {
	        var changeDatas = vmdStore.getMSChangeDatas();
			var urlConfig = {
				host: vmd.MicService.getDasIp(),
				url: 'DbDict/Save_Master_SlaveTable',//vmdStore.storeConfig.url,
				type:"orddas"
			};
			 hwDas.ajax({
                urlconfig: urlConfig,
                type: 'POST',
                timeout: 60000,
                params: {
                    Path: vmdStore.storeConfig.url
                },
				data:changeDatas,
				async:true,
				success:function(result){
					debugger
					if(vmdStore.submitMSChangeDatas)
						vmdStore.submitMSChangeDatas()
					Ext.Msg.show({
	                title: "提示！",
	                msg: "数据提交成功！",
	                buttons: Ext.Msg.OK,
	                icon: Ext.Msg.INFO
					});
				},
				error:function(result){debugger}
			 })	
	        console.log(changeDatas);
            return ;
	    }
	    vmdreport.submitMask.show();
	    vmdreport.rptStore.submit(success, error);
	},

    //report的打印
	print: function (options) {
	    var me = this;
	    me.simpleGrid.grid.clearSelection();
	    me.simpleGrid.print(options);
	},

	// 导出/另存为excel
	exportExcel: function (options) {
	    var vmdreport = this;

	    var exportName = (options && options.name) ||
            (/\/run\/report|run\/default/g.test(window.location.pathname) ? parent.getUrlParam("name") : window.name) + "_" + vmdreport.id;
	    var exportData = {
	        name: exportName,
	        fixedColCount: 0,
	        fixedRowCount: 1,
	        datatype: "store",
	        showColumns: [],
	        data: [],
	        style: {
	            heights: [],
	            widths: [],
	            aligns: {},
	            borders: {},
	            fonts: {}
	        },
	        tables: {}
	    };

	    var fields = vmdreport.rptStore.fields;
	    var showColumns = exportData.showColumns;
	    var columnWidths = [];
	    var heights = [];
	    if (vmdreport.simpleGrid) {
	        vmdreport.simpleGrid.aligns.each(function (key, _align, index) {
	            exportData.style.aligns[key] = _align.getJSON();
	        });
	        vmdreport.simpleGrid.borders.each(function (key, _border, index) {
	            exportData.style.borders[key] = _border.getJSON();
	        });
	        vmdreport.simpleGrid.fonts.each(function (key, _font, index) {
	            exportData.style.fonts[key] = _font.getJSON();
	        });
	        vmdreport.simpleGrid.queryDatastores.each(function (key, _store, index) {
	            if (_store.isRefresh) {
	                exportData.tables[key] = _store.cache[_store.paramsKey]
	            }
	        })
	        for (var i = 0; i < vmdreport.simpleGrid.columnIds.length ; i++) {
	            var fieldName = vmdreport.simpleGrid.columnIds[i];
	            showColumns.push({
	                fieldName: fieldName,
	                width: vmdreport.simpleGrid.colWidths[i],
	                nullable: (fields.map[fieldName]&&fields.map[fieldName].nullable)||true,
	                primary: (fields.map[fieldName]&&fields.map[fieldName].primary)||'Y',
                    sid: i
	            })
	        }
	        heights = vmdreport.simpleGrid.sections[0].originalMatrix.rows.map(function (v) { return v.height });
	    }

	    function containsColumn(fname){
	        for(var i = 0; i < showColumns.length; i++){
	            if(showColumns[i].fieldName == fname){
	                return true;
	            }
	        }
	        return false;
	    }
	    //要导出的列
	    for (var i = 0; i < fields.keys.length; i++) {
	        if (!containsColumn(fields.keys[i])) {
	            var fieldName = fields.keys[i];
	            showColumns.push({
	                fieldName: fieldName,
	                nullable: (fields.map[fieldName]&&fields.map[fieldName].nullable)||true,
	                primary: (fields.map[fieldName]&&fields.map[fieldName].primary)||'Y'
	            });
	        }
	    }

	    /***
        * 将html标签替换成转义字符
        */
	    function reverReplaceHtmltag(value) {
	        if (!value) {
	            return "";
	        }
	        if (!value.match) {
	            return value;
	        }
	        if (value.match(/<br[\/]*>/gi)) {
	            value = value.replace(/<br[\/]*>/gi, "\\n");
	        }
	        var supExp = /<sup>[\w\W]+<\/sup>/gi;
	        if (value.match(supExp)) {
	            value = value.replace(supExp, function (match) {
	                return match.replace(/<sup>/gi, "^").replace(/<\/sup>/gi, "");
	            })
	        }
	        var subExp = /<sub>[\w\W]+<\/sub>/gi;
	        if (value.match(subExp)) {
	            value = value.replace(subExp, function (match) {
	                return match.replace(/<sub>/gi, "_").replace(/<\/sub>/gi, "");
	            })
	        }
	        return value;
	    }

	    //组织表头数据
	    exportData.data[0] = [];
	    for (var i = 0; i < showColumns.length; i++) {
	        var c = showColumns[i];
	        if (c.sid != undefined) {
	            var oCell = vmdreport.simpleGrid.getOriginCellById("0_" + c.sid);
	            exportData.data[0].push({
	                fillcelltype: oCell.getType(),
	                data: reverReplaceHtmltag(oCell.data),
	                sid: oCell.id,
	                align: oCell.align,
	                border: oCell.border,
	                font: oCell.font,
	                colspan: 1,
	                rowspan: 1
	            });
	        }
	        else {
	            exportData.data[0].push({
	                fillcelltype: "ro",
	                data: (fields.map[c.fieldName]&&fields.map[c.fieldName].cname)||c.fieldName,
	                sid: "0_" + i,
	                align: "1",
	                border: "1",
	                font: "1",
	                colspan: 1,
	                rowspan: 1
	            });
	        }
	        exportData.style.widths[i] = c.width || 100;
	    }
	    exportData.style.heights.push(heights[0] || 32);
	    
	    var dataCount = vmdreport.rptStore.dhtmlxDatastore.dataCount();
	    for (var i = 0; i < dataCount; i++) {
	        var rows = [];
	        var item = vmdreport.rptStore.getItemByIndex(i);
	        for (var j = 0; j < showColumns.length; j++) {
	            var c = showColumns[j];
	            if (c.sid != undefined) {
	                var oCell = vmdreport.simpleGrid.getOriginCellById("1_" + c.sid);
	                var cellJSON = {
	                    fillcelltype: oCell.getType(),
	                    data: item[c.fieldName],
	                    sid: oCell.id,
	                    align: oCell.align,
	                    border: oCell.border,
	                    font: oCell.font,
	                    colspan: 1,
	                    rowspan: 1
	                }
	                var cellType = vmdreport.simpleGrid.cellTypes.get(oCell.fillcelltype);
	                if (cellType && (["vmdcombo", "vmdgrid", "vmdtree"].indexOf(cellType.getType()) != -1) && cellType.bindsource) {
	                    cellJSON.tablename = cellType.bindsource.tablename;
	                    cellJSON.showcolumn = cellType.bindsource.showcolumn.toLowerCase();
	                    cellJSON.valuecolumn = cellType.bindsource.valuecolumn.toLowerCase();
	                }
	                rows.push(cellJSON);
	            }
	            else {
	                rows.push({
	                    fillcelltype: "ro",
	                    data: item[c.fieldName],
	                    sid: "1_" + i,
	                    align: "1",
	                    border: "1",
	                    font: "1",
	                    colspan: 1,
	                    rowspan: 1
	                });
	            }
	        }
	        exportData.style.heights.push(heights[1] || 32);
	        exportData.data.push(rows);
			exportData.isForm=false;
	    }

	    var tablehost = vmd.MicService.getDasIp();
	    var reporthost = vmd.MicService.getReportIp();
	    var hwRao = new HwRao(reporthost || tablehost, "report");
	    hwRao.exportExcel(exportData);
	},
	
	//填报导入excel文件
	importExcel: function (sender) {
	    var vmdreport = this;
	    if (!vmdreport._importInputButton) {
	        var inputdiv = document.createElement("div");
	        inputdiv.id = "upload_excel_file_div";
	        document.body.appendChild(inputdiv);
	        inputdiv.style.hidden = "hidden";
	        var input =' <input type="file" id="upload_excel_file" hidden="hidden" >';
	        inputdiv.innerHTML = input;

	        var tablehost = vmd.MicService.getDasIp();
	        var reporthost = vmd.MicService.getReportIp();
	        var host = reporthost || tablehost;
	        var hwRao = new HwRao(host, "report");
	        var url = hwRao.getImportExcelUrl();
	        var excelInput = vmdreport._importInputButton = document.getElementById("upload_excel_file");
	        excelInput.url = url;
	        excelInput.click();
	        excelInput[-[1, ] ? "onchange" : "onpropertychange"] = function () {
	            var fd = new FormData();
	            fd.append("file", excelInput.files[0]);
	            var myMask = new Ext.LoadMask(Ext.getBody(), {
	                msg: "数据导入中,请稍后...",
	                msgCls: 'z-index:10000;'
	            });
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
	                success: function (result) {
	                    myMask.hide();
	                    if (!result.isSucceed) {
	                        Ext.Msg.show({
	                            title: "导入失败！",
	                            msg: result.errMsg,
	                            buttons: Ext.Msg.OK,
	                            icon: Ext.Msg.INFO
	                        });
	                        
	                        return;
	                    }
	                    vmdreport.rptStore.clear();
	                    vmdreport.rptStore.dhtmlxDatastore.parse(result.data.datas);

	                    //存储旧值
	                    for (var i = 0; i < result.data.total; i++) {
	                        var dataId = vmdreport.rptStore.dhtmlxDatastore.idByIndex(i);
	                        var item = vmdreport.rptStore.dhtmlxDatastore.item(dataId);
	                        //拷贝
	                        var oldItem = {};
	                        for (var key in item) {
	                            if (item.hasOwnProperty(key) && key != "id") {
	                                oldItem[key] = item[key];
	                            }
	                        }
	                        vmdreport.rptStore.dhtmlxDatastore.data.opull[dataId] = oldItem;
	                    }

	                    if (vmdreport.simpleGrid) {
	                        vmdreport.simpleGrid.totalcount = result.data.total;
	                    }
	                    if (vmdreport.freeGrid) {
	                        vmdreport.freeGrid.totalcount = result.data.total;
	                    }
	                    if (vmdreport.navBar) {
	                        vmdreport.navBar.setPageCount(result.data.total, 1);
	                    }
	                },
	                error: function (data) {
	                    myMask.hide();
	                    Ext.Msg.alert('提示', '导入失败！');
	                },
	                complete: function () {
	                    myMask.hide();
	                }
	            });
	        }
	    }
	    else {
	        vmdreport._importInputButton.value = "";
	        vmdreport._importInputButton.click();
	    }
	},

	query: function (callBack, showType) {
	    var vmdreport = this;
	    vmdreport.callBack = callBack;
	    vmdreport.myMask.show();
	    if (vmdreport.rptStore) {
	        var dataSetName = vmdreport.inputConfig.layout.dataSet;
	        var vmdStore = Ext.StoreMgr.lookup(dataSetName);

	        vmdStore.toRefresh();
	    }
	    else {
	        this.load(callBack);
	    }
	},

	/*
	 * newId：新行的id
	 * srcRowIndex: 要拷贝的行的索引
	 * insertInd: 插入的位置
	 * carrys
	 * alias
	 * data：vmdstore添加的数据
	 * isVmdStore:是否为vmdstore的add监听追加的数据
	 */
	addRow: function (newId, srcRowIndex, insertInd, carrys, alias, data,isVmdStore) {
	    var vmdreport = this;
	    var dataSetName = vmdreport.inputConfig.layout.dataSet;
	    var vmdStore = Ext.StoreMgr.lookup(dataSetName);
	    var dataCount = vmdreport.rptStore.dhtmlxDatastore.dataCount();
	    srcRowIndex = (srcRowIndex == undefined || srcRowIndex == null) ? (dataCount - 1) : srcRowIndex;
	    insertInd = (insertInd == undefined || insertInd == null) ? dataCount : insertInd;
	    alias = alias || 0;
	    var srcData = vmdreport.rptStore.getItemByIndex(srcRowIndex);
	    var newData = data || {};
	    if (!srcData) {
	        for (var i = 0; i < vmdStore.fields.keys.length; i++) {
	            var key = vmdStore.fields.keys[i];
	            var field = vmdStore.fields.map[key];
	            if(newData[key]) {} else {
					var defaultValue = field && field.defaultValue;
					if(defaultValue) {
						newData[key] = new Function("value", defaultValue + ';\nreturn value')(""); //eval("(function(){" + defaultValue + "\n})()");
					} else {
						newData[key] = "";
					}
				}
			}
	    }
	    else if(!data){
	        for (var key in srcData) {
	            if (srcData.hasOwnProperty(key)) {
	                var field = vmdStore.fields.map[key];
	                var defaultValue = field && field.defaultValue;
	                if (carrys) {
	                    newData[key] = srcData[key];
	                }
	                else if (defaultValue) {
	                    newData[key] = new Function("value", defaultValue + ';\nreturn value')(""); //eval("(function(){" + defaultValue + "\n})()");
	                }
	                else {
	                    newData[key] = "";
	                }
	            }
	        }
	    }

	    if (vmdreport.freeGrid) {
	        vmdreport.freeGrid.setDisabled(false);
	    }
	    newData.id = newId;
		//vmdreport.isVmdstoreAdd=isVmdStore
	    vmdreport.rptStore.addItem(newData, insertInd);
		//vmdreport.isVmdstoreAdd=false;
	    if (vmdreport.navBar) {
	        vmdreport.navBar.setPageCount(dataCount + 1, insertInd + alias);
	    }
	    if (vmdreport.simpleGrid) {
	        vmdreport.simpleGrid.totalcount = dataCount + 1;
			if(vmdreport.simpleGrid.grid)
				vmdreport.simpleGrid.resetCounter();
	    }
	    if (vmdreport.freeGrid) {
	        vmdreport.freeGrid.totalcount = dataCount + 1;
	    }
	    vmdreport.jumpToItem(insertInd + alias - 1);
	},

	deleteRow: function (rIndex) {
	    var vmdreport = this;
	    var dataId = vmdreport.rptStore.dhtmlxDatastore.idByIndex(rIndex);

	    for (var field in vmdreport.rptStore.validateFieldErrRules) {
	        for (var key in vmdreport.rptStore.validateFieldErrRules[field]) {
	            if (key.split("_")[0] == dataId) {
	                delete vmdreport.rptStore.validateFieldErrRules[field][key];
	            }
	        }
	        if (Ext.isEmptyObject(vmdreport.rptStore.validateFieldErrRules[field])) {
	            delete vmdreport.rptStore.validateFieldErrRules[field];
	        }
	    }
	    if (vmdreport.rptStore.validateRowErrRules[dataId]) {
	        delete vmdreport.rptStore.validateRowErrRules[dataId];
	    }
	    if (vmdreport.rptStore.dhtmlxDatastore.dataCount() == 1 && vmdreport.freeGrid) {
	        vmdreport.freeGrid.setDisabled(true);
	    }
	    vmdreport.rptStore.dhtmlxDatastore.remove(dataId);
	    var dataCount = vmdreport.rptStore.dhtmlxDatastore.dataCount();
	    if (dataCount == 0) {
	        return;
	    }
	    if (rIndex >= dataCount) {
	        rIndex = dataCount - 1;
	    }
	    this.simpleGrid && (this.simpleGrid.dataCursor = undefined);
	    this.freeGrid && (this.freeGrid.dataCursor = undefined);
	    if (vmdreport.navBar) {
	        vmdreport.navBar.setPageCount(dataCount, rIndex + 1);
	    }
	    vmdreport.jumpToItem(rIndex);
	    if(vmdreport.simpleGrid) {
	        vmdreport.simpleGrid.resetCounter();
	        //vmdreport.simpleGrid.initGrid();
	    }
	    
	},
	
    //下一条
	nextItem: function () {
	    if (this.simpleGrid) {
	        this.simpleGrid.nextItem();
	    }
	    if (this.freeGrid) {
	        this.freeGrid.nextItem();
	    }
	    var cursor = this.rptStore.getCursor();
	    if ((cursor + 1) >= 0 && (cursor + 1) < this.rptStore.count()) {
	        this.rptStore.setCursor(cursor + 1);
	    }
	},

    //上一条
	preItem: function () {
	    if (this.simpleGrid) {
	        this.simpleGrid.preItem();
	    }
	    if (this.freeGrid) {
	        this.freeGrid.preItem();
	    }
	    var cursor = this.rptStore.getCursor();
	    if ((cursor - 1) >= 0 && (cursor - 1) < this.rptStore.count()) {
	        this.rptStore.setCursor(cursor - 1);
	    }
	},

    //跳转到第几条
	jumpToItem: function (number) {
	    if (this.simpleGrid) {
	        this.simpleGrid.jumpToItem(number);
	    }
	    if (this.freeGrid) {
	        this.freeGrid.jumpToItem(number);
	    }
	    if (number >= 0 && number < this.rptStore.count()) {
	        this.rptStore.setCursor(number);
	    }
	},
	/**
	 *@desc
	 *@param btnNames{array} 指定的显示按钮，['add','del','save','export','import']
	**/
	showOperateBar:function(btnNames){
		
		this.editBar.showOperateBar(btnNames);
	}
})