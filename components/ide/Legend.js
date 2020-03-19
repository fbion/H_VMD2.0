xds["vmd.ux.Legend"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Legend",
    category: "vmd复合组件",
    text: "Legend",//中文
    naming: "hwLegend",
    //dtype 设计时组件
    dtype: "vmd.ux.Legend",
    //xtype 运行时组件
    xtype: "vmd.ux.Legend",
    xcls: "vmd.ux.Legend",
    //为了拖拽能自动生成递增id
    defaultName: "hwLegend",
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
     ,{"name":"legendLoyoutChange","group":"事件","ctype":"string","editor":"ace","params":"layout"},{"name":"legendAlineChange","group":"事件","ctype":"string","editor":"ace","params":"align"},{"name":"legendVerticalAlignChange","group":"事件","ctype":"string","editor":"ace","params":"verticalAlign"},{"name":"legendoffsetXChange","group":"事件","ctype":"string","editor":"ace","params":"value,describe"},{"name":"legendWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value,describe"},{"name":"legendItemWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value,describe"},{"name":"legPaddingChange","group":"事件","ctype":"string","editor":"ace","params":"value,describe"},{"name":"legMarginChange","group":"事件","ctype":"string","editor":"ace","params":"value,describe"},{"name":"legendoffsetYChange","group":"事件","ctype":"string","editor":"ace","params":"value,describe"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Legend"]);
    xds.Registry.addUserType(xds["vmd.ux.Legend"]);

    var Data_vmd_ux_Legend={"BaseType":"Control","Type":"vmd_ux_Legend","Property":{},"Method":{},"Event":{"legendLoyoutChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"legendAlineChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"legendVerticalAlignChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"legendoffsetXChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"legendWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"legendItemWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"legPaddingChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"legMarginChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"legendoffsetYChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Legend)