/******************************************************************
 ** 文件名:Well.js 专业图形组件--井位图
 ** Copyright (c) 2020 汉威公司技术研究院
 ** 创建人:马飞
 ** 日 期:2020/02/27
 ** 版 本:1.0
 *
 *
 ** 修改人:
 ** 修改日 期:2020/02/27
 ** 描 述:
 ** 版 本:1.1
 ******************************************************************/
Ext.define('vmd.webchart.Well',{
	extend:'vmd.base.WebChart',
	xtype:'vmd.webchart.well',
	requires:[
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
		'hwchart.component.Toolbox',
		'hwchart.component.Tooltip'],
	//初始化配置
	initComponent: function() {
		this.myMask = new Ext.LoadMask(Ext.getBody(), {
			msg: "数据加载中,请稍后...",
			msgCls: 'z-index:10000;'
		});
	  this.callParent();
	},
	//组件渲染接口
	onRender: function(ct, position) {
		var me = this;
		// me.myMask.show();
		if (!this.el) {
			this.el = document.createElement("div");
			var ownerCt = (me.ownerCt.body || me.ownerCt.el).dom;
			if(me.height){
				me.el.style.height = me.height +"px";
			}else{
				me.el.style.height = ownerCt.clientHeight +"px";
			}
			if(me.width){
				me.el.style.width = me.width +"px";
			}else{
				me.el.style.width = ownerCt.clientWidth +"px";
			}
		}
		this.callParent(arguments);
		if(me.path){
			vmd.readTemplate(me.path,function(res){
				me.chart = hwcharts.init(me.el.dom);
				me.chart.tpl = res;
				me.chart.tpl.geo.width = parseFloat(me.el.dom.style.width);
				me.chart.loadTemplate('',{
					host:vmd.MicService.getDasIp(), // 数据访问服务地址
					GeologyAlgorithmHost:vmd.MicService.getGrapAasIp(), // 图形算法
				},false)
			}, function(error){
				console.warn(error)
			})
			//var path = vmd.virtualPath + '/'+ me.path;
		}else{
			var path = vmd.virtualPath + '/templates/defaults/well.json';
			me.chart.loadTemplate(path,{
				host:vmd.MicService.getDasIp(), // 数据访问服务地址
				GeologyAlgorithmHost:vmd.MicService.getGrapAasIp(), // 图形算法
			},false)
		}
	},
	//渲染完成接口
	afterRender: function() {
		this.callParent(arguments);
	},
	
	onResize: function(w, h) {
		var me  = this;
		
		if(me.chart)
		{
			me.chart.resize(w, h);
			debugger
			// 处理窗口自适应
			me.graphFit(w, h);
		}
	},
		// 图形缩放自适应
	graphFit:function(w, h) {	
		var me  = this;	
		
		if(!me.chart){
			return;
		}				

		var ecModel = me.chart._api.getModel(); // 获取Model的ecModel
		if(!ecModel){
			return;
		}		
		var geo = ecModel.getComponent('geo');
		var _boudingRect = geo.coordinateSystem.getBoundingRect();
		{
			var ptLeftTop = geo.coordinateSystem.dataToPoint([_boudingRect.x, _boudingRect.y + _boudingRect.height]);
			var ptRightBtm = geo.coordinateSystem.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y]);

			// 计算逻辑宽高
			// var frameHei = 414.9630163348047;
			// var frameWid = 479.99999852408655;
			var frameHei = ptRightBtm[1] - ptLeftTop[1];
			var frameWid = ptRightBtm[0] - ptLeftTop[0];
			if (frameHei < 1) { frameHei = 100; }
			if (frameWid < 1) { frameWid = 100; }

			var chartHei = me.chart.getHeight();
			var chartWid = me.chart.getWidth();
			var newWid = (chartHei - 100) * frameWid / frameHei;
			// 缩放比例
			// var zoomFactor = (me.chart.getHeight() - 150) / frameHei;		
			//var zoomFactor = (me.chart._dom.offsetHeight - 120) / frameHei;
			// var zoomFactor = (me.chart.getWidth() - 120) / frameWid;	
			var opt = me.chart.getOption();
			// 设置geo的属性
			for (var i = 0; i < opt.geo.length; i++) {
				opt.geo[i].width = newWid;
			}
			me.chart.setOption({
				geo: opt.geo
			})
		}
    },
	onDestroy:function(){
		this.callParent(arguments);
	},
	query:function(){
		var me  = this;
		var tpl = me.chart.tpl;
		me.chart.dispose();
		for(var i = 0;i<tpl.series.length;i++){
			tpl.series[i].fetchData = true;
		}
		me.chart = hwcharts.init(me.el.dom);
		me.chart.tpl = tpl;
		me.chart.tpl.geo.width = parseFloat(me.el.dom.style.width);
		me.chart.loadTemplate('',{
			host:vmd.MicService.getDasIp(), // 数据访问服务地址
			GeologyAlgorithmHost:vmd.MicService.getGrapAasIp(), // 图形算法
		},false)
	}
})
