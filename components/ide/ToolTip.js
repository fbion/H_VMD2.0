xds["vmd.ux.ToolTip"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ToolTip",
    category: "vmd复合组件",
    text: "ToolTip",//中文
    naming: "hwToolTip",
    //dtype 设计时组件
    dtype: "vmd.ux.ToolTip",
    //xtype 运行时组件
    xtype: "vmd.ux.ToolTip",
    xcls: "vmd.ux.ToolTip",
    //为了拖拽能自动生成递增id
    defaultName: "hwToolTip",
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
     ,{"name":"valueDecimalsChange","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ToolTip"]);
    xds.Registry.addUserType(xds["vmd.ux.ToolTip"]);

    var Data_vmd_ux_ToolTip={"BaseType":"Control","Type":"vmd_ux_ToolTip","Property":{},"Method":{},"Event":{"valueDecimalsChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ToolTip)