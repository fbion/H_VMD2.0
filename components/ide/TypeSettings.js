xds["vmd.ux.TypeSettings"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TypeSettings",
    category: "vmd复合组件",
    text: "TypeSettings",//中文
    naming: "hwTypeSettings",
    //dtype 设计时组件
    dtype: "vmd.ux.TypeSettings",
    //xtype 运行时组件
    xtype: "vmd.ux.TypeSettings",
    xcls: "vmd.ux.TypeSettings",
    //为了拖拽能自动生成递增id
    defaultName: "hwTypeSettings",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.TypeSettings"]);
    xds.Registry.addUserType(xds["vmd.ux.TypeSettings"]);

    var Data_vmd_ux_TypeSettings={"BaseType":"Control","Type":"vmd_ux_TypeSettings","Property":{},"Method":{"getNow":{"Description":"getNow","Prototype":"getNow()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TypeSettings)