xds["vmd.ux.ChartTitle"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ChartTitle",
    category: "vmd复合组件",
    text: "ChartTitle",//中文
    naming: "hwChartTitle",
    //dtype 设计时组件
    dtype: "vmd.ux.ChartTitle",
    //xtype 运行时组件
    xtype: "vmd.ux.ChartTitle",
    xcls: "vmd.ux.ChartTitle",
    //为了拖拽能自动生成递增id
    defaultName: "hwChartTitle",
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
     ,{"name":"titleVerticalAlignChange","group":"事件","ctype":"string","editor":"ace","params":"verticalAlig"},{"name":"titleAlineChange","group":"事件","ctype":"string","editor":"ace","params":"align"},{"name":"titleoffsetXChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"},{"name":"titleoffsetYChange","group":"事件","ctype":"string","editor":"ace","params":"value, describe"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ChartTitle"]);
    xds.Registry.addUserType(xds["vmd.ux.ChartTitle"]);

    var Data_vmd_ux_ChartTitle={"BaseType":"Control","Type":"vmd_ux_ChartTitle","Property":{},"Method":{},"Event":{"titleVerticalAlignChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"titleAlineChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"titleoffsetXChange":{"Prototype":"","Args":{"_Return_":""},"Example":""},"titleoffsetYChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ChartTitle)