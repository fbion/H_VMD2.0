xds["vmd.ux.ChartTb"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ChartTb",
    category: "vmd复合组件",
    text: "ChartTb",//中文
    naming: "hwChartTb",
    //dtype 设计时组件
    dtype: "vmd.ux.ChartTb",
    //xtype 运行时组件
    xtype: "vmd.ux.ChartTb",
    xcls: "vmd.ux.ChartTb",
    //为了拖拽能自动生成递增id
    defaultName: "hwChartTb",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"border"},
    isResizable: function (a, b) {

        return true;
    },
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
     ,{"name":"chartWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"},{"name":"chartHeightChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"},{"name":"chartTopMarginChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"},{"name":"chartBottomMarginChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"},{"name":"chartLeftMarginChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"},{"name":"chartRightMarginChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"},{"name":"chartSpacingChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"},{"name":"chartminHeightChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ChartTb"]);
    xds.Registry.addUserType(xds["vmd.ux.ChartTb"]);

    var Data_vmd_ux_ChartTb={"BaseType":"Control","Type":"vmd_ux_ChartTb","Property":{},"Method":{},"Event":{"chartWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"chartHeightChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"chartTopMarginChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"chartBottomMarginChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"chartLeftMarginChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"chartRightMarginChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"chartSpacingChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"chartminHeightChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ChartTb)