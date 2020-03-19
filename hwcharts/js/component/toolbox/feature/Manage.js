Ext.define('hwchart.component.toolbox.feature.Manage', {
    requires: [
        'hwchart.component.toolbox.featureManager',
    ]
}, function () {
	var env = zrender.env;
	var zUtil = zrender.util;
	var chartCon = null;
	var tabCon = null;
	
    function ManageTabs(model) {
        this.model = model;
    }

    ManageTabs.defaultOption = {
        show: true,
        icon: 'M961.84 697.92l-148.8-83.44 148.32-80a32 32 0 0 0 0-56L824 402.64l137.28-73.84a32 32 0 0 0 0-56L528 39.36a32 32 0 0 0-30.32 0L64.64 272.4a32 32 0 0 0 0 56L200 401.68 64 478.64a32 32 0 0 0 0.64 56l152 81.92L64.8 697.6a32 32 0 0 0 0 56.4l433.2 233.04a32 32 0 0 0 30.32 0l433.2-233.04a32 32 0 0 0 0.32-56.08zM513.04 104l365.68 196.72L744 372.96a32 32 0 0 0-4.48 2.4L513.04 497.36 147.36 300.64zM266.72 437.52l231.12 124.32a32 32 0 0 0 30.32 0l228.8-123.12 122.32 67.44L513.04 703.2 146 505.76z m246.32 485.04L147.6 726l136.96-72.96L497.84 768A32 32 0 0 0 528 768l218.32-117.6L880 725.2z',

        title: '管理'

    };

    var proto = ManageTabs.prototype;

    proto.onclick = function (ecModel, api) {
	   var me = this;
	   var layerEle = document.getElementById('hwcharts-tab');
	   if(layerEle){
	       return
	   }
	   tabCon = $('<div id="hwcharts-tab"><i class="colse-ico"></i></div>');
	          
	   $('body').append(tabCon)
	   me.ecModel = ecModel;
	   me.api  = api;
	   me.chart = api.getChart();
	   chartCon = $(me.chart._dom);
	   chartCon.css("float","left")
	   tabCon.width("17%");
	   tabCon.css('border','1px #eee solid')
	   chartCon.width("81%");
	   me.chart.resize();
	   me.initTabs(ecModel, api);
    };
    proto.initTabs = function(ecModel,api){
        var me = this;
		var plugins = [];
		var tabs = (me.chart.tpl.toolbox&&me.chart.tpl.toolbox.items&&me.chart.tpl.toolbox.items.manage.tabs)||[]      
		me.myTabbar = new dhtmlXTabBar({
				   parent: 'hwcharts-tab', 
				   tabs:tabs
		});
		zUtil.each(tabs, function (tab) {
		    tab.id && plugins.push('hwchart.managetabs.' + Ext.String.capitalize(tab.id));
		}, this)
		Ext.require(plugins, function () {
		    //动态请求对应的对话框插件
		    var activeId = me.myTabbar.getActiveTab();
			if(activeId){
				var parets = me.myTabbar.tabs(activeId).cell.firstChild;
				this.LManage = new hwchart.managetabs[Ext.String.capitalize(activeId)](ecModel,api,parets);
			}
			me.myTabbar.attachEvent("onTabClick", function(id, lastId){
			    if(id){
			        var parets = me.myTabbar.tabs(id).cell.firstChild;
			        this.LManage = new hwchart.managetabs[Ext.String.capitalize(id)](ecModel,api,parets);
			    }
			});
			
		})
		// 关闭管理器
		 $('#hwcharts-tab').on('click','.colse-ico',function(){
		    tabCon.remove();
		    chartCon.width("98%");
		    me.chart.resize();
		})
        
    }
    proto.setFormItem = function(){
        var me = this;
        
    }
    proto.createForm = function(){
        var me =this;
        
    }
    hwchart.component.toolbox.featureManager.register(
        'manage', ManageTabs
    );

    hwchart.component.toolbox.feature.Manage = ManageTabs;
})

