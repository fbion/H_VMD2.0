xds["vmd.ux.LineColor"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.LineColor",
    category: "vmd复合组件",
    text: "LineColor",//中文
    naming: "hwLineColor",
    //dtype 设计时组件
    dtype: "vmd.ux.LineColor",
    //xtype 运行时组件
    xtype: "vmd.ux.LineColor",
    xcls: "vmd.ux.LineColor",
    //为了拖拽能自动生成递增id
    defaultName: "hwLineColor",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/linecolor/1.0/css/iconfont.css"],
    requireJs: [],
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
     ,{"name":"lineColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.LineColor"]);
    xds.Registry.addUserType(xds["vmd.ux.LineColor"]);

    var Data_vmd_ux_LineColor={"BaseType":"Control","Type":"vmd_ux_LineColor","Property":{},"Method":{"setOriColor":{"Description":"setOriColor","Prototype":"setOriColor(selColor)","Args":{"_Return_":"void","Args":"selColor"},"Example":""}},"Event":{"lineColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_LineColor)