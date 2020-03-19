xds["vmd.ux.PrintSetting"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.PrintSetting",
    category: "vmd复合组件",
    text: "PrintSetting",//中文
    naming: "hwPrintSetting",
    //dtype 设计时组件
    dtype: "vmd.ux.PrintSetting",
    //xtype 运行时组件
    xtype: "vmd.ux.PrintSetting",
    xcls: "vmd.ux.PrintSetting",
    //为了拖拽能自动生成递增id
    defaultName: "hwPrintSetting",
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
    xds.Registry.register(xds["vmd.ux.PrintSetting"]);
    xds.Registry.addUserType(xds["vmd.ux.PrintSetting"]);

    var Data_vmd_ux_PrintSetting={"BaseType":"Control","Type":"vmd_ux_PrintSetting","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_PrintSetting)