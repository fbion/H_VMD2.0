        Ext.define('hw.comps.tech.LayoutComponent', {
            xtype: 'hw.comps.tech.LayoutComponent',
            tmpl: '<div class="lcondition">' +
                '<div class="LayoutComponent">' +
                '<div class="lconditions">' +
                '<div id="title" class="ltitle"></div>' +
                '<div class="lbts">' +
                '<button class="btn" style="margin-left:20px;">处置</button>' +
                '<div>' +
                '</div>' +
                '</div>' +
                '</div>',
            defaultOpts: { //此为原型链属性, 并非私有属性,$.extend会使原型链发生变化
            },
            constructor: function(options, container) {
                //options传来的是用户可配置的属性
                // container就是第二个参数new hw.comps.tech.StartStopDateTconponent({},hwDiv.el.dom)
                var pub = options;
                var pri = { //配置默认项
                    //私有属性
                    width: 1200,
                    height: "auto"
                };
                ////渲染该组件的容器
                this.container = container;
                //用户配置项
                //第一个代表私有,第二个代表公有,与||就近原则是反过来的,(公有私有都有的被公有替代,如果一者有,一者没有,都会以原值加进去)
                this.curopt = $.extend(pri, pub);
                //选中的值字段和显示字段
                this.checkList = [];
                //获取配置文件信息
                //用户自定义添加的额外条件
                this.addConditionList = [];
                if (this.curopt.created) {
                    this.curopt.created();
                }
                this.init(container, this.curopt)
                if (this.curopt.inited) {
                    this.curopt.inited();
                }
            },
            //初始化+渲染方法
            init: function(dom, curopt) {
                dom.innerHTML = this.tmpl;
                var items = "",
                    itemes = "";
                var yjt = yj.row;
                if (yjt.length > 0) {
                    for (var i = 0; i < yjt.length; i++) {
                        for (var j = 0; j < yjt[i].cel.length; j++) {
                            itemes = "";
                            if (yjt[i].cel.length % 2 === 0) {
                                if (i == (yjt.length - 1)) {
                                    if (j == (yjt[i].cel.length - 1)) {
                                        item = '<div class="lcontaner lcontaners lcontanert" style="width:49.3%;"><div class="lcontaner-top"><div class="lcontaner-left">' + yjt[i].cel[j].title + '</div><div class="lcontaner-right" id="div' + i + j + '"></div><div class="lcontaner-center"><iframe src=' + yjt[i].cel[j].iiframezs + ' scrolling="auto"  frameborder="0" width="100%" height="400px" scrolling="no"></iframe></div></div></div>';
                                    } else {
                                        item = '<div class="lcontaner lcontaners" style="width:49.3%;"><div class="lcontaner-top"><div class="lcontaner-left">' + yjt[i].cel[j].title + '</div><div class="lcontaner-right" id="div' + i + j + '"></div><div class="lcontaner-center"><iframe src=' + yjt[i].cel[j].iiframezs + '   frameborder="0" width="100%" height="400px" scrolling="no"></iframe></div></div></div>';
                                    }
                                } else {
                                    if (j == (yjt[i].cel.length - 1)) {
                                        item = '<div class="lcontaner lcontanert" style="width:49.3%;"><div class="lcontaner-top"><div class="lcontaner-left">' + yjt[i].cel[j].title + '</div><div class="lcontaner-right" id="div' + i + j + '"></div><div class="lcontaner-center"><iframe src=' + yjt[i].cel[j].iiframezs + '   frameborder="0" width="100%" height="400px" scrolling="no"></iframe></div></div></div>';
                                    } else {
                                        item = '<div class="lcontaner" style="width:49.3%;"><div class="lcontaner-top"><div class="lcontaner-left">' + yjt[i].cel[j].title + '</div><div class="lcontaner-right" id="div' + i + j + '"></div><div class="lcontaner-center"><iframe src=' + yjt[i].cel[j].iiframezs + '   frameborder="0" width="100%" height="400px" scrolling="no"></iframe></div></div></div>';
                                    }
                                }
                            } else {
                                if (i == (yjt.length - 1)) {
                                    if (j == (yjt[i].cel.length - 1)) {
                                        item = '<div class="lcontaner lcontaners lcontanert"><div class="lcontaner-top"><div class="lcontaner-left">' + yjt[i].cel[j].title + '</div><div class="lcontaner-right" id="div' + i + j + '"></div><div class="lcontaner-center"><iframe src=' + yjt[i].cel[j].iiframezs + '   frameborder="0" width="100%" height="400px" scrolling="no"></iframe></div></div></div>';
                                    } else {
                                        item = '<div class="lcontaner lcontaners"><div class="lcontaner-top"><div class="lcontaner-left">' + yjt[i].cel[j].title + '</div><div class="lcontaner-right" id="div' + i + j + '"></div><div class="lcontaner-center"><iframe src=' + yjt[i].cel[j].iiframezs + '   frameborder="0" width="100%" height="400px" scrolling="no"></iframe></div></div></div>';
                                    }
                                } else {
                                    if (j == (yjt[i].cel.length - 1)) {
                                        item = '<div class="lcontaner lcontanert"><div class="lcontaner-top"><div class="lcontaner-left">' + yjt[i].cel[j].title + '</div><div class="lcontaner-right" id="div' + i + j + '"></div><div class="lcontaner-center"><iframe src=' + yjt[i].cel[j].iiframezs + '   frameborder="0" width="100%" height="400px" scrolling="no"></iframe></div></div></div>';
                                    } else {
                                        item = '<div class="lcontaner"><div class="lcontaner-top"><div class="lcontaner-left">' + yjt[i].cel[j].title + '</div><div class="lcontaner-right" id="div' + i + j + '"></div><div class="lcontaner-center"><iframe src=' + yjt[i].cel[j].iiframezs + '   frameborder="0" width="100%" height="400px" scrolling="no"></iframe></div></div></div>';
                                    }
                                }
                            }
                            items = items + item;
                            $(".lcondition").append(item);
                            if (yjt[i].cel[j].menu.length > 0) {
                                for (var o = 0; o < yjt[i].cel[j].menu.length; o++) {
                                    if (yjt[i].cel[j].menu[o].sfytb == false) {
                                        iteme = '<div style="width:40px;line-height:35px;height:35px;float:right;"><a href=\'javascript:window.open("' + yjt[i].cel[j].menu[o].openpath + '");\'>' + yjt[i].cel[j].menu[o].title + '</a></div>';
                                    } else {
                                        iteme = '<div style="width:40px;line-height:35px;height:35px;float:right;"><a href=\'javascript:quty("menu' + o + '");\'><img style="width:22px;height:22px;margin:6px;" id="img' + o + '" src=' + yjt[i].cel[j].menu[o].tbpath + ' /></a></div>';
                                    }
                                    itemes = itemes + iteme;
                                    if (yjt[i].cel[j].menu[o].child.length > 0) {
                                        its = "";
                                        var ite = '<div class="menus" id="menu' + o + '"></div>';
                                        $(".lcondition").append(ite);
                                        for (var n = 0; n < yjt[i].cel[j].menu[o].child.length; n++) {
                                            if (yjt[i].cel[j].menu[o].child[n].sfytb == false) {
                                                it = '<a href=\'javascript:window.open("' + yjt[i].cel[j].menu[o].child[n].openpath + '");\'><div class="menu">' + yjt[i].cel[j].menu[o].child[n].title + '</div></a>';
                                                its = its + it;
                                            }
                                        }
                                        $('#menu' + o + '').append(its);
                                    }
                                }
                                $("#div" + i + j + "").append(itemes);
                            }
                        }
                    }
                }
                //comp为改组件dom元素本身, 存在第二个该组件互不干扰
                var comp = $(dom.children[0]);
                var btn = comp.children(".LayoutComponent").children(".lconditions").children(".lbts").children(".btn");
                btn.on("click", function() {
                    $(dom).trigger("czClick");
                });
            },
            addCondition: function(addList) {
                var jsonaddList = JSON.parse(JSON.stringify(addList).replace(eval('/' + this.curopt.valueField + '*/g'), "value").replace(eval('/' + this.curopt.textField + '*/g'), "text"));
                var addDisposedList = [];
                for (var i = 0; i <= jsonaddList.length - 1; i++) {
                    addDisposedList.push({
                        value: jsonaddList[i].value,
                        text: jsonaddList[i].text
                    })
                }
                this.addConditionList = addDisposedList;
                this.init(this.container, this.curopt);
            }
        })
        var left = '265';

        function quty(id) {
            if ($(".menus").length > 0) {
                for (var i = 0; i < $(".menus").length; i++) {
                    $(".menus")[i].style.width = 0;
                }
            }
            var menu = document.querySelector("#" + id + "");
            //改变自定义菜单的宽，让它显示出来
            menu.style.width = '125px';
            menu.style.marginTop = '40px';
            menu.style.marginLeft = left + 'px';
        }
        //关闭右键菜单，很简单
        window.onclick = function(e) {
            left = e.layerX;
            if ($(".menus").length > 0) {
                for (var i = 0; i < $(".menus").length; i++) {
                    $(".menus")[i].style.width = 0;
                }
            }
        }
        Ext.define("vmd.ux.LayoutComponent", {
            extend: "vmd.base.Ux",
            requires: vmd.getCmpDeps([]),
            version: "1.0",
            xtype: "vmd.ux.LayoutComponent",
            title: "Panel",
            header: false,
            border: false,
            panelWidth: 300,
            layout: "auto",
            autoHeight: true,
            afterrender: "LayoutComponent_afterrender",
            style: "width: 100%;margin: 0 auto;",
            listeners: {
                vmdafterrender: function() {
                    try {
                        this.LayoutComponent_afterrender(this)
                    } catch (ex) {
                        vmd.Error.log('003-2', {
                            p1: 'vmd.ux.LayoutComponent'
                        }, ex, 50);
                    }
                }
            },
            uxCss: ".LayoutComponent {    font-family: \"Microsoft YaHei\";    font-size: 12px;    width: 99.4%;}.lcondition {    width: 99.5%;    margin: 4px auto;}.lconditions {    width: 100%;    margin: 0 auto;    height: 50px;    line-height: 50px;    border: 1px solid #e4e4e4;    border-bottom-width: 0;}.ltitle {    font-size: 18px;    font-weight: 600;    width: 40%;    height: 50px;    line-height: 50px;    text-align: left;    margin-left: 5px;    float: left;}.lcontaner-top {    width: 100%;    margin: 0 auto;    height: 35px;    line-height: 35px;    background-color: #eef7fe;    border-bottom: 1px solid #e4e4e4;}.lcontaner-left {    width: 20%;    height: 35px;    line-height: 35px;    text-align: left;    margin-left: 5px;    float: left;    font-size: 14px;    font-weight: 600;}.lcontaner-right {    width: 70%;    height: 35px;    line-height: 35px;    text-align: right;    margin-right: 5px;    float: right;}.lbts {    width: 40%;    height: 50px;    line-height: 50px;    ;    float: right;    margin-right: 5px;    text-align: right;}.btn {    font-family: \"Microsoft YaHei\";    font-size: 14px;    padding: 0;    text-align: center;    height: 30px;    line-height: 27px;    color: #fff;    border: 1px solid #4a67d2;    background-color: #4a67d2;    border-radius: 4px;    width: 80px;}.lcontaner {    float: left;    height: 440px;    border: 1px solid #e4e4e4;    padding: 0 2px;}.lcontaners {    /*border-bottom: 1px solid #e4e4e4;*/    margin-top: 0.3%;}.lcontanert {    margin-left: 0.3%;    /*    border-right: 1px solid #e4e4e4;*/}/*css代码*/.menus {    width: 0;    /*设置为0 隐藏自定义菜单*/    overflow: hidden;    /*隐藏溢出的元素*/    box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;    position: absolute;    /*自定义菜单相对与body元素进行定位*/    background-color: aliceblue;}.menu {    width: 115px;    height: 25px;    line-height: 25px;    padding: 0 10px;}.clearfix:after,.LayoutComponent:after {    display: block;    content: \"\";    clear: both;}/*滚动条样式*/.LayoutComponent::-webkit-scrollbar {    width: 4px;}.LayoutComponent::-webkit-scrollbar-thumb {    border-radius: 10px;    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);    background: rgba(0, 0, 0, 0.2);}.LayoutComponent::-webkit-scrollbar-track {    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);    border-radius: 0;    background: rgba(0, 0, 0, 0.1);}/*兼容ie*/.LayoutComponent {    scrollbar-arrow-color: #9A9A9A;    ;    /*三角箭头的颜色*/    scrollbar-face-color: #9A9A9A;    /* 立体滚动条的颜色（包括箭头部分的背景色） */    scrollbar-track-color: #CECECE;    /* 立体滚动条背景颜色 */}a {    /* 取消下划线 */    text-decoration: none;    /* 取消选中时的背景色 */    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);}/* 已读时的字体颜色 */a:visited {    color: red;}/* 点击时的字体颜色 */a:active {    color: dodgerblue;}.LayoutComponent button,a {    cursor: pointer !important;}",
            uxrequirecss: "[\"components/ux/layoutcomponent/1.0/css/vmdBase.css\"]",
            uxrequirejs: "[\"components/ux/layoutcomponent/1.0/js/url.js\"]",
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
                    var thisComponent, page = this;
                    //获取url的参数值
                    var jh = vmd.getUrlParam('jh');

                    function LayoutComponent_afterrender(sender) {
                        //用户配置代码:
                        thisComponent = new hw.comps.tech.LayoutComponent({
                            //此处为用户可配置的属性, 如果在外部环境,需要将page.这些属性改为相对应的值即可
                            width: page.compWidth,
                            height: page.compHeight,
                            data: [], //json数据,为了适应vmd, 初次渲染选用setData方法渲染否
                            skin: page.skin,
                            created: function() { //渲染前执行的初始化方法
                                console.log("渲染前执行的初始化方法")
                            },
                            inited: function() { //渲染后执行的初始化方法
                                $("#title")[0].innerText = jh + "井预警分析";
                            }
                        }, hwDiv.el.dom);
                        //加载完成后触发的事件
                        $(hwDiv.el.dom).on("loaded", function(e) {
                            page.fireEvent("loaded", thisComponent)
                        })
                        $(hwDiv.el.dom).on("czClick", function(e) {
                            page.fireEvent("czClick", thisComponent)
                        })
                    }
                } catch (ex) {
                    vmd.Error.log('003-3', {
                        p1: 'vmd.ux.LayoutComponent',
                        p2: ex.message
                    }, ex, 100);
                }
                this.LayoutComponent_afterrender = LayoutComponent_afterrender;
                this.items = [{
                    xtype: "vmd.div",
                    id: "hwDiv",
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    autoHeight: true,
                    autoWidth: true
                }]
                this.callParent();
                vmd.core.compositeCmpInit(this.items, this);
                var me = this;
                eval(me.defineVars);
                resetCmpScope();
                Ext.util.CSS.removeStyleSheet("vmd.ux.LayoutComponent");
                this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.LayoutComponent");
            }
        })