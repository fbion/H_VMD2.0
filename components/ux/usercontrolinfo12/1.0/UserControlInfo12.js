Ext.define('vmd.ux.userControlInfo.Controller', {
    xtype: 'vmd.ux.userControlInfo.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.UserControlInfo12", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.Uploader$1.0$Uploader"]),
    version: "1.0",
    xtype: "vmd.ux.UserControlInfo12",
    title: "Panel",
    header: false,
    border: false,
    width: 600,
    layout: "auto",
    afterrender: "UserControlInfo12_afterrender",
    autoScroll: false,
    autoHeight: true,
    listeners: {
        vmdafterrender: function() {
            try {
                this.UserControlInfo12_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.UserControlInfo12'
                }, ex, 50);
            }
        }
    },
    uxCss: ".empty_fontcolor{color:#08080857;}",
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
        try {
            var hwTree;
            var page = this;
            //设置初始化信息  初始化组件的基础信息
            function UserControlInfo12_afterrender(sender) {}

            function toRefresh(Tree) {
                hwTree = Tree;
                var tree = hwTree;
                var newnode = tree.newnode;
                //根据是否时新节点来进行不同设置，新节点默认部分信息，已存在节点自动提取节点上的文件信息
                if (newnode) {
                    MyField.setValue(newGuid(32));
                    MyField1.setValue("");
                    MyField1.setDisabled(false);
                    MyField2.setValue(Ext.util.Cookies.get('userName'));
                    MyField3.setValue(Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'));
                    MyField4.setValue("");
                    MyField5.setValue("");
                    Text_Ver.setValue("1.0");
                    MyField7.setValue("");
                    uxName.setValue("");
                    clearImgAndFile();
                } else {
                    var selId = tree.getSelectedItemId();
                    var selnode = tree.itemObj[selId];
                    hwCheckbox.setValue(selnode.shared == "1" ? true : false);
                    MyField.setValue(selnode.code);
                    MyField1.setValue(selnode.text);
                    MyField1.setDisabled(true); //修改查看信息时，组件名不能修改，只能查看
                    MyField2.setValue(selnode.createuser);
                    MyField3.setValue(selnode.createtime);
                    MyField4.setValue(selnode.changeuser);
                    MyField5.setValue(selnode.changetime);
                    Text_Ver.setValue(selnode.version || "1.0");
                    MyField7.setValue(selnode.remark);
                    uxName.setValue(selnode.uxname);
                    //uxName.setDisabled(true);
                    clearImgAndFile();
                    imageLoad(selnode);
                    filesLoad(selnode);
                }
            }

            function imageLoad(selnode) {
                var filePath = "components/upload/image/";
                if (selnode)
                    filePath = "components/upload/image/" + selnode.text;
                var hwFao = new HwFao(vmdSettings.dataServiceIp, "vmd");
                hwFao.getDirs(filePath, '', function(result) {
                    if (result && result.data && result.data.length > 0) {
                        var str = "";
                        for (var i = 0; i < result.data.length; i++) {
                            var html = document.createElement('div');
                            html.style.width = "90px";
                            html.style.height = "100px";
                            html.style.display = 'block';
                            html.style.float = "left";
                            html.style.marginRight = "20px";
                            html.style.marginTop = "5px";
                            html.style.border = "1px solid lightgray";
                            html.style.cursor = "pointer";
                            var image = document.createElement('img');
                            image.setAttribute('src', vmd.virtualPath + "/" + filePath + "/" + result.data[i].name);
                            image.style.width = "88px";
                            image.style.height = "96px";
                            image.style.float = "left";
                            image.style.border = "1px soild red !important";
                            image.style.padding = "1px";
                            //image.className = 'addimg';
                            image.innerText = result.data[i].name;
                            //图片点击
                            var imageList = {};
                            var imageListItems = [];
                            var index = -1;
                            var selectedImage;
                            var selectedDiv;
                            image.onclick = function() {
                                for (var i = 0; i < result.data.length; i++) { //遍历当前的资源，将图片列表信息生成特定格式
                                    var itemData = result.data[i];
                                    var imageListItem = {
                                        msrc: vmd.virtualPath + "/" + filePath + "/" + result.data[i].name,
                                        src: vmd.virtualPath + "/" + filePath + "/" + result.data[i].name,
                                        h: 0,
                                        w: 0,
                                        title: result.data[i].name
                                    }
                                    imageListItems.push(imageListItem);
                                    index++; ////获取当前图片在图片列表中的索引
                                    if (this.textContent == result.data[i].name) //根据当前点击的项与添加的图片项作对比 记录当前点击图片的index
                                        imageList.index = index;
                                }
                                imageList.items = imageListItems;
                                vmd.showImg(imageList);
                            }
                            vmd(html).on('mouseenter', function() {
                                vmd(this).find('.wrap').show();
                                selectedImage = this.firstChild;
                                selectedDiv = this;
                            });
                            vmd(html).on('mouseleave', function() {
                                vmd(this).find('.wrap').hide();
                            });
                            html.appendChild(image);
                            var div = document.createElement('div');
                            div.className = "wrap"
                            div.style.backgroundColor = "RGB(103,44,44)";
                            div.style.width = "90px";
                            div.style.height = "20px";
                            div.style.position = 'absolute';
                            div.style.display = "none";
                            div.style.textAlign = "right";
                            div.style.padding = "2px";
                            image = document.createElement('img');
                            image.setAttribute('src', '/img/public/aaaaaaa_03.png');
                            image.style.width = '15px';
                            image.style.height = '15px';
                            image.onclick = function() {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: '是否要删除服务器上该图片?',
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(result) {
                                        if (result == "yes") {
                                            if (selectedImage) {
                                                var dpath = "components/upload/image/";
                                                if (MyField1.getValue())
                                                    dpath += MyField1.getValue() + "/";
                                                selectedDiv.remove();
                                                hwDas.remove("vmd", dpath + selectedImage.textContent, function(result) {
                                                    //alert("删除成功！")
                                                    img_div.doLayout();
                                                }, function() {});
                                            }
                                        }
                                    },
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION
                                });
                            }
                            div.appendChild(image);
                            html.appendChild(div);
                            img_div.el.dom.insertBefore(html, hwDiv.el.dom)
                        }
                        img_div.setHeight(img_div.el.dom.scrollHeight);
                        hwDiv4.setHeight(img_div.el.dom.scrollHeight);
                    }
                }, function() {})
            }

            function clearImgAndFile() {
                if (txtFiles.el.dom && txtFiles.el.dom.children && txtFiles.el.dom.children.length > 0) {
                    for (var i = 0; i < txtFiles.el.dom.children.length;) {
                        var currentDiv = txtFiles.el.dom.children[i];
                        currentDiv.remove();
                        i = 0;
                    }
                }
                if (img_div.el.dom && img_div.el.dom.children && img_div.el.dom.children.length > 1) {
                    for (var i = 0; i < img_div.el.dom.children.length - 1;) {
                        var currentDiv = img_div.el.dom.children[i];
                        currentDiv.remove();
                        i = 0;
                    }
                }
                txtFiles.setHeight(34);
                upFile_panel.setHeight(43);
                hwDiv3.setHeight(43);
                img_div.setHeight(110);
                hwDiv4.setHeight(120);
            }

            function filesLoad(selnode) {
                var filePath = "components/upload/file/";
                if (selnode)
                    filePath = "components/upload/file/" + selnode.text;
                var hwFao = new HwFao(vmdSettings.dataServiceIp, "vmd");
                hwFao.getDirs(filePath, '', function(result) {
                    if (result && result.data && result.data.length > 0) {
                        var str = "";
                        var html;
                        for (var i = 0; i < result.data.length; i++) {
                            var pdiv = document.createElement('div');
                            // pdiv.style.float = "left";
                            pdiv.style.height = "20px";
                            pdiv.style.padding = "4px"
                            html = document.createElement('a');
                            html.setAttribute('href', vmd.virtualPath + "/" + filePath + "/" + result.data[i].name);
                            html.style.display = 'block';
                            html.style.cursor = "hand";
                            html.innerText = result.data[i].name;
                            pdiv.appendChild(html);
                            vmd(pdiv).on('mouseenter', function() {
                                debugger
                                selectedfImage = this.lastChild;
                                selectedfDiv = this;
                                // vmd(this).find('.frap')[0].style.width = selectedfImage.offsetWidth + "px";
                                vmd(this).find('.frap').show();
                            });
                            vmd(pdiv).on('mouseleave', function() {
                                vmd(this).find('.frap').hide();
                            });
                            var div = document.createElement('div');
                            div.className = "frap"
                            div.style.backgroundColor = "RGB(103,44,44)";
                            div.style.float = "right";
                            div.style.width = "18px";
                            div.style.height = "18px";
                            // div.style.position = 'absolute';
                            div.style.display = "none";
                            // div.style.textAlign = "right";
                            div.style.padding = "4px";
                            image = document.createElement('img');
                            image.setAttribute('src', '/img/public/aaaaaaa_03.png');
                            image.style.width = '15px';
                            image.style.height = '15px';
                            var selectedfImage;
                            var selectedfDiv;
                            image.onclick = function() {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: '是否要删除服务器上该文档?',
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(result) {
                                        if (result == "yes") {
                                            if (selectedfImage) {
                                                var dpath = "components/upload/file/";
                                                if (MyField1.getValue())
                                                    dpath += MyField1.getValue() + "/";
                                                selectedfDiv.remove();
                                                hwDas.remove("vmd", dpath + selectedfImage.textContent, function(result) {
                                                    //alert("删除成功！")
                                                    txtFiles.doLayout()
                                                }, function() {});
                                            }
                                        }
                                    },
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION
                                });
                            }
                            div.appendChild(image);
                            pdiv.insertBefore(div, html);
                            txtFiles.el.dom.appendChild(pdiv)
                        }
                        txtFiles.setHeight(txtFiles.el.dom.scrollHeight);
                        upFile_panel.setHeight(txtFiles.el.dom.scrollHeight);
                        hwDiv3.setHeight(txtFiles.el.dom.scrollHeight + 50);
                        // p.parentElement
                    }
                }, function() {})
            }
            //保存的事件
            function button_click(sender) {
                editId = "";
                //先检测下录入的信息是否全
                if (!saveCheck()) {
                    return;
                }
                //保存模块的基础信息
                saveModelInfo("", "", function() {
                    vmd.isCheckFileExist('components/vmd/' + MyField1.getValue() + '.vmd', function(data) {
                        if (data) {
                            vmd.core.updateCmpZhname(MyField1.getValue(), uxName.getValue(), function() {
                                Ext.Msg.alert("提示", "保存成功！")
                            })
                        } else
                            Ext.Msg.alert("提示", "保存成功！")
                    }, true);
                })
            }
            editId = newGuid(10);
            //模块保存按钮操作
            //ver   要保存的版本号
            //edit_reason   发布版本的修改信息
            //callback   回调
            function saveModelInfo(ver, edit_reason, callback) {
                var mytree = hwTree; //获取树
                var newnode = mytree.newnode; //获取是否为新组件
                var selId = mytree.getSelectedItemId(); //获取当前选中节点
                var selnode = mytree.itemObj[selId]; ////获取当前选中节点
                var selnodepath = selnode.path; //获取路径
                var id = newGuid(10); //
                var category_id = selId;
                //var Project_id = selnode.projectId;
                // if(selnode.isProject) {
                //     category_id = "0";
                //     Project_id = selId;
                // }
                var codeid = MyField.getValue();
                var name = MyField1.getValue(); //组件名
                var remark = MyField7.getValue(); //组件说明
                var type = "0";
                //判断是否为新节点，进行不同的服务操作
                //非新节点
                if (!newnode) {
                    MyField4.setValue(Ext.util.Cookies.get('userName'));
                    MyField5.setValue(Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'))
                    //更新模块基础信息
                    hwDas.ajax({
                        das: {
                            idedas: true
                        },
                        url: "CDEServcie/resource/zygl",
                        type: 'put',
                        timeout: 5000,
                        params: {},
                        headers: {
                            Ecylogin: Ext.util.Cookies.get('EcyLogin') || Ext.util.Cookies.get('ecyLogin')
                        },
                        data: [{
                            editid: editId,
                            id: selId,
                            // code: selnode.code,
                            // type: '4',
                            uxname: uxName.getValue(),
                            remark: remark,
                            // project_id: Project_id,
                            version: ver || Text_Ver.getValue(),
                            shared: hwCheckbox.getValue() ? "1" : "0",
                            readdate: Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'),
                            //filepath: '/components/vmd/' + name + '.vmd',
                            row_changed_by: MyField4.getValue(),
                            row_changed_date: MyField5.getValue(),
                            edit_reason: edit_reason || "修改基础信息"
                        }],
                        success: function(result) {
                            selnode.text = name;
                            selnode.changetime = MyField5.getValue();
                            selnode.changeuser = MyField4.getValue();
                            selnode.uxname = uxName.getValue();
                            selnode.remark = MyField7.getValue();
                            selnode.isModel = true;
                            selnode.version = Text_Ver.getValue();
                            selnode.shared = hwCheckbox.getValue() ? "1" : "0";
                            mytree.setItemText(selId, name)
                            callback();
                        },
                        error: function(msg) {
                            Ext.Msg.alert("提示", "保存模块基础信息失败")
                            return;
                        }
                    })
                } else { //新节点
                    //新节点先检测是否重名
                    checkName(name, function() {
                        //保存模块基础信息
                        hwDas.ajax({
                            das: {
                                idedas: true
                            },
                            url: "CDEServcie/resource/zygl",
                            type: 'post',
                            timeout: 5000,
                            params: {},
                            headers: {
                                Ecylogin: Ext.util.Cookies.get('EcyLogin') || Ext.util.Cookies.get('ecyLogin')
                            },
                            data: [{ //要提交的数据
                                editid: editId,
                                id: id,
                                code: codeid,
                                type: '4',
                                name: name,
                                uxname: uxName.getValue(),
                                remark: remark,
                                category_id: category_id,
                                //project_id: Project_id,
                                shared: hwCheckbox.getValue() ? "1" : "0",
                                version: Text_Ver.getValue(),
                                readdate: Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'),
                                filepath: '/components/vmd/' + name + '.vmd',
                                row_created_by: MyField2.getValue(),
                                row_created_date: MyField3.getValue()
                            }],
                            success: function(result) {
                                //添加成功后需要将节点添加到树上，并设置节点的信息
                                mytree.insertNewChild(selId, id, name);
                                mytree.setItemImage2(id, "tree/model.png", "tree/model.png", "tree/model.png")
                                var treenode = mytree.item(id);
                                treenode.path = selnodepath + "/" + id;
                                //treenode.projectId = Project_id;
                                if (treenode) {
                                    treenode.isModel = true;
                                    treenode.text = name;
                                    treenode.createuser = MyField2.getValue();
                                    treenode.createtime = MyField3.getValue();
                                    treenode.changetime = MyField5.getValue();
                                    treenode.changeuser = MyField4.getValue();
                                    treenode.uxname = uxName.getValue();
                                    treenode.remark = remark;
                                    treenode.version = Text_Ver.getValue();
                                    treenode.code = codeid;
                                    treenode.type = '4';
                                    treenode.shared = hwCheckbox.getValue() ? "1" : "0";
                                    treenode.newnode = true;
                                }
                                mytree.itemObj[id] = treenode;
                                //设置当前节点选中
                                mytree.selectItem(id, false, false);
                                mytree.newnode = false; //新节点状态置为false
                                MyField1.setDisabled(true)
                                callback();
                            },
                            error: function(msg) {
                                Ext.Msg.alert("提示", "保存模块基础信息失败")
                                return;
                            }
                        })
                    })
                }
            }
            //检测组件是否重名
            //name  组件名
            //callback  回调
            function checkName(name, callback) {
                hwDas.ajax({
                    das: {
                        idedas: true
                    },
                    url: "CDEServcie/resource/info",
                    type: 'get',
                    timeout: 5000,
                    params: {
                        name: name
                    },
                    success: function(result) {
                        if (result.data[0].datas.length <= 0) {
                            if (callback)
                                callback()
                        } else {
                            Ext.Msg.alert("提示", "该组件已存在，请重新命名组件！")
                            return;
                        }
                    },
                    error: function(msg) {
                        Ext.Msg.alert("提示", "保存信息失败(检测是否重名出错!)")
                        return;
                    }
                })
            }
            //组件设计事件
            function button1_click(sender) {
                editId = newGuid(10);
                var mytree = hwTree;
                var selId = mytree.getSelectedItemId();
                var selnode = mytree.itemObj[selId];
                //设计前先进行录入检测
                if (!saveCheck()) {
                    return;
                }
                var openDesigner = function() {
                    selId = mytree.getSelectedItemId();
                    selnode = mytree.itemObj[selId];
                    var params = {
                        type: "ux",
                        path: selnode.text + '.vmd',
                        uxid: selId,
                        name: selnode.text,
                        uxname: selnode.uxname,
                        ver: selnode.version
                    }
                    window.open(vmd.virtualPath + '/design/default.html?' + Ext.urlEncode(params), selnode.text + " 组件设计")
                }
                //保存组件信息  并打开设计界面
                var newnode = mytree.newnode;
                if (newnode)
                    saveModelInfo("", "", openDesigner)
                else
                    openDesigner()
                //saveModelInfo("", "", openDesigner)
            }
            //自定义自定义方法
            //返回guid 
            //len 长度
            function newGuid(len) {
                var length = 32;
                if (len)
                    length = len - 2
                var guid = "";
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                for (var i = 0; i < length; i++) {
                    pos = Math.round(Math.random() * (arr.length - 1));
                    guid += arr[pos];
                }
                return "hw" + guid;
            }

            function openSelMode(id, name, path) {
                //  parent.openSelMode(id, name, path)
            }
            //文本初始化  设置校验规则  正则表达式
            function MyField1_beforerender(sender) {
                MyField1.regex = /^[A-Z][a-zA-Z0-9_]*$/;
                MyField1.regexText = "名称须以大写字母开头，且只能包含数字、字母、下划线";
            }

            function MyField7_beforerender(sender) {}
            //发布事件处理
            function button2_click(sender) {
                editId = newGuid(10);
                //调用发布界面
                publish(function(name, oldver, newver) {
                    //复制文件到发布目录下
                    hwDas.copy("vmd", "components/ux/" + name + "/" + oldver + "/" + name + ".js", "components_release/ux/" + name + "/" + newver + "/" + name + ".js", function() {}, function() {
                        Ext.Msg.alert("提示", "发布组件失败(拷贝文件出错),请重新发布！")
                    });
                })
            }
            //发布界面信息填写
            //callback 回调
            function publish(callback) {
                //创建一个form，填写name，备注 
                //获取当前组件的版本，并生成对应的数据集  当前版本  版本+0.1
                var mytree = hwTree;
                var selId = mytree.getSelectedItemId();
                var selnode = mytree.itemObj[selId];
                var ver = selnode.version;
                //创建组件发布的发布信息表单
                var form = new Ext.form.FormPanel({
                    labelAlign: "top",
                    bodyStyle: "padding: 10px",
                    border: false,
                    items: [{
                        xtype: "textarea", //发布组件的信息  记录修改的内容
                        allowBlank: true,
                        height: 135,
                        name: 'remark',
                        anchor: "100%",
                        fieldLabel: "更新日志",
                        emptyText: "请输入组件修改内容或修改日志"
                    }]
                })
                //将表单添加到页面中
                var win = new Ext.Window({
                    width: 440,
                    height: 260,
                    title: '复合组件版本发布',
                    hidden: false,
                    layout: "fit",
                    border: false,
                    modal: true,
                    items: form,
                    fbar: [{
                        text: '确定',
                        handler: function() {
                            if (form.getForm().isValid()) {
                                var values = form.form.getValues()
                                /*保存前校验*/
                                if (values.remark == "") {
                                    Ext.Msg.alert("提示", "升级日志不能为空")
                                    return false;
                                }
                                //保存发布的信息
                                saveModelInfo("", values.remark, function() {
                                    callback(selnode.text, selnode.version, selnode.version)
                                    win.close()
                                })
                            }
                        }
                    }, {
                        text: '取消',
                        handler: function() {
                            win.close()
                        }
                    }]
                });
                win.show()
            }
            /*
            保存前校验
            */
            function saveCheck() {
                if (MyField1.getValue() == "") {
                    Ext.Msg.alert("提示", "组件名不能为空")
                    return false;
                }
                if (MyField1.getActiveError() != "") {
                    Ext.Msg.alert("提示", MyField1.getActiveError())
                    return false;
                }
                if (uxName.getValue() == "") {
                    Ext.Msg.alert("提示", "组件中文名不能为空")
                    return false;
                }
                return true;
            }
            //创建新版本
            function button3_click(sender) {
                editId = newGuid(10);
                var mytree = hwTree;
                var selId = mytree.getSelectedItemId();
                var selnode = mytree.itemObj[selId];
                var ver = selnode.version;
                f_ver = parseFloat(ver);
                newver = String((f_ver + 0.1).toFixed(1));
                Ext.Msg.confirm("提示", "是否要升级版本号，版本将由" + ver + "升级为" + newver + ",升级版本号之后，历史版本将不可维护，确定要升级么？", function(type) {
                    if (type == "yes") {
                        saveModelInfo(newver, "版本由" + ver + "升级为" + newver, function() {
                            vmd.core.cmpVerUpdate(selnode.text, ver, newver, function() {
                                selnode.version = newver;
                                Text_Ver.setValue(newver);
                            })
                        })
                    } else
                        return;
                })
            }

            function button4_click(sender, e) {
                createWin();
                // upfile.mineTypes =".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx";
                // upfile.mimeTypes =".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx";
                // var uplo = upfile.getUploader()
                // uplo.uploader.option("accept",[{
                //         mimeTypes: upfile.mimeTypes,
                //         extensions: upfile.mimeTypes.replace(/\./g, '')
                //     }])
                upfile.getUploader().upload(vmdSettings.dataServiceIp, "components/upload/file/" + MyField1.getValue(), page.win1, function(fileList) {
                    if (fileList && fileList.length > 0) {
                        var str = "";
                        var html;
                        for (var i = 0; i < fileList.length; i++) {
                            var pdiv = document.createElement('div');
                            // pdiv.style.float = "left";
                            pdiv.style.height = "20px";
                            pdiv.style.padding = "4px"
                            html = document.createElement('a');
                            html.setAttribute('href', vmd.virtualPath + "/" + fileList[i].url);
                            html.style.display = 'block';
                            html.style.cursor = "hand";
                            html.innerText = fileList[i].title;
                            pdiv.appendChild(html);
                            vmd(pdiv).on('mouseenter', function() {
                                debugger
                                selectedfImage = this.lastChild;
                                selectedfDiv = this;
                                //vmd(this).find('.frap')[0].style.width = selectedfImage.offsetWidth + "px";
                                vmd(this).find('.frap').show();
                            });
                            vmd(pdiv).on('mouseleave', function() {
                                vmd(this).find('.frap').hide();
                            });
                            var div = document.createElement('div');
                            div.className = "frap"
                            div.style.backgroundColor = "RGB(103,44,44)";
                            div.style.float = "right";
                            div.style.width = "18px";
                            div.style.height = "18px";
                            // div.style.position = 'absolute';
                            div.style.display = "none";
                            // div.style.textAlign = "right";
                            div.style.padding = "4px";
                            image = document.createElement('img');
                            image.setAttribute('src', '/img/public/aaaaaaa_03.png');
                            image.style.width = '15px';
                            image.style.height = '15px';
                            var selectedfImage;
                            var selectedfDiv;
                            image.onclick = function() {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: '是否要删除服务器上该文档?',
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(result) {
                                        if (result == "yes") {
                                            if (selectedfImage) {
                                                var dpath = "components/upload/file/";
                                                if (MyField1.getValue())
                                                    dpath += MyField1.getValue() + "/";
                                                selectedfDiv.remove();
                                                hwDas.remove("vmd", dpath + selectedfImage.textContent, function(result) {
                                                    //alert("删除成功！")
                                                    txtFiles.doLayout()
                                                }, function() {});
                                            }
                                        }
                                    },
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION
                                });
                            }
                            div.appendChild(image);
                            pdiv.insertBefore(div, html);
                            txtFiles.el.dom.appendChild(pdiv)
                        }
                        txtFiles.setHeight(txtFiles.el.dom.scrollHeight);
                        upFile_panel.setHeight(txtFiles.el.dom.scrollHeight);
                        hwDiv3.setHeight(txtFiles.el.dom.scrollHeight + 50);
                        // p.parentElement
                    }
                }, "vmd");
            }

            function createWin() {
                if (!page.win) {
                    page.win = new vmd.window({
                        items: upfile,
                        auto: false,
                        height: 500,
                        width: 655,
                        maximizable: false,
                        resizable: false,
                        closeAction: 'hide',
                        title: "文件上传"
                    })
                }
                upfile.getUploader().uploader.on('fileQueued', function(file) {
                    upfile.show();
                })
            }

            function createWin1() {
                if (!page.win1) {
                    page.win1 = new vmd.window({
                        items: upimg,
                        auto: false,
                        height: 500,
                        width: 655,
                        maximizable: false,
                        resizable: false,
                        closeAction: 'hide',
                        title: "文件上传"
                    })
                }
                upimg.getUploader().uploader.on('fileQueued', function(file) {
                    upimg.show();
                })
            }

            function hwImg_click(sender) {
                createWin1();
                // upimg.mineTypes = ".jpeg,.jpg,.png,.gif,.bmp";
                // upimg.mimeTypes = ".jpeg,.jpg,.png,.gif,.bmp";
                // // mimeTypes = ".jpeg,.jpg,.png,.gif,.bmp";
                // var uplo = upimg.getUploader()
                // uplo.uploader.option("accept",[{
                //         mimeTypes: upimg.mimeTypes,
                //         extensions: upimg.mimeTypes.replace(/\./g, '')
                //     }])
                upimg.getUploader().upload(vmdSettings.dataServiceIp, "components/upload/image/" + MyField1.getValue(), page.win1, function(fileList) {
                    if (fileList && fileList.length > 0) {
                        var str = "";
                        for (var i = 0; i < fileList.length; i++) {
                            var html = document.createElement('div');
                            html.style.width = "90px";
                            html.style.height = "100px";
                            html.style.display = 'block';
                            html.style.float = "left";
                            html.style.marginRight = "20px";
                            html.style.marginTop = "5px";
                            html.style.border = "1px solid lightgray";
                            html.style.cursor = "pointer";
                            var image = document.createElement('img');
                            image.setAttribute('src', vmd.virtualPath + "/" + fileList[i].url);
                            image.style.width = "88px";
                            image.style.height = "96px";
                            image.style.float = "left";
                            image.style.border = "1px soild red !important";
                            image.style.padding = "1px";
                            //image.className = 'addimg';
                            image.innerText = fileList[i].title;
                            //图片点击
                            var imageList = {};
                            var imageListItems = [];
                            var index = -1;
                            var selectedImage;
                            var selectedDiv;
                            image.onclick = function() {
                                for (var i = 0; i < fileList.length; i++) { //遍历当前的资源，将图片列表信息生成特定格式
                                    var itemData = fileList[i];
                                    var imageListItem = {
                                        msrc: vmd.virtualPath + "/" + fileList[i].url,
                                        src: vmd.virtualPath + "/" + fileList[i].url,
                                        h: 0,
                                        w: 0,
                                        title: fileList[i].title
                                    }
                                    imageListItems.push(imageListItem);
                                    index++; ////获取当前图片在图片列表中的索引
                                    if (this.textContent == fileList[i].title) //根据当前点击的项与添加的图片项作对比 记录当前点击图片的index
                                        imageList.index = index;
                                }
                                imageList.items = imageListItems;
                                vmd.showImg(imageList);
                            }
                            vmd(html).on('mouseenter', function() {
                                vmd(this).find('.wrap').show();
                                selectedImage = this.firstChild;
                                selectedDiv = this;
                            });
                            vmd(html).on('mouseleave', function() {
                                vmd(this).find('.wrap').hide();
                            });
                            html.appendChild(image);
                            var div = document.createElement('div');
                            div.className = "wrap"
                            div.style.backgroundColor = "RGB(103,44,44)";
                            div.style.width = "88px";
                            div.style.height = "20px";
                            div.style.position = 'absolute';
                            div.style.display = "none";
                            div.style.textAlign = "right";
                            div.style.padding = "2px";
                            image = document.createElement('img');
                            image.setAttribute('src', '/img/public/aaaaaaa_03.png');
                            image.style.width = '15px';
                            image.style.height = '15px';
                            image.onclick = function() {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: '是否要删除服务器上该图片?',
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(result) {
                                        if (result == "yes") {
                                            if (selectedImage) {
                                                var dpath = "components/upload/image/";
                                                if (MyField1.getValue())
                                                    dpath += MyField1.getValue() + "/";
                                                selectedDiv.remove();
                                                hwDas.remove("vmd", dpath + selectedImage.textContent, function(result) {
                                                    //alert("删除成功！")
                                                    img_div.doLayout()
                                                }, function() {});
                                            }
                                        }
                                    },
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION
                                });
                            }
                            div.appendChild(image);
                            html.appendChild(div);
                            img_div.el.dom.insertBefore(html, hwDiv.el.dom)
                        }
                        img_div.setHeight(img_div.el.dom.scrollHeight);
                        hwDiv4.setHeight(img_div.el.dom.scrollHeight);
                    }
                }, "vmd");
            }

            function hwImg_afterrender(sender) {
                vmd(hwDiv.el.dom).on('mouseenter', function() {
                    this.style.cursor = 'hand';
                })
                vmd(hwDiv).on('mouseleave', function() {
                    this.style.cursor = 'default';
                })
            }

            function upfile_beforerender(sender) {
                // upfile.mineTypes = ".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx";
                // upfile.mimeTypes = ".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx";
            }

            function upimg_beforerender(sender) {
                //upimg.mineTypes = ".jpeg,.jpg,.png,.gif";
                //  upimg.mimeTypes = ".jpeg,.jpg,.png,.gif";
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.UserControlInfo12',
                p2: ex.message
            }, ex, 100);
        }
        this.UserControlInfo12_afterrender = UserControlInfo12_afterrender;
        this.items = [{
                xtype: "vmd.div",
                id: "hwDiv5",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 576,
                height: 560,
                layout: "absolute",
                items: [{
                        xtype: "vmd.ux.Uploader",
                        id: "upimg",
                        layout: "fit",
                        hidden: true,
                        beforerender: "upimg_beforerender",
                        mineTypes: ".jpeg,.jpg,.png",
                        listeners: {
                            beforerender: upimg_beforerender
                        }
                    },
                    {
                        xtype: "vmd.ux.Uploader",
                        id: "upfile",
                        layout: "fit",
                        x: 10,
                        y: 200,
                        hidden: true,
                        width: 640,
                        height: 550,
                        mineTypes: ".xls,.xlsx,.doc,.docx,.txt,.ppt,.pptx,.pdf",
                        beforerender: "upfile_beforerender",
                        listeners: {
                            beforerender: upfile_beforerender
                        }
                    },
                    {
                        xtype: "label",
                        id: "hwLabel1",
                        text: "*",
                        x: 30,
                        y: 160,
                        width: 20,
                        style: "font-size: 16px;    color: red;"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel",
                        text: "*",
                        x: 30,
                        y: 120,
                        width: 30,
                        style: "font-size: 16px;    color: red;"
                    },
                    {
                        xtype: "textfield",
                        id: "uxName",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 110,
                        y: 160,
                        width: 460,
                        emptyText: "复合组件中文名称，必填",
                        emptyClass: "empty_fontcolor"
                    },
                    {
                        xtype: "label",
                        id: "label",
                        text: "中文名称：",
                        x: 40,
                        y: 160,
                        height: 20
                    },
                    {
                        xtype: "vmd.button",
                        id: "button3",
                        type: "(none)",
                        size: "small",
                        x: 540,
                        y: 198,
                        icon: "icon-plus",
                        style: "color: blue;    border:0;",
                        width: 30,
                        click: "button3_click",
                        listeners: {
                            click: button3_click
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "Text_Ver",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 110,
                        y: 200,
                        width: 460,
                        disabled: true
                    },
                    {
                        xtype: "vmd.button",
                        id: "button2",
                        text: "发布",
                        type: "info",
                        size: "large",
                        x: 380,
                        y: 520,
                        click: "button2_click",
                        hidden: true,
                        listeners: {
                            click: button2_click
                        }
                    },
                    {
                        xtype: "label",
                        id: "label1",
                        text: "共享：",
                        x: 40,
                        y: 240
                    },
                    {
                        xtype: "checkbox",
                        id: "hwCheckbox",
                        fieldLabel: "Checkbox",
                        x: 110,
                        y: 235
                    },
                    {
                        xtype: "label",
                        id: "MyLabel",
                        text: "基础信息",
                        x: 40,
                        y: 30,
                        style: "color: blue;    font-size: 20px;"
                    },
                    {
                        xtype: "label",
                        id: "MyLabel1",
                        text: "编码：",
                        x: 40,
                        y: 80
                    },
                    {
                        xtype: "label",
                        id: "MyLabel2",
                        text: "名称：",
                        x: 40,
                        y: 120
                    },
                    {
                        xtype: "label",
                        id: "MyLabel3",
                        text: "创建人：",
                        x: 40,
                        y: 273
                    },
                    {
                        xtype: "label",
                        id: "MyLabel4",
                        text: "创建时间：",
                        x: 40,
                        y: 310
                    },
                    {
                        xtype: "label",
                        id: "MyLabel5",
                        text: "修改人：",
                        x: 40,
                        y: 350
                    },
                    {
                        xtype: "label",
                        id: "MyLabel6",
                        text: "修改时间：",
                        x: 40,
                        y: 390
                    },
                    {
                        xtype: "label",
                        id: "MyLabel7",
                        text: "说明：",
                        x: 40,
                        y: 430,
                        height: 20
                    },
                    {
                        xtype: "textfield",
                        id: "MyField",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 110,
                        y: 80,
                        width: 460,
                        disabled: true
                    },
                    {
                        xtype: "textfield",
                        id: "MyField1",
                        allowBlank: false,
                        enableKeyEvents: true,
                        x: 110,
                        y: 120,
                        width: 460,
                        beforerender: "MyField1_beforerender",
                        emptyText: "复合组件名称（如:ISIP_ListView）",
                        emptyClass: "empty_fontcolor ",
                        listeners: {
                            beforerender: MyField1_beforerender
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "MyField2",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 110,
                        y: 270,
                        width: 460,
                        disabled: true
                    },
                    {
                        xtype: "textfield",
                        id: "MyField3",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 110,
                        y: 310,
                        width: 460,
                        disabled: true
                    },
                    {
                        xtype: "textfield",
                        id: "MyField4",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 110,
                        y: 350,
                        width: 460,
                        disabled: true
                    },
                    {
                        xtype: "textfield",
                        id: "MyField5",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 110,
                        y: 390,
                        width: 460,
                        disabled: true
                    },
                    {
                        xtype: "textarea",
                        id: "MyField7",
                        allowBlank: true,
                        x: 110,
                        y: 430,
                        width: 460,
                        beforerender: "MyField7_beforerender",
                        listeners: {
                            beforerender: MyField7_beforerender
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button",
                        text: "保存",
                        type: "info",
                        size: "large",
                        x: 380,
                        y: 510,
                        click: "button_click",
                        listeners: {
                            click: button_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button1",
                        text: "组件设计",
                        type: "info",
                        size: "large",
                        x: 470,
                        y: 510,
                        click: "button1_click",
                        listeners: {
                            click: button1_click
                        }
                    },
                    {
                        xtype: "label",
                        id: "MyLabel8",
                        text: "版本：",
                        x: 40,
                        y: 200
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv4",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 576,
                height: 120,
                layout: "border",
                items: [{
                        xtype: "vmd.div",
                        id: "hwDiv1",
                        layoutConfig: {
                            align: "top",
                            pack: "end"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 109,
                        height: 50,
                        layout: "hbox",
                        region: "west",
                        y: 5,
                        items: [{
                            xtype: "label",
                            id: "hwLabel2",
                            text: "组件快照 :",
                            x: 0,
                            y: 0,
                            region: "center",
                            width: 72
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "img_div",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 419,
                        height: 110,
                        layout: "auto",
                        autoHeight: false,
                        region: "center",
                        y: 5,
                        items: [{
                            xtype: "vmd.div",
                            id: "hwDiv",
                            autoEl: "div",
                            border: true,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 90,
                            height: 100,
                            layout: "absolute",
                            style: "float: left;    border: 1px dashed #BBBBBB;    margin-top: 5px;    cursor: pointer;",
                            items: [{
                                    xtype: "vmd.img",
                                    id: "hwImg",
                                    width: 40,
                                    height: 40,
                                    style: "cursor: hand;",
                                    click: "hwImg_click",
                                    x: 24,
                                    y: 20,
                                    src: "/img/public/aaaaaaa_07.png",
                                    afterrender: "hwImg_afterrender",
                                    listeners: {
                                        click: hwImg_click,
                                        vmdafterrender: hwImg_afterrender
                                    }
                                },
                                {
                                    xtype: "label",
                                    id: "hwLabel4",
                                    text: "点击上传",
                                    x: 16,
                                    y: 70
                                }
                            ]
                        }]
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv3",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 576,
                height: 43,
                region: "east",
                layout: "border",
                items: [{
                        xtype: "vmd.div",
                        id: "hwDiv2",
                        layoutConfig: {
                            align: "top",
                            pack: "end"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 109,
                        height: 43,
                        layout: "hbox",
                        region: "west",
                        items: [{
                            xtype: "label",
                            id: "hwLabel3",
                            text: "组件资料 :",
                            x: 40,
                            y: 20,
                            width: 72
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "upFile_panel",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 43,
                        layout: "absolute",
                        region: "center",
                        items: [{
                                xtype: "vmd.button",
                                id: "button4",
                                text: "浏览...",
                                type: "(none)",
                                size: "(none)",
                                width: 82,
                                icon: "(none)",
                                style: "background-color: lightgray;    border-radius:0px;",
                                region: "west",
                                x: 370,
                                y: 5,
                                click: "button4_click",
                                listeners: {
                                    click: button4_click
                                }
                            },
                            {
                                xtype: "vmd.div",
                                id: "txtFiles",
                                autoEl: "div",
                                border: true,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 362,
                                height: 34,
                                x: 0,
                                y: 5,
                                autoScroll: false,
                                layout: "hbox",
                                autoHeight: false,
                                style: "border: 1px dashed #BBBBBB;"
                            }
                        ]
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.refresh = function(tree) {
            //直接填写方法内容
            toRefresh(tree)
        }
        this.setReadOnly = function() {
            //直接填写方法内容
            button.hide();
            button1.hide();
            button2.hide();
            button3.hide();
            uxName.disable(); //(true);
            hwCheckbox.disable();
            MyField7.disable();
            MyField1.disable();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.UserControlInfo12");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.UserControlInfo12");
    }
})