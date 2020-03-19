xds["vmd.ux.Serieslable"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Serieslable",
    category: "vmd复合组件",
    text: "Serieslable",//中文
    naming: "hwSerieslable",
    //dtype 设计时组件
    dtype: "vmd.ux.Serieslable",
    //xtype 运行时组件
    xtype: "vmd.ux.Serieslable",
    xcls: "vmd.ux.Serieslable",
    //为了拖拽能自动生成递增id
    defaultName: "hwSerieslable",
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
     ,{"name":"seriesLableAlignChange","group":"事件","ctype":"string","editor":"ace","params":"align"},{"name":"seriesLableVarAlignChange","group":"事件","ctype":"string","editor":"ace","params":"varAlign"},{"name":"seriesLableXchange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"seriesLableYchange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"FontFamitychange","group":"事件","ctype":"string","editor":"ace","params":"famity"},{"name":"FontSizechange","group":"事件","ctype":"string","editor":"ace","params":"size"},{"name":"FontStylechange","group":"事件","ctype":"string","editor":"ace","params":"style"},{"name":"FontColorchange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"seriesLableDistance","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Serieslable"]);
    xds.Registry.addUserType(xds["vmd.ux.Serieslable"]);

    var Data_vmd_ux_Serieslable={"BaseType":"Control","Type":"vmd_ux_Serieslable","Property":{},"Method":{},"Event":{"seriesLableAlignChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"seriesLableVarAlignChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"seriesLableXchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"seriesLableYchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"FontFamitychange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"FontSizechange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"FontStylechange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"FontColorchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"seriesLableDistance":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Serieslable)