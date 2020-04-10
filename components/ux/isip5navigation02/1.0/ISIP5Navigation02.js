Ext.define('vmd.ux.iSIP5Navigation02.Controller', {
    xtype: 'vmd.ux.iSIP5Navigation02.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ISIP5Navigation02", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ISIP5Navigation02",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 618,
    height: 36,
    layout: "absolute",
    afterrender: "ISIP5Navigation02_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.ISIP5Navigation02_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.ISIP5Navigation02'
                }, ex, 50);
            }
        }
    },
    uxCss: ".header-middle #yarnball {    width: 100%;    height: 32px;    overflow: hidden;    float: left;    border: 0;    /*border-left: 0;*/    /*border-top:0;*/    margin-left: -1px;    padding-left: 5px;    font-size: 14px;    font-family: \"微软雅黑\"}.header-middle #yarnball .yarnball {    list-style: none;    margin: 0;    margin-top: -1px;    padding: 0;    position: relative;}.header-middle #yarnball .yarnball .yarnlet {    display: inline-block;    float: left;}.header-middle #yarnball .yarnball .yarnlet a,.header-middle #yarnball .yarnball .yarnlet a:link,.header-middle #yarnball .yarnball .yarnlet a:visited {    color: #666;    display: inline-block;    font-size: 14px;    padding: 0px 15px 0px 20px;    margin-left: -15px;    position: relative;    text-decoration: none;    vertical-align: top;    line-height: 27px;}.header-middle #yarnball .yarnball .yarnlet.first a {    margin-left: 0px;    padding-left: 15px;}.header-middle #yarnball .yarnball .yarnlet a:hover {    background-position: 100% -48px;    color: #333;}.header-middle #yarnball .yarnball .yarnlet a:active,.header-middle #yarnball .yarnball .yarnlet a.curDropToPath {    background-position: 100% -96px;    color: #333;}.header-middle #yarnball .yarnball .yarnlet a.curDropToPath {    color: #fff;    background-position: 100% -144px;}.header-middle #yarnball .yarnball .yarnlet .left-yarn {    background: url(\"/img/common/ybutton.png\") no-repeat 0 -2px;    margin-left: -17px;    padding: 5px 6px 11px 4px;    z-index: 11;    padding-top: 5px \9;}.header-middle #yarnball .yarnball .yarnlet a:hover .left-yarn {    background-position: 0 -50px;}.header-middle #yarnball .yarnball .yarnlet a:active .left-yarn {    background-position: 0 -98px;}.header-middle #yarnball-input input.path {    border: none;    height: 32px;    display: block;    width: 100%;    padding: 0;    padding-left: 10px;    padding-right: 10px;    background: #f8f8f8;    background: #f8f8f8 url(\"/img/common/bg.gif\") 0px -2px repeat-x;    background: none;    width: 94%;    font-size: 1em;    line-height: 25px;    color: #444;}.header-middle #yarnball-input input:focus {    outline: none;}.header-middle #yarnball-input input{    line-height: 32px;}#yarnball p{    display: inline-block;}.Ntext{    /*display: inline-block;*/    float: left;    line-height: 32px;    cursor: default;}.icon-caret-right,.icon-caret-down{    float: left;    font-size:16px;    padding: 0 8px;    margin-top:8px;    cursor: default;}#yarnball:after{    content: '';    clear: both;    display: block;}#yarnball .one{    float: left}#yarnball .two{    float: left}",
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
            var that = this;
            var NodeData = [],
                nowNode;
            var preIsShow = false,
                nextIsShow = false;
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['id', 'name', 'idPath', 'textPath', 'index', 'imgUrl']
            });
            // 返回主页按键点击事件
            function homeButton_click(sender, e) {
                that.fireEvent("homeClick", sender, e)
            }

            function yarnball_ct_afterrender(sender) {
                sender.setFirstPath = function(address, path, isHasChild, index) {
                    addressSet(address, path, isHasChild, 'first');
                }
                sender.setSecondPath = function(address, path, isHasChild, index) {
                    addressSet(address, path, isHasChild, 'second');
                }
                var addressSet = function(address, path, isHasChild, index) {
                    // var v = address
                    // if(v.charAt(0) != '/') {
                    //     v = "/"+v 
                    // }
                    // if(index === 'first') {
                    //     $("#yarnball-input input").val(address);
                    // } else if(index === 'second') {
                    //     $("#yarnball-input input").val($("#yarnball-input input").val()+address);
                    // }
                    var _addressSet = function(address, path, isHasChild, index) {
                        // 处理传递过来的路径
                        var e = address;
                        e = e.replace(/\/+/g, "/");
                        var textData = e.split("/");
                        "" == textData[textData.length - 1] && textData.pop();
                        var i = path;
                        i = i.replace(/\/+/g, "/");
                        var idData = i.split("/");
                        "" == idData[idData.length - 1] && idData.pop();
                        "" == idData[0] && idData.shift();
                        var addressObj = [];
                        for (var i = 0; i < textData.length; i++) {
                            addressObj.push({
                                id: idData[i],
                                text: textData[i],
                            })
                            if (addressObj[i - 1] && addressObj[i - 1].textPath) {
                                addressObj[i].textPath = addressObj[i - 1].textPath + textData[i] + '/';
                                addressObj[i].idPath = addressObj[i - 1].idPath + idData[i] + '/'
                            } else {
                                addressObj[i].textPath = textData[i] + '/';
                                addressObj[i].idPath = idData[i] + '/';
                            }
                        }
                        // 生成导航DOM结构
                        var str = '';
                        for (var i = 0; i < addressObj.length; i++) {
                            if (i == addressObj.length - 1) {
                                if (isHasChild == true) {
                                    str += '<p data-id="' + addressObj[i].id + '" ><span class = "Ntext" data-textPath="' + addressObj[i].textPath + '"  data-idPath="' + addressObj[i].idPath + '">' + addressObj[i].text + '</span>' +
                                        '<i class = "icon-caret-right"  data-id="' + addressObj[i].id + '" ></i></p>'
                                } else {
                                    str += '<p data-id="' + addressObj[i].id + '" ><span class = "Ntext" data-textPath="' + addressObj[i].textPath + '"  data-idPath="' + addressObj[i].idPath + '">' + addressObj[i].text + '</span><p>'
                                }
                            } else {
                                str += '<p data-id="' + addressObj[i].id + '" ><span class = "Ntext" data-textPath="' + addressObj[i].textPath + '"  data-idPath="' + addressObj[i].idPath + '">' + addressObj[i].text + '</span>' +
                                    '<i class = "icon-caret-right"  data-id="' + addressObj[i].id + '" ></i></p>'
                            }
                        }
                        // 记录节点操作痕迹
                        // if(isStorage == false) {
                        // } else { // 新操作的节点才记录，回退或前进操作不进行记录
                        //     var id = vmd.getGuid();
                        //     nowNode = {
                        //         id: id,
                        //         nodeId: addressObj[addressObj.length - 1].id,
                        //         t: address,
                        //         p: path
                        //     }
                        //     NodeData.push({
                        //         id: id,
                        //         nodeId: addressObj[addressObj.length - 1].id,
                        //         t: address,
                        //         p: path
                        //     })
                        // }
                        // isEabled();
                        return str
                    };
                    if (index === 'first') {
                        $(".one").html(_addressSet(address, path, isHasChild, 'first'));
                        $(".two").html('');
                    } else if (index === 'second') {
                        $(".two").html(_addressSet(address, path, isHasChild, 'second'));
                    }
                }
                //初始化
                $("#yarnball").on("click", 'span',
                    function(e) {
                        var t = $(this).attr("data-textPath");
                        var d = $(this).attr("data-idPath");
                        var id = $(this).parent('p').attr('data-id');
                        if ($(this).parent().parent().hasClass("one")) {
                            addressSet(t, d, 'first');
                            var index = 1;
                        } else if ($(this).parent().parent().hasClass("two")) {
                            addressSet(t, d, 'second');
                            var index = 2;
                        }
                        that.fireEvent('pathClick', sender, index, t, d, id);
                        stopPP(e)
                    });
                $("#yarnball").on("click", 'i',
                    function(e) {
                        if ($(this).hasClass('icon-caret-right')) {
                            $("#yarnball i").removeClass('icon-caret-down');
                            $("#yarnball i").addClass('icon-caret-right');
                            $(this).removeClass('icon-caret-right');
                            $(this).addClass('icon-caret-down');
                            hwDataView.hide();
                        } else if ($(this).hasClass('icon-caret-down')) {
                            $(this).removeClass('icon-caret-down');
                            $(this).addClass('icon-caret-right');
                            hwDataView.show();
                        }
                        var id = $(this).attr("data-id");
                        if ($(this).parent().parent().hasClass("one")) {
                            var index = 1;
                        } else if ($(this).parent().parent().hasClass("two")) {
                            var index = 2;
                        }
                        that.fireEvent('patnIcoClick', sender, e, index, id);
                        if (hwDataView.hidden) {
                            var x = e.clientX - 30,
                                y = e.clientY + 10;
                            hwDataView.setPosition(x, y)
                            hwDataView.show();
                        } else {
                            hwDataView.hide()
                        }
                        stopPP(e);
                    });
                // $("#yarnball").on("click", function(e) {
                //     $("#yarnball").css("display", "none");
                //     $("#yarnball-input").css("display", "block");
                //     $("#yarnball-input input").focus();
                // });
                // $("#yarnball-input input").on('blur', function(e) {
                //     $("#yarnball").css("display", "block");
                //     $("#yarnball-input").css("display", "none");
                // });
            }
            // 后退
            function previous(callback) {
                if (!nowNode) {
                    return
                }
                for (var i = 0; i < NodeData.length; i++) {
                    if (NodeData[i].id == nowNode.id && NodeData[i - 1]) {
                        yarnball_ct.setPath(NodeData[i - 1].t, NodeData[i - 1].p, false);
                        nowNode = NodeData[i - 1];
                        nextIsShow = true;
                        break
                    }
                }
                callback(nowNode.nodeId)
            }
            // 前进
            function next(callback) {
                if (!nowNode) {
                    return
                }
                for (var i = 0; i < NodeData.length; i++) {
                    if (NodeData[i].id == nowNode.id && NodeData[i + 1]) {
                        yarnball_ct.setPath(NodeData[i + 1].t, NodeData[i + 1].p, false);
                        nowNode = NodeData[i + 1];
                        preIsShow = true;
                        break
                    }
                }
                callback(nowNode.nodeId)
            }
            // 后退前进按钮是否可用
            function isEabled() {
                if (NodeData.length < 2) {
                    preIsShow = false;
                    nextIsShow = false;
                } else {
                    preIsShow = true;
                    nextIsShow = true;
                    if (NodeData[0].id == nowNode.id) {
                        preIsShow = false;
                    } else {
                        preIsShow = true;
                    }
                    if (NodeData[NodeData.length - 1].id == nowNode.id) {
                        nextIsShow = false;
                    } else {
                        nextIsShow = true;
                    }
                }
            }
            // 子菜单赋值
            function setMenuValue(childDta) {
                if (vmd.isArray(childDta)) {
                    store.loadData(childDta);
                    hwDataView.bindStore(store);
                }
            }

            function ISIP5Navigation02_afterrender(sender) {
                debugger
                Ext.getBody().appendChild(hwDataView.el);
                //document.body.appendChild(hwDataView.el.dom);
                Ext.getBody().on('click', function() {
                    if (!hwDataView.hidden) {
                        hwDataView.hide();
                        $("#yarnball i").removeClass('icon-caret-down');
                        $("#yarnball i").addClass('icon-caret-right');
                    }
                })
            }
            // 子文件菜单点击事件
            function hwDataView_click(sender, index, node, e) {
                hwDataView.hide();
                var t = node.getAttribute("data-text");
                var d = node.getAttribute("data-path");
                var id = node.getAttribute("data-id");
                var index = node.getAttribute("data-index");
                if (index == 1) {
                    yarnball_ct.setFirstPath(t, d);
                } else {
                    yarnball_ct.setSecondPath(t, d);
                }
                that.fireEvent('menuClick', sender, t, d, id, index);
            }

            function yarnball_ct_click(sender, e) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ISIP5Navigation02',
                p2: ex.message
            }, ex, 100);
        }
        this.ISIP5Navigation02_afterrender = ISIP5Navigation02_afterrender;
        this.items = [{
                xtype: "vmd.button",
                id: "homeButton",
                type: "(none)",
                size: "small",
                x: 0,
                y: 0,
                style: "background-image: url(\"/img/public/isip5_home.png\");    background-repeat: no-repeat;    background-size: 20px 20px;    background-position: center center;    border-radius: 0px;    border: 0;",
                width: 36,
                click: "homeButton_click",
                height: 32,
                listeners: {
                    click: homeButton_click
                }
            },
            {
                xtype: "vmd.div",
                id: "yarnball_ct",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                height: 32,
                x: 30,
                y: 0,
                afterrender: "yarnball_ct_afterrender",
                html: "<div id=\"yarnball\" style=\"display: block\">    <div class=\"one\">        <span class=\"Ntext\">组织机构</span>        <i class=\"icon-caret-right\">        </i>        <span class=\"Ntext\">单位管理</span>    </div>    <div class=\"two\">        <i class=\"icon-caret-right\">        </i>        <span class=\"Ntext\">平台管理部</span>        <i class=\"icon-caret-right\">        </i>        <span class=\"Ntext\">综合办公室</span>    </div></div><div id=\"yarnball-input\" style=\"display: none;\">    <input type=\"text\" name=\"path\" value=\"\" class=\"path\" id=\"path\"></div>",
                cls: "header-middle",
                style: "border-left: 0;",
                listeners: {
                    vmdafterrender: yarnball_ct_afterrender
                }
            },
            {
                xtype: "vmd.dataview",
                id: "hwDataView",
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: true,
                autoScroll: false,
                tpl: "<ul>    <tpl for=\".\">        <li class=\"info\" data-id=\"{id}\" data-text=\"{textPath}\" data-path=\"{idPath}\" data-index=\"{index}\" style=\" padding:7px 32px 7px 24px; background-image:url('{imgUrl}'); background-position:5px center; background-repeat:no-repeat; cursor: default;\">{name}</li>    </tpl></ul>",
                data: "var data = [{    \"id\": 1,    \"picname\": \"border-layout.gif\",    \"name\": \"单位人员\",    \"desc\": \"方位布局\"}, {    \"id\": 2,    \"picname\": \"layout-accordion.gif\",    \"name\": \"单位人员\",    \"desc\": \"手风琴布局\"}, {    \"id\": 3,    \"picname\": \"layout-anchor.gif\",    \"name\": \"单位人员\",    \"desc\": \"百分比布局\"}, {    \"id\": 4,    \"picname\": \"layout-form.gif\",    \"name\": \"单位人员\",    \"desc\": \"绝对定位布局\"}, {    \"id\": 5,    \"picname\": \"layout-column.gif\",    \"name\": \"单位人员\",    \"desc\": \"列布局\"}, {    \"id\": 6,    \"picname\": \"layout-table.gif\",    \"name\": \"单位人员\",    \"desc\": \"表格布局\"}];return data;",
                x: 200,
                y: 34,
                hidden: true,
                style: "border: 1px solid #ddd;    background-color: rgb(241, 247, 253);    z-index: 99;",
                click: "hwDataView_click",
                listeners: {
                    click: hwDataView_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setFirstPath = function(address, path, isHasChild) {
            //直接填写方法内容
            yarnball_ct.setFirstPath(address, path, isHasChild)
        }
        this.previousChange = function(callback) {
            //直接填写方法内容
            previous(callback)
        }
        this.nextChange = function(callback) {
            //直接填写方法内容
            next(callback)
        }
        this.preIsEnabled = function() {
            //直接填写方法内容
            return preIsShow
        }
        this.nexIsEnabled = function() {
            //直接填写方法内容
            return nextIsShow
        }
        this.setChildMeun = function(childDta) {
            //直接填写方法内容
            setMenuValue(childDta)
        }
        this.setSecondPath = function(address, path, isHasChild) {
            //直接填写方法内容
            yarnball_ct.setSecondPath(address, path, isHasChild)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ISIP5Navigation02");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ISIP5Navigation02");
    }
})