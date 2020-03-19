xds["vmd.ux.FictSettings"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FictSettings",
    category: "vmd复合组件",
    text: "FictSettings",//中文
    naming: "hwFictSettings",
    //dtype 设计时组件
    dtype: "vmd.ux.FictSettings",
    //xtype 运行时组件
    xtype: "vmd.ux.FictSettings",
    xcls: "vmd.ux.FictSettings",
    //为了拖拽能自动生成递增id
    defaultName: "hwFictSettings",
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
    xds.Registry.register(xds["vmd.ux.FictSettings"]);
    xds.Registry.addUserType(xds["vmd.ux.FictSettings"]);

    var Data_vmd_ux_FictSettings={"BaseType":"Control","Type":"vmd_ux_FictSettings","Property":{},"Method":{"getNow":{"Description":"getNow","Prototype":"getNow()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_FictSettings)