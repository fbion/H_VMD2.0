xds["vmd.ux.Console"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Console",
    category: "vmd复合组件",
    text: "Console",//中文
    naming: "hwConsole",
    //dtype 设计时组件
    dtype: "vmd.ux.Console",
    //xtype 运行时组件
    xtype: "vmd.ux.Console",
    xcls: "vmd.ux.Console",
    //为了拖拽能自动生成递增id
    defaultName: "hwConsole",
    iconCls: "icon-cmp",
    isContainer: false,
   
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
     ,{"name":"onChange","group":"事件","ctype":"string","editor":"ace","params":"checked,lb"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Console"]);
    xds.Registry.addUserType(xds["vmd.ux.Console"]);

    var Data_vmd_ux_Console={"BaseType":"Control","Type":"vmd_ux_Console","Property":{},"Method":{},"Event":{"onChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Console)