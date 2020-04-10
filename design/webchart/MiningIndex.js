/******************************************************************
 ** 文件名:MiningIndex.js 专业图形组件-设计模式--开采现状图
 ** Copyright (c) 2020 汉威公司技术研究院
 ** 创建人:huangnana
 ** 日 期:2020/03/03
 ** 版 本:1.0
 *
 *
 ** 修改人:
 ** 修改日 期:
 ** 描 述:
 ** 版 本:1.1
 ******************************************************************/
Ext.define('vmd.d.webchart.MiningIndex',{
	extend:'vmd.base.WebChart',
	xtype:'vmd.d.webchart.MiningIndex',
	requires:[  // 加载依赖
		'hwchart.component.Geo',
		'hwchart.component.FrameNew',
		'hwchart.chart.WellGroup',
		'hwchart.chart.Area',
		'hwchart.component.Legend',
		'hwchart.chart.WellSymbol',
		'hwchart.chart.WellTrace',
		'hwchart.chart.WellLabel',
		'hwchart.chart.IsoLine',
		'hwchart.chart.SymbolLine',
		'hwchart.chart.FaultLine',
		'hwchart.component.Title',
		'hwchart.component.Scale',
		'hwchart.component.Compass',
		'hwchart.component.MapInfo',
		'hwchart.chart.MiningIndex',
		'hwchart.chart.IsoArea',
		'hwchart.component.VisualMap',
		'hwchart.component.Brush',
		//'hwchart.component.Toolbox',
		'hwchart.component.Tooltip',
	'vmd.d.webchart.util.DataParse'],
	
	//初始化配置
	initComponent: function() {
		var me =this;
		this.callParent();
		
	},
	//组件渲染接口
	onRender: function(ct, position) {
		var me = this;
		if (!me.el) {
			this.autoEl = {
				cls: 'vmd-chart',
				cn: [{
					cls: 'vmd-chart-grid'
				}]
			}
		}
		me.callParent(arguments);
		me.chartEl = this.el.first();
		me.el.id = me.id;
		//属性赋值
		Ext.applyIf(me, me.chart);
		//重改指向，保证dhx的原生态
		//this.el = this.el.children[0];
		Ext.fly(me.el).addClass('vmd-chart');
		var ownerCt = (me.ownerCt.body || me.ownerCt.el).dom;
		// 是否存在内存对象
		var mgr=vmd.d.webchart.MiningIndex.Mgr;
        var tempObj=mgr.get(me.viewerNode.id)
		if(tempObj&&tempObj.tpl){ 
			Ext.defer(function() {
				if(me.height){
					me.chartEl.dom.style.height = me.height +"px";
				}else{
					me.chartEl.dom.style.height = ownerCt.clientHeight +"px";
				}
				if(me.width){
					me.chartEl.dom.style.width = me.width +"px";
				}else{
					me.chartEl.dom.style.width = ownerCt.clientWidth +"px";
				}
				me.chart = hwcharts.init(me.chartEl.dom);
				me.chart.clear()
				var tpl = tempObj.tpl;
				me.chart.tpl = tpl;
				me.chart.tpl.geo.map.width = parseFloat(me.chartEl.dom.style.width)	
				me.chart.loadTemplate('',{
					enableStaticData:true
				},false)
				me.propPanel = Ext.getCmp(me.propPanelId);
				if(me.propPanel){
					me.propPanel.setMyCharts(me.chart)
				}
			}, 10)
		}else{ 
			if(me.path){
				var path = me.path;
			}else{
				var path = '/design/webchart/templates/kczb.json';
			}
			vmd.readTemplate(path,function(res){
				if(me.height){
					me.chartEl.dom.style.height = me.height +"px";
				}else{
					me.chartEl.dom.style.height = ownerCt.clientHeight +"px";
				}
				if(me.width){
					me.chartEl.dom.style.width = me.width +"px";
				}else{
					me.chartEl.dom.style.width = ownerCt.clientWidth +"px";
				}
				me.chart = hwcharts.init(me.chartEl.dom);
				me.chart.tpl = res;
				me.chart.tpl.geo.map.width = parseFloat(me.chartEl.dom.style.width);
				me.chart.loadTemplate('',{
					enableStaticData:true
				},false)
				mgr.add(me.viewerNode.id,me.chart)
			}, function(error){
				console.warn(error)
			})
		}
	},
	//渲染完成接口
	afterRender: function() {
		this.callParent(arguments);
		//去掉遮罩层
		// function hideFilm(parentNode) {
		// 	var t = document.getElementById("film-for-" + parentNode.id);
		// 	if (t) {
		// 		var designerCmp = parentNode.component;
		// 		if (designerCmp && (designerCmp.cid == 'panel' || designerCmp.cid == 'tabpanel')) {
		// 			var cmp = Ext.getCmp(designerCmp.activeCmpId);
		// 			cmp._isRpt = true;
		// 		} else {
		// 			t.style.display = "none";
		// 		}
		// 		hideFilm(parentNode.parentNode);
		// 	}
		// }

		// var t = document.getElementById("film-for-" + this.viewerNode.id);
		// if (t) {
		// 	t.style.display = "none";
		// 	hideFilm(this.viewerNode.parentNode);
		// }
	},
	onDestroy:function(){
		var mgr=vmd.d.webchart.MiningIndex.Mgr;
        // mgr.remove(me.viewerNode.id);
		// if(this.rendered){
			
		// 	var wellMgr=hwchart.chart.helper.WellManager
		// 	var group=wellMgr.getGroup();
			
		// 	delete this.chart;
		// 	delete this.el
		// }
		this.callParent(arguments);
	},
	onEventsReg: function(My, Mygrid) {

	},
	onResize: function(w, h) {
		var me  = this;
		if(me.chart){
			if(!me.height){
				var outterBorderW = me.chartEl.dom.offsetWidth - this.chartEl.dom.clientWidth;
				var outterBorderH = me.chartEl.dom.offsetHeight - this.chartEl.dom.clientHeight;
				me.chart.resize(w - outterBorderW, h - outterBorderH);
			}
		}else{

		}
	},
	getJSON:function(url, success, error) {
        var me = this;
        var request = new XMLHttpRequest();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                var json = request.responseText;
                success(json)
            }else{
                var mgs = request.status+":"+request.responseText
                error(mgs)
            }
        }
    },
	onSave:function(callback){
		
		var me = this;
		
		//实现保存方法
		 /** 
     * @desc 保存模版，只在设计模式下使用，用于存储模块的公共配置
     * @param {string} fileName-文件名称,或者包含路径的文件名称，路径格式为 项目id/目录id/目录id/***.json
     * @param {string}context- 文件内容
     * @param {fun}successback- 成功回调
     * @param {fun}errorback- 失败回调
     * **/
		var context = JSON.stringify(me.chart.tpl);
		var fileName = me.viewerNode.id+'kczb.json';
		//me.viewerNode.component.setConfig("path", '23423423423');
		vmd.saveTemplate(fileName,context,function(res){
			me.path = res.data[0];
			me.viewerNode.component.setConfig("path", me.path);
			
			if(callback){
				callback()
			}
		}, function(error){
			console.warn(error)
			if(callback){
				callback()
			}
		})
		
	}
	
},function(){
	vmd.d.webchart.MiningIndex.Mgr= new Ext.util.MixedCollection();
})

