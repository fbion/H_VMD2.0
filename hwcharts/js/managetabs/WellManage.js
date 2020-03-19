Vmd.define('hwchart.managetabs.WellManage', {
    requires: []
}, function () {
    var zUtil = zrender.util;
    var layersCon = null;
    
    function WellManage(ecModel,api,parets) {
        var me = this;
        layersCon = $('<div id="hwcharts-well"></div>');
		$(parets).html('');
        $(parets).append(layersCon)
        me.ecModel = ecModel;
        me.api  = api;
        me.chart = api.getChart();
        me.layersCon = layersCon; 
        me.init(ecModel,api);
		// 监听框选／不规则选选中的井
		me .chart.on('chartregionselected', function (areas,seleted) {
		    console.log(seleted) // 所有选中的井数据
		})
    }

    var proto = WellManage.prototype;
	// 初始化
    proto.init = function (ecModel, api) {
        layersCon.width("100%");
		layersCon.height("100%");
        var me = this;
        me.chart = api.getChart();
      
        me.getWellData(ecModel);
        me.createHtml();
        me.initAttachEvent();
    };
	// 获取井位数据
	proto.getWellData = function(ecModel){
		var me = this;
		var serise = ecModel.getSeriesByType('wellSymbol');
		me.allwell = [];
		serise.forEach(function(item){
		    var data = item.getData()._rawData._data || item.getData()._rawData || [];
		    console.log(data)
		    data.forEach(function(value,i){
		        var obj = {
		            id:value.id,
		            text:value.name,
		            seriesId:item.id,
		            seriesIndex: item.seriesIndex,
		            seriesName: item.name,
		            dataIndex:i
		        }
		        me.allwell.push(obj)
		    })
		});
	}
    // 创建图层html
    proto.createHtml = function(){
        var me = this;
        var html = '<ul class="layer-list layer-one"><li>1号井</li><li>1号井</li><li>1号井</li></ul>';
        layersCon.html(html);

    }
	// 事件监听
    proto.initAttachEvent = function(){
        var me = this;
        var api=me.api;
        //参数格式
        // selectWell = [{
        //     seriesId:allWell[0].seriesId, // 选中井所在序列id，也就是返回数据allWell中的seriesId
        //     seriesIndex: allWell[0].seriesIndex, // 选中井所在序列的索引值，也就是返回数据allWell中的seriesIndex
        //     seriesName: '油井井位',// 选中井所在序列的名称，也就是返回数据allWell中的seriesName
        //     dataIndex:[33, 49, 65, 66, 79] // 选中井的索引值，也就是返回数据allWell中的dataIndex的集合
        // }]
        $('#hwcharts-well').on('click',function(){
			// 选中井以后 选中状态操作如下
			// me.chart.dispatchAction({
			//     type: 'brushSelect',
			//     batch: [{
			//         selected:selectWell
			//     }]
			// })
			
        })
    }
    
    hwchart.managetabs.WellManage = WellManage;
})

