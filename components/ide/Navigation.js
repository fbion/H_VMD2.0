xds["vmd.ux.Navigation"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Navigation",
    category: "vmd复合组件",
    text: "Navigation",//中文
    naming: "Navigation",
    //dtype 设计时组件
    dtype: "vmd.ux.Navigation",
    //xtype 运行时组件
    xtype: "vmd.ux.Navigation",
    xcls: "vmd.ux.Navigation",
    //为了拖拽能自动生成递增id
    defaultName: "Navigation",
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
     ,{"name":"homeClick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"pathClick","group":"事件","ctype":"string","editor":"ace","params":"path"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Navigation"]);
    xds.Registry.addUserType(xds["vmd.ux.Navigation"]);

    var Data_vmd_ux_Navigation={"BaseType":"Control","Type":"vmd_ux_Navigation","Property":{},"Method":{"setPath":{"Description":"setPath","Prototype":"setPath(path,runEvent)","Args":{"_Return_":"无","Args":"path,runEvent"},"Example":""}},"Event":{"homeClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"返回主页面"},"pathClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Navigation)