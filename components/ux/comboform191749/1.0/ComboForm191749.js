Ext.ns('vmd.ux.comboForm')
vmd.ux.comboForm.Controller = Ext.extend(Ext.util.Observable, {
    constructor: function(options, containerobj) {
        this.opts = options.config
        // this.events=options.events;
        //this.oops=options;
        this.context.opts = $.extend(this._Defaultopts, options.config);
        Ext.apply(this.opts, options.config, this._Defaultopts)
        Ext.apply(this.events, options.events)
        this.oop = {}
        this.oop.opts = options.config
        //this.events = $.extend(this.events, options.events);
        //this=this;
        var htmlData = this._initTempl();
        if (containerobj) {
            containerobj.update(htmlData);
            this.container = $('#' + this.compId);
            //containerobj.container
            this.rootscope = containerobj;
        }
        this._initComboBox();
        this._attachForm();
        this._initEvent();
    },
    events: {},
    opts: {},
    context: {
        comboForm: null,
        opts: {}
    },
    _Defaultopts: {
        //compId:'defaultId',
        container: '',
        componentCls: 'ComboForm191749-defult'
    },
    //模板信息 用于组件页面布局,里面存的是 html Dom结构
    templateHtml: '<div id = "{{compId}}" class="{{compClass}}" style="{{compStyle}}">' +
        '<div class="myCombo" style="">' +
        '</div>' +
        '</div>',
    _initTempl: function() {
        var tmplConfig = {
            compClass: this.opts.componentCls,
            compStyle: "",
            GridStyle: "border:solid 1px",
            compId: this._guid()
        };
        if (this.opts.width) tmplConfig.compStyle += ';width:' + this.opts.ComboWidth + 'px';
        if (this.opts.height) tmplConfig.compStyle += ';height:25';
        if (this.opts.GridWidth) tmplConfig.GridStyle += ';width:' + this.opts.GridWidth + 'px';
        if (this.opts.GridHeight) tmplConfig.GridStyle += ';height:200px';
        //用JSON格式的 tmplConfig 替换templateHtml 中的变量 固定语法 
        var htmlstr = template.compile(this.templateHtml)(tmplConfig);
        //设置组件id
        this.compId = tmplConfig.compId;
        return htmlstr
    },
    _initComboBox: function() {
        //初始化 mycombo到 div
        var mycombo = new dhtmlXCombo(this.container.find(".myCombo")[0], "combo", this.opts.width);
        this.combo = mycombo;
        this.FormId = "myForm_" + this._guid();
        this.GridId = "myGrid_" + this._guid();
        this.SearchId = "mySearch_" + this._guid();
        this.container.find(".dhxcombo_input").attr({
            FormId: this.FormId,
            GridId: this.GridId,
            SearchId: this.SearchId
        });
    },
    _attachForm: function() {
        var Form_div = document.createElement("div");
        var Grid_div = document.createElement("div");
        var Search_div = document.createElement("div");
        $(Form_div).css({
            width: this.opts.GridWidth ? this.opts.GridWidth : this.opts.ComboWidth + "px", //如果界面没有传入GridWidth(属性面板没配置),默认宽度下拉框宽度
            height: this.opts.GridHeight ? this.opts.GridHeight : "200" + "px", //如果界面没有传入GridHeight(属性面板没配置),默认高度200
            left: this.container.offset().left + "px",
            top: (this.container.offset().top + this.container.height() + 1) + "px",
            position: "fixed",
            overflow: "hidden",
            border: "solid 1px #dfdfdf"
        }).attr("id", this.FormId).hide();
        //Grid
        $(Grid_div).css({
            width: this.opts.GridWidth ? this.opts.GridWidth : this.opts.ComboWidth + "px", //如果界面没有传入GridWidth(属性面板没配置),默认宽度下拉框宽度
            height: this.opts.SearchField ? $(Form_div).height() - 30 + "px" : $(Form_div).height() + "px",
            overflow: "hidden"
        }).attr("id", this.GridId);
        //检索栏
        $(Search_div).css({
            width: this.opts.GridWidth ? this.opts.GridWidth : this.opts.ComboWidth + "px", //如果界面没有传入GridWidth(属性面板没配置),默认宽度下拉框宽度
            height: "30px"
        }).attr("id", this.SearchId).addClass("Div_Search");
        Search_div.innerHTML = "检索:&nbsp;&nbsp;<input type='text'>";
        //添加到Dom
        document.body.appendChild(Form_div);
        Form_div.appendChild(Grid_div);
        Form_div.appendChild(Search_div);
        this.GridContainer = $(Form_div)
        this._SetGridOpts();
    },
    _initEvent: function() {
        var x, y;
        //获取鼠标当前位置
        $(document).mousemove(function(e) {
            Mousex = e.thatX;
            Mousey = e.thatY;
        });
        var that = this;
        //下拉框获得焦点显示下拉窗体、失去焦点隐藏下拉窗体
        console.info(this.container);
        this.container.find(".dhxcombo_input").on("click", function() {
            alert($(this).attr("FormId"));
            $('#' + $(this).attr("FormId")).show();
        }).on("blur", function() {
            that._IsInDiv(Mousex, Mousey);
        });
        //鼠标脱离下拉窗体范围隐藏下拉窗体
        this.GridContainer.on("mouseleave", function() {
            $(this).hide();
        });
        //搜索栏实时检索
        $('#' + that.context.SearchId + " input").bind("input propertychange", function() {
            that._filter($(this).val());
        });
        //选中Grid行更新 ComboText
        if (this.opts.MultiSelect) { //如果是多选模式、绑定 oncheckbox 事件
            this.grid.attachEvent("onCheckbox", function(rId, cInd, state) {
                var TextStr = "";
                var ValueStr = "";
                $.each(this.getCheckedRows(1).split(","), function(index, item) {
                    if (item) {
                        TextStr = TextStr + that.context.grid.datastore.data.pull[item][that.context.opts.displayField] + ",";
                        ValueStr = ValueStr + that.context.grid.datastore.data.pull[item][that.context.opts.valueField] + ",";
                    }
                });
                TextStr = TextStr.substring(0, TextStr.length - 1);
                ValueStr = ValueStr.substring(0, ValueStr.length - 1);
                that.context.combo.setComboText(TextStr);
                that.context.combo.setComboValue(ValueStr);
                //用于 getValue 和 getText 方法
                that.context.ComboValue = ValueStr;
                that.context.ComboText = TextStr;
                //绑定值变更事件
                that.context.events.onChange();
            });
        } else { //否则是单选事件 绑定 onRowSelect事件
            this.grid.attachEvent("onRowSelect", function(id, ind) {
                that.context.combo.setComboText(this.datastore.data.pull[id][that.context.opts.displayField]);
                that.context.combo.setComboValue(this.datastore.data.pull[id][that.context.opts.valueField]);
                //用于 getValue 和 getText 方法
                that.context.ComboValue = this.datastore.data.pull[id][that.context.opts.valueField];
                that.context.ComboText = this.datastore.data.pull[id][that.context.opts.displayField];
                that.context.GridContainer.hide();
                //绑定值变更事件
                that.context.events.onChange();
            });
        }
    },
    _IsInDiv: function(x, y) {
        var div = this.GridContainer; //获取你想要的DIV
        var y1 = div.offset().top; //div上面两个的点的y值
        var y2 = y1 + div.height(); //div下面两个点的y值
        var x1 = div.offset().left; //div左边两个的点的x值
        var x2 = x1 + div.width(); //div右边两个点的x的值
        if (x < x1 || x > x2 || y < y1 || y > y2) {
            this.GridContainer.hide();
        }
    },
    _SetGridOpts: function() {
        //处理传入的Grid属性拼接属性字符串 默认添加序号列
        var GridHeader = "&nbsp,";
        var ColumnIds = "xh,";
        var ColAlign = "center,";
        var ColWidths = "45,";
        var ColTypes = "cntr,";
        //如果支持多选、添加复选框列
        if (this.opts.MultiSelect) {
            GridHeader = "&nbsp;," + "#master_checkbox,";
            ColumnIds = "xh," + "chk,";
            ColAlign = "center," + "center,";
            ColWidths = "30," + "30,"
            ColTypes = "cntr," + "ch,";
        }
        this.opts.ColumnId = this.opts.ColumnId ? this.opts.ColumnId : "Column1,Column2,Column3";
        var ColumnCounts = this.opts.ColumnId.split(",").length;
        console.log(ColumnCounts);
        var TmpHeader = "";
        var TmpAlign = "";
        var TmpWidths = "";
        var TmpTypes = "";
        for (var i = 0; i < ColumnCounts; i++) {
            TmpHeader = TmpHeader + "Column" + i + ",";
            TmpAlign = TmpAlign + "left,";
            TmpWidths = TmpWidths + "100,";
            TmpTypes = TmpTypes + "ro,";
        }
        //拼接属性面板配置的属性,由于4组属性必须数量一致,所以如果数量不匹配 加载默认值 其中对齐方式 Align和 Type 默认未 left 和 ro
        ColumnIds += this.opts.ColumnId;
        ColAlign += TmpAlign;
        ColTypes += TmpTypes;
        if (this.opts.HeaderText && (this.opts.HeaderText.split(",").length == ColumnCounts)) {
            GridHeader += this.opts.HeaderText;
        } else {
            GridHeader += TmpHeader;
        }
        if (this.opts.ColumnWidth.split(",").length == ColumnCounts) {
            ColWidths += this.opts.ColumnWidth;
        } else {
            ColWidths += TmpWidths;
        }
        console.log(GridHeader);
        console.log(ColAlign);
        console.log(ColWidths);
        console.log(ColTypes);
        this.grid = new dhtmlXGridObject(this.container.find(".dhxcombo_input").attr("GridId"));
        this.grid.setImagePath("/lib/dhtmlx/codebase/imgs/");
        this.grid.setHeader(GridHeader);
        this.grid.setColumnIds(ColumnIds);
        this.grid.setColAlign(ColAlign);
        this.grid.setInitWidths(ColWidths);
        this.grid.setColTypes(ColTypes);
        this.grid.datastore = new dhtmlXDataStore();
        this.grid.sync(this.grid.datastore);
        //myGrid.enableMultiselect(true); //允许多选
        this.grid.init();
        //myGrid.datastore.parse(data);
        //this.grid = myGrid;
    },
    _SetGridData: function(data) {
        this.grid.datastore.clearAll();
        this.grid.datastore.parse(data);
    },
    _getValue: function() {
        return this.ComboValue;
    },
    _getText: function() {
        return this.ComboText;
    },
    _filter: function(searchKey) {
        var that = this;
        this.grid.datastore.filter(function(obj) {
            if (obj[that.context.opts.SearchField].toString().indexOf(searchKey) != -1) {
                return true;
            } else
                return false;
        });
    },
    _guid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    //外部调用方法
    SetGridData: function(data) {
        this._SetGridData(data);
    },
    getValue: function() {
        return this._getValue();
    },
    getText: function() {
        return this._getText();
    }
})
// Ext.define('vmd.ux.comboForm.Controller', {
//     xtype: 'vmd.ux.comboForm.Controller',
//     //构造函数 加载组件时自动调用
//     //上下文对象 用于存储 公共变量
//     constructor: function(options, containerobj) {
//     debugger      
//         this.opts = options.config
//       // this.events=options.events;
//         //this.oops=options;
//         this.context.opts = $.extend(this._Defaultopts, options.config);
//         Ext.apply(this.opts,options.config,this._Defaultopts)
//         Ext.apply(this.events,options.events)
//         this.oop={}
//         this.oop.opts=options.config
//         //this.events = $.extend(this.events, options.events);
//         //this=this;
//         var htmlData = this._initTempl();
//         if (containerobj) {
//             containerobj.update(htmlData);
//             this.container = $('#' + this.compId);
//             //containerobj.container
//             this.rootscope = containerobj;
//         }
//         this._initComboBox();
//         this._attachForm();
//         this._initEvent();
//     },
//     events: {},
//     opts:{},
//     context: {
//         comboForm: null,
//         opts: {}
//     },
//     _Defaultopts: {
//         //compId:'defaultId',
//         container: '',
//         componentCls: 'ComboForm191749-defult'
//     },
//     //模板信息 用于组件页面布局,里面存的是 html Dom结构
//     templateHtml: '<div id = "{{compId}}" class="{{compClass}}" style="{{compStyle}}">' +
//         '<div class="myCombo" style="">' +
//         '</div>' +
//         '</div>',
//     _initTempl: function() {
//         var tmplConfig = {
//             compClass: this.opts.componentCls,
//             compStyle: "",
//             GridStyle: "border:solid 1px",
//             compId: this._guid()
//         };
//         if (this.opts.width) tmplConfig.compStyle += ';width:' + this.opts.ComboWidth + 'px';
//         if (this.opts.height) tmplConfig.compStyle += ';height:25';
//         if (this.opts.GridWidth) tmplConfig.GridStyle += ';width:' + this.opts.GridWidth + 'px';
//         if (this.opts.GridHeight) tmplConfig.GridStyle += ';height:200px';
//         //用JSON格式的 tmplConfig 替换templateHtml 中的变量 固定语法 
//         var htmlstr = template.compile(this.templateHtml)(tmplConfig);
//         //设置组件id
//         this.compId = tmplConfig.compId;
//         return htmlstr
//     },
//     _initComboBox: function() {
//         //初始化 mycombo到 div
//         var mycombo = new dhtmlXCombo(this.container.find(".myCombo")[0], "combo", this.opts.width);
//         this.combo = mycombo;
//         this.FormId = "myForm_" + this._guid();
//         this.GridId = "myGrid_" + this._guid();
//         this.SearchId = "mySearch_" + this._guid();
//         this.container.find(".dhxcombo_input").attr({
//             FormId: this.FormId,
//             GridId: this.GridId,
//             SearchId: this.SearchId
//         });
//     },
//     _attachForm: function() {
//         var Form_div = document.createElement("div");
//         var Grid_div = document.createElement("div");
//         var Search_div = document.createElement("div");
//         $(Form_div).css({
//             width: this.opts.GridWidth ? this.opts.GridWidth : this.opts.ComboWidth + "px", //如果界面没有传入GridWidth(属性面板没配置),默认宽度下拉框宽度
//             height: this.opts.GridHeight ? this.opts.GridHeight : "200" + "px", //如果界面没有传入GridHeight(属性面板没配置),默认高度200
//             left: this.container.offset().left + "px",
//             top: (this.container.offset().top + this.container.height() + 1) + "px",
//             position: "fixed",
//             overflow: "hidden",
//             border: "solid 1px #dfdfdf"
//         }).attr("id", this.FormId).hide();
//         //Grid
//         $(Grid_div).css({
//             width: this.opts.GridWidth ? this.opts.GridWidth : this.opts.ComboWidth + "px", //如果界面没有传入GridWidth(属性面板没配置),默认宽度下拉框宽度
//             height: this.opts.SearchField ? $(Form_div).height() - 30 + "px" : $(Form_div).height() + "px",
//             overflow: "hidden"
//         }).attr("id", this.GridId);
//         //检索栏
//         $(Search_div).css({
//             width: this.opts.GridWidth ? this.opts.GridWidth : this.opts.ComboWidth + "px", //如果界面没有传入GridWidth(属性面板没配置),默认宽度下拉框宽度
//             height: "30px"
//         }).attr("id", this.SearchId).addClass("Div_Search");
//         Search_div.innerHTML = "检索:&nbsp;&nbsp;<input type='text'>";
//         //添加到Dom
//         document.body.appendChild(Form_div);
//         Form_div.appendChild(Grid_div);
//         Form_div.appendChild(Search_div);
//         this.GridContainer = $(Form_div)
//         this._SetGridOpts();
//     },
//     _initEvent: function() {
//         var x, y;
//         //获取鼠标当前位置
//         $(document).mousemove(function(e) {
//             Mousex = e.thatX;
//             Mousey = e.thatY;
//         });
//         var that = this;
//         //下拉框获得焦点显示下拉窗体、失去焦点隐藏下拉窗体
//         console.info(this.container);
//         this.container.find(".dhxcombo_input").on("click", function() {
//             alert($(this).attr("FormId"));
//             $('#' + $(this).attr("FormId")).show();
//         }).on("blur", function() {
//             that._IsInDiv(Mousex, Mousey);
//         });
//         //鼠标脱离下拉窗体范围隐藏下拉窗体
//         this.GridContainer.on("mouseleave", function() {
//             $(this).hide();
//         });
//         //搜索栏实时检索
//         $('#' + that.context.SearchId + " input").bind("input propertychange", function() {
//             that._filter($(this).val());
//         });
//         //选中Grid行更新 ComboText
//         if (this.opts.MultiSelect) { //如果是多选模式、绑定 oncheckbox 事件
//             this.grid.attachEvent("onCheckbox", function(rId, cInd, state) {
//                 var TextStr = "";
//                 var ValueStr = "";
//                 $.each(this.getCheckedRows(1).split(","), function(index, item) {
//                     if (item) {
//                         TextStr = TextStr + that.context.grid.datastore.data.pull[item][that.context.opts.displayField] + ",";
//                         ValueStr = ValueStr + that.context.grid.datastore.data.pull[item][that.context.opts.valueField] + ",";
//                     }
//                 });
//                 TextStr = TextStr.substring(0, TextStr.length - 1);
//                 ValueStr = ValueStr.substring(0, ValueStr.length - 1);
//                 that.context.combo.setComboText(TextStr);
//                 that.context.combo.setComboValue(ValueStr);
//                 //用于 getValue 和 getText 方法
//                 that.context.ComboValue = ValueStr;
//                 that.context.ComboText = TextStr;
//                 //绑定值变更事件
//                 that.context.events.onChange();
//             });
//         } else { //否则是单选事件 绑定 onRowSelect事件
//             this.grid.attachEvent("onRowSelect", function(id, ind) {
//                 that.context.combo.setComboText(this.datastore.data.pull[id][that.context.opts.displayField]);
//                 that.context.combo.setComboValue(this.datastore.data.pull[id][that.context.opts.valueField]);
//                 //用于 getValue 和 getText 方法
//                 that.context.ComboValue = this.datastore.data.pull[id][that.context.opts.valueField];
//                 that.context.ComboText = this.datastore.data.pull[id][that.context.opts.displayField];
//                 that.context.GridContainer.hide();
//                 //绑定值变更事件
//                 that.context.events.onChange();
//             });
//         }
//     },
//     _IsInDiv: function(x, y) {
//         var div = this.GridContainer; //获取你想要的DIV
//         var y1 = div.offset().top; //div上面两个的点的y值
//         var y2 = y1 + div.height(); //div下面两个点的y值
//         var x1 = div.offset().left; //div左边两个的点的x值
//         var x2 = x1 + div.width(); //div右边两个点的x的值
//         if (x < x1 || x > x2 || y < y1 || y > y2) {
//             this.GridContainer.hide();
//         }
//     },
//     _SetGridOpts: function() {
//         //处理传入的Grid属性拼接属性字符串 默认添加序号列
//         var GridHeader = "&nbsp,";
//         var ColumnIds = "xh,";
//         var ColAlign = "center,";
//         var ColWidths = "45,";
//         var ColTypes = "cntr,";
//         //如果支持多选、添加复选框列
//         if (this.opts.MultiSelect) {
//             GridHeader = "&nbsp;," + "#master_checkbox,";
//             ColumnIds = "xh," + "chk,";
//             ColAlign = "center," + "center,";
//             ColWidths = "30," + "30,"
//             ColTypes = "cntr," + "ch,";
//         }
//         this.opts.ColumnId = this.opts.ColumnId ? this.opts.ColumnId : "Column1,Column2,Column3";
//         var ColumnCounts = this.opts.ColumnId.split(",").length;
//         console.log(ColumnCounts);
//         var TmpHeader = "";
//         var TmpAlign = "";
//         var TmpWidths = "";
//         var TmpTypes = "";
//         for (var i = 0; i < ColumnCounts; i++) {
//             TmpHeader = TmpHeader + "Column" + i + ",";
//             TmpAlign = TmpAlign + "left,";
//             TmpWidths = TmpWidths + "100,";
//             TmpTypes = TmpTypes + "ro,";
//         }
//         //拼接属性面板配置的属性,由于4组属性必须数量一致,所以如果数量不匹配 加载默认值 其中对齐方式 Align和 Type 默认未 left 和 ro
//         ColumnIds += this.opts.ColumnId;
//         ColAlign += TmpAlign;
//         ColTypes += TmpTypes;
//         if (this.opts.HeaderText&&(this.opts.HeaderText.split(",").length == ColumnCounts)) {
//             GridHeader += this.opts.HeaderText;
//         } else {
//             GridHeader += TmpHeader;
//         }
//         if (this.opts.ColumnWidth.split(",").length == ColumnCounts) {
//             ColWidths += this.opts.ColumnWidth;
//         } else {
//             ColWidths += TmpWidths;
//         }
//         console.log(GridHeader);
//         console.log(ColAlign);
//         console.log(ColWidths);
//         console.log(ColTypes);
//         this.grid = new dhtmlXGridObject(this.container.find(".dhxcombo_input").attr("GridId"));
//         this.grid.setImagePath("/lib/dhtmlx/codebase/imgs/");
//         this.grid.setHeader(GridHeader);
//         this.grid.setColumnIds(ColumnIds);
//         this.grid.setColAlign(ColAlign);
//         this.grid.setInitWidths(ColWidths);
//         this.grid.setColTypes(ColTypes);
//         this.grid.datastore = new dhtmlXDataStore();
//         this.grid.sync(this.grid.datastore);
//         //myGrid.enableMultiselect(true); //允许多选
//         this.grid.init();
//         //myGrid.datastore.parse(data);
//         //this.grid = myGrid;
//     },
//     _SetGridData: function(data) {
//         this.grid.datastore.clearAll();
//         this.grid.datastore.parse(data);
//     },
//     _getValue: function() {
//         return this.ComboValue;
//     },
//     _getText: function() {
//         return this.ComboText;
//     },
//     _filter: function(searchKey) {
//         var that = this;
//         this.grid.datastore.filter(function(obj) {
//             if (obj[that.context.opts.SearchField].toString().indexOf(searchKey) != -1) {
//                 return true;
//             } else
//                 return false;
//         });
//     },
//     _guid: function() {
//         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//             var r = Math.random() * 16 | 0,
//                 v = c == 'x' ? r : (r & 0x3 | 0x8);
//             return v.toString(16);
//         });
//     },
//     //外部调用方法
//     SetGridData: function(data) {
//         this._SetGridData(data);
//     },
//     getValue: function() {
//         return this._getValue();
//     },
//     getText: function() {
//         return this._getText();
//     }
// })
Ext.define("vmd.ux.ComboForm191749", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ComboForm191749",
    title: "Panel",
    header: false,
    border: false,
    width: 250,
    height: 31,
    layout: "auto",
    autoHeight: false,
    afterrender: "ComboForm191749_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.ComboForm191749_afterrender(this)
        }
    },
    uxrequirecss: "[\"components/ux/comboform191749/1.0/css/ComboForm.css\"]",
    uxrequirejs: "[\"components/ux/comboform191749/1.0/js/Template-web.js\"]",
    initComponent: function() {
        function resetCmpScope() {
            var cmpList = me._reloadCmpList;
            Ext.each(cmpList, function(name) {
                var cmpObj = eval(name);
                cmpObj && (cmpObj._beforeRender = function(_cmp) {
                    var id = vmd.core.getCmpId(_cmp);
                    id && eval(id + "= _cmp")
                })
            })
        }
        if (Ext.isString(this.GridStore)) this.GridStore = new Ext.data.JsonStore()
        var thisComboForm191749;
        var page = this;

        function ComboForm191749_afterrender(sender) {
            thisComboForm191749 = page.controller = new vmd.ux.comboForm.Controller({
                config: {
                    //初始化组件配置项,constructor用
                    ComboWidth: page.width, //下拉框宽度
                    ComboHeight: page.height, //下拉框高度 固定25px
                    GridWidth: page.GridWidth, //下拉窗体宽度 默认和combo宽度一致
                    GridHeight: page.GridHeight, //下拉窗体高度
                    ColumnId: page.ColumnId ? page.ColumnId : "",
                    HeaderText: page.HeaderText ? page.HeaderText : "", //表头文本
                    ColumnWidth: page.ColumnWidth ? page.ColumnWidth : "", //默认列宽
                    MultiSelect: page.MultiSelect, //判断是否开启多选
                    displayField: page.DisplayField,
                    valueField: page.ValueField,
                    SearchField: page.SearchField,
                    GridStore: page.GridStore
                },
                events: {
                    onChange: function() {
                        page.fireEvent('onChange', page, thisComboForm191749.getValue(), thisComboForm191749.getText());
                    }
                }
            }, sender);
            //初始化下拉窗数据
            if (page.GridStore) {
                var store = page.GridStore;
                var dhxData = [];
                //通过id或store对象 找一个已登记的数据集
                store = Ext.StoreMgr.lookup(store);
                //数据集在加载 或者 刷新时候添加事件重新初始化下窗体数据
                store.on({
                    scope: this,
                    datachanged: function() {
                        var Records = page.GridStore.getRange();
                        //dhtmlx store数组  将ext数据集转换成 dhtmlx的数据集
                        var dhxdata = [];
                        for (var i = 0; i < Records.length; i++) {
                            dhxdata.push(Records[i].data);
                        }
                        page
                        thisComboForm191749.SetGridData(dhxdata);
                        //console.info(dhxdata);
                    }
                });
            }
            var body = Ext.getBody();
            body.on('click', function(e) {})
        }
        this.ComboForm191749_afterrender = ComboForm191749_afterrender;
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getComboValue = function() {
            return thisComboForm191749.getValue()
        }
        this.getComboText = function() {
            return thisComboForm191749.getText();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ComboForm191749");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ComboForm191749");
    }
})