Ext.define('hw.comps.tech.ListSelector', {
    xtype: 'hw.comps.tech.ListSelector',
    tmpl: '<div class="{{compClass}}" style="{{compStyle}}" id="{{compId}}">' +
        '<div class="tree-container"></div>' +
        '<div class="list-container">' +
        '<div class="list-title"></div>' +
        '<div class="list-searchbar">' +
        '<input type="text" />' +
        '<img class="searchbar-icon" src="/components/ux/listselectortcomponent/1.0/img/query.png"/>' +
        '</div>' +
        '<div class="list-grid"></div>' +
        '</div>' +
        '<div class="button-container">' +
        '<button class="list-select">></button><button class="list-unselect"><</button>' +
        '<button class="list-selectall">>></button><button class="list-unselectall"><<</button>' +
        '</div>' +
        '<div class="list2-container">' +
        '<div class="list2-title"></div>' +
        '<div class="list2-grid"></div>' +
        '</div>' +
        '</div>',
    defaultOpts: { //默认配置项
        options: {
            /*容器属性*/
            container: '',
            width: 500,
            height: 300,
            /*样式属性*/
            componentCls: 'listselector-default',
            /*功能属性*/
            //树组件
            showTree: false, //是否展示树
            parentField: '', //父节点字段
            valueField: '', //值字段
            displayField: '', //显示字段
            folderIcon: '', //文件夹图标
            leafIcon: '', //叶子节点图标
            allowCheckbox: false, //是否展示复选框
            showRoot: false, //展示根节点
            rootText: '', //根节点名称
            rootValue: '', //根节点值
            //待选列表
            unSelectedTitle: '', //标题
            allowSearchbar: false, //是否展示搜索栏
            searchbarPlaceholder: '', //搜索栏placeholder
            searchField: '', //搜索用字段
            headers: '', //列表表头(英文逗号分隔)
            columnIds: '', //表列ID(英文逗号分隔)
            colWidth: '', //列宽(英文逗号分隔)
            colAlign: '', //列对齐方式(英文逗号分隔)
            associateId: 'id', //关联ID
            //已选列表
            selectedTitle: '' //标题
        },
        events: {}
    },
    //构造函数，默认初始化组件
    constructor: function(options, containerobj) {
        this.context = {
            tree: null, //树组件
            list: null, //待选列表
            list2: null //已选列表
        }
        this.context.opts = $.extend({}, this.defaultOpts.options, options.options);
        this.context.events = $.extend({}, this.defaultOpts.options, options.events);
        //编译模板
        var htmldata = this._initTmpl();
        //渲染到容器中
        if (containerobj) {
            this.context.env = 'vmd';
            containerobj.update(htmldata);
            this.context.container = $("#" + this.context.compId);
            this._init(containerobj);
        } else if (this.context.opts.container) {
            this.context.env = 'dev';
            this.context.container.html(htmldata);
            this.context.container = typeof(this.context.opts.container) == "object" ? $(this.context.opts.container) : $("#" + this.context.opts.container);
            var container = {};
            container.lastSize = {
                height: this.context.container.height(),
                width: this.context.container.width()
            };
            this._init(container);
        }
    },
    //初始化模板
    _initTmpl: function() {
        var tmplconf = {
            // compClass: this.context.opts.componentCls,
            compClass: this.context.opts.skin,
            compStyle: '',
            compId: this._guid(),
            compLabelText: this.context.opts.labelText,
            compSpace: this.context.opts.labelInputMargin ? 'width:' + this.context.opts.labelInputMargin + 'px' : '',
            compPlaceholder: this.context.opts.inputPlaceholder,
            compReadonly: this.context.opts.readonly ? 'readonly="true"' : ''
        };
        if (this.context.opts.with) tmplconf.compstyle += ';width:' + this.context.opts.with + 'px';
        if (this.context.opts.height) tmplconf.compstyle += ';height:' + this.context.opts.height + 'px';
        if (this.context.opts.lineHeight) tmplconf.compstyle += ';line-height:' + this.context.opts.lineHeight + 'px';
        var htmldata = template.compile(this.tmpl)(tmplconf);
        this.context.compId = tmplconf.compId; //设置组件id
        return htmldata;
    },
    _init: function(containerobj) {
        //左侧树组件
        var btnWidth = 50;
        var listWidth = 0; //列表宽度
        var listHeight = containerobj.lastSize.height; //列表高度
        //是否展示树组件
        if (this.context.opts.showTree) {
            listWidth = (containerobj.lastSize.width - 50 - 25) / 3;
            this.context.container.find(".tree-container").width(listWidth).height(listHeight);
            //渲染树
            this._initTree();
        } else {
            listWidth = (containerobj.lastSize.width - 50 - 10) / 2;
            this.context.container.find(".tree-container").remove();
        }
        //待选列表
        this.context.container.find(".list-container").width(listWidth).height(listHeight);
        //根据配置展示搜索栏
        var unSelectedHeight = listHeight;
        var selectedHieght = listHeight;
        if (this.context.opts.allowSearchbar) {
            this.context.container.find(".list-searchbar").width(listWidth - 2)
            this.context.container.find(".list-searchbar input").width(listWidth - 12).attr('placeholder', this.context.opts.searchbarPlaceholder);
            unSelectedHeight = listHeight - 30 - 3;
        } else {
            this.context.container.find(".list-searchbar").remove();
            unSelectedHeight = listHeight;
        }
        //根据配置展示待选、已选标题
        if (this.context.opts.unSelectedTitle) {
            unSelectedHeight -= 30;
            this.context.container.find(".list-title").html(this.context.opts.unSelectedTitle).show();
        }
        if (this.context.opts.selectedTitle) {
            selectedHieght -= 30;
            this.context.container.find(".list2-title").html(this.context.opts.selectedTitle).show();
        }
        this.context.container.find(".list-grid").width(listWidth).height(unSelectedHeight - 2);
        //按钮 按钮部分总高度135px,垂直居中需要(总高度-135)/2 的margin-top
        this.context.container.find(".button-container").width(34).height(135).css("margin-top", (listHeight - 135) / 2);
        //已选列表
        this.context.container.find(".list2-container").width(listWidth).height(listHeight);
        this.context.container.find(".list2-grid").width(listWidth - 1).height(selectedHieght - 2);
        //初始化待选、已选列表
        this._initList();
        //初始化事件绑定
        this._initEvent();
    },
    //初始化树组件
    _initTree: function() {
        var tree = new dhtmlXTreeObject(this.context.container.find(".tree-container")[0], '100%', '100%', 0);
        tree.setSkin('dhx_skyblue');
        tree.setImagePath("/lib/dhtmlx/imgs/dhxtree_material/");
        tree.enableDragAndDrop(true);
        //是否展示复选框
        if (this.context.opts.allowCheckbox) {
            tree.enableCheckBoxes(true);
            tree.enableThreeStateCheckboxes(true);
            //选中文本自动选中复选框
            var that = this;
            tree.attachEvent("onClick", function(id) {
                if (that.context.tree.isItemChecked(id)) {
                    that.context.tree.setCheck(id, 0);
                } else {
                    that.context.tree.setCheck(id, 1);
                }
            });
        }
        //是否展示根节点
        if (this.context.opts.showRoot) {
            tree.loadJSArray([
                [this.context.opts.rootValue != '' ? this.context.opts.rootValue : 'root', 0, this.context.opts.rootText != '' ? this.context.opts.rootText : '根节点']
            ]);
        }
        this.context.tree = tree;
    },
    //加载树组件数据
    _setTreeData: function(data) {
        if (!this.context.opts.showTree) return;
        //数据转换 二维表转数组
        var treeData = [];
        var that = this;
        //是否展示根节点
        //先清空为设计模式添加的父节点，防止重复
        this.context.tree.deleteChildItems(0);
        if (that.context.opts.showRoot) {
            treeData.push([this.context.opts.rootValue != '' ? this.context.opts.rootValue : 'root', 0, this.context.opts.rootText != '' ? this.context.opts.rootText : '根节点']);
            $.each(data, function(index, item) {
                if (item[that.context.opts.parentField] == 0) {
                    item[that.context.opts.parentField] = that.context.opts.rootValue != '' ? that.context.opts.rootValue : 'root';
                }
                treeData.push([item[that.context.opts.valueField], item[that.context.opts.parentField], item[that.context.opts.displayField]]);
            })
        } else {
            $.each(data, function(index, item) {
                treeData.push([item[that.context.opts.valueField], item[that.context.opts.parentField], item[that.context.opts.displayField]]);
            })
        }
        this.context.tree.loadJSArray(treeData);
    },
    //初始化待选列表及已选列表
    _initList: function() {
        //待选列表
        var mygrid = new dhtmlXGridObject(this.context.container.find(".list-container .list-grid")[0]);
        mygrid.setImagePath("../../../codebase/imgs/");
        //已选列表
        var mygrid2 = new dhtmlXGridObject(this.context.container.find(".list2-container .list2-grid")[0]);
        mygrid2.setImagePath("../../../codebase/imgs/");
        var columnCount = 1;
        //根据配置展示表头
        if (this.context.opts.columnIds && this.context.opts.columnIds.length > 0) {
            columnCount = this.context.opts.columnIds.split(/,/g).length;
        }
        var colTypes = "ro";
        var colSorting = "str";
        var colAlign = "center";
        var colWidth = "*";
        var colTitle = "标题";
        //根据列数拼接参数
        var tempColTypes = [];
        var tempColAlign = [];
        var tempColSorting = [];
        var tempWidth = [];
        var tempTitle = [];
        if (columnCount > 1) {
            for (var i = columnCount; i > 0; i--) {
                tempColTypes.push(colTypes);
                tempColSorting.push(colSorting);
                tempColAlign.push("center");
                tempTitle.push(colTitle);
                if (i == 0) {
                    tempWidth.push(this.context.container.find(".list-container .list-grid") / columnCount);
                } else {
                    tempWidth.push("*");
                }
            }
            mygrid.setInitWidths(this.context.opts.colWidth ? this.context.opts.colWidth : tempWidth.join(','));
            mygrid.setColAlign(this.context.opts.colAlign ? this.context.opts.colAlign : tempColAlign.join(','));
            mygrid.setHeader(this.context.opts.headers ? this.context.opts.headers : tempTitle.join(','));
            mygrid2.setInitWidths(this.context.opts.colWidth ? this.context.opts.colWidth : tempWidth.join(','));
            mygrid2.setColAlign(this.context.opts.colAlign ? this.context.opts.colAlign : tempColAlign.join(','));
            mygrid2.setHeader(this.context.opts.headers ? this.context.opts.headers : tempTitle.join(','));
        } else {
            mygrid.setInitWidths(this.context.opts.colWidth ? this.context.opts.colWidth : colWidth);
            mygrid.setColAlign(this.context.opts.colAlign ? this.context.opts.colAlign : colAlign);
            mygrid.setHeader(colTitle);
            mygrid2.setInitWidths(this.context.opts.colWidth ? this.context.opts.colWidth : colWidth);
            mygrid2.setColAlign(this.context.opts.colAlign ? this.context.opts.colAlign : colAlign);
            mygrid2.setHeader(colTitle);
        }
        mygrid.setColTypes(tempColTypes.length ? tempColTypes.join(',') : colTypes);
        mygrid.setColSorting(tempColAlign.length ? tempColAlign.join(',') : colSorting);
        mygrid.setColumnIds(this.context.opts.columnIds);
        mygrid.enableMultiselect(true); //允许多选
        mygrid2.setColTypes(tempColTypes.length ? tempColTypes.join(',') : colTypes);
        mygrid2.setColSorting(tempColAlign.length ? tempColAlign.join(',') : colSorting);
        mygrid2.setColumnIds(this.context.opts.columnIds);
        mygrid2.enableMultiselect(true); //允许多选
        mygrid.init();
        mygrid2.init();
        //如果未配置header则隐藏表头
        if (!(this.context.opts.headers && this.context.opts.headers.length > 0)) {
            this.context.container.find(".xhdr").hide();
            //单独处理待选表格和已选表格
            this.context.container.find(".list-grid .objbox").height(this.context.container.find(".list-grid .objbox").height() + 32).css("overflow-x", "hidden");
            this.context.container.find(".list2-grid .objbox").height(this.context.container.find(".list2-grid .objbox").height() + 32).css("overflow-x", "hidden");
        }
        /*初始化datastore*/
        mygrid.datastore = new dhtmlXDataStore();
        mygrid2.datastore = new dhtmlXDataStore();
        //绑定数据集更新事件，进行待选列表过滤使用
        var that = this;
        mygrid.datastore.attachEvent("onXLE", function(id, data, mode) {
            //重新加载数据，先清空搜索栏
            that.context.container.find('.list-searchbar input').val()
            //过滤
            that._filter();
        });
        mygrid2.datastore.attachEvent("onXLE", function(id, data, mode) {
            //过滤
            that._filter();
        });
        //左选右时触发
        mygrid2.datastore.attachEvent("onAfterAdd", function(id, data, mode) {
            //过滤
            that._filter();
        });
        //右选左时触发
        mygrid2.datastore.attachEvent("onAfterDelete", function(id, data, mode) {
            //过滤
            that._filter();
        });
        /*关联*/
        mygrid.sync(mygrid.datastore);
        mygrid2.sync(mygrid2.datastore);
        this.context.list = mygrid;
        this.context.selectedList = mygrid2;
    },
    //过滤待选、已选列表
    _filter: function() {
        //判断待选列表的条目是否在已选列表，如果存在则使用过滤器过滤
        var that = this;
        this.context.list.datastore.filter(function(obj) {
            //右侧不存在，左侧存在的需要回复显示
            if (that.context.selectedList.datastore.exists(obj.id)) {
                return false;
            } else {
                //如果有关键字过滤，则需要先判断是否需要过滤
                var searchKey = that.context.container.find('.list-searchbar input').val()
                if (that.context.opts.searchField && that.context.opts.searchField.length > 0) {
                    that.context.opts.searchField = that.context.opts.searchField ? that.context.opts.searchField : that.context.opts.columnIds.split(/,/g)[0];
                }
                // that.context.list.datastore.filter(that.context.opts.searchField, searchKey);
                //如果录入了关键字，则匹配的展示，不匹配的不展示
                if (searchKey && searchKey.length > 0) {
                    if (obj[that.context.opts.searchField].indexOf(searchKey) != -1) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            }
        });
    },
    //设置待选列表数据
    _setListData: function(data) {
        this.context.list.datastore.clearAll();
        this.context.list.datastore.parse(data);
    },
    //设置已选列表数据
    _setSelectedListData: function(data) {
        this.context.selectedList.datastore.clearAll();
        this.context.selectedList.datastore.parse(data);
    },
    //绑定事件
    _initEvent: function() {
        var that = this;
        //树组件
        if (this.context.opts.showTree) {
            //选中事件
            if (this.context.opts.allowCheckbox) {
                //选中文本自动选中复选框
                var that = this;
                this.context.tree.attachEvent("onClick", function(id) {
                    if (Object.prototype.toString.call(that.context.events.onTreeSelect) === '[object Function]') {
                        that.context.events.onTreeSelect(id);
                    }
                    if (Object.prototype.toString.call(that.context.events.onTreeChecked) === '[object Function]') {
                        that.context.events.onTreeChecked(that.context.tree.getAllChecked());
                    }
                });
                this.context.tree.attachEvent("onCheck", function(id) {
                    if (Object.prototype.toString.call(that.context.events.onTreeChecked) === '[object Function]') {
                        that.context.events.onTreeChecked(that.context.tree.getAllChecked());
                    }
                });
            } else {
                //选中文本自动选中复选框
                var that = this;
                this.context.tree.attachEvent("onClick", function(id) {
                    if (Object.prototype.toString.call(that.context.events.onTreeSelect) === '[object Function]') {
                        that.context.events.onTreeSelect(id);
                    }
                });
            }
            //树节点右击
            this.context.tree.attachEvent("onRightClick", function(id, ev) {
                if (Object.prototype.toString.call(that.context.events.onTreeRightClick) === '[object Function]') {
                    that.context.events.onTreeRightClick(id);
                }
            });
            //树节点双击
            this.context.tree.attachEvent("onDblClick", function(id) {
                if (Object.prototype.toString.call(that.context.events.onTreeDbClick) === '[object Function]') {
                    that.context.events.onTreeDbClick(id);
                }
            });
        }
        //待选列表
        //点击搜索按钮搜索 
        that.context.container.find('.searchbar-icon').on('click', function() {
            //过滤
            that._filter();
        });
        //双击
        that.context.list.attachEvent("onRowDblClicked", function(rId, cInd) {
            that.context.selectedList.datastore.add(that.context.list.datastore.item(rId));
            if (Object.prototype.toString.call(that.context.events.onSelect) === '[object Function]') {
                that.context.events.onSelect(that.getSelectedList());
            }
        });
        //选中后按钮点击按钮
        that.context.container.find(".list-select,.list-selectall").on('click', function() {
            //获取选中的列表id
            if (this.className.indexOf('list-selectall') != -1) {
                that.context.list.selectAll();
            }
            var selectList = that.context.list.getSelectedRowId().split(/,/g);
            //将datastore中选中的待选项添加到已选列表
            $.each(that.context.list.datastore.data.pull, function(index, item) {
                $.each(selectList, function(ind, ite) {
                    if (item.id == ite) {
                        that.context.selectedList.datastore.add(that.context.list.datastore.item(item.id));
                    }
                })
            })
            if (Object.prototype.toString.call(that.context.events.onSelect) === '[object Function]') {
                that.context.events.onSelect(that.getSelectedList());
            }
        });
        //已选列表
        //双击
        that.context.selectedList.attachEvent("onRowDblClicked", function(rId, cInd) {
            var unSelectList = []; //反选列表
            //将datastore中选中的已选项添加到待选列表，并删除已选
            $.each(that.context.selectedList.datastore.data.pull, function(index, item) {
                if (item.id == rId) {
                    unSelectList.push(that.context.selectedList.datastore.item(item.id));
                }
            })
            // that.context.list.datastore.add(that.context.selectedList.datastore.item(rId));
            that.context.selectedList.datastore.remove(rId);
            //select事件触发
            if (Object.prototype.toString.call(that.context.events.onSelect) === '[object Function]') {
                that.context.events.onSelect(that.getSelectedList());
            }
            //触发反选事件
            if (Object.prototype.toString.call(that.context.events.onSelect) === '[object Function]') {
                that.context.events.onUnselect(unSelectList);
            }
        });
        //选中后按钮点击按钮
        that.context.container.find(".list-unselect,.list-unselectall").on('click', function() {
            //获取选中的列表id
            if (this.className.indexOf('list-unselectall') != -1) {
                that.context.selectedList.selectAll();
            }
            var selectList = that.context.selectedList.getSelectedRowId().split(/,/g);
            var unSelectList = []; //反选列表
            //将datastore中选中的已选项添加到待选列表，并删除已选
            $.each(that.context.selectedList.datastore.data.pull, function(index, item) {
                $.each(selectList, function(ind, ite) {
                    if (item.id == ite) {
                        unSelectList.push(that.context.selectedList.datastore.item(item.id));
                        // that.context.list.datastore.add(that.context.selectedList.datastore.item(item.id));
                        that.context.selectedList.datastore.remove(item.id);
                    }
                })
            })
            //触发选择事件
            if (Object.prototype.toString.call(that.context.events.onSelect) === '[object Function]') {
                that.context.events.onSelect(that.getSelectedList());
            }
            //触发反选事件
            if (Object.prototype.toString.call(that.context.events.onSelect) === '[object Function]') {
                that.context.events.onUnselect(unSelectList);
            }
        });
        //待选列表右击
        that.context.container.find(".list2-grid").bind("contextmenu",
            function() {
                return false;
            }
        ).mousedown(function(e) {
            if (3 == e.which) {
                if (Object.prototype.toString.call(that.context.events.onRightClick) === '[object Function]') {
                    that.context.events.onRightClick();
                }
            }
        })
    },
    _guid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    //获取待选列表数据
    getList: function() {
        return this.context.list.datastore.data.pull;
    },
    //获取已选列表数据
    getSelectedList: function() {
        return this.context.selectedList.datastore.data.pull;
    },
    //设置树数据
    setTreeData: function(data) {
        this._setTreeData(data);
    },
    //设置待选列表数据
    setListData: function(data) {
        this._setListData(data);
    },
    //设置已选列表数据
    setSelectedListData: function(data) {
        this._setSelectedListData(data);
    },
    //清空已选
    clearSelectedList: function() {
        this._setSelectedListData([]);
    },
    //设置组件皮肤
    setSkin: function(skin) {
        if (skin && skin.length > 0) {
            this.context.container.removeClass(this.context.opts.skin).addClass(skin);
            this.context.opts.skin = skin;
        }
    },
    getUnselectedGrid: function() {
        return this.context.list;
    },
    getSelectedGrid: function() {
        return this.context.selectedList;
    }
})
Ext.define("vmd.ux.ListSelector", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ListSelector",
    title: "Panel",
    header: false,
    border: false,
    width: 732,
    height: 390,
    layout: "auto",
    afterrender: "ListSelector_afterrender",
    autoHeight: true,
    beforerender: "ListSelector_beforerender",
    disabled: false,
    listeners: {
        vmdafterrender: function() {
            try {
                this.ListSelector_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.ListSelector'
                }, ex, 50);
            }
        },
        beforerender: function() {
            try {
                this.ListSelector_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.ListSelector'
                }, ex, 50);
            }
        }
    },
    uxCss: "/* listselector-default 默认皮肤*//*树*/.listselector-default .tree-container{    float:left;    border:1px solid #CCC;    margin-right:10px;}/*待选列表*/.listselector-default div.gridbox_material.gridbox table.hdr tr:nth-child(2) td {    border-top: 1px solid white;    border-right: 1px solid #CCC;}.listselector-default div.gridbox_material.gridbox table.obj.row20px tr td {    padding-top: 0;    padding-bottom: 0;    height: 32px;    line-height: 32px;    border-bottom: 1px solid #dfdfdf;    border-right: 1px solid #dfdfdf;}.listselector-default .list-container{    float:left;    border:1px solid #CCC;    margin-left:5px;}/*待选列表标题*/.listselector-default .list-title{    width:100%;    height:30px;    display:none;    font-size: 14px;    text-align: center;    height: 30px;    line-height: 30px;    font-weight: bold;    background: rgb(252, 251, 251);    border-bottom: 1px solid rgb(228, 228, 228);}/*搜索栏*/.listselector-default .list-searchbar {    position: relative;    width:100%;    height:30px;}/*搜索栏输入框*/.listselector-default .list-searchbar input {    width:99%;    height: 27px;    line-height: 27px;    padding-left: 8px;    background-color: #fff;    border: 1px solid #b2bdc5;    border-radius: 4px;    font-size: 14px;    color: #5f5f5f;}/*待选列表*/.listselector-default .list-grid {    }/*按钮区*/.listselector-default .button-container{    float:left;    padding:0 7px 0 7px;}/*按钮*/.listselector-default .button-container button{    width:34px;    margin-bottom:15px;        display: inline-block;    line-height: 1;    white-space: nowrap;    cursor: pointer;    background: #fff;    border: 1px solid #c4c4c4;    color: #1f2d3d;    -webkit-appearance: none;    text-align: center;    /* box-sizing: border-box; */    -webkit-box-sizing: content-box;    outline: 0;    -moz-user-select: none;    -webkit-user-select: none;    -ms-user-select: none;    font-size: 14px;    border-radius: 4px;    font-size: 12px;    border-radius: 4px;    padding:7px 0 7px 0;}/*已选列表*/.listselector-default .list2-container{    float:left;    border:1px solid #CCC;}/*已选列表标题*/.listselector-default .list2-title{    width: 100%;    height: 30px;    display: none;    font-size: 14px;    border: 1px solid #CCC;    border-top:none;    text-align: center;    line-height: 30px;    font-weight: bold;    background: rgb(252, 251, 251);    border-bottom: 1px solid rgb(228, 228, 228);}/*搜索栏*/.listselector-default .list2-searchbar {    border: 1px solid #CCC;}/*搜索栏图标*/.listselector-default .searchbar-icon{    width: 25px;    height: 25px;    position: absolute;    right: 1px;    top: 2px;    cursor: pointer;    /*background: url('{vmduxpath}/components/ux/listselectortcomponent/1.0/img/query.png') no-repeat center;*/}/*待选列表*/.listselector-default .list2-grid {    }/* listselector-test 测试皮肤*//*树*/.listselector-test .tree-container{    float:left;    border:1px solid #F00;    margin-right:10px;}/*待选列表*/.listselector-test .list-container{    float:left;    border:1px solid #CCC;    margin-left:5px;}/*待选列表标题*/.listselector-test .list-title{    width:100%;    height:30px;    display:none;    font-size: 14px;    text-align: center;    height: 30px;    line-height: 30px;    font-weight: bold;    background: rgb(252, 251, 251);    border-bottom: 1px solid rgb(228, 228, 228);}/*搜索栏*/.listselector-test .list-searchbar {    position: relative;    width:100%;    height:30px;}/*搜索栏输入框*/.listselector-test .list-searchbar input {    width:99%;    height: 27px;    line-height: 27px;    padding-left: 8px;    background-color: #fff;    border: 1px solid #b2bdc5;    border-radius: 4px;    font-size: 14px;    color: #5f5f5f;}/*待选列表*/.listselector-test .list-grid {    }/*按钮区*/.listselector-test .button-container{    float:left;    padding:0 7px 0 7px;}/*按钮*/.listselector-test .button-container button{    width:34px;    margin-bottom:15px;        display: inline-block;    line-height: 1;    white-space: nowrap;    cursor: pointer;    background: #fff;    border: 1px solid #c4c4c4;    color: #1f2d3d;    -webkit-appearance: none;    text-align: center;    /* box-sizing: border-box; */    -webkit-box-sizing: content-box;    outline: 0;    -moz-user-select: none;    -webkit-user-select: none;    -ms-user-select: none;    font-size: 14px;    border-radius: 4px;    font-size: 12px;    border-radius: 4px;    padding:7px 0 7px 0;}/*已选列表*/.listselector-test .list2-container{    float:left;    border:1px solid #CCC;}/*已选列表标题*/.listselector-test .list2-title{    width: 100%;    height: 30px;    font-size: 14px;    text-align: center;    display: none;    line-height: 30px;    font-weight: bold;    background: rgb(252, 251, 251);    border-bottom: 1px solid rgb(228, 228, 228);}/*搜索栏*/.listselector-test .list2-searchbar {    border: 1px solid #CCC;}/*搜索栏图标*/.listselector-test .searchbar-icon{    width: 25px;    height: 25px;    position: absolute;    right: 1px;    top: 2px;    cursor: pointer;    /*background: url('{vmduxpath}/components/ux/listselectortcomponent/1.0/img/query.png') no-repeat center;*/}/*待选列表*/.listselector-test .list2-grid {    }",
    uxrequirejs: "[\"components/ux/listselector/1.0/js/template-web.js\"]",
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
        if (Ext.isString(this.treeStore)) this.treeStore = new Ext.data.JsonStore()
        if (Ext.isString(this.unSelectedStore)) this.unSelectedStore = new Ext.data.JsonStore()
        if (Ext.isString(this.selectedStore)) this.selectedStore = new Ext.data.JsonStore()
        try {
            var thisComponent;
            var page = this;

            function ListSelector_afterrender(sender) {
                //获取参数并处理
                thisComponent = new hw.comps.tech.ListSelector({
                    options: {
                        skin: page.skin || 'listselector-default', //皮肤
                        //树组件
                        showTree: page.showTree, //是否展示树
                        treeStore: page.treeStore, //树数据集
                        parentField: page.parentField, //父节点字段
                        valueField: page.valueField, //值字段
                        displayField: page.displayField, //显示字段
                        folderIcon: page.folderIcon, //文件夹图标
                        leafIcon: page.leafIcon, //叶子节点图标
                        allowCheckbox: page.allowCheckbox, //是否展示复选框
                        showRoot: page.showRoot, //是否展示根节点
                        rootText: page.rootText, //根节点名称
                        rootValue: page.rootValue, //根节点值
                        //待选列表
                        unSelectedTitle: page.unSelectedTitle, //标题
                        allowSearchbar: page.allowSearchbar, //是否展示搜索栏
                        unSelectedStore: page.unSelectedStore, // 数据集
                        searchbarPlaceholder: page.searchbarPlaceholder, //搜索栏placeholder
                        searchField: page.searchField, //搜索用字段
                        headers: page.headers, //列表表头
                        columnIds: page.columnIds, //表列ID
                        colWidth: page.colWidth, //列宽
                        colAlign: page.colAlign, //列对齐方式
                        associateId: page.associateId || 'id', //关联ID
                        //已选列表
                        selectedTitle: page.selectedTitle, //标题
                        selectedStore: page.selectedStore //数据集
                    },
                    events: {
                        onSelect: function(param1) {
                            page.fireEvent('onSelect', page, param1);
                        },
                        onUnselect: function(param1) {
                            page.fireEvent('onUnselect', page, param1);
                        },
                        onTreeSelect: function(param1) {
                            page.fireEvent('onTreeSelect', page, param1);
                        },
                        onTreeChecked: function(param1) {
                            page.fireEvent('onTreeChecked', page, param1);
                        },
                        onRightClick: function(param1) {
                            page.fireEvent('onRightClick', page, param1);
                        },
                        onTreeDbClick: function(param1) {
                            page.fireEvent('onTreeDbClick', page, param1);
                        },
                        onTreeRightClick: function(param1) {
                            page.fireEvent('onTreeRightClick', page, param1);
                        },
                    }
                }, sender);
                //数据绑定 
                //for test
                if (page.treeStore) {
                    //var store = Ext.getCmp(page.treeStore);
                    var store = page.treeStore;
                    if (store) {
                        store = Ext.StoreMgr.lookup(store);
                        store.on({
                            scope: this,
                            datachanged: function() {
                                var records = page.treeStore.getRange();
                                var dhxdata = [];
                                if (records.length < 1) {} else {
                                    //返回dhx组件数据的格式，将dhxcombostore的源码放到此处
                                    for (var i = 0; i < records.length; i++) {
                                        var item = Ext.apply(records[i].data, {
                                            id: records[i].data[page.associateId],
                                            value: records[i].data[page.valueField],
                                            text: records[i].data[page.displayField]
                                        })
                                        dhxdata.push(item);
                                    }
                                }
                                thisComponent._setTreeData(dhxdata);
                            }
                        });
                    }
                }
                //待选列表数据集
                if (page.unSelectedStore) {
                    //var store = Ext.getCmp(page.treeStore);
                    var store2 = page.unSelectedStore;
                    if (store2) {
                        store2 = Ext.StoreMgr.lookup(store2);
                        store2.on({
                            scope: this,
                            datachanged: function() {
                                var records = page.unSelectedStore.getRange();
                                var dhxdata = [];
                                if (records.length < 1) {} else {
                                    //返回dhx组件数据的格式，将dhxcombostore的源码放到此处
                                    for (var i = 0; i < records.length; i++) {
                                        var item = Ext.apply(records[i].data, {
                                            id: records[i].data[page.associateId]
                                        })
                                        dhxdata.push(item);
                                    }
                                }
                                thisComponent._setListData(dhxdata);
                            }
                        });
                    }
                }
                //已选列表数据集
                if (page.selectedStore) {
                    var store3 = page.selectedStore;
                    if (store3) {
                        store3 = Ext.StoreMgr.lookup(store3);
                        store3.on({
                            scope: this,
                            datachanged: function() {
                                var records = page.selectedStore.getRange();
                                var dhxdata = [];
                                if (records.length < 1) {} else {
                                    //组织数据
                                    for (var i = 0; i < records.length; i++) {
                                        var item = Ext.apply(records[i].data, {
                                            id: records[i].data[page.associateId]
                                        })
                                        dhxdata.push(item);
                                    }
                                }
                                console.info(dhxdata);
                                thisComponent._setSelectedListData(dhxdata);
                            }
                        });
                    }
                }
            }

            function ListSelector_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ListSelector',
                p2: ex.message
            }, ex, 100);
        }
        this.ListSelector_afterrender = ListSelector_afterrender;
        this.ListSelector_beforerender = ListSelector_beforerender;
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getList = function() {
            //直接填写方法内容
            return thisComponent.getList();
        }
        this.getSelectedList = function() {
            //直接填写方法内容
            return thisComponent.getSelectedList();
        }
        this.setTreeData = function(store) {
            //直接填写方法内容
            thisComponent.setTreeData(store);
        }
        this.setListData = function(store) {
            //直接填写方法内容
            thisComponent.setListData(store);
        }
        this.setSelectedListData = function(store) {
            //直接填写方法内容
            thisComponent.setSelectedListData(store);
        }
        this.clearSelectedList = function() {
            //直接填写方法内容
            thisComponent.clearSelectedList();
        }
        this.setSkin = function(skinName) {
            //直接填写方法内容
            thisComponent.setSkin(skinName);
        }
        this.getSelectedGrid = function() {
            //直接填写方法内容
            return thisComponent.getSelectedGrid();
        }
        this.getUnselectedGrid = function() {
            //直接填写方法内容
            return thisComponent.getUnselectedGrid();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ListSelector");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ListSelector");
    }
})