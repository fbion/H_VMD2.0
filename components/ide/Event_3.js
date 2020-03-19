xds["vmd.ux.Event_3"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Event_3",
    category: "vmd复合组件",
    text: "Event_3",//中文
    naming: "Event_3",
    //dtype 设计时组件
    dtype: "vmd.ux.Event_3",
    //xtype 运行时组件
    xtype: "vmd.ux.Event_3",
    xcls: "vmd.ux.Event_3",
    //为了拖拽能自动生成递增id
    defaultName: "Event_3",
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
    xds.Registry.register(xds["vmd.ux.Event_3"]);
    xds.Registry.addUserType(xds["vmd.ux.Event_3"]);

    var Data_vmd_ux_Event_3={"BaseType":"Control","Type":"vmd_ux_Event_3","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Event_3)