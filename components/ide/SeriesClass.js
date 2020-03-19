xds["vmd.ux.SeriesClass"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.SeriesClass",
    category: "vmd复合组件",
    text: "SeriesClass",//中文
    naming: "hwSeriesClass",
    //dtype 设计时组件
    dtype: "vmd.ux.SeriesClass",
    //xtype 运行时组件
    xtype: "vmd.ux.SeriesClass",
    xcls: "vmd.ux.SeriesClass",
    //为了拖拽能自动生成递增id
    defaultName: "hwSeriesClass",
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
     ,{"name":"LineStyleChange","group":"事件","ctype":"string","editor":"ace","params":"line"},{"name":"lineWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"lineColorChange","group":"事件","ctype":"string","editor":"ace","params":"seleColor"},{"name":"pointRadiusChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"ponLinWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"ponLinColorChange","group":"事件","ctype":"string","editor":"ace","params":"selColor"},{"name":"ponFillColorChange","group":"事件","ctype":"string","editor":"ace","params":"selColor"},{"name":"columnBorderWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"columnBorderRadiusChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"columnBorderColorChange","group":"事件","ctype":"string","editor":"ace","params":"selColor"},{"name":"peiInnerSizeChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"areaColorChange","group":"事件","ctype":"string","editor":"ace","params":"selColor"},{"name":"maxPointWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.SeriesClass"]);
    xds.Registry.addUserType(xds["vmd.ux.SeriesClass"]);

    var Data_vmd_ux_SeriesClass={"BaseType":"Control","Type":"vmd_ux_SeriesClass","Property":{},"Method":{},"Event":{"LineStyleChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"lineWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"lineColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"pointRadiusChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"ponLinWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"ponLinColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"ponFillColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"columnBorderWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"columnBorderRadiusChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"columnBorderColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"peiInnerSizeChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"areaColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"maxPointWidthChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_SeriesClass)