if (typeof xds != "undefined") {
    xds.vmdChart = Ext.extend(xds.Component, {
        cid: "vmdChart",
        category: "vmd组件",
        defaultName: "&lt;chart&gt;",
        text: "chart(曲线)",
        dtype: "vmd.dchart",
        //这里的xtype主要是为了代码显示的类型，本身无任何作用
        xtype: "vmd.chart",
        xcls: "vmd.chart",
        iconCls: "icon-chart",
        version: "",
        //控制是否可以拖拽
        isResizable: function (a, b) {
            //a为上下左右的位置方向
            return true;
        },
        naming: "chart",
        isContainer: false,
        //是否显示右下角的组件说明
        filmCls: "el-film-nolabel",
        //默认属性设置
        defaultConfig: {
            text: "chart",
            relativepath: "Resources//Chart",
            size: "small",
            nousedataset: false
        },
        //属性设置
        configs: [{
            name: "load",
            group: "事件",
            editor: "ace",
            ctype: "string",
            params:"chart"
        },
        {
            name: "click",
            group: "事件",
            editor: "ace",
            ctype: "string",
            params:"chart,e"
        },
        {
            name: "SeriesClick",
            group: "事件",
            editor: "ace",
            ctype: "string",
            params:"series,e"
        },
        {
            name: "legendItemClick",
            group: "事件",
            editor: "ace",
            ctype: "string",
            params:"series,e"
        },
        {
            name: "SeriesMouseOut",
            group: "事件",
            editor: "ace",
            ctype: "string",
            params:"series,e"
        },
        {
            name: "SeriesMouseOver",
            group: "事件",
            editor: "ace",
            ctype: "string",
            params:"series,e"
        },
        {
            name: "text",
            group: "外观",
            ctype: "string"
        },
        {
            name: "title",
            group: "外观",
            ctype: "string"
        },
        {
            name: "chartStoreConfig",
            group: "数据",
            ctype: "string"
        },
        {
            name: "id",
            group: "设计",
            ctype: "string"
        },
        {
            name: "relativepath",
            group: "外观",
            ctype: "string"
        },
        {
            name: "dsnames",
            group: "外观",
            ctype: "string",
        },
        {
            name: "templateSelect",
            group: "外观",
            ctype: "string",
            editor:"combo",
            options:[{
                text:'折线图',
                value:'line'
            },{
                text:'柱形图',
                value:'column'
            },{
                text:'饼状图',
                value:'pie'
            },{
                text:'面积图',
                value:'area'
            },{
                text:'环形图',
                value:'annular'
            },{
                text:'多轴曲线',
                value:'multi_axis'
            },{
                text:'混合曲线',
                value:'mix_chart'
            },{
                text:'堆叠面积图',
                value:'area_stack'
            },{
                text:'堆叠柱形图',
                value:'column_stack'
            }]
        },
        {
            name: "width",
            group: "外观",
            ctype: "number"
        },
        {
            name: "height",
            group: "外观",
            ctype: "number"
        }],
        initConfig: function (b, a) {
            //初始化默认属性设置
        },

        onFilmClick: function () {

        },

        onFilmDblClick: function (b) {
            return;
            //双击值编辑功能 
            var t = document.getElementById("film-for-" + this.id);
            t.style.display = "none";
            if (this.owner) {
                this.setParentDisVisible(this.owner);
            }
        },

        setParentDisVisible: function (a) {
            var t = document.getElementById("film-for-" + a.id);
            if (t) {
                t.style.display = "none";
                if (a.owner) {
                    this.setParentDisVisible(a.owner);
                }
            }
        }
    });

    xds.Registry.register(xds.vmdChart);
}

Ext.define("vmd.comp.DesignerChart", {
    extend: "Ext.BoxComponent",
    xtype: 'vmd.dchart',
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
    initComponent: function () {
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

        this.getJSON =function (url, success, error) {
            vmd.ajax({
                das: false,
                url: url,
                type: 'get',
                timeout: 10000,
                dataType: "json",
                data: {},
                success: function (result) {
                    success.apply(null, [result]);
                },
                error: function (msg, f) {
                    error.apply(null, [msg]);
                }
            })
        },

        //深度拷贝对象或数组
        this.deepCopy = function () {
            var i,
                args = arguments,
                len,
                ret = {},
                doCopy = function (copy, original) {
                    var value, key;

                    // An object is replacing a primitive
                    if (typeof copy !== 'object') {
                        copy = {};
                    }

                    for (key in original) {
                        if (original.hasOwnProperty(key)) {
                            value = original[key];

                            // Copy the contents of objects, but not arrays or DOM nodes
                            if (value && typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]'
                                && key !== 'renderTo' && typeof value.nodeType !== 'number') {
                                copy[key] = doCopy(copy[key] || {}, value);

                                // Primitives and arrays are copied over directly
                            } else if (Object.prototype.toString.call(value) === '[object Array]') {
                                copy[key] = doCopy(copy[key] || [], value);
                            } else {
                                copy[key] = original[key];
                            }
                        }
                    }
                    return copy;
                };

            // If first argument is true, copy into the existing object. Used in setOptions.
            if (args[0] === true) {
                ret = args[1];
                args = Array.prototype.slice.call(args, 2);
            }

            // For each argument, extend the return
            len = args.length;
            for (i = 0; i < len; i++) {
                ret = doCopy(ret, args[i]);
            }

            return ret;
        }
},

    onRender: function (ct, position) {
        var me = this;
        this.el = document.createElement("div");
        this.chartEl = document.createElement("div");

        //绑定属性面板中的size到网格中
        if (me.height && !isNaN(me.height)) {
            this.el.style.height = me.height + "px";
            this.chartEl.style.height = me.height + "px";
        }
        if (me.width && !isNaN(me.width)) {
            this.el.style.width = me.width + "px";
            this.chartEl.style.width = me.width + "px";
        }

        this.el.appendChild(this.chartEl);
        
        if (this.path) {
                hwDas.ajax({
                    das: false,
                    url: "/report/OnRequestServerVMD2.0.asmx/GetServerReportDataJson_VMD",
                    type: 'post',
                    contentType: "application/json;charset=utf-8",
                    timeout: 5000,
                    dataType: "text",
                    data: {
                        ModelXml: this.relativepath + "/" + this.path,
                        //ModelXml:  "mode/" + this.path,
                    },
                    success: function (result) {
                        result = eval('(' + result + ')');
                        var resultInfo = Ext.decode(result.d);
                        var base = new Base64();
                        var rptInfo = base.decode(resultInfo.data);

                        var s = "";
                        if (resultInfo.dataset.length > 0) {
                            // me.dataset = resultInfo.dataset;
                            var data = [];
                            for (var i = 0; i < resultInfo.dataset.length; i++) {
                                // var store = "{\"storeConfig\":{";
                                var store = "{";
                                // store += "\"id\":\"" + resultInfo.dataset[i].serverid + "\",";
                                store += "\"id\":\"" + resultInfo.dataset[i].id + "\",";
                                store += "\"callcode\":\"" + resultInfo.dataset[i].CallCode + "\",";
                                store += "\"url\":\"" + resultInfo.dataset[i].path + "\",";
                                store += "\"host\":\"\",";
                                store += "\"isHwRest\":true,";
                                store += "\"name\":\"" + resultInfo.dataset[i].name + "\",";
                                store += "\"fields\":[],";
                                store += "\"getMethods\":[],";
                                store += "\"postMethods\":[],";
                                store += "\"putMethods\":[],";
                                store += "\"deleteMethods\":[],";
                                store += "\"saveMethods\":[]";
                                store += "}";
                                var name = resultInfo.dataset[i].name || resultInfo.dataset[i].serverid || resultInfo.dataset[i].id;
                                data.push({
                                    cid: 'vmdJsonStore',
                                    id: name,
                                    storeConfig: store,
                                    autoLoad: false
                                });
                                if (i != resultInfo.dataset.length - 1) {
                                    s += name + ",";
                                } else {
                                    s += name;
                                }
                            }
                            //  data = [{ cid: 'vmdJsonStore', id: 'aaaaa' }];
                            parent.xds.vmd.addNode(data)
                        }
                        me.viewerNode.component.setConfig("dsnames", s)

                        if (!me.width) {

                            me.ownerCt.doLayout();
                            xds.canvas.syncAll();
                        }
                    },
                    error: function (msg, f) {
                        // debugger
                        Ext.Msg.alert("提示", "获取数据信息失败",
                        function () { })
                    }
                })
                
                me.chart = this.createDefaultChart();
            }

        else if (me.tplJSON) {
            me.isXAxisDateTime = me.tplJSON.xAxis && me.tplJSON.xAxis[0] && me.tplJSON.xAxis[0].type;
            if(me.templateSelect&&me.templateSelect!=me.tplJSON.chart.type){
                this.charttplpath = "/chart/template/" + me.templateSelect + ".js";
                //加载模版和数据都成功后
                function loadSuccess() {
                    if (me.runJSON && me.chartdata) {
                        me.runJSON.data.json = me.chartdata;
                        me.chart = Highcharts.chart(me.chartEl, me.runJSON);
                        me.chart.vmdChart = me;
                        me.addChartEvent();
                    }
                }
                //加载模版
                me.getJSON(vmd.virtualPath + this.charttplpath, function (template) {
                    me.chartEl.style.width = (me.chartEl.clientWidth || me.el.dom.clientWidth) + "px";
                    me.chartEl.style.height = (me.chartEl.clientHeight || me.el.dom.clientHeight) + "px";

                    me.tplJSON = me.deepCopy(template);
                    me.runJSON = me.deepCopy(template);

                    me.viewerNode.component.setConfig("tplJSON", me.tplJSON);

                    loadSuccess();
                }, function (msg) {
                    Ext.Msg.show({
                        title: "提示",
                        msg: "加载模版失败！" + msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                });
                //加载数据
                me.getJSON(vmd.virtualPath + "/chart/data/data.js", function (data) {
                    loadDataSuccess = true;
                    me.chartdata = data;
                    loadSuccess();
                }, function (msg) {
                    Ext.Msg.show({
                        title: "提示",
                        msg: "加载数据失败！" + msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                });
            }else{
                //加载数据
                me.getJSON(vmd.virtualPath + "/chart/data/data.js", function (data) {
                    me.chartEl.style.width = (me.chartEl.clientWidth || me.el.dom.clientWidth) + "px";
                    me.chartEl.style.height = (me.chartEl.clientHeight || me.el.dom.clientHeight) + "px";
                    me.runJSON = me.deepCopy(me.tplJSON);
                    me.runJSON.data.json = data;
                    me.chart = Highcharts.chart(me.chartEl, me.runJSON);
                    me.chart.vmdChart = me;
                    me.addChartEvent();
                }, function (msg) {
                    Ext.Msg.show({
                        title: "提示",
                        msg: "加载数据失败！" + msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                });
            }
        }
        else {
            this.charttplpath = "/chart/template/" + (getUrlParam("charttplpath") || "line") + ".js";
            //加载模版和数据都成功后
            function loadSuccess() {
                if (me.runJSON && me.chartdata) {
                    me.runJSON.data.json = me.chartdata;
                    me.chart = Highcharts.chart(me.chartEl, me.runJSON);
                    me.chart.vmdChart = me;
                    me.addChartEvent();
                }
            }
            //加载模版
            me.getJSON(vmd.virtualPath + this.charttplpath, function (template) {
                me.chartEl.style.width = (me.chartEl.clientWidth || me.el.dom.clientWidth) + "px";
                me.chartEl.style.height = (me.chartEl.clientHeight || me.el.dom.clientHeight) + "px";

                me.tplJSON = me.deepCopy(template);
                me.runJSON = me.deepCopy(template);

                me.viewerNode.component.setConfig("tplJSON", me.tplJSON);

                loadSuccess();
            }, function (msg) {
                Ext.Msg.show({
                    title: "提示",
                    msg: "加载模版失败！" + msg,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            });
            //加载数据
            me.getJSON(vmd.virtualPath + "/chart/data/data.js", function (data) {
                loadDataSuccess = true;
                me.chartdata = data;
                loadSuccess();
            }, function (msg) {
                Ext.Msg.show({
                    title: "提示",
                    msg: "加载数据失败！" + msg,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            });
        }
        //me.chart = Highcharts.chart(me.chartEl, {});
        me.el.id = me.id;
        //属性赋值
        Ext.applyIf(me, me.chart);
        //重改指向，保证dhx的原生态
        //this.el = this.el.children[0];
        Ext.fly(me.el).addClass('vmd-chart');

        //注册事件           
        me.onEventsReg(me, me.grid);
        window[me.id] = me;

        me.callParent(arguments);
    },
    
    afterRender: function(){
        this.callParent(arguments);
        //return;
        //去掉遮罩层
		var me=this;
        function hideFilm(parentNode) {
            var t = document.getElementById("film-for-" + parentNode.id);
            if (t) {
                t.style.display = "none";
                hideFilm(parentNode.parentNode);
            }
        }

        var t = document.getElementById("film-for-" + this.viewerNode.id);
        if (t) {
            Ext.defer(function(){
				t.style.display = "none";
                hideFilm(me.viewerNode.parentNode);
			},50)
        }
    },
    addChartEvent: function () {
        var me = this;
        me.chart.addClickEvents("title", function (e) {
            me.clickChart = this;
            if( me.titleWin&&!me.titleWin.hidden){
                return
            }
            var TitleData = e.element.getBBox(null,0);
            this.seleBorder.attr({
                visibility:'visible',
                width:parseInt(TitleData.width)+10,
                height:parseInt(TitleData.height)+10,
                x:parseInt(TitleData.x)-5,
                y:parseInt(TitleData.y)-5
            })
            me.titleWin = new vmd.window({
                url: '/modules/hw8c62a012/hwtsXuP9TM/hw09ed4540.html',
                auto: false,
                title: '标题属性设置',
                height: 680,
                width:400,
                modal: true,
                closable:false,
                maximizable:false,
                closeAction: 'hide'
            });
            me.titleWin.show();
            // window.vmdchart = me.clickChart.vmdChart;
            // window.titleWin = me.titleWin;
            // window.Title = e;
            if(parent){
                parent.vmdchart = me.clickChart.vmdChart;
                parent.titleWin = me.titleWin;
                parent.Title= e;
            }
        })
        me.chart.addClickEvents("chart", function (e) {
            me.clickChart = this;
            if( me.chartWin&&!me.chartWin.hidden){
                return
            }
            this.seleBorder.attr({
                visibility:'visible',
            })
            this.seleBorder.attr(this.getBackRect())
            me.chartWin = new vmd.window({
                url: '/modules/hw8c62a012/hwtsXuP9TM/hw88bf5ee9.html',
                auto: false,
                title: '图表属性设置',
                height: 680,
                width:480,
                modal: true,
                closable:false,
                maximizable:false,
                closeAction: 'hide',
                resizable:false
            });
            me.chartWin.show();
            window.vmdchart = me.clickChart.vmdChart;
            window.chartWin = me.chartWin;
            if(parent){
                parent.vmdchart = me.clickChart.vmdChart;
                parent.chartWin = me.chartWin;
            }
        })
        me.chart.addClickEvents("axis", function (e) {
            me.clickChart = this;
            this.seleBorder.attr({
                visibility:'visible',
            })
            // console.log(e.getBackRect())
            this.seleBorder.attr(e.getBackRect())
            if(e.coll=='xAxis'){
                if( me.xWin&&!me.xWin.hidden){
                    return
                }
                me.xWin = new vmd.window({
                    url: '/modules/hw8c62a012/hwtsXuP9TM/hw445f9ade.html',
                    auto: false,
                    title: 'X轴属性设置',
                    height:680,
                    width:480,
                    modal: true,
                    closable:false,
                    maximizable:false,
                    closeAction: 'hide',
                    resizable:false
                });
                me.xWin.show();
            }
            if(e.coll=='yAxis'){
                if( me.yWin&&!me.yWin.hidden){
                    return
                }
                me.yWin = new vmd.window({
                    url: '/modules/hw8c62a012/hwtsXuP9TM/hwKHfcoo3n.html',
                    auto: false,
                    title: 'Y轴属性设置',
                    height: 680,
                    width:480,
                    modal: true,
                    closable:false,
                    maximizable:false,
                    closeAction: 'hide',
                    resizable:false
                });
                me.yWin.show();
            }
            if(e.coll=='zAxis'){
                if( me.zWin&&!me.zWin.hidden){
                    return
                }
                me.zWin = new vmd.window({
                    url: '/modules/hw8c62a012/hwtsXuP9TM/hwauJQFlos.html',
                    auto: false,
                    title: 'Z轴属性设置',
                    height: 680,
                    width:490,
                    modal: true,
                    closable:false,
                    maximizable:false,
                    closeAction: 'hide',
                    resizable:false
                });
                me.zWin.show();
            }
            if(parent){
                parent.vmdchart = me.clickChart.vmdChart;
                // parent.renderChart = me.renderChart;
                parent.vmdAxis = e;
                parent.xWin = me.xWin;
                parent.yWin = me.yWin;
                parent.zWin = me.zWin;
            }
        })
        me.chart.addClickEvents("legend", function (e) {
            me.clickChart = this;
            if( me.legendWin&&!me.legendWin.hidden){
                return
            }
            this.seleBorder.attr({
                visibility:'visible',
            })
            this.seleBorder.attr(e.getBackRect())
            me.legendWin = new vmd.window({
                url: '/modules/hw8c62a012/hwtsXuP9TM/hw93e770b7.html',
                auto: false,
                title: '图例属性设置',
                height: 460,
                width:380,
                modal: true,
                closable:false,
                maximizable:false,
                closeAction: 'hide'
            });
            me.legendWin.show();
            // window.vmdchart = me.clickChart.vmdChart;
            // window.legendWin = me.legendWin;
            if(parent){
                parent.vmdchart = me.clickChart.vmdChart;
                parent.legendWin = me.legendWin;
            }
        })
        me.chart.addClickEvents("series", function (e) {
            me.clickChart = this;
            me.stores =  me.getDatasetNames();
            if( me.serWin &&!me.serWin.hidden){
                return
            }
            this.seleBorder.attr({
                visibility:'visible',
                x:this.plotLeft,
                y:this.plotTop,
                width:this.plotWidth,
                height:this.plotHeight
            })

            me.serWin = new vmd.window({
                url: '/modules/hw8c62a012/hwtsXuP9TM/hw454e3369.html',
                auto: false,
                title: '序列属性设置',
                height: 680,
                width:500,
                modal: true,
                closable:false,
                maximizable:false,
                closeAction: 'hide'
            });
            me.serWin.show();
            if(parent){
                parent.renderChart = me.renderChart;
                parent.vmdchart = me.clickChart.vmdChart;
                parent.vmdSer = e;
                parent.vmdStore = me.stores;
                parent.serWin = me.serWin;
            }
        })
    },
    //获取可视化中定义的所有数据集
    getDatasetNames:function(){
        var names =[];
        var storeRoot = xds.vmd.getRootNode("dataset");
        storeRoot.eachChild(function(n) {
            names.push(n)
        }, this);
        return names;
    },
    renderChart:function(){
       debugger
        var me = this;
        //me.runJSON = me.deepCopy(me.tplJSON);
        me.chart = Highcharts.chart(me.el.dom, me.runJSON);
        me.chart.vmdChart = me;
        me.addChartEvent();
    },
    onEventsReg: function (My, Mygrid) {

    },

    onEnter: function (e) {

    },

    doLayout: function () {
        
    },

    onResize: function (w, h) {
        if (this.chart) {
            var outterBorderW = this.el.dom.offsetWidth - this.el.dom.clientWidth;
            var outterBorderH = this.el.dom.offsetHeight - this.el.dom.clientHeight;
            this.chart.setSize(w - outterBorderW, h - outterBorderH);
        }
    },

    onDestroy: function () {

    },

    createDefaultChart: function () {
        return Highcharts.chart(this.chartEl, {
            chart: {
                animation: false,
                marginTop: 60
            },
            title: {
                text: ''
            },
            legend: {
                symbolHeight: 12,
                symbolWidth: 12,
                symbolRadius: 2,
                verticalAlign: 'top',
                floating: true,
                y: -10
            },
            xAxis: [{
                lineColor: 'RGB(0,44,254)',
                lineWidth: 2,
                categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                tickColor: "#a9a9a9",
                tickPosition: 'inside',
                title: {
                    text: "（月）",
                    align: "high",
                    offset: 8,
                    x: 20,
                    style: {
                        color: 'RGB(0,44,254)',
                        fontSize: 16
                    }
                },
                labels: {
                    y: 20,
                    formatter: function () {
                        if (this.value == "6") {
                            return "<span style='color:#FF0000; font-size: 20px;'>" + this.value + "</span>";
                        }
                        return this.value;
                    },
                    style: {
                        color: 'RGB(0,44,254)',
                        fontSize: 16
                    }
                },
                alternateGridColor: '#FCFFC5'
            },
            {
                opposite: true,
                linkedTo: 0,
                lineColor: "#000000",
                lineWidth: 2,
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                tickColor: "#a9a9a9",
                tickPosition: 'inside',
                labels: {
                    y: -10,
                    style: {
                        color: 'black',
                        fontSize: 14
                    }
                }
            }],
            yAxis: [{
                lineColor: 'RGB(0,155,254)',
                lineWidth: 2,
                gridLineDashStyle: 'longdash',
                floor: 0,
                labels: {
                    y: 5,
                    x: -10,
                    style: {
                        color: 'RGB(0,155,254)',
                        fontSize: 14
                    }
                },
                title: {
                    align: "high",
                    offset: 5,
                    rotation: 0,
                    y: -15,
                    text: "(ml)",
                    style: {
                        color: 'RGB(0,155,254)',
                        fontSize: 14
                    }
                },
                alternateGridColor: 'RGBA(184,170,229,0.3)'
            },
            {
                lineColor: "RGB(255, 0, 0)",
                lineWidth: 2,
                gridLineWidth: 0,
                floor: 0,
                opposite: true,
                labels: {
                    y: 5,
                    x: 10,
                    style: {
                        color: "RGB(255, 0, 0)",
                        fontSize: 14
                    }
                },
                title: {
                    align: "high",
                    offset: 5,
                    rotation: 0,
                    y: -15,
                    text: "(℃)",
                    style: {
                        color: "RGB(254, 0, 0)",
                        fontSize: 14
                    }
                },
            }],
            series: [{
                animation: false,
                name: '蒸发量 ',
                data: [2, 5, 7, 22, 23, 75, 135, 160, 36, 20, 7, 5],
                type: 'column',
                borderRadius: 5,
                borderWidth: 0,
                threshold: null,
                index: 999,
                tooltip: {
                    valueDecimals: 2
                },
                color: "RGB(68, 210, 208)"
            },
            {
                animation: false,
                name: '降水量 ',
                data: [3, 6, 8, 24, 25, 71, 170, 180, 49, 18, 6, 3],
                type: 'column',
                borderRadius: 5,
                borderWidth: 0,
                threshold: null,
                tooltip: {
                    valueDecimals: 2
                },
                color: "RGB(184, 170, 229)"
            },
            {
                animation: false,
                name: '最低气温 ',
                data: [3.1, 3.2, 3.4, 4.5, 6.7, 10, 20.4, 23.8, 23, 17, 11.7, 6.7],
                type: 'spline',
                borderRadius: 5,
                threshold: null,
                lineWidth: 2,
                yAxis: 1,
                tooltip: {
                    valueDecimals: 2
                },
                marker: {
                    fillColor: "#FFFFFF",
                    lineColor: "RGB(92, 188, 239)",
                    lineWidth: 2,
                    //                        radius: 半径
                    //                        states: {状态}
                    symbol: "circle"
                    //                        width
                },
                color: "RGB(92, 188, 239)"
            },
            {
                animation: false,
                name: '最高气温 ',
                data: [11.8, 11.9, 13.5, 14, 16.8, 18.5, 28, 33.4, 31, 24.1, 17.5, 16.8],
                type: 'spline',
                borderRadius: 5,
                threshold: null,
                yAxis: 1,
                tooltip: {
                    valueDecimals: 2
                },
                marker: {
                    fillColor: "#FFFFFF",
                    lineColor: "RGB(254, 191, 140)",
                    lineWidth: 2,
                    //                        radius: 半径
                    //                        states: {状态}
                    symbol: "circle"
                    //                        width
                },
                color: "RGB(254, 191, 140)"
            }],
            credits: {
                enabled: false
            }
        });
    }
})

Ext.define("vmd.comp.Chart", {
    extend: "Ext.BoxComponent",
    xtype: 'vmd.chart',
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
    initComponent: function () {
		 this.myMask = new Ext.LoadMask(Ext.getBody(), {
            msg: "数据加载中,请稍后...",
            msgCls: 'z-index:10000;'
        });
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

    onRender: function (ct, position) {
        var me = this;
        me.myMask.show();
        if (!this.el) {
            this.el = document.createElement("div");

            //绑定属性面板中的size到网格中
            if (!isNaN(me.height)) {
                this.el.style.height = me.height + "px";
            }
            if (!isNaN(me.width)) {
                this.el.style.width = me.width + "px";
            }
            if (this.path) {
                this.query();
            }
            else if (this.tplJSON) {
                if(this.tplJSON.series){
                    for(var i = 0; i < this.tplJSON.series.length; i++){
                        this.tplJSON.series[i].name = this.tplJSON.series[i].sname;
                    }
                }
                //me.chart = Highcharts.chart(this.el, me.tplJSON);
            } else {
                me.myMask.hide();
            }

            this.el.id = this.id;

            //属性赋值
            Ext.applyIf(me, me.chart);
            //重改指向，保证dhx的原生态
            //this.el = this.el.children[0];
            Ext.fly(this.el).addClass('vmd-chart');

            //注册事件           
            this.onEventsReg(me, me.grid);
            window[me.id] = this;
        }
        //vmd.comp.Grid.superclass.onRender.call(this, ct, position);
        this.callParent(arguments);
    },

    afterRender: function (ct) {
        this.callParent(arguments);
        if (this.path) {
			return;
        }
        //绑定store
        if (this.tplJSON.data.storeName) {
            this.bindStore(this.tplJSON.data.storeName, true);
        }else{
            this.myMask.hide();
            Ext.Msg.alert("提示", "曲线没有添加数据")
            return
        }
    },
    refresh: function (store) {
        var me = this;
        //var data = store.getJson();
        for(var i=0;i<me.tplJSON.series.length;i++){
            me.tplJSON.data.seriesMapping[i].x = me.tplJSON.series[i].xData;
            me.tplJSON.data.seriesMapping[i].y = me.tplJSON.series[i].yData;
            me.tplJSON.series[i].events = me.tplJSON.series[i].events ||{};
            me.tplJSON.series[i].events.click = function(e){
                me.fireEvent('SeriesClick',me,this,e)
            }
            me.tplJSON.series[i].events.legendItemClick = function(e){
                me.fireEvent('legendItemClick',me,this,e)
            }
            me.tplJSON.series[i].events.mouseOut = function(e){
                me.fireEvent('SeriesMouseOut',me,this,e)
            }
            me.tplJSON.series[i].events.mouseOver = function(e){
                me.fireEvent('SeriesMouseOver',me,this,e)
            }
        }
        me.tplJSON.data.json = store.getJson();
        me.tplJSON.chart = me.tplJSON.chart || {};
        me.tplJSON.chart.events = me.tplJSON.chart.events || {};
        me.tplJSON.chart.events.load = function () {
            me.fireEvent('load', me, this);
        }
        me.tplJSON.chart.events.click = function (event) {
            me.fireEvent('click',me,this,event);
        }
		var modulesNums = (me.tplJSON.modules && me.tplJSON.modules.length) || 0;
		if(me.tplJSON.legend&&me.tplJSON.legend.draging){
			modulesNums++;
			me.tplJSON.modules = me.tplJSON.modules || [];
			me.tplJSON.modules.push("legendDraging");
		}
		var loadedModules = 0;
		function loadSuccess(){
			me.chart = Highcharts.chart(me.el.dom, me.tplJSON);
			me.myMask.hide();
		}
        if(me.tplJSON.modules&&me.tplJSON.modules.length>0){
            for(var i = 0; i < me.tplJSON.modules.length; i++){
                if(me.tplJSON.modules[i] == "dataviews"){
                    $LAB.script(vmd.virtualPath + "/chart/js/plugins/export-csv.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/data-review-5.src.js").wait(function () {
                        loadedModules++;
						if(loadedModules == modulesNums){
							loadSuccess();
						}
					});
                }
				else if(me.tplJSON.modules[i] == "imgexport"){
                    me.tplJSON.exporting = me.tplJSON.exporting || {};
                    me.tplJSON.exporting.url = vmd.virtualPath + "/chart/ashx/ImageExport.ashx";
                    $LAB.script(vmd.virtualPath + "/chart/js/modules/exporting.src.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/modules/exporting-plug-5.src.js").wait(function () {
                        loadedModules++;
						if(loadedModules == modulesNums){
							loadSuccess();
						}
                    });
                }
				else if(me.tplJSON.modules[i] == "legendDraging"){
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/drag-legend.src.js").wait(function(){
						loadedModules++;
						if(loadedModules == modulesNums){
							loadSuccess();
						}
					});
				}
            }
        }else{
            loadSuccess();
        }
    },

    onUpdate: function (ds, record) {
        if (record) {
            var recordJson = record.data;
            var unode = this.getNodeById(recordJson[this.textField]);
            if (unode)
                unode.setText(recordJson[this.textField])
        }
    },
    onDataChanged: function (store) {
        this.refresh(store);
    },
    bindStore: function (store, initial) {
        if (store) {
            store = Ext.StoreMgr.lookup(store);
            store.on({
                scope: this,
                //beforeload: this.onBeforeLoad,
                datachanged: this.onDataChanged,
                //add: this.onAdd,
                //remove: this.onRemove,
                update: this.onUpdate
                //clear: this.refresh //store.removeAll清空所有数据调用此接口
            });
        }
        //this.store = store;
        //if (store) {
        //    this.refresh();
        //}
    },

    onEventsReg: function (My, Mygrid) {

    },

    onEnter: function (e) {

    },

    doLayout: function () {
        
    },

    onResize: function (w, h) {
        if (this.chart) {
            var outterBorderW = this.el.dom.offsetWidth - this.el.dom.clientWidth;
            var outterBorderH = this.el.dom.offsetHeight - this.el.dom.clientHeight;
            this.chart.setSize(w - outterBorderW, h - outterBorderH);
        }
    },

    onDestroy: function () {

    },

    query: function () {
        var me = this,
            ds,
            paths = "",
            bspar = "",
            m_host = "",
            params = "";
        if (this.dsnames) {
            ds = this.dsnames.split(",");
        }
        if (ds.length > 0) {
            for (var i = 0; i < ds.length; i++) {
                var d = eval(ds[i]);
                if (d) {
                    m_host = d.storeConfig.host;
                    bspar = d.storeConfig.callcode;
                    var p = "";
                    if (d.storeConfig.getMethods.length > 0) {
                        p = "[";
                        for (var k = 0; k < d.storeConfig.getMethods.length; k++) {
                            var valueExp = d.storeConfig.getMethods[k].value1 == "" ? (d.storeConfig.getMethods[k].value2 == "" ? 'return ""' : d.storeConfig.getMethods[k].value2) : d.storeConfig.getMethods[k].value1;
                            var paramValue = eval("(function(){" + valueExp + "})()");
                            p += "{\"Key\":\"" + d.storeConfig.getMethods[k].id + "\",\"Value\":\"" + paramValue + "\"}";
                            if (k != d.storeConfig.getMethods.length - 1) {
                                p += ",";
                            }
                        }
                        p += "]";
                    }
                    if (i != ds.length - 1) {
                        paths += d.storeConfig.url + ",";
                        p += "#";
                    } else {
                        paths += d.storeConfig.url;
                    }
                    params += p;
                }
            }
        }
		
		var dsip;
		if(vmd.workspace)
		{
			dsip=vmd.workspace.dataServiceIp||vmdSettings.dataServiceIp;
		}else
		{
			dsip=vmdSettings.dataServiceIp;
		}

        hwDas.ajax({
            das: false,
            url: vmd.virtualPath + "/report/OnRequestDb2.2.asmx/GetServerChartDataJson_VMD",
            type: 'post',
            contentType: "application/json;charset=utf-8",
            timeout: 5000,
            dataType: "json",
            data: {
                ModelXml: this.relativepath + "//" + this.path,
                title: this.title || "",
                type: "hwrest",
                //数据服务ip
                host: dsip,
                // 数据服务接口
                path: paths,
                methods: "get",
                basicparams: "",
                // 数据服务参数
                restparams: params,
                contenttype: "",
                formbody: ""
            },

            success: function (result) {
                // var r=   Ext.decode(result.d);
                var resultInfo = Ext.decode(result.d);
	if(resultInfo.value==''||resultInfo.value==null){
                    var myOpt = {}
                }else{
                    var myOpt = eval('(' + resultInfo.value + ')');
                }
                myOpt.renderTo = $(me.el.dom);
                //var c = new MCharts(myOpt);
                var c = new Chart(myOpt, "m");
                c.ISetXmlExportPath(resultInfo.taginfo);
                c.IRefresh(function (charts) {
                    me.chart = charts;
                    if (resultInfo.result)
                        charts.charts[0].setTitle({
                            text: resultInfo.result
                        });
                });
				 me.myMask.hide();
            },
            error: function (msg, f) {
				 me.myMask.hide();
                Ext.Msg.alert("提示", "获取数据信息失败",
                function () { })
            }
        })
    },

    getCharts: function () {
        return this.chart.charts;
    },

    setTitle: function(text){
        if(this.chart){
            this.chart.setTitle({
                text:text
            });
        }
        else if(this.tplJSON){
            this.tplJSON.title = this.tplJSON.title || {};
            this.tplJSON.title.text = text;
        }
    }
})