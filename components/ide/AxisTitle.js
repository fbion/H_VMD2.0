xds["vmd.ux.AxisTitle"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.AxisTitle",
    category: "vmd复合组件",
    text: "AxisTitle",//中文
    naming: "hwAxisTitle",
    //dtype 设计时组件
    dtype: "vmd.ux.AxisTitle",
    //xtype 运行时组件
    xtype: "vmd.ux.AxisTitle",
    xcls: "vmd.ux.AxisTitle",
    //为了拖拽能自动生成递增id
    defaultName: "hwAxisTitle",
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
     ,{"name":"axisTitleRowChange","group":"事件","ctype":"string","editor":"ace","params":"row"},{"name":"axisTitleOffsetChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisTitleXChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisTitleYChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisFontFamityChange","group":"事件","ctype":"string","editor":"ace","params":"famity"},{"name":"axisFontColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"axisFontSizeChange","group":"事件","ctype":"string","editor":"ace","params":"size"},{"name":"axisFontStyleChange","group":"事件","ctype":"string","editor":"ace","params":"style"},{"name":"axisTitleRotationChange","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.AxisTitle"]);
    xds.Registry.addUserType(xds["vmd.ux.AxisTitle"]);

    var Data_vmd_ux_AxisTitle={"BaseType":"Control","Type":"vmd_ux_AxisTitle","Property":{},"Method":{},"Event":{"axisTitleRowChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisTitleOffsetChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisTitleXChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisTitleYChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisFontFamityChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisFontColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisFontSizeChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisFontStyleChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisTitleRotationChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_AxisTitle)