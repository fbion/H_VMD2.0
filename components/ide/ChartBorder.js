xds["vmd.ux.ChartBorder"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ChartBorder",
    category: "vmd复合组件",
    text: "ChartBorder",//中文
    naming: "hwChartBorder",
    //dtype 设计时组件
    dtype: "vmd.ux.ChartBorder",
    //xtype 运行时组件
    xtype: "vmd.ux.ChartBorder",
    xcls: "vmd.ux.ChartBorder",
    //为了拖拽能自动生成递增id
    defaultName: "hwChartBorder",
    iconCls: "icon-cmp",
    isContainer: false,
   
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
     ,{"name":"tbBroderWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"htBroderWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"tbBorderRadiusChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"backColorChange","group":"事件","ctype":"string","editor":"ace","params":"SelColor"},{"name":"borderColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"plotBackColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"plotBorderColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ChartBorder"]);
    xds.Registry.addUserType(xds["vmd.ux.ChartBorder"]);

    var Data_vmd_ux_ChartBorder={"BaseType":"Control","Type":"vmd_ux_ChartBorder","Property":{},"Method":{},"Event":{"tbBroderWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"htBroderWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"tbBorderRadiusChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"backColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"borderColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"plotBackColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"plotBorderColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ChartBorder)