xds["vmd.ux.ComponentsTab"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ComponentsTab",
    category: "vmd复合组件",
    text: "ComponentsTab",//中文
    naming: "ComponentsTab",
    //dtype 设计时组件
    dtype: "vmd.ux.ComponentsTab",
    //xtype 运行时组件
    xtype: "vmd.ux.ComponentsTab",
    xcls: "vmd.ux.ComponentsTab",
    //为了拖拽能自动生成递增id
    defaultName: "ComponentsTab",
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
     ,{"name":"ip","group":"设计","ctype":"string"},{"name":"callCode","group":"设计","ctype":"string"},{"name":"url","group":"设计","ctype":"string"},{"name":"hwip","group":"设计","ctype":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ComponentsTab"]);
    xds.Registry.addUserType(xds["vmd.ux.ComponentsTab"]);

    var Data_vmd_ux_ComponentsTab={"BaseType":"Control","Type":"vmd_ux_ComponentsTab","Property":{"ip":{"Description":"数据服务","Prototype":"","Args":{"_Return_":""},"Example":"数据服务"},"callCode":{"Description":"授权码","Prototype":"","Args":{"_Return_":""},"Example":"授权码"},"url":{"Description":"数据服务地址","Prototype":"","Args":{"_Return_":""},"Example":"数据服务地址"},"hwip":{"Description":"待办已办ip","Prototype":"","Args":{"_Return_":""},"Example":"获取待办已办ip"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ComponentsTab)