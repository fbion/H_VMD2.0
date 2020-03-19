xds["vmd.ux.TimeComponent"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TimeComponent",
    category: "vmd复合组件",
    text: "TimeComponent",//中文
    naming: "TimeComponent",
    //dtype 设计时组件
    dtype: "vmd.ux.TimeComponent",
    //xtype 运行时组件
    xtype: "vmd.ux.TimeComponent",
    xcls: "vmd.ux.TimeComponent",
    //为了拖拽能自动生成递增id
    defaultName: "TimeComponent",
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
    xds.Registry.register(xds["vmd.ux.TimeComponent"]);
    xds.Registry.addUserType(xds["vmd.ux.TimeComponent"]);

    var Data_vmd_ux_TimeComponent={"BaseType":"Control","Type":"vmd_ux_TimeComponent","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TimeComponent)