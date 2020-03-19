Ext.define('hwchart.component.toolbox.feature.Define', {
    requires: [
        'hwchart.component.toolbox.featureManager',
        'hwchart.Dialog'
    ]
}, function () {
    var env = zrender.env;
    var zUtil = zrender.util;
    var Dialog = hwchart.component.Dialog;

    function WellDefine(model) {
        this.model = model;
        this.dialogWin;
    }

    WellDefine.defaultOption = {
        show: true,
        icon: 'M917.213 903.239H106.787c-23.151 0-41.918-18.766-41.918-41.917V162.678c0-23.148 18.768-41.917 41.918-41.917h810.426c23.15 0 41.918 18.769 41.918 41.917v698.643c0 23.151-18.769 41.918-41.918 41.918zM316.38 861.321h600.833V498.027H316.38v363.294z m-209.593 0h167.674V498.027H106.787v363.294z m41.918-698.643c-23.151 0-41.918 18.768-41.918 41.92s18.768 41.92 41.918 41.92 41.92-18.77 41.92-41.92-18.769-41.92-41.92-41.92z m125.756 0c-23.151 0-41.918 18.768-41.918 41.92s18.768 41.92 41.918 41.92c23.151 0 41.92-18.77 41.92-41.92s-18.77-41.92-41.92-41.92z m125.755 0c-23.15 0-41.918 18.768-41.918 41.92s18.769 41.92 41.918 41.92c23.152 0 41.92-18.77 41.92-41.92s-18.768-41.92-41.92-41.92z m475.077 125.756H106.787v167.675h810.427V288.434h-41.921z',
        title: '自定义配置'
    };


    var proto = WellDefine.prototype;

    proto.onclick = function (ecModel, api) {
        var me = this;
        this.chart = api.getChart();
        this.ecModel = ecModel;
        // if (this.dialogWin) {
        //     this.dialogShow();
        // } else {
            this.createDialog();
        // }

    };

    proto.dialogShow = function () {
        this.dialogWin.window("define").show();
    }

    proto.createDialog = function () {
        var me = this;
        var mode = this.model;
        this.dialogWin = new dhtmlXWindows();
        //me.defineWins.setSkin('dhx_terrace');
        var win = this.dialogWin.createWindow({
            id: "define",
            text: "自定义配置",
            width: mode.get('width')||660,
            height:mode.get('height')||640,
            center: true
        });
        win.button('park').hide();
        win.button('minmax').hide();

        // this.dialogWin.attachEvent("onClose", function (win) {
        //     // me.dialogWin.window("define").hide();
        // });

        //得到配置的tab项
        this._createTabs(win);
       
        //g.cdata.a.conf.collapsed || g.cdata.b.conf.collapsed || this.conf.locked;
        

    }
    proto._createTabs = function (win) {
        var me = this;
        var _tabs = this.model.get('tabs') || [];
        var tabs = [];
        //先布局，然后在attachForm
        var layout = win.attachLayout({
          
            pattern: "2E",           // string, layout's pattern
           
            offsets: {          // optional, offsets for fullscreen init
                top: 0,     // you can specify all four sides
                right: 0,     // or only the side where you want to have an offset
                bottom: 0,
                left: 0
            }
        });
        
        var layout_a = layout.cells('a');
        var layout_b = layout.cells('b');
        
        layout_a.hideHeader();
        layout_b.hideHeader();
        layout_b.setHeight(50);
        layout_a.fixSize(true, true);

        zUtil.each(_tabs, function (tab) {
            if(tab.seriesName ==='baseProperty'){
                tab.data = true;
            }
            var series= me.ecModel.getSeries();
            series.forEach(function(item){
                // if(item.subType === tab.seriesName && tab.seriesName!='miningIndex'){
                //     tab.data = true;
                // }
                if(item.subType === tab.seriesName && item.option.data.length >0){
                    tab.data = true;
                }
                // if(item.subType === tab.seriesName && tab.seriesName==='isoArea' && item.option.data.length >0){
                //     tab.data = true;
                // }
            })
            if (tab.seriesName && tab.data) {
                var settings = {
                    id: tab.seriesName,
                    text: tab.text
                }
                if (typeof tab.active!='undefined') {
                    settings.active = tab.active;
                }
                tabs.push(settings);
            }
        })

        //创建tabbaar
        this.tabbar = layout_a.attachTabbar({
            tabs: tabs
        })

        //动态创建form
        this._createForm(tabs);

        //创建确定和取消
        this._createConfirm(layout_b);
    }
    proto._createForm = function (tabs) {
        var me = this;
        var plugins = [];
        me.winForms = [];
        zUtil.each(tabs, function (tab) {
            tab.id && plugins.push('hwchart.dialog.' + Ext.String.capitalize(tab.id));
        }, this)

        Ext.require(plugins, function () {
            //动态请求对应的对话框插件
            zUtil.each(tabs, function (tab) {
                if(tab.id){
                    var inst = new hwchart.dialog[Ext.String.capitalize(tab.id)](this.chart);
                    var settings = inst.getStettings();
                    var tabItem = this.tabbar.tabs(tab.id);
                    inst.form = tabItem && tabItem.attachForm(settings);
                    if(inst.initFormWin){
                        inst.initFormWin();
                    }
                    me.winForms.push(inst)
                }
            }, me)
        })
        
    }
    proto._createConfirm = function (layout) {
        var me = this;
        var form = layout.attachForm([{
            type: "block", offsetLeft: 400, list: [
                    { type: "button", width: 80, name: "confirm", value: '确认', offsetLeft: 12 },
                    { type: "newcolumn" },
                    { type: "button", width: 80, name: "cancel", value: '取消', offsetLeft: 12 }
            ]
        }])

        form.attachEvent("onButtonClick", function (name) {
            var win = me.dialogWin.window('define');
            if (name == "confirm") {
                zUtil.each(me.winForms,function(item){
                    if(item.save){
                        item.save();
                    }
                })
                win.close();
            }
            if (name == "cancel") {
                zUtil.each(me.winForms,function(item){
                    if(item.cancel){
                        item.cancel();
                    }
                })
                win.close();
            }
        })

    }

    hwchart.component.toolbox.featureManager.register(
        'define', WellDefine
    );

    hwchart.component.toolbox.feature.WellDefine = WellDefine;
})