xds["vmd.ux.DevelopServerInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DevelopServerInfo",
    category: "vmd复合组件",
    text: "DevelopServerInfo",//中文
    naming: "hwDevelopServerInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.DevelopServerInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.DevelopServerInfo",
    xcls: "vmd.ux.DevelopServerInfo",
    //为了拖拽能自动生成递增id
    defaultName: "hwDevelopServerInfo",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
    xds.Registry.register(xds["vmd.ux.DevelopServerInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.DevelopServerInfo"]);

    var Data_vmd_ux_DevelopServerInfo={"BaseType":"Control","Type":"vmd_ux_DevelopServerInfo","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DevelopServerInfo)