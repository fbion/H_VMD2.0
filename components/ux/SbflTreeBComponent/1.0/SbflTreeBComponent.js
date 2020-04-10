Ext.define('hw.comps.busi.SbflTreeBComponent', {
    xtype: 'hw.comps.busi.SbflTreeBComponent',
    tmpl: '<div class="{{compClass}}" style="{{compStyle}}" id="{{compId}}">' +
        '<div class="tree-container"></div>' +
        '<div class="formDiv" style="display:none;">' +
        '<table class="inputform" cellspacing="0" cellpadding="5">' +
        '<tbody>' +
        '<tr class="typehid">' +
        '<td class="lbltd"><span class="rg6">*</span>分类名称</td>' +
        '<td class="in">' +
        '<input id="flId" type="hidden" value="">' +
        '<input class="inputstyle" style="width:98%" id="flmc" type="text" placeholder="请输入分类名称">' +
        '</td>' +
        '<td class="hiddentd"></td>' +
        '</tr>' +
        '<tr class="typehid">' +
        '<td class="lbltd">类型分类</td>' +
        '<td class="in">' +
        '<input class="inputstyle" style="width:98%" type="text"  id="lefl"  list="optionList123" class="form-control"/><datalist id="optionList123"><option value="A">A</option><option value="B">B</option><option value="C">C</option></datalist>' +
        '</td>' +
        '<td class="hiddentd"></td>' +
        '</tr>' +
        '</tbody></table>' +
        '<div class="footer">' +
        '<input type="button" class="btn btn_font_2" value="保&nbsp;存" id="saveClass">' +
        '<span class="padd8"></span>' +
        '<input type="button" class="btn_cancle btn_font_2" value="关&nbsp;闭" id="cancel"/>' +
        '</div>' +
        '</div>' +
        '</div>',
    defaultOpts: { //默认配置项
        options: {
            /*容器属性*/
            container: '',
            width: 300,
            height: 300,
            /*样式属性*/
            componentCls: 'maintainableTree-default',
            /*功能属性*/
            //树组件
            showMenu: false, //是否展示树菜单
            parentField: '', //父节点字段
            valueField: '', //值字段
            displayField: '', //显示字段
            folderIcon: '', //文件夹图标
            leafIcon: '', //叶子节点图标
            allowCheckbox: false, //是否展示复选框
            showRoot: false, //展示根节点
            rootText: '', //根节点名称
            rootValue: '', //根节点值
            servicePath: '', //服务接口地址
            openAllItems: false, //展开所有节点
            enableDragAndDrop: false //允许节点拖动
        },
        events: {}
    },
    //构造函数，默认初始化组件
    constructor: function(options, containerobj) {
        this.context = {
            tree: null, //树组件
            menu: null //树右键菜单
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
        this.context.container.find(".tree-container").width(containerobj.lastSize.width).height(containerobj.lastSize.height);
        //渲染树
        this._initTree();
        //初始化事件绑定
        this._initEvent();
    },
    //初始化树组件
    _initTree: function() {
        var that = this;
        var tree = new dhtmlXTreeObject(this.context.container.find(".tree-container")[0], '100%', '100%', 0);
        tree.setSkin('dhx_skyblue');
        tree.setImagePath("/lib/dhtmlx/imgs/dhxtree_material/");
        //允许拖动
        if (this.context.opts.enableDragAndDrop) {
            tree.enableDragAndDrop(true);
            tree.setDragBehavior("complex");
            //监听拖动
            tree.attachEvent("onDrop", function(sId, tId, id, sObject, tObject) {
                //保存树节点打开状态
                that.context.tree.saveOpenStates();
                //调用服务保存节点位置
                //修改数据
                var data = {
                    id: sId,
                    pid: tId,
                    xh: that.context.tree.getIndexById(sId) + 1,
                };
                index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
                hwDas.edit({
                        host: vmd.workspace.dataServiceIp,
                        url: that.context.opts.servicePath
                    }, {}, {}, [data],
                    function(result) {
                        //选中节点并触发节点选中事件
                        layer.closeAll();
                        if (vmd.tip) {
                            vmd.tip('分类树修改成功！', 'waring');
                        } else {
                            layer.msg("分类树修改成功！");
                        }
                        //重新加载数据
                        that.context.opts.treeStore.toRefresh(function() {
                            that.context.tree.loadOpenStates();
                        });
                    },
                    function(msg) {
                        layer.alert("分类树修改失败！");
                        return false;
                    }
                );
            });
        }
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
        if (this.context.opts.showMenu) {
            //添加右键菜单
            var menu = new dhtmlXMenuObject();
            menu.relationTree = tree;
            menu.renderAsContextMenu();
            menu.renderAsContextMenu();
            // menu.addNewChild(null, 0, "addChildNode", "添加下级节点", false, "");
            // menu.addNewChild(null, 1, "addNode", "添加同级节点", false, "");
            // menu.addNewChild(null, 2, "editNode", "编辑", false, "");
            // menu.addNewChild(null, 3, "delNode", "删除", false, "");
            // menu.addNewChild(null, 4, "nodeup", "上移", true, "");
            // menu.addNewChild(null, 5, "nodedown", "下移", true, "");
            //右击前事件
            tree.attachEvent("onBeforeContextMenu", function(itemId) {
                if (itemId) {
                    //设置选中树节点
                    that.context.tree.treeSelectedId = itemId;
                    var pid = tree.getParentId(itemId);
                    if (pid == '0') {
                        //删除节点
                        menu.removeItem("addType");
                        menu.removeItem("editType");
                        menu.removeItem("delNode");
                        menu.removeItem("addChildNode");
                        menu.removeItem("addNode");
                        menu.removeItem("editNode");
                        menu.removeItem("nodeup");
                        menu.removeItem("nodedown");
                        menu.addNewChild(null, 6, "addType", "添加同级分类", false, "");
                        menu.addNewChild(null, 0, "addChildNode", "添加下级节点", false, "");
                        var arrayChildrenNode = tree.getSubItems(itemId);
                        //判断是否有下级分类，如果有则不允许删除
                        if (arrayChildrenNode.length > 0 || itemId == (getUrlParam && getUrlParam("jcdid")) || itemId == "root") {
                            menu.addNewChild(null, 2, "editType", "编辑", true, "");
                            menu.addNewChild(null, 3, "delNode", "删除", true, "");
                        } else {
                            menu.addNewChild(null, 2, "editType", "编辑", false, "");
                            menu.addNewChild(null, 3, "delNode", "删除", false, "");
                        }
                    } else {
                        //删除节点
                        menu.removeItem("addType");
                        menu.removeItem("addChildNode");
                        menu.removeItem("addNode");
                        menu.removeItem("editType");
                        menu.removeItem("editNode");
                        menu.removeItem("delNode");
                        menu.removeItem("nodeup");
                        menu.removeItem("nodedown");
                        menu.addNewChild(null, 1, "addNode", "添加同级节点", false, "");
                        menu.addNewChild(null, 0, "addChildNode", "添加下级节点", false, "");
                        menu.addNewChild(null, 2, "editNode", "编辑", false, "");
                        var arrayChildrenNode = tree.getSubItems(itemId);
                        //实现上移下移功能，只有在分类系统中需要
                        menu.addNewChild(null, 4, "nodeup", "上移", false, "");
                        menu.addNewChild(null, 5, "nodedown", "下移", false, "");
                        //判断是否有下级分类，如果有则不允许删除
                        if (arrayChildrenNode.length > 0) {
                            menu.addNewChild(null, 3, "delNode", "删除", true, "");
                        } else {
                            menu.addNewChild(null, 3, "delNode", "删除", false, "");
                        }
                    }
                } else {
                    //设置不可用
                    menu.setItemDisabled("addChildNode");
                    menu.setItemDisabled("addNode");
                    menu.setItemDisabled("editNode");
                    menu.setItemDisabled("delNode");
                    menu.setItemDisabled("nodeup");
                    menu.setItemDisabled("nodedown");
                }
                return true;
            });
            //添加，编辑点击事件
            menu.attachEvent("onClick", function(menuitemId) {
                if (!tree.contextID) {
                    tree.contextID = tree.getSelectedId();
                }
                if (menuitemId == "addChildNode") {
                    that.addChildNode(tree, tree.contextID, tree.getItemText(tree.contextID));
                } else if (menuitemId == "editNode") {
                    that.editNode(tree, tree.contextID, tree.getItemText(tree.contextID));
                } else if (menuitemId == "delNode") {
                    that.delNode(tree, tree.contextID, tree.getItemText(tree.contextID));
                } else if (menuitemId == "nodeup") {
                    that.nodeUp(tree, tree.contextID, tree.getParentId(tree.contextID));
                } else if (menuitemId == "nodedown") {
                    that.nodeDown(tree, tree.contextID, tree.getParentId(tree.contextID));
                } else if (menuitemId == "addNode") {
                    that.addNode(tree, tree.getParentId(tree.contextID), tree.getParentId(tree.contextID));
                } else if (menuitemId == "addType") {
                    that.addNode(tree, tree.getParentId(tree.contextID), tree.getParentId(tree.contextID), 'addType');
                } else if (menuitemId == "editType") {
                    that.editNode(tree, tree.contextID, tree.getItemText(tree.contextID), 'editType');
                }
            });
            this.context.menu = menu;
            tree.enableContextMenu(menu);
        }
        //取消按钮
        $("#cancel").on("click", function() {
            layer.closeAll();
        });
        //确定按钮
        $("#saveClass").on("click", function() {
            index = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
            //保存树节点打开状态
            that.context.tree.saveOpenStates();
            switch (that.context.tree.operation) {
                case "add":
                    {
                        var guid = new Date().getTime();
                        var pid = that.context.tree.isSubNode ? that.context.tree.treeSelectedId : that.context.tree.getParentId(that.context.tree.treeSelectedId);
                        if (pid == "root") {
                            pid = 0;
                        }
                        //校验
                        if (($("#flmc").val() + "").length == 0) {
                            layer.alert("请输入分类名称！");
                            layer.close(index);
                            return;
                        }
                        var data = {
                            class_system: that.context.opts.classSystem,
                            name: $("#flmc").val(),
                            description: $("#lefl").val(),
                            pid: pid,
                        };
                        hwDas.add({
                                host: vmd.workspace.dataServiceIp,
                                url: that.context.opts.servicePath
                            }, {}, {}, [data],
                            function(result) {
                                
                                layer.closeAll();
                                layer.alert('分类添加成功!');
                                //重新加载数据
                                that.context.opts.treeStore.toRefresh(function() {
                                    that.context.tree.loadOpenStates();
                                    //获取新添加的节点ID
                                    // var nodeId = "";
                                    // that.context.tree.preserved(nodeId, true, false);
                                });
                            },
                            function(msg) {
                                
                                layer.alert('分类添加失败！');
                            });
                    };
                    break;
                case "edit":
                    {
                        //修改数据
                        var data = {
                            id: $("#flId").val(),
                            name: $("#flmc").val(),
                            description: $("#lefl").val(),
                            form_id: getUrlParam && getUrlParam("jcdid") //考核系统用
                        };
                        //校验
                        if (($("#flmc").val() + "").length == 0) {
                            layer.alert("请输入分类名称！");
                            layer.close(index);
                            return
                        }
                        hwDas.edit({
                                host: vmd.workspace.dataServiceIp,
                                url: that.context.opts.servicePath
                            }, {}, {}, [data],
                            function(result) {
                                //选中节点并触发节点选中事件
                                layer.closeAll();
                                layer.alert("分类修改成功！");
                                //重新加载数据
                                that.context.opts.treeStore.toRefresh(function() {
                                    that.context.tree.loadOpenStates();
                                    var nodeId = $("#flId").val();
                                    that.context.tree.preserved(nodeId, true, false);
                                });
                            },
                            function(msg) {
                                layer.alert("分类修改失败！");
                                layer.close(index);
                                return false;
                            }
                        );
                    };
                    break;
            }
        });
        this.context.tree = tree;
    },
    //加载树组件数据
    _setTreeData: function(data) {
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
        this.context.tree.openAllItems("0");
    },
    //绑定事件
    _initEvent: function() {
        var that = this;
        //树组件
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
    },
    _guid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    //设置树数据
    getSelectedItemId: function(data) {
        return this.context.tree.getSelectedItemId();
    },
    //设置树数据
    setTreeData: function(data) {
        this._setTreeData(data);
    },
    //设置组件皮肤
    setSkin: function(skin) {
        if (skin && skin.length > 0) {
            this.context.container.removeClass(this.context.opts.skin).addClass(skin);
            this.context.opts.skin = skin;
        }
    },
    //添加下级节点
    addChildNode: function(tree, treeId, treeText) {
        this.adds(treeId, true);
    },
    //添加同级节点
    addNode: function(tree, treeParentId, treeText, type) {
        this.adds(treeParentId, false);
    },
    //编辑
    editNode: function(tree, treeId, treeText, type) {
        this.updates(treeId, type);
    },
    //删除
    delNode: function(tree, treeId, treeText) {
        this.del(treeId);
    },
    //上移
    nodeUp: function(tree, treeId, pid) {
        var that = this;
        //保存树节点打开状态
        that.context.tree.saveOpenStates();
        //调用服务保存节点位置
        //修改数据
        var data = {
            id: treeId,
            pid: pid,
            xh: that.context.tree.getIndexById(treeId) + 1,
            move: "UP"
        };
        index = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        hwDas.edit({
                host: vmd.workspace.dataServiceIp,
                url: that.context.opts.servicePath
            }, {}, {}, [data],
            function(result) {
                //选中节点并触发节点选中事件
                layer.closeAll();
                if (vmd.tip) {
                    vmd.tip('分类上移成功！', 'waring');
                } else {
                    layer.msg("分类上移成功！");
                }
                //重新加载数据
                that.context.opts.treeStore.toRefresh(function() {
                    that.context.tree.loadOpenStates();
                });
            },
            function(msg) {
                layer.alert("分类树修改失败！");
                layer.close(index);
                return false;
            }
        );
    },
    //下移
    nodeDown: function(tree, treeId, pid) {
        var that = this;
        //保存树节点打开状态
        that.context.tree.saveOpenStates();
        //调用服务保存节点位置
        //修改数据
        var data = {
            id: treeId,
            pid: pid,
            xh: that.context.tree.getIndexById(treeId) + 1,
            move: "DOWN"
        };
        index = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        hwDas.edit({
                host: vmd.workspace.dataServiceIp,
                url: that.context.opts.servicePath
            }, {}, {}, [data],
            function(result) {
                //选中节点并触发节点选中事件
                layer.closeAll();
                if (vmd.tip) {
                    vmd.tip('分类下移成功！', 'waring');
                } else {
                    layer.msg("分类下移成功！");
                }
                //重新加载数据
                that.context.opts.treeStore.toRefresh(function() {
                    that.context.tree.loadOpenStates();
                });
            },
            function(msg) {
                layer.alert("分类树修改失败！");
                layer.close(index);
                return false;
            }
        );
    },
    //弹出一个iframe层（新增）
    adds: function(prentId, isSubNode) {
        var that = this;
        that.context.tree.operation = "add";
        var sjdwmc = this.context.tree.getItemText(prentId);
        sjdwmc = escape(sjdwmc);
        //清空表单
        $("#flId").val("");
        $("#flmc").val("");
        $("#lefl").val("");
        //添加分类表单
        if (isSubNode) {
            that.context.tree.isSubNode = true;
            layer.open({
                title: '添加下级分类',
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['500px', '300px'], //宽高
                content: $('.formDiv')
            });
        } else {
            that.context.tree.isSubNode = false;
            layer.open({
                title: '添加同级分类',
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['500px', '300px'], //宽高
                content: $('.formDiv')
            });
        }
    },
    //弹出一个iframe层（编辑）
    updates: function(selid, type) {
        var that = this;
        //清空表单
        $("#flId").val("");
        $("#flmc").val("");
        $("#lefl").val("");
        that.context.tree.operation = "edit";
        if (selid) {
            
            hwDas.get({
                    host: vmd.workspace.dataServiceIp,
                    url: that.context.opts.servicePath
                }, {}, {
                    class_system: that.context.opts.classSystem,
                    class_id: selid,
                    form_id: getUrlParam && getUrlParam("jcdid") //考核系统用
                },
                function(result) {
                    //编辑统计分类
                    layer.open({
                        title: '编辑分类',
                        type: 1,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['500px', '300px'], //宽高
                        content: $('.formDiv')
                    });
                    $("#flId").val(result.data[0].datas[0].id);
                    $("#flmc").val(result.data[0].datas[0].name);
                    $("#lefl").val(result.data[0].datas[0].description);
                },
                function(msg) {
                    layer.alert("获取分类信息失败，请重试或联系管理员！");
                    layer.close(index);
                    return;
                }
            );
        } else {
            layer.alert("请选择一个分类！");
        }
    },
    //询问框(删除)
    del: function(seldId) {
        var that = this;
        that.context.tree.operation = "del";
        var seld = this.context.tree.getItemText(seldId);
        // var baid = this.context.tree.getUserData(seldId, 'baid');
        // var bano = this.context.tree.getUserData(seldId, 'dwxh');
        if (!seldId) {
            msgutil.Prompt(msgutil.msgType.noParams, "请选择一个分类！", function() {}, function() {})
        } else {
            if (seldId == 0) {
                layer.alert("不能删除顶级节点！");
                return;
            }
            var arrayChildrenNode = this.context.tree.getSubItems(seldId);
            //判断是否有下级分类，如果有则不允许删除
            if (arrayChildrenNode.length > 0) {
                layer.Prompt(msgutil.msgType.noParams, "请先删除其子分类！", function() {}, function() {})
            } else {
                layer.confirm("您确定要删除“" + seld + "”吗？删除后将无法恢复", {
                    btn: ['删除', '取消'] //按钮
                }, function() {
                    //执行删除操作
                    index = layer.load(1, {
                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                    });
                    //保存树节点打开状态
                    that.context.tree.saveOpenStates();
                    hwDas.del({
                            host: vmd.workspace.dataServiceIp,
                            url: that.context.opts.servicePath
                        }, {}, {
                            id: seldId,
                            form_id: getUrlParam && getUrlParam("jcdid") //考核系统用
                        },
                        function(result) {
                            layer.alert("删除分类 " + seld + " 成功");
                            layer.closeAll();
                            //重新加载数据
                            that.context.opts.treeStore.toRefresh(function() {
                                that.context.tree.loadOpenStates();
                                // var nodeId = $("#flId").val();
                                // that.context.tree.preserved(nodeId, true, false);
                            });
                        },
                        function(msg) {
                            layer.alert("删除分类 " + seld + " 失败！");
                            layer.close(index);
                            return;
                        }
                    );
                }, function() {});
            }
        }
    }
})
Ext.define("vmd.ux.SbflTreeBComponent", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.SbflTreeBComponent",
    title: "Panel",
    header: false,
    border: false,
    width: 263,
    height: 406,
    layout: "absolute",
    afterrender: "SbflTreeBComponent_afterrender",
    autoHeight: true,
    listeners: {
        vmdafterrender: function() {
            try {
                this.SbflTreeBComponent_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.SbflTreeBComponent'
                }, ex, 50);
            }
        }
    },
    uxCss: ".layui-layer-imgbar,.layui-layer-imgtit a,.layui-layer-tab .layui-layer-title span,.layui-layer-title{text-overflow:ellipsis;white-space:nowrap}html #layuicss-layer{display:none;position:absolute;width:1989px}.layui-layer,.layui-layer-shade{position:fixed;_position:absolute;pointer-events:auto}.layui-layer-shade{top:0;left:0;width:100%;height:100%;_height:expression(document.body.offsetHeight+\"px\")}.layui-layer{-webkit-overflow-scrolling:touch;top:150px;left:0;margin:0;padding:0;background-color:#fff;-webkit-background-clip:content;border-radius:2px;box-shadow:1px 1px 50px rgba(0,0,0,.3)}.layui-layer-close{position:absolute}.layui-layer-content{position:relative}.layui-layer-border{border:1px solid #B2B2B2;border:1px solid rgba(0,0,0,.1);box-shadow:1px 1px 5px rgba(0,0,0,.2)}.layui-layer-load{background:url(loading-1.gif) center center no-repeat #eee}.layui-layer-ico{background:url(icon.png) no-repeat}.layui-layer-btn a,.layui-layer-dialog .layui-layer-ico,.layui-layer-setwin a{display:inline-block;*display:inline;*zoom:1;vertical-align:top}.layui-layer-move{display:none;position:fixed;*position:absolute;left:0;top:0;width:100%;height:100%;cursor:move;opacity:0;filter:alpha(opacity=0);background-color:#fff;z-index:2147483647}.layui-layer-resize{position:absolute;width:15px;height:15px;right:0;bottom:0;cursor:se-resize}.layer-anim{-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:.3s;animation-duration:.3s}@-webkit-keyframes layer-bounceIn{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes layer-bounceIn{0%{opacity:0;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}.layer-anim-00{-webkit-animation-name:layer-bounceIn;animation-name:layer-bounceIn}@-webkit-keyframes layer-zoomInDown{0%{opacity:0;-webkit-transform:scale(.1) translateY(-2000px);transform:scale(.1) translateY(-2000px);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}60%{opacity:1;-webkit-transform:scale(.475) translateY(60px);transform:scale(.475) translateY(60px);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes layer-zoomInDown{0%{opacity:0;-webkit-transform:scale(.1) translateY(-2000px);-ms-transform:scale(.1) translateY(-2000px);transform:scale(.1) translateY(-2000px);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}60%{opacity:1;-webkit-transform:scale(.475) translateY(60px);-ms-transform:scale(.475) translateY(60px);transform:scale(.475) translateY(60px);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}.layer-anim-01{-webkit-animation-name:layer-zoomInDown;animation-name:layer-zoomInDown}@-webkit-keyframes layer-fadeInUpBig{0%{opacity:0;-webkit-transform:translateY(2000px);transform:translateY(2000px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes layer-fadeInUpBig{0%{opacity:0;-webkit-transform:translateY(2000px);-ms-transform:translateY(2000px);transform:translateY(2000px)}100%{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}}.layer-anim-02{-webkit-animation-name:layer-fadeInUpBig;animation-name:layer-fadeInUpBig}@-webkit-keyframes layer-zoomInLeft{0%{opacity:0;-webkit-transform:scale(.1) translateX(-2000px);transform:scale(.1) translateX(-2000px);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}60%{opacity:1;-webkit-transform:scale(.475) translateX(48px);transform:scale(.475) translateX(48px);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes layer-zoomInLeft{0%{opacity:0;-webkit-transform:scale(.1) translateX(-2000px);-ms-transform:scale(.1) translateX(-2000px);transform:scale(.1) translateX(-2000px);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}60%{opacity:1;-webkit-transform:scale(.475) translateX(48px);-ms-transform:scale(.475) translateX(48px);transform:scale(.475) translateX(48px);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}.layer-anim-03{-webkit-animation-name:layer-zoomInLeft;animation-name:layer-zoomInLeft}@-webkit-keyframes layer-rollIn{0%{opacity:0;-webkit-transform:translateX(-100%) rotate(-120deg);transform:translateX(-100%) rotate(-120deg)}100%{opacity:1;-webkit-transform:translateX(0) rotate(0);transform:translateX(0) rotate(0)}}@keyframes layer-rollIn{0%{opacity:0;-webkit-transform:translateX(-100%) rotate(-120deg);-ms-transform:translateX(-100%) rotate(-120deg);transform:translateX(-100%) rotate(-120deg)}100%{opacity:1;-webkit-transform:translateX(0) rotate(0);-ms-transform:translateX(0) rotate(0);transform:translateX(0) rotate(0)}}.layer-anim-04{-webkit-animation-name:layer-rollIn;animation-name:layer-rollIn}@keyframes layer-fadeIn{0%{opacity:0}100%{opacity:1}}.layer-anim-05{-webkit-animation-name:layer-fadeIn;animation-name:layer-fadeIn}@-webkit-keyframes layer-shake{0%,100%{-webkit-transform:translateX(0);transform:translateX(0)}10%,30%,50%,70%,90%{-webkit-transform:translateX(-10px);transform:translateX(-10px)}20%,40%,60%,80%{-webkit-transform:translateX(10px);transform:translateX(10px)}}@keyframes layer-shake{0%,100%{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}10%,30%,50%,70%,90%{-webkit-transform:translateX(-10px);-ms-transform:translateX(-10px);transform:translateX(-10px)}20%,40%,60%,80%{-webkit-transform:translateX(10px);-ms-transform:translateX(10px);transform:translateX(10px)}}.layer-anim-06{-webkit-animation-name:layer-shake;animation-name:layer-shake}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.layui-layer-title{padding:0 80px 0 20px;height:42px;line-height:42px;border-bottom:1px solid #eee;font-size:14px;color:#333;overflow:hidden;background-color:#F8F8F8;border-radius:2px 2px 0 0}.layui-layer-setwin{position:absolute;right:15px;*right:0;top:15px;font-size:0;line-height:initial}.layui-layer-setwin a{position:relative;width:16px;height:16px;margin-left:10px;font-size:12px;_overflow:hidden}.layui-layer-setwin .layui-layer-min cite{position:absolute;width:14px;height:2px;left:0;top:50%;margin-top:-1px;background-color:#2E2D3C;cursor:pointer;_overflow:hidden}.layui-layer-setwin .layui-layer-min:hover cite{background-color:#2D93CA}.layui-layer-setwin .layui-layer-max{background-position:-32px -40px}.layui-layer-setwin .layui-layer-max:hover{background-position:-16px -40px}.layui-layer-setwin .layui-layer-maxmin{background-position:-65px -40px}.layui-layer-setwin .layui-layer-maxmin:hover{background-position:-49px -40px}.layui-layer-setwin .layui-layer-close1{background-position:1px -40px;cursor:pointer}.layui-layer-setwin .layui-layer-close1:hover{opacity:.7}.layui-layer-setwin .layui-layer-close2{position:absolute;right:-28px;top:-28px;width:30px;height:30px;margin-left:0;background-position:-149px -31px;*right:-18px;_display:none}.layui-layer-setwin .layui-layer-close2:hover{background-position:-180px -31px}.layui-layer-btn{text-align:right;padding:0 15px 12px;pointer-events:auto;user-select:none;-webkit-user-select:none}.layui-layer-btn a{height:28px;line-height:28px;margin:5px 5px 0;padding:0 15px;border:1px solid #dedede;background-color:#fff;color:#333;border-radius:2px;font-weight:400;cursor:pointer;text-decoration:none}.layui-layer-btn a:hover{opacity:.9;text-decoration:none}.layui-layer-btn a:active{opacity:.8}.layui-layer-btn .layui-layer-btn0{border-color:#1E9FFF;background-color:#1E9FFF;color:#fff}.layui-layer-btn-l{text-align:left}.layui-layer-btn-c{text-align:center}.layui-layer-dialog{min-width:260px}.layui-layer-dialog .layui-layer-content{position:relative;padding:20px;line-height:24px;word-break:break-all;overflow:hidden;font-size:14px;overflow-x:hidden;overflow-y:auto}.layui-layer-dialog .layui-layer-content .layui-layer-ico{position:absolute;top:16px;left:15px;_left:-40px;width:30px;height:30px}.layui-layer-ico1{background-position:-30px 0}.layui-layer-ico2{background-position:-60px 0}.layui-layer-ico3{background-position:-90px 0}.layui-layer-ico4{background-position:-120px 0}.layui-layer-ico5{background-position:-150px 0}.layui-layer-ico6{background-position:-180px 0}.layui-layer-rim{border:6px solid #8D8D8D;border:6px solid rgba(0,0,0,.3);border-radius:5px;box-shadow:none}.layui-layer-msg{min-width:180px;border:1px solid #D3D4D3;box-shadow:none}.layui-layer-hui{min-width:100px;background-color:#000;filter:alpha(opacity=60);background-color:rgba(0,0,0,.6);color:#fff;border:none}.layui-layer-hui .layui-layer-content{padding:12px 25px;text-align:center}.layui-layer-dialog .layui-layer-padding{padding:20px 20px 20px 55px;text-align:left}.layui-layer-page .layui-layer-content{position:relative;overflow:auto}.layui-layer-iframe .layui-layer-btn,.layui-layer-page .layui-layer-btn{padding-top:10px}.layui-layer-nobg{background:0 0}.layui-layer-iframe iframe{display:block;width:100%}.layui-layer-loading{border-radius:100%;background:0 0;box-shadow:none;border:none}.layui-layer-loading .layui-layer-content{width:60px;height:24px;background:url(loading-0.gif) no-repeat}.layui-layer-loading .layui-layer-loading1{width:37px;height:37px;background:url(loading-1.gif) no-repeat}.layui-layer-ico16,.layui-layer-loading .layui-layer-loading2{width:32px;height:32px;background:url(loading-2.gif) no-repeat}.layui-layer-tips{background:0 0;box-shadow:none;border:none}.layui-layer-tips .layui-layer-content{position:relative;line-height:22px;min-width:12px;padding:8px 15px;font-size:12px;_float:left;border-radius:2px;box-shadow:1px 1px 3px rgba(0,0,0,.2);background-color:#000;color:#fff}.layui-layer-tips .layui-layer-close{right:-2px;top:-1px}.layui-layer-tips i.layui-layer-TipsG{position:absolute;width:0;height:0;border-width:8px;border-color:transparent;border-style:dashed;*overflow:hidden}.layui-layer-tips i.layui-layer-TipsB,.layui-layer-tips i.layui-layer-TipsT{left:5px;border-right-style:solid;border-right-color:#000}.layui-layer-tips i.layui-layer-TipsT{bottom:-8px}.layui-layer-tips i.layui-layer-TipsB{top:-8px}.layui-layer-tips i.layui-layer-TipsL,.layui-layer-tips i.layui-layer-TipsR{top:5px;border-bottom-style:solid;border-bottom-color:#000}.layui-layer-tips i.layui-layer-TipsR{left:-8px}.layui-layer-tips i.layui-layer-TipsL{right:-8px}.layui-layer-lan[type=dialog]{min-width:280px}.layui-layer-lan .layui-layer-title{background:#4476A7;color:#fff;border:none}.layui-layer-lan .layui-layer-btn{padding:5px 10px 10px;text-align:right;border-top:1px solid #E9E7E7}.layui-layer-lan .layui-layer-btn a{background:#fff;border-color:#E9E7E7;color:#333}.layui-layer-lan .layui-layer-btn .layui-layer-btn1{background:#C9C5C5}.layui-layer-molv .layui-layer-title{background:#009f95;color:#fff;border:none}.layui-layer-molv .layui-layer-btn a{background:#009f95;border-color:#009f95}.layui-layer-molv .layui-layer-btn .layui-layer-btn1{background:#92B8B1}.layui-layer-iconext{background:url(icon-ext.png) no-repeat}.layui-layer-prompt .layui-layer-input{display:block;width:230px;height:36px;margin:0 auto;line-height:30px;padding-left:10px;border:1px solid #e6e6e6;color:#333}.layui-layer-prompt textarea.layui-layer-input{width:300px;height:100px;line-height:20px;padding:6px 10px}.layui-layer-prompt .layui-layer-content{padding:20px}.layui-layer-prompt .layui-layer-btn{padding-top:0}.layui-layer-tab{box-shadow:1px 1px 50px rgba(0,0,0,.4)}.layui-layer-tab .layui-layer-title{padding-left:0;overflow:visible}.layui-layer-tab .layui-layer-title span{position:relative;float:left;min-width:80px;max-width:260px;padding:0 20px;text-align:center;overflow:hidden;cursor:pointer}.layui-layer-tab .layui-layer-title span.layui-this{height:43px;border-left:1px solid #eee;border-right:1px solid #eee;background-color:#fff;z-index:10}.layui-layer-tab .layui-layer-title span:first-child{border-left:none}.layui-layer-tabmain{line-height:24px;clear:both}.layui-layer-tabmain .layui-layer-tabli{display:none}.layui-layer-tabmain .layui-layer-tabli.layui-this{display:block}.layui-layer-photos{-webkit-animation-duration:.8s;animation-duration:.8s}.layui-layer-photos .layui-layer-content{overflow:hidden;text-align:center}.layui-layer-photos .layui-layer-phimg img{position:relative;width:100%;display:inline-block;*display:inline;*zoom:1;vertical-align:top}.layui-layer-imgbar,.layui-layer-imguide{display:none}.layui-layer-imgnext,.layui-layer-imgprev{position:absolute;top:50%;width:27px;_width:44px;height:44px;margin-top:-22px;outline:0;blr:expression(this.onFocus=this.blur())}.layui-layer-imgprev{left:10px;background-position:-5px -5px;_background-position:-70px -5px}.layui-layer-imgprev:hover{background-position:-33px -5px;_background-position:-120px -5px}.layui-layer-imgnext{right:10px;_right:8px;background-position:-5px -50px;_background-position:-70px -50px}.layui-layer-imgnext:hover{background-position:-33px -50px;_background-position:-120px -50px}.layui-layer-imgbar{position:absolute;left:0;bottom:0;width:100%;height:32px;line-height:32px;background-color:rgba(0,0,0,.8);background-color:#000\9;filter:Alpha(opacity=80);color:#fff;overflow:hidden;font-size:0}.layui-layer-imgtit *{display:inline-block;*display:inline;*zoom:1;vertical-align:top;font-size:12px}.layui-layer-imgtit a{max-width:65%;overflow:hidden;color:#fff}.layui-layer-imgtit a:hover{color:#fff;text-decoration:underline}.layui-layer-imgtit em{padding-left:10px;font-style:normal}@-webkit-keyframes layer-bounceOut{100%{opacity:0;-webkit-transform:scale(.7);transform:scale(.7)}30%{-webkit-transform:scale(1.05);transform:scale(1.05)}0%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes layer-bounceOut{100%{opacity:0;-webkit-transform:scale(.7);-ms-transform:scale(.7);transform:scale(.7)}30%{-webkit-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}0%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}.layer-anim-close{-webkit-animation-name:layer-bounceOut;animation-name:layer-bounceOut;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:.2s;animation-duration:.2s}@media screen and (max-width:1100px){.layui-layer-iframe{overflow-y:auto;-webkit-overflow-scrolling:touch}}.maintainableTree-default{    background-color: #FFF;}.inputform {    table-layout: fixed;    width: 500px;    border-collapse: separate;    border-spacing: 0px 10px;    font-family: \"microsoft yahei ui\", \"microsoft yahei\", simsun, sans-serif;    font-size: 14px;}.lbltd {    width: 20%;    height: 35px;    color: #000;    text-align: left;    padding: 0 0;    padding-right: 16px;    text-align: right;    border: 0px;    font-family: \"microsoft yahei ui\", \"microsoft yahei\", simsun, sans-serif;}.in {    width: 70%;    /*border: 1px solid #e4e4e4;*/    /*border-radius: 4px;*/    font-family: \"microsoft yahei ui\", \"microsoft yahei\", simsun, sans-serif;}.hiddentd {    width: 10%;}input[type=text], input[type=password], input[type=password] {    width:95%;    height: 27px;    font-size: 14px;    line-height: 27px;    padding-left: 8px;    background-color: #fff;    font-family: \"microsoft yahei ui\", \"microsoft yahei\", simsun, sans-serif;    /*border: 1px solid #b2bdc5;*/    /*border-radius: 4px;*/}textarea{    padding-left: 8px;    line-height: 27px;    font-size: 14px;    font-family: \"microsoft yahei ui\", \"microsoft yahei\", simsun, sans-serif;}/*保存按钮*/.footer {    width: 300px;    height: 40px;    margin: 0 auto;    line-height: 40px;    margin-bottom: 10px;    margin-top: 2px;    text-align: center;}.btn {    display: inline-block;    margin: 0;    color: #fff;    border: 0px solid #b2d2fc;    font-weight: 300;    font-size: 14px;    font-family: PingFangSC, \"helvetica neue\", \"hiragino sans gb\", arial, \"microsoft yahei ui\", \"microsoft yahei\", simsun, sans-serif;    text-decoration: none;    text-align: center;    line-height: 30px;    height: 30px;    width: 80px;    border-radius: 5px;    cursor: pointer;    -webkit-box-sizing: border-box;    -moz-box-sizing: border-box;    box-sizing: border-box;    -webkit-transition-property: all;    transition-property: all;    -webkit-transition-duration: .3s;    transition-duration: .3s;}.btn {    text-align: center;    height: 30px;    line-height: 27px;    color: #fff;    border-width: 0px;    background-color: #599fff;    border-radius: 4px;}.btn_font_2 {    width: 80px;}.padd8 {    padding-right: 4px;    padding-left: 4px;}/*必填项字体颜色*/.rg6{    color:#F00;}.btn_cancle {    text-align: center;    height: 29px;    line-height: 27px;    color: #2E2E2E;    border: 1px solid #e4e4e4;    background-color: #fff;    border-radius: 4px;    cursor:pointer;}",
    uxrequirejs: "[\"components/ux/maintainabletreebcomponent/1.0/js/template-web.js\",\"components/ux/maintainabletreebcomponent/1.0/js/layer.js\",\"components/ux/maintainabletreebcomponent/1.0/js/dhtmlxtree_xw.js\"]",
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
        try {
            var thisComponent;
            var page = this;

            function SbflTreeBComponent_afterrender(sender) {
                //获取参数并处理
                thisComponent = new hw.comps.busi.SbflTreeBComponent({
                    options: {
                        skin: page.skin || 'maintainableTree-default', //皮肤
                        //树组件
                        treeStore: page.treeStore, //树数据集
                        classSystem: page.classSystem, //分类系统ID
                        servicePath: page.servicePath, //服务接口地址
                        showMenu: page.showMenu, //是否展示右键菜单
                        parentField: page.parentField, //父节点字段
                        valueField: page.valueField, //值字段
                        displayField: page.displayField, //显示字段
                        folderIcon: page.folderIcon, //文件夹图标
                        leafIcon: page.leafIcon, //叶子节点图标
                        allowCheckbox: page.allowCheckbox, //是否展示复选框
                        showRoot: page.showRoot, //是否展示根节点
                        rootText: page.rootText, //根节点名称
                        rootValue: page.rootValue, //根节点值
                        openAllItems: page.openAllItems, //展开所有节点
                        enableDragAndDrop: page.enableDragAndDrop //允许树节点拖动
                    },
                    events: {
                        onTreeSelect: function(param1) {
                            page.fireEvent('onTreeSelect', page, param1);
                        },
                        onTreeChecked: function(param1) {
                            page.fireEvent('onTreeChecked', page, param1);
                        },
                        onTreeDbClick: function(param1) {
                            page.fireEvent('onTreeDbClick', page, param1);
                        },
                        onTreeRightClick: function(param1) {
                            page.fireEvent('onTreeRightClick', page, param1);
                        }
                    }
                }, sender);
                //数据绑定 
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
                                            id: records[i].data[page.valueField],
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
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.SbflTreeBComponent',
                p2: ex.message
            }, ex, 100);
        }
        this.SbflTreeBComponent_afterrender = SbflTreeBComponent_afterrender;
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getSelectedItemId = function(param1) {
            //直接填写方法内容
            return thisComponent.getSelectedItemId();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.SbflTreeBComponent");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.SbflTreeBComponent");
    }
})