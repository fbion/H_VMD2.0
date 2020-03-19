xds["vmd.ux.ToolbarWorkspaceResource"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ToolbarWorkspaceResource",
    category: "vmd复合组件",
    text: "ToolbarWorkspaceResource",//中文
    naming: "ToolbarWorkspaceResource",
    //dtype 设计时组件
    dtype: "vmd.ux.ToolbarWorkspaceResource",
    //xtype 运行时组件
    xtype: "vmd.ux.ToolbarWorkspaceResource",
    xcls: "vmd.ux.ToolbarWorkspaceResource",
    //为了拖拽能自动生成递增id
    defaultName: "ToolbarWorkspaceResource",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {},
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
     ,{"name":"onClickBtnAddServer","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"onClickBtnAddCategory","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"onClickBtnEdit","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"onClickBtnDelete","group":"事件","ctype":"string","editor":"ace","params":"e"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置

    }
    
});
    xds.Registry.register(xds["vmd.ux.ToolbarWorkspaceResource"]);
    xds.Registry.addUserType(xds["vmd.ux.ToolbarWorkspaceResource"]);

    var Data_vmd_ux_ToolbarWorkspaceResource={"BaseType":"Control","Type":"vmd_ux_ToolbarWorkspaceResource","Property":{},"Method":{"setAddCategoryBtnVisiable":{"Description":"设置添加目录按钮是否可见。","Prototype":"setAddCategoryBtnVisiable(paraVisiable)","Args":{"_Return_":"无","Args":"paraVisiable"},"Example":"设置添加目录按钮是否可见。"}},"Event":{"onClickBtnAddServer":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"点击添加服务器按钮事件。"},"onClickBtnAddCategory":{"Prototype":"","Args":{"_Return_":""},"Example":"点击添加目录按钮的事件"},"onClickBtnEdit":{"Prototype":"","Args":{"_Return_":""},"Example":"点击编辑按钮事件"},"onClickBtnDelete":{"Prototype":"","Args":{"_Return_":""},"Example":"点击删除按钮事件"}}}
	ControlsDataManage._add(Data_vmd_ux_ToolbarWorkspaceResource)