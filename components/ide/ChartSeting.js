xds["vmd.ux.ChartSeting"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ChartSeting",
    category: "vmd复合组件",
    text: "ChartSeting",//中文
    naming: "hwChartSeting",
    //dtype 设计时组件
    dtype: "vmd.ux.ChartSeting",
    //xtype 运行时组件
    xtype: "vmd.ux.ChartSeting",
    xcls: "vmd.ux.ChartSeting",
    //为了拖拽能自动生成递增id
    defaultName: "hwChartSeting",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: ["components/ux/chartseting/1.0/js/defaultData.js"],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"fit"},
    isResizable: function (a, b) {

        return true;
    },
	//属性面板
    
    //标准属性设置
    configs: [
         {
             name: "hidden",
             group: "外观",
             ctype: "boolean"
         },

      {
          name: "cls",
          group: "外观",
          ctype: "string"
      }, {
          name: "disabled",
          group: "外观",
          ctype: "boolean"
      }, {
          name: "id",
          group: "设计",
          ctype: "string"
      }, {
          name: "style",
          group: "外观",
          ctype: "string"
      }, {
          name: "width",
          group: "外观",
          ctype: "number"
      }
     , {
         name: "height",
         group: "外观",
         ctype: "number"
     }
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ChartSeting"]);
    xds.Registry.addUserType(xds["vmd.ux.ChartSeting"]);

    var Data_vmd_ux_ChartSeting={"BaseType":"Control","Type":"vmd_ux_ChartSeting","Property":{},"Method":{"bindChart":{"Description":"bindChart","Prototype":"bindChart(name,obj,itemEl,store)","Args":{"_Return_":"void","Args":"name,obj,itemEl,store"},"Example":""},"receiveStoreData":{"Description":"receiveStoreData","Prototype":"receiveStoreData(store)","Args":{"_Return_":"void","Args":"store"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ChartSeting)